import React from 'react';

import { InputLabel, Select } from '@material-ui/core';
import { MENU_ITEMS } from '../constants/constants';

const SelectVehicleType = (props: {
  vechileType: string;
  handleChange: (arg: any) => void;
}) => {
  return (
    <div
      style={{
        width: '120px',
        marginTop: '30px',
      }}
    >
      <InputLabel>Vehicle Type</InputLabel>
      <Select
        native
        fullWidth
        value={props.vechileType}
        onChange={props.handleChange}
      >
        {MENU_ITEMS.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SelectVehicleType;
