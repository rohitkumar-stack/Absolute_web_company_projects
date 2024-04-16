// Import necessary dependencies
import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define validation schema for each step
const step1ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  });
  
  const step2ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
  });
  
  const step3ValidationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
  });
  

class CreateMarketingLead6 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentStep: 1,
        };
      }
    
      // Function to handle form submission
      handleSubmit = (values, { setSubmitting }) => {
        // Handle form submission logic here
        setSubmitting(false);
      };
    
      // Function to handle next step
      nextStep = () => {
        this.setState((prevState) => ({
          currentStep: prevState.currentStep + 1,
        }));
      };
    
      // Function to handle previous step
      prevStep = () => {
        this.setState((prevState) => ({
          currentStep: prevState.currentStep - 1,
        }));
      };

  render() {
    const { currentStep } = this.state;

    return (
        <div>
        <h1>Multi-Step Form</h1>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
          }}
          validationSchema={
            currentStep === 1
              ? step1ValidationSchema
              : currentStep === 2
              ? step2ValidationSchema
              : step3ValidationSchema
          }
          onSubmit={this.handleSubmit}
        >
          {({ values, isSubmitting, errors, touched }) => (
            <Form>
              {currentStep === 1 && (
                <div>
                  <h2>Step 1</h2>
                  <Field type="text" name="firstName" placeholder="First Name" />
                  <ErrorMessage name="firstName" component="div" />
                  <Field type="text" name="lastName" placeholder="Last Name" />
                  <ErrorMessage name="lastName" component="div" />
                  <button type="button" onClick={this.nextStep}>
                    Next
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2>Step 2</h2>
                  <Field type="text" name="email" placeholder="Email" />
                  <ErrorMessage name="email" component="div" />
                  <Field type="text" name="phone" placeholder="Phone" />
                  <ErrorMessage name="phone" component="div" />
                  <button type="button" onClick={this.prevStep}>
                    Previous
                  </button>
                  <button type="button" onClick={this.nextStep}>
                    Next
                  </button>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2>Step 3</h2>
                  <Field type="text" name="address" placeholder="Address" />
                  <ErrorMessage name="address" component="div" />
                  <button type="button" onClick={this.prevStep}>
                    Previous
                  </button>
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>

        {/* Progress Bar */}
        <div style={{ marginTop: '20px' }}>
          Step {currentStep} of 3
          <progress value={currentStep} max="3"></progress>
        </div>
      </div>
    );
  }
}

export default CreateMarketingLead6;
