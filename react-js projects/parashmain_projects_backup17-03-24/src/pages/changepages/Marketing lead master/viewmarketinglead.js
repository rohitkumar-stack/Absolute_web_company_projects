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
import { CREATE_USER, GET_ALL_CUSTOMER_WO_PAGINATION, GET_CONTACTPERSON_BY_ID, GET_CONTACTPERSON_WO_PAGINATE, GET_COUNTRY, GET_COUNTRY_BY_ID, GET_CUSTOMER_BY_ID, GET_DEPARTMENT_BY_ID, GET_DESIGNATION_BY_ID, GET_HSN_CODE_BY_ID, GET_ITEM_CATEGORY, GET_ITEM_CATEGORY_BY_ID, GET_ITEM_MAKER_BY_ID, GET_ITEM_SUB_CATEGORY_BY_ID, GET_LEAD_REFERENCE_BY_ID, GET_LEAD_REFERENCE_WO_PAGINATE, GET_LEAVE_BY_ID, GET_LEDGER_GROUP_BY_ID, GET_MARKETING_LEAD_BY_ID, GET_MARKETING_LEAD_DOCUMENT_BY_ID, GET_OWNERSHIP_BY_ID, GET_OWNERSHIP_WO_PAGINATE, GET_SHIFT_BY_ID, GET_TERMS_CONDITIONS_BY_ID, GET_UNIT_BY_ID, GET_UNIT_MEASURE_BY_ID, GET_USER_BY_ID, GET_WAREHOUSE_BY_ID, UPDATE_COUNTRY, UPDATE_DEPARTMENT, UPDATE_DESIGNATION, UPDATE_DOCUMENT_LEAD, UPDATE_HSN_CODE, UPDATE_ITEM_CATEGORY, UPDATE_ITEM_MAKE, UPDATE_ITEM_SUB_CATEGORY, UPDATE_LEAD_MARKETING, UPDATE_LEAD_REFERENCE, UPDATE_LEAVE, UPDATE_LEDGER_GROUP, UPDATE_OWNERSHIP, UPDATE_SHIFT, UPDATE_TERMS_CONDITIONS, UPDATE_UNIT, UPDATE_UNIT_MEASURE, UPDATE_USER, UPDATE_WAREHOUSE } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class ViewMarketLead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Marketing Lead", link: process.env.PUBLIC_URL + "/marketingleadlist" },
                { title: "View Marketing Lead", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            status: "",
            itemcategory: [],
            Leadreferencelist: [],
            customerlist: [],
            selectedlead: "",
            LeadDescription: "",
            Companydescription: "",
            selectedCopmany: "",
            ownershiplist: [],
            contactpersonlist: [],
            selectedcontactperson: "",
            ContactPersonDescription: "",
            leadDocument: "",

            // PROFILE IMAGE 
            defaultfile: "",
            fileData: "",
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
        this.GetAllReferenceId();
        this.getAllCustomers();
        // Access the location object to get route parameters
        const { location } = this.props;
        const { pathname } = location;

        // Parse the pathname to get the id parameter
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        // this.setState({ id: id })
        this.GetHSNCOde(id);
        this.GetAllReferenceId();
        this.getAllCustomers();
        this.GetAllOwnership();
        this.getAllContacts();

    }

    // Callback function to handle file data
    handleFileDataChange = (file) => {
        this.setState({ fileData: file });
    };

    handleAadharBase64DataChange = (base64) => {
        this.setState({ defaultfile: base64 });
    };

    // GET ALL SENDERS
    async GetAllReferenceId() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_LEAD_REFERENCE_WO_PAGINATE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ Leadreferencelist: data.data });
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

    // GET ALL SENDERS
    async getAllContacts() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_CONTACTPERSON_WO_PAGINATE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ contactpersonlist: data.data });
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

    // GET ALL SENDERS
    async getAllCustomers() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_ALL_CUSTOMER_WO_PAGINATION, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ customerlist: data.data });
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



    // GET 
    async GetHSNCOde(id) {
        this.GetLeadDocument(id);
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_MARKETING_LEAD_BY_ID +
                id,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                response.json().then(async (data) => {
                    if (data.result === true) {
                        if (data.data) {
                            await this.SearchLeadById(data.data?.lead_reference_id);
                            await this.SearchCompanyById(data.data?.customer_id);
                            await this.SearchContactPersonById(data.data?.contact_person_id_encode);
                            this.setState({
                                getById: data?.data,
                                inputnumber: data.data.mobile_no_1,
                                selectedlead: data.data?.lead_reference_id,
                                selectedCopmany: data.data?.customer_id,
                                selectedcontactperson: data.data?.contact_person_id_encode,
                                status: data.data.status,

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

    // GET DETAILS BY ID 
    async GetLeadDocument(LeadID) {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_MARKETING_LEAD_DOCUMENT_BY_ID + LeadID, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({
                            leadDocument: data.data,
                            defaultfile: data.data.document_url
                        })
                    }
                });
            });
        } catch (error) {
            toast("Unable to Fetch Marketing Document", {
                type: "error",
            });
        }
    }

    handleSubmit(event, values) {

        try {
            fetch(UPDATE_LEAD_MARKETING + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + "",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lead_topic: values.leadtopic,
                    nature_of_lead: values.leadnature,
                    lead_type: values.leadtype,
                    lead_status: values.leadstatus,
                    lead_reference_id_encode: values.selectedleadreference,
                    reference_person_description: values.referencepersondetails,
                    customer_id_encode: values.customerid,
                    customer_field_description: values.customerfielddescription,
                    // contact_person: values.selectedcontactperson,
                    contact_person_id_encode: values.selectedcontactperson,
                    comments: values.comment,
                    status: "Active",

                }),
            }).then((response) => {
                response.json().then((data) => {
                });
            });
        } catch (error) {
            toast("Unable to Update Marketing Lead", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }

    // ALL DROPDOWN FIELDS
    async SearchLeadById(id) {
        var Token = localStorage.getItem("userToken");
        try {
            await fetch(
                GET_LEAD_REFERENCE_BY_ID +
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
                                LeadDescription: data.data,
                            });
                        }
                    } else {
                    }
                });
            });
        } catch (error) {
        }
    }


    async SearchCompanyById(id) {
        var Token = localStorage.getItem("userToken");
        try {
            await fetch(
                GET_CUSTOMER_BY_ID +
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
                                Companydescription: data.data,

                            });
                        }
                    } else {
                    }
                });
            });
        } catch (error) {
        }
    }

    async SearchContactPersonById(id) {
        var Token = localStorage.getItem("userToken");
        try {
            await fetch(
                GET_CONTACTPERSON_BY_ID + id,
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
                                ContactPersonDescription: data.data,
                                inputnumber: data.data.mobile_no_1
                            });
                        }
                    } else {
                    }
                });
            });
        } catch (error) {
        }
    }

    render() {

        const { defaultfile } = this.state;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="View Marketing Lead" breadcrumbItems={this.state.breadcrumbItems} />
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
                                <Row>
                                    <Col md="3">
                                        <Card style={{
                                            height: "500px",
                                            boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.1)"
                                        }}  >
                                            < CardBody >
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handleSubmit}
                                                // onSubmit={this.submitStep1}
                                                >
                                                    <h5 className="p-1 border-bottom">Lead Details</h5>
                                                    <Row className="p-1" lg="12">
                                                        <Label
                                                            className="form-label "
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Lead Topic
                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.getById.lead_topic}
                                                            name="leadnature"
                                                            placeholder="Lead Nature"
                                                            type="text"
                                                            errorMessage="Please Provide Lead Nature"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Lead Nature

                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.getById.nature_of_lead}
                                                            name="leadnature"
                                                            placeholder="Lead Nature"
                                                            type="text"
                                                            errorMessage="Please Provide Lead Nature"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />

                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Lead Type

                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.getById.lead_type}
                                                            name="leadtype"
                                                            placeholder="Lead Type"
                                                            type="text"
                                                            errorMessage="Please Provide Lead Type"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />

                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Lead Status

                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.getById.lead_status}
                                                            name="leadstatus"
                                                            placeholder="Lead Status"
                                                            type="text"
                                                            errorMessage="Please Provide Lead Status"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom01"

                                                        >
                                                            <option value={""} >Select Lead Satus</option>
                                                            <option value={"Ready"} >Ready</option>
                                                            <option value={"in Progress"} >in Progress</option>
                                                            <option value={"Success"} >Success</option>
                                                            <option value={"Failed"} >Failed</option>

                                                        </AvField>

                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Priority

                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.getById.priority}
                                                            name="priority"
                                                            placeholder="Priority"
                                                            type="text"
                                                            errorMessage="Please Provide Priority"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />


                                                    </Row>
                                                </AvForm>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                    <Col md="3">
                                        <Card style={{ height: "500px", boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.1)" }}>
                                            <CardBody>
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handleSubmit}
                                                // onSubmit={this.submitStep1}
                                                >
                                                    <h5 className="p-1 mt-1 border-bottom">Company Details</h5>
                                                    <Row>

                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom04"
                                                        >
                                                            Select Company Name

                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.Companydescription.company_name}
                                                            required={true}
                                                            name="customerid"
                                                            type="text"
                                                            id="validationCustom04"
                                                            // value={this.state.selectedleadreference}
                                                            errorMessage="Please Select a Company Name."
                                                            validate={{ required: { value: true } }}
                                                            className="form-control"
                                                        >
                                                        </AvField>
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Customer Category

                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.Companydescription.customer_category}
                                                            name="customercategory"
                                                            placeholder="Customer Category"
                                                            type="text"
                                                            // errorMessage="Please Provide Contact Person Name"
                                                            className="form-control"
                                                            // validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />

                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Customer Type

                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.Companydescription.customer_type}

                                                            name="customertype"
                                                            placeholder="Customer Type"
                                                            type="text"
                                                            // errorMessage="Please Provide Contact Person Name"
                                                            className="form-control"
                                                            // validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />

                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Customer Field Description

                                                        </Label>
                                                        <AvField
                                                            value={this.state.getById.customer_field_description}
                                                            // disabled
                                                            name="customerfielddescription"
                                                            placeholder="Customer Type"
                                                            type="text"
                                                            // errorMessage="Please Provide Customer Field Description"
                                                            className="form-control"
                                                            // validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />


                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                            >
                                                                Ownership Type
                                                                {/* */}
                                                            </Label>
                                                            <AvField
                                                                value={this.state.Companydescription.ownership_name}
                                                                disabled
                                                                name="ownershiptype"
                                                                placeholder="Ownership Type"
                                                                type="text"
                                                                // errorMessage="Please Provide Contact Person Name"
                                                                className="form-control"
                                                                // validate={{ required: { value: true } }}
                                                                id="validationCustom01"
                                                            >
                                                                <option value={""} >Select Ownership type</option>
                                                                {this.state.ownershiplist.map((item) => {
                                                                    return (
                                                                        <option value={item.id}>{item.name}</option>

                                                                    );
                                                                })}
                                                            </AvField>
                                                        </Col>
                                                    </Row>
                                                </AvForm>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                    <Col md="3">
                                        <Card style={{ height: "500px", boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.1)" }}>
                                            <CardBody>
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handleSubmit}
                                                // onSubmit={this.submitStep1}
                                                >
                                                    <h5 className="p-1 border-bottom">Reference Details</h5>

                                                    <Row className="mt-1 p-2">

                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom04"
                                                        >
                                                            Lead Reference Type

                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.LeadDescription.name}
                                                            required={true}
                                                            name="selectedleadreference"
                                                            type="text"
                                                            id="validationCustom04"
                                                            // value={this.state.selectedleadreference}
                                                            errorMessage="Please Select a Lead Reference Type."
                                                            validate={{ required: { value: true } }}
                                                            className="form-control"

                                                        >
                                                        </AvField>

                                                        {this.state.selectedlead != "" &&
                                                            (<>

                                                                <Label
                                                                    className="form-label"
                                                                    htmlFor="validationCustom01"
                                                                >
                                                                    Lead Reference Description

                                                                </Label>
                                                                <AvField
                                                                    value={this.state.LeadDescription.description}
                                                                    disabled
                                                                    name="referenceusername"
                                                                    placeholder="Lead Reference Description"
                                                                    type="text"
                                                                    // errorMessage="Please Provide Lead Reference Description"
                                                                    className="form-control"
                                                                    // validate={{ required: { value: true } }}
                                                                    id="validationCustom01"
                                                                />


                                                            </>
                                                            )}

                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Reference Person Details
                                                            {/* */}
                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.getById.reference_person_description}
                                                            name="referencepersondetails"
                                                            placeholder="Reference Person Details"
                                                            type="text"
                                                            // errorMessage="Please Provide Reference Person Details"
                                                            className="form-control"
                                                            // validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Comment

                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.getById.comments}
                                                            name="comment"
                                                            placeholder="Comment"
                                                            type="textarea"
                                                            errorMessage="Please Provide Comment"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />
                                                    </Row>
                                                </AvForm>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                    <Col md="3">
                                        <Card style={{ height: "500px", boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.1)" }}>
                                            <CardBody>
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handleSubmit}
                                                // onSubmit={this.submitStep1}
                                                >
                                                    <h5 className="p-1 mt-1 border-bottom">Contact Person Details</h5>
                                                    <Row>

                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom04"
                                                        >
                                                            Select Contact Person

                                                        </Label>
                                                        <AvField
                                                            disabled
                                                            value={this.state.ContactPersonDescription.first_name + " " + this.state.ContactPersonDescription.last_name}
                                                            required={true}
                                                            name="selectedcontactperson"
                                                            type="text"
                                                            id="validationCustom04"
                                                            // value={this.state.selectedleadreference}
                                                            errorMessage="Please Select a Contact Person."
                                                            validate={{ required: { value: true } }}
                                                            className="form-control"
                                                        >

                                                        </AvField>


                                                        {this.state.selectedcontactperson != "" && (
                                                            <>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor="validationCustom007"
                                                                    >
                                                                        Contact Person Phone No.

                                                                    </Label>


                                                                    <PhoneInput
                                                                        disabled
                                                                        value={this.state.inputnumber}
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

                                                                <Label
                                                                    className="form-label"
                                                                    htmlFor="validationCustom01"
                                                                >
                                                                    Contact Person Designation

                                                                </Label>
                                                                <AvField
                                                                    value={this.state.ContactPersonDescription.designation_name}
                                                                    disabled
                                                                    name="referenceusername"
                                                                    placeholder="Contact Person Designation."
                                                                    type="text"
                                                                    // errorMessage="Please Provide Contact Person Designation"
                                                                    className="form-control"
                                                                    // validate={{ required: { value: true } }}
                                                                    id="validationCustom01"
                                                                />

                                                                <Label
                                                                    className="form-label"
                                                                    htmlFor="validationCustom01"
                                                                >
                                                                    Contact Person Department

                                                                </Label>
                                                                <AvField
                                                                    value={this.state.ContactPersonDescription.department_name}
                                                                    disabled
                                                                    name="referenceusername"
                                                                    placeholder="Contact Person Department."
                                                                    type="text"
                                                                    // errorMessage="Please Provide Contact Person Department"
                                                                    className="form-control"
                                                                    // validate={{ required: { value: true } }}
                                                                    id="validationCustom01"
                                                                />
                                                            </>
                                                        )}
                                                    </Row>
                                                </AvForm>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                </Row>

                                <Row  >
                                    <Col lg="6">
                                        <Card style={{ boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.1)" }}>
                                            <AvForm
                                                className="needs-validation"
                                                onValidSubmit={this.handleSubmit}
                                            // onSubmit={this.submitStep1}
                                            >
                                                <CardBody>
                                                    <h5 className="p-1 mt-1 border-bottom">Lead Document Details</h5>

                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Preview Document
                                                        {/* */}
                                                    </Label>
                                                    {this.state.leadDocument.document_type == "image" ?
                                                        <>
                                                            <div style={{
                                                                width: "100%",
                                                                height: "300px",
                                                                border: "1px dashed #ccc",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                cursor: "pointer",
                                                                padding: "10px",
                                                            }}>
                                                                <img src={defaultfile} height={100}></img>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <iframe
                                                                src={`https://docs.google.com/gview?url=${encodeURIComponent(this.state.leadDocument?.document_url)}&embedded=true`}
                                                                // src={this.state.leadDocument?.document_url}
                                                                frameBorder="0"
                                                                style={{ width: '100%', height: '380px', border: 'none' }}
                                                            >
                                                            </iframe>
                                                            <p>
                                                                <a href={this.state.leadDocument?.document_url} target="_blank">Link to the attached PDF!</a>
                                                            </p>
                                                        </>

                                                    }

                                                    <Row className="mt-1">
                                                        <Col lg="6">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                            >
                                                                Document Type

                                                            </Label>
                                                            <AvField
                                                                disabled
                                                                value={this.state.leadDocument?.document_type}
                                                                name="documenttype"
                                                                placeholder="Document Type"
                                                                type="text"
                                                                errorMessage="Please Provide Document Type"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom01"
                                                            />

                                                        </Col>
                                                        <Col lg="6">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                            >
                                                                Document Name

                                                            </Label>
                                                            <AvField
                                                                disabled
                                                                value={this.state.leadDocument?.document_name}
                                                                name="documentname"
                                                                placeholder="Document Name"
                                                                type="text"
                                                                errorMessage="Please Provide Document Name"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom01"
                                                            />
                                                        </Col>


                                                    </Row>

                                                </CardBody>
                                            </AvForm>
                                        </Card>
                                    </Col>

                                </Row>
                            </>
                        )}
                    </Container>
                </div >
            </React.Fragment >
        );
    };
};

export default ViewMarketLead;
