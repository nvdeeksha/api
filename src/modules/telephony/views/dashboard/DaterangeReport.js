import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core';

export default function MaterialUIPickers(props) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());



  const handleSubmit = (e) => {
    console.log("i submitted")
    props.getALF(startDate, endDate)
  };

  console.log(startDate, endDate)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <Grid item lg={3} sm={6}> */}
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Start Date"
        value={startDate}
        onChange={date => {
          props.handleChange()
          setStartDate(date)
        }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      /> &nbsp;
      {/* </Grid> */}
      {/* <Grid item lg={3} sm={6}> */}
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="End Date"
        value={endDate}
        onChange={date => {
          props.handleChange()
          setEndDate(date)
        }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
      <br />
      {/* </Grid> */}
      {/* <Grid item lg={3} sm={6}> */}
      <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>Show Records</Button>
      {/* </Grid> */}
      {/* <Grid item lg={3} sm={6}> */}
      <br />
      {/* </Grid> */}
    </MuiPickersUtilsProvider>
  );
}
