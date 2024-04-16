import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, FormGroup } from "reactstrap";
//Import Breadcrumb

import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import CustomFileInputNew1 from "../../components/Common/smallimagefunction";
import { GET_USER_BY_ID, THEME_SETTING, UPDATE_THEME_SETTING, UPDATE_USER } from "../../globals";
import Breadcrumb from "../../components/Common/Breadcrumb";

class RolePermission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Dashboard", link: process.env.PUBLIC_URL + "/Dashboard" },
                { title: "Role & Permissions", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            isAadharBase64URL: "",
            isFavIconURL: "",
            fileData: null,
            fileData1: null,
            mobile: "",
            Night: "",
            morning: "",
            id: ""
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
        // this.GetThemesetting();
        //     const { location } = this.props;
        //     const { pathname } = location;

        //     // Parse the pathname to get the id parameter
        //     const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        //     this.setState({ id: id })
        // }
    }

    // GET USER
    async GetThemesetting() {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                THEME_SETTING,
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
                                getById: data.data[0],
                                isAadharBase64URL: data.data[0].logo,
                                isFavIconURL: data.data[0].logo

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
            fetch(UPDATE_THEME_SETTING + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    logo_encode: this.state.isAadharBase64URL.split(",")?.[1],
                    favicon_encode: this.state.isFavIconURL.split(",")?.[1],
                    description: values.description,
                    mobile: this.state.inputMobileField.slice(2),
                    email: values.email,
                    address: values.address,
                    mailer: values.mailer,
                    mailpath: values.mailpath,
                    smtphost: values.smtp,
                    smtpemail: values.smtpmail,
                    smtppassword: values.smtppassword,
                    port: values.port,
                    ssl_tls_type: values.ssltsltype,
                    recaptcha_key: values.recaptchakey,
                    recaptcha_secret: values.recaptchasecret,
                    image_api_url: values.imageapiurl,
                    sms_otp_api_key: values.smsotpapikey,
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Theme Setting Updated Successfully !", {
                            type: "success",
                        });
                        // this.props.history.push(process.env.PUBLIC_URL + "/themesetting");
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
            toast("Unable To Update Role & Permission", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }

    // Callback function to handle file data
    handleFileDataChange = (file) => {
        this.setState({ fileData: file });
    };

    handleAadharBase64DataChange = (base64) => {
        this.setState({ isAadharBase64URL: base64 });
    };

    // Callback function to handle file data
    handleFileDataChange1 = (file) => {
        this.setState({ fileData1: file });
    };

    handleAadharBase64DataChange1 = (base64) => {
        this.setState({ isFavIconURL: base64 });
    };

    render() {
        const { isAadharBase64URL, fileData } = this.state;
        const { isFavIconURL, fileData1 } = this.state;
        const { isView } = this.props;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Role & Permissions" breadcrumbItems={this.state.breadcrumbItems} />
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
                                            <Col md="2" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Role
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.ssl_tls_type}
                                                    name="ssltsltype"
                                                    type="select"
                                                    id="validationCustom02"
                                                    required
                                                    errorMessage=" Please provide Item Sub-Category"
                                                    defaultValue={"language"}
                                                    className="form-control"
                                                >
                                                    <option value={""}>Select Role</option>
                                                    <option value={"ssl"}>SSL</option>
                                                    <option value={"tsl"}>TSL</option>

                                                </AvField>
                                                {this.state.error && (
                                                    <div style={{ color: "red" }}>{this.state.error}</div>
                                                )}
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
                                    </AvForm >
                                </CardBody >
                            </Card >
                        )
                        }
                    </Container>
                </div >
            </React.Fragment >
        );
    };
};

export default RolePermission;
