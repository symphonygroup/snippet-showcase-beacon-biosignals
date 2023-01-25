import React, { useState } from 'react';

import { Button, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

import { DEFAULT_TIME } from '../constants/constants';

const DateAndTime = (props: { handleChange: (arg: any) => void }) => {
  const [selectedDateAndTime, setSelectedDateAndTime] = useState({
    date: new Date(),
    time: DEFAULT_TIME,
  });

  const handleDateChange = (date: Date | null) => {
    setSelectedDateAndTime({
      ...selectedDateAndTime,
      date: new Date(date!),
    });
  };

  const onChange = (event: { target: { value: string } }) => {
    setSelectedDateAndTime({
      ...selectedDateAndTime,
      time: event.target.value,
    });
  };

  const addDate = () => {
    let month = (selectedDateAndTime.date.getMonth() + 1).toString();
    let day = selectedDateAndTime.date.getDate().toString();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    let formattedDateAndTime =
      selectedDateAndTime.date.getFullYear() +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      selectedDateAndTime.time;

    props.handleChange(formattedDateAndTime);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '135px',
        marginTop: '30px',
      }}
    >
      <div style={{ padding: '10px' }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            autoOk
            label="Date"
            value={selectedDateAndTime.date}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div style={{ padding: '10px' }}>
        <TextField
          label="Time"
          type="time"
          fullWidth
          value={selectedDateAndTime.time}
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </div>
      <div
        style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}
      >
        <Button variant="outlined" color="primary" onClick={addDate}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default DateAndTime;
