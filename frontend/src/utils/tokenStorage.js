export function getToken() {
  try {
    return localStorage.getItem('flowup_token');
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem('flowup_token', token);
  } catch {
    // ignore storage errors in non-browser contexts
  }
}

export function removeToken() {
  try {
    localStorage.removeItem('flowup_token');
  } catch {
    // ignore storage errors in non-browser contexts
  }
}
