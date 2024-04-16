import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, FormGroup } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
// import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'

import { CREATE_USER, GET_USER_BY_ID, UPDATE_PROFILE, UPDATE_USER } from "../../globals";
import { ThreeDots } from "react-loader-spinner";
import CustomFileInputNew from "../../components/Common/imagefunction";
import { toast } from "react-toastify";
class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Dashboard", link: process.env.PUBLIC_URL + "/Dashboard" },
                { title: "Update Profile", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            isAadharBase64URL: "",
            fileData: "",
            mobile: "",
            Night: "",
            morning: "",
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

            };
        }
    }

    componentDidMount() {
        this.GetUserByID();
    }

    // GET USER
    async GetUserByID() {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        var id = localStorage.getItem("tenantid");

        // localStorage.setItem("tenantid", data.tenant_id);
        try {
            fetch(
                GET_USER_BY_ID +
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
                                inputMobileField: data.data?.mobile_number,
                                isAadharBase64URL: data.data?.profile_image,
                            });
                            this.setState({
                                isLoading: false,
                            });
                            localStorage.setItem('userImage', data?.data?.profile_image)
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
        var id = localStorage.getItem("tenantid");
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_PROFILE + id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: values.firstname,
                    middle_name: values.middlename,
                    last_name: values.lastname,
                    profileimage: this.state.isAadharBase64URL?.split(",")?.[1] || ''
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Profile Updated Successfully !", {
                            type: "success",
                        });

                        this.GetUserByID();
                        // this.props.history.goBack();
                        this.setState({
                            isLoading: false
                        });
                    } else {
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
            toast("Unable To Create User", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }

    // Callback function to handle file data
    handleFileDataChange(file) {

        this.setState({ fileData: file })
        // setFileData(file);
    };

    handleAadharBase64DataChange(base64) {

        // setAadharBase64URL(base64);
        this.setState({ isAadharBase64URL: base64 })
    };

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Update Profile" breadcrumbItems={this.state.breadcrumbItems} />
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
                                            <Col md="9">
                                                <Row md="12">

                                                    <Col lg="4">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            First Name
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            value={this.state.getById.first_name}
                                                            name="firstname"
                                                            placeholder="First name"
                                                            type="text"
                                                            errorMessage="Enter First Name"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />
                                                    </Col>
                                                    <Col lg="4">
                                                        <div className="mb-3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                            >
                                                                Middle Name
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                value={this.state.getById.middle_name}
                                                                name="middlename"
                                                                placeholder="Middle Name"
                                                                type="text"
                                                                errorMessage="Enter Middle Name"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom02"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg="4">
                                                        <div className="mb-3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom02"
                                                            >
                                                                Last Name
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                value={this.state.getById.last_name}
                                                                name="lastname"
                                                                placeholder="Last Name"
                                                                type="text"
                                                                errorMessage="Enter Last name"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom02"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    {/* <Col md="4">
                                                        <div className="mb-3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Designation
                                                            </Label>
                                                            <AvField
                                                                value={this.state.getById.designation}
                                                                name="designation"
                                                                placeholder="Designation"
                                                                type="text"
                                                                errorMessage="Please provide a valid Designation."
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom04"
                                                            />
                                                        </div>
                                                    </Col> */}
                                                    <Col md="4">
                                                        <div className="mb-3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                E-Mail
                                                            </Label>
                                                            <AvField
                                                                disabled={true}
                                                                value={this.state.getById.email}
                                                                name="email"
                                                                placeholder="E-Mail"
                                                                type="email"
                                                                errorMessage="Please provide a valid E-Mail."
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom04"
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col md="4">
                                                        <div className="mb-3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom007"
                                                            >
                                                                Mobile No.
                                                            </Label>
                                                            <Row>
                                                                <Col md="12">
                                                                    <PhoneInput
                                                                        disabled={true}
                                                                        value={this.state.inputMobileField}
                                                                        name="mobile"
                                                                        placeholder=""
                                                                        // country={"in"}
                                                                        enableSearch={true}
                                                                        errorMessage=" Please provide a Number"
                                                                        id="validationCustom007"
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
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                    {/* <Col md="4">
                                                        <div className="mb-3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Joining date
                                                            </Label>
                                                            <AvField
                                                                value={this.state.getById.dateofjoining}
                                                                name="date"
                                                                placeholder="date"
                                                                type="date"
                                                                errorMessage="Please provide a valid date."
                                                                className="form-control"
                                                                // validate={{ required: { value: true } }}
                                                                id="validationCustom04"
                                                            />
                                                        </div>
                                                    </Col> */}
                                                </Row>
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Profile Image
                                                </Label>

                                                <CustomFileInputNew
                                                    onDataChange={(e) => this.handleFileDataChange()}
                                                    onBase64Change={(e) => { this.handleAadharBase64DataChange(e); }}
                                                    defaultFile={this.state.isAadharBase64URL}
                                                // isView={isView}
                                                />
                                            </Col>
                                            {/* <Col md="3">
                                                <Row>
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Front Image
                                                    </Label>
                                                    <Form>
                                                        <Dropzone
                                                            onDrop={(acceptedFiles) => {
                                                             
                                                                this.handleAcceptedFiles(acceptedFiles)
                                                            }}
                                                        >
                                                            {({ getRootProps, getInputProps }) => (
                                                                <div className="dropzone">
                                                                    <div
                                                                        className="dz-message needsclick"
                                                                        {...getRootProps()}
                                                                    >
                                                                        <input {...getInputProps()} />
                                                                        <div className="mb-3">
                                                                            <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                                                        </div>
                                                                        <h4>
                                                                            Drop files here or click to upload.
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Dropzone>
                                                        <div
                                                            className="dropzone-previews mt-3"
                                                            id="file-previews"
                                                        >
                                                            {this.state.selectedFiles.map((f, i) => {
                                                                return (
                                                                    <Card
                                                                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                        key={i + "-file"}
                                                                    >
                                                                        <div className="p-2">
                                                                            <Row className="align-items-center">
                                                                                <Col className="col-auto">
                                                                                    <img
                                                                                        data-dz-thumbnail=""
                                                                                        height="80"
                                                                                        className="avatar-sm rounded bg-light"
                                                                                        alt={f.name}
                                                                                        src={f.preview}
                                                                                    />
                                                                                </Col>
                                                                                <Col>
                                                                                    <Link
                                                                                        to="#"
                                                                                        className="text-muted fw-bold"
                                                                                    >
                                                                                        {f.name}
                                                                                    </Link>
                                                                                    <p className="mb-0">
                                                                                        <strong>{f.formattedSize}</strong>
                                                                                    </p>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                    </Card>
                                                                );
                                                            })}
                                                        </div>
                                                    </Form>
                                                </Row>
                                            </Col> */}
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

export default MyProfile;
