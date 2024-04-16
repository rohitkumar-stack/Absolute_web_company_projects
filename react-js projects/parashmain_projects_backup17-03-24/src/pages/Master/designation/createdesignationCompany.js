import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Label,
  Form,
  Button,
} from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { ThreeDots } from "react-loader-spinner";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import { Input } from "reactstrap";
// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import {
  CREATE_DEPARTMENT,
  CREATE_DESIGNATION,
  GET_AllDESIGNATIONCOMPANYWISE,
  // GET_AllDESIGNATIONCOMPANYWISE,
  CREATE_USER,
  CREATE_DESIGNATION_COMPANY_WISE_MASTER,

} from "../../../globals";
import SimpleBar from "simplebar-react";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class createdesignationCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        {
          title: "Designation",
          link: process.env.PUBLIC_URL + "/designationlist",
        },
        { title: "Create Designation", link: process.env.PUBLIC_URL + "/#" },
      ],
      selectedFiles: [],
      Img: "",
      status: "Active",
      inputMobileField: "",
      Night: "0",
      morning: "0",
      isAadharBase64URL: "",
      fileData: "",
      allDesignationWiseCompany: [],
      setisLoading: false,
      selectedCompany: "",
      dataCompanyTypeArray: [],
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.getAllCompany();
    this.getAllDesinationName();
  }

  handleAcceptedFiles = (files) => {
    this.getBase64Icon(files);

    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    this.setState({ selectedFiles: files });
  };

  async getBase64Icon(files) {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64Data = reader.result;
        let base64Split = base64Data.split(",");
        const Img = base64Split[1];
        this.setState({ Img: Img });
      };

      reader.onerror = (error) => {
        console.error("Error occurred while reading the file:", error);
      };
    }
  }

  // CREATE USER DESINATION API
  async handleSubmit(event, values) {
    const { dataCompanyTypeArray } = this.state;
    this.setState({
      isLoading: true,
    });

    if (this.state.status === "") {
      toast("Please select status", { type: "error" });
    } else {
      try {


        // Assuming you have access to setLoading function to toggle loader state
        this.setState({
          isLoading: true,

        });

        var Token = localStorage.getItem("userToken");

        var myHeaders = {
          Authorization: "Bearer " + Token,
          "Content-Type": "application/json",
        };

        var raw = JSON.stringify({
          // customer_id_encode: this.state.selectedCompany,
          customerDetails: dataCompanyTypeArray,
          designation_name: values.name,
          designation_description: values.description,
          status: "Active",
        });

        const response = await fetch(CREATE_DESIGNATION_COMPANY_WISE_MASTER, {
          method: "POST",
          headers: myHeaders,
          body: raw,
        });

        const data = await response.json();

        // Assuming you have access to setLoading function to toggle loader state
        this.setState({
          isLoading: false
        });

        if (data.result === true) {
          toast("Designation Created Successfully !", {
            type: "success",
          });
          this.props.history.goBack();
        } else if (data.result === false) {
          toast(data.message, {
            type: "error",
          });
        } else {
          toast("Unable to Create Contact Person", {
            type: "error",
          });
        }
      } catch (error) {
        // Handle error
        console.error("Error creating contact person:", error);
        // Assuming you have access to setLoading function to toggle loader state
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  //GET COMPANY LISTS
  // getAllCompany = async (page, perPage) => {
  //   var Token = await localStorage.getItem("userToken");
  //   try {
  //     const response = await fetch(
  //       page
  //         ? `${GET_AllDESIGNATIONCOMPANYWISE}?page=${page}`
  //         : `${GET_AllDESIGNATIONCOMPANYWISE}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer " + Token,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     this.setState({ allDesignationWiseCompany: data.data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  async getAllDesinationName() {
    this.setState({
      isLoading: true,
  });
    var Token = localStorage.getItem("userToken");
    try {
      const response = await fetch(GET_AllDESIGNATIONCOMPANYWISE, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.result === true) {
        this.setState({ allDesignationWiseCompany: data.data });

      } else if (data.result === false) {
        toast(data.message, {
          type: "error",
        });
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching contacts:", error);
    } finally {
      this.setState({
          isLoading: false, // Ensure isLoading is set to false regardless of success or failure
      });
    }
  }

  // Callback function to handle file data
  handleFileDataChange = (file) => {
    this.setState({ fileData: file });
  };

  handleAadharBase64DataChange = (base64) => {
    this.setState({ isAadharBase64URL: base64 });
  };

  //ADD COMPANY TYPE CHECKBOX OF DAATA ONE ARRAY
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { selectedcontactpersonAddMore, allDesignationWiseCompany, selectedCustomerTypes } = this.state;

    // Constructing the new row data
    const newRowData = {
      customer_id_encode: allDesignationWiseCompany.id,
    };

    // Update the array of data in the state
    this.setState(prevState => ({
      dataCompanyTypeArray: [...(prevState.dataCompanyTypeArray || []), newRowData],
      ContactAddMore_Model: false,  // Closing the modal
      selectedcontactpersonAddMore: "", // Reset selected contact person
      CompanyType: { // Reset CompanyType object
        customer_id_encode: "",
      },
      selectedCustomerTypes: [], // Reset selectedCustomerTypes array
    }), () => {
      console.log('dataCompanyTypeArray:', this.state.dataCompanyTypeArray);
      console.log('selectedCustomerTypes:', this.state.selectedCustomerTypes);
    });
  };



  render() {
    // console.log("checkdataaaam", this.state.selectedCompany)
    const { isAadharBase64URL, fileData, allDesignationWiseCompany, dataCompanyTypeArray } = this.state;
    // console.log(dataCompanyTypeArray, "======>dataCompanyTypeArray")
    // console.log(allDesignationWiseCompany, "=====allDesignationWiseCompany")
    const { isView } = this.props;
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb
              title="Add Designation"
              breadcrumbItems={this.state.breadcrumbItems}
            />
            <Card>
              <CardBody>
                <AvForm
                  className="needs-validation"
                  onValidSubmit={this.handleSubmit}
                // onSubmit={this.submitStep1}
                >

                  <Row className="mt-2">

                    <Col lg="6">
                      <Label
                        className="form-label"
                        htmlFor="validationCustom01"
                      >
                        Designation Name
                        <span style={{ color: "#ff0000" }}>*</span>
                      </Label>
                      <AvField
                        name="name"
                        placeholder="Designation Name"
                        type="text"
                        errorMessage="please Provide Designation Name"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom01"
                      />

                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="validationCustom01"
                        >
                          Designation Description
                          {/* <span style={{ color: "#ff0000" }}>*</span> */}
                        </Label>
                        <AvField
                          name="description"
                          placeholder="Designation Description"
                          type="textarea"
                          // errorMessage="please Provide Description"
                          className="form-control"
                          // validate={{ required: { value: true } }}
                          id="validationCustom02"
                        />
                      </div>
                    </Col>

                    <Col lg="6">

                      {/* <Card>
                        <CardBody> */}
                          {/* start--- Company Type */}
                          <p style={{}}>Company Name <span style={{ color: "#ff0000" }}>*</span>
                          </p>
                          {this.state.isLoading ? (
                            <>
                              <ThreeDots
                                height="80"
                                width="80"
                                radius="9"
                                color="#4D5DC6"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{
                                  justifyContent: "center",
                                }}
                                wrapperClassName=""
                                visible={true}
                              />
                            </>
                          ) : (
                            <>

                              <AvForm
                                className="needs-validation"
                                onValidSubmit={this.handleFormSubmit}
                              >
                                <div className="scrollable-checkboxes" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                  {this.state.allDesignationWiseCompany.map((item, index) => {
                                    return (
                                      <div className="form-check" key={index}>
                                        <Input
                                          type="checkbox"
                                          name="type"
                                          className="form-check-input"
                                          id={`customControlInline-${index}`}
                                          onChange={(e) => {
                                            const { checked } = e.target;
                                            const newItem = { customer_id_encode: item.id };

                                            if (checked) {
                                              this.setState(prevState => ({
                                                dataCompanyTypeArray: [...prevState.dataCompanyTypeArray, newItem]
                                              }), () => {
                                                // Call getAllCompanyService() after setState has completed
                                                // this.getAllCompanyService();
                                              });
                                            } else {
                                              // Checkbox is unchecked, remove value from dataCompanyTypeArray
                                              this.setState(prevState => ({
                                                dataCompanyTypeArray: prevState.dataCompanyTypeArray.filter(
                                                  element => element.customer_id_encode !== newItem.customer_id_encode
                                                )
                                              }), () => {
                                                // Call getAllCompanyService() after setState has completed
                                                // this.getAllCompanyService();
                                              });
                                            }
                                          }}
                                          value={item.customer_id_encode}
                                        />


                                        <Label className="form-check-label" htmlFor={`customControlInline-${index}`}>{item.company_name}</Label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </AvForm>
                            </>
                          )}

                          {/* End--- Company Type*/}
                        {/* </CardBody>
                      </Card> */}

                    </Col>

                  </Row>

                  <Button color="primary" type="submit">
                    Create Designation
                  </Button>

                  <Button
                    color="secondary"
                    className="mx-2"
                    onClick={() => this.props.history.goBack()}
                  >
                    Cancel
                  </Button>
                </AvForm>
              </CardBody>
            </Card>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default createdesignationCompany;
