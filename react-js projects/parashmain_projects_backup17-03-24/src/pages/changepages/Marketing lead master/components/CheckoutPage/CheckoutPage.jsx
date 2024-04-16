import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { Formik, Form } from 'formik';

import AddressForm from './Forms/AddressForm';
import PaymentForm from './Forms/PaymentForm';
import ContactPerson from './Forms/ContactPerson';
import LeadDocumentDetails from './Forms/LeadDocumentDetails';
import ReviewOrder from './ReviewOrder';
import CheckoutSuccess from './CheckoutSuccess';

import validationSchema from './FormModel/validationSchema';
import checkoutFormModel from './FormModel/checkoutFormModel';
import formInitialValues from './FormModel/formInitialValues';
import {useHistory} from 'react-router-dom';

import useStyles from './styles';

const steps = ['Lead Details', 'Company Details', 'Contact Person Details', 
'Lead Document Details',];
const { formId, formField } = checkoutFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm formField={formField} />;
    case 1:
      return <PaymentForm formField={formField} />;
      case 2:
        return <ContactPerson formField={formField} />;
      case 3:
        return <LeadDocumentDetails formField={formField} />;
      // case 4:
      // return <ReviewOrder />;
    default:
      return <div>Not Found</div>;
  }
}

export default function CheckoutPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
  //  console.log(values, "===========>value");
  //  console.log(actions, "==============>action");
    await _sleep(1000);
    // alert(JSON.stringify(values, null, 2));

    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values, actions) {

    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const history = useHistory();

  function navigatefuc() {
    // history.push('/parasmanierp/dashboard');
  }



  return (
    <React.Fragment>
      
      {/* <Typography component="h1" variant="h4" align="center" color="white">
      ADD MARKET LEAD
      </Typography> */}
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <CheckoutSuccess />
        ) : (
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                      if (isLastStep) {
                        navigatefuc();
                      }
                    }}
                  >
                    {isLastStep ? 'Place order' : 'Next'}
                  </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}
