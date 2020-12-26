import request from '@/utils/request';

export async function getMtData() {
  const params = {
    t: Date.parse(new Date()) / 1000
  }
  return request('/api-storage/sp500_100.json', { params});
}

