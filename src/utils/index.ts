import { graphDataProps, graphDataReturnProps } from '@/utils/types';

export const generateRandomCharacters = (length: number) => {
  // Generate a random number between 0 and 36^length.
  const randomNumber = Math.floor(Math.random() * 36 ** length);

  // Convert the random number to a string of characters.
  const randomCharacters = randomNumber.toString(36);

  // Return the random string.
  return randomCharacters;
};

export const dateFormaterString = (dateString: string) => {
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return formattedDate;
};

export const graphTransformer = (arr: graphDataProps[]) => {
  const result: graphDataReturnProps[] = [];

  arr.forEach((item) => {
    const date = item.date;
    const foundDate = result.find((dateObj) => dateObj.date === date);
    if (!foundDate) {
      result.push({
        date,
        totalVisits: 1,
      });
    } else {
      foundDate.totalVisits += 1;
    }
  });
  return result;
};
export const changeKeyToTrue = (obj: any, key: string) => {
  for (const k in obj) {
    if (k !== key) {
      obj[k] = false;
    } else {
      obj[k] = true;
    }
  }
  return obj;
};

export const changeKeyToTrueV2 = (obj: any, key: string) => {
  const objArray = obj[0];
  Object.keys(objArray).forEach((item) => {
    if (item === key) {
      return (objArray[item] = true);
    }
    return (objArray[item] = false);
  });
  return obj;
};

export const changeKeyToInverseBoolean = (obj: any, key: string) => {
  for (const k in obj) {
    if (k === key && obj[k] === true) {
      obj[k] = false;
    } else if (k === key && obj[k] === false) {
      obj[k] = true;
    }
  }
};

export const createFormLink = (str: string) => {
  const strWithoutSpaces = str.replace(/\s/g, '');
  const first5Characters = strWithoutSpaces.slice(0, 5);

  return `${first5Characters}-${generateRandomCharacters(6)}`;
};

export const replaceKeyValues = (x: any, a: any) => {
  for (const key in a) {
    x[key] = a[key];
  }
  return x;
};

export const getWeekday = (date: any) => {
  const day = date.getDay();

  switch (day) {
    case 0:
      return 'sunday';
    case 1:
      return 'monday';
    case 2:
      return 'tuesday';
    case 3:
      return 'wednesday';
    case 4:
      return 'thursday';
    case 5:
      return 'friday';
    case 6:
      return 'saturday';
    default:
      return '';
  }
};

export const isWorkingHours = (
  startTime: number,
  endTime: number,
  currentDate: any
) => {
  const current = currentDate.getHours();

  if (current >= startTime && current <= endTime) {
    return true;
  } else {
    return false;
  }
};

export const timeConverter = (str: string) => {
  const hour = str?.slice(0, 1);
  const isPM = str?.includes('pm');
  const twelhHour = isPM ? 12 : 0;
  const hourIn24Format = Number(hour) + twelhHour;
  return hourIn24Format;
};
