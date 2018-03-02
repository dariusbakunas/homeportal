import request from '../utils/request';

export const getDomainList = (accessToken) => {
  return request(`/api/vms/domain`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    method: 'GET',
  })
};
