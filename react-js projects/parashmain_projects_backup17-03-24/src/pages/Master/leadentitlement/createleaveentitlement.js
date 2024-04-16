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
import { CREATE_CONTACTPERSON, CREATE_DEPARTMENT, CREATE_DESIGNATION, CREATE_INDUSTRIAL_TYPE, CREATE_ITEM_CATEGORY, CREATE_ITEM_MAKER, CREATE_Leave_REFERENCE, CREATE_LEAVE, CREATE_SHIFT, CREATE_SUBITEM_CATEGORY, CREATE_TERMS_CONDITIONS, CREATE_UNIT, CREATE_UNIT_MEASURE, CREATE_USER, CREATE_WAREHOUSE, GET_ALL_CUSTOMER_WO_PAGINATION, GET_CUSTOMER, GET_DEPARTMENT_WO_PAGINATE, GET_DESIGNATION_WO_ADMIN, GET_ITEM_CATEGORY, GET_LEAVE_WO_PAGINATE, GET_ALL_ROLES_WITHOUT_ADMIN, CREATE_LEAVE_ENTITLEMENT, UPDATE_LEAVE_ENTITLEMENT_CREATE } from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class CreateLeaveEntitlement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Leave Entitlement", link: process.env.PUBLIC_URL + "/leavetabs" },
                { title: "Create Leave Entitlement", link: process.env.PUBLIC_URL + "/#" },
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
            inputnumber: "",
            inputnumber2: "",
            Designationlist: [],
            Departmentlist: [],
            Customerlist: [],
            AllLeaves: [],
            rolelist: [],
            selectedCounts: {},
            leaveData: [],

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    componentDidMount() {
        this.GetAllLeaves();
        this.GetAllRoles();

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
                        this.setState({ AllLeaves: data.data });

                    } else {

                    }
                });
            });
        } catch (error) {

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


    // CREATE USER API
    handleSubmit(event, values) {
        const selectedLeaves = Object.keys(this.state.selectedCounts).map((id) => ({
            leave_id_encode: id, // Assuming your leave IDs are encoded
            total_leave: this.state.selectedCounts[id],
        }));
        var Token = localStorage.getItem("userToken");
        try {
            var raw = JSON.stringify({
                role_id_encode: values.selectedrole,
                leaveCounts: selectedLeaves
            });
            fetch(UPDATE_LEAVE_ENTITLEMENT_CREATE, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Lead Entitlement Created Successfully !", {
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
                        toast("Unable to Create Lead Entitlement", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to create Lead Entitlement", {
                type: "error",
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

    handleCountChange = (id, count) => {
        // Update the selectedCounts state with the new count for the corresponding ID
        this.setState((prevState) => ({
            selectedCounts: {
                ...prevState.selectedCounts,
                [id]: count,
            },
        }));
    };

    render() {
        const { isAadharBase64URL, fileData, } = this.state;
        const { isView } = this.props;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add Leave Entitlement" breadcrumbItems={this.state.breadcrumbItems} />
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
                                    <Row>
                                        {this.state.AllLeaves.map((item) => {
                                            return (<>
                                                <Col md="2" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                    >
                                                        Entitlement count
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <h5
                                                        htmlFor={item.id}>
                                                        {item.name}
                                                    </h5>
                                                    <AvField
                                                        min={0}
                                                        name={`selectedcount-${item.id}`}
                                                        type="number"
                                                        id={item.id}
                                                        className="form-control"
                                                        onChange={(e) => this.handleCountChange(item.id, parseInt(e.target.value, 10))}
                                                    >
                                                    </AvField>
                                                </Col >
                                            </>
                                            )
                                        }
                                        )}
                                    </Row>
                                    <Button color="primary" type="submit" >
                                        Create Leave Entitlement
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
            </React.Fragment >
        );
    };
};

export default CreateLeaveEntitlement;
