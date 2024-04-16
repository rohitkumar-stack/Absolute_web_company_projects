import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { InputField, DatePickerField,SelectField } from '../../FormFields';
import { Row, Col, Card, CardBody, Container, Label, Form, Button } from "reactstrap";
import Dropzone from "react-dropzone";

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

export default function LeadDocumentDetails(props) {
  const {
    formField: {
      documentType,
      documentName,
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
           Document Type*
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>
          <SelectField
            name={documentType.name}
            data={cities}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
        <Label
            className="form-label"
            htmlFor="validationCustom01" 
          >
          Document Name*
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>
          <SelectField
            name={documentName.name}
            data={cities}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={12}>
        <Label
            className="form-label"
            htmlFor="validationCustom01" 
          >
         Upload Document**
          <span style={{ color: "#ff0000" }}>*</span>
        </Label>

        <Dropzone
          onDrop={acceptedFiles =>
          this.handleAcceptedFiles(acceptedFiles)
         }
        >
        {({ getRootProps, getInputProps }) => (
        <div className="dropzone">
          <div
            className="dz-message needsclick"
           {...getRootProps()}
          >
        <input {...getInputProps()} />
          <div className="mb-3">
       <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
        </div>
        <h4>Drop files here or click to upload.</h4>
        </div>
        </div>
        )}
        </Dropzone>
        
        </Grid>

   
    

      </Grid>
    </React.Fragment>
  );
}
