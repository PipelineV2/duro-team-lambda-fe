export type signupProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  businessName: string;
  industry: string;
  employeeSize: string;
  phoneNumber: string;
};
export type joinQueueProps = {
  name: string;
  purpose: string;
  phoneNumber: string;
  formLink: string;
};
export type updateAvailabilityProps = {
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
};
export type updateSettingsProps = {
  type: string;
  value?:
    | {
        lat: number;
        long: number;
        workingRadius: number;
      }
    | any;
};
export type queueReturnDataProps = {
  status: number;
  message: string;
  queueNumber?: number;
};

export type signupReturnDataProps = {
  status: number;
  token?: string;
  message: string;
  userData?: {
    email: string;
    businessName: string;
    emailVerified: boolean;
  };
};
export type signinProps = {
  email: string;
  password: string;
};
export type updateQueueProps = {
  ticketNo: string;
  value: number;
};
export type updateQueueReturnDataProps = {
  status: number;
  message: string;
};
export type signinReturnDataProps = {
  status: number;
  token?: string;
  message: string;
  emailVerified?: boolean;
};
export type userReturnDataProps = {
  status: number;
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
    emailVerified?: boolean;
  };
};

export type TVendorDataProps = {
  phoneNumber: string;
  businessName: string;
  isOperating: boolean;
  isWorkingDay: boolean;
  isWorkHours: boolean;
};
export type vendorReturnDataProps = {
  status: number;
  message: string;
  vendorData?: TVendorDataProps;
};
export type createQueueReturnDataProps = {
  status: number;
  message: string;
  queueArray?: queueProps[] | [];
};

export type queueLinkReturnDataProps = {
  status: number;
  message: string;
  queueArray?: queueListDataProps[] | [];
  totalQueue?: number;
};

export type queueListDataProps = {
  date: string;
  ticketNo: number;
  name: string;
  queueNumber: number;
};
export type queueProps = {
  date: string;
  ticketNo: number;
  name: string;
  purpose: string;
  phoneNumber: string;
  status: number;
  queueNumber: number;
};
export type resetReturnDataProps = {
  status: number;
  message: string;
};
export type changeReturnDataProps = {
  status: number;
  message: string;
};

export type settingsReturnDataProps = {
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
};
export type dashboardReturnDataProps = {
  status: number;
  message: string;
  data?: dashboardProps;
};

export type graphDataReturnProps = {
  date: string;
  totalVisits: number;
};
export type graphDataProps = {
  date: string;
  ticketNo: string;
  name: string;
  purpose: string;
  phoneNumber: string;
};
export type dashboardProps = {
  queueLength: number;
  attendedTo: number;
  leftQueue: number;
  queueProgress: number;
  totalVisits: graphDataReturnProps[];
};

export type availReturnDataProps = {
  status: number;
  message: string;
  data?: availProps;
};

export type settReturnDataProps = {
  status: number;
  message: string;
  data?: settProps;
};

export type settProps = {
  phoneNumber: string;
  geofenceData: {
    lat: number;
    long: number;
    workingRadius: number;
    radiusUnit: string;
  }[];
  link: string;
};

export type availProps = {
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
