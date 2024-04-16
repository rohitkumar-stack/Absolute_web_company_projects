import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_COUNTRY, CREATE_HSN_CODE, CREATE_LEDGER, CREATE_LEDGER_GROUP, CREATE_USER, GET_DESIGNATION, GET_DESIGNATION_WO_ADMIN, GET_LEDGER_GROUP, GET_STATE } from "../../../globals";

class Createledger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Ledger", link: process.env.PUBLIC_URL + "/ledgerTabs" },
                { title: "Create Ledger", link: process.env.PUBLIC_URL + "/#" },
            ],
            formData: {},
            selectedFiles: [],
            Img: "",
            status: "Active",
            inputMobileField: "",
            shiftdetails: "",
            LedgerGroupList: [],
            Statelist: [],
            selectedledger: "",
            Designationlist: []


        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    componentDidMount() {
        this.GetAllLedgerGroup();
        this.GetAllStates();
        this.GetAllDesignation();

    }

    // GET ALL LEDGER GROUP
    async GetAllLedgerGroup() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_LEDGER_GROUP, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ LedgerGroupList: data.data });
                    }
                    else {

                    }
                });
            });
        } catch (error) {

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


    handleAcceptedFiles = (files) => {
        this.getBase64Icon(files);
        files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),

            })
        );
        this.setState({ selectedFiles: files });
    };

    // Custom validation function for PAN number
    validatePAN = (value, ctx, input, cb) => {
        const panRegex = /^[A-Za-z]{5}\d{4}[A-Za-z]$/;

        if (!panRegex.test(value)) {
            cb(false, "Enter a valid PAN number (5 alphabets, 4 digits, 1 alphabet)");
        } else {
            cb(true);
        }
    };

    // CREATE USER API
    handleSubmit(event, values) {
        let statecode = this.state.selectedcountry.split("-")[0];
        let stateid = this.state.selectedcountry.split("-")[1];
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            var raw = JSON.stringify({
                ledger_group_type_id_encode: values.ledger,
                address: values.address,
                pincode: values.pincode,
                email: values.email,    //****
                website: values.website,
                contact_person: values.contactperson,
                designation_id_encode: values.designation,
                phone_no: this.state.inputMobileField,            //***
                limit_upto: values.limit,
                gstin: values.gst,
                state_id_encode: stateid,
                state_code: statecode,
                pan_no: values.pan,
                status: this.state.status

            });
            fetch(CREATE_LEDGER, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            }).then((response) => {
                response.json().then((data) => {

                    if (data.result === true) {
                        toast("Ledger Created Successfully !", {
                            type: "success",
                        });
                        this.props.history.goBack();
                        this.setState({
                            isLoading: false,
                        });
                    }
                    else if (data.result === false) {
                        toast(data.message, {
                            type: "error",
                        });
                        this.setState({
                            isLoading: false,
                        });
                    }
                    else {
                        toast("Unable to Create Ledger ", {
                            type: "error",
                        });
                        this.setState({
                            isLoading: false,
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to create Ledger ", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }

    validateGST = (value, ctx, input, cb) => {
        // Adjust the regular expression based on the actual format of GST numbers
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[A-Z0-9]{1}$/;

        if (!gstRegex.test(value)) {
            cb(false, "Enter a valid GST number");
        } else {
            cb(true);
        }
    };

    render() {

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add Ledger" breadcrumbItems={this.state.breadcrumbItems} />
                        <Card>
                            <CardBody>
                                <AvForm
                                    className="needs-validation"
                                    onValidSubmit={this.handleSubmit}
                                // onSubmit={this.submitStep1}
                                >
                                    <Row className="mt-2">
                                        <Col md="12">
                                            <Row md="12">
                                                <Col md="3" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Select Ledger Group
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="ledger"
                                                        type="select"
                                                        id="validationCustom01"
                                                        // value={this.state.selectedcountry}
                                                        required
                                                        errorMessage=" Please Select Ledger Group type."
                                                    // validate={{ required: { value: true } }}
                                                    // className="form-control"
                                                    >
                                                        <option value="">Select Ledger Group</option>
                                                        {this.state.LedgerGroupList.map((item) => {
                                                            return (
                                                                <option value={item.id}>{item.ledger_type}</option>

                                                            );
                                                        })}
                                                    </AvField>
                                                    {this.state.error && (
                                                        <div style={{ color: "red" }}>{this.state.error}</div>
                                                    )}
                                                </Col>
                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom02"
                                                    >
                                                        Contact Person
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="contactperson"
                                                        placeholder="Contact Person"
                                                        type="text"
                                                        errorMessage="Please Provide Contact Person"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom02"
                                                    />
                                                </Col>
                                                <Col md="3" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Select Designation
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    {/* <input
                                                            style={{ width: "200px" }}
                                                            type="date"
                                                            placeholder="Enter something..."
                                                        // Add other attributes as needed   
                                                        /> */}
                                                    <AvField
                                                        name="designation"
                                                        type="select"
                                                        id="validationCustom01"
                                                        // value={this.state.selectedcountry}
                                                        required
                                                        errorMessage=" Please Select Designation."
                                                        // validate={{ required: { value: true } }}

                                                        className="form-control"
                                                    >
                                                        <option value="">Select Designation</option>
                                                        {this.state.Designationlist.map((item) => {
                                                            return (
                                                                <option value={item.id}>{item.designation_name}</option>

                                                            );
                                                        })}
                                                    </AvField>
                                                    {this.state.error && (
                                                        <div style={{ color: "red" }}>{this.state.error}</div>
                                                    )}
                                                </Col>
                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Mobile
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
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
                                                        id="validationCustom04"
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
                                                            // if (this.state.inputMobileField.length > 3) {
                                                            //     this.setState({
                                                            //         inputMobileField: phone,
                                                            //         phoneValidation: true
                                                            //     });
                                                            // } else {
                                                            this.setState({
                                                                inputMobileField: phone,
                                                                // phoneValidation: false
                                                            });
                                                            // }
                                                            // inputWhatsappField: phone,
                                                        }}
                                                    />

                                                    {/* {(!this.state.phoneValidation && (this.state.step1Submit || this.state.phoneInputdirty)) && <span className="text-danger">This Field is Required !</span>} */}
                                                </Col>
                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom05"
                                                    >
                                                        Limit Upto
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="limit"
                                                        placeholder="Limit Upto"
                                                        type="text"
                                                        errorMessage="Please Provide Limit Upto"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom05"
                                                    />
                                                </Col>
                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom06"
                                                    >
                                                        GST
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="gst"
                                                        placeholder="GST"
                                                        type="text"
                                                        errorMessage="Please Provide Valid GST"
                                                        className="form-control"
                                                        validate={{
                                                            required: { value: true },
                                                            custom: this.validateGST
                                                        }}
                                                        id="validationCustom06"
                                                    />
                                                </Col>
                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom07"
                                                    >
                                                        PAN No.
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="pan"
                                                        placeholder="PAN No."
                                                        type="text"
                                                        errorMessage="Please Provide Valid PAN No."
                                                        className="form-control"
                                                        // validate={{ required: { value: true } }}
                                                        validate={{
                                                            required: { value: true },
                                                            maxLength: {
                                                                value: 10,
                                                                errorMessage:
                                                                    "PAN No. cannot exceed 6 characters",
                                                            },
                                                            custom: this.validatePAN,
                                                        }}
                                                        id="validationCustom07"
                                                    />
                                                </Col>
                                                <Col md="3" className="d-inline">
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
                                                        onChange={(e) => {
                                                            this.setState({
                                                                selectedcountry: e.target.value,
                                                            });
                                                        }}
                                                    >
                                                        <option value={""} >Select State</option>
                                                        {this.state.Statelist.map((item) => {
                                                            return (
                                                                <option value={item.state_code + "-" + item.id}>{item.state_name}</option>

                                                            );
                                                        })}
                                                    </AvField>
                                                </Col>

                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom09"
                                                    >
                                                        E-mail
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="email"
                                                        placeholder="E-mail"
                                                        type="email"
                                                        errorMessage="Please Provide E-mail"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom09"
                                                    />
                                                </Col>
                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom10"
                                                    >
                                                        Website

                                                    </Label>
                                                    <AvField
                                                        name="website"
                                                        placeholder="Website"
                                                        type="text"
                                                        errorMessage="Please Provide Website"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom10"
                                                    />
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

                                            </Row>
                                        </Col>
                                        <Row lg="12">
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom11"
                                                >
                                                    Address
                                                    {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                </Label>
                                                <AvField
                                                    name="address"
                                                    placeholder="Address"
                                                    type="textarea"
                                                    // errorMessage="Please Provide Address"
                                                    className="form-control"
                                                    // validate={{ required: { value: true } }}
                                                    id="validationCustom11"
                                                />
                                            </Col>
                                            {/* <Col md="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom17"
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
                                    </Row>
                                    <Button color="primary" type="submit" >
                                        Create Ledger
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

export default Createledger;
