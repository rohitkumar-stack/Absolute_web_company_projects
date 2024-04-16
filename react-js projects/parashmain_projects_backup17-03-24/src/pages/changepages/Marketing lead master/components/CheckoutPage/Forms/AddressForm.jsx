import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { InputField, CheckboxField, SelectField } from '../../FormFields';
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

// const states = [
//   {
//     value: undefined,
//     label: 'None'
//   },
//   {
//     value: '11',
//     label: 'Florida'
//   },
//   {
//     value: '22',
//     label: 'Michigan'
//   },
//   {
//     value: '33',
//     label: 'Texas'
//   }
// ];

const countries = [
  {
    value: null,
    label: 'None'
  },
  {
    value: '111',
    label: 'United States'
  },
  {
    value: '222',
    label: 'Italy'
  },
  {
    value: '333',
    label: 'Vietnam'
  }
];

export default function AddressForm(props) {
  const {
    formField: {
      firstName,
      leadNature,
      leadStatus,
      leadType,
      leadReference,
      leadDetails,
      comment,
  
      useAddressForPaymentDetails
    }
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={3}>
          <Label
            className="form-label"
            htmlFor="validationCustom01"
            
          >
          Lead Topic
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>
          <InputField name={firstName.name} placeholder=" Lead Topic" fullWidth />
        </Grid>

        <Grid item xs={12} sm={3}>
        <Label
            className="form-label"
            htmlFor="validationCustom01" 
          >
            Lead Nature
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>
          <SelectField
            name={leadNature.name}
            data={cities}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Label
            className="form-label"
            htmlFor="validationCustom01"
          >
          Lead Type
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>
         <SelectField
            name={leadType.name}
            data={cities}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Label
            className="form-label"
            htmlFor="validationCustom01"
          >
          Lead Status
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>
         <SelectField
            name={leadStatus.name}
            data={cities}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Label
            className="form-label"
            htmlFor="validationCustom01" 
          >
         Lead Reference Type
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>
        <SelectField
            name={leadReference.name}
            data={cities}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Label
            className="form-label"
            htmlFor="validationCustom01"

          >
          Reference Person Details
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>
        <SelectField
            name={leadDetails.name}
            data={cities}
            fullWidth
          />
        </Grid>

        {/* <Grid item xs={12} sm={3}>
          <Label
            className="form-label"
            htmlFor="validationCustom01"

          >
          Reference Person Details
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>
        <SelectField
            name={leadDetails.name}
            data={cities}
            fullWidth
          />
        </Grid> */}

        <Grid item xs={12} sm={12}>
          <Label
            className="form-label"
            htmlFor="validationCustom01"
            
          >
          Comment
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>
          <InputField name={comment.name} placeholder=" Lead Topic" fullWidth />
        </Grid>
  
      </Grid>
    </React.Fragment>
  );
}
