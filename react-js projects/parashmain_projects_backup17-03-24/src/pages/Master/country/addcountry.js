import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_COUNTRY, CREATE_USER } from "../../../globals";

class CreateCountry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Country ", link: process.env.PUBLIC_URL + "/countrylist" },
                { title: "Create Country", link: process.env.PUBLIC_URL + "#" },
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
            var myHeaders = JSON.stringify({
                Authorization: "Bearer " + Token,
                "Content-Type": "application/json",
            });
            var raw = JSON.stringify({
                country_name: values.country,
                status: "Active",
            });
            fetch(CREATE_COUNTRY, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Country Created Successfully !", {
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
                        toast("Unable to Create Country", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to Create Country", {
                type: "error",
            });

        }
    }

    render() {

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add Country" breadcrumbItems={this.state.breadcrumbItems} />
                        <Card>
                            <CardBody>
                                <AvForm
                                    className="needs-validation"
                                    onValidSubmit={this.handleSubmit}
                                // onSubmit={this.submitStep1}
                                >
                                    <Row className="mt-2">
                                        <Col md="9">
                                            <Row md="12">

                                                <Col lg="4">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Country Name
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="country"
                                                        placeholder="Country name"
                                                        type="text"
                                                        errorMessage="Please Provide Country Name"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom01"
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
                                        Create Country
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

export default CreateCountry;
