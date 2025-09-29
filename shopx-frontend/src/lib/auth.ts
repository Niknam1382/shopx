export function saveTokens(access: string, refresh: string) {
  localStorage.setItem("token", access);
  localStorage.setItem("refresh", refresh);
}
export function getToken() { return localStorage.getItem("token"); }
export function logout() { localStorage.removeItem("token"); localStorage.removeItem("refresh"); }
export function isAuthenticated() { return !!getToken(); }