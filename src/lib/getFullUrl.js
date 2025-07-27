// lib/getFullUrl.js
export function getFullUrlFromRequest(reqOrHeaders) {
  if (typeof reqOrHeaders.get === 'function') {
    // App Router headers()
    const proto = reqOrHeaders.get('x-forwarded-proto') || 'http';
    const host = reqOrHeaders.get('host');
    return `${proto}://${host}`;
  } else {
    // Pages Router req
    const headers = reqOrHeaders.headers;
    const host = headers['host'];
    const proto = headers['x-forwarded-proto'] || 'http';
    return `${proto}://${host}`;
  }
}
