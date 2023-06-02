export type TableType =
  | 'FREQUENT_CUSTOMERS'
  | 'INTERNAL_QUEUE'
  | 'EXTERNAL_QUEUE';

/**
 * potential table headers with corresponding data,
 * add a header here
 */
export const headers: {
  label: string;
  data: string;
  isPresent: TableType[];
}[] = [
  {
    label: 'Ticket No.',
    data: 'ticketNo',
    isPresent: ['INTERNAL_QUEUE', 'EXTERNAL_QUEUE'],
  },
  {
    label: 'Name',
    data: 'name',
    isPresent: ['FREQUENT_CUSTOMERS', 'INTERNAL_QUEUE', 'EXTERNAL_QUEUE'],
  },
  { label: 'Email', data: 'email', isPresent: ['FREQUENT_CUSTOMERS'] },
  {
    label: 'Phone Number',
    data: 'phoneNumber',
    isPresent: ['FREQUENT_CUSTOMERS', 'INTERNAL_QUEUE', 'EXTERNAL_QUEUE'],
  },
  {
    label: 'Visit Purpose',
    data: 'purpose',
    isPresent: ['FREQUENT_CUSTOMERS', 'INTERNAL_QUEUE', 'EXTERNAL_QUEUE'],
  },

  { label: 'Status', data: 'status', isPresent: ['INTERNAL_QUEUE'] },
];
