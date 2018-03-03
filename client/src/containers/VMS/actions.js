import Action from '../../utils/action';

export const apiGetDomainList = new Action('API_GET_DOMAIN_LIST', ['accessToken'], ['domains']);
