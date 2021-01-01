import request from '@/utils/request';

export async function getMarketSomaHold() {
  return request('/api-storage/newyorkfed_makert_hold.json');
}

export async function getWei() {
  return request('/api-storage/newyorkfed_wei.json');
}

export async function getOliCopperGoldRatio() {
  return request('/api-storage/oli_copper_gold_ratio_5.json');
}

export async function getTreasuryRealRates() {
  return request('/api-storage/treasury_real_rates_5.json');
}

export async function getJoblessClaims() {
  return request('/api-storage/us_jobless.json');
}

export async function getCPI() {
  return request('/api-storage/cpi_5.json');
}

export async function getFFR() {
  return request('/api-storage/federal_founds_rate_5.json');
}

export async function getGoldStock() {
  return request('/api-storage/gld.json');
}
