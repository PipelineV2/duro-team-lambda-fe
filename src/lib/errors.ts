export const errors = {
  'auth/email-already-exists':
    'The provided email is already in use by an existing user. Each user must have a unique email',
  'auth/id-token-expired': 'The provided Firebase ID token is expired.',
  'auth/id-token-revoked': 'The Firebase ID token has been revoked',
  'auth/uid-already-exists':
    'The provided uid is already in use by an existing user. Each user must have a unique uid',
  'auth/unauthorized-continue-uri':
    'The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase Console',
  'auth/user-not-found':
    'There is no existing user record corresponding to the provided identifier',
};
