import Action from '../../utils/action';

export const login = new Action('LOGIN', [], ['fullName', 'accessToken', 'idToken', 'expiresAt']);
export const handleAuth = new Action('HANLDE_AUTH', ['locationHash'], []);