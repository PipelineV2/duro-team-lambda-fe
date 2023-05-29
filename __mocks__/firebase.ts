const mockFirebase = {
  auth: jest.fn().mockReturnThis(),
  createUserWithEmailAndPassword: jest.fn(),
};

export { mockFirebase as default };
