import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
async function main() {
  await db.researcher.upsert({ where: { id: 'demo-researcher' }, update: {}, create: { id: 'demo-researcher', name: '보따리 데모 리서처' } });
  const respondents = [
    { id: 'demo-seoul-29', name: '김응답', verified: true, age: 29, region: '서울' },
    { id: 'demo-busan-34', name: '이패널', verified: true, age: 34, region: '부산' },
    { id: 'demo-seoul-41', name: '박리서치', verified: true, age: 41, region: '서울' }
  ];
  for (const r of respondents) await db.respondent.upsert({ where: { id: r.id }, update: r, create: r });
}
main().finally(() => db.$disconnect());
