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
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import {
  CREATE_DEPARTMENT,
  CREATE_DESIGNATION,
  GET_AllDESIGNATIONCOMPANYWISE,
  CREATE_USER,
  CREATE_DESIGNATION_COMPANY_WISE_MASTER,
} from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class CreateDesignation extends Component {
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
      allDesignationWiseCompany:"",
      setisLoading :false,
      selectedCompany:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  // CREATE USER API
  handleSubmit(event, values) {
    if (this.state.status == "") {
      toast("Please select status", {
        type: "error",
      });
    } else {
      // this.setState({
      //     isLoading: true,
      // });
      var Token = localStorage.getItem("userToken");

      try {
        var myHeaders = JSON.stringify({
          Authorization: "Bearer " + Token,
          "Content-Type": "application/json",
        });

        if(this.state.selectedCompany){
          var raw = JSON.stringify({
            customer_id_encode:this.state.selectedCompany,
            designation_name: values.name,
            designation_description: values.description,
            status: this.state.status,
          });
          fetch(CREATE_DESIGNATION_COMPANY_WISE_MASTER, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + Token,
              "Content-Type": "application/json",
            },
            body: raw,
          }).then((response) => {
            response.json().then((data) => {
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
                toast("Unable to Create Designation", {
                  type: "error",
                });
              }
            });
          });
        }else{
          var raw = JSON.stringify({
            designation_name: values.name,
            designation_description: values.description,
            status: this.state.status,
          });
          fetch(CREATE_DESIGNATION, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + Token,
              "Content-Type": "application/json",
            },
            body: raw,
          }).then((response) => {
            response.json().then((data) => {
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
                toast("Unable to Create Designation", {
                  type: "error",
                });
              }
            });
          });
        }
       
      } catch (error) {
        toast("Unable to create Designation", {
          type: "error",
        });
      }
    }
  }

  getAllCompany = async (page, perPage) => {
    var Token = await localStorage.getItem("userToken");
    try {
      const response = await fetch(
        page
          ? `${GET_AllDESIGNATIONCOMPANYWISE}?page=${page}`
          : `${GET_AllDESIGNATIONCOMPANYWISE}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      this.setState({ allDesignationWiseCompany: data.data });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getAllCompany();
  }

  // Callback function to handle file data
  handleFileDataChange = (file) => {
    this.setState({ fileData: file });
  };

  handleAadharBase64DataChange = (base64) => {
    this.setState({ isAadharBase64URL: base64 });
  };

  render() {
    console.log("checkdataaaam",this.state.selectedCompany)
    const { isAadharBase64URL, fileData } = this.state;
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
              {/* <Col lg="3">
                <Label className="form-label" htmlFor="validationCustom01">
                  Company Type <span style={{ color: "#ff0000" }}>*</span>
                </Label>
                <AvField
                  name="Company"
                  type="select"
                  id="validationCustom01"
                  errorMessage="Please Select a Company."
                  validate={{ required: { value: true } }}
                  className="form-control"
                  onChange={(e) => {
                    this.setState({ selectedCompany: e.target.value});
                  }}
                >
                  <option value={""}>Select Company</option>
                  {this.state.allDesignationWiseCompany?.map((item) => {
                    return (
                      <option value={item.customer_id}>
                        {item.company_name}
                      </option>
                    );
                  })}
                </AvField>
              </Col> */}
                <AvForm
                  className="needs-validation"
                  onValidSubmit={this.handleSubmit}
                  // onSubmit={this.submitStep1}
                >
                    
                  <Row className="mt-2">
                  
                    <Col lg="3">
                      <Label
                        className="form-label"
                        htmlFor="validationCustom01"
                      >
                        Name
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
                    </Col>
                    <Col lg="4">
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="validationCustom01"
                        >
                         Description
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
                    <Col lg="3">
                <Label className="form-label" htmlFor="validationCustom01">
                  Company Type <span style={{ color: "#ff0000" }}>*</span>
                </Label>
                <AvField
                  name="Company"
                  type="select"
                  id="validationCustom01"
                  errorMessage="Please Select a Company."
                  validate={{ required: { value: true } }}
                  className="form-control"
                  onChange={(e) => {
                    this.setState({ selectedCompany: e.target.value});
                  }}
                >
                  <option value={""}>Select Company</option>
                  {this.state.allDesignationWiseCompany?.map?.((item) => {
                    return (
                      <option value={item.customer_id}>
                        {item.company_name}
                      </option>
                    );
                  })}
                </AvField>
              </Col>
                    {/* <Col md="4">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Status
                                                </Label>
                                                <br></br>
                                                <input
                                                    checked={this.state.status == "Active" ? true : false}
                                                    // checked={
                                                    //     this.state.isWhatsapp === "1" ? true : false
                                                    // }
                                                    onChange={(val) =>
                                                        this.setState({
                                                            status: val.target.checked ? "Active" : "",
                                                        })
                                                    }
                                                    className="form-check-input"
                                                    type="checkbox"

                                                    id="invalidCheck3"
                                                    required={true}
                                                />
                                                <label
                                                    className="form-check-label px-2"
                                                    htmlFor="invalidCheck3"
                                                >
                                                    Active
                                                </label>
                                                <div className="invalid-feedback">
                                                    Select Active
                                                </div>
                                            </div>
                                        </Col> */}
                  </Row>

                  <Button color="primary" type="submit">
                    Save
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

export default CreateDesignation;
