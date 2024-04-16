import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, FormGroup } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import { Input } from "reactstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import {
    GET_AllDESIGNATIONCOMPANYWISE, UPDATE_DESIGNATION_COMPANY, GET_DEPARTMENT_BY_ID, GET_DESIGNATION_BY_ID,
    GET_HSN_CODE_BY_ID, GET_LEDGER_GROUP_BY_ID, GET_TERMS_CONDITIONS_BY_ID, GET_USER_BY_ID, UPDATE_COUNTRY, UPDATE_DEPARTMENT, UPDATE_DESIGNATION, UPDATE_HSN_CODE, UPDATE_LEDGER_GROUP, UPDATE_TERMS_CONDITIONS, UPDATE_USER
} from "../../../globals";
import { ThreeDots } from "react-loader-spinner";

class EditdesignationCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Designation ", link: process.env.PUBLIC_URL + "/designationlist" },
                { title: "Edit Designation", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            getById: [],
            inputMobileField: "",
            isLoading: false,
            status: "",
            allDesignationWiseCompany: [],
            customerDetailsName: [],
            dataCompanyTypeArray: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {

        // Access the location object to get route parameters
        const { location } = this.props;
        const { pathname } = location;

        // Parse the pathname to get the id parameter
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        // this.setState({ id: id })
        this.GetHSNCOde(id);
        this.getAllCompanyType();
    }


    //GET COMPANY LISTS
    async getAllCompanyType() {
        var Token = localStorage.getItem("userToken");
        try {
            const response = await fetch(GET_AllDESIGNATIONCOMPANYWISE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.result === true) {
                this.setState({ allDesignationWiseCompany: data.data });

            } else if (data.result === false) {
                toast(data.message, {
                    type: "error",
                });
            }
        } catch (error) {
            // Handle error
            console.error("Error fetching contacts:", error);
        }
    }

    // GET ALL DSINATION DATA WITH ID
    async GetHSNCOde(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_DESIGNATION_BY_ID +
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
                                customerDetailsName: data.data.customerDetails,
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
        }
    }

    // UPDATE DESINATION API
    handleSubmit(event, values) {
        const { dataCompanyTypeArray } = this.state;

        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_DESIGNATION_COMPANY + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerDetails: dataCompanyTypeArray,
                    designation_name: values.name,
                    designation_description: values.description,
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Designation Updated Successfully !", {
                            type: "success",
                        });
                        this.setState({
                            isLoading: false
                        });
                    } else {
                        toast("Unable to Update Designation", {
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
            toast("Unable to Update Designation", {
                type: "error",
            });
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

    //ADD COMPANY TYPE CHECKBOX OF DAATA ONE ARRAY
    handleFormSubmit = (e) => {
        e.preventDefault();
        const { selectedcontactpersonAddMore, allDesignationWiseCompany, selectedCustomerTypes } = this.state;

        // Constructing the new row data
        const newRowData = {
            customer_id_encode: allDesignationWiseCompany.id,
        };

        // Update the array of data in the state
        this.setState(prevState => ({
            dataCompanyTypeArray: [...(prevState.dataCompanyTypeArray || []), newRowData],
            ContactAddMore_Model: false,  // Closing the modal
            selectedcontactpersonAddMore: "", // Reset selected contact person
            CompanyType: { // Reset CompanyType object
                customer_id_encode: "",
            },
            selectedCustomerTypes: [], // Reset selectedCustomerTypes array
        }), () => {
            console.log('dataCompanyTypeArray:', this.state.dataCompanyTypeArray);
            console.log('selectedCustomerTypes:', this.state.selectedCustomerTypes);
        });
    };

    render() {
        const { allDesignationWiseCompany, getById, customerDetailsName, dataCompanyTypeArray } = this.state
        console.log(dataCompanyTypeArray, "===>dataCompanyTypeArray")
        // console.log(allDesignationWiseCompany, "====>allDesignationWiseCompany")
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Edit Designation" breadcrumbItems={this.state.breadcrumbItems} />
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
                                            <Col lg="6">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Name
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.designation_name}
                                                    name="name"
                                                    placeholder="Designation Name"
                                                    type="text"
                                                    errorMessage="please Provide Designation Name"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />

                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Description
                                                        {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.designation_description}
                                                        name="description"
                                                        placeholder="Description"
                                                        type="textarea"
                                                        // errorMessage="please Provide Description"
                                                        className="form-control"
                                                        // validate={{ required: { value: true } }}
                                                        id="validationCustom02"
                                                    />
                                                </div>
                                            </Col>

                                            <Col lg="6">

                                                {/* start--- Company Type */}

                                                <p style={{}}>Company Name <span style={{ color: "#ff0000" }}>*</span>
                                                </p>
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handleFormSubmit}
                                                >
                                                    <div className="scrollable-checkboxes" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                                        {this.state.allDesignationWiseCompany.map((item, index) => {
                                                            // Check if the item's customer_type_id is in customerDetailsName
                                                            const isChecked = this.state.customerDetailsName.some(
                                                                detail => detail.customer_id_encode === item.id
                                                            );

                                                            return (
                                                                <div className="form-check" key={index}>
                                                                    <Input
                                                                        type="checkbox"
                                                                        name="type"
                                                                        className="form-check-input"
                                                                        id={`customControlInline-${index}`}
                                                                        onChange={(e) => {
                                                                            const { checked } = e.target;
                                                                            const newItem = { customer_id_encode: item.id };

                                                                            if (checked) {
                                                                                this.setState(prevState => ({
                                                                                    dataCompanyTypeArray: [...prevState.dataCompanyTypeArray, newItem]
                                                                                }), () => {
                                                                                    // Call getAllCompanyService() after setState has completed
                                                                                    // this.getAllCompanyService();
                                                                                });
                                                                            } else {
                                                                                // Checkbox is unchecked, remove value from dataCompanyTypeArray
                                                                                this.setState(prevState => ({
                                                                                    dataCompanyTypeArray: prevState.dataCompanyTypeArray.filter(
                                                                                        element => element.customer_id_encode !== newItem.customer_id_encode
                                                                                    )
                                                                                }), () => {
                                                                                    // Call getAllCompanyService() after setState has completed
                                                                                    // this.getAllCompanyService();
                                                                                });
                                                                            }
                                                                        }}
                                                                        value={item.customer_id_encode} // I removed this line as it's not necessary for checkbox inputs
                                                                        // checked={isChecked} // Set checked attribute based on whether it matches customerDetailsName
                                                                        customerDetailsName
                                                                        defaultChecked={isChecked} // Set defaultChecked attribute for initial default selection
                                                                    />

                                                                    <Label className="form-check-label" htmlFor={`customControlInline-${index}`}>{item.company_name}</Label>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </AvForm>
                                                {/* End--- Company Type*/}

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

export default EditdesignationCompany;
