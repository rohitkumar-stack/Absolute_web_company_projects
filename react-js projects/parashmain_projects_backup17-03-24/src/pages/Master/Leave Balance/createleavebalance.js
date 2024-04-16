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
import { CREATE_DEPARTMENT, CREATE_DESIGNATION, CREATE_ITEM_CATEGORY, CREATE_ITEM_MAKER, CREATE_LEAVE, CREATE_LEAVE_BALANCE, CREATE_SHIFT, CREATE_SUBITEM_CATEGORY, CREATE_TERMS_CONDITIONS, CREATE_UNIT, CREATE_UNIT_MEASURE, CREATE_USER, CREATE_WAREHOUSE, GET_ITEM_CATEGORY, GET_LEAVE, GET_USERS_WITHOUT_ADMIN_ } from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class CreateLeaveBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Leave Balance", link: process.env.PUBLIC_URL + "/leavebalancelist" },
                { title: "Create Leave Balance", link: process.env.PUBLIC_URL + "/#" },
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
            alluser: [],
            allleaves: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.GetAllUser();
        this.GetAllLeaves();

    }

    // GET ALL USERS
    async GetAllUser() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_USERS_WITHOUT_ADMIN_, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {

                    if (data.result === true) {
                        this.setState({ alluser: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }
    // GET ALL LEAVES
    async GetAllLeaves() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_LEAVE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {

                    if (data.result === true) {
                        this.setState({ allleaves: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
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
                var raw = JSON.stringify({
                    user_id_encode: values.user,
                    leave_id_encode: values.leave,
                    balance: values.balance,
                    status: this.state.status
                });
                fetch(CREATE_LEAVE_BALANCE, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                    body: raw,
                }).then((response) => {
                    response.json().then((data) => {
                        if (data.result === true) {
                            toast("Leave Balance Created Successfully !", {
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
                            toast("Unable to Create Leave Balance", {
                                type: "error",
                            });
                        }
                    });
                });
            } catch (error) {
                toast("Unable to create Leave Balance", {
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
                        <Breadcrumb title="Add Leave Balance" breadcrumbItems={this.state.breadcrumbItems} />
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
                                                htmlFor="validationCustom023"
                                            >
                                                Select User
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>

                                            <AvField
                                                name="user"
                                                type="select"
                                                id="validationCustom023"

                                                required
                                                errorMessage="Please Select User"

                                                className="form-control"
                                            >
                                                <option value="">Select User</option>
                                                {this.state.alluser.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.first_name}{" "}{item.middle_name}{" "}{item.last_name}</option>

                                                    );
                                                })}
                                            </AvField>
                                            {this.state.error && (
                                                <div style={{ color: "red" }}>{this.state.error}</div>
                                            )}
                                        </Col>
                                        <Col md="3" className="d-inline">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom023"
                                            >
                                                Select Leave
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>

                                            <AvField
                                                name="leave"
                                                type="select"
                                                id="validationCustom023"

                                                required
                                                errorMessage="Please Select Leave"

                                                className="form-control"
                                            >
                                                <option value="">Select Leave</option>
                                                {this.state.allleaves.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.name}</option>

                                                    );
                                                })}
                                            </AvField>
                                            {this.state.error && (
                                                <div style={{ color: "red" }}>{this.state.error}</div>
                                            )}
                                        </Col>
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Balance
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="balance"
                                                placeholder="Balance"
                                                type="text"
                                                errorMessage="Please Provide Balance"
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
                                        Create Leave Balance
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

export default CreateLeaveBalance;
