import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, UncontrolledCollapse, CardHeader } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_LEAVE_REQUEST, GET_LEAVE, GET_LEAVE_BALANCE_OF_USER_ID, GET_LEAVE_BALANCE_OF_USER_ID_2, GET_LEAVE_REQUEST_BY_USER_ID, GET_LEAVE_REQUEST_WO_PAGINATE_BY_USER_ID, GET_LEAVE_WO_PAGINATE, GET_USERS_WITHOUT_ADMIN_, GET_USER_BY_ID, THEME_SETTING } from "../../globals";
import CustomFileInputNew from "../../components/Common/imagefunction";
import { logDOM } from "@testing-library/react";
import { ThreeDots } from "react-loader-spinner";
import { format, isAfter, differenceInDays, parseISO } from 'date-fns';
import moment from "moment";

class CreateEmployeeLeave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Leave Request", link: process.env.PUBLIC_URL + "/employeeleavelist" },
                { title: "Create Leave Request", link: process.env.PUBLIC_URL + "/#" },
            ],
            selectedFiles: [],
            Img: "",
            status: "1",
            inputMobileField: "",
            Night: "0",
            morning: "0",
            isAadharBase64URL: "",
            fileData: "",
            itemcategory: [],
            allleaves: [],
            alluser: [],
            Leavesetting: {},
            CasualLeave: "",
            SickLeave: "",
            PriviledgeLeave: "",
            sortleave: "",
            halfdayleave: "",
            userlist: [],
            isLoading: false,
            employmentStatus: "",
            selectedleave: "",
            selectedStartDate: null,
            totalCountDays: "",
            AllLeaves: []

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.GetUserByID();
        this.getAllUsers();
        this.GetAllLeaves();
        this.GetThemesetting();
        this.GetLeaveBalance();

    }

    // GET USER
    async GetUserByID() {
        let id = localStorage.getItem("tenant_id")
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
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
                                employmentStatus: data?.data.employee_status,

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
                                Leavesetting: data.data[0],
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


    // GET USER
    async GetLeaveBalance() {
        this.setState({
            isLoading: true,
        });
        var ID = localStorage.getItem("tenant_id");
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_LEAVE_BALANCE_OF_USER_ID_2 + ID,
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
                        if (data) {
                            this.setState({
                                SickLeave: parseInt(data?.data["Sick Leave"] || '0'),
                                CasualLeave: parseInt(data?.data["Casual Leave"] || '0'),
                                PriviledgeLeave: parseInt(data?.data["Privilege Leave"] || '0'),
                                halfdayleave: parseInt(data?.data["Half day Leave"] || '0'),
                                sortleave: parseInt(data?.data["Sort Leave"] || '0'),
                                isLoading: false,
                                AllLeaves: data.data
                            });

                        }
                    } else {
                        this.setState({
                            isLoading: false,
                            CasualLeave: "0",
                            SickLeave: "0",
                            PriviledgeLeave: "0",
                            sortleave: "0",
                            halfdayleave: "0"
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


    // GET ALL LEAVES
    async GetAllLeaves() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_LEAVE_WO_PAGINATE, {
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


    handleStartDateChange = (event, value) => {
        this.setState({ selectedStartDate: value });
    };

    getCurrentDate() {
        return new Date().toISOString().split('T')[0];
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

    async handleSubmit(event, values) {

        // CHECK THE TOTAL DAYS COUNT 
        await this.calculateDaysCount(values.startdate, values.enddate)
        // await this.CheckSameLeaveWithCount();

        try {

            const leaveId = values.leave;
            const startDateExists = this.checkStartDateExists(values.startdate);
            const currentDate = new Date();
            const CheckDays = this.CheckSameLeaveWithCount();
            const isDateExisting = this.state.userlist.some(({ start_date, end_date }) =>
                this.isDateInRange(values.startdate, start_date, end_date)
            );

            // Check employment status
            switch (parseInt(this.state.employmentStatus)) {
                case 1:
                    // Employee is in probation
                    toast("Probation Period Is Not Over. Cannot Apply For Leave.", {
                        type: "error",
                    });
                    break;

                case 2:
                    // Employee is employed
                    if (leaveId === "aYOxlpzRMwrX3gD7") {
                        if (isDateExisting) {
                            toast("Already Applied On This Date. Please Select Another Date", {
                                type: "error",
                            });
                        } else if (values.startdate && values.enddate) {
                            // Checking if the start date is within 15 days from today
                            const end = new Date(values.startdate);
                            const today = new Date();

                            const daysDifference = Math.ceil(Math.abs(end - today) / (1000 * 60 * 60 * 24));

                            if (daysDifference < 15) {
                                toast("You Cannot Apply Privileged Leave Within 15 Days", { type: "error" });
                            } else {
                                // Check if there are enough leaves remaining
                                if (await this.CheckSameLeaveWithCount()) {
                                    // If true, create the leave request
                                    await this.createLeaveRequest(values);
                                } else {
                                    toast("Not enough leaves remaining. Cannot apply for leave.", { type: "error" });
                                }
                            }
                        } else {
                            toast("Please select start and end dates", { type: "error" });
                        }
                    } else if (isDateExisting) {
                        toast("Already Applied On This Date. Please Select Another Date", {
                            type: "error",
                        });
                    } else {
                        // For other leave types, no restriction on when to apply
                        if (await this.CheckSameLeaveWithCount()) {
                            // If true, create the leave request
                            await this.createLeaveRequest(values);
                        } else {
                            toast("Not enough leaves remaining. Cannot apply for leave.", { type: "error" });
                        }
                    }
                    break;



                case 3:
                    // Employee is in contract
                    if (leaveId === "aYOxlpzRMwrX3gD7") {
                        if (isDateExisting) {
                            toast("Already Applied On This Date. Please Select Another Date", {
                                type: "error",
                            });
                        }
                        else if (values.startdate && values.enddate) {
                            // Checking if the start date is within 15 days from today
                            const end = new Date(values.startdate);
                            const today = new Date();

                            const daysDifference = Math.ceil(Math.abs(end - today) / (1000 * 60 * 60 * 24));

                            if (daysDifference < 15) {
                                toast("You Cannot Apply Privileged Leave Within 15 Days", { type: "error" });
                            } else {
                                // OLDER
                                // await this.createLeaveRequest(values);

                                // NEW CODE
                                if (await this.CheckSameLeaveWithCount()) {
                                    // If true, create the leave request
                                    await this.createLeaveRequest(values);
                                } else {
                                    toast("Not enough leaves remaining. Cannot apply for leave.", { type: "error" });
                                }
                            }
                        } else {
                            toast("Please select start and end dates", { type: "error" });
                        }
                    } else if (isDateExisting) {
                        toast("Already Applied On This Date. Please Select Another Date", {
                            type: "error",
                        });
                    } else {
                        // For other leave types, no restriction on when to apply
                        if (await this.CheckSameLeaveWithCount()) {
                            // If true, create the leave request
                            await this.createLeaveRequest(values);
                        } else {
                            toast("Not enough leaves remaining. Cannot apply for leave.", { type: "error" });
                        }
                    }
                    break;
                case 4:
                    // Employee is on notice period
                    toast("You Are in Notice Period, Cannot Apply For Leave.", {
                        type: "error",
                    });
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            toast("Unable to create Leave Request", { type: "error" });
        }
    }



    async CheckSameLeaveWithCount() {
        const leaveData = this.state.AllLeaves;
        for (const leaveType in leaveData) {
            if (leaveData.hasOwnProperty(leaveType)) {
                const leaveCount = parseFloat(leaveData[leaveType]);
                // console.log(`${leaveType}: ${leaveCount}`);
                if (this.state.selectedleave.split("-")[1] == `${leaveType}`) {
                    if (parseInt(this.state.totalCountDays) <= parseInt(`${leaveCount} `)) {
                        return true;
                    }
                    else {
                        return false
                    }
                }
                // else {
                //     return false
                // }
                // You can perform any mapping or processing here based on leaveType and leaveCount
            }
        }
    }

    async calculateDaysCount(startDate, endDate) {
        const startMoment = moment(startDate);
        const endMoment = moment(endDate);
        // Calculate the difference in days, including both start and end dates
        const timeDifference = endMoment.diff(startMoment, 'days') + 1;
        this.setState({ totalCountDays: timeDifference });
    };

    async createLeaveRequest(values) {
        const Token = localStorage.getItem("userToken");
        const raw = JSON.stringify({
            leave_id_encode: values.leave.split("-")[0],
            status: this.state.status,
            start_date: values.startdate,
            end_date: values.enddate ? values.enddate : values.startdate,
            leave_reason: values.leavereason,
        });

        const response = await fetch(CREATE_LEAVE_REQUEST, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + Token,
                "Content-Type": "application/json",
            },
            body: raw,
        });

        const data = await response.json();

        if (data.result === true) {
            toast("Leave Requested Successfully!", { type: "success" });
            this.props.history.goBack();
        } else if (data.result === false) {
            toast("Unable to Create Leave Request", { type: "error" });
        } else {
            toast("Unable to Create Leave Request", { type: "error" });
        }
    }

    // CHECKING THE LEAVE DATE 
    checkStartDateExists(requestedStartDate) {
        // Check if the requested start date already exists in the userlist (leave records array)
        return this.state.userlist.some(
            (record) => record.start_date === requestedStartDate
        );
    }

    isDateInRange(givenDate, startDate, endDate) {
        const dateToCheck = new Date(givenDate);
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Check if the given date is equal to the start date or end date
        if (dateToCheck.getTime() === start.getTime() || dateToCheck.getTime() === end.getTime()) {
            return true;
        }

        // Check if the given date is within the range of start date to end date
        if (dateToCheck >= start && dateToCheck <= end) {
            return true;
        }

        return false;
    }



    // TO GET THE ARRAY OF AL THE DATES
    getAllUsers = async (page, perPage) => {
        this.setState({ isLoading: true });

        const id = localStorage.getItem("tenant_id");
        const Token = await localStorage.getItem("userToken");

        try {
            const response = await fetch(
                page
                    ? `${GET_LEAVE_REQUEST_WO_PAGINATE_BY_USER_ID}` + id + `?page=${page}`
                    : `${GET_LEAVE_REQUEST_WO_PAGINATE_BY_USER_ID}` + id,
                {
                    method: 'GET',
                    headers: {
                        Authorization: "Bearer " + Token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = await response.json();

            if (data.result === true) {
                this.setState({
                    userlist: data.data,
                });
            } else {
                this.setState({ isLoading: false });
            }
        } catch (error) {
            this.setState({ isLoading: false });
        }
    };



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
                        <Container fluid>
                            <Breadcrumb title="Add Leave Request" breadcrumbItems={this.state.breadcrumbItems} />
                            <div>
                                <Card>
                                    <CardHeader>
                                        Leave Balance
                                    </CardHeader>
                                    <CardBody>
                                        <Row lg="12" style={{ textAlign: "center" }}>
                                            <Col>Sick Leave <br />
                                                <div>
                                                    {this.state.SickLeave} / {this.state.Leavesetting.sick_leave}
                                                </div>
                                            </Col>
                                            <Col>Casual Leave<br />
                                                <div>
                                                    {this.state.CasualLeave} / {this.state.Leavesetting.casual_leave}
                                                </div>
                                            </Col>
                                            <Col>Priviledge Leave<br />

                                                <div>
                                                    {this.state.PriviledgeLeave} / {this.state.Leavesetting.privilege_leave}
                                                </div>
                                            </Col>
                                            <Col>Half Day Leave<br />

                                                <div>
                                                    {this.state.halfdayleave} / {this.state.Leavesetting.half_day_leave}
                                                </div>
                                            </Col>
                                            <Col>Sort Leave<br />

                                                <div>
                                                    {this.state.sortleave} / {this.state.Leavesetting.sort_leave}
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </div >
                            <Card>
                                <CardBody>
                                    <AvForm
                                        className="needs-validation"
                                        onValidSubmit={this.handleSubmit}
                                    // onSubmit={this.submitStep1}
                                    >
                                        <Row className="mt-2">
                                            <Col md="4" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Leave
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>

                                                <AvField
                                                    name="leave"
                                                    type="select"
                                                    id="validationCustom01"

                                                    required
                                                    errorMessage="Please Select Leave"

                                                    className="form-control"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            selectedleave: e.target.value,
                                                        });
                                                    }}

                                                >
                                                    <option value="">Select Leave</option>
                                                    {this.state.allleaves.map((item) => {
                                                        return (
                                                            <option value={item.id + "-" + item.name}>{item.name}</option>

                                                        );
                                                    })}
                                                </AvField>
                                            </Col>
                                            <Col lg="4">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Start Date
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="startdate"
                                                    placeholder="Start Date"
                                                    type="date"
                                                    errorMessage="Please Provide Start Date"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                    onChange={this.handleStartDateChange}
                                                />
                                            </Col>
                                            {this.state.selectedleave.split("-")[0] === "O9apoVGyLz5qNX4K" || this.state.selectedleave.split("-")[0] != "39n0Z12OZGKERJgW" && (
                                                <Col lg="4">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        End Date
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="enddate"
                                                        placeholder="End Date"
                                                        type="date"
                                                        errorMessage="Please Provide End Date"
                                                        className="form-control"
                                                        min={this.state.selectedStartDate ? this.state.selectedStartDate : this.getCurrentDate()}
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom01"
                                                    />
                                                </Col>
                                            )}

                                            <Col lg="12">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Leave Reason
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
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
                                            Apply Leave
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
                        </Container >
                    )
                    }
                </div>
            </React.Fragment >
        );
    };
};

export default CreateEmployeeLeave;
