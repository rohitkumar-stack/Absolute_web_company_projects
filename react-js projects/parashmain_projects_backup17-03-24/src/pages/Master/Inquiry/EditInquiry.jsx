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
import { GET_CONTACTPERSON_WO_PAGINATE, GET_INQUIRY_BY_ID, GET_ALL_CUSTOMER_WO_PAGINATION,GET_CONTACTPERSON_BY_ID, GET_CUSTOMER_BY_ID, UPDATE_INQUIRY } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";

class EditInquiry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Inquiry", link: process.env.PUBLIC_URL + "/inquirylist" },
                { title: "Edit Inquiry", link: process.env.PUBLIC_URL + "/#" },
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
              //leadUpadteComments
              InquiryGetByIdData: {
                id: '',
                lead_topic: '',
                nature_of_lead: '',
                lead_type: '',
                lead_status: '',
                customer_id_encode: '',
                contact_person_id_encode: '',
                notes: '',
                expected_closed_dt: '',
                order_probability: '',
                // ... other properties
            },


        };
        this.handleUpdateInquirySubmit = this.handleUpdateInquirySubmit.bind(this);
    };

    componentDidMount() {
          // Access the location object to get route parameters
          const { location } = this.props;
          // console.log(location, "========>location");
          const { pathname } = location;
          // console.log(pathname, "========>pathname")
  
          const { match } = this.props;
          const LeadCommentListsId = match.params.id;
  
          // Update the state with the value of ids
          this.setState({ LeadCommentListsId: match.params.id });
          // console.log(LeadCommentListsId, "===========>LeadCommentListsId")
  
          //update Activity With Value of the Ids
          const LeadActivityListsId = match.params.id;
          this.setState({ LeadActivityListsId: match.params.id });
          // console.log(LeadActivityListsId, "==>LeadActivityListsId")
       
          // Parse the pathname to get the id parameter
          const id = pathname.substring(pathname.lastIndexOf("/") + 1);

        this.getAllContactsData();
        this.getAllCustomers();
        this.GetInquiryByIdData(id);

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

    // start--- UPDATE  INQUIRY API

      //GET INQUIRY DATA LISTS
      async GetInquiryByIdData(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_INQUIRY_BY_ID + id,
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
                                InquiryGetByIdData: data.data,
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
    
    handleUpdateInquirySubmit(event, values) {
        console.log(values, "=>values")
        console.log(this.state.InquiryGetByIdData.id, "==>Id")
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_INQUIRY + this.state.InquiryGetByIdData.id, {
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
                    order_probability: values.orderprobability,
                    expected_closed_dt: values.enddate,
                    notes: values.notes,
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Inquiry Updated Successfully !", {
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
            toast("Unable to Update Inquiry", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }
    //End--- UPDATE  INQUIRY API

    render() {
        // Parse the JSON string into a JavaScript object
        const permissionsString = localStorage.getItem("permissionarray");
        const permissions = JSON.parse(permissionsString);
        const filteredPermissions = permissions.filter(permission => permission.status === 'Active');
        const customerActive = filteredPermissions?.find(permission => permission.name === "Add Customers Master");

        //Api Value 
        const { customerlist, InquiryGetByIdData} = this.state;
         console.log(InquiryGetByIdData, "===>InquiryUpdateIDData");

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Edit Inquiry" breadcrumbItems={this.state.breadcrumbItems} />
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
                                        onValidSubmit={this.handleUpdateInquirySubmit}
                                    // onSubmit={this.submitStep1}
                                    >
                                        <Row md="12">
                                        <Col lg="4">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Lead Topic
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                               value={this.state.InquiryGetByIdData.lead_topic}
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
                                               value={this.state.InquiryGetByIdData.nature_of_lead}
                                                name="leadnature"
                                                placeholder="Lead Nature"
                                                type="select"
                                                errorMessage="Please Provide Lead Nature"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                                // onChange={(event) => this.handleLeadNatureChange(event)}
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
                                                value={this.state.InquiryGetByIdData.lead_type}
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
                                               value={this.state.InquiryGetByIdData.lead_status}
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
                                               value={this.state.InquiryGetByIdData.order_probability}
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
                                                End Date
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                               value={this.state.InquiryGetByIdData.expected_closed_dt}
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
                                                value={this.state.InquiryGetByIdData.contact_person_id_encode}
                                                required={true}
                                                name="selectedcontactperson"
                                                type="select"
                                                id="validationCustom04"
                                                errorMessage="Please Select a Contact Person."
                                                validate={{ required: { value: true } }}
                                                className="form-control"
                                                onChange={(e) => {
                                                    this.setState((prevState) => ({
                                                        selectedcontactperson: e.target.value,
                                                        selectedcontactperson: e.target.value,
                                                        InquiryGetByIdData: {
                                                            ...prevState.InquiryGetByIdData,
                                                            contact_person_id_encode: e.target.value,
                                                        },
                                                    }));
                                                    if (e.target.value != "") {
                                                        this.SearchContactPersonById(e.target.value)
                                                    }
                                                }}
                                            >
                                                <option value={""} >Select Contact Person</option>
                                                <option value={""} >Other</option>
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
                                                value={this.state.InquiryGetByIdData.customer_id}
                                                errorMessage="Please Select a Company Name."
                                                validate={{ required: { value: true } }}
                                                className="form-control"
                                                onChange={(e) => {
                                                    this.setState((prevState) => ({
                                                        selectedCopmany: e.target.value,
                                                        selectedcontactperson: e.target.value,
                                                        InquiryGetByIdData: {
                                                            ...prevState.InquiryGetByIdData,
                                                            customer_id: e.target.value,
                                                        },
                                                    }));
                                                    if (e.target.value != "") {
                                                        this.SearchCompanyById(e.target.value)
                                                    }
                                                }}
                                            >
                                                <option value={""} >Select Company Name</option>
                                                <option value={""} >Other</option>
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
                                               value={this.state.InquiryGetByIdData.notes}
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

export default EditInquiry;
