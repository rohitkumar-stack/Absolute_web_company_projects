import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_DEPARTMENT, CREATE_DESIGNATION, CREATE_ITEM_CATEGORY, CREATE_ITEM_MAKER, CREATE_LEAVE, CREATE_SHIFT, CREATE_SUBITEM_CATEGORY, CREATE_TERMS_CONDITIONS, CREATE_UNIT, CREATE_UNIT_MEASURE, CREATE_USER, CREATE_WAREHOUSE, GET_ITEM_CATEGORY } from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class CreateLeave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Leave", link: process.env.PUBLIC_URL + "/leavetabs" },
                { title: "Create Leave", link: process.env.PUBLIC_URL + "/#" },
            ],
            selectedFiles: [],
            Img: "",
            status: "Active",
            inputMobileField: "",
            Night: "0",
            morning: "0",
            isAadharBase64URL: "",
            fileData: "",
            itemcategory: [],
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
                    name: values.name,
                    // total_days: values.days,
                    status: this.state.status
                });
                fetch(CREATE_LEAVE, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                    body: raw,
                }).then((response) => {
                    response.json().then((data) => {
                        if (data.result === true) {
                            toast("Leave Created Successfully !", {
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
                            toast("Unable to Create Leave", {
                                type: "error",
                            });
                        }
                    });
                });
            } catch (error) {
                toast("Unable to create Leave", {
                    type: "error",
                });

            }
        }
    }

    // Callback function to handle file data
    handleFileDataChange = (file) => {
        this.setState({ fileData: file });
    };

    handleAadharBase64DataChange = (base64) => {
        this.setState({ isAadharBase64URL: base64 });
    };


    render() {
        const { isAadharBase64URL, fileData } = this.state;
        const { isView } = this.props;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add Leave" breadcrumbItems={this.state.breadcrumbItems} />
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
                                                Leave Name
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="name"
                                                placeholder="Leave Name"
                                                type="text"
                                                errorMessage="Please Provide Leave Name"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>
                                        {/* <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Leave Days
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="days"
                                                placeholder="Leave Days"
                                                type="number"
                                                errorMessage="Please Provide Leave Days"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col> */}
                                        {/* <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Warehouse Location
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="location"
                                                placeholder="Warehouse Location"
                                                type="text"
                                                errorMessage="Please Provide Warehouse Location"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col> */}
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
                                    <Button color="primary" type="submit" >
                                        Create Leave
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

export default CreateLeave;
