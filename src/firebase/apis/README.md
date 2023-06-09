# DURO api documentation

Duro Backend was developed with Firebase and all api can be found within
`src/firebase/apis`.
it would require that the Firebase api keys and other variables be used. Kindly refer to `.env.example` for guidance.

## Installation and running of the app

    provided you follow the instructions here: `README.md`. you have nothing else to do

# REST API

The REST API endpoints to the Duro app is described below.
`VENDOR` - Duro's paying client/business using Duro to manage her customers
`CUSTOMER/CLEINT` - Vendor's business client who visit their business premises to conduct business.

## Signup (Vendor)

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

## Signin (Vendor)

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

## Reset Password (Vendor)

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

## Change Password (Vendor)

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

## User Data (Vednor)

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

---

## Dashboard (Vendor)

**DashboardApiApi()**

**Description:**

The `DashboardApiApi` gets dashboard data. It takes no parameter.

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    message: string;
    data?: {
      queueLength: number;
      attendedTo: number;
      leftQueue: number;
      queueProgress: number;
      totalVisits: [];
    };
  }
```

## Settings (Vendor)

**SettingsApi()**

**Description:**

The `SettingsApi` gets dashboard data. It takes no parameter.

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    message: string;
    data?: {
      phoneNumber: string;
      geofenceData: {
        lat: number;
        long: number;
        workingRadius: number;
        radiusUnit: string;
      }[];
      link: string;
    };
  }
```

## Availability (Vendor)

**AvailabilityApi()**

**Description:**

The `AvailabilityApi` gets dashboard data. It takes no parameter.

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    message: string;
    data?: {
      subscribed: boolean;
      openingHour: string;
      closingHour: string;
      currentOperationStatus: {
        operation: boolean;
        break: boolean;
        closed: boolean;
      }[];
      workingDays: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
      }[];
    };
  }
```

## Queue (Vendor)

**QueueApi()**

**Description:**

The `QueueApi` gets dashboard data. It takes only a date parameter which is compulsory but can be empty. The date paramter must be in the format: `mm/dd/yyyy` e.g. `06/01/2023` .i.e. June, 1, 2023.
However, as earleir mentioned it can be an empty string in the event there is no date data passed. If date = '', the api will retrieve all queue data available for the vendor since inception. Be informed!
**Parameters:**

```
  date: string;

```

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    message: string;
    queueArray?: {
      date: string;
      ticketNo: number;
      name: string;
      purpose: string;
      phoneNumber: string;
      status: number;
      queueNumber: number;
    }[];
  }
```

## Update Queue (Vendor)

**UpdateQueueApi()**

**Description:**

The `UpdateQueueApi` function is POST method that allow vendor to update the queue status per client/customer.

**Parameters:**

```
  ticketNo: string;
  value: number; // 0 - onQueue; 1 - inProgress; 2 - done

```

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    message: string;
  }
```

## Update Availability (Vendor)

**UpdateQueueApi()**

**Description:**

The `UpdateAvailabilityApi` function is POST method that allow vendor to update the data on the Availability page of the vendor's side of the application. Given that there are four items that can be updated on the Availability page.

**Parameters:**

```
  closingHour: string;
  operation: string;
  openingHour: string;
  workingDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };

```

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    message: string;
    data?: {
      subscribed: boolean;
      openingHour: string;
      closingHour: string;
      currentOperationStatus: {
        operation: boolean;
        break: boolean;
        closed: boolean;
      }[];
      workingDays: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
      }[];
    };
  }
```

## Update Settings (Vendor)

**UpdateSettingsApi()**

**Description:**

The `UpdateSettingsApi` function is POST method that allow vendor to update the data on the Settings page of the vendor's side of the application. Given that there are two items that can be updated on the Settings page.

**Parameters:**

```
  type: string; // "geofenceData" | "link"
  value?:
    | {
        lat: number;
        long: number;
        workingRadius: number;
      }
    | any;

// Please carefully understand the respective value expected for each type below
  switch (type) {
    case 'link':
      // requires no value input

    case 'geofenceData':
      // value is an object of (lat, long and workingRadius) - see `value` parameter above
    default:
      break;
  }
```

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    message: string;
    data?: {
      phoneNumber: string;
      geofenceData: {
        lat: number;
        long: number;
        workingRadius: number;
        radiusUnit: string;
      }[];
      link: string;
    };
  }
```

## Get Business Data for Form (Customer/Client)

**VendorFormDetailsApi()**

**Description:**

The `VendorFormDetailsApi` function is a GET method that FE should call upon rendering the Queue form for any vendor. It pulls the vendor data to allow easy identification of respective vendor.

**Parameters:**

```
  formLinkID: string// unique to every organization passed from the URL

```

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    message: string;
    vendorData?: {
      phoneNumber: string;
      businessName: string;
      isOperating: boolean;
      isWorkingDay: boolean;
      isWorkHours: boolean;
    };
  }
```

NB: Both `isOperating`, `isWorkHours` and `isWorkingDay` must be true to give user access to the queue form

## Create Queue (Customer/Client)

**JoinQueueApi()**

**Description:**

The `JoinQueueApi` function is POST method that allow vendor's clients/customers to join the queue.

**Parameters:**

```
  name: string;
  purpose: string;
  phoneNumber: string;
  formLink: string; // unique to every organization

```

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    message: string;
    queueNumber?: number;
  }
```

## View Queue List (Customer/Client)

**QueueListApi()**

**Description:**

The `QueueListApi` function is GET method that allow vendor's clients/customers to view the waiting list.

**Parameters:**

```
  formLinkID: string  // unique to every organization

```

**Returns:**

A promise that resolves with the following object:

```
  {
    status: number;
    message: string;
    queueArray?: {
      date: string;
      ticketNo: number;
      name: string;
      queueNumber: number;
    }[];
    totalQueue?: number;
  }
```

**Status:**

The status of the responses. Possible values are:

- 201 - resource successfully created.
- 200 - resource successfully retrieved/sent.
- 400 - failed request.
- 401 - not authorized/ fail to authenticate user.
- 404 - resource not found.
- 409 - resource already exist.

**Example:**

```

import { ChangePasswordApi, SigninApi, SignupApi, SignoutApi, UserDetailsApi,
ResetPasswordApi,
JoinQueueApi, UpdateQueueApi,
DashboardApi, QueueApi,
AvailabilityApi, SettingsApi,
UpdateAvailabilityApi, UpdateSettingsApi,
VendorFormDetailsApi,QueueListApi
 } from '@/firebase/apis';
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


Protected Pages(Dashboard, Queue, Availability, Settings and Others)

signin()
  .then(() => {
<!-- Updating Queue on the Dashboard -->
    UpdateQueueApi({ ticketNo: '8rkwu', value: 2 }).then((res) =>
       console.log(res)
    );
<!-- Queue Screen -->
    const today = dateFormaterString(new Date('06/01/2023').toString());
    QueueApi(today).then((res) => console.log(res)); // get TODAY's queue data
    QueueApi('').then((res) => console.log(res)); // get ALL queue data

<!-- Dashboard Screen -->
    DashboardApi().then((res) => console.log(res));

<!-- Get User Data -->
    UserDetailsApi().then((res) => console.log(res));

<!-- Availability Screen -->
    AvailabilityApi().then((res) => console.log(res));

 <!-- Settings Screen -->
    SettingsApi().then((res) => console.log(res));
  })
  .catch((err) => console.log(err));

<!-- Update Availability Screen -->
   const update = {
      closingHour: '8:00 pm',
      operation: 'break',
      openingHour: '8:00 am',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    };
    UpdateAvailabilityApi(update).then((res) => console.log(res));

 <!-- Update Settings Screen  (Update Geofence data)  -->
    const updateSet = {
      type: 'geofenceData',
      value: {
        lat: 2.34343,
        long: 6.34232,
        workingRadius: 4,
      },
    };
    UpdateSettingsApi(updateSet).then((res) => console.log(res));

  <!-- Update Settings Screen (Generate new Form Link) -->
  const updateSetLink = {
      type: 'link'
    };
    UpdateSettingsApi(updateSet).then((res) => console.log(res));

  .catch((err) => console.log(err));


  <!-- CUSTOMERS -->
  <!-- getBusinessData for Queue Form -->
  \\ get businessData to allow customers confirm which vendor's queue platform they are on and filling
  VendorFormDetailsApi('Quid-k7qiuu').then((res) => console.log(res));

<!-- Queue list -->
  QueueListApi('Quid-k7qiuu').then((res) => console.log(res));

<!-- create Queue -->
  const joinQueueData = {
    name: 'Bade lange',
    purpose: 'Personal matter',
    phoneNumber: '393677794',
    formLink: 'Quid-5wef43',
  };
  JoinQueueApi(joinQueueData).then((res) => console.log(res, 'join queue result'));

```
