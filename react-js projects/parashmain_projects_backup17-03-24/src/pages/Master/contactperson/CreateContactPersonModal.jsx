import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_CONTACTPERSON, CREATE_DEPARTMENT, CREATE_DESIGNATION, CREATE_INDUSTRIAL_TYPE, CREATE_ITEM_CATEGORY, CREATE_ITEM_MAKER, CREATE_LEAD_REFERENCE, CREATE_LEAVE, CREATE_SHIFT, CREATE_SUBITEM_CATEGORY, CREATE_TERMS_CONDITIONS, CREATE_UNIT, CREATE_UNIT_MEASURE, CREATE_USER, CREATE_WAREHOUSE, GET_ALL_CUSTOMER_WO_PAGINATION, GET_CUSTOMER, GET_DEPARTMENT_WO_PAGINATE, GET_DESIGNATION_WO_ADMIN, GET_ITEM_CATEGORY } from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class CreateContactPersonModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Contact Person", link: process.env.PUBLIC_URL + "/leadTabs" },
                { title: "Create Contact Person", link: process.env.PUBLIC_URL + "/#" },
            ],
            selectedFiles: [],
            Img: "",
            status: "Active",
            inputMobileField: "",
            Night: "0",
            morning: "0",
            isAadharBase64URL: "",
            fileData: "",
            itemcategory: [],
            inputnumber: "",
            inputnumber2: "",
            Designationlist: [],
            Departmentlist: [],
            Customerlist: [],

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    componentDidMount() {
        this.GetAllDesignation();
        this.GetAllDepartment();
        this.GetAllCustomer();

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

    // GET ALL DESIGNATION GROUP
    async GetAllDesignation() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_DESIGNATION_WO_ADMIN, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ Designationlist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }
    // GET ALL DESIGNATION GROUP
    async GetAllDepartment() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_DEPARTMENT_WO_PAGINATE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ Departmentlist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }

    // // GET ALL DESIGNATION GROUP
    async GetAllCustomer() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_ALL_CUSTOMER_WO_PAGINATION, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ Customerlist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }

    handleCloseModal = () => {
        this.props.closeModalCallback();
      };
    // CREATE USER API
    handleSubmit(event, values) {

        var Token = localStorage.getItem("userToken");

        try {
            var myHeaders = JSON.stringify({
                Authorization: "Bearer " + Token,
                "Content-Type": "application/json",
            });
            var raw = JSON.stringify({
                first_name: values.firstname,
                last_name: values.lastname,
                customer_id_encode: values.customer,
                mobile_no_1: this.state.inputnumber,
                mobile_no_2: this.state.inputnumber2,
                email: values.email,
                designation_id_encode: values.selecteddesignation,
                department_id_encode: values.selecteddepartment,
                status: "Active"
            });
            fetch(CREATE_CONTACTPERSON, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Contact Person Created Successfully !", {
                            type: "success",
                        });
                        // this.props.history.goBack();
                        this.handleCloseModal();
                    }
                    else if (data.result === false) {
                        toast(data.message, {
                            type: "error",
                        });
                    }
                    else {
                        toast("Unable to Create Contact Person", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to create Contact Person", {
                type: "error",
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


    render() {
        const { isAadharBase64URL, fileData } = this.state;
        const { isView } = this.props;
        return (
            <React.Fragment>
                <div>
                    <Container fluid>
                        {/* <Breadcrumb title="Add Contact Person" breadcrumbItems={this.state.breadcrumbItems} /> */}
                        
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
                                                First Name
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="firstname"
                                                placeholder="First Name"
                                                type="text"
                                                errorMessage="Please Provide First Name"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Last Name
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="lastname"
                                                placeholder="Last Name"
                                                type="text"
                                                errorMessage="Please Provide Last Name"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>
                                        <Col md="3" className="d-inline">

                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom04"
                                            >
                                                Select Designation
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                required={true}
                                                name="selecteddesignation"
                                                type="select"
                                                id="validationCustom04"
                                                // value={this.state.selectedcountry}
                                                errorMessage="Please Select a Designation."
                                                validate={{ required: { value: true } }}
                                                className="form-control"
                                            >
                                                <option value={""} >Select Designation</option>
                                                {this.state.Designationlist.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.designation_name}</option>

                                                    );
                                                })}
                                            </AvField>
                                        </Col>
                                        <Col md="3" className="d-inline">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom04"
                                            >
                                                Select Department
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            {/* <input
                                                            style={{ width: "200px" }}
                                                            type="date"
                                                            placeholder="Enter something..."
                                                        // Add other attributes as needed   
                                                        /> */}
                                            <AvField
                                                required={true}
                                                name="selecteddepartment"
                                                type="select"
                                                id="validationCustom04"
                                                // value={this.state.selectedcountry}
                                                errorMessage="Please Select a Department."
                                                validate={{ required: { value: true } }}
                                                className="form-control"
                                                onChange={(e) => {
                                                    this.setState({
                                                        selectedcountry: e.target.value,
                                                    });
                                                }}
                                            >
                                                <option value={""} >Select Department</option>
                                                {this.state.Departmentlist.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.department_name}</option>

                                                    );
                                                })}
                                            </AvField>
                                        </Col>
                                        <Col md="3" className="d-inline">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom04"
                                            >
                                                Select Customer
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            {/* <input
                                                            style={{ width: "200px" }}
                                                            type="date"
                                                            placeholder="Enter something..."
                                                        // Add other attributes as needed   
                                                        /> */}
                                            <AvField
                                                required={true}
                                                name="customer"
                                                type="select"
                                                id="validationCustom04"
                                                // value={this.state.selectedcountry}
                                                errorMessage="Please Select a Customer."
                                                validate={{ required: { value: true } }}
                                                className="form-control"
                                                onChange={(e) => {
                                                    this.setState({
                                                        selectedcountry: e.target.value,
                                                    });
                                                }}
                                            >
                                                <option value={""} >Select Customer</option>
                                                {this.state.Customerlist.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.customer_type}</option>

                                                    );
                                                })}
                                            </AvField>
                                        </Col>

                                        <Col md="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom007"
                                                >
                                                    Phone No.
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>


                                                <PhoneInput

                                                    placeholder=""
                                                    country={"in"}
                                                    enableSearch={true}
                                                    errorMessage=" Please provide a Number"
                                                    id="validationCustom007"
                                                    validate={{
                                                        required: {
                                                            value: true
                                                        },
                                                    }}
                                                    inputStyle={{ width: "100%" }}
                                                    style={{
                                                        borderRadius: 50,
                                                    }}
                                                    inputProps={{
                                                        name: 'mobile',
                                                        required: true,

                                                    }}
                                                    onChange={(phone) => {
                                                        this.setState({
                                                            inputnumber: phone,
                                                        });

                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        {/* <Col md="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom007"
                                                >
                                                    Phone No.
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>


                                                <PhoneInput

                                                    placeholder=""
                                                    country={"in"}
                                                    enableSearch={true}
                                                    errorMessage=" Please provide a Number"
                                                    id="validationCustom007"
                                                    validate={{
                                                        required: {
                                                            value: true
                                                        },
                                                    }}
                                                    inputStyle={{ width: "100%" }}
                                                    style={{
                                                        borderRadius: 50,
                                                    }}
                                                    inputProps={{
                                                        name: 'mobile',
                                                        required: true,

                                                    }}
                                                    onChange={(phone) => {
                                                        this.setState({
                                                            inputnumber2: phone,
                                                        });

                                                    }}
                                                />
                                            </div>
                                        </Col> */}
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                E-Mail
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="email"
                                                placeholder="E-Mail"
                                                type="email"
                                                errorMessage="Please Provide E-Mail"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>
                                    </Row>
                                    <Button color="primary" type="submit" style={{float :'right'}}>
                                        Create Contact Person
                                    </Button>

                                    {/* <Button
                                        color="secondary"
                                        className="mx-2"
                                        onClick={() => this.props.history.goBack()}
                                    >
                                        Cancel
                                    </Button> */}
                                </AvForm>
                      
                    </Container>
                </div>
            </React.Fragment>
        );
    };
};

export default CreateContactPersonModal;
