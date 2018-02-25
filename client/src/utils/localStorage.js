export const loadAuthInfo = () => {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  if (expiresAt && new Date().getTime() < expiresAt) {
    const fullName = localStorage.getItem('full_name');
    const accessToken = localStorage.getItem('access_token');
    const idToken = localStorage.getItem('id_token');

    return {
      fullName,
      accessToken,
      idToken,
      expiresAt
    };
  } else {
    return null;
  }
};
