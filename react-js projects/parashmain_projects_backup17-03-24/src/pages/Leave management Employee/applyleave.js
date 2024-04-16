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
import { CREATE_LEAVE_REQUEST, FIND_ALL_LEAVES_BY_ROLE_ID, GET_LEAVE, GET_LEAVE_BALANCE_OF_USER_ID, GET_LEAVE_BALANCE_OF_USER_ID_2, GET_LEAVE_BASED_ROLE, GET_LEAVE_REQUEST_BY_USER_ID, GET_LEAVE_REQUEST_BY_USER_ID_MERGE, GET_LEAVE_REQUEST_WO_PAGINATE_BY_USER_ID, GET_LEAVE_TIME_SLOT, GET_LEAVE_WO_PAGINATE, GET_LOGO, GET_USERS_WITHOUT_ADMIN_, GET_USER_BY_ID, THEME_SETTING } from "../../globals";
import CustomFileInputNew from "../../components/Common/imagefunction";
import { logDOM } from "@testing-library/react";
import { ThreeDots } from "react-loader-spinner";
import { format, isAfter, differenceInDays, parseISO } from 'date-fns';
import moment from "moment";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import "./validationcss.css"
import Grid from '@mui/material/Unstable_Grid2'

class CreateEmployeeLeave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Leave Request", link: process.env.PUBLIC_URL + "/employeeleavelist" },
                { title: "Create Leave Request", link: process.env.PUBLIC_URL + "/#" },
            ],
            userListBalance: [],
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
            AllLeaves: [],
            endTime: "",
            startTime: "",
            dateformat: "",
            themeSetting: [],
            allTimeSlot:[],
            LeaveBalanceRemainingData: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.GetUserByID();
        this.getAllUsers();
        this.getAllUsersBalance();
        this.GetAllLeaves();
        this.GetThemesetting();
        this.GetLeaveBalance();
        this.FetchdateFormat();
        this.GetAllTimeSlot();

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
                            // this.setState({
                            //     isLoading: false,
                            // });
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


    async GetThemesetting() {
        this.setState({ isLoading: true });
        const Token = localStorage.getItem("userToken");
        var ROLEID = localStorage.getItem("roleid");
        try {
            const response = await fetch(FIND_ALL_LEAVES_BY_ROLE_ID +
                ROLEID, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.result === true && data.data) {
                console.log("ALL LEAVES", data.data);
                this.GetLeaveBalance(data.data);
            }
            else {
                this.setState({ Leavesetting: [] })
                this.setState({ isLoading: false });
            }
        } catch (error) {
            this.setState({ isLoading: false });
            console.error("Error fetching theme setting:", error);
        }
    }

    // GET USER
    async GetLeaveBalance(entitledleaves) {
        this.setState({ isLoading: true });
        const ID = localStorage.getItem("tenant_id");
        const Token = localStorage.getItem("userToken");
        try {
            const response = await fetch(GET_LEAVE_BALANCE_OF_USER_ID_2 + ID, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.result === true) {
                console.log("USER LEAVES", data.data);
                if (data) {
                    this.setState({ LeaveBalanceRemainingData: data.data })
                    let finalarr = [];
                    if (entitledleaves) {
                        entitledleaves?.forEach((item) => {
                            const matchingEntitled = data.data.find((entitled) => entitled?.leave_id === item.leave_id);
                            if (matchingEntitled) {
                                finalarr.push({ ...item, remainingbalance: matchingEntitled.balance });
                            }
                        });
                        this.setState({ themeSetting: finalarr })
                        this.setState({ isLoading: false });
                        // setThemeSetting(finalarr)
                    }
                } else {
                    this.setState({ isLoading: false });
                }
            }
        }
        catch (error) {
            this.setState({ isLoading: false });
        }
    }


    // GET ALL LEAVES
    // async GetAllLeaves() {
    //     var Token = localStorage.getItem("userToken");
    //     try {
    //         fetch(GET_LEAVE_WO_PAGINATE, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: "Bearer " + Token,
    //                 "Content-Type": "application/json",
    //             },
    //         }).then((response) => {
    //             response.json().then((data) => {

    //                 if (data.result === true) {
    //                     this.setState({ allleaves: data.data });

    //                 } else {

    //                 }
    //             });
    //         });
    //     } catch (error) {

    //     }
    // }
    // GET ALL Leave Based on Role ID
    async GetAllLeaves() {
        var Token = localStorage.getItem("userToken");
        var RoleId = localStorage.getItem("roleid");
        try {
            fetch(GET_LEAVE_BASED_ROLE + RoleId, {
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

    // GET ALL TimeSlot
    async GetAllTimeSlot() {
        var Token = localStorage.getItem("userToken");
        var RoleId = localStorage.getItem("roleid");
        try {
            fetch(GET_LEAVE_TIME_SLOT + RoleId, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {

                    if (data.result === true) {
                        this.setState({ allTimeSlot: data.data.timeSlots });

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

    getPreviousDate() {
        const requiresMaxDaysValidation = this.state.selectedleave.split("-")[0] === "NxOpZowo9GmjKqdR";
        const requiresMaxDaysValidation1 = this.state.selectedleave.split("-")[0] === "O9apoVGyLz5qNX4K";
        if (requiresMaxDaysValidation) {
            // const today = new Date();
            // const previousDate = new Date(today);
            // previousDate.setDate(today.getDate() - 30); // Set to the previous date
            // return previousDate.toISOString().split('T')[0];
            return false
        }
        else if (requiresMaxDaysValidation1) {
            return false
        }
        else {
            const today = new Date();
            const previousDate = new Date(today);
            previousDate.setDate(today.getDate()); // Set to the previous date
            return previousDate.toISOString().split('T')[0];
        }
    }


    getNextDate() {
        const requiresMaxDaysValidation = this.state.selectedleave.split("-")[0] === "NxOpZowo9GmjKqdR";
        const requiresMaxDaysValidation1 = this.state.selectedleave.split("-")[0] === "O9apoVGyLz5qNX4K";
        if (requiresMaxDaysValidation) {
            const today = new Date();
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate()); // Set to today plus 3 days
            return nextDate.toISOString().split('T')[0];
        }
        else if (requiresMaxDaysValidation1) {
            const today = new Date();
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + 1); // Set to today plus 3 days
            return nextDate.toISOString().split('T')[0];
        }

        else {
            return undefined; // or null, or an appropriate default value
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

    async handleSubmit(event, values) {

        // CHECK THE TOTAL DAYS COUNT 
        await this.calculateDaysCount(values.startdate, values.enddate ? values.enddate : values.startdate)
        await this.CheckSameLeaveWithCount();
        await this.CheckLeaveAvailability();
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
        for (const RemainingBalancedata of this.state.LeaveBalanceRemainingData) {
            if (this.state.selectedleave.split("-")[0] == RemainingBalancedata.leave_id) {
                if (parseInt(this.state.totalCountDays) > 0 && parseInt(this.state.totalCountDays) <= parseInt(RemainingBalancedata.balance)) {
                    return true;
                }
            }
        }
        return false; // Add this line to explicitly return false if no match is found
    }

    async CheckLeaveAvailability() {
        for (const RemainingBalancedata of this.state.LeaveBalanceRemainingData) {
            if (this.state.selectedleave.split("-")[0] == RemainingBalancedata.leave_id) {
                if (parseInt(this.state.totalCountDays) > 0 && parseInt(this.state.totalCountDays) <= parseInt(RemainingBalancedata.balance)) {
                    return true;
                }
            }
        }
        return false; // Add this line to explicitly return false if no match is found
    }

    // async CheckSameLeaveWithCount() {
    //     this.state.LeaveBalanceRemainingData.map((RemainingBalancedata) => {
    //         if (this.state.selectedleave.split("-")[0] == RemainingBalancedata.leave_id) {
    //             if (parseInt(this.state.totalCountDays) > 0 && parseInt(this.state.totalCountDays) <= parseInt(RemainingBalancedata.balance)) {
    //                 return true;
    //             }
    //         }
    //         return
    //     })
    // }


    getMaxDate = () => {
        const { selectedleave, selectedStartDate } = this.state;

        // Check if the selected ID requires a maximum of 3 days validation
        const requiresMaxDaysValidation = selectedleave.split("-")[0] === "aYOxlpzRMwrX3gD7";

        if (requiresMaxDaysValidation) {
            const maxDate = new Date(selectedStartDate);
            maxDate.setDate(maxDate.getDate() + 2); // Set maximum date as three days from the start date
            return maxDate.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'
        } else {
            // Return null or undefined if the condition is not met
            return null;
        }
    };


    async calculateDaysCount(startDate, endDate) {

        const startMoment = moment(startDate);
        const endMoment = moment(endDate);
        // Calculate the difference in days, including both start and end dates
        const timeDifference = endMoment.diff(startMoment, 'days') + 1;
        this.setState({ totalCountDays: timeDifference });
    };

    async createLeaveRequest(values) {
        let Timeslot = "";
        if (this.state.startTime) {
            Timeslot = this.state.startTime + "-" + this.state.endTime
        }
        else if (values.timeslot) {
            Timeslot = values.timeslot

        }
        else {
            Timeslot = ""
        }

        // let Timeslot = "";
        // if (values.starttime) {
        //     Timeslot = values.starttime + "-" + values.endtime
        // }
        // else if (values.timeslot) {
        //     Timeslot = values.timeslot

        // }
        // else {
        //     Timeslot = ""

        // }

        const Token = localStorage.getItem("userToken");
        const raw = JSON.stringify({
            leave_id_encode: values.leave.split("-")[0],
            status: this.state.status,
            start_date: values.startdate,
            end_date: values.enddate ? values.enddate : values.startdate,
            leave_reason: values.leavereason,
            // timeslot: values.timeslot ? values.timeslot : values.starttime + "-" + values.endtime
            timeslot: Timeslot
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
            toast(data?.message, { type: "error" });
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


    // TO GET THE ARRAY OF Leave Balance
    getAllUsersBalance = async (page, perPage) => {
        this.setState({ isLoading: true });
        const id = localStorage.getItem("tenant_id");
        const Token = await localStorage.getItem("userToken");

        try {
            const response = await fetch(
                page
                    ? `${GET_LEAVE_REQUEST_BY_USER_ID_MERGE}` + id + `?page=${page}`
                    : `${GET_LEAVE_REQUEST_BY_USER_ID_MERGE}` + id,
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
                    userListBalance: data,
                });
            } else {
                this.setState({ isLoading: false });
            }
        } catch (error) {
            this.setState({ isLoading: false });
        }
    };

    calculateStartTime(startTime) {
        const [hours, minutes] = startTime.split(":");
        const startDateTime = new Date();
        startDateTime.setHours(parseInt(hours, 10));
        startDateTime.setMinutes(parseInt(minutes, 10));

        const endDateTime = new Date(startDateTime.getTime() - 2 * 60 * 60 * 1000); // Add 2 hours

        const formattedHours = endDateTime.getHours();
        const formattedMinutes = endDateTime.getMinutes().toString().padStart(2, "0"); // Ensure minutes have two digits

        const formattedEndTime = `${formattedHours}:${formattedMinutes}`;
        this.setState({ startTime: formattedEndTime })
        return formattedEndTime;
    }

    // calculateEndTime(startTime) {
    //     const [hours, minutes] = startTime.split(":");
    //     const startDateTime = new Date();
    //     startDateTime.setHours(parseInt(hours, 10));
    //     startDateTime.setMinutes(parseInt(minutes, 10));

    //     const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours

    //     const formattedHours = endDateTime.getHours();
    //     const formattedMinutes = endDateTime.getMinutes().toString().padStart(2, "0"); // Ensure minutes have two digits

    //     const formattedEndTime = `${formattedHours}:${formattedMinutes}`;
    //     this.setState({ endTime: formattedEndTime })

    //     return formattedEndTime;
    // }

    calculateEndTime(startTime) {
        const [hours, minutes] = startTime.split(":");
        const startDateTime = new Date();
        startDateTime.setHours(parseInt(hours, 10));
        startDateTime.setMinutes(parseInt(minutes, 10));

        const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours

        const formattedHours = (endDateTime.getHours() % 12) || 12; // Ensure 12-hour format
        const formattedMinutes = endDateTime.getMinutes().toString().padStart(2, "0"); // Ensure minutes have two digits
        const amPm = endDateTime.getHours() >= 12 ? "PM" : "AM";

        const formattedEndTime = `${formattedHours}:${formattedMinutes} ${amPm}`;
        this.setState({ endTime: formattedEndTime })
        return formattedEndTime;
    }

    // calculateEndTime(startTime) {
    //     const [hours, minutes] = startTime.split(":");
    //     let formattedHours = parseInt(hours, 10) + 2; // Add 2 hours

    //     // Ensure that the formatted hours are in 12-hour format
    //     if (formattedHours > 12) {
    //         formattedHours -= 12;
    //     }

    //     const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure minutes have two digits

    //     const period = formattedHours >= 12 ? 'AM' : 'PM'; // Determine AM or PM
    //     const formattedEndTime = `${formattedHours}:${formattedMinutes} ${period}`;

    //     this.setState({ endTime: formattedEndTime });
    //     return formattedEndTime;
    // }


    // Callback function to handle file data
    handleFileDataChange = (file) => {
        this.setState({ fileData: file });
    };

    handleAadharBase64DataChange = (base64) => {
        this.setState({ isAadharBase64URL: base64 });
    };


    formatDateToDDMMYYYY(date) {
        const datefns = new Date(`${date}`)
        const day = datefns.getDate().toString().padStart(2, '0');
        const month = (datefns.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1.
        const year = datefns.getFullYear();

        return `${day}/${month}/${year}`;
    }


    render() {

        const { isAadharBase64URL, fileData, themeSetting, dateformat } = this.state;
        const { isView } = this.props;
        console.log('allTimeSlot---', this.state.allTimeSlot)
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
                                {this.state.userListBalance.balance?.length > 0 && (
                                    <Grid container spacing={2} columns={15}>
                                        {this.state.userListBalance.balance?.map((item) => {
                                            console.log(item);
                                            if (item.leave_entitlement.total_leave != "" && parseInt(item?.leave_entitlement.total_leave) > 0) {
                                                return (
                                                    <Grid xl={3} lg={3} md={5} sm={5} xs={15}>
                                                        <Card className="text-center">
                                                            <CardBody style={{ padding: '10px 3%' }}>
                                                                <CardHeader className="bg-transparent ">
                                                                    <h5 className="my-0"><i className="ri ri-hospital-line me-3"></i>{item.name}</h5>
                                                                </CardHeader>
                                                                <div className="d-flex justify-content-between mt-1">
                                                                    <div>
                                                                        <h6 className='font-weight-bold' >Leave Balance</h6>
                                                                        <h2 className='font-weight-bold'>{parseInt(item.balance)}</h2>
                                                                    </div>
                                                                    <div>
                                                                        <h6 className='font-weight-bold'>Entitled Leave</h6>
                                                                        <h2 className='font-weight-bold'>{item?.leave_entitlement.total_leave}</h2>

                                                                    </div>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Grid>
                                                )
                                            }
                                        })}


                                    </Grid>
                                )}


                            </div >
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
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    {this.state.selectedleave.split("-")[0] === "aYOxlpzRMwrX3gD7" && ("From")} Date
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    name="startdate"
                                                    placeholder="Start Date"
                                                    min={this.getPreviousDate()}
                                                    max={this.getNextDate()}
                                                    // value={this.formatDateToDDMMYYYY(this.state.selectedStartDate)}
                                                    type="date"
                                                    errorMessage="Please Provide Start Date"
                                                    className="form-control"
                                                    // validate={{ required: { value: true, date: { format: "dd-mm-yyyy" } } }}
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                    onChange={this.handleStartDateChange}
                                                />
                                            </Col>
                                            {/* <Col lg="3">
                                                <Label className="form-label" htmlFor="validationCustom01">
                                                    {this.state.selectedleave.split("-")[0] === "aYOxlpzRMwrX3gD7" && "From"} Date
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                        dateFormat: "d-m-y", // Assuming getDynamicDateFormat returns the dynamic format
                                                        // minDate: this.getPreviousDate(),
                                                        // maxDate: this.getNextDate(),
                                                    }}
                                                    onChange={date => this.handleStartDateChange(date[0])}
                                                />
                                            </Col> */}
                                            {/* <Col lg="3">
                                                <Label className="form-label" htmlFor="validationCustom01">
                                                    {this.state.selectedleave.split("-")[0] === "aYOxlpzRMwrX3gD7" && ("From")} Date
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <Flatpickr
                                                    name="startdate"
                                                    placeholder="Start Date"
                                                    min={this.getPreviousDate()}
                                                    max={this.getNextDate()}
                                                    type="date"
                                                    errorMessage="Please Provide Start Date"
                                                    className="form-control"
                                                    validate={{ required: { value: true, date: { format: dateformat } } }}
                                                    id="validationCustom01"
                                                    onChange={this.handleStartDateChange}
                                                    options={{
                                                        enableTime: false,
                                                        noCalendar: false,
                                                        dateFormat: 'h:i K', // Use 12-hour format with AM/PM
                                                        // defaultHour: 12,
                                                        // time_24hr: false, // Set to false for 12-hour format
                                                    }}
                                                />
                                            </Col> */}

                                            {this.state.selectedleave.split("-")[0] === "aYOxlpzRMwrX3gD7" && (
                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        To Date
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.selectedStartDate ? this.state.selectedStartDate : Date.now()}
                                                        name="enddate"
                                                        placeholder="End Date"
                                                        type="date"
                                                        errorMessage="Please Provide End Date"
                                                        className="form-control"
                                                        min={this.state.selectedStartDate ? this.state.selectedStartDate : this.getCurrentDate()}
                                                        max={this.getMaxDate()}
                                                        validate={{ required: { value: true, date: { format: dateformat } } }}
                                                        id="validationCustom01"
                                                    />
                                                </Col>
                                            )}


                                            {this.state.selectedleave.split("-")[0] === "O9apoVGyLz5qNX4K" && (<>
                                                {/* <Col md="2">
                                                    <Label className="form-label" htmlFor="validationCustom01">
                                                        Start Time
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
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

                                                </Col> */}
                                                {/* <Col md="2">
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
                                                            // const startTime = TIME[0].toTimeString().split(" ")[0];
                                                            // this.setState({ startTime: startTime })
                                                            // const endTime = this.calculateEndTime(startTime);
                                                            const startTime = TIME[0].toTimeString().split(" ")[0];
                                                            console.log('start time--', startTime)
                                                            // this.setState({ startTime: startTime })
                                                            const endTime = this.calculateEndTime(startTime);

                                                            const startTimeNew = new Date(TIME[0]); // Convert to Date object
                                                            const formattedStartTime = startTimeNew.toLocaleTimeString('en-US', {
                                                                hour: 'numeric',
                                                                minute: 'numeric',
                                                                hour12: true,
                                                            });
                                                            this.setState({ startTime: formattedStartTime })
                                                            // console.log('start time--', formattedStartTime);

   
                                                        }}
                                                    ><span className="mdi mdi-clock"></span></Flatpickr>
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

                                            )
                                            }

                                            {this.state.selectedleave.split("-")[0] === "39n0Z12OZGKERJgW" && (
                                                <Col md="2" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Time Slot
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>

                                                    <AvField
                                                        name="timeslot"
                                                        type="select"
                                                        id="validationCustom01"

                                                        required
                                                        errorMessage="Please Select Time Slot"

                                                        className="form-control"
                                                    >
                                                        <option value="">Select Time Slot</option>
                                                        {/* <option value="09:00:00-13:30:00">09:00am To 1:30pm</option>
                                                        <option value="14:00:00-19:00:00">02:00pm To 07:30pm</option> */}
                                                        {this.state.allTimeSlot.map((item) => {
                                                        return (
                                                            <option value={item.start_time + "-" + item.end_time}>{item.start_time + "-" + item.end_time}</option>

                                                        );
                                                    })}

                                                    </AvField>
                                                </Col>
                                            )
                                            }

                                            <Col lg="6">
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
