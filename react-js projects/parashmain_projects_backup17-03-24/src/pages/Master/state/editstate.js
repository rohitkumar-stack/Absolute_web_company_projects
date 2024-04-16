import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_COUNTRY, CREATE_STATE, CREATE_USER, GET_COUNTRY, GET_STATE_BY_ID, UPDATE_STATE } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";

class EditState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "State", link: process.env.PUBLIC_URL + "/statelist" },
                { title: "Edit State", link: process.env.PUBLIC_URL + "/#" },
            ],
            isLoading: false,
            selectedFiles: [],
            Img: "",
            status: "",
            inputMobileField: "",
            shiftdetails: "",
            senderList: [],
            selectedcountry: "",
            getById: {},


        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        const { location } = this.props;
        const { pathname } = location;

        // Parse the pathname to get the id parameter
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        this.getAllCountries();
        this.GetStateById(id);

    }

    // GET USER
    async GetStateById(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_STATE_BY_ID +
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
                                // profileimage: data.data.profile_image,
                                // firstname: data.data.first_name,
                                // middlename: data.data.middle_name,
                                // lastname: data.data.last_name,
                                // email: data.data.email,
                                // mobile: data.data.mobile_number,
                                // designation: data.data.designation,
                                // shiftdetails: data.data.shift_details,
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


    handleAcceptedFiles = (files) => {
        this.getBase64Icon(files);
        files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),

            })
        );
        this.setState({ selectedFiles: files });
    };

    // GET ALL SENDERS
    async getAllCountries() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_COUNTRY, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ senderList: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }



    // CREATE USER API
    handleSubmit(event, values) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_STATE + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    country_id_encode: values.selectedcountry,
                    state_name: values.statename,
                    state_code: values.statecode,
                    status: this.state.status
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("State Updated Successfully !", {
                            type: "success",
                        });
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
            toast("Unable to Update State", {
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
                        <Breadcrumb title="Edit State" breadcrumbItems={this.state.breadcrumbItems} />
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
                                        <Row md="12">
                                            <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Select Country
                                                    <span style={{ color: "#ff0000" }}>*</span>

                                                </Label>
                                                {/* <input
                                                            style={{ width: "200px" }}
                                                            type="date"
                                                            placeholder="Enter something..."
                                                        // Add other attributes as needed   
                                                        /> */}
                                                <AvField
                                                    name="selectedcountry"
                                                    type="select"
                                                    id="validationCustom04"
                                                    value={this.state.getById.country_id}
                                                    errorMessage=" Please provide a Value."
                                                    validate={{ required: { value: true } }}
                                                    className="form-control"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            selectedcountry: e.target.value,
                                                        });
                                                    }}
                                                >
                                                    <option value={""} >Select Country</option>
                                                    {this.state.senderList.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.country_name}</option>

                                                        );
                                                    })}
                                                </AvField>
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    State Code
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.state_code}
                                                    name="statecode"
                                                    placeholder="State Code"
                                                    type="text"
                                                    errorMessage="Please Provide State Code"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    State Name
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.state_name}
                                                    name="statename"
                                                    placeholder="State name"
                                                    type="text"
                                                    errorMessage="Please Provide State Name"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
                                            </Col>
                                            {/* <Col md="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Status
                                                    </Label>
                                                    <br></br>
                                                    <input
                                                        checked={
                                                            this.state.status === "Active" ? true : false
                                                        }
                                                        onChange={(val) =>
                                                            this.setState({
                                                                status: val.target.checked ? "Active" : "Inactive",
                                                            })
                                                        }
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="invalidCheck2"
                                                        required=""
                                                    />
                                                    <label
                                                        className="form-check-label px-2"
                                                        htmlFor="invalidCheck2"
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

export default EditState;
