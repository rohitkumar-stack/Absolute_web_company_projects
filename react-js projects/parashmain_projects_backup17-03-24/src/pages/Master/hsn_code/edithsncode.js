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
import { CREATE_USER, GET_COUNTRY_BY_ID, GET_HSN_CODE_BY_ID, GET_USER_BY_ID, UPDATE_COUNTRY, UPDATE_HSN_CODE, UPDATE_USER } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";

class EditHSNCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "HSN Code", link: process.env.PUBLIC_URL + "/hsncodelist" },
                { title: "Edit HSN Code", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            status: ""
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
        this.GetHSNCOde(id);
    }

    // GET 
    async GetHSNCOde(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_HSN_CODE_BY_ID +
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
                                status: data.data.status
                                // profileimage: data.data.profile_image,
                                // firstname: data.data.first_name,
                                // middlename: data.data.middle_name,
                                // lastname: data.data.last_name,
                                // email: data.data.email,
                                // mobile: data.data.mobile_number,
                                // designation: data.data.designation,
                                // shiftdetails: data.data.shift_details,
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

    // CREATE USER API
    handleSubmit(event, values) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_HSN_CODE + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hsn_code: values.hsncode,
                    // taxation_value: values.taxrupee,
                    cgst: values.cgst,
                    sgst: values.sgst,
                    igst: values.igst,
                    status: this.state.status
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("HSN Code Updated Successfully !", {
                            type: "success",
                        });
                        this.setState({
                            isLoading: false
                        });
                    } else {
                        toast("Unable to Update HSN Code", {
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
            toast("Unable to Update HSN Code", {
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
                        <Breadcrumb title="Edit HSN Code" breadcrumbItems={this.state.breadcrumbItems} />
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
                                                    <Col lg="3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom05"
                                                        >
                                                            HSN Code
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            value={this.state.getById.hsn_code}
                                                            name="hsncode"
                                                            placeholder="HSN Code"
                                                            type="text"
                                                            errorMessage="Please Provide HSN Code"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom05"
                                                        />
                                                    </Col>
                                                    {/* <Col lg="3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Taxation Value ( in ₹ )
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            value={this.state.getById.taxation_value}
                                                            name="taxrupee"
                                                            placeholder="Taxation Value ( in ₹ )"
                                                            type="number"
                                                            errorMessage="Please Provide Taxation Value"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />
                                                    </Col> */}
                                                    <Col lg="3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom02"
                                                        >
                                                            CGST ( in % )
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            value={this.state.getById.cgst}
                                                            name="cgst"
                                                            placeholder="CGST ( in % )"
                                                            type="number"
                                                            errorMessage="Please Provide CGST"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom02"
                                                        />
                                                    </Col>
                                                    <Col lg="3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom03"
                                                        >
                                                            SGST( in % )
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            value={this.state.getById.sgst}
                                                            name="sgst"
                                                            placeholder="SGST ( in % )"
                                                            type="number"
                                                            errorMessage="Please Provide SGST"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom03"
                                                        />
                                                    </Col>
                                                    <Col lg="3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom04"
                                                        >
                                                            IGST ( in % )
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            value={this.state.getById.igst}
                                                            name="igst"
                                                            placeholder="IGST ( in % )"
                                                            type="number"
                                                            errorMessage="Please Provide IGST"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom04"
                                                        />
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
                                                                        status: val.target.checked ? "Active" : "Inactive",
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

export default EditHSNCode;
