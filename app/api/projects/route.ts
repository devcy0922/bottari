import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { calculateProjectCost } from '@/lib/domain';

export async function GET() {
  const projects = await db.surveyProject.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { participations: true } } },
  });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const reward = Number(b.rewardPerResponse);
    const target = Number(b.targetRespondents);
    const minAge = Number(b.minAge);
    const maxAge = Number(b.maxAge);
    const estimated = Number(b.estimatedMinutes);

    if (!b.title || !b.surveyUrl || !Number.isInteger(reward) || reward < 100 || target < 1 || minAge > maxAge) {
      return NextResponse.json({ error: '입력값을 확인하세요.' }, { status: 400 });
    }

    new URL(b.surveyUrl);

    const policy = {
      platformFeeBps: Number(process.env.PLATFORM_FEE_BPS || 500),
      processingFeeBps: Number(process.env.PROCESSING_FEE_BPS || 300),
    };
    const cost = calculateProjectCost(reward, target, policy);

    const project = await db.surveyProject.create({
      data: {
        researcherId: 'demo-researcher',
        title: b.title,
        surveyUrl: b.surveyUrl,
        minAge,
        maxAge,
        region: b.region || '전국',
        targetRespondents: target,
        estimatedMinutes: estimated,
        rewardPerResponse: reward,
        rewardPool: cost.rewardPool,
        platformFee: cost.platformFee,
        processingCost: cost.processingCost,
        totalCost: cost.total,
        payoutRatio: cost.payoutRatio,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: '프로젝트 생성에 실패했습니다.' }, { status: 400 });
  }
}
