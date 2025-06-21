let cachedEmail = null;

export function getUniqueEmail() {
  if (!cachedEmail) {
    cachedEmail = `test${Date.now()}@example.com`;
    Cypress.env('sharedEmail', cachedEmail);
  }
  return cachedEmail;
}
