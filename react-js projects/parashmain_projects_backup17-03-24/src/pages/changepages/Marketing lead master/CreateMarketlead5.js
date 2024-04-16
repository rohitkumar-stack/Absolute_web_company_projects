import React, { Component } from "react";
import { Formik, Field, ErrorMessage, setTouched } from 'formik';
import * as Yup from 'yup';
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Label,
  Form,
  FormGroup,
  Input,
  Button,
  CardHeader,
  Progress,
} from "reactstrap";
import Breadcrumb from "../../../components/Common/Breadcrumb";



const validationSchema = Yup.object().shape({
    inputMobileField: Yup.string().required("Mobile Number is required"),
    // Add validation for other fields in other steps
    otherField: Yup.string().required("Other Field is required"),
  });
  

class CreateMarketingLead5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Market Lead", link: process.env.PUBLIC_URL + "/marketingleadlist" },
        { title: "Create Market Lead", link: process.env.PUBLIC_URL + "/#" },
      ],
      step: 1,
      selectedFiles: [],
      Img: "",
      status: "Active",
      inputMobileField: "",
      Night: "0",
      morning: "0",
      isAadharBase64URL: "",
      fileData: "",
      itemcategory: [],
      Leadreferencelist: [],
      customerlist: [],
      otherField: "",
    };
  }

  nextStep = () => {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  };

  prevStep = () => {
    this.setState((prevState) => ({
      step: prevState.step - 1,
    }));
  };

  

  render() {
    const { step } = this.state;

    return (
      <>
       <React.Fragment>
          <div className="page-content">
            <Container fluid>
              <Breadcrumb title="Add Market Lead" breadcrumbItems={this.state.breadcrumbItems} />
              <Progress value={(step / 4) * 100} />
              <Card className="shadow">
                <CardHeader className="text-white">
                  <h3 className="mb-0">Lead Form - Step {step}</h3>
                </CardHeader>
                <CardBody>
                  <Formik
                    initialValues={{
                      inputMobileField: this.state.inputMobileField,
                      otherField: this.state.otherField,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, touched, errors }) => {


                      const hasErrors = Object.keys(errors).length > 0;

                      if (!hasErrors && Object.values(touched).every(Boolean)) {
                        // If it's the last step, you can show a confirmation or summary page
                        if (step === 4) {
                        } else {
                          // Move to the next step if there are no validation errors and all fields are touched
                          this.nextStep();
                        }
                      }

                      setSubmitting(false);
                    }}
                  >
                    {({ isSubmitting, values, errors, touched, handleSubmit }) => (
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          {step === 1 && (
                            <>
                                 <>
                              <Label for="inputMobileField">Mobile Number</Label>
                              <Field
                                type="text"
                                id="inputMobileField"
                                name="inputMobileField"
                                placeholder="Enter mobile number"
                                className="form-control"
                              />
                              <ErrorMessage name="inputMobileField" component="div" className="text-danger" />
                            </>
                            </>
                          )}

                          {step === 2 && (
                              <>
                              <Label for="otherField">Other Field1</Label>
                              <Field
                                type="text"
                                id="otherField"
                                name="otherField"
                                placeholder="Enter other field"
                                className="form-control"
                              />
                              <ErrorMessage name="otherField" component="div" className="text-danger" />
                            </>
                          )}

                          {step === 3 && (
                             <>
                             <Label for="otherField">Other Field3</Label>
                             <Field
                               type="text"
                               id="otherField"
                               name="otherField"
                               placeholder="Enter other field"
                               className="form-control"
                             />
                             <ErrorMessage name="otherField" component="div" className="text-danger" />
                           </>
                          )}

                          {step === 4 && (
                           <>
                           <Label for="otherField">Other Field4</Label>
                           <Field
                             type="text"
                             id="otherField"
                             name="otherField"
                             placeholder="Enter other field"
                             className="form-control"
                           />
                           <ErrorMessage name="otherField" component="div" className="text-danger" />
                         </>
                          )}
                        </FormGroup>

                        <div>
                          {step > 1 && (
                            <Button color="secondary" type="button" onClick={this.prevStep}>
                              Previous
                            </Button>
                          )}

                          {step < 4 ? (
                            <Button color="primary" type="submit"  onClick={this.nextStep} style={{float: "right"}}>
                              Next
                            </Button>
                          ) : (
                            <Button color="success" type="submit" style={{float: "right"}}>
                              Submit
                            </Button>
                          )}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Container>
          </div>
        </React.Fragment>
      </>
    );
  }
}

export default CreateMarketingLead5;
