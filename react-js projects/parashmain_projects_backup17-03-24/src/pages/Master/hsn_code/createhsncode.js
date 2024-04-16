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
import { CREATE_COUNTRY, CREATE_HSN_CODE, CREATE_USER } from "../../../globals";

class CreateHSNCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "HSN Code", link: process.env.PUBLIC_URL + "/hsncodelist" },
                { title: "Create HSN Code", link: process.env.PUBLIC_URL + "/#" },
            ],
            selectedFiles: [],
            Img: "",
            status: "Active",
            inputMobileField: "",
            shiftdetails: ""

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


    // CREATE USER API
    handleSubmit(event, values) {
        // this.setState({
        //     isLoading: true,
        // });
        var Token = localStorage.getItem("userToken");
        try {
            var raw = JSON.stringify({
                hsn_code: values.hsncode,
                // taxation_value: values.taxrupee,
                cgst: values.cgst,
                sgst: values.sgst,
                igst: values.igst,
            });
            fetch(CREATE_HSN_CODE, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("HSN Code Created Successfully !", {
                            type: "success",
                        });
                        this.props.history.goBack();
                    }
                    else if (data.result === false) {
                        toast(data.message, {
                            type: "error",
                        });
                    }
                    else {
                        toast("Unable to Create HSN Code", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to create HSN Code", {
                type: "error",
            });

        }
    }

    render() {

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add HSN Code" breadcrumbItems={this.state.breadcrumbItems} />
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
                                                        name="hsncode"
                                                        placeholder="HSN Code"
                                                        type="text"
                                                        errorMessage="please Provide HSN Code"
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
                                                        name="taxrupee"
                                                        placeholder="Taxation Value ( in ₹ )"
                                                        type="number"
                                                        errorMessage="please Provide Taxation Value"
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
                                                        name="cgst"
                                                        placeholder="CGST ( in % )"
                                                        type="number"
                                                        errorMessage="please Provide CGST"
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
                                                        name="sgst"
                                                        placeholder="SGST ( in % )"
                                                        type="number"
                                                        errorMessage="please Provide SGST"
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
                                                        name="igst"
                                                        placeholder="IGST ( in % )"
                                                        type="number"
                                                        errorMessage="please Provide IGST"
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
                                        Create HSN Code
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

export default CreateHSNCode;
