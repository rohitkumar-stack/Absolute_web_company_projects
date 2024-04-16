import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, FormGroup } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { GET_LEAVE, GET_LEAVE_REQUEST_BY_ID, GET_LEAVE_WO_PAGINATE, GET_LOGO, GET_USERS_WITHOUT_ADMIN_, UPDATE_LEAVE_BALANCE_BY_LEAVE_ID, UPDATE_LEAVE_REQUEST, UPDATE_LEAVE_REQUEST_STATUS, UPDATE_USER, } from "../../globals";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import "../../../src/pages/Leave management Employee/validationcss.css"

class SeeEmployeeLeave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Employee Request", link: process.env.PUBLIC_URL + "/employeeleaves" },
                { title: "View Leave Request", link: process.env.PUBLIC_URL + "/#" },
            ],
            alluser: [],
            allleaves: [],
            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            status: "",
            itemcategory: [],
            daysCountArray: [],
            generatedArray: [],
            totalCount: "",
            dateformat: ""
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
        this.FetchdateFormat();
    }

    async FetchdateFormat() {
        try {
            fetch(GET_LOGO, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    this.setState({ dateformat: data?.data[0]?.date_format });
                });
            });
        } catch (error) {

        }

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
                                status: data.data.status,
                                startTime: data.data.timeslot.split("-")[0],
                                endTime: data.data.timeslot.split("-")[1]
                            });


                            this.calculateDaysCount(data.data.start_date, data.data.end_date)
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

    // FOR AN ARRAY OF TOTAL COUNT OF DAYS
    // calculateDaysCount = (startDate, endDate) => {
    //     const { daysCountArray } = this.state;

    //     if (startDate && endDate) {
    //         const start = new Date(startDate);
    //         const end = new Date(endDate);

    //         // Calculate daysDifference including both start and end dates
    //         const timeDiff = Math.abs(end - start);
    //         const daysDifference = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    //         const updatedDaysCountArray = [...daysCountArray];

    //         // Add daysDifference to the array
    //         updatedDaysCountArray.push(daysDifference);

    //         this.setState({ daysCountArray: updatedDaysCountArray });

    //         // Generate an array from 1 to the last element in daysCountArray
    //         const generatedArray = Array.from({ length: updatedDaysCountArray.length }, (_, index) => index + 1);
    //         this.setState({ generatedArray });
    //     } else {
    //         // Handle the case where one or both dates are not selected
    //         // For example, you may want to display an error message
    //     }
    // };


    // FOR A STRING OF TOTAL COUNT OF DAYS
    calculateDaysCount = (startDate, endDate) => {
        const startMoment = moment(startDate);
        const endMoment = moment(endDate);
        // Calculate the difference in days, including both start and end dates
        const timeDifference = endMoment.diff(startMoment, 'days') + 1;
        this.setState({ totalCount: timeDifference });
    };

    // if (startDate && endDate) {
    //     const start = new Date(startDate);
    //     const end = new Date(endDate);

    //     // Calculate daysDifference including both start and end dates
    //     const timeDiff = Math.abs(end - start);
    //     const daysDifference = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    //     const updatedDaysCountArray = [...daysCountArray];

    //     // Add daysDifference to the array
    //     updatedDaysCountArray.push(daysDifference);

    //     this.setState({ daysCountArray: updatedDaysCountArray });

    //     // Calculate the total count of days across all leaves
    //     const totalCount = updatedDaysCountArray.reduce((total, days) => total + days, 0);

    //     // Convert the total count to a string and update the state
    //     this.setState({ totalCount: totalCount.toString() });
    // } else {
    //     // Handle the case where one or both dates are not selected
    //     // For example, you may want to display an error message
    // }


    handleDateChange = (event, field) => {

        const value = event.target.value;

        // Assuming getById is an object in your state
        const updatedById = { ...this.state.getById, [field]: value };

        // Update the state with the new getById object
        this.setState({ getById: updatedById });

        // Call your calculateDaysCount function passing the updated start_date and end_date
        this.calculateDaysCount(updatedById.start_date, updatedById.end_date);
    };

    handleSubmit(event, values) {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_LEAVE_REQUEST_STATUS + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: values.status,
                    approved_leave: values.approveddays,
                    approved_at: formattedDate,
                    start_date: values.startdate,
                    end_date: values.enddate,
                    timeslot: values.timeslot,
                    balance: values.approveddays,
                    user_id_encode: this.state.getById.user_id,
                    leave_id_encode: this.state.getById.leave_id,
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        // this.UpdateLeaveBalance(values)
                    } else {
                        toast("Unable to Update Leave Request", {
                            type: "error",
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

    // GET ALL LEAVES
    async UpdateLeaveBalance(values) {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_LEAVE_BALANCE_BY_LEAVE_ID + this.state.getById.leave_id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id_encode: this.state.getById.user_id,
                    leave_id_encode: this.state.getById.leave_id,
                    balance: values.approveddays
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
            this.setState({
                isLoading: false,
            });
        }
    }


    handleDateChange = (event, field) => {
        const value = event.target.value;
        const updatedById = { ...this.state.getById, [field]: value };

        if (field === 'start_date') {
            // If the field is 'start_date', update the min attribute for the end_date
            this.setState({
                getById: updatedById,
                minEndDate: value,  // Set minEndDate in the state
            });
        } else if (field === 'end_date') {
            // If the field is 'end_date', update the endDate in the state
            this.setState({
                getById: updatedById,
                endDate: value,
            });
        }

        // Call your calculateDaysCount function passing the updated start_date and end_date
        this.calculateDaysCount(updatedById.start_date, updatedById.end_date);
    };

    formatDateToDDMMYYYY(date) {
        const datefns = new Date(`${date}`)
        const day = datefns.getDate().toString().padStart(2, '0');
        const month = (datefns.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1.
        const year = datefns.getFullYear();

        return `${day}/${month}/${year}`;
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="View Leave Request" breadcrumbItems={this.state.breadcrumbItems} />
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
                                                    User Name
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>

                                                <AvField
                                                    disabled
                                                    value={this.state.getById.first_name + " " + this.state.getById.middle_name + " " + this.state.getById.last_name}
                                                    name="user"
                                                    type="text"
                                                    id="validationCustom023"

                                                    required
                                                    errorMessage="Please Select User"

                                                    className="form-control"
                                                >
                                                </AvField>
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
                                                    disabled
                                                    value={this.state.getById.name}
                                                    name="leave"
                                                    type="texts"
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
                                                <Label className="form-label" htmlFor="validationCustom01">
                                                    Start Date
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    disabled
                                                    value={this.state.getById.start_date}
                                                    // value={this.formatDateToDDMMYYYY(this.state.getById.start_date)}
                                                    name="startdate"
                                                    placeholder="Start Date"
                                                    type="date"
                                                    errorMessage="Please Provide Start Date"
                                                    className="form-control"
                                                    validate={{ required: { value: true, date: { format: this.state.dateformat } } }}
                                                    id="validationCustom01"
                                                    onChange={(e) => this.handleDateChange(e, 'start_date')}
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label className="form-label" htmlFor="validationCustom01">
                                                    End Date
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    disabled
                                                    value={this.state.getById.end_date}
                                                    // value={this.formatDateToDDMMYYYY(this.state.getById.end_date)}
                                                    name="enddate"
                                                    placeholder="End Date"
                                                    type="date"
                                                    errorMessage="Please Provide End Date"
                                                    className="form-control"
                                                    validate={{ required: { value: true, date: { format: this.state.dateformat } } }}
                                                    id="validationCustom01"
                                                    onChange={(e) => this.handleDateChange(e, 'end_date')}
                                                    min={this.state.getById.start_date}  // Set min attribute dynamically
                                                />
                                            </Col>

                                            <Col lg="6">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Leave Reason
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    disabled
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
                                        <Row>
                                            <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom023"
                                                >
                                                    Approve For Days
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>

                                                <AvField
                                                    name="approveddays"
                                                    type="text"
                                                    disabled
                                                    id="validationCustom023"
                                                    value={this.state.totalCount}
                                                    required
                                                    errorMessage="Please Select Approved Days"

                                                    className="form-control"
                                                >

                                                    <option value="">Approve For Days</option>
                                                    {/* {this.state.generatedArray.map((item) => {
                                                        return (
                                                            <option value={item}>{item}</option>

                                                        );
                                                    })} */}
                                                </AvField>
                                                {/* {this.state.error && (
                                                    <div style={{ color: "red" }}>{this.state.error}</div>
                                                )} */}
                                            </Col>
                                            <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom023"
                                                >
                                                    Approve Status
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>

                                                <AvField
                                                    disabled
                                                    value={this.state.status}
                                                    name="status"
                                                    type="select"
                                                    id="validationCustom023"
                                                    required
                                                    errorMessage="Please Select Leave"
                                                    className="form-control"
                                                >

                                                    <option value="">Approve Status</option>
                                                    <option value="1">Pending</option>
                                                    <option value="2">Approved</option>
                                                    <option value="3">Disapproved</option>
                                                    <option value="4">Cancelled</option>
                                                </AvField>
                                                {this.state.error && (
                                                    <div style={{ color: "red" }}>{this.state.error}</div>
                                                )}
                                            </Col>
                                            {this.state.getById.leave_id === "O9apoVGyLz5qNX4K" && (
                                                <>
                                                    {/* <Col md="2">
                                                        <Label className="form-label" htmlFor="validationCustom01">
                                                            Start Time
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.startTime}
                                                            name="starttime"
                                                            type="time"
                                                            id="validationCustom01"
                                                            required
                                                            errorMessage="Please Select Time Slot"
                                                            className="form-control"
                                                            onChange={(e) => {
                                                                // Add 2 hours to start time and update end time
                                                                const startTime = e.target.value;
                                                                const endTime = this.calculateEndTime(startTime);
                                                                // this.setState({
                                                                //     endTime: endTime,
                                                                // });
                                                            }}
                                                        ></AvField>
                                                    </Col>
                                                    <Col md="2">
                                                        <Label className="form-label" htmlFor="validationCustom01">
                                                            End Time
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            name="endtime"
                                                            type="time"
                                                            id="validationCustom01"
                                                            required
                                                            errorMessage="Please Select Time Slot"
                                                            className="form-control"
                                                            value={this.state.endTime}
                                                            onChange={(e) => {
                                                                // Add 2 hours to start time and update end time
                                                                const startTime = e.target.value;
                                                                const endTime = this.calculateStartTime(startTime);
                                                                this.setState({
                                                                    endTime: e.target.value,
                                                                });
                                                            }}
                                                        ></AvField>
                                                    </Col> */}

                                                    <Col md="2">
                                                        <Label className="form-label" htmlFor="validationCustom01">
                                                            Start Time
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <Flatpickr
                                                            disabled
                                                            className="time-picker"
                                                            value={this.state.startTime}
                                                            name="starttime"
                                                            id="validationCustom01"
                                                            options={{
                                                                enableTime: true,
                                                                noCalendar: true,
                                                                dateFormat: 'h:i K', // Use 12-hour format with AM/PM
                                                                defaultHour: 12,
                                                                time_24hr: false, // Set to false for 12-hour format
                                                            }}
                                                            onChange={(TIME) => {
                                                                const startTime = TIME[0].toTimeString().split(" ")[0];
                                                                this.setState({ startTime: startTime })
                                                                const endTime = this.calculateEndTime(startTime);
                                                            }}
                                                        />
                                                    </Col>

                                                    <Col md="2">
                                                        <Label className="form-label" htmlFor="validationCustom01">
                                                            End Time
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <Flatpickr
                                                            className="time-picker"
                                                            disabled={true} // Set to true if you want to disable the input
                                                            name="endtime"
                                                            id="validationCustom01"
                                                            options={{
                                                                enableTime: true,
                                                                noCalendar: true,
                                                                dateFormat: 'h:i K', // Use 12-hour format with AM/PM
                                                                time_24hr: false, // Set to false for 12-hour format
                                                                defaultHour: 12,
                                                            }}
                                                            value={this.state.endTime}
                                                            onChange={(TIME) => {
                                                                const endTime = TIME[0].toTimeString().split(" ")[0];
                                                                this.setState({
                                                                    endTime: endTime,
                                                                });
                                                            }}
                                                        />
                                                    </Col>
                                                </>
                                                // <Col md="2" className="d-inline">
                                                //     <Label
                                                //         className="form-label"
                                                //         htmlFor="validationCustom01"
                                                //     >
                                                //         Time Slot
                                                //         <span style={{ color: "#ff0000" }}>*</span>
                                                //     </Label>

                                                //     <AvField
                                                //         value={this.state.getById.timeslot}
                                                //         disabled
                                                //         name="timeslot"
                                                //         type="select"
                                                //         id="validationCustom01"
                                                //         required
                                                //         errorMessage="Please Select Time Slot"
                                                //         className="form-control"
                                                //     >
                                                //         <option value="">Select Time Slot</option>
                                                //         <option value="09:00:00-11:00:00">09:00am To 11:00am</option>
                                                //         <option value="11:00:00-13:00:00">11:00am To 01:00pm</option>
                                                //         <option value="13:00:00-15:00:00">01:00pm To 03:00pm</option>
                                                //         <option value="15:00:00-17:00:00">03:00pm To 05:00pm</option>
                                                //         <option value="17:00:00-19:00:00">05:00pm To 07:00pm</option>
                                                //     </AvField>
                                                // </Col>
                                            )
                                            }
                                            {this.state.getById.leave_id === "39n0Z12OZGKERJgW" && (
                                                <Col md="2" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Time Slot
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>

                                                    <AvField
                                                        disabled
                                                        name="timeslot"
                                                        type="select"
                                                        id="validationCustom01"
                                                        value={this.state.getById.timeslot}
                                                        required
                                                        errorMessage="Please Select Time Slot"

                                                        className="form-control"
                                                    >
                                                        <option value={this.state.getById.timeslot}>{this.state.getById.timeslot}</option>
                                                        {/* <option value="09:00:00-13:30:00">09:00am To 1:30pm</option>
                                                        <option value="14:00:00-19:00:00">02:00pm To 07:00pm</option> */}

                                                    </AvField>
                                                </Col>
                                            )
                                            }
                                        </Row>
                                        <Button
                                            color="primary"
                                            className="mx-2"
                                            onClick={() => this.props.history.goBack()}
                                        >
                                            Go Back
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

export default SeeEmployeeLeave;
