/* eslint-disable @typescript-eslint/no-explicit-any */

describe('SignupApi', () => {
  it('should pass', async () => {
    const signupData = {
      email: 'runtest@test.com',
      password: 'sdfdf1##^@@@',
      firstName: 'Test',
      lastName: 'Duro',
      businessName: 'Duro Inc',
      industry: 'Finance',
      employeeSize: '50',
      phoneNumber: '0192929292',
    };
    // Mock the Firebase `createUserWithEmailAndPassword` method.
    const mockCreateUserWithEmailAndPassword = jest.fn();
    mockCreateUserWithEmailAndPassword.mockReturnValue({
      user: {
        uid: '1234567890',
        details: signupData,
      },
    });
    // Call the `createUserWithEmailAndPassword` method.
    const user = await mockCreateUserWithEmailAndPassword(
      signupData.email,
      signupData.password
    );

    // Assert that the user was created successfully.
    expect(user).toEqual({
      user: {
        uid: '1234567890',
        details: signupData,
      },
    });

    // Assert that the `createUserWithEmailAndPassword` method was called once.
    expect(mockCreateUserWithEmailAndPassword).toBeCalledTimes(1);
  });
});
