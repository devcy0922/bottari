export type FeePolicy = { platformFeeBps: number; processingFeeBps: number };
export function calculateProjectCost(rewardPerResponse: number, targetRespondents: number, policy: FeePolicy) {
  const rewardPool = rewardPerResponse * targetRespondents;
  const platformFee = Math.ceil((rewardPool * policy.platformFeeBps) / 10000);
  const processingCost = Math.ceil((rewardPool * policy.processingFeeBps) / 10000);
  const total = rewardPool + platformFee + processingCost;
  const payoutRatio = total === 0 ? 0 : rewardPool / total;
  return { rewardPool, platformFee, processingCost, total, payoutRatio };
}
export function isEligible(project: { minAge: number; maxAge: number; region: string | null }, profile: { age: number; region: string }) {
  const ageOk = profile.age >= project.minAge && profile.age <= project.maxAge;
  const regionOk = !project.region || project.region === '전국' || project.region === profile.region;
  return ageOk && regionOk;
}
export function completionCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}
