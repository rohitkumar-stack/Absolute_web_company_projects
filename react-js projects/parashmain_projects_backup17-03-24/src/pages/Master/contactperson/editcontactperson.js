import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, FormGroup } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_USER, GET_ALL_CUSTOMER_WO_PAGINATION, GET_CONTACTPERSON_BY_ID, GET_COUNTRY_BY_ID, GET_DEPARTMENT_BY_ID, GET_DEPARTMENT_WO_PAGINATE, GET_DESIGNATION_BY_ID, GET_DESIGNATION_WO_ADMIN, GET_HSN_CODE_BY_ID, GET_INDUSTRIAL_TYPE_BY_ID, GET_ITEM_CATEGORY, GET_ITEM_CATEGORY_BY_ID, GET_ITEM_MAKER_BY_ID, GET_ITEM_SUB_CATEGORY_BY_ID, GET_LEAD_REFERENCE_BY_ID, GET_LEAVE_BY_ID, GET_LEDGER_GROUP_BY_ID, GET_SHIFT_BY_ID, GET_TERMS_CONDITIONS_BY_ID, GET_UNIT_BY_ID, GET_UNIT_MEASURE_BY_ID, GET_USER_BY_ID, GET_WAREHOUSE_BY_ID, UPDATE_CONTACTPERSON, UPDATE_COUNTRY, UPDATE_DEPARTMENT, UPDATE_DESIGNATION, UPDATE_HSN_CODE, UPDATE_INDUSTRIAL_TYPE, UPDATE_ITEM_CATEGORY, UPDATE_ITEM_MAKE, UPDATE_ITEM_SUB_CATEGORY, UPDATE_LEAD_REFERENCE, UPDATE_LEAVE, UPDATE_LEDGER_GROUP, UPDATE_SHIFT, UPDATE_TERMS_CONDITIONS, UPDATE_UNIT, UPDATE_UNIT_MEASURE, UPDATE_USER, UPDATE_WAREHOUSE } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";

class EditContactPerson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Contact Person", link: process.env.PUBLIC_URL + "/leadTabs" },
                { title: "Edit Contact Person", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            status: "",
            itemcategory: [],
            inputnumber: "",
            inputnumber2: "",
            Designationlist: [],
            Departmentlist: [],
            Customerlist: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };


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

    componentDidMount() {
        this.GetAllDesignation();
        this.GetAllDepartment();
        this.GetAllCustomer();
        // Access the location object to get route parameters
        const { location } = this.props;
        const { pathname } = location;

        // Parse the pathname to get the id parameter
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        // this.setState({ id: id })
        this.GetHSNCOde(id);
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




    // GET 
    async GetHSNCOde(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_CONTACTPERSON_BY_ID +
                id,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        if (data.data) {
                            this.setState({
                                getById: data.data,
                                inputnumber: data.data.mobile_no_1,
                                inputnumber2: data.data.mobile_no_2,
                                status: data.data.status
                            });
                            this.setState({
                                isLoading: false,
                            });
                        }
                    } else {

                        this.setState({
                            isLoading: false,
                        });
                    }
                });
            });
        } catch (error) {
            this.setState({
                isLoading: false,
            });

            this.setState({
                isLoading: false,
            });
        }
    }

    handleSubmit(event, values) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_CONTACTPERSON + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: values.firstname,
                    last_name: values.lastname,
                    customer_id_encode: values.customer,
                    mobile_no_1: this.state.inputnumber,
                    mobile_no_2: this.state.inputnumber2,
                    email: values.email,
                    designation_id_encode: values.selecteddesignation,
                    department_id_encode: values.selecteddepartment,
                    status: "Active"
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Contact Person Updated Successfully !", {
                            type: "success",
                        });
                        this.setState({
                            isLoading: false
                        });
                    } else {
                        toast("Unable to Update Contact Person", {
                            type: "error",
                        });
                        toast(data.message, {
                            type: "error",
                        });
                        this.setState({
                            isLoading: false,
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to Update Contact Person", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Edit Contact Person" breadcrumbItems={this.state.breadcrumbItems} />
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
                            <Card>
                                <CardBody>

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
                                                    value={this.state.getById.first_name}
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
                                                    value={this.state.getById.last_name}
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
                                                    value={this.state.getById.designation_id}
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
                                                    value={this.state.getById.department_id}
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
                                                    value={this.state.getById.customer_id}
                                                    // disabled
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
                                                        value={this.state.inputnumber}
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
                                                        value={this.state.inputnumber2}
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
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    E-Mail
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.email}
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

                                        <Button color="primary" type="submit" >
                                            Update
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
                        )}
                    </Container>
                </div>
            </React.Fragment>
        );
    };
};

export default EditContactPerson;
