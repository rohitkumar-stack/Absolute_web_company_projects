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
import { CREATE_DEPARTMENT, CREATE_DESIGNATION, CREATE_ITEM_CATEGORY, CREATE_ITEM_MAKER, CREATE_LEAD_REFERENCE, CREATE_LEAVE, CREATE_SHIFT, CREATE_SUBITEM_CATEGORY, CREATE_TERMS_CONDITIONS, CREATE_UNIT, CREATE_UNIT_MEASURE, CREATE_USER, CREATE_WAREHOUSE, GET_ITEM_CATEGORY } from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class CreateLeadRefranceModal extends Component {
    constructor(props) {
        console.log('props--', props)
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Lead reference", link: process.env.PUBLIC_URL + "/leadTabs" },
                { title: "Create Lead reference", link: process.env.PUBLIC_URL + "/#" },
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

    handleCloseModal = () => {
        this.props.closeModalCallback();
      };
    
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
                    // description: values.discription,
                    status: this.state.status
                });
                fetch(CREATE_LEAD_REFERENCE, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                    body: raw,
                }).then((response) => {
                    response.json().then((data) => {
                        if (data.result === true) {
                            toast("Lead Reference Created Successfully !", {
                                type: "success",
                            });
                            // this.props.history.goBack();
                            // Close the modal after successful API call
                            this.handleCloseModal();
                        }
                        else if (data.result === false) {
                            toast(data.message, {
                                type: "error",
                            });
                        }
                        else {
                            toast("Unable to Create Lead Reference", {
                                type: "error",
                            });
                        }
                    });
                });
            } catch (error) {
                toast("Unable to create Lead Reference", {
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
                <div>

                    <AvForm
                        className="needs-validation"
                        onValidSubmit={this.handleSubmit}
                    // onSubmit={this.submitStep1}
                    >
                        <Row className="mt-2">
                            <Col lg="12">
                                <Label
                                    className="form-label"
                                    htmlFor="validationCustom01"
                                >
                                    Reference Name
                                    <span style={{ color: "#ff0000" }}>*</span>
                                </Label>
                                <AvField
                                    name="name"
                                    placeholder=" Reference Name"
                                    type="text"
                                    errorMessage="Please Provide Reference Name"
                                    className="form-control"
                                    validate={{ required: { value: true } }}
                                    id="validationCustom01"
                                />
                            </Col>
                            {/* <Col lg="12">
                                <Label
                                    className="form-label"
                                    htmlFor="validationCustom01"
                                >
                                    Description
                                    {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                {/* </Label>
                                <AvField
                                    name="discription"
                                    placeholder="Description"
                                    type="textarea"
                                    // errorMessage="Please Provide Description"
                                    className="form-control"
                                    // validate={{ required: { value: true } }}
                                    id="validationCustom01"
                                />
                            </Col> */} 

                        </Row>
                        <Button color="primary" type="submit" style={{ float: 'right' }} >
                            Create Lead Reference
                        </Button>

                    </AvForm>

                </div>
            </React.Fragment>
        );
    };
};

export default CreateLeadRefranceModal;
