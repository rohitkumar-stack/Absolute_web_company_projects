import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { InputField, DatePickerField,SelectField } from '../../FormFields';
import { Row, Col, Card, CardBody, Container, Label, Form, Button } from "reactstrap";

const cities = [
  {
    value: undefined,
    label: 'None'
  },
  {
    value: '1',
    label: 'New York'
  },
  {
    value: '2',
    label: 'Chicago'
  },
  {
    value: '3',
    label: 'Saigon'
  }
];

export default function PaymentForm(props) {
  const {
    formField: {
      companyName,
      companyOwner,
        // cardNumber, 
       // expiryDate, 
        //cvv 
      }
  } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      Company Details
      </Typography>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={3}>
        <Label
            className="form-label"
            htmlFor="validationCustom01" 
          >
           Select Company Name*
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>
          <SelectField
            name={companyName.name}
            data={cities}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={12}>
        <Label
            className="form-label"
            htmlFor="validationCustom01" 
          >
           Ownership Type*
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>
          <SelectField
            name={companyOwner.name}
            data={cities}
            fullWidth
          />
        </Grid>

        

    

      </Grid>
    </React.Fragment>
  );
}
