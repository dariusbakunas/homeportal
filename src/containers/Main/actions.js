import Action from '../../utils/action';

export const login = new Action('LOGIN', [], ['fullName', 'accessToken', 'idToken', 'expiresAt']);
export const logout = new Action('LOGOUT', [], []);
export const handleAuth = new Action('HANLDE_AUTH', ['locationHash'], []);
