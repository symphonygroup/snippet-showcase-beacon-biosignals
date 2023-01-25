import React, { useState } from 'react';

import DateAndTime from './DateAndTime';
import SelectVehicleType from './SelectVehicleType';
import ListingFormattedDates from './ListingFormattedDates';

import { getTax } from '../utils/utils';

import { DEFAULT_VECHICLE } from '../constants/constants';

const Home = () => {
  const [selectedVehicle, setVehicle] = useState(DEFAULT_VECHICLE);
  const [selectedDates, setDates] = useState<Date[]>([]);

  const handleVehicleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setVehicle(event.target.value);
  };

  const handleDateChange = (input: Date) => {
    if (!selectedDates.includes(input)) {
      setDates([...selectedDates, input]);
    }
  };

  const handleDeleteDate = (newDate: Date) => {
    setDates(selectedDates.filter((date) => date !== newDate));
  };

  const caluclateFollFee = () => {
    return getTax(selectedVehicle, selectedDates);
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px',
      }}
    >
      <>Congestion Tax Calculator - Gothenburg</>
      <SelectVehicleType
        vechileType={selectedVehicle}
        handleChange={handleVehicleChange}
      />
      <DateAndTime handleChange={handleDateChange} />
      <ListingFormattedDates
        dates={selectedDates}
        handleDeleteDate={handleDeleteDate}
      />
      <>Total toll fee: {caluclateFollFee()} SEK</>
    </div>
  );
};

export default Home;
