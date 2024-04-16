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
import { CREATE_COUNTRY, CREATE_STATE, CREATE_USER, GET_COUNTRY } from "../../../globals";

class CreateState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "State ", link: process.env.PUBLIC_URL + "/statelist" },
                { title: "Create State", link: process.env.PUBLIC_URL + "/#" },
            ],
            selectedFiles: [],
            Img: "",
            status: "",
            inputMobileField: "",
            shiftdetails: "",
            senderList: [],
            selectedcountry: "",


        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.getAllCountries();

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

    // GET ALL SENDERS
    async getAllCountries() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_COUNTRY, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ senderList: data.data });
                    }
                    else if (data.result === false) {
                        toast(data.message, {
                            type: "error",
                        });
                    }
                    else {

                    }
                });
            });
        } catch (error) {

        }
    }

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
                state_name: values.state,
                // country_id_encode: this.state.selectedcountry,
                country_id_encode: values.selectedcountry,
                state_code: values.statecode,
                status: this.state.status
            });
            fetch(CREATE_STATE, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("State Created Successfully !", {
                            type: "success",
                        });
                        this.props.history.goBack();
                    } else {
                        toast("Unable to Create State", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to Create State", {
                type: "error",
            });

        }
    }

    render() {

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add State" breadcrumbItems={this.state.breadcrumbItems} />
                        <Card>
                            <CardBody>
                                <AvForm
                                    className="needs-validation"
                                    onValidSubmit={this.handleSubmit}
                                // onSubmit={this.submitStep1}
                                >
                                    <Row className="mt-2">


                                        <Col md="3" className="d-inline">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom04"
                                            >
                                                Select Country
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
                                                name="selectedcountry"
                                                type="select"
                                                id="validationCustom04"
                                                // value={this.state.selectedcountry}
                                                errorMessage="Please Select a Country."
                                                validate={{ required: { value: true } }}
                                                className="form-control"
                                                onChange={(e) => {
                                                    this.setState({
                                                        selectedcountry: e.target.value,
                                                    });
                                                }}
                                            >
                                                <option value={""} >Select Country</option>
                                                {this.state.senderList.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.country_name}</option>

                                                    );
                                                })}
                                            </AvField>
                                        </Col>
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                State Code
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="statecode"
                                                placeholder="State Code"
                                                type="text"
                                                errorMessage="Please Provide State Code"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom02"
                                            >
                                                State Name
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="state"
                                                placeholder="State name"
                                                type="text"
                                                errorMessage="Please Provide State Name"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom02"
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

                                    <Button color="primary" type="submit" >
                                        Create State
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

export default CreateState;
