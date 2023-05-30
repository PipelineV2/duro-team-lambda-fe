# DURO api documentation

Duro Backend was developed with Firebase and all api can be found within
`src/firebase/apis`.
it would require that the Firebase api keys and other variables be used. Kindly refer to `.env.example` for guidance.

## Installation and running of the app

    provided you follow the instructions here: `README.md`. you have nothing else to do

# REST API

The REST API endpoints to the Duro app is described below.

## Vendor Signup

**SignupApi()**

**Description:**

The `SignupApi` function is used to sign up a new user.

**Parameters:**

```
  email: string;
  password: string; // no less than 6 characters
  firstName: string;
  lastName: string;
  businessName: string;
  industry: string;
  employeeSize: string;
  phoneNumber: string;

```

**Returns:**

An email is sent to the registered account for verification and a promise that resolves with the following object:

```
  {
    status: number;
    token?: string;
    message: string;
    userData?: {
      email: string;
      businessName: string;
    };
  }
```

## Signin

**SigninApi()**

**Description:**

The `SigninApi` function is used to sign in a registered user.

**Parameters:**

```
  email: string;
  password: string;

```

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    token?: string;
    message: string;
  }
```

## Signout

**SignoutApi()**

**Description:**

The `SignoutApi` function is used to sign out a registered user. No paramter is required nor any response expected. Upon a successful signout, the user loses access to protected routes.

## Reset Password

**ResetPasswordApi()**

**Description:**

The `ResetPasswordApi` function is used to send email to a registered user who has lost access to his/her account and want to retrieve such account. The email contains details to enable account owner re-set the account details accordingly.

**Parameters:**

```
  newPassword: string

```

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    message: string;
  }
```

## Change Password

**ChangePasswordApi()**

**Description:**

The `ChangePasswordApi` function is used to change the password of registered account. The account owner must be logged in to be able to use this api else it will fail.

**Parameters:**

```
  email: string;

```

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    message: string;
  }
```

## User Data

**UserDetailsApi()**

**Description:**

The `UserDetailsApi` function is used retrieve a particular registered user data from the databse. The account owner must be logged in to be able to use this api else it will fail. It takes no parameter.

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    token?: string;
    message: string;
    userData?: {
      uid: string;
      email: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      businessName: string;
      industry: string;
      employeeSize: string;
      emailVerified: boolean;
    };
  }
```

NB: the userData object will be different for the customers.

**Status:**

The status of the sign up request. Possible values are:

- 201 - resource successfully created.
- 200 - resource successfully retrieved/sent.
- 400 - failed request.
- 401 - not authorized/ fail to authenticate user.
- 404 - resource not found.

**Example:**

```

import { ChangePasswordApi, SigninApi, SignupApi, SignoutApi, UserDetailsApi } from '@/firebase/apis';
...
<!-- signup -->
const signup = async () => {
  const data = {
    email: 'test@testing.com',
    password: 'testdf111@@@',
    firstName: 'Test',
    lastName: 'Business',
    businessName: 'Duro',
    industry: 'Environment',
    employeeSize: '50',
    phoneNumber: '0192929292',
  };
  const res = await SignupApi(data);
  console.log(res, 'signup');
  // pass res into your state or context
};

<!-- signin -->
const signin = async () => {
  const data = {
    email: 'test@testing.com',
    password: 'testdf111@@@',
  };
  const res = await SigninApi(data);
  console.log(res, 'signin');
  // pass res into your state or context
};

<!-- signout -->
const signout = async () => {
  SignoutApi();
  // redirect user to non-protected screen e.g. login
};

<!-- resetPassword -->
const sendResetpasswordEmail = async () => {
  const res = await ResetPasswordApi('test@testing.com');
  console.log(res, 'reset password');
};

<!-- changePassword -->
const changepassword = async () => {
  const res = await ChangePasswordApi('sds*&%kNN');
  console.log(res, 'change password');
};

<!-- userData -->
UserDetailsApi().then((res) => console.log(res));

```
