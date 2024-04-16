import React, { Component } from "react";
import {
    Row, Col, Card, CardBody, Container, Label,
    Form, Button, ModalBody, ModalHeader, Modal
} from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
// import CreateCustomerModal from "../customermaster/CreateCustomerModal";
// import CreateContactPersonModal from "../contactperson/CreateContactPersonModal";
import {GET_CONTACTPERSON_WO_PAGINATE, CREATE_INQUIRY, GET_ALL_CUSTOMER_WO_PAGINATION,GET_CONTACTPERSON_BY_ID, GET_CUSTOMER_BY_ID} from "../../../globals";
import { redirect } from "react-router";

class CreateInquiry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Inquiry ", link: process.env.PUBLIC_URL + "/inquirylist" },
                { title: "Create Inquiry", link: process.env.PUBLIC_URL + "/createInquiry" },
            ],
            selectedFiles: [],
            Img: "",
            status: "",
            inputMobileField: "",
            shiftdetails: "",
            senderList: [],
            selectedcountry: "",
            contactpersonlistData: [],
            customerlist: [],
            customerShow: false,
            contactShow: false,
            //inquiry feilds name
            contact_person_id_encode: "",
            contact_person_id_encode: "",



        };
        // this.handleInquirySubmit = this.handleInquirySubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.getAllContactsData();
        this.getAllCustomers();

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

    // GET ALL CONTACTPERSON SENDERS
    async getAllContactsData() {
        var Token = localStorage.getItem("userToken");
        try {
            const response = await fetch(GET_CONTACTPERSON_WO_PAGINATE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.result === true) {
                this.setState({ contactpersonlistData: data.data });
                // Assuming data.data is an array and you want to get the first item's id
                const firstContactId = data.data.length > 0 ? data.data[0].id : null;
                this.setState({ selectedContactId: firstContactId });
            } else if (data.result === false) {
                toast(data.message, {
                    type: "error",
                });
            } else {
                // Handle other cases if needed
            }
        } catch (error) {
            // Handle errors
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

    // GET ALL CUSTOMER SENDERS 
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
                        // Assuming data.data is an array and you want to get the first item's id
                        const CutomerFirstID = data.data.length > 0 ? data.data[0].id : null;
                        this.setState({ selectedCustomerId: CutomerFirstID });
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
    

    // CREATE Inquiry API
    handleSubmit(events, values) {
       console.log("-=======>values", values)
      
        var Token = localStorage.getItem("userToken");
        // return false
        try {
            fetch(CREATE_INQUIRY, {
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
                    customer_id_encode: values.customerid,
                    contact_person_id_encode: values.selectedcontactperson,
                    // customer_id_encode: "aVbqKPzWy2pj0JZg",
                    // contact_person_id_encode: "39n0Z12OZGKERJgW",
                    order_probability: values.orderprobability,
                    status: "Active",
                    inquiry_status: "0",
                    expected_closed_dt: values.enddate,
                    notes: values.notes,

                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result == true) {
                        toast("Inquiry Created Successfully", {
                            type: "success",
                        });
                        //Get lists 
                        // this.LeadComments(LeadCommentListsId);
                        // Close button the form
                        // this.handleCancelButtonClick();
                        // Reset the form
                        this.form && this.form.reset();
                        this.props.history.push('/parasmanierp/inquirylist');

                        this.setState({
                            modal_xlarge: false,
                        });
                    }
                    else {
                        toast("Unable to Create Inquiry", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to Create  Inquiry", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }

    render() {
        // Parse the JSON string into a JavaScript object
        const permissionsString = localStorage.getItem("permissionarray");
        const permissions = JSON.parse(permissionsString);
        const filteredPermissions = permissions.filter(permission => permission.status === 'Active');
        const customerActive = filteredPermissions?.find(permission => permission.name === "Add Customers Master");

        //Api Value 
        const { customerlist } = this.state;
        // console.log(customerlist, "===>customerlist")

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add Inquiry" breadcrumbItems={this.state.breadcrumbItems} />
                        <Card>
                            <CardBody>
                                <AvForm
                                    className="needs-validation"
                                    onValidSubmit={this.handleSubmit}
                                >
                                    <Row className="mt-2">
                                          <Col lg="4">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Lead Topic
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="leadtopic"
                                                placeholder="Lead Topic"
                                                type="text"
                                                errorMessage="Please Provide Lead Topic"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>

                                        <Col lg="4">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Lead Nature
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
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

                                        <Col lg="4">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Lead Type
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
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

                                        <Col lg="4">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Lead Status
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
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

                                        <Col lg="4">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Order Probability
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="orderprobability"
                                                placeholder="Order Probability"
                                                type="text"
                                                errorMessage="Please Provide Order Probability"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>

                                        <Col md="4" className="d-inline">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom04"
                                            >
                                                Expected Close Date
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                required={true}
                                                name="enddate"
                                                type="date"
                                                id="validationCustom04"
                                                // value={this.state.selectedcountry}
                                                errorMessage="Please select end date."
                                                validate={{ required: { value: true } }}
                                                className="form-control"
                                                min={this.state.selectedStartDate ? this.state.selectedStartDate : ""}
                                            >
                                            </AvField>
                                        </Col>

                                        <Col lg="4" className="d-inline">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom04"
                                            >
                                                Select Contact Person
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                value={this.state.selectedleadreference}
                                                required={true}
                                                name="selectedcontactperson"
                                                type="select"
                                                id="validationCustom04"
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
                                                <option value={"Other"} >Other</option>
                                                {this.state.contactpersonlistData.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.first_name + " " + item.last_name}</option>

                                                    );
                                                })}
                                            </AvField>
                                        </Col>

                                        <Col lg="4" className="d-inline">
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Select Company Name
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                            </div>
                                            <AvField
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
                                                <option value={"Other"} >Other</option>
                                                {this.state.customerlist.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.company_name}</option>

                                                    );
                                                })}

                                            </AvField>
                                        </Col>
                                        
                                        <Col lg="12">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Notes
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="notes"
                                                placeholder="Notes"
                                                type="textarea"
                                                errorMessage="Please Provide Notes"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>

                                    </Row>

                                    <Button color="primary" type="submit" >
                                        Create Inquiry
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

export default CreateInquiry;




