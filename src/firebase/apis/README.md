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

A promise that resolves with the following object:

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

**Status:**

The status of the sign up request. Possible values are:

- 201 - The sign up request was successful.
- 400 - The sign up request failed.

**Token:**

The JWT token of the user. This token can be used to authenticate the user with the API.

**Message:**

A message describing the status of the sign up request.

**UserData:**

An object containing the following user data:

- email: The email address of the user.
- businessName: The business name of the user.

**Example:**

```

import { SignupApi } from '@/firebase/apis';
...
const signup = async () => {
  const data = {
    email: 'test@testing'.com',
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
```
