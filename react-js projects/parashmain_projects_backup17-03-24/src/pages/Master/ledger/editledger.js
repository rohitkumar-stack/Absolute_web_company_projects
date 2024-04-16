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
import { CREATE_USER, GET_COUNTRY_BY_ID, GET_DESIGNATION, GET_DESIGNATION_WO_ADMIN, GET_HSN_CODE_BY_ID, GET_LEDGER_BY_ID, GET_LEDGER_GROUP, GET_LEDGER_GROUP_BY_ID, GET_STATE, GET_USER_BY_ID, UPDATE_COUNTRY, UPDATE_HSN_CODE, UPDATE_LEDGER, UPDATE_LEDGER_GROUP, UPDATE_USER } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";

class EditLedger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Ledger", link: process.env.PUBLIC_URL + "/ledgerTabs" },
                { title: "Edit Ledger ", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            Statelist: [],
            LedgerGroupList: [],
            Designationlist: [],
            status: "",
            selectedcountry: ""
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

        // Access the location object to get route parameters
        const { location } = this.props;
        const { pathname } = location;

        // Parse the pathname to get the id parameter
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        // this.setState({ id: id })
        this.getLedgerMaster(id);
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
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }

    // GET ALL STATES
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

    // GET  LEDGER MASTER
    async getLedgerMaster(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_LEDGER_BY_ID +
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
                                status: data.data.status,
                                inputMobileField: data.data.phone_no
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

    // Custom validation function for PAN number
    validatePAN = (value, ctx, input, cb) => {
        const panRegex = /^[A-Za-z]{5}\d{4}[A-Za-z]$/;

        if (!panRegex.test(value)) {
            cb(false, "Enter a valid PAN number (5 alphabets, 4 digits, 1 alphabet)");
        } else {
            cb(true);
        }
    };


    // API
    handleSubmit(event, values) {
        let statecode = this.state.selectedcountry.split("-")[0];
        let stateid = this.state.selectedcountry.split("-")[1];
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_LEDGER + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ledger_group_type_id_encode: values.ledger, /* from ledger group master */
                    address: values.address,
                    pincode: values.pincode,
                    email: values.email,    //****
                    website: values.website,
                    contact_person: values.contactperson,
                    designation_id_encode: values.designation,
                    phone_no: this.state.inputMobileField,
                    limit_upto: values.limit,
                    gstin: values.gst,
                    state_id_encode: stateid,
                    state_code: statecode,
                    pan_no: values.pan,
                    status: this.state.status,

                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Ledger Updated Successfully !", {
                            type: "success",
                        });
                        this.setState({
                            isLoading: false
                        });
                    } else {
                        toast("Unable to Update Ledger", {
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
            toast("Unable to Update Ledger", {
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
                        <Breadcrumb title="Edit Ledger" breadcrumbItems={this.state.breadcrumbItems} />
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
                                                        {/* <input
                                                            style={{ width: "200px" }}
                                                            type="date"
                                                            placeholder="Enter something..."
                                                        // Add other attributes as needed   
                                                        /> */}
                                                        <AvField
                                                            name="ledger"
                                                            type="select"
                                                            id="validationCustom01"
                                                            value={this.state.getById.ledger_group_type_id}
                                                            required
                                                            errorMessage=" Please Select Ledger Group type."
                                                            // validate={{ required: { value: true } }}

                                                            className="form-control"
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
                                                            value={this.state.getById.contact_person}
                                                            name="contactperson"
                                                            placeholder="Contact Person"
                                                            type="text"
                                                            errorMessage="please provide Contact Person"
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
                                                            value={this.state.getById.designation_id}
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
                                                            value={this.state.getById.phone_no}
                                                            name="mobile"
                                                            placeholder=""
                                                            // country={"in"}
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
                                                            value={this.state.getById.limit_upto}
                                                            name="limit"
                                                            placeholder="Limit Upto"
                                                            type="text"
                                                            errorMessage="please provide Limit Upto"
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
                                                            value={this.state.getById.gstin}
                                                            name="gst"
                                                            placeholder="GST"
                                                            type="text"
                                                            errorMessage="please provide GST"
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
                                                            value={this.state.getById.pan_no}
                                                            name="pan"
                                                            placeholder="PAN No."
                                                            type="text"
                                                            errorMessage="please provide Valid PAN No."
                                                            className="form-control"
                                                            // validate={{ required: { value: true } }}
                                                            validate={{
                                                                required: { value: true },

                                                                maxLength: {
                                                                    value: 10,
                                                                    errorMessage:
                                                                        "PAN No. cannot exceed 10 characters",
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
                                                            value={this.state.getById.state_code + "-" + this.state.getById.state_id}
                                                            // value={this.state.getById.state_id}
                                                            name="state"
                                                            type="select"
                                                            // disabled={true}  
                                                            id="validationCustom12"
                                                            required
                                                            // value={this.state.selectedcountry}
                                                            errorMessage="Please Select State."
                                                            // validate={{ required: { value: true } }}

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
                                                                    // <option value={item.id}>{item.state_name}</option>

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
                                                            value={this.state.getById.email}
                                                            name="email"
                                                            placeholder="E-mail"
                                                            type="email"
                                                            errorMessage="please provide E-mail"
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
                                                            value={this.state.getById.website}
                                                            name="website"
                                                            placeholder="Website"
                                                            type="text"
                                                            errorMessage="please provide Website"
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
                                                            value={this.state.getById.pincode}
                                                            name="pincode"
                                                            placeholder="Pincode"
                                                            type="number"
                                                            errorMessage="please provide Pincode"
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
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.address}
                                                        name="address"
                                                        placeholder="Address"
                                                        type="textarea"
                                                        // errorMessage="please provide Address"
                                                        className="form-control"
                                                        // validate={{ required: { value: true } }}
                                                        id="validationCustom11"
                                                    />
                                                </Col>
                                                {/* <Col md="3">
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom04"
                                                        >
                                                            Status
                                                        </Label>
                                                        <br></br>
                                                        <input
                                                            checked={
                                                                this.state.status === "Active" ? true : false
                                                            }
                                                            onChange={(val) =>
                                                                this.setState({
                                                                    status: val.target.checked ? "Active" : "Inactive",
                                                                })
                                                            }
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="invalidCheck2"
                                                            required=""
                                                        />
                                                        <label
                                                            className="form-check-label px-2"
                                                            htmlFor="invalidCheck2"
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

export default EditLedger;