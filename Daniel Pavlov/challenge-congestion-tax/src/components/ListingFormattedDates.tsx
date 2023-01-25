import React from 'react';

import { Chip } from '@material-ui/core';

const ListingFormattedDates = (props: {
  dates: Date[];
  handleDeleteDate: (arg: any) => void;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: 2,
      }}
    >
      {props.dates.length > 0 &&
        props.dates.map((date: Date) => (
          <div
            key={date.toString()}
            style={{ display: 'flex', flexDirection: 'row', padding: 2 }}
          >
            <Chip
              label={date}
              onDelete={() => props.handleDeleteDate(date)}
              color="primary"
            />
          </div>
        ))}
    </div>
  );
};

export default ListingFormattedDates;
