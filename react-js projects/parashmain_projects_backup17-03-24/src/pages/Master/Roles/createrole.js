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
import { CREATE_ROLE } from "../../../globals";

class CreateRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Roles ", link: process.env.PUBLIC_URL + "/roleslist" },
                { title: "Create Role", link: process.env.PUBLIC_URL + "/#" },
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
                name: values.role,
                status: this.state.status
            });
            fetch(CREATE_ROLE, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Role Created Successfully !", {
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
                        toast("Unable to Create Role", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to create Role", {
                type: "error",
            });

        }
    }

    render() {

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add Role" breadcrumbItems={this.state.breadcrumbItems} />
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
                                                        Role Name
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="role"
                                                        placeholder="Role name"
                                                        type="text"
                                                        errorMessage="please Provide Role Name"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom01"
                                                    />
                                                </Col>
                                                {/* <Col md="1"></Col>
                                                <Col md="3">
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom06"
                                                        >
                                                            Status
                                                        </Label>
                                                        <br></br>
                                                        <input
                                                            checked={this.state.status == "Active" ? true : false}
                                                            // checked={true
                                                            //     // this.state.getById.status === "Active" ? true : false
                                                            // }
                                                            onChange={(val) => {
                                                                // var getbyId = this.state.getById
                                                                // getbyId['status'] = val.target.checked ? "Active" : "Inactive"
                                                                this.setState({
                                                                    status: val.target.checked ? "Active" : "Inactive",
                                                                    // getById: getbyId

                                                                })
                                                            }
                                                            }
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="invalidCheck06"
                                                            required=""
                                                        />
                                                        <label
                                                            className="form-check-label px-2"
                                                            htmlFor="validationCustom06"
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
                                        Create Role
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

export default CreateRole;
