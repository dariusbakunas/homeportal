import Action from '../../utils/action';

export const login = new Action('LOGIN', ['returnUrl'], ['fullName', 'accessToken', 'idToken', 'expiresAt', 'returnUrl']);
export const logout = new Action('LOGOUT', [], []);
export const handleAuth = new Action('HANLDE_AUTH', ['locationHash'], []);
