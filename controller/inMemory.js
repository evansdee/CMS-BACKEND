const tokenStore = new Set(); // Use a Set to store blacklisted tokens

function addToBlacklist(token) {
  tokenStore.add(token);
}

function isTokenBlacklisted(token) {
  return tokenStore.has(token);
}

module.exports = { addToBlacklist, isTokenBlacklisted };
