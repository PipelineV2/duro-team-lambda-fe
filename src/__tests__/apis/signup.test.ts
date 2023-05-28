/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignupApi } from '@/firebase/apis';

describe('SignupApi', () => {
  it('should sign up a new user successfully', async () => {
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

    const res: any = await SignupApi(signupData);
    expect(res?.status).toBe(201);
    expect(res?.token).toBeDefined();
    expect(res?.message).toBe('signup successful');
  });

  it('should fail to sign up a new user if the email address is already in use', async () => {
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

    const res: any = await SignupApi(signupData);

    expect(res.status).toBe(400);
    expect(res.message).toBe('Oops! an error occured');
  });

  it('should fail to sign up a new user if the password is too short', async () => {
    const signupData = {
      email: 'sds@sds81' + Math.random() * 999 + '.com',
      password: 'sdf',
      firstName: 'Dan',
      lastName: 'Olag',
      businessName: 'Quid',
      industry: 'Finance',
      employeeSize: '50',
      phoneNumber: '0192929292',
    };

    const res: any = await SignupApi(signupData);

    expect(res.status).toBe(400);
    expect(res.message).toBe('Oops! an error occured');
  });
});
