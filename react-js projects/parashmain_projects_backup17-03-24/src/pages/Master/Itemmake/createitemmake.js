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
import { CREATE_DEPARTMENT, CREATE_DESIGNATION, CREATE_ITEM_CATEGORY, CREATE_ITEM_MAKER, CREATE_SUBITEM_CATEGORY, CREATE_TERMS_CONDITIONS, CREATE_USER, GET_ITEM_CATEGORY } from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class CreateItemMake extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Item Make", link: process.env.PUBLIC_URL + "/tabsItems" },
                { title: "Create Item Make", link: process.env.PUBLIC_URL + "/#" },
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
                    make_name: values.name,
                    contact_name: values.contactname,
                    address: values.address,
                    phone_no: this.state.inputMobileField,
                    note: values.note,
                    status: this.state.status,
                });
                fetch(CREATE_ITEM_MAKER, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                    body: raw,
                }).then((response) => {
                    response.json().then((data) => {
                        if (data.result === true) {
                            toast("Item Make Created Successfully !", {
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
                            toast("Unable to Create Item Make", {
                                type: "error",
                            });
                        }
                    });
                });
            } catch (error) {
                toast("Unable to create Item Make", {
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
                        <Breadcrumb title="Add Item Make" breadcrumbItems={this.state.breadcrumbItems} />
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
                                                Item Make Name
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="name"
                                                placeholder="Item Make Name"
                                                type="text"
                                                errorMessage="please Provide Item Make Name"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Contact Name
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="contactname"
                                                placeholder="Contact Name"
                                                type="text"
                                                // errorMessage="please Provide Contact Name"
                                                className="form-control"
                                                // validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>
                                        <Col md="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom007"
                                                >
                                                    Mobile
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <Row>
                                                    <Col md="12">
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
                                                            id="validationCustom007"
                                                            validate={{
                                                                required: {
                                                                    value: true
                                                                },
                                                            }}
                                                            value={""}
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
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Address
                                                    {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                </Label>
                                                <AvField
                                                    name="address"
                                                    placeholder="Address"
                                                    type="textarea"
                                                    // errorMessage="please Provide Address"
                                                    className="form-control"
                                                    // validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Note
                                                    {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                </Label>
                                                <AvField
                                                    name="note"
                                                    placeholder="Note"
                                                    type="textarea"
                                                    // errorMessage="please Provide Item Note"
                                                    className="form-control"
                                                    // validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Button color="primary" type="submit" >
                                        Create Item Make
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

export default CreateItemMake;
