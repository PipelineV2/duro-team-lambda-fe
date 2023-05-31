const mockFirebase = {
  auth: jest.fn().mockReturnThis(),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve(Response)),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve(Response)),
};

export { mockFirebase as default };
