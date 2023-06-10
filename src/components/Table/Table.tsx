import React, { useMemo } from 'react';

import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Button from '@/components/buttons';
import Typography from '@/components/text';

import { headers, TableType } from './constant';

import FileIcon from '~/svg/FileIcon.svg';

type Props = {
  type: TableType;
  data: Record<string, string | number>[];
  title?: string;
  hasExport?: boolean;
};

/**
 *  Table component
 * @param type(enum) - type of table (EXTERNAL_QUEUE, INTERNAL_QUEUE, FREQUENT_CUSTOMERS) - default INTERNAL_QUEUE (optional) - default INTERNAL_QUEUE (optional)
 * @param data - data to be displayed (required)
 * @param title - title of table (optional)
 * @param hasExport - if table has export button (optional)
 * @returns JSX.Element - Table component with data
 * Example usage of Table component with data:
 * ```js
 * <Table type='EXTERNAL_QUEUE' data={data} title='Current queue' />
 * ```
 * Example usage of Table component with data and export button:
 * ```js
 * <Table type='EXTERNAL_QUEUE' data={data} title='Current queue' hasExport />
 * ```
 * Example usage of Table component with data and title:
 * ```js
 * <Table type='EXTERNAL_QUEUE' data={data} title='Current queue' />
 * ```
 *
 */

const Table = (props: Props) => {
  const { type = 'INTERNAL_QUEUE', data, title, hasExport } = props;

  const newHeaders = useMemo(() => {
    if (data.length) {
      const itemInHeader = Object?.keys(data[0]);
      return headers.filter(
        (item) =>
          itemInHeader.includes(item.data) && item.isPresent.includes(type)
      );
    }
  }, [data, type]);

  const handleChangeStatus = (
    e: React.ChangeEvent<HTMLSelectElement>,
    ticketNumber: string
  ) => {
    logger({
      e: e.target.value,
      ticketNumber,
    });
  };
  const handleExportData = () => {
    logger('clicked Export');
  };

  return (
    <div className='shadow-s2 rounded-lg bg-white p-6'>
      <div className='border-grey5 flex justify-between border-b pb-3'>
        <Typography variant='body2' className='text-grey2'>
          {title}
        </Typography>
        {hasExport && (
          <Button
            text='Export'
            variant='secondary'
            onClick={handleExportData}
            className='text-grey3 border-grey3 ml-2 px-2 py-1'
            rightIcon={FileIcon}
            rightIconClassName='w-4 h-4 ml-1'
          />
        )}
      </div>
      <div className='max-h-[500px] overflow-auto'>
        {data?.length ? (
          <table className='w-full border-collapse border-spacing-6'>
            <thead>
              <tr className='border-grey5 border-b '>
                <th className='py-5 pr-3 text-left' rowSpan={3}>
                  <p></p>
                </th>
                {newHeaders?.map((header, id) => {
                  return (
                    <th
                      key={id}
                      className={clsxm('py-5 pr-3 text-left font-normal', [
                        !header.showInPhone && 'hidden md:table-cell',
                      ])}
                    >
                      <Typography variant='body2' className='text-grey2'>
                        {header['label']}
                      </Typography>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((datum, index) => {
                return (
                  <tr key={index} className='border-grey5 border-b'>
                    <td className='py-5 pr-3 text-left'>{index + 1}</td>
                    {newHeaders?.map((item, index) => {
                      return (
                        <td
                          className={clsxm('py-5 pr-3 text-left', [
                            !item.showInPhone && 'hidden md:table-cell',
                          ])}
                          key={index}
                        >
                          {item.data === 'status' ? (
                            <select
                              value={datum?.status}
                              onChange={(e) =>
                                handleChangeStatus(e, datum.ticketNo as string)
                              }
                              title='select status'
                              className={clsxm(
                                'rounded px-2 py-1 pr-6 text-center text-xs leading-[17px]',
                                [
                                  datum.status == '0' &&
                                    'bg-orange-light text-soft-orange border-soft-orange',
                                  datum.status == '1' &&
                                    'bg-light-deep-blue text-deep-blue border-deep-blue',
                                  datum.status == '2' &&
                                    'bg-light-green text-green border-green',
                                ]
                              )}
                            >
                              <option value={0}>on queue</option>
                              <option value={1}>in progress</option>
                              <option value={2}>done</option>
                            </select>
                          ) : (
                            <Typography variant='body2' className='text-grey2'>
                              {datum[item.data as keyof typeof datum]}
                            </Typography>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
        {!data.length ? (
          <div className='max-h-32 p-10 text-center'>No data</div>
        ) : null}
      </div>
    </div>
  );
};

export default Table;
