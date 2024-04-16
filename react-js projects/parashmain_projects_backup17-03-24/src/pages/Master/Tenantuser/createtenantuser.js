import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, FormGroup } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_USER, CREATE_USER_PERSONAL_DETAILS, CREATE_USER_SALARY_DETAILS, GET_ALL_ROLES_WITHOUT_ADMIN, GET_DESIGNATION_WO_ADMIN, GET_SHIFT, GET_STATE, GET_USERS_WITHOUT_ADMIN_ } from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "User", link: process.env.PUBLIC_URL + "/users" },
                { title: "Create User", link: process.env.PUBLIC_URL + "/#" },
            ],
            selectedFiles: [],
            Img: "",
            status: "Active",
            inputMobileField: "",
            Night: "0",
            morning: "0",

            // PROFILE IMAGE 
            isAadharBase64URL: "",
            fileData: "",

            // VEHILCE DATA
            isVehicleBase64URL: "",
            vehicledata: "",

            // AADHAR CARD DATA
            isAadharCBase64URL: "",
            Aadhardata: "",

            // QUALIFICATION DATA
            isQualificationBase64URL: "",
            Qualificationdata: "",

            designationlist: [],
            shiftlist: [],
            rolelist: [],
            Statelist: [],
            alluser: [],
            inputGuardiannumber: "",
            selectedStartDate: "",
            selectedstatus: ""
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

    componentDidMount() {
        this.GetAllDesignation();
        this.GetAllShift();
        this.GetAllRoles();
        this.GetAllStates();
        this.GetAllUser();

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
                        this.setState({ designationlist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }


    // GET ALL ROLES
    async GetAllRoles() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_ALL_ROLES_WITHOUT_ADMIN, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {

                    if (data.result === true) {
                        this.setState({ rolelist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }
    // GET ALL ROLES
    async GetAllUser() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_USERS_WITHOUT_ADMIN_, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {

                    if (data.result === true) {
                        this.setState({ alluser: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }

    // GET ALL DESIGNATION GROUP
    async GetAllShift() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_SHIFT, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ shiftlist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }

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

            };
        }
    }

    // GET ALL SENDERS
    async GetAllStates() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_STATE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ Statelist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }

    // CREATE USER API
    handleSubmit(event, values) {
        if (this.state.status == "") {
            toast("Please select status", {
                type: "error",
            });
        }
        else {
            // this.setState({
            //     isLoading: true,
            // });
            var Token = localStorage.getItem("userToken");

            try {
                var myHeaders = JSON.stringify({
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                });
                var raw = JSON.stringify({
                    first_name: values.firstname,
                    middle_name: values.middlename,
                    last_name: values.lastname,
                    email: values.email,
                    mobile_number: this.state.inputMobileField,
                    // mobile_number: this.state.inputMobileField,
                    role_id_encode: values.role,
                    designation_id_encode: values.designation,
                    shift_details_id_encode: values.shiftdetail,
                    status: this.state.status,
                    hashpassword: "123456",
                    dateofjoining: values.date,
                    profileimage: this.state.isAadharBase64URL.split(",")?.[1],
                    reporting_to_encode: values.reportdetail,
                    employee_status: values.employmentstatus,
                    start_dt: values.startdate,
                    end_dt: values.enddate,
                    notes: values.notes
                });
                fetch(CREATE_USER, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                    body: raw,
                }).then((response) => {
                    response.json().then((data) => {
                        if (data.result === true) {
                            this.PersonalDetail(event, values, data.data.id)
                            // toast("User Created Successfully !", {
                            //     type: "success",
                            // });
                            // this.props.history.goBack();
                        } else {
                            toast("Unable to Create User", {
                                type: "error",
                            });
                        }
                    });
                });
            } catch (error) {
                toast("Unable to Create User", {
                    type: "error",
                });

            }
        }
    }

    // AS SOON ORDER CREATED ORDER NEDS TO BE UPDATED
    async PersonalDetail(events, values, id) {
        const token = localStorage.getItem("userToken");
        try {
            await fetch(
                CREATE_USER_PERSONAL_DETAILS,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id_encode: id, //** required **//
                        guardians_name: values.guardianname,
                        guardians_relation: values.guardianrelation,
                        guardians_mobile_number: this.state.inputGuardiannumber,
                        address: values.address,
                        city: values.city,
                        state_id_encode: values.state,
                        pincode: values.pincode,
                        birthdate: values.dob,
                        age: values.age,
                        marital_status: values.maritalstatus,
                        caste: values.caste,
                        religion: values.religion,
                        height_weight: values.height,
                        blood_group: values.blood,
                        physical_disability: values.disability,
                        vehical_licence_encode: this.state.isVehicleBase64URL.split(",")?.[1],
                        adhar_card_proof_encode: this.state.isAadharCBase64URL.split(",")?.[1],
                        qualification_encode: this.state.isQualificationBase64URL.split(",")?.[1]
                    }),
                }
            )
                .then((response) => {
                    response.json().then((data) => {
                        if (data.result === true) {
                            this.Salarydetails(events, values, id);

                        }
                    });
                })
                .catch((error) => {
                    toast("Unable to Create User", {
                        type: "error",
                    });
                });
        } catch (error) {
            toast("Unable to Create User", {
                type: "error",
            });
        }
    }


    // AS SOON ORDER CREATED ORDER NEDS TO BE UPDATED
    async Salarydetails(events, values, id) {
        const token = localStorage.getItem("userToken");
        try {
            await fetch(
                CREATE_USER_SALARY_DETAILS,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id_encode: id,
                        bank_account_no: values.bankaccount, //** required **//
                        esi_no: values.esi,
                        pf_no: values.pf,
                        salary_structure: values.salarystructure,
                        salary_calculator: values.salarycalculator,
                        status: "Active"
                    }),
                }
            )
                .then((response) => {
                    response.json().then((data) => {
                        if (data.result === true) {
                            toast("User Created Successfully !", {
                                type: "success",
                            });
                            this.props.history.goBack();
                        }
                    });
                })
                .catch((error) => {
                    toast("Unable to Create User", {
                        type: "error",
                    });
                });
        } catch (error) {
            toast("Unable to Create User", {
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

    // VEHICLE LICENCE IMAGE 
    handleFileDataChangeVehicle = (file) => {
        this.setState({ vehicledata: file });
    };
    handleAadharBase64DataChangeVehicle = (base64) => {
        this.setState({ isVehicleBase64URL: base64 });
    };

    // VEHICLE LICENCE IMAGE 
    handleFileDataChangeAadhar = (file) => {
        this.setState({ Aadhardata: file });
    };
    handleAadharBase64DataChangeAadhar = (base64) => {
        this.setState({ isAadharCBase64URL: base64 });
    };

    // QUALIFICAION IMAGE 
    handleFileDataChangeQualification = (file) => {
        this.setState({ Qualificationdata: file });
    };
    handleAadharBase64DataChangeQualification = (base64) => {
        this.setState({ isQualificationBase64URL: base64 });
    };

    handleStartDateChange = (event, value) => {
        this.setState({ selectedStartDate: value });
    };

    getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }




    render() {
        const { isAadharBase64URL, fileData, isVehicleBase64URL, isAadharCBase64URL, isQualificationBase64URL } = this.state;
        const { isView } = this.props;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add user" breadcrumbItems={this.state.breadcrumbItems} />
                        <Card>
                            <CardBody>
                                <h5 className="p-1 border-bottom">Basic Information </h5>
                                <AvForm
                                    className="needs-validation"
                                    onValidSubmit={this.handleSubmit}
                                >
                                    <Row className="mt-3">
                                        <Col md="9">
                                            <Row md="12">

                                                <Col lg="4">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        First Name
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="firstname"
                                                        placeholder="First name"
                                                        type="text"
                                                        errorMessage="Please Provide First Name"
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
                                                            Middle Name
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            name="middlename"
                                                            placeholder="Middle Name"
                                                            type="text"
                                                            errorMessage="Please Provide Middle Name"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom02"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg="4">
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom02"
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
                                                            id="validationCustom02"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="4" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Select Designation
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="designation"
                                                        type="select"
                                                        id="validationCustom01"
                                                        // value={this.state.selectedcountry}
                                                        required
                                                        errorMessage=" Please Select Designation"
                                                        // validate={{ required: { value: true } }}
                                                        className="form-control"
                                                    >
                                                        <option value="">Select Designation</option>
                                                        {this.state.designationlist.map((item) => {
                                                            return (
                                                                <option value={item.id}>{item.designation_name}</option>

                                                            );
                                                        })}
                                                    </AvField>
                                                    {this.state.error && (
                                                        <div style={{ color: "red" }}>{this.state.error}</div>
                                                    )}
                                                </Col>
                                                <Col md="4" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Select Role
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="role"
                                                        type="select"
                                                        id="validationCustom01"
                                                        // value={this.state.selectedcountry}
                                                        required
                                                        errorMessage=" Please Select Role"
                                                        // validate={{ required: { value: true } }}
                                                        className="form-control"
                                                    >
                                                        <option value="">Select Role</option>
                                                        {this.state.rolelist.map((item) => {
                                                            return (
                                                                <option value={item.id}>{item.name}</option>

                                                            );
                                                        })}
                                                    </AvField>
                                                    {this.state.error && (
                                                        <div style={{ color: "red" }}>{this.state.error}</div>
                                                    )}
                                                </Col>
                                                <Col md="4">
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom04"
                                                        >
                                                            Email
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            name="email"
                                                            placeholder="Email"
                                                            type="email"
                                                            errorMessage="Please provide a valid email."
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom04"
                                                        />
                                                    </div>
                                                </Col>

                                                <Col md="4">
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom007"
                                                        >
                                                            Mobile
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <Row>
                                                            <Col md="12">
                                                                <PhoneInput
                                                                    name="mobile"
                                                                    placeholder=""
                                                                    country={"in"}
                                                                    enableSearch={true}
                                                                    onBlur={(e) => {
                                                                        // this.setState({
                                                                        //     phoneValidation: this.state.inputMobileField.length > 3,
                                                                        // });

                                                                    }
                                                                    }
                                                                    onFocus={(e) => {
                                                                        this.setState({
                                                                            // phoneValidation: true,
                                                                            phoneInputdirty: false
                                                                        });
                                                                        setTimeout(() => {

                                                                        }, 10);
                                                                    }
                                                                    }
                                                                    // className={(!this.state.phoneValidation && (this.state.step1Submit || this.state.phoneInputdirty)) ? "custom-phoneinput-false" : "custom-phoneinput-true"}
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
                                                                    // onChange={(phone) => alert(phone)}
                                                                    inputProps={{
                                                                        name: 'mobile',
                                                                        required: true,

                                                                    }}
                                                                    onChange={(phone) => {
                                                                        this.setState({
                                                                            phoneInputdirty: true
                                                                        });

                                                                        this.setState({
                                                                            inputMobileField: phone,

                                                                        });

                                                                    }}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col md="4">
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom04"
                                                        >
                                                            Joining Date
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            name="date"
                                                            placeholder="date"
                                                            type="date"
                                                            errorMessage="Please provide a valid date."
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom04"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md="3" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom023"
                                                    >
                                                        Select Shift
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>

                                                    <AvField
                                                        name="shiftdetail"
                                                        type="select"
                                                        id="validationCustom023"

                                                        required
                                                        errorMessage="Please Select Shift"

                                                        className="form-control"
                                                    >
                                                        <option value="">Select Shift</option>
                                                        {this.state.shiftlist.map((item) => {
                                                            return (
                                                                <option value={item.id}>{item.shift_name}{" "} {"("}{item.shift_start_time} {"to"} {item.shift_end_time}{")"}</option>

                                                            );
                                                        })}
                                                    </AvField>
                                                    {this.state.error && (
                                                        <div style={{ color: "red" }}>{this.state.error}</div>
                                                    )}
                                                </Col>
                                                <Col md="4" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom023"
                                                    >
                                                        Select Reporting To
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>

                                                    <AvField
                                                        name="reportdetail"
                                                        type="select"
                                                        id="validationCustom023"

                                                        required
                                                        errorMessage="Please Select Reporting To"

                                                        className="form-control"
                                                    >
                                                        <option value="">Select Reporting To</option>
                                                        {this.state.alluser.map((item) => {
                                                            return (
                                                                <option value={item.id}>{item.first_name}{" "}{item.middle_name}{" "}{item.last_name}</option>

                                                            );
                                                        })}
                                                    </AvField>
                                                    {this.state.error && (
                                                        <div style={{ color: "red" }}>{this.state.error}</div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom04"
                                            >
                                                Profile Image
                                            </Label>

                                            <CustomFileInputNew
                                                onDataChange={this.handleFileDataChange}
                                                onBase64Change={this.handleAadharBase64DataChange}
                                                defaultFile={isAadharBase64URL}
                                                isView={isView}
                                            />
                                        </Col>
                                    </Row>

                                    <h5 className="p-1 mt-3 border-bottom">Personal Information </h5>

                                    <Row className="mt-3" lg="8">

                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Guardian's Name
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="guardianname"
                                                placeholder="Guardian's Name"
                                                type="text"
                                                errorMessage="Please Provide Guardian's Name"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Guardian's Relation
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="guardianrelation"
                                                    placeholder="Guardian's Relation"
                                                    type="text"
                                                    errorMessage="Please Provide Guardian's Relation"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom007"
                                                >
                                                    Guardian's Phone No.
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
                                                            inputGuardiannumber: phone,
                                                        });

                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Date Of Birth
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="dob"
                                                    placeholder="Date Of Birth"
                                                    type="date"
                                                    errorMessage="Please provide a valid Date Of Birth."
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom04"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Age
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="age"
                                                    placeholder="Age"
                                                    type="text"
                                                    errorMessage="Please Provide Last Age"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Select Marital Status
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="maritalstatus"
                                                type="select"
                                                id="validationCustom01"
                                                // value={this.state.selectedcountry}
                                                required
                                                errorMessage=" Please Select Marital Status"
                                                // validate={{ required: { value: true } }}
                                                className="form-control"
                                            >
                                                <option value="">Select Marital Status</option>
                                                <option value="1">Single</option>
                                                <option value="2">Married</option>
                                                <option value="3">Widowed</option>

                                            </AvField>

                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Caste
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="caste"
                                                    placeholder="Caste"
                                                    type="text"
                                                    errorMessage="Please Provide Caste"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Religion
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="religion"
                                                    placeholder="Religion"
                                                    type="text"
                                                    errorMessage="Please Provide Religion"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Height Weight
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="height"
                                                    placeholder="Height Weight"
                                                    type="text"
                                                    errorMessage="Please Provide Height Weight"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Blood Group
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="blood"
                                                    placeholder="Blood Group"
                                                    type="text"
                                                    errorMessage="Please Provide Blood Group"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Physical Disability
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="disability"
                                                    placeholder="Physical Disability"
                                                    type="text"
                                                    errorMessage="Please Provide Physical Disability"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>

                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    City
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="city"
                                                    placeholder="City"
                                                    type="text"
                                                    errorMessage="Please Provide City"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg="3" className="d-inline">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom12"
                                            >
                                                Select State
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            {/* <input
                                                            style={{ width: "200px" }}
                                                            type="date"
                                                            placeholder="Enter something..."
                                                        // Add other attributes as needed   
                                                        /> */}
                                            <AvField
                                                name="state"
                                                type="select"
                                                id="validationCustom12"
                                                required
                                                // value={this.state.selectedcountry}
                                                errorMessage="Please Select State."
                                                validate={{ required: { value: true } }}

                                                className="form-control"
                                            >
                                                <option value={""} >Select State</option>
                                                {this.state.Statelist.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.state_name}</option>

                                                    );
                                                })}
                                            </AvField>
                                        </Col>
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom08"
                                            >
                                                Pincode
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="pincode"
                                                placeholder="Pincode"
                                                type="number"
                                                errorMessage="Please Provide Pincode"
                                                className="form-control"
                                                validate={{
                                                    required: { value: true },
                                                    maxLength: {
                                                        value: 6,
                                                        errorMessage:
                                                            "Pincode cannot exceed 6 characters",
                                                    },
                                                }}
                                                // validate={{ required: { value: true } }}
                                                id="validationCustom08"
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Address
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="address"
                                                    placeholder="Address"
                                                    type="textarea"
                                                    errorMessage="Please Provide Address"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="4">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom04"
                                            >
                                                Vehicle Licence
                                            </Label>

                                            <CustomFileInputNew
                                                onDataChange={this.handleFileDataChangeVehicle}
                                                onBase64Change={this.handleAadharBase64DataChangeVehicle}
                                                defaultFile={isVehicleBase64URL}
                                                isView={isView}
                                            />
                                        </Col>
                                        <Col lg="4">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom04"
                                            >
                                                Aadhar Card Proof
                                            </Label>

                                            <CustomFileInputNew
                                                onDataChange={this.handleFileDataChangeAadhar}
                                                onBase64Change={this.handleAadharBase64DataChangeAadhar}
                                                defaultFile={isAadharCBase64URL}
                                                isView={isView}
                                            />
                                        </Col>
                                        <Col lg="4">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom04"
                                            >
                                                Qualification
                                            </Label>

                                            <CustomFileInputNew
                                                onDataChange={this.handleFileDataChangeQualification}
                                                onBase64Change={this.handleAadharBase64DataChangeQualification}
                                                defaultFile={isQualificationBase64URL}
                                                isView={isView}
                                            />
                                        </Col>
                                    </Row>

                                    <h5 className="p-1 mt-3 border-bottom">Bank Details </h5>

                                    <Row className="mt-3">
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Bank Account Number
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="bankaccount"
                                                    placeholder="Bank Account Number"
                                                    type="text"
                                                    errorMessage="Please Provide Bank Account Number"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    E.S.I Number
                                                    {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                </Label>
                                                <AvField
                                                    name="esi"
                                                    placeholder="E.S.I Number"
                                                    type="text"
                                                    // errorMessage="Please Provide E.S.I Number`"
                                                    className="form-control"
                                                    // validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    P.F Number
                                                    {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                </Label>
                                                <AvField
                                                    name="pf"
                                                    placeholder="P.F Number"
                                                    type="text"
                                                    // errorMessage="Please ProvideP.F Number"
                                                    className="form-control"
                                                    // validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Select Salary Structure
                                                {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                            </Label>
                                            <AvField
                                                name="salarystructure"
                                                type="select"
                                                id="validationCustom01"
                                                // value={this.state.getPersonaldetailById.marital_status}
                                                // required
                                                errorMessage=" Please Select Salary Structure"
                                                validate={{ required: { value: true } }}
                                                className="form-control"
                                            >
                                                <option value="">Select Salary Structure</option>
                                                <option value="Day">Day</option>
                                                <option value="Hour">Hour</option>
                                            </AvField>
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Salary Calculator
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="salarycalculator"
                                                    placeholder="Salary Calculator"
                                                    type="text"
                                                    // errorMessage="Please Provide Salary Calculator"
                                                    className="form-control"
                                                    // validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <h5 className="p-1 mt-3 border-bottom">Employment Details</h5>
                                    <Row className="mt-3">


                                        <FormGroup>
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom02"
                                            >
                                                Employment Status
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvRadioGroup inline name="employmentstatus"
                                                onChange={(e) => {
                                                    this.setState({
                                                        selectedstatus: e.target.value,
                                                    });
                                                }}
                                                required errorMessage="Please select an option">
                                                <AvRadio label="In Probation" value="1" />
                                                <AvRadio label="Employed" value="2" />
                                                <AvRadio label="On Contract" value="3" />
                                                <AvRadio label="On Notice Period" value="4" />
                                            </AvRadioGroup>
                                        </FormGroup>
                                    </Row>

                                    {this.state.selectedstatus != "2" && this.state.selectedstatus != "" && (
                                        <Row>
                                            <Col md="2">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Start Date
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="startdate"
                                                        placeholder="date"
                                                        type="date"
                                                        errorMessage="Please provide a valid start date."
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                        onChange={this.handleStartDateChange}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="2">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        End Date
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField

                                                        name="enddate"
                                                        placeholder="date"
                                                        type="date"
                                                        errorMessage="Please provide a valid start date."
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                        min={this.state.selectedStartDate ? this.state.selectedStartDate : this.getCurrentDate()}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Notes
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="notes"
                                                        placeholder="Notes"
                                                        type="text"
                                                        errorMessage="Please provide Notes."
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    )}

                                    <Button color="primary" type="submit" >
                                        Create User
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
    };
};

export default CreateUser;
