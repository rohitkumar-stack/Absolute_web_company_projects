import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, CardHeader, FormGroup } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_DEPARTMENT, CREATE_DESIGNATION, CREATE_ITEM_CATEGORY, CREATE_ITEM_MAKER, CREATE_LEAD_REFERENCE, CREATE_LEAVE, CREATE_MARKETING_LEAD, CREATE_SHIFT, CREATE_SUBITEM_CATEGORY, CREATE_TERMS_CONDITIONS, CREATE_UNIT, CREATE_UNIT_MEASURE, CREATE_USER, CREATE_WAREHOUSE, GET_ALL_CUSTOMER_WO_PAGINATION, GET_COUNTRY, GET_ITEM_CATEGORY, GET_LEAD_REFERENCE_WO_PAGINATE } from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class CreateMarketingLead2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Market Lead", link: process.env.PUBLIC_URL + "/marketingleadlist" },
                { title: "Create Market Lead", link: process.env.PUBLIC_URL + "/#" },
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
            Leadreferencelist: [],
            customerlist: [],

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.GetAllReferenceId();
        this.getAllCustomers();

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


    // CREATE USER API
    handleSubmit(event, values) {
        if (this.state.status == "") {
            toast("Please select status", {
                type: "error",
            });
        }
        else {
            // this.setState({
            //     isLoading: true,
            // });
            var Token = localStorage.getItem("userToken");

            try {
                var myHeaders = JSON.stringify({
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                });
                var raw = JSON.stringify({
                    lead_topic: values.leadtopic,             //** required **//
                    nature_of_lead: values.leadnature,
                    lead_type: values.leadtype,           //** required **//
                    lead_status: values.leadstatus,
                    lead_reference_id_encode: values.selectedleadreference,
                    reference_person_description: values.leadpersondescription,
                    customer_id_encode: values.selectedcustomer,
                    customer_field_description: values.customerfielddescription,
                    contact_person: values.contactperson,
                    comments: values.comment,
                    status: "Active"
                });
                fetch(CREATE_MARKETING_LEAD, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                    body: raw,
                }).then((response) => {
                    response.json().then((data) => {
                        if (data.result === true) {
                            toast("Market Lead Created Successfully !", {
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
                            toast("Unable to Create Market Lead", {
                                type: "error",
                            });
                        }
                    });
                });
            } catch (error) {
                toast("Unable to create Market Lead", {
                    type: "error",
                });

            }
        }
    }

    // Callback function to handle file data
    handleFileDataChange = (file) => {
        this.setState({ fileData: file });
    };

    handleAadharBase64DataChange = (base64) => {
        this.setState({ isAadharBase64URL: base64 });
    };


    render() {
        const { isAadharBase64URL, fileData } = this.state;
        const { isView } = this.props;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container className="mt-2 mb-2">
                        <Breadcrumb title="Add Market Lead" breadcrumbItems={this.state.breadcrumbItems} />
                        <Row className="justify-content-center">
                            <Col lg="8">
                                <div className="bg-light p-4 rounded">
                                    <h3 className="text-center mb-4">Create Market Lead</h3>
                                    <AvForm className="needs-validation" onValidSubmit={this.handleSubmit}>
                                        {/* Lead Details */}
                                        <Row>
                                            {[
                                                { label: 'Lead Topic', name: 'leadtopic' },
                                                { label: 'Lead Nature', name: 'leadnature' },
                                                { label: 'Lead Type', name: 'leadtype' },
                                                { label: 'Lead Status', name: 'leadstatus', type: 'select', options: ['', 'Status 1', 'Status 2', 'Status 3'] },
                                                { label: 'Priority', name: 'priority' },
                                            ].map((field, index) => (
                                                <Col lg="6" key={index} className="mb-3">
                                                    <FormGroup>
                                                        <Label for={field.name}>{field.label}</Label>
                                                        <AvField
                                                            name={field.name}
                                                            placeholder={field.label}
                                                            type={field.type || 'text'}
                                                            errorMessage={`Please Provide ${field.label}`}
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            options={field.options}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            ))}
                                        </Row>

                                        {/* Lead Reference Details */}
                                        <h5 className="mt-4">Lead Reference Details</h5>
                                        <Row>
                                            {[
                                                { label: 'Reference Name', name: 'selectedleadreference', type: 'select', options: ['', 'Other', ...this.state.Leadreferencelist.map(item => item.id)] },
                                                { label: 'Reference User Phone Number', name: 'referenceusername', disabled: true },
                                                { label: 'Reference User Designation', name: 'referenceuserdesignation', disabled: true },
                                                { label: 'Lead Reference Person Description', name: 'leadpersondescription', disabled: true },
                                            ].map((field, index) => (
                                                <Col lg="6" key={index} className="mb-3">
                                                    <FormGroup>
                                                        <Label for={field.name}>{field.label}</Label>
                                                        <AvField
                                                            name={field.name}
                                                            placeholder={field.label}
                                                            type={field.type || 'text'}
                                                            errorMessage={`Please Provide ${field.label}`}
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            disabled={field.disabled}
                                                            options={field.options}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            ))}
                                        </Row>

                                        {/* ... (rest of the form as in the previous example) ... */}

                                        {/* Buttons */}
                                        <div className="text-center mt-4">
                                            <Button color="primary" type="submit" className="mr-2">
                                                Create Market Lead
                                            </Button>
                                            <Button color="secondary" onClick={() => this.props.history.goBack()}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </AvForm>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    };
};

export default CreateMarketingLead2;
