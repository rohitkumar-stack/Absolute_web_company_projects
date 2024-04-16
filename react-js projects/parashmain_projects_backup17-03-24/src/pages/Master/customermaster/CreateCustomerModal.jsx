import React, { Component } from "react";
import { Row, Col, Card, Input, CardBody, Container, Label, Form, Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import {
    CREATE_CUSTOMER, GET_CONTACTPERSON_DESINATION, GET_CONTACTPERSON_BY_ID, GET_CONTACTPERSON_DEPARTMENT,
    GET_COMPANYTYPE, GET_COMPANY_SERVICESOFFERED, CREATE_CONTACTPERSON, CREATE_LEAVE, CREATE_SHIFT, CREATE_SUBITEM_CATEGORY, CREATE_TERMS_CONDITIONS, CREATE_UNIT, CREATE_UNIT_MEASURE, CREATE_USER, CREATE_WAREHOUSE, GET_COUNTRY, GET_DESIGNATION_WO_ADMIN, GET_ITEM_CATEGORY, GET_OWNERSHIP_WO_PAGINATE, GET_STATE
} from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";
import "../customermaster/cutomerStyle.css";

class CreateCustomerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Customers", link: process.env.PUBLIC_URL + "/leadTabs" },
                { title: "Create Customer", link: process.env.PUBLIC_URL + "/#" },
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
            Statelist: [],
            countrylist: [],
            ownershiplist: [],
            selectedTypes: [],
            ContactDesignation: [],
            ContactPersonDescription: [],
            ContactDepartment: [],
            CompanyType: [],
            CompanyServiceOffered: [],
            selectedCopmany: "",
            dataCompanyTypeArray: [],
            searchId: '',
            selectedCustomerTypes: [], // Array to hold selected customer_type_id_encode values
            dataCompanyServiceArray: [],
            selectedCustomerServiceTypes: [], // Array to hold selected customer_type_id_encode values
            customerId: "",
            isLoading: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleContactPersonApi = this.handleContactPersonApi.bind(this);
        this.combinedFunction = this.combinedFunction.bind(this);
    };


    componentDidMount() {

        this.GetAllState();
        this.GetAllCountry();
        this.GetAllOwnership();
        this.getAllContactsDesination();
        this.getAllContactsDepartment();
        this.getAllCompanyType();
        this.getAllCompanyService();
        this.handleContactPersonApi();
        // this.SearchContactPersonById(searchId);

    }


    handleCloseModal = () => {
        this.props.closeModalCallback();
    };

     // GET ALL DESIGNATION GROUP
     async GetAllState() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_STATE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ Statelist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }

    // GET ALL OWNERSHIP GROUP
    async GetAllOwnership() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_OWNERSHIP_WO_PAGINATE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ ownershiplist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }

    // GET ALL DESIGNATION GROUP
    async GetAllCountry() {
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
                        this.setState({ countrylist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }

    //GET ALL Contact Designation
    async getAllContactsDesination() {
        var Token = localStorage.getItem("userToken");
        try {
            const response = await fetch(GET_CONTACTPERSON_DESINATION, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.result === true) {
                this.setState({ ContactDesignation: data.data });
                if (data.data && data.data.id) {
                    this.setState({ customer_id_encode: data.data.id });
                }
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

    //GET ALL Contact Designation
    async getAllCompanyType() {
        var Token = localStorage.getItem("userToken");
        try {
            const response = await fetch(GET_COMPANYTYPE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.result === true) {
                this.setState({ CompanyType: data.data });

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

    //GET ALL Contact Department
    async getAllContactsDepartment() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_CONTACTPERSON_DEPARTMENT, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ ContactDepartment: data.data });
                        // this.setState({ contactpersonlistAddMore: data.data });
                    }
                    else if (data.result === false) {
                        toast(data.message, {
                            type: "error",
                        });
                    }
                    else {

                    }
                });
            });
        } catch (error) {

        }
    }

    //GET ALL Contact Department
    async getAllCompanyService() {
        this.setState({
            isLoading: true,
        });
    
        const { dataCompanyTypeArray } = this.state;
        var Token = localStorage.getItem("userToken");
    
        try {
            var raw = JSON.stringify({
                customertypeDetails: dataCompanyTypeArray,
            });
    
            const response = await fetch(GET_COMPANY_SERVICESOFFERED, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            });
    
            const data = await response.json();
            if (data.result === true) {
                this.setState({ CompanyServiceOffered: data.data });
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            this.setState({
                isLoading: false, // Ensure isLoading is set to false regardless of success or failure
            });
        }
    }
    

    //GET SEARCH CONTACTPERSON ID
    // async SearchContactPersonById() {
    //     // searchId = this.state
    //     const { searchId } = this.state;
    //     var Token = localStorage.getItem("userToken");
    //     try {
    //         fetch(
    //             GET_CONTACTPERSON_BY_ID +
    //             searchId,
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     Authorization: "Bearer " + Token,
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         ).then((response) => {
    //             response.json().then((data) => {
    //                 if (data.result === true) {
    //                     if (data.data) {
    //                         this.setState({
    //                             ContactPersonDescription: data.data,
    //                             // CompanyType: data.data,
    //                             // ContactDesignation:data.data,
    //                         });
    //                     }
    //                 } else {
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //     }
    // }

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

    // CREATE CREATE COMPANY API
    async handleSubmit(event, values) {
        if (this.state.status === "") {
            toast("Please select status", { type: "error" });
        } else {
            try {
                const { dataCompanyTypeArray, dataCompanyServiceArray } = this.state;

                var Token = localStorage.getItem("userToken");

                var myHeaders = {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                };

                var raw = JSON.stringify({
                    company_name: values.companyname,
                    address: values.address,
                    city: values.city,
                    state_id_encode: values.state,
                    country_id_encode: values.country,
                    pincode: values.pincode,
                    gst_no: values.gstNo,
                    customertypeDetails: dataCompanyTypeArray,
                    // office_phone_no: this.state.inputnumber,
                    customer_category: values.category,
                    customer_type: values.type,
                    ownership_type_id_encode: values.firmType,
                    customerserviceindustryDetails: dataCompanyServiceArray,
                    // customerserviceindustryDetails: dataCompanyTypeArray,
                    status: "Active"
                });

                const response = await fetch(CREATE_CUSTOMER, {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                });

                const data = await response.json();

                if (data.result === true) {
                    toast("Customer Created Successfully !", {
                        type: "success",
                    });
                    // Store the ID value in state
                    this.setState({ customerId: data.data.id }, () => {
                        console.log("====>CustomerId:", this.state.customerId);
                    });
                } else if (data.result === false) {
                    toast(data.message, {
                        type: "error",
                    });
                } else {
                    toast("Unable to Create Customer", {
                        type: "error",
                    });
                }
            } catch (error) {
                // Handle error
                console.error("Error creating customer:", error);
            }
        }
    }

    // CREATE CREATE CONTACTPERSON API
    async handleContactPersonApi(event, values) {
        const { customerId } = this.state;
        console.log(customerId, "===>customerId123");

        this.setState({
            isLoading: true,
        });
    
        if (this.state.status === "") {
            toast("Please select status", { type: "error" });
        } else {
            try {
               
    
                // Assuming you have access to setLoading function to toggle loader state
                this.setState({
                    isLoading: true,
                    
                });
    
                var Token = localStorage.getItem("userToken");
    
                var myHeaders = {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                };
    
                var raw = JSON.stringify({
                    customer_name: values.contactName,
                    customer_id_encode: customerId, // Update customerId value here
                    mobile_no_1: this.state.inputnumber,
                    mobile_no_2: this.state.inputnumber,
                    email: values.email,
                    designation_id_encode: values.designation,
                    department_id_encode: values.department,
                    status: "Active"
                });
    
                const response = await fetch(CREATE_CONTACTPERSON, {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                });
    
                const data = await response.json();
    
                // Assuming you have access to setLoading function to toggle loader state
                this.setState({
                    isLoading: false
                });
    
                if (data.result === true) {
                    toast("Contact Person Created Successfully !", {
                        type: "success",
                    });
                    this.props.history.goBack();
                } else if (data.result === false) {
                    toast(data.message, {
                        type: "error",
                    });
                } else {
                    toast("Unable to Create Contact Person", {
                        type: "error",
                    });
                }
            } catch (error) {
                // Handle error
                console.error("Error creating contact person:", error);
                // Assuming you have access to setLoading function to toggle loader state
                this.setState({
                    isLoading: false,
                });
            }
        }
    }
    
    //Multiple API Call in one function 
    async combinedFunction(event, values) {
        try {
            await Promise.all([
                this.handleSubmit(event, values),
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(this.handleContactPersonApi(event, values));
                    }, 1000); // Adjust the delay time in milliseconds as needed
                })
            ]);
            // Both API calls succeeded
            // Do any further processing if needed
        } catch (error) {
            // Handle errors if any of the API calls fail
            console.error("Error occurred in combinedFunction:", error);
        }
    }
    
    // Callback function to handle file data
    handleFileDataChange = (file) => {
        this.setState({ fileData: file });
    };

    handleAadharBase64DataChange = (base64) => {
        this.setState({ isAadharBase64URL: base64 });
    };

    handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            this.setState(prevState => ({
                selectedTypes: [...prevState.selectedTypes, value]
            }));
        } else {
            this.setState(prevState => ({
                selectedTypes: prevState.selectedTypes.filter(type => type !== value)
            }));
        }
    }

    //ADD COMPANY TYPE CHECKBOX OF DAATA ONE ARRAY
    handleFormSubmit = (e) => {
        e.preventDefault();
        const { selectedcontactpersonAddMore, CompanyType, selectedCustomerTypes } = this.state;

        // Constructing the new row data
        const newRowData = {
            customer_type_id_encode: CompanyType.id,
        };

        // Update the array of data in the state
        this.setState(prevState => ({
            dataCompanyTypeArray: [...(prevState.dataCompanyTypeArray || []), newRowData],
            ContactAddMore_Model: false,  // Closing the modal
            selectedcontactpersonAddMore: "", // Reset selected contact person
            CompanyType: { // Reset CompanyType object
                customer_type_id_encode: "",
            },
            selectedCustomerTypes: [], // Reset selectedCustomerTypes array
        }), () => {
            console.log('dataCompanyTypeArray:', this.state.dataCompanyTypeArray);
            console.log('selectedCustomerTypes:', this.state.selectedCustomerTypes);
        });
    };

    //ADD COMPANY SERVICE CHECKBOX OF DAATA ONE ARRAY
    handleFormServiceSubmit = (e) => {
        e.preventDefault();
        const { selectedcontactpersonAddMore, CompanyServiceOffered, selectedCustomerServiceTypes } = this.state;

        // Constructing the new row data
        const newRowData = {
            customer_service_industry_id_encode: CompanyServiceOffered.id,
        };

        // Update the array of data in the state
        this.setState(prevState => ({
            dataCompanyServiceArray: [...(prevState.dataCompanyServiceArray || []), newRowData],
            ContactAddMore_Model: false,  // Closing the modal
            selectedcontactpersonAddMore: "", // Reset selected contact person
            CompanyServiceOffered: { // Reset CompanyType object
                customer_service_industry_id_encode: "",
            },
            selectedCustomerServiceTypes: [], // Reset selectedCustomerTypes array
        }), () => {
            console.log('dataCompanyServiceArray:', this.state.dataCompanyServiceArray);
            console.log('selectedCustomerServiceTypes:', this.state.selectedCustomerServiceTypes);
        });
    };


    // Callback function to handle file data
    handleFileDataChange = (file) => {
        this.setState({ fileData: file });
    };

    handleAadharBase64DataChange = (base64) => {
        this.setState({ isAadharBase64URL: base64 });
    };


    render() {
        // const { isAadharBase64URL, fileData } = this.state;
        const { isAadharBase64URL, fileData, CompanyType, CompanyServiceOffered, dataCompanyTypeArray } = this.state;
        console.log(dataCompanyTypeArray, "======>dataCompanyTypeArray")
        // console.log(CompanyServiceOffered, "======>CompanyServiceOffered")
        const { isView } = this.props;
        return (
            <React.Fragment>
                <div >
                    <Container fluid>
                        {/* <Breadcrumb title="Add Customer" breadcrumbItems={this.state.breadcrumbItems} /> */}
                        <div className="p-3">
                            <CardBody>

                                <AvForm
                                    className="needs-validation"
                                    onValidSubmit={this.combinedFunction}
                                // onSubmit={this.submitStep1}
                                >

                                    <Row className="mt-2">
                                        <Card className="card-shaddow-inner">
                                            <Row>
                                                <h2 style={{ fontSize: "16px", fontWeight: "600", marginTop: "20px" }}>Company Info</h2>

                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCompany01"
                                                    >
                                                        Company Name
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="companyname"
                                                        placeholder="Company Name"
                                                        type="text"
                                                        errorMessage="Please Provide Company Name"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCompany01"
                                                    />
                                                </Col>

                                                <Col md="3" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom02"
                                                    >
                                                        Firm Type
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        required={true}
                                                        name="firmType"
                                                        type="select"
                                                        id="validationCustom02"
                                                        // value={this.state.selectedcountry}
                                                        errorMessage="Please Select Firm Type."
                                                        validate={{ required: { value: true } }}
                                                        className="form-control"

                                                    >
                                                        <option value={""} >Select Firm Type</option>
                                                        {this.state.ownershiplist.map((item) => {
                                                            return (
                                                                <option value={item.id}>{item.name}</option>

                                                            );
                                                        })}
                                                    </AvField>
                                                </Col>
                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCompany01"
                                                    >
                                                        Gst No
                                                        {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                    </Label>
                                                    <AvField
                                                        name="gstNo"
                                                        placeholder="Gst No"
                                                        type="text"
                                                        // errorMessage="Please Provide Gst No"
                                                        className="form-control"
                                                        validate={{
                                                            // required: { value: true },
                                                            maxLength: {
                                                                value: 15,
                                                                errorMessage:
                                                                    "Gst No cannot exceed 15 characters",
                                                            },
                                                        }}
                                                        id="validationCompany01"
                                                    />
                                                </Col>
                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Customer Category
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="category"
                                                        placeholder="Customer Category"
                                                        type="select"
                                                        errorMessage="Please Provide Customer Category"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom01"
                                                    >
                                                        <option value={""} >Select Customer Category</option>
                                                        <option value={"Standard"} >Standard</option>
                                                        <option value={"Oem"} >Oem</option>
                                                        <option value={"New"} >New</option>
                                                        <option value={"Project "} >Project </option>
                                                    </AvField>
                                                </Col>

                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        City
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="city"
                                                        placeholder="City"
                                                        type="text"
                                                        errorMessage="Please Provide City"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom01"
                                                    />
                                                </Col>

                                                <Col lg="3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom08"
                                                    >
                                                        Pincode
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="pincode"
                                                        placeholder="Pincode"
                                                        type="number"
                                                        errorMessage="Please Provide Pincode"
                                                        className="form-control"
                                                        validate={{
                                                            required: { value: true },
                                                            maxLength: {
                                                                value: 6,
                                                                errorMessage:
                                                                    "Pincode cannot exceed 6 characters",
                                                            },
                                                        }}
                                                        // validate={{ required: { value: true } }}
                                                        id="validationCustom08"
                                                    />
                                                </Col>
                                                {/* <Col md="3">
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom007"
                                                        >
                                                            Office Phone No.
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>


                                                        <PhoneInput

                                                            placeholder=""
                                                            country={"in"}
                                                            enableSearch={true}
                                                            errorMessage=" Please provide a Number"
                                                            id="validationCustom007"
                                                            validate={{
                                                                required: {
                                                                    value: true
                                                                },
                                                            }}
                                                            inputStyle={{ width: "100%" }}
                                                            style={{
                                                                borderRadius: 50,
                                                            }}
                                                            inputProps={{
                                                                name: 'mobile',
                                                                required: true,

                                                            }}
                                                            onChange={(phone) => {
                                                                this.setState({
                                                                    inputnumber: phone,
                                                                });

                                                            }}
                                                        />
                                                    </div>
                                                </Col> */}
                                                <Col md="3" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom02"
                                                    >
                                                        Select State
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        required={true}
                                                        name="state"
                                                        type="select"
                                                        id="validationCustom02"
                                                        // value={this.state.selectedcountry}
                                                        errorMessage="Please Select a State."
                                                        validate={{ required: { value: true } }}
                                                        className="form-control"

                                                    >
                                                        <option value={""} >Select State</option>
                                                        {this.state.Statelist.map((item) => {
                                                            return (
                                                                <option value={item.id}>{item.state_name}</option>

                                                            );
                                                        })}
                                                    </AvField>
                                                </Col>
                                                <Col md="3" className="d-inline">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Select Country
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        required={true}
                                                        name="country"
                                                        type="select"
                                                        id="validationCustom04"
                                                        // value={this.state.selectedcountry}
                                                        errorMessage="Please Select a Country."
                                                        validate={{ required: { value: true } }}
                                                        className="form-control"
                                                        onChange={(e) => {
                                                            this.setState({
                                                                selectedcountry: e.target.value,
                                                            });
                                                        }}
                                                    >
                                                        <option value={""} >Select Country</option>
                                                        {this.state.countrylist.map((item) => {
                                                            return (
                                                                <option value={item.id}>{item.country_name}</option>

                                                            );
                                                        })}
                                                    </AvField>
                                                </Col>


                                                <Col lg="12">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Company Address
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="address"
                                                        placeholder="Address"
                                                        type="textarea"
                                                        errorMessage="Please Provide Address"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom01"
                                                    />
                                                </Col>
                                            </Row>
                                        </Card>

                                        <Card className="card-shaddow-inner">
                                            <Row>
                                                <h2 style={{ fontSize: "16px", fontWeight: "600", marginTop: "20px" }}>Contact Person Details</h2>
                                                <Col lg="4">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Name
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="contactName"
                                                        placeholder=" Name"
                                                        type="text"
                                                        errorMessage="Please Provide Name"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom01"
                                                    />
                                                </Col>

                                                <Col md="4">
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom007"
                                                        >
                                                            Contact Number
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>


                                                        <PhoneInput

                                                            placeholder=""
                                                            country={"in"}
                                                            enableSearch={true}
                                                            errorMessage=" Please provide a Number"
                                                            id="validationCustom007"
                                                            validate={{
                                                                required: {
                                                                    value: true
                                                                },
                                                            }}
                                                            inputStyle={{ width: "100%" }}
                                                            style={{
                                                                borderRadius: 50,
                                                            }}
                                                            inputProps={{
                                                                name: 'mobile',
                                                                required: true,

                                                            }}
                                                            onChange={(phone) => {
                                                                this.setState({
                                                                    inputnumber: phone,
                                                                });

                                                            }}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg="4">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Email
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        name="email"
                                                        placeholder="Email"
                                                        type="text"
                                                        errorMessage="Please Provide Email"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom01"
                                                    />
                                                </Col>

                                                <Col lg="4" className="d-inline">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom04"
                                                            style={{ fontSize: "14px" }}

                                                        >
                                                            Designation
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>

                                                    </div>
                                                    <AvField
                                                        required={true}
                                                        name="designation"
                                                        type="select"
                                                        id="validationCustom04"
                                                        value={this.state.selectedleadreference}
                                                        errorMessage="Please Select Designation."
                                                        validate={{ required: { value: true } }}
                                                        className="form-control"
                                                        onChange={(e) => {
                                                            this.setState({
                                                                selectedcontactpersonAddMore: e.target.value,
                                                            });
                                                            // if (e.target.value != "") {
                                                            //     this.SearchContactPersonById(e.target.value)
                                                            // }
                                                            // this.handleChange();
                                                        }}
                                                    >
                                                        <option value={""} >Select Designation</option>
                                                        {/* <option value={""} >Other</option> */}
                                                        {this.state.ContactDesignation.map((item) => {
                                                            return (
                                                                <option value={item.id}>{item.designation_name}</option>

                                                            );
                                                        })}
                                                    </AvField>
                                                </Col>

                                                <Col lg="4" className="d-inline">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom04"
                                                            style={{ fontSize: "14px" }}

                                                        >
                                                            Department
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                    </div>
                                                    <AvField
                                                        required={true}
                                                        name="department"
                                                        type="select"
                                                        id="validationCustom04"
                                                        value={this.state.selectedleadreference}
                                                        errorMessage="Please Select Department."
                                                        validate={{ required: { value: true } }}
                                                        className="form-control"
                                                        onChange={(e) => {
                                                            this.setState({
                                                                selectedcontactpersonAddMore: e.target.value,
                                                            });
                                                            // if (e.target.value != "") {
                                                            //     this.SearchContactPersonById(e.target.value)
                                                            // }
                                                            // this.handleChange();
                                                        }}
                                                    >
                                                        <option value={""} >Select Department</option>
                                                        {/* <option value={""} >Other</option> */}
                                                        {this.state.ContactDepartment.map((item) => {
                                                            return (
                                                                <option value={item.id}>{item.department_name}</option>

                                                            );
                                                        })}
                                                    </AvField>
                                                </Col>

                                                <Col md="4">
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom007"
                                                        >
                                                            Other Contact Number
                                                            {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                        </Label>


                                                        <PhoneInput

                                                            placeholder=""
                                                            country={"in"}
                                                            enableSearch={true}
                                                            errorMessage=" Please provide a Number"
                                                            id="validationCustom007"
                                                            validate={{
                                                                required: {
                                                                    value: true
                                                                },
                                                            }}
                                                            inputStyle={{ width: "100%" }}
                                                            style={{
                                                                borderRadius: 50,
                                                            }}
                                                            inputProps={{
                                                                name: 'mobile',
                                                                required: true,

                                                            }}
                                                            onChange={(phone) => {
                                                                this.setState({
                                                                    inputnumber: phone,
                                                                });

                                                            }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card>

                                        <div>
                                            <Row>
                                                {/* start--- Company Type */}
                                                <Col className="col-sm-12 col-lg-6 pl-0">
                                                    <Card className="card-shaddow-inner h-100 py-2 px-4" >
                                                        <h2 style={{ fontSize: "16px", fontWeight: "600", marginTop: "20px", marginBottom: "20px" }}>Company Type</h2>
                                                        <AvForm
                                                            className="needs-validation"
                                                            onValidSubmit={this.handleFormSubmit}
                                                        >
                                                            <div className="scrollable-checkboxes" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                                                {this.state.CompanyType.map((item, index) => {
                                                                    return (
                                                                        <div className="form-check" key={index}>
                                                                            <Input
                                                                                type="checkbox"
                                                                                name="type"
                                                                                className="form-check-input"
                                                                                id={`customControlInline-${index}`}
                                                                                onChange={(e) => {
                                                                                    const { checked } = e.target;
                                                                                    const newItem = { customer_type_id_encode: item.id };

                                                                                    if (checked) {
                                                                                        this.setState(prevState => ({
                                                                                            dataCompanyTypeArray: [...prevState.dataCompanyTypeArray, newItem]
                                                                                        }), () => {
                                                                                            // Call getAllCompanyService() after setState has completed
                                                                                            this.getAllCompanyService();
                                                                                        });
                                                                                    } else {
                                                                                        // Checkbox is unchecked, remove value from dataCompanyTypeArray
                                                                                        this.setState(prevState => ({
                                                                                            dataCompanyTypeArray: prevState.dataCompanyTypeArray.filter(
                                                                                                element => element.customer_type_id_encode !== newItem.customer_type_id_encode
                                                                                            )
                                                                                        }), () => {
                                                                                            // Call getAllCompanyService() after setState has completed
                                                                                            this.getAllCompanyService();
                                                                                        });
                                                                                    }
                                                                                }}
                                                                                value={item.customer_type_id_encode} // I removed this line as it's not necessary for checkbox inputs
                                                                            />

                                                                            <Label className="form-check-label" htmlFor={`customControlInline-${index}`}>{item.customer_type}</Label>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </AvForm>
                                                    </Card>
                                                </Col>
                                                {/* End--- Company Type*/}

                                                {/* start--- Services Offered */}
                                                <Col className="col-sm-12 col-lg-6 pr-0">
                                                    <Card className="card-shaddow-inner h-100  py-2 px-4">
                                                        <h2 style={{
                                                            fontSize: "16px", fontWeight: "600", marginTop: "20px",
                                                            marginBottom: "20px"
                                                        }}>Services Offered</h2>


                                                        {/* {this.state.checked && ( */}
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

                                                            <>
                                                                {CompanyServiceOffered.length === 0 ? (
                                                                    <tr>
                                                                        <td colSpan="7" className="text-center">
                                                                            No data found
                                                                        </td>
                                                                    </tr>
                                                                ) : (
                                                                    <>
                                                                        {this.state.CompanyServiceOffered.map((item, index) => {
                                                                            return (
                                                                                
                                                                                <div className="form-check">
                                                                                    <Input
                                                                                        type="checkbox"
                                                                                        name="type"
                                                                                        className="form-check-input"
                                                                                        id={`customControlInline-${index}`}
                                                                                        onChange={(e) => {
                                                                                            const { value, checked } = e.target;
                                                                                            if (checked) {
                                                                                                this.setState(prevState => ({
                                                                                                    dataCompanyServiceArray: [
                                                                                                        ...prevState.dataCompanyServiceArray,
                                                                                                        { customer_service_industry_id_encode: item.id }
                                                                                                    ]
                                                                                                }));
                                                                                            } else {
                                                                                                this.setState(prevState => ({
                                                                                                    dataCompanyServiceArray: prevState.dataCompanyServiceArray.filter(item => item.customer_service_industry_id_encode !== value)
                                                                                                }));
                                                                                            }
                                                                                        }}
                                                                                        value={item.customer_service_industry_id_encode}
                                                                                    />
                                                                                    <Label className="form-check-label" htmlFor={`customControlInline-${index}`}>{item.service_industry}</Label>
                                                                                </div>

                                                                            )

                                                                        })}
                                                                    </>
                                                                )}
                                                            </>
                                                        )}






                                                    </Card>
                                                </Col>
                                                {/* End--- Services Offered */}

                                            </Row>
                                        </div>

                                    </Row>
                                    <div style={{ marginTop: "40px" }}>
                                        {/* <Button color="primary" type="submit" >
                                            Create Customer
                                        </Button> */}

                                        {/* <Button
                                            color="secondary"
                                            className="mx-2"
                                            onClick={() => this.props.history.goBack()}
                                        >
                                            Cancel
                                        </Button> */}
                                    </div>
                                </AvForm>

                            </CardBody>
                        </div>
                    </Container>
                </div>
            </React.Fragment>
        );
    };
};

export default CreateCustomerModal;
