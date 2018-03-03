import { normalize } from 'normalizr';
import request from '../utils/request';
import * as schema from './pyvirtSchema';

export const getDomainList = (accessToken) => {
  return request(`/api/vms/domain`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    method: 'GET',
  }).then((json) => normalize(json, [schema.domainSchema]))
};
