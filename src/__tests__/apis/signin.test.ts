import firebaseAuth from 'firebase/auth';

jest.mock('@/firebase/apis', () => {
  return {
    auth: firebaseAuth,
    SigninApi: jest.fn(),
  };
});

describe('SigninApi', () => {
  it('should sign in a user successfully', async () => {
    const email = 'test@example.com';
    const password = 'password';

    // Mock the `signInWithEmailAndPassword` method.
    const SigninApi = jest.fn();
    SigninApi.mockResolvedValue({
      status: 200,
      message: 'Signin successful',
      token: 'token',
    });

    // Call the `SigninApi` method.
    const result = await SigninApi({ email, password });

    // Assert that the result is a `returnDataProps` object.
    expect(result).toEqual({
      status: 200,
      message: 'Signin successful',
      token: 'token',
    });
  });

  it('should return an error if the user is not found', async () => {
    const email = 'test@example.com';
    const password = 'password';

    // Mock the `signInWithEmailAndPassword` method to return an error.
    const SigninApi = jest.fn();
    SigninApi.mockResolvedValue({
      status: 404,
      message: 'Oops! email not found',
    });

    // Call the `SigninApi` method.
    const result = await SigninApi({ email, password });

    // Assert that the result is an error object.
    expect(result).toEqual({
      status: 404,
      message: 'Oops! email not found',
    });
  });

  it('should return an error if the password is incorrect', async () => {
    const email = 'test@example.com';
    const password = 'wrong-password';

    // Mock the `signInWithEmailAndPassword` method to return an error.
    const SigninApi = jest.fn();
    SigninApi.mockResolvedValue({
      status: 401,
      message: 'Oops! wrong password',
    });

    // Call the `SigninApi` method.
    const result = await SigninApi({ email, password });

    // Assert that the result is an error object.
    expect(result).toEqual({
      status: 401,
      message: 'Oops! wrong password',
    });
  });
});
