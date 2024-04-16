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
import { CREATE_COUNTRY, CREATE_HSN_CODE, CREATE_LEDGER_GROUP, CREATE_USER } from "../../../globals";

class CreateledgerGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Ledger Group", link: process.env.PUBLIC_URL + "/ledgerTabs" },
                { title: "Create Ledger Group", link: process.env.PUBLIC_URL + "/#" },
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
                ledger_type: values.ledgertype,
                ledger_description: values.ledgerdescription,
                status: this.state.status
            });
            fetch(CREATE_LEDGER_GROUP, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Ledger Group Created Successfully !", {
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
                        toast("Unable to Create Ledger Group", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to create Ledger Group", {
                type: "error",
            });

        }
    }

    render() {

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add Ledger Group" breadcrumbItems={this.state.breadcrumbItems} />
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
                                                        Ledger Type
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="ledgertype"
                                                        placeholder="Ledger Type"
                                                        type="text"
                                                        errorMessage="please provide Ledger Type"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom05"
                                                    />
                                                </Col>
                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom05"
                                                    >
                                                        Ledger Description
                                                        {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                    </Label>
                                                    <AvField
                                                        name="ledgerdescription"
                                                        placeholder="Ledger Description"
                                                        type="text"
                                                        errorMessage="please provide Ledger Description"
                                                        className="form-control"
                                                        // validate={{ required: { value: true } }}
                                                        id="validationCustom05"
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
                                        </Col>
                                    </Row>
                                    <Button color="primary" type="submit" >
                                        Create Ledger Group
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

export default CreateledgerGroup;
