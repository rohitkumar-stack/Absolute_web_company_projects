import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, FormGroup } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_USER, GET_COUNTRY_BY_ID, GET_DEPARTMENT_BY_ID, GET_DESIGNATION_BY_ID, GET_HSN_CODE_BY_ID, GET_ITEM_CATEGORY, GET_ITEM_CATEGORY_BY_ID, GET_ITEM_MAKER_BY_ID, GET_ITEM_SUB_CATEGORY_BY_ID, GET_LEAVE, GET_LEAVE_BALANCE_BY_ID, GET_LEAVE_BY_ID, GET_LEAVE_REQUEST_BY_ID, GET_LEDGER_GROUP_BY_ID, GET_SHIFT_BY_ID, GET_TERMS_CONDITIONS_BY_ID, GET_UNIT_BY_ID, GET_UNIT_MEASURE_BY_ID, GET_USERS_WITHOUT_ADMIN_, GET_USER_BY_ID, GET_WAREHOUSE_BY_ID, UPDATE_COUNTRY, UPDATE_DEPARTMENT, UPDATE_DESIGNATION, UPDATE_HSN_CODE, UPDATE_ITEM_CATEGORY, UPDATE_ITEM_MAKE, UPDATE_ITEM_SUB_CATEGORY, UPDATE_LEAVE, UPDATE_LEAVE_BALANCE, UPDATE_LEAVE_REQUEST, UPDATE_LEDGER_GROUP, UPDATE_SHIFT, UPDATE_TERMS_CONDITIONS, UPDATE_UNIT, UPDATE_UNIT_MEASURE, UPDATE_USER, UPDATE_WAREHOUSE } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";

class EditLeaveRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Leave Request", link: process.env.PUBLIC_URL + "/leaverequestlist" },
                { title: "Edit Leave Request", link: process.env.PUBLIC_URL + "/#" },
            ],
            alluser: [],
            allleaves: [],
            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            status: "",
            itemcategory: []
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
        // Access the location object to get route parameters
        const { location } = this.props;
        const { pathname } = location;

        // Parse the pathname to get the id parameter
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        // this.setState({ id: id })
        this.GetHSNCOde(id);
        this.GetAllUser();
        this.GetAllLeaves();
    }




    // GET 
    async GetHSNCOde(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_LEAVE_REQUEST_BY_ID +
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
                                status: data.data.status
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

            this.setState({
                isLoading: false,
            });
        }
    }

    handleSubmit(event, values) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_LEAVE_REQUEST + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id_encode: values.user,
                    leave_id_encode: values.leave,
                    status: this.state.status,
                    start_date: values.startdate,  //** required **//
                    end_date: values.enddate,    //** required **//
                    leave_reason: values.leavereason
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Leave Request Updated Successfully !", {
                            type: "success",
                        });
                        this.setState({
                            isLoading: false
                        });
                    } else {
                        toast("Unable to Update Leave Request", {
                            type: "error",
                        });
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
            toast("Unable to Update Leave Request", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Edit Leave Request" breadcrumbItems={this.state.breadcrumbItems} />
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
                                            <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom023"
                                                >
                                                    Select User
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>

                                                <AvField
                                                    value={this.state.getById.user_id}
                                                    name="user"
                                                    type="select"
                                                    id="validationCustom023"
                                                    disabled
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
                                                    value={this.state.getById.leave_id}
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
                                                    Start Date
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.start_date}
                                                    name="startdate"
                                                    placeholder="Start Date"
                                                    type="date"
                                                    errorMessage="Please Provide Start Date"
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
                                                    End Date
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.end_date}
                                                    name="enddate"
                                                    placeholder="End Date"
                                                    type="date"
                                                    errorMessage="Please Provide End Date"
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
                                                    Leave Reason
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.leave_reason}
                                                    name="leavereason"
                                                    placeholder="Leave Reason"
                                                    type="textarea"
                                                    errorMessage="Please Provide Leave Reason"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
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

export default EditLeaveRequest;
