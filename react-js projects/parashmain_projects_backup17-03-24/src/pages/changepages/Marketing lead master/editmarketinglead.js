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

class EditMarketingLead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Marketing Lead", link: process.env.PUBLIC_URL + "/marketingleadlist" },
                { title: "Edit Marketing Lead", link: process.env.PUBLIC_URL + "/#" },
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
            inputnumber: "",

            // PROFILE IMAGE 
            defaultfile: "",
            fileData: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleAcceptedFiles = (files) => {
        // Use the FileReader API to read the content of each file and convert it to base64
        const promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    // Resolve with the base64 data
                    resolve({
                        ...file,
                        base64: event.target.result,
                        preview: URL.createObjectURL(file),
                    });
                };
                reader.onerror = (error) => {
                    // Reject with the error
                    reject(error);
                };
                reader.readAsDataURL(file);
            });
        });

        // Wait for all promises to resolve
        Promise.all(promises)
            .then((filesWithBase64) => {
                // Set the state with the updated files
                this.setState({ selectedFiles: filesWithBase64 });
            })
            .catch((error) => {
                console.error('Error reading file:', error);
            });
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



    // GET BY ID
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
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_LEAD_MARKETING + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
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
                    if (data.result === true) {
                        this.UpdateLeadDocument(values, data.data.id);
                    } else {
                        toast("Unable to Update Marketing Lead", {
                            type: "error",
                        });
                        this.setState({
                            isLoading: false,
                        });
                    }
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

    // DOCUMENT UPDATE API
    async UpdateLeadDocument(values, leadid) {
        var Token = localStorage.getItem("userToken");
        try {
            var raw = JSON.stringify({
                document_type: values.documenttype,
                document_name: values.documentname,
                document_url_encode: this.state.selectedFiles[0]?.base64.split(",")[1] ? this.state.selectedFiles[0]?.base64.split(",")[1] : this.state.defaultfile?.split(",")?.[1],
            });

            fetch(UPDATE_DOCUMENT_LEAD + this.state.leadDocument.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Market Lead Updated Successfully !", {
                            type: "success",
                        });

                        this.props.history.goBack();
                    }
                    else if (data.result === false) {

                        toast(data.message, {
                            type: "error",
                        });
                        this.setState({
                            isLoading: false,
                        });
                    }
                    else {
                        toast("Unable to Update Market Lead", {
                            type: "error",
                        });
                        this.setState({
                            isLoading: false,
                        });
                    }
                });
            });
        } catch (error) {

            toast("Unable to Update Market Lead", {
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
                                LeadDescription: data.data.description,
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
                        <Breadcrumb title="Edit Marketing Lead" breadcrumbItems={this.state.breadcrumbItems} />
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
                                        <h5 className="p-1 border-bottom">Lead Details</h5>
                                        <Row className=" mt-2">


                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Lead Topic
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.lead_topic}
                                                    name="leadtopic"
                                                    placeholder="Lead Topic"
                                                    type="text"
                                                    errorMessage="Please Provide Lead Topic"
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
                                                    Lead Nature
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.nature_of_lead}
                                                    name="leadnature"
                                                    placeholder="Lead Nature"
                                                    type="select"
                                                    errorMessage="Please Provide Lead Nature"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                >
                                                    <option value={""} >Select Lead Nature</option>
                                                    <option value={"Lead Nature 1"} >Lead Nature 1</option>
                                                    <option value={"Lead Nature 2"} >Lead Nature 2</option>
                                                </AvField>
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Lead Type
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.lead_type}
                                                    name="leadtype"
                                                    placeholder="Lead Type"
                                                    type="select"
                                                    errorMessage="Please Provide Lead Type"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                >
                                                    <option value={""} >Select Lead Type</option>
                                                    <option value={"Lead Type 1"} >Lead Type 1</option>
                                                    <option value={"Lead Type 2"} >Lead Type 2</option>
                                                </AvField>
                                            </Col>
                                            {/* <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Lead No
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="leadno"
                                                placeholder="Lead No"
                                                type="text"
                                                errorMessage="Please Provide Lead No"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col> */}
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Lead Status
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.lead_status}
                                                    name="leadstatus"
                                                    placeholder="Lead Status"
                                                    type="select"
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
                                            </Col>

                                            {/* <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Priority
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.priority}
                                                    name="priority"
                                                    placeholder="Priority"
                                                    type="text"
                                                    errorMessage="Please Provide Priority"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col> */}
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Comment
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.comments}
                                                    name="comment"
                                                    placeholder="Comment"
                                                    type="textarea"
                                                    errorMessage="Please Provide Comment"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col>
                                        </Row>

                                        <Row className="mt-2">
                                            <Col lg="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Lead Reference Type
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.lead_reference_id}
                                                    required={true}
                                                    name="selectedleadreference"
                                                    type="select"
                                                    id="validationCustom04"
                                                    // value={this.state.selectedleadreference}
                                                    errorMessage="Please Select a Lead Reference Type."
                                                    validate={{ required: { value: true } }}
                                                    className="form-control"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            selectedlead: e.target.value,
                                                        });
                                                        if (e.target.value != "") {
                                                            this.SearchLeadById(e.target.value)
                                                        }
                                                    }}
                                                >
                                                    <option value={""} >Select Reference Type</option>
                                                    {this.state.Leadreferencelist.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.name}</option>

                                                        );
                                                    })}
                                                </AvField>
                                            </Col>
                                            {this.state.selectedlead != "" &&
                                                (<>
                                                    <Col lg="3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Lead Reference Description
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            value={this.state.LeadDescription}
                                                            disabled
                                                            name="referenceusername"
                                                            placeholder="Lead Reference Description"
                                                            type="text"
                                                            // errorMessage="Please Provide Lead Reference Description"
                                                            className="form-control"
                                                            // validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />
                                                    </Col>

                                                </>
                                                )}
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Reference Person Details
                                                    {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.reference_person_description}
                                                    // disabled
                                                    name="referencepersondetails"
                                                    placeholder="Reference Person Details"
                                                    type="text"
                                                    // errorMessage="Please Provide Reference Person Details"
                                                    className="form-control"
                                                    // validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col>
                                        </Row>

                                        <h5 className="p-1 mt-1 border-bottom">Company Details</h5>
                                        <Row>
                                            <Col lg="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Select Company Name
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.customer_id}
                                                    required={true}
                                                    name="customerid"
                                                    type="select"
                                                    id="validationCustom04"
                                                    // value={this.state.selectedleadreference}
                                                    errorMessage="Please Select a Company Name."
                                                    validate={{ required: { value: true } }}
                                                    className="form-control"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            selectedCopmany: e.target.value,
                                                        });
                                                        if (e.target.value != "") {
                                                            this.SearchCompanyById(e.target.value)
                                                        }
                                                    }}
                                                >
                                                    <option value={""} >Select Company Name</option>
                                                    {this.state.customerlist.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.company_name}</option>

                                                        );
                                                    })}
                                                </AvField>
                                            </Col>
                                            {this.state.selectedCopmany && (
                                                <>
                                                    <Col lg="3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Customer Category
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            value={this.state.Companydescription.customer_category}
                                                            disabled
                                                            name="customercategory"
                                                            placeholder="Customer Category"
                                                            type="text"
                                                            // errorMessage="Please Provide Contact Person Name"
                                                            className="form-control"
                                                            // validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />
                                                    </Col>
                                                    <Col lg="3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Customer Type
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            value={this.state.Companydescription.customer_type}
                                                            disabled
                                                            name="customertype"
                                                            placeholder="Customer Type"
                                                            type="text"
                                                            // errorMessage="Please Provide Contact Person Name"
                                                            className="form-control"
                                                            // validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        />
                                                    </Col>
                                                    <Col lg="3">
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
                                                            type="select"
                                                            // errorMessage="Please Provide Customer Field Description"
                                                            className="form-control"
                                                            // validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        >
                                                            <option value={""} >Select Field Description</option>
                                                            <option value={"Other"} >Other</option>
                                                            <option value={"Manufacturing"} >Manufacturing</option>
                                                            <option value={"Service"} >Service</option>
                                                        </AvField>
                                                    </Col>
                                                </>
                                            )}
                                        </Row>
                                        <Row>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Ownership Type
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.Companydescription.ownership_type_id}
                                                    name="ownershiptype"
                                                    placeholder="Ownership Type"
                                                    type="select"
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

                                        <h5 className="p-1 mt-1 border-bottom">Contact Person Details</h5>

                                        <Row>
                                            <Col lg="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Select Contact Person
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.contact_person_id_encode}
                                                    required={true}
                                                    name="selectedcontactperson"
                                                    type="select"
                                                    id="validationCustom04"
                                                    // value={this.state.selectedleadreference}
                                                    errorMessage="Please Select a Contact Person."
                                                    validate={{ required: { value: true } }}
                                                    className="form-control"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            selectedcontactperson: e.target.value,
                                                        });
                                                        if (e.target.value != "") {
                                                            this.SearchContactPersonById(e.target.value)
                                                        }
                                                    }}
                                                >
                                                    <option value={""} >Select Contact Person</option>
                                                    {this.state.contactpersonlist.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.first_name + " " + item.last_name}</option>

                                                        );
                                                    })}
                                                </AvField>
                                            </Col>

                                            {this.state.selectedcontactperson != "" && (
                                                <>
                                                    <Col lg="3">
                                                        {/* <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Contact Person Phone No.
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            value={this.state.ContactPersonDescription.mobile_no_1}
                                                            disabled
                                                            name="referenceusername"
                                                            placeholder="Contact Person No."
                                                            type="text"
                                                            // errorMessage="Please Provide Contact Person Name"
                                                            className="form-control"
                                                            // validate={{ required: { value: true } }}
                                                            id="validationCustom01"
                                                        /> */}
                                                        <div className="mb-3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom007"
                                                            >
                                                                Contact Person Phone No.
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>


                                                            <PhoneInput
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
                                                    </Col>
                                                    <Col lg="3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Contact Person Designation
                                                            <span style={{ color: "#ff0000" }}>*</span>
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
                                                    </Col>
                                                    <Col lg="3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Contact Person Department
                                                            <span style={{ color: "#ff0000" }}>*</span>
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
                                                    </Col></>
                                            )}
                                        </Row>
                                        <h5 className="p-1 mt-1 border-bottom">Lead Document Details</h5>

                                        <Row>

                                            <Col lg="6">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Document Preview
                                                </Label>
                                                {/* <Dropzone
                                                    onDrop={acceptedFiles =>
                                                        this.handleAcceptedFiles(acceptedFiles)
                                                    }
                                                >
                                                    {({ getRootProps, getInputProps }) => (
                                                        <div className="dropzone">
                                                            <div
                                                                className="dz-message needsclick"
                                                                {...getRootProps()}
                                                            >
                                                                <input {...getInputProps({ defaultValue: this.state.ContactPersonDescription.document_url })} />
                                                                <img src={this.state.ContactPersonDescription?.document_url} height="200" alt="Hello" />
                                                                <div className="mb-3">
                                                                    <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                                                </div>
                                                                <h4>Drop files here or click to upload.</h4>
                                                             
                                                            </div>
                                                        </div>
                                                    )}

                                                </Dropzone> */}

                                                {this.state.leadDocument.document_type == "image" ?
                                                    <CustomFileInputNew
                                                        onDataChange={this.handleFileDataChange}
                                                        onBase64Change={this.handleAadharBase64DataChange}
                                                        defaultFile={defaultfile}
                                                    />
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
                                                        </p></>


                                                }
                                            </Col>
                                            {this.state.leadDocument.document_type != "image" ?
                                                <Col lg="6">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Upload Document
                                                    </Label>
                                                    <Dropzone
                                                        onDrop={acceptedFiles =>
                                                            this.handleAcceptedFiles(acceptedFiles)
                                                        }
                                                    >
                                                        {({ getRootProps, getInputProps }) => (
                                                            <div className="dropzone">
                                                                <div
                                                                    className="dz-message needsclick"
                                                                    {...getRootProps()}
                                                                >
                                                                    <input {...getInputProps()} />
                                                                    <div className="mb-3">
                                                                        <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                                                    </div>
                                                                    <h4>Drop files here or click to upload.</h4>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Dropzone>
                                                    <div
                                                        className="dropzone-previews mt-3"
                                                        id="file-previews"
                                                    >
                                                        {this.state.selectedFiles.map((f, i) => {
                                                            return (
                                                                <Card
                                                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                    key={i + "-file"}
                                                                >
                                                                    <div className="p-2">
                                                                        <Row className="align-items-center">
                                                                            <Col className="col-auto">
                                                                                <img
                                                                                    data-dz-thumbnail=""
                                                                                    height="80"
                                                                                    className="avatar-sm rounded bg-light"
                                                                                    alt={f.name}
                                                                                    src={f.preview}
                                                                                />
                                                                            </Col>
                                                                            <Col>
                                                                                <Link
                                                                                    to="#"
                                                                                    className="text-muted fw-bold"
                                                                                >
                                                                                    {f.name}
                                                                                </Link>
                                                                                <p className="mb-0">
                                                                                    <strong>{f.formattedSize}</strong>
                                                                                </p>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </Card>
                                                            );
                                                        })}
                                                    </div>
                                                </Col>
                                                :
                                                ""}
                                        </Row>
                                        <Row className="mt-1">
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Document Type
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.leadDocument?.document_type}
                                                    name="documenttype"
                                                    placeholder="Document Type"
                                                    type="select"
                                                    errorMessage="Please Provide Document Type"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                ><option value={""} >Select Document Type</option>
                                                    <option value={"image"} >Image</option>
                                                    <option value={"pdf"} >PDF</option>

                                                </AvField>
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Document Name
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
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

export default EditMarketingLead;
