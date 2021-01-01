import request from '@/utils/request';

export async function getBoardLeft() {
  return request('/api-storage/board_left.json');
}

export async function getETFs() {
  return request('/api-storage/etf/ALL.json');
}
