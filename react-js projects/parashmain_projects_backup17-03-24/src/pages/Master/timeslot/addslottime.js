import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_COUNTRY, CREATE_SLOTTIME_ROLEWISE, CREATE_USER, GET_ALL_ROLES_WITHOUT_ADMIN } from "../../../globals";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

class CreateSlotTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Slot Time ", link: process.env.PUBLIC_URL + "/leavetabs" },
                { title: "Create Slot Time", link: process.env.PUBLIC_URL + "#" },
            ],
            selectedFiles: [],
            Img: "",
            status: "Active",
            inputMobileField: "",
            shiftdetails: "",
            rolelist: [],
            timeEntries: [{
                // id_encode: "",
                start_time: "",
                end_time: "",
                description: ""
            }],  // Array to store time entries
            startTime: '',
            endTime: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.GetAllRoles();

    }

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

    handleAddButtonClick = () => {
        this.setState(prevState => ({
            timeEntries: [...prevState.timeEntries, { start_time: '', end_time: '' }],
        }));
    };

    handleTimeChange = (index, field, TIME) => {
        const updatedTimeEntries = [...this.state.timeEntries];
        updatedTimeEntries[index][field] = TIME[0].toTimeString().split(" ")[0];
        this.setState({ timeEntries: updatedTimeEntries });
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


    // CREATE USER API
    handleSubmit(event, values) {
        // this.setState({
        //     isLoading: true,
        // });
        
            const updatedValues =  {role_id_encode: values.selectedrole,
                timeSlots: this.state.timeEntries}

               
        var Token = localStorage.getItem("userToken");
        try {
            var myHeaders = JSON.stringify({
                Authorization: "Bearer " + Token,
                "Content-Type": "application/json",
            });
            var raw = JSON.stringify(updatedValues);
            fetch(CREATE_SLOTTIME_ROLEWISE, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Slot Time Created Successfully !", {
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
                        toast("Unable to Create Slot Time", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to Create Slot Time", {
                type: "error",
            });

        }
    }

    // GET ALL ROLES
    async GetAllRoles() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_ALL_ROLES_WITHOUT_ADMIN, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {

                    if (data.result === true) {
                        this.setState({ rolelist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }

    render() {
        console.log('slote---', this.state.timeEntries)

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add Slot Time" breadcrumbItems={this.state.breadcrumbItems} />
                        <Card>
                            <CardBody>
                                <AvForm
                                    className="needs-validation"
                                    onValidSubmit={this.handleSubmit}
                                // onSubmit={this.submitStep1}
                                >
                                    <Row className="mt-2 border-bottom">
                                        <Col md="3" className="d-inline">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Select Role
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                required={true}
                                                name="selectedrole"
                                                type="select"
                                                id="validationCustom01"
                                                // value={this.state.selectedcountry}
                                                errorMessage="Please Select a Leave."
                                                validate={{ required: { value: true } }}
                                                className="form-control"
                                            >
                                                <option value={""} >Select Role</option>
                                                {this.state.rolelist.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.name}</option>

                                                    );
                                                })}
                                            </AvField>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3 mt-2">
                                        <Col md="2" className="mb-3 border-bottom">
                                            <Label className="form-label " >
                                                Slot Timings :
                                            </Label>
                                            <Button onClick={this.handleAddButtonClick} className="m-2" color="primary">Add Timing +</Button>
                                        </Col>
                                        {/* {this.state.timeEntries.map((entry, index) => (
                                            <Row key={index} className="mb-3">
                                                <Col md="2">
                                                    <Label className="form-label" htmlFor={`startTime${index}`}>
                                                        Start Time
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <Flatpickr
                                                        className="time-picker"
                                                        value={entry.startTime}
                                                        name={`starttime${index}`}
                                                        id={`startTime${index}`}
                                                        options={{
                                                            enableTime: true,
                                                            noCalendar: true,
                                                            dateFormat: 'h:i K', // Use 12-hour format with AM/PM
                                                            defaultHour: 12,
                                                            time_24hr: false, // Set to false for 12-hour format
                                                        }}
                                                        onChange={
                                                            (e) => {
                                                                const { rows } = this.state;
                                                                rows[index].start_time = e.target.value;
                                                                this.setState({ rows });
                                                                // this.handleTimeChange(index, 'startTime', e)
                                                            }}
                                                    >
                                                        <span className="mdi mdi-clock"></span>
                                                    </Flatpickr>
                                                </Col>

                                                <Col md="2">
                                                    <Label className="form-label" htmlFor={`endTime${index}`}>
                                                        End Time
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <Flatpickr
                                                        className="time-picker"
                                                        // disabled={true}
                                                        name={`endtime${index}`}
                                                        id={`endTime${index}`}
                                                        options={{
                                                            enableTime: true,
                                                            noCalendar: true,
                                                            dateFormat: 'h:i K', // Use 12-hour format with AM/PM
                                                            time_24hr: false, // Set to false for 12-hour format
                                                            defaultHour: 12,
                                                        }}
                                                        value={entry.endTime}
                                                        onChange={
                                                            (e) => {
                                                                const { rows } = this.state;
                                                                rows[index].end_time = e.target.value;
                                                                this.setState({ rows });
                                                                // this.handleTimeChange(index, 'startTime', TIME)
                                                            }
                                                        }

                                                    />
                                                </Col>
                                                <Col md="3" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom023"
                                                    >
                                                        Details
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>

                                                    <AvField
                                                        disabled
                                                        name="details"
                                                        type="text"
                                                        id="validationCustom023"
                                                        required
                                                        errorMessage="Please Enter Details"
                                                        className="form-control"
                                                    >
                                                    </AvField>
                                                </Col>
                                            </Row>
                                        ))} */}
                                        {this.state.timeEntries.map((entry, index) => (
                                            <Row key={index} className="mb-3">
                                                <Col md="2">
                                                    <Label className="form-label" htmlFor={`startTime${index}`}>
                                                        Start Time
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <Flatpickr
                                                        className="time-picker"
                                                        value={entry.startTime}
                                                        name={`starttime${index}`}
                                                        id={`startTime${index}`}
                                                        options={{
                                                            enableTime: true,
                                                            noCalendar: true,
                                                            dateFormat: 'h:i K', // Use 12-hour format with AM/PM
                                                            defaultHour: 12,
                                                            time_24hr: false, // Set to false for 12-hour format
                                                        }}
                                                        onChange={(selectedDates) => {
                                                            const { timeEntries } = this.state;
                                                            timeEntries[index].start_time = selectedDates[0].toTimeString().split(" ")[0];
                                                            this.setState({ timeEntries });
                                                        }}
                                                    >
                                                        <span className="mdi mdi-clock"></span>
                                                    </Flatpickr>
                                                </Col>

                                                <Col md="2">
                                                    <Label className="form-label" htmlFor={`endTime${index}`}>
                                                        End Time
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <Flatpickr
                                                        className="time-picker"
                                                        name={`endtime${index}`}
                                                        id={`endTime${index}`}
                                                        options={{
                                                            enableTime: true,
                                                            noCalendar: true,
                                                            dateFormat: 'h:i K', // Use 12-hour format with AM/PM
                                                            time_24hr: false, // Set to false for 12-hour format
                                                            defaultHour: 12,
                                                        }}
                                                        value={entry.endTime}
                                                        onChange={(selectedDates) => {
                                                            const { timeEntries } = this.state;
                                                            timeEntries[index].end_time = selectedDates[0].toTimeString().split(" ")[0];
                                                            this.setState({ timeEntries });
                                                        }}

                                                    />
                                                </Col>

                                                <Col md="3" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor={`details${index}`}
                                                    >
                                                        Details
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>

                                                    <AvField
                                                        onChange={(event) => {
                                                            const { timeEntries } = this.state;
                                                            timeEntries[index].description = event.target.value;
                                                            this.setState({ timeEntries });
                                                        }}
                                                        name={`details${index}`}
                                                        id={`details${index}`}
                                                        type="text"

                                                        required
                                                        errorMessage="Please Enter Details"
                                                        className="form-control"
                                                    >
                                                    </AvField>
                                                </Col>
                                            </Row>
                                        ))}
                                    </Row>

                                    <Button color="primary" type="submit" >
                                        Create Slot Time
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

export default CreateSlotTime;
