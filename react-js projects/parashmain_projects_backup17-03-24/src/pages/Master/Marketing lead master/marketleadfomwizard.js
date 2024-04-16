import React, { Component } from "react";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import {
    AvForm,
    AvField,
    AvRadioGroup,
    AvRadio,
} from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import {
    GET_MARKETING_LEAD,
    FIND_CONTACTPERSON_DESINATION_BYID,
    GET_CONTACTPERSON_DEPARTMENT,
    CREATE_DOCUMENT_LEAD,
    GET_CONTACTPERSON_SEARCH,
    FIND_CONTACTPERSON_DEPARTMENT_BYID,
    CREATE_LEAD_REFERENCE,
    CREATE_LEAVE,
    CREATE_MARKETING_LEAD,
    CREATE_MARKETING_LEAD_WIDTH_DOCUMENTS,
    CREATE_SHIFT,
    CREATE_SUBITEM_CATEGORY,
    CREATE_TERMS_CONDITIONS,
    CREATE_UNIT,
    CREATE_UNIT_MEASURE,
    CREATE_USER,
    CREATE_WAREHOUSE,
    GET_ALL_CUSTOMER_WO_PAGINATION,
    GET_CONTACTPERSON_BY_ID,
    GET_CONTACTPERSON_WO_PAGINATE,
    GET_COUNTRY,
    GET_CUSTOMER_BY_ID,
    GET_ITEM_CATEGORY,
    GET_LEAD_REFERENCE_BY_ID,
    GET_LEAD_REFERENCE_WO_PAGINATE,
    GET_OWNERSHIP_WO_PAGINATE,
} from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
    Row,
    Col,
    Card,
    CardBody,
    TabContent,
    CardHeader,
    TabPane,
    NavItem,
    NavLink,
    Label,
    Input,
    Form,
    Progress,
    Container,
    Button,
    Table,
    ModalBody,
    ModalHeader,
    Modal,
} from "reactstrap";
import classnames from "classnames";
import { RiDeleteBin6Line } from "react-icons/ri";
import CreateLeadRefranceModal from "../leadreferencemaster/CreateLeadRefranceModal";
import CreateCustomerModal from "../customermaster/CreateCustomerModal";
import CreateContactPersonModal from "../contactperson/CreateContactPersonModal";
import { ThreeDots } from "react-loader-spinner";
import Image from "react-bootstrap/Image";
import marketingImage from "./marketingImage/marketingImage.png";

class MarketLeadForWizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                {
                    title: "Market Lead",
                    link: process.env.PUBLIC_URL + "/marketingleadlist",
                },
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
            selectedlead: "",
            LeadDescription: "",
            Companydescription: "",
            selectedCopmany: "",
            ownershiplist: [],
            contactpersonlist: [],
            selectedcontactperson: "",
            ContactPersonDescription: "",
            activeTab: 1,
            leadvalue: "",
            lead_topic: "",
            nature_of_lead: "",
            mobile_number: "",
            designation: "",
            department: '',
            lead_reference_description: "",

            lead_type: "",
            lead_status: "",
            lead_reference_id_encode: "",
            reference_person_description: "",
            customer_id_encode: "",
            customer_field_description: "",

            contact_person_id_encode: "",
            comments: "",
            priority: "",
            subject: "",
            description: "",
            start_dt: "",
            end_dt: "",

            status: "",
            document_type: "",
            document_name: "",
            document_url_encode: "",
            selectedFiles: [],
            contactPersornArray: [],
            contact_person_id_encode_new: [],
            rows: [
                {
                    id: "",
                    document_name: "",
                    document_type: "",
                    document_url_encode: "",
                },
            ],
            leadRefShow: false,
            customerShow: false,
            contactShow: false,
            //Add more contact model
            ContactAddMore_Model: false,
            // newRowData: [{
            //     mobile_no_1:"",
            //     department_name:"",
            //     designation_name:"",
            // }] ,
            formData: {
                mobile_no_1: "",
                department_name: "",
                designation_name: "",
            },
            contactpersonlistAddMore: [],
            ContactPersonDescriptionAddMore: "",
            selectedcontactpersonAddMore: "",
            dataArray: [],
            dataArraygetContactData: [],
            inputnumber: "",
            ContactDesignation: [],
            FindContactDepartment: [],
            FindContactDesignation: [],
            ContactPersonSearch: [],
            customer_id_encode: "",
            designation_id_encode: "",
            department_id_encode: "",
            companyType: "existing", // 'existing' or 'new'
            CompanyId: "",
            DesinationId: "",
            DepartmentId: "",
            selectedCompany: "",
            selectedDepartment: "",
            selectedDesination: "",
            selectedDate: new Date().toISOString().split("T")[0], // Get current date in 'YYYY-MM-DD' format
            contectPersonArray: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleTab.bind(this);
        this.toggleTabProgress.bind(this);
        this.handleContactAddMore = this.handleContactAddMore.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        // this.handleAddMoreContactPerson = this.handleAddMoreContactPerson.bind(this);
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            if (tab >= 1 && tab <= 5) {
                this.setState({
                    activeTab: tab,
                });
            }
        }
    }

    //Start--------- toggletab with validation
    //   toggleTab(tab) {
    //     // If navigating forward, perform validation based on the current active tab
    //     if (tab > this.state.activeTab) {
    //         let isValid = false;
    //         let validationMessage = '';

    //         switch(this.state.activeTab) {
    //             case 1:
    //                 isValid = this.validateLeadDetails();
    //                 validationMessage = 'Please fill in all required fields in Lead Details tab';
    //                 break;
    //             case 2:
    //                 isValid = this.validateCompanyDetails();
    //                 validationMessage = 'Please fill in all required fields in Company Details tab';
    //                 break;
    //             // Add cases for other tabs if needed
    //             default:
    //                 isValid = true;
    //         }

    //         // If validation fails, display toast message and prevent switching tabs
    //         if (!isValid) {
    //             toast.error(validationMessage);
    //             return;
    //         }
    //     }

    //     // Proceed to the selected tab
    //     this.setState({
    //         activeTab: tab
    //     });
    // }

    //     validateLeadDetails() {
    //         // Get lead details data from state or wherever it's stored
    //         const leadDetails = this.state.leadDetails;

    //         // Perform validation logic
    //         if (leadDetails && leadDetails.leadtopic !== '' && leadDetails.leadtopic !== ''
    //             && leadDetails.leadnature !== '' && leadDetails.leadtype !== ''
    //             && leadDetails.leadstatus !== '' && leadDetails.selectedleadreference !== ''
    //             && leadDetails.referencepersondetails !== '' && leadDetails.leadtopic !== ''
    //         ) {

    //             // Validation passes if name and email are not empty
    //             return true;
    //         } else {
    //             // Validation fails if name or email is empty
    //             return false;
    //         }
    //     }

    //     validateCompanyDetails() {
    //         // Get lead details data from state or wherever it's stored
    //         const leadDetails = this.state.leadDetails;

    //         // Perform validation logic
    //         if (leadDetails && leadDetails.customerid !== '' && leadDetails.customerfielddescription !== ''
    //             && leadDetails.selectedcontactperson !== ''
    //         ) {

    //             // Validation passes if name and email are not empty
    //             return true;
    //         } else {
    //             // Validation fails if name or email is empty
    //             return false;
    //         }
    //     }
    //End---------  with validation

    //  Start-------- ToggoleProgressbar
    toggleTabProgress(tab) {
        if (this.state.activeTabProgress !== tab) {
            if (tab >= 1 && tab <= 5) {
                this.setState({
                    activeTabProgress: tab,
                });
                if (tab === 1) {
                    this.setState({ progressValue: 25 });
                }
                if (tab === 2) {
                    this.setState({ progressValue: 50 });
                }
                if (tab === 3) {
                    this.setState({ progressValue: 75 });
                }
                if (tab === 4) {
                    this.setState({ progressValue: 100 });
                }
            }
        }
    }
    //  End-------- ToggoleProgressbar

    componentDidMount() {
        const selectedCopmany = this.state;
        console.log(selectedCopmany, "=>selectedCopmany");

        this.GetAllReferenceId();
        this.getAllCustomers();
        this.GetAllOwnership();
        this.getAllContacts();
        this.getAllMarketinglists();
        // this.getAllContactsDesination();
        // this.FindAllContactsDepartment(selectedCopmany);
        // this.getAllContactsPersonSearch();
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
                    } else if (data.result === false) {
                        toast(data.message, {
                            type: "error",
                        });
                    } else {
                    }
                });
            });
        } catch (error) { }
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
                    } else if (data.result === false) {
                        toast(data.message, {
                            type: "error",
                        });
                    } else {
                    }
                });
            });
        } catch (error) { }
    }
    // GET ALL SENDERS
    async getAllContacts() {
        const selectedCopmany = this.state;
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
                        this.setState({ contactpersonlistAddMore: data.data });
                    } else if (data.result === false) {
                        // toast(data.message, {
                        //     type: "error",
                        // });
                    } else {
                    }
                });
            });
        } catch (error) { }
    }

    //GET ALL Contact Designation
    async FindAllContactsDesination(selectedCopmany) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            const response = await fetch(
                FIND_CONTACTPERSON_DESINATION_BYID + selectedCopmany,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            if (data.result === true) {
                this.setState({ FindContactDesignation: data.data });
                this.setState({ DesinationId: data.data.id }, () => {
                    console.log("====>DesinationId:", this.state.DesinationId);
                });
            } else if (data.result === false) {
                // toast(data.message, {
                //     type: "error",
                // });
            }
        } catch (error) {
            // Handle error
            console.error("Error fetching contacts:", error);
        } finally {
            this.setState({
                isLoading: false, // Ensure isLoading is set to false regardless of success or failure
            });
        }
    }

    //GET ALL Contact Department
    async FindAllContactsDepartment(selectedCompany) {
        this.setState({
            isLoading: true,
        });

        var Token = localStorage.getItem("userToken");
        try {
            const response = await fetch(
                FIND_CONTACTPERSON_DEPARTMENT_BYID + selectedCompany,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            if (data.result === true) {
                this.setState({ FindContactDepartment: data.data });
                this.setState({ DepartmentId: data.data.id }, () => {
                    console.log("====>DepartmentId:", this.state.DepartmentId);
                });
            } else if (data.result === false) {
                // toast(data.message, {
                //     type: "error",
                // });
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            this.setState({
                isLoading: false, // Ensure isLoading is set to false regardless of success or failure
            });
        }
    }
    //GET ALL ContactsPerson Search
    async getAllContactsPersonSearch() {
        this.setState({
            isLoading: true,
        });
        const { selectedCompany, selectedDepartment, selectedDesination } =
            this.state;
        // console.log(CompanyId, "===>CompanyId");

        var Token = localStorage.getItem("userToken");

        try {
            var myHeaders = {
                Authorization: "Bearer " + Token,
                "Content-Type": "application/json",
            };

            var raw = JSON.stringify({
                customer_id_encode: selectedCompany, // Pass the customer_id_encode obtained from state
                department_id_encode: selectedDepartment,
                designation_id_encode: selectedDesination,
            });

            const response = await fetch(GET_CONTACTPERSON_SEARCH, {
                method: "POST",
                headers: myHeaders,
                body: raw,
            });

            const data = await response.json();

            if (data.result === true) {
                this.setState({ ContactPersonSearch: data.data });
                // this.setState({ contactpersonlistAddMore: data.data });
            } else if (data.result === false) {
                // toast(data.message, {
                //     type: "error",
                // });
            } else {
                // Handle other cases if needed
            }
        } catch (error) {
            // Handle errors here
            console.error("Error fetching data:", error);
        } finally {
            this.setState({
                isLoading: false, // Ensure isLoading is set to false regardless of success or failure
            });
        }
    }

    // Marketing list
    async getAllMarketinglists() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_MARKETING_LEAD, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ contactpersonlist: data.data });
                        this.setState({ contactpersonlistAddMore: data.data });
                    } else if (data.result === false) {
                        // toast(data.message, {
                        //     type: "error",
                        // });
                    } else {
                    }
                });
            });
        } catch (error) { }
    }

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
                console.error("Error reading file:", error);
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
        } catch (error) { }
    }

    //   start------ All step pass value
    async StepOneSubmit(event, values) {
        await this.setState({
            leadvalue: values.leadtopic,
            lead_topic: values.leadtopic,
            nature_of_lead: values.leadnature,
            lead_type: values.leadtype,
            lead_status: values.leadstatus,
            lead_reference_id_encode: values.selectedleadreference,
            reference_person_description: values.referencePersonName || values.referencePersonName,
            mobile_number: this.state.inputnumber,
            designation: values.designation,
            department: values.department,
            lead_reference_description: values.referenceDescription || values.referenceDescription01,
            comments: values.comment,
            priority: values.priority,
            activeTab: 2,
        });

        // Store the lead data in local storage
        localStorage.setItem('leadData', JSON.stringify(this.state));
        // console.log(this.state, "=======>leadData");
    }

    async StepTwoSubmit(event, values) {
        await this.setState({
            customer_id_encode: values.customerid,
            customer_field_description: values.customerfielddescription,
            contact_person_id_encode: values.selectedcontactperson,

            activeTab: 3,
        });
        // Store the lead data in local storage
        localStorage.setItem('leadData', JSON.stringify(this.state));
        // console.log(this.state, "=======>leadData");
    }

    async StepThreeSubmit(event, values) {
        // Extracting only the contact_person_id_encode values from the dataArray
        // const contactPersonIds = this.state.dataArray.map((item) => {
        //     return {
        //         contact_person_id_encode: item.contact_person_id_encode,
        //     };
        // });
        // this.setState({
        //     contactPersornArray: contactPersonIds,
        // });
        // await this.setState({
        //     contactpersonDetails: contactPersonIds,
        //     // contactpersonDetails: this.state.dataArray,
        //     activeTab: 4,
        // });

        await this.setState({
            document_type: values.documenttype,
            document_name: values.documentname,
            // document_url_encode: this.state.selectedFiles[0].base64.split(",")[1],
            status: "Active",

            activeTab: 4,
        });
        // this.FinalSubmit();
        console.log("values---", { ...values, documents: this.state.rows });
        // this.props.history.push('/parasmanierp/marketingleadlist');
        // this.getAllMarketinglists();
        // Store the lead data in local storage
        localStorage.setItem('DocumetData', JSON.stringify(this.state.rows));

        // console.log(this.state, "=======>leadData");

    }

    async StepFourSubmit(event, values) {
        await this.setState({
            subject: values.subject,
            description: values.description,
            start_dt: values.startdate,
            end_dt: values.enddate,
            contact_person_id_encode: values.selectedcontactperson,

            activeTab: 5,
        });
        localStorage.setItem('valuesActivitydata', JSON.stringify(this.state));
        // this.getActivityDataFromLocalStorage();
    }

    async StepFiveSubmit(event, values) {
        // Log the subject value
        // Log the subject value just after setting the state
        console.log("Subject Value:", this.state.subject);

        const data = this.state.contact_person_id_encode_new?.map((data) => {
            return {
                contact_person_id_encode: data?.contact_person_id_encode_new,
            };
        });
        console.log("data-----", data);
        // localStorage.setItem('DocumetData', JSON.stringify(this.state));

        this.FinalSubmit(data);
        // console.log(values, "StepFiveSubmit" )
        this.props.history.push("/parasmanierp/marketingleadlist");
        this.getAllMarketinglists();
    }

    // new api end Point
    async FinalSubmit(data) {
        var Token = localStorage.getItem("userToken");
        try {
            var raw = JSON.stringify({
                lead_topic: this.state.lead_topic,
                nature_of_lead: this.state.nature_of_lead,
                lead_type: this.state.lead_type,
                lead_status: this.state.lead_status,
                lead_reference_id_encode: this.state.lead_reference_id_encode,
                reference_person_description: this.state.reference_person_description,

                mobile_number: this.state.inputnumber,
                designation: this.state.designation,
                department: this.state.department,
                lead_reference_description: this.state.lead_reference_description,

                customer_id_encode: this.state.selectedCompany,
                customer_field_description: this.state.customer_field_description,
                contact_person_id_encode: this.state.contact_person_id_encode,
                comments: this.state.comments,
                priority: this.state.priority,
                subject: this.state.subject,
                description: this.state.description,
                start_dt: this.state.start_dt,
                end_dt: this.state.end_dt,
                status: "Active",
                documents: this.state.rows.length ? this.state.rows : [],
                // contactpersonDetails: this.state.contactPersornArray,
                contactpersonDetails: data,
            });
            fetch(CREATE_MARKETING_LEAD_WIDTH_DOCUMENTS, {
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
                        this.setState({ activeTab: 5 });

                        // this.setState({Leadid:data.data.id})
                        // this.CreateLeadDocument(data.data.id);

                        // this.props.history.goBack();
                    } else if (data.result === false) {
                        toast(data.message, {
                            type: "error",
                        });
                    } else {
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

    // CREATE LEAD API
    handleSubmit(event, values) {
        if (this.state.activeTab == 1) {
            this.StepOneSubmit(event, values);
        } else if (this.state.activeTab == 2) {
            this.StepTwoSubmit(event, values);
            this.getAllContacts();
        } else if (this.state.activeTab == 3) {
            this.StepThreeSubmit(event, values);
            // console.log(values, "=======>valuesStepThreeSubmit")
        } else if (this.state.activeTab == 4) {
            this.StepFourSubmit(event, values);
            // this.props.history.push('/parasmanierp/marketingleadlist');
            // this.getAllMarketinglists();
        } else if (this.state.activeTab == 5) {
            this.StepFiveSubmit(event, values);
            // this.props.history.push('/parasmanierp/marketingleadlist');
            this.getAllMarketinglists();
        } else {
            return;
        }
        return;
    }
    //  End------ All step pass value

    // Function to retrieve leadData from local storage
    getLeadDataFromLocalStorage() {
        const leadData = localStorage.getItem('leadData');
        if (leadData) {
            return JSON.parse(leadData);
        }
        return null;
    }

    // Function to retrieve leadData from local storage
    getDocumentDataFromLocalStorage() {
        const DocumetData = localStorage.getItem('DocumetData');
        if (DocumetData) {
            return JSON.parse(DocumetData);
        }
        return null;
    }

    //
    getActivityDataFromLocalStorage() {
        const valuesActivitydata = localStorage.getItem('valuesActivitydata');
        if (valuesActivitydata) {
            return JSON.parse(valuesActivitydata);
        }
        return null;
    }

    addRow = () => {
        this.setState((prevState) => ({
            rows: [...prevState.rows, {}], // Add a new empty row object to the array
        }));
    };

    deleteRow = (Index) => {
        if (Index >= 1) {
            this.setState((prevState) => ({
                rows: prevState.rows.filter((_, i) => i !== Index), // Remove the row at the specified index
            }));
        }
    };

    // DOCUMENT CREATE API
    async CreateLeadDocument(leadid) {
        var Token = localStorage.getItem("userToken");
        try {
            var raw = JSON.stringify({
                marketing_lead_id_encode: leadid,
                document_type: this.state.document_type,
                document_name: this.state.document_name,
                documents: this.state.rows,
                status: "Active",
            });
            fetch(CREATE_DOCUMENT_LEAD, {
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
                        this.setState({ activeTab: 5 });
                        // this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
                    } else if (data.result === false) {
                        toast(data.message, {
                            type: "error",
                        });
                    } else {
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
                console.error("Error reading file:", error);
            });
    };

    // ALL DROPDOWN FIELDS
    async SearchLeadById(id) {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_LEAD_REFERENCE_BY_ID + id, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
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
        } catch (error) { }
    }

    async SearchCompanyById(id) {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_CUSTOMER_BY_ID + id, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        if (data.data) {
                            // console.log(data.data, "====>data");
                            this.setState({
                                Companydescription: data.data,
                            });

                            this.setState({ CompanyId: data.data.id }, () => {
                                console.log("====>CompanyId:", this.state.CompanyId);
                            });
                        }
                    } else {
                    }
                });
            });
        } catch (error) { }
    }

    async SearchContactPersonById(id) {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_CONTACTPERSON_BY_ID + id, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        if (data.data) {
                            this.setState({
                                ContactPersonDescription: data.data,
                                ContactPersonDescriptionAddMore: data.data,
                                // ContactDesignation: data.data,
                            });
                        }
                    } else {
                    }
                });
            });
        } catch (error) { }
    }

    handleFileChange = (e, index) => {
        const { rows } = this.state;
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const base64Data = reader.result;
                // let base64Split = base64Data.split(",");
                rows[index].document_url_encode = base64Data;
                this.setState({ rows });
            };

            reader.onerror = (error) => {
                console.error("Error occurred while reading the file:", error);
            };
        }
    };

    // Callback function to handle file data
    handleFileDataChange = (file) => {
        this.setState({ fileData: file });
    };

    handleAadharBase64DataChange = (base64) => {
        this.setState({ isAadharBase64URL: base64 });
    };

    //imagePdfFileType Allow
    getFileAcceptValue(index) {
        const { rows } = this.state;
        const selectedFileType = rows[index].document_type;

        // Set the accept attribute based on the selected file type
        switch (selectedFileType) {
            case "image":
                return ".jpg, .jpeg, .png"; // Only images allowed
            case "pdf":
                return ".pdf"; // Only PDF files allowed
            case "document":
                return ".doc, .docx"; // Only DOC and DOCX files allowed
            case "spreadsheet":
                return ".xls, .xlsx"; // Only XLS and XLSX files allowed
            default:
                return ""; // Allow all file types if no specific type selected
        }
    }

    // Start---- Add more Contact feilds Model
    handleContactAddMore() {
        this.setState((prevState) => ({
            ContactAddMore_Model: !prevState.ContactAddMore_Model,
        }));
        // this.removeBodyCss();
    }

    handleCancelAddRowModel = () => {
        this.setState({ ContactAddMore_Model: false });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { selectedcontactpersonAddMore, ContactPersonDescriptionAddMore } =
            this.state;

        // Constructing the new row data
        const newRowData = {
            selectedcontactperson:
                ContactPersonDescriptionAddMore.first_name +
                " " +
                ContactPersonDescriptionAddMore.last_name,
            mobile_no_1: ContactPersonDescriptionAddMore.mobile_no_1,
            department_name: ContactPersonDescriptionAddMore.department_name,
            designation_name: ContactPersonDescriptionAddMore.designation_name,
            contact_person_id_encode: ContactPersonDescriptionAddMore.id,
        };

        // Update the array of data in the state
        this.setState(
            (prevState) => ({
                dataArray: [...(prevState.dataArray || []), newRowData],
                ContactAddMore_Model: false, // Closing the modal
                selectedcontactpersonAddMore: "", // Reset selected contact person
                ContactPersonDescriptionAddMore: {
                    // Reset ContactPersonDescriptionAddMore object
                    first_name: "",
                    last_name: "",
                    mobile_no_1: "",
                    department_name: "",
                    designation_name: "",
                    contact_person_id_encode: "",
                },
            }),
            () => {
                // this.handleAddMoreContactPerson();
                //localstorage in store of value
                localStorage.setItem("dataArray", JSON.stringify(this.state.dataArray));

                console.log("New Row Data:", this.state.dataArray);
            }
        );
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    };

    deleteAddMorwRow = (Index) => {
        this.setState((prevState) => {
            // Remove the row at the specified index
            const updatedDataArray = prevState.dataArray.filter(
                (_, i) => i !== Index
            );

            // Update localStorage
            localStorage.setItem("dataArray", JSON.stringify(updatedDataArray));

            return {
                dataArray: updatedDataArray,
            };
        });
    };

    handleChange = (e) => {
        this.setState({
            companyType: e.target.value,
        });
    };

    //
    handleStartDateChange(event) {
        // Handle start date change if needed
    }

    //Store value in one state
    //ADD COMPANY DAATA ONE Sttae
    // handleFormSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Form Submitted');
    //     const { selectedcontactpersonAddMore, customerlist, selectedCustomerTypes, selectedCopmany } = this.state;

    //     // Constructing the new row data
    //     const newRowData = {
    //         customer_type_id_encode: selectedCopmany,
    //     };
    //     console.log('New Row Data:', newRowData);

    //     // Update the array of data in the state
    //     this.setState(prevState => ({
    //         CompanyId: [...(prevState.CompanyId || []), newRowData],
    //         ContactAddMore_Model: false,  // Closing the modal
    //         selectedcontactpersonAddMore: "", // Reset selected contact person
    //         customerlist: { // Reset CompanyType object
    //             customer_type_id_encode: "",
    //         },
    //         selectedCustomerTypes: [], // Reset selectedCustomerTypes array
    //     }), () => {
    //         console.log('CompanyId:', this.state.CompanyId);
    //         console.log('selectedCustomerTypes:', this.state.selectedCustomerTypes);
    //     });
    // };

    render() {
        console.log("data---", this.state.contact_person_id_encode);
        const {
            isAadharBase64URL,
            fileData,
            formData,
            contactpersonlistAddMore,
            selectedcontactpersonAddMore,
            dataArray,
            FindContactDesignation,
            customerlist,
            Companydescription,
            FindContactDepartment,
            ContactPersonSearch,
            companyType,
            Leadreferencelist,
            selectedCopmany,
        } = this.state;
         console.log(customerlist, "=====>customerlist");
        // console.log(ContactPersonSearch, "=======>ContactPersonSearch")
        // console.log(selectedcontactpersonAddMore, "=====>selectedcontactpersonAddMore");
        // const { isView } = this.props;
        // Retrieve data from localStorage
        const permissionsString = localStorage.getItem("permissionarray");

        // Parse the JSON string into a JavaScript object
        const permissions = JSON.parse(permissionsString);
        // console.log(permissions, "=====>permissions")
        // this is use for all active permission
        const filteredPermissions = permissions.filter(
            (permission) => permission.status === "Active"
        );
        const customerActive = filteredPermissions?.find(
            (permission) => permission.name === "Add Customers Master"
        );
        const leadRafActive = filteredPermissions?.find(
            (permission) => permission.name === "Add Reference Master"
        );
        const contactActive = filteredPermissions?.find(
            (permission) => permission.name === "Add Contact_person Master"
        );

        // this is use for who has permission Active and show only Add
        // const filteredPermissions = permissions.filter(permission =>
        //     permission.status === 'Active' && permission.name.includes('Add')
        //   );
        // this is use for who has permission Active and show only three name
        // const filteredPermissions = permissions.filter(permission =>
        //     permission.status === 'Active' &&
        //     (permission.name.includes('Add Customers Master') ||
        //      permission.name.includes('Add Reference Master') ||
        //      permission.name.includes('Add Contact_person Master'))
        //   );

        // console.log('pr---', customerActive, leadRafActive, contactActive)

        //Get locastorage of data
        // Retrieve the JSON string from localStorage
        var dataArrayString = localStorage.getItem("dataArray");

        // Parse the JSON string into a JavaScript object
        var dataArraygetContactData = JSON.parse(dataArrayString);

        // Now, 'dataArray' contains the array of data retrieved from localStorage
        // console.log(dataArraygetContactData, "localstorage of Value dataArrayData");
        console.log("test===>1234", this.state.contectPersonArray);

        //get value 
        // Example usage localstorage
        const leadData = this.getLeadDataFromLocalStorage();
        console.log(leadData);

        const DocumetData = this.getDocumentDataFromLocalStorage();
        // console.log(DocumetData, "====>DocumetData");

        // Accessing the document_name property from the first object in the array
        // const documentName = DocumetData.length > 0 ? DocumetData[0]?.document_name : "No date found";
        // console.log(documentName);

        const valuesActivitydata = this.getActivityDataFromLocalStorage();
        // console.log(valuesActivitydata, "====>valuesActivitydata");


        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb
                            title="Add Market Lead"
                            breadcrumbItems={this.state.breadcrumbItems}
                        />
                        {/* <AvForm
                            className="needs-validation"
                            onValidSubmit={this.handleSubmit}
                        // onSubmit={this.submitStep1}
                        > */}
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    {/* <h4 className="card-title mb-4">Lead Details</h4> */}

                                    <div id="basic-pills-wizard" className="twitter-bs-wizard">
                                        <AvForm
                                            className="needs-validation"
                                            onValidSubmit={this.handleSubmit}
                                        // onSubmit={this.submitStep1}
                                        >
                                            <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({
                                                            active: this.state.activeTab === 1,
                                                        })}
                                                    // onClick={() => { this.toggleTab(1); }}
                                                    >
                                                        <span className="step-number">01</span>
                                                        <span className="step-title">Lead Details</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({
                                                            active: this.state.activeTab === 2,
                                                        })}
                                                    // onClick={() => { this.toggleTab(2); }}
                                                    >
                                                        <span className="step-number">02</span>
                                                        <span className="step-title">Company Details</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({
                                                            active: this.state.activeTab === 3,
                                                        })}
                                                    // onClick={() => { this.toggleTab(4); }}
                                                    >
                                                        <span className="step-number">03</span>
                                                        <span className="step-title">Attach File</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({
                                                            active: this.state.activeTab === 4,
                                                        })}
                                                    // onClick={() => { this.toggleTab(3); }}
                                                    >
                                                        <span className="step-number">04</span>
                                                        <span className="step-title">Activity Details</span>
                                                    </NavLink>
                                                </NavItem>

                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({
                                                            active: this.state.activeTab === 5,
                                                        })}
                                                    //    onClick={() => { this.toggleTab(5); }}
                                                    >
                                                        <span className="step-number">05</span>
                                                        <span className="step-title">Lead Overview</span>
                                                    </NavLink>
                                                </NavItem>
                                            </ul>
                                        </AvForm>

                                        <TabContent
                                            activeTab={this.state.activeTab}
                                            className="twitter-bs-wizard-tab-content"
                                        >
                                            <TabPane tabId={1}>
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handleSubmit}
                                                // onSubmit={this.submitStep1}
                                                >
                                                    <Row className="mt-2">
                                                        <Col lg="3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                                style={{ fontSize: "14px" }}
                                                            >
                                                                Topic
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="leadtopic"
                                                                placeholder="Topic"
                                                                type="text"
                                                                errorMessage="Please Provide Topic"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom01"
                                                            />
                                                        </Col>

                                                        <Col lg="3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                                style={{ fontSize: "14px" }}
                                                            >
                                                                Nature
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="leadnature"
                                                                placeholder="Nature"
                                                                type="select"
                                                                errorMessage="Please Provide Nature"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom01"
                                                            >
                                                                <option value={""}>Select Nature</option>
                                                                <option value={"Lead Nature 1"}>
                                                                    Lead Nature 1
                                                                </option>
                                                                <option value={"Lead Nature 2"}>
                                                                    Lead Nature 2
                                                                </option>
                                                            </AvField>
                                                        </Col>
                                                        <Col lg="3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                                style={{ fontSize: "14px" }}
                                                            >
                                                                Type
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="leadtype"
                                                                placeholder="Lead Type"
                                                                type="select"
                                                                errorMessage="Please Provide Type"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom01"
                                                            >
                                                                <option value={""}>Select Type</option>
                                                                <option value={"Active"}>Active</option>
                                                                <option value={"In Active"}>In Active</option>
                                                                <option value={"Junk"}>Junk</option>
                                                            </AvField>
                                                        </Col>
                                                        <Col lg="3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                                style={{ fontSize: "14px" }}
                                                            >
                                                                Status
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="leadstatus"
                                                                placeholder="Status"
                                                                type="select"
                                                                errorMessage="Please Provide Status"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom01"
                                                            >
                                                                <option value={""}>Select Satus</option>
                                                                <option value={"Warm"}>Warm</option>
                                                                <option value={"Cold"}>Cold</option>
                                                                <option value={"Contact In Future"}>
                                                                    Contact In Future
                                                                </option>
                                                                <option value={"Duplicate Lead"}>
                                                                    Duplicate Lead
                                                                </option>
                                                                <option value={"Multiple Time Call Attempted"}>
                                                                    Multiple Time Call Attempted
                                                                </option>
                                                            </AvField>
                                                        </Col>
                                                        <Col lg="3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                                style={{ fontSize: "14px" }}
                                                            >
                                                                Priority{" "}
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="priority"
                                                                placeholder="Priority"
                                                                type="select"
                                                                errorMessage="Please Provide Priority"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom01"
                                                                value="Medium" // Set the value to "Medium" for auto-selection
                                                            >
                                                                <option value={""}>Select Priority</option>
                                                                <option value={"Low"}>Low</option>
                                                                <option value={"Medium"}>Medium</option>
                                                                <option value={"High"}>High</option>
                                                            </AvField>
                                                        </Col>
                                                        <Col lg="3" className="d-inline">
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                }}
                                                            >
                                                                <Label
                                                                    className="form-label"
                                                                    htmlFor="validationCustom04"
                                                                    style={{ fontSize: "14px" }}
                                                                >
                                                                    Reference Type
                                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                                </Label>
                                                                {leadRafActive?.status == "Active" && (
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor="validationCustom04"
                                                                        style={{ color: "blue" }}
                                                                        onClick={() =>
                                                                            this.setState({
                                                                                leadRefShow: true,
                                                                            })
                                                                        }
                                                                    >
                                                                        Add Lead Reference
                                                                    </Label>
                                                                )}
                                                            </div>
                                                            <AvField
                                                                required={true}
                                                                name="selectedleadreference"
                                                                type="select"
                                                                id="validationCustom04"
                                                                errorMessage="Please Select a Reference Type."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={(e) => {
                                                                    const selectedValue = e.target.value;
                                                                    const selectedItem = this.state.Leadreferencelist.find(item => item.id === selectedValue);
                                                                    this.setState({
                                                                        selectedlead: {
                                                                            id: selectedValue,
                                                                            name: selectedItem ? selectedItem.name : ''
                                                                        },
                                                                    });
                                                                    if (selectedValue !== "") {
                                                                        this.SearchLeadById(selectedValue);
                                                                    }
                                                                }}
                                                            >
                                                                <option value="">Select Reference Type</option>
                                                                {this.state.Leadreferencelist.map((item) => (
                                                                    <option key={item.id} value={item.id}>
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                            </AvField>

                                                        </Col>

                                                        {this.state.selectedlead !== "" && (
                                                            <>
                                                                {/* Start---Offline  */}
                                                                {this.state.selectedlead ===
                                                                    "76qxErGXQ2yXP3lV" ? (
                                                                    <Row>
                                                                        <Col lg={{ size: 3 }}>
                                                                            <Label
                                                                                className="form-label"
                                                                                htmlFor="validationCustom01"
                                                                                style={{ fontSize: "14px" }}
                                                                            >
                                                                                Reference Name
                                                                                <span style={{ color: "#ff0000" }}>
                                                                                    *
                                                                                </span>
                                                                            </Label>
                                                                            <AvField
                                                                                // value={this.state.LeadDescription}
                                                                                // disabled
                                                                                type="text"
                                                                                name="referencepersondetails01"
                                                                                placeholder="Reference Person Name"
                                                                                errorMessage="Please Provide Reference Person Name"
                                                                                className="form-control"
                                                                                validate={{ required: { value: true } }}
                                                                                id="validationCustom01"
                                                                            />
                                                                        </Col>
                                                                        <Col lg="3">
                                                                            <div className="mb-3">
                                                                                <Label
                                                                                    className="form-label"
                                                                                    htmlFor="validationCustom007"
                                                                                    style={{ fontSize: "14px" }}
                                                                                >
                                                                                    Phone No.
                                                                                    <span style={{ color: "#ff0000" }}>
                                                                                        *
                                                                                    </span>
                                                                                </Label>

                                                                                <PhoneInput
                                                                                    placeholder=""
                                                                                    country={"in"}
                                                                                    enableSearch={true}
                                                                                    errorMessage=" Please provide a Number"
                                                                                    id="validationCustom007"
                                                                                    validate={{
                                                                                        required: {
                                                                                            value: true,
                                                                                        },
                                                                                    }}
                                                                                    inputStyle={{ width: "100%" }}
                                                                                    style={{
                                                                                        borderRadius: 50,
                                                                                    }}
                                                                                    inputProps={{
                                                                                        name: "mobile",
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
                                                                                style={{ fontSize: "14px" }}
                                                                            >
                                                                                Designation
                                                                                {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                                            </Label>
                                                                            <AvField
                                                                                name="designation"
                                                                                placeholder="Designation"
                                                                                type="text"
                                                                                // errorMessage="Please Provide designation"
                                                                                className="form-control"
                                                                                // validate={{ required: { value: true } }}
                                                                                id="validationCustom01"
                                                                            />
                                                                        </Col>
                                                                        <Col lg="3">
                                                                            <Label
                                                                                className="form-label"
                                                                                htmlFor="validationCustom01"
                                                                                style={{ fontSize: "14px" }}
                                                                            >
                                                                                Department
                                                                                {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                                            </Label>
                                                                            <AvField
                                                                                name="department"
                                                                                placeholder="Department"
                                                                                type="text"
                                                                                // errorMessage="Please Provide designation"
                                                                                className="form-control"
                                                                                // validate={{ required: { value: true } }}
                                                                                id="validationCustom01"
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                ) : this.state.selectedlead ===
                                                                    "OaPvk1z45GN6Yd3M" ? (
                                                                    <>
                                                                        <Col lg={{ size: 3 }}>
                                                                            <Label
                                                                                className="form-label"
                                                                                htmlFor="validationCustom01"
                                                                                style={{ fontSize: "14px" }}
                                                                            >
                                                                                Reference Name
                                                                                <span style={{ color: "#ff0000" }}>
                                                                                    *
                                                                                </span>
                                                                            </Label>
                                                                            <AvField
                                                                                // value={this.state.LeadDescription}
                                                                                // disabled
                                                                                type="text"
                                                                                name="referencePersonName"
                                                                                placeholder="Reference Person Name"
                                                                                errorMessage="Please Provide Reference Person Name"
                                                                                className="form-control"
                                                                                validate={{ required: { value: true } }}
                                                                                id="validationCustom01"
                                                                            />
                                                                        </Col>
                                                                        <Col lg="3">
                                                                            <div className="mb-3">
                                                                                <Label
                                                                                    className="form-label"
                                                                                    htmlFor="validationCustom007"
                                                                                    style={{ fontSize: "14px" }}
                                                                                >
                                                                                    Reference Phone No
                                                                                    <span style={{ color: "#ff0000" }}>
                                                                                        *
                                                                                    </span>
                                                                                </Label>

                                                                                <PhoneInput
                                                                                    placeholder=""
                                                                                    country={"in"}
                                                                                    enableSearch={true}
                                                                                    errorMessage=" Please provide a Number"
                                                                                    id="validationCustom007"
                                                                                    validate={{
                                                                                        required: {
                                                                                            value: true,
                                                                                        },
                                                                                    }}
                                                                                    inputStyle={{ width: "100%" }}
                                                                                    style={{
                                                                                        borderRadius: 50,
                                                                                    }}
                                                                                    inputProps={{
                                                                                        name: "mobile",
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
                                                                        <Col lg="12">
                                                                            <Label
                                                                                className="form-label"
                                                                                htmlFor="validationCustom01"
                                                                                style={{ fontSize: "14px" }}
                                                                            >
                                                                                Reference Description
                                                                            </Label>
                                                                            <AvField
                                                                                name="referenceDescription"
                                                                                placeholder="Lead Reference Description"
                                                                                type="textarea"
                                                                                className="form-control"
                                                                            />
                                                                        </Col>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Col lg="6">
                                                                            <Label
                                                                                className="form-label"
                                                                                htmlFor="validationCustom01"
                                                                                style={{ fontSize: "14px" }}
                                                                            >
                                                                                Reference Description
                                                                            </Label>
                                                                            <AvField
                                                                                name="referenceDescription01"
                                                                                placeholder="Lead Reference Description"
                                                                                type="textarea"
                                                                                className="form-control"
                                                                            />
                                                                        </Col>
                                                                    </>
                                                                )}
                                                                {/* End---Offline  */}
                                                            </>
                                                        )}
                                                    </Row>

                                                    <Col lg="12">
                                                        <Label
                                                            className="form-label"
                                                            style={{ fontSize: "14px" }}
                                                        // htmlFor="validationCustom01"
                                                        >
                                                            Comment
                                                            {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                        </Label>
                                                        <AvField
                                                            name="comment"
                                                            placeholder="Comment"
                                                            type="textarea"
                                                            // errorMessage="Please Provide Comment"
                                                            className="form-control"
                                                        // validate={{ required: { value: true } }}
                                                        // id="validationCustom01"
                                                        />
                                                    </Col>

                                                    <div className="d-flex justify-content-between mt-5">
                                                        <Button
                                                            color="primary"
                                                            className={
                                                                this.state.activeTab === 1
                                                                    ? "previous disabled"
                                                                    : "previous"
                                                            }
                                                        >
                                                            Previous
                                                        </Button>
                                                        <Button
                                                            color="primary"
                                                            type="submit"
                                                            style={{ float: "right" }}
                                                        >
                                                            Next
                                                        </Button>
                                                    </div>
                                                </AvForm>
                                            </TabPane>
                                            <TabPane tabId={2}>
                                                <div>
                                                    <AvForm
                                                        className="needs-validation"
                                                        onValidSubmit={this.handleSubmit}
                                                    // onSubmit={this.submitStep1}
                                                    >
                                                        {/* Start-----radio button  */}
                                                        <Row>
                                                            <Col lg={12}>
                                                                <Row>
                                                                    <div className="company_radio_btn">
                                                                        <div className="form-check d-inline mx-2">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="radio"
                                                                                name="companyType"
                                                                                id="existingCompany"
                                                                                value="existing"
                                                                                checked={companyType === "existing"}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <label
                                                                                className="form-check-label"
                                                                                htmlFor="existingCompany"
                                                                            >
                                                                                Existing Company
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check d-inline">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="radio"
                                                                                name="companyType"
                                                                                id="newCompany"
                                                                                value="new"
                                                                                checked={companyType === "new"}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <label
                                                                                className="form-check-label"
                                                                                htmlFor="newCompany"
                                                                            >
                                                                                New Company
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </Row>
                                                                <hr />

                                                                {/* Conditional rendering based on companyType */}

                                                                {/* old button  */}
                                                                {companyType === "existing" && (
                                                                    <>
                                                                        {/* Start Contact person  */}
                                                                        <Card className="p-4 mt-2">
                                                                            {/* <h4>Contact Person Details</h4>
                                                                            <hr /> */}
                                                                            <AvForm
                                                                                className="needs-validation"
                                                                                onValidSubmit={this.handleFormSubmit}
                                                                            >
                                                                                <Row>
                                                                                    <Col lg="4" className="d-inline">
                                                                                        <div
                                                                                            style={{
                                                                                                display: "flex",
                                                                                                justifyContent: "space-between",
                                                                                            }}
                                                                                        >
                                                                                            <Label
                                                                                                className="form-label"
                                                                                                htmlFor="validationCustom04"
                                                                                                style={{ fontSize: "14px" }}
                                                                                            >
                                                                                                Select Company Name
                                                                                                <span
                                                                                                    style={{ color: "#ff0000" }}
                                                                                                >
                                                                                                    *
                                                                                                </span>
                                                                                            </Label>
                                                                                        </div>
                                                                                        <AvField
                                                                                            required={true}
                                                                                            name="customerid"
                                                                                            type="select"
                                                                                            id="validationCustom04"
                                                                                            errorMessage="Please Select a Company Name."
                                                                                            validate={{
                                                                                                required: { value: true },
                                                                                            }}
                                                                                            className="form-control"
                                                                                            value={this.state.selectedCompany}
                                                                                            onChange={(e) => {
                                                                                                const selectedCompany =
                                                                                                    e.target.value; // Retrieve selected company ID
                                                                                                console.log(
                                                                                                    "Selected Company ID:",
                                                                                                    selectedCompany
                                                                                                );
                                                                                                this.setState(
                                                                                                    {
                                                                                                        selectedCompany:
                                                                                                            selectedCompany,
                                                                                                    },
                                                                                                    () => {
                                                                                                        this.FindAllContactsDepartment(
                                                                                                            selectedCompany
                                                                                                        ); // Call FindAllContactsDepartment with the selected company ID
                                                                                                        this.FindAllContactsDesination(
                                                                                                            selectedCompany
                                                                                                        );
                                                                                                        this.getAllContactsPersonSearch();
                                                                                                    }
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <option value={""}>
                                                                                                Select Company Name
                                                                                            </option>
                                                                                            {Object.keys(
                                                                                                this.state.customerlist
                                                                                            ).map((key) => (
                                                                                                <option
                                                                                                    key={key}
                                                                                                    value={
                                                                                                        this.state.customerlist[key]
                                                                                                            .id
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        this.state.customerlist[key]
                                                                                                            .company_name
                                                                                                    }
                                                                                                </option>
                                                                                            ))}
                                                                                        </AvField>
                                                                                    </Col>

                                                                                    <Col lg="4" className="d-inline">
                                                                                        <div
                                                                                            style={{
                                                                                                display: "flex",
                                                                                                justifyContent: "space-between",
                                                                                            }}
                                                                                        >
                                                                                            <Label
                                                                                                className="form-label"
                                                                                                // htmlFor="validationCustom04"
                                                                                                style={{ fontSize: "14px" }}
                                                                                            >
                                                                                                Department
                                                                                                {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                                                            </Label>
                                                                                        </div>
                                                                                        <AvField
                                                                                            // required={true}
                                                                                            name="selectedcontactpersonAddMore"
                                                                                            type="select"
                                                                                            id="validationCustom04"
                                                                                            // value={this.state.selectedleadreference}
                                                                                            // errorMessage="Please Select a Contact Person."
                                                                                            // validate={{ required: { value: true } }}
                                                                                            value={
                                                                                                this.state.selectedDepartment
                                                                                            }
                                                                                            className="form-control"
                                                                                            onChange={(e) => {
                                                                                                const selectedDepartment =
                                                                                                    e.target.value; // Retrieve selected company ID
                                                                                                console.log(
                                                                                                    "Selected Department ID:",
                                                                                                    selectedDepartment
                                                                                                );
                                                                                                this.setState(
                                                                                                    {
                                                                                                        selectedDepartment:
                                                                                                            selectedDepartment,
                                                                                                    },
                                                                                                    () => {
                                                                                                        this.getAllContactsPersonSearch();
                                                                                                    }
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <option value={""}>
                                                                                                Select Department
                                                                                            </option>
                                                                                            {/* <option value={""} >Other</option> */}
                                                                                            {Object.keys(
                                                                                                this.state.FindContactDepartment
                                                                                            ).map((key) => (
                                                                                                <option
                                                                                                    key={key}
                                                                                                    value={
                                                                                                        this.state
                                                                                                            .FindContactDepartment[
                                                                                                            key
                                                                                                        ].id
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        this.state
                                                                                                            .FindContactDepartment[
                                                                                                            key
                                                                                                        ].department_name
                                                                                                    }
                                                                                                </option>
                                                                                            ))}
                                                                                        </AvField>
                                                                                    </Col>
                                                                                    <Col lg="4" className="d-inline">
                                                                                        <div
                                                                                            style={{
                                                                                                display: "flex",
                                                                                                justifyContent: "space-between",
                                                                                            }}
                                                                                        >
                                                                                            <Label
                                                                                                className="form-label"
                                                                                                // htmlFor="validationCustom04"
                                                                                                style={{ fontSize: "14px" }}
                                                                                            >
                                                                                                Designation
                                                                                                {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                                                            </Label>
                                                                                        </div>
                                                                                        <AvField
                                                                                            // required={true}
                                                                                            name="selectedcontactpersonAddMore"
                                                                                            type="select"
                                                                                            // id="validationCustom04"
                                                                                            // value={this.state.selectedleadreference}
                                                                                            // errorMessage="Please Select a Contact Person."
                                                                                            // validate={{ required: { value: true } }}
                                                                                            className="form-control"
                                                                                            onChange={(e) => {
                                                                                                const selectedDesination =
                                                                                                    e.target.value; // Retrieve selected company ID
                                                                                                console.log(
                                                                                                    "Selected Designation ID:",
                                                                                                    selectedDesination
                                                                                                );
                                                                                                this.setState(
                                                                                                    {
                                                                                                        selectedDesination:
                                                                                                            selectedDesination,
                                                                                                    },
                                                                                                    () => {
                                                                                                        this.getAllContactsPersonSearch();
                                                                                                    }
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <option value={""}>
                                                                                                Select Designation
                                                                                            </option>
                                                                                            {/* <option value={""} >Other</option> */}
                                                                                            {Object.keys(
                                                                                                this.state
                                                                                                    .FindContactDesignation
                                                                                            ).map((key) => (
                                                                                                <option
                                                                                                    key={key}
                                                                                                    value={
                                                                                                        this.state
                                                                                                            .FindContactDesignation[
                                                                                                            key
                                                                                                        ].id
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        this.state
                                                                                                            .FindContactDesignation[
                                                                                                            key
                                                                                                        ].designation_name
                                                                                                    }
                                                                                                </option>
                                                                                            ))}
                                                                                        </AvField>
                                                                                    </Col>
                                                                                </Row>
                                                                            </AvForm>
                                                                        </Card>
                                                                        {/* End--- Contact person  */}

                                                                        {/* Start--- Company Tables */}
                                                                        <h4> Select Contact Person </h4>
                                                                        <hr />
                                                                        <Table className="mb-3 table-nowrap">
                                                                            <thead className="bg-light">
                                                                                <tr>
                                                                                    <th style={{ width: "50px" }}>
                                                                                        <div className="form-check">
                                                                                            <Input
                                                                                                type="checkbox"
                                                                                                className="form-check-input"
                                                                                                id="customControlInline"
                                                                                            />
                                                                                        </div>
                                                                                    </th>
                                                                                    <th>Name</th>
                                                                                    <th>Department</th>
                                                                                    <th>Designation</th>
                                                                                </tr>
                                                                            </thead>

                                                                            <tbody>
                                                                                {this.state.isLoading ? (
                                                                                    <tr>
                                                                                        <td
                                                                                            colSpan="4"
                                                                                            style={{ textAlign: "center" }}
                                                                                        >
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
                                                                                        </td>
                                                                                    </tr>
                                                                                ) : (
                                                                                    <>
                                                                                        {ContactPersonSearch.length ===
                                                                                            0 ? (
                                                                                            <tr>
                                                                                                <td
                                                                                                    colSpan="4"
                                                                                                    style={{
                                                                                                        textAlign: "center",
                                                                                                    }}
                                                                                                >
                                                                                                    <p>No data found</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        ) : (
                                                                                            <>
                                                                                                {this.state.ContactPersonSearch.map(
                                                                                                    (item, index) => (
                                                                                                        <tr key={index}>
                                                                                                            <td>
                                                                                                                <div className="form-check">
                                                                                                                    <Input
                                                                                                                        type="checkbox"
                                                                                                                        className="form-check-input"
                                                                                                                        id={`customControlInline_${index}`}
                                                                                                                        onChange={(e) => {
                                                                                                                            console.log(
                                                                                                                                "e.taget--",
                                                                                                                                item
                                                                                                                            );
                                                                                                                            //   this.setState({
                                                                                                                            //     contactPersornArrayData:
                                                                                                                            //       item.id,
                                                                                                                            //   });
                                                                                                                            this.setState(
                                                                                                                                (
                                                                                                                                    prevState
                                                                                                                                ) => ({
                                                                                                                                    contact_person_id_encode_new:
                                                                                                                                        [
                                                                                                                                            ...prevState.contact_person_id_encode_new,
                                                                                                                                            {
                                                                                                                                                contact_person_id_encode_new:
                                                                                                                                                    item.id,
                                                                                                                                            },
                                                                                                                                        ],
                                                                                                                                })
                                                                                                                            );
                                                                                                                        }}
                                                                                                                    />
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <p>
                                                                                                                    {item.customer_name}
                                                                                                                </p>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <p>
                                                                                                                    {item.department_name}
                                                                                                                </p>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <p>
                                                                                                                    {
                                                                                                                        item.designation_name
                                                                                                                    }
                                                                                                                </p>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    )
                                                                                                )}
                                                                                            </>
                                                                                        )}
                                                                                    </>
                                                                                )}
                                                                            </tbody>
                                                                        </Table>

                                                                        {/* End---- Company Tables */}
                                                                    </>
                                                                )}

                                                                {/* start New button  */}
                                                                {companyType === "new" && (
                                                                    <>
                                                                        <Row className="company-new company_radio_btn">
                                                                            <div
                                                                                className="create_customer_new"
                                                                                style={{ marginTop: "20px" }}
                                                                            >
                                                                                <CreateCustomerModal />
                                                                            </div>
                                                                        </Row>
                                                                    </>
                                                                )}
                                                                {/* </div> */}
                                                            </Col>
                                                        </Row>
                                                        {/* end-----radio button  */}
                                                        <div className="d-flex justify-content-between mt-3">
                                                            <Button
                                                                color="primary"
                                                                className={
                                                                    this.state.activeTab === 1
                                                                        ? "previous disabled"
                                                                        : "previous"
                                                                }
                                                                onClick={() => {
                                                                    this.toggleTab(1);
                                                                }}
                                                            >
                                                                {" "}
                                                                Previous
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                type="submit"
                                                                style={{ float: "right" }}
                                                            >
                                                                Next
                                                            </Button>
                                                        </div>
                                                    </AvForm>
                                                </div>
                                            </TabPane>
                                            <TabPane tabId={3}>
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handleSubmit}
                                                >
                                                    <Row>
                                                        <div className="table-responsive">
                                                            <Table className="mb-3 table-nowrap">
                                                                <thead className="bg-light">
                                                                    <tr>
                                                                        <th>File Name</th>
                                                                        {/* <th>File Type  <span style={{ color: "#ff0000" }}>*</span></th> */}
                                                                        <th>File </th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.rows.map((item, index) => (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                <AvField
                                                                                    name={`FileName-${index}`}
                                                                                    placeholder="File Name"
                                                                                    type="text"
                                                                                    // errorMessage="Please Provide File Name"
                                                                                    className="form-control"
                                                                                    onChange={(e) => {
                                                                                        const { rows } = this.state;
                                                                                        rows[index].document_name =
                                                                                            e.target.value;
                                                                                        this.setState({ rows });
                                                                                    }}
                                                                                // validate={{ required: { value: true } }}
                                                                                />
                                                                            </td>
                                                                            {/* <td>
                                                                                <AvField
                                                                                    name={`document_type-${index}`}
                                                                                    placeholder="File Type"
                                                                                    type="select"
                                                                                    errorMessage="Please Provide File Type"
                                                                                    className="form-control"
                                                                                    onChange={(e) => {
                                                                                        const { rows } = this.state;
                                                                                        rows[index].document_type = e.target.value;
                                                                                        this.setState({ rows });
                                                                                    }}
                                                                                    validate={{ required: { value: true } }}
                                                                                >
                                                                                    <option value={""}>Select Document Type</option>
                                                                                    <option value={"image"}>Image</option>
                                                                                    <option value={"pdf"}>PDF</option>
                                                                                </AvField>
                                                                            </td> */}
                                                                            <td>
                                                                                <h6>
                                                                                    <input
                                                                                        name={`document_type-${index}`}
                                                                                        type="file"
                                                                                        accept={this.getFileAcceptValue(
                                                                                            index
                                                                                        )}
                                                                                        onChange={(e) => {
                                                                                            const { rows } = this.state;
                                                                                            rows[index].document_type =
                                                                                                e.target.value;
                                                                                            this.setState({ rows });
                                                                                            this.handleFileChange(e, index); // Call handleFileChange here
                                                                                        }}
                                                                                    // onChange={(e) => this.handleFileChange(e, index)}
                                                                                    />
                                                                                    <p className="allow_text_image">
                                                                                        (Allowed file types: pdf, jpg, jpeg,
                                                                                        png, docs, docx, xls, xlsx)
                                                                                    </p>
                                                                                </h6>
                                                                            </td>
                                                                            <td>
                                                                                <Button
                                                                                    color="primary"
                                                                                    onClick={this.addRow}
                                                                                >
                                                                                    Add Row
                                                                                </Button>
                                                                                {index === 0 ? null : (
                                                                                    <Button
                                                                                        onClick={() =>
                                                                                            this.deleteRow(index)
                                                                                        }
                                                                                        style={{
                                                                                            backgroundColor: "white",
                                                                                            border: "none",
                                                                                            marginLeft: "5px",
                                                                                        }}
                                                                                    >
                                                                                        <RiDeleteBin6Line
                                                                                            style={{ color: "red" }}
                                                                                        />
                                                                                    </Button>
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </Row>
                                                    <div className="d-flex justify-content-between mt-3">
                                                        <Button
                                                            color="primary"
                                                            className={
                                                                this.state.activeTab === 1
                                                                    ? "previous disabled"
                                                                    : "previous"
                                                            }
                                                            onClick={() => {
                                                                this.toggleTab(2);
                                                            }}
                                                        >
                                                            Previous
                                                        </Button>
                                                        <Button
                                                            color="primary"
                                                            type="submit"
                                                            style={{ float: "right" }}
                                                        >
                                                            Next
                                                        </Button>
                                                    </div>
                                                </AvForm>
                                            </TabPane>
                                            <TabPane tabId={4}>
                                                <div>
                                                    <AvForm
                                                        className="needs-validation"
                                                        onValidSubmit={this.handleSubmit}
                                                    // onSubmit={this.submitStep1}
                                                    >
                                                        <Row>
                                                            <Col md="4" className="d-inline">
                                                                <Label
                                                                    className="form-label"
                                                                    htmlFor="validationCustom04"
                                                                    style={{ fontSize: "14px" }}
                                                                >
                                                                    Subject
                                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                                </Label>
                                                                <AvField
                                                                    required={true}
                                                                    name="subject"
                                                                    type="text"
                                                                    id="validationCustom04"
                                                                    errorMessage="Please Enter a subject."
                                                                    validate={{ required: { value: true } }}
                                                                    className="form-control"
                                                                ></AvField>
                                                            </Col>
                                                            <Col md="4" className="d-inline">
                                                                <Label
                                                                    className="form-label"
                                                                    htmlFor="validationCustom04"
                                                                    style={{ fontSize: "14px" }}
                                                                >
                                                                    Description
                                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                                </Label>
                                                                <AvField
                                                                    required={true}
                                                                    name="description"
                                                                    type="text"
                                                                    id="validationCustom04"
                                                                    // value={this.state.selectedcountry}
                                                                    errorMessage="Please Enter Description."
                                                                    validate={{ required: { value: true } }}
                                                                    className="form-control"
                                                                ></AvField>
                                                            </Col>
                                                            <Col md="4" className="d-inline">
                                                                <Label
                                                                    className="form-label"
                                                                    htmlFor="validationCustom04"
                                                                    style={{ fontSize: "14px" }}
                                                                >
                                                                    Date
                                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                                </Label>
                                                                <AvField
                                                                    required={true}
                                                                    name="startdate"
                                                                    type="date"
                                                                    id="validationCustom04"
                                                                    value={this.state.selectedDate} // Set current date as the value
                                                                    errorMessage="Please select a date."
                                                                    validate={{ required: { value: true } }}
                                                                    className="form-control"
                                                                    onChange={this.handleStartDateChange}
                                                                ></AvField>
                                                            </Col>
                                                            {/* <Col md="4" className="d-inline">
                                                                <Label
                                                                    className="form-label"
                                                                    htmlFor="validationCustom04"
                                                                    style={{ fontSize: "14px" }}
                                                                >
                                                                    End Date
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
                                                            </Col> */}
                                                        </Row>
                                                        <div className="d-flex justify-content-between mt-3">
                                                            <Button
                                                                color="primary"
                                                                className={
                                                                    this.state.activeTab === 1
                                                                        ? "previous disabled"
                                                                        : "previous"
                                                                }
                                                                onClick={() => {
                                                                    this.toggleTab(3);
                                                                }}
                                                            >
                                                                Previous
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                type="submit"
                                                                style={{ float: "right" }}
                                                            >
                                                                Next
                                                            </Button>
                                                        </div>
                                                    </AvForm>
                                                </div>

                                                {/* <div className="row justify-content-center">
                                                    <Col lg="6">
                                                        <div className="text-center">
                                                            <div className="mb-4">
                                                                <i className="mdi mdi-check-circle-outline text-success display-4"></i>
                                                            </div>
                                                            <div>
                                                                <h5>Market Lead Created Successfully !</h5>
                                                               
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </div> */}
                                            </TabPane>
                                            <TabPane tabId={5}>
                                                <div>
                                                    {/* <Row style={{ float: "right" }}>
                                                        <Button color="primary" onClick={this.handleContactAddMore}>Add More Contact person </Button>
                                                    </Row> */}

                                                    <AvForm
                                                        className="needs-validation"
                                                        onValidSubmit={this.handleSubmit}
                                                    // onSubmit={this.submitStep1}
                                                    >
                                                        {/*Add----- listing of Array more data */}
                                                        <Row>
                                                            {/* start Basic Lead Details */}
                                                            <Col lg="12">
                                                                <Card
                                                                    style={{
                                                                        boxShadow:
                                                                            "5px 5px 10px 5px rgba(0, 0, 0, 0.1)",
                                                                    }}
                                                                >
                                                                    <CardHeader>
                                                                        <h5
                                                                            className="p-1 lead_overview"
                                                                            style={{ fontSize: "16px" }}
                                                                        >
                                                                            Lead Details
                                                                        </h5>
                                                                    </CardHeader>
                                                                    <CardBody>
                                                                        <Row>
                                                                            {/* <h6 className="mt-2 p-2 border-top border-bottom" style={{ fontSize: "14px" }}>
                                                                                        <b>Lead Details </b>
                                                                                    </h6> */}
                                                                            <Col>
                                                                                <div className="p-2">
                                                                                    <b>Topic:</b>
                                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}>
                                                                                        {this.getLeadDataFromLocalStorage()?.lead_topic || "No data found"}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="p-2">
                                                                                    <b>Nature:</b>
                                                                                    <span
                                                                                        style={{
                                                                                            fontSize: "14px",
                                                                                            marginLeft: "6px",
                                                                                            color: "#676363",
                                                                                        }}
                                                                                    >
                                                                                        {this.getLeadDataFromLocalStorage()?.nature_of_lead || "No data found"}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="p-2">
                                                                                    <b>Type:</b>
                                                                                    <span
                                                                                        style={{
                                                                                            fontSize: "14px",
                                                                                            marginLeft: "6px",
                                                                                            color: "#676363",
                                                                                        }}
                                                                                    >
                                                                                        {this.getLeadDataFromLocalStorage()?.companyType || "No data found"}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="p-2">
                                                                                    {
                                                                                        this.getLeadDataFromLocalStorage()?.designation && (
                                                                                            <>
                                                                                                <b>Designation:</b>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontSize: "14px",
                                                                                                        marginLeft: "6px",
                                                                                                        color: "#676363",
                                                                                                    }}
                                                                                                >
                                                                                                    {this.getLeadDataFromLocalStorage()?.designation}
                                                                                                </span>
                                                                                            </>
                                                                                        )
                                                                                    }

                                                                                </div>
                                                                                <div className="p-2">
                                                                                    {
                                                                                        this.getLeadDataFromLocalStorage()?.department && (
                                                                                            <>
                                                                                                <b>Department:</b>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontSize: "14px",
                                                                                                        marginLeft: "6px",
                                                                                                        color: "#676363",
                                                                                                    }}
                                                                                                >
                                                                                                    {this.getLeadDataFromLocalStorage()?.department}
                                                                                                </span>
                                                                                            </>
                                                                                        )
                                                                                    }

                                                                                </div>
                                                                                <div className="p-2">
                                                                                    {
                                                                                        this.getLeadDataFromLocalStorage()?.lead_reference_description && (
                                                                                            <>
                                                                                                <b>Reference Description:</b>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontSize: "14px",
                                                                                                        marginLeft: "6px",
                                                                                                        color: "#676363",
                                                                                                    }}
                                                                                                >
                                                                                                    {this.getLeadDataFromLocalStorage()?.lead_reference_description}
                                                                                                </span>
                                                                                            </>
                                                                                        )
                                                                                    }

                                                                                </div>

                                                                            </Col>
                                                                            <Col>
                                                                                <div className="p-2">
                                                                                    <b>Status:</b>
                                                                                    <span
                                                                                        style={{
                                                                                            fontSize: "14px",
                                                                                            marginLeft: "6px",
                                                                                            color: "#676363",
                                                                                        }}
                                                                                    >
                                                                                        {this.getLeadDataFromLocalStorage()?.lead_status || "No data found"}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="p-2">
                                                                                    <b>Priority:</b>
                                                                                    <span
                                                                                        style={{
                                                                                            fontSize: "14px",
                                                                                            marginLeft: "6px",
                                                                                            color: "#676363",
                                                                                        }}
                                                                                    >
                                                                                        {this.getLeadDataFromLocalStorage()?.priority || "No data found"}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="p-2">
                                                                                    {this.getLeadDataFromLocalStorage()?.selectedlead?.name && (
                                                                                        <>
                                                                                            <b>Reference Type:</b>
                                                                                            <span
                                                                                                style={{
                                                                                                    fontSize: "14px",
                                                                                                    marginLeft: "6px",
                                                                                                    color: "#676363",
                                                                                                }}
                                                                                            >
                                                                                                {this.getLeadDataFromLocalStorage()?.selectedlead?.name}
                                                                                            </span>
                                                                                        </>
                                                                                    )}

                                                                                </div>

                                                                                <div className="p-2">
                                                                                    {
                                                                                        this.getLeadDataFromLocalStorage()?.comments && (
                                                                                            <>
                                                                                                <b>Comment:</b>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontSize: "14px",
                                                                                                        marginLeft: "6px",
                                                                                                        color: "#676363",
                                                                                                    }}
                                                                                                >
                                                                                                    {this.getLeadDataFromLocalStorage()?.comments}
                                                                                                </span>

                                                                                            </>
                                                                                        )
                                                                                    }

                                                                                </div>
                                                                                {/* Office */}
                                                                                <div className="p-2">
                                                                                    {
                                                                                        this.getLeadDataFromLocalStorage()?.reference_person_description && (
                                                                                            <>
                                                                                                <b>Reference Name:</b>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontSize: "14px",
                                                                                                        marginLeft: "6px",
                                                                                                        color: "#676363",
                                                                                                    }}
                                                                                                >
                                                                                                    {this.getLeadDataFromLocalStorage()?.reference_person_description}
                                                                                                </span>
                                                                                            </>
                                                                                        )
                                                                                    }

                                                                                </div>
                                                                                <div className="p-2">
                                                                                    {
                                                                                        this.getLeadDataFromLocalStorage()?.inputnumber && (
                                                                                            <>
                                                                                                <b>Phone No:</b>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontSize: "14px",
                                                                                                        marginLeft: "6px",
                                                                                                        color: "#676363",
                                                                                                    }}
                                                                                                >
                                                                                                    {this.getLeadDataFromLocalStorage()?.inputnumber}
                                                                                                </span>
                                                                                            </>
                                                                                        )
                                                                                    }

                                                                                </div>

                                                                            </Col>
                                                                        </Row>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>

                                                            <Col lg="12">
                                                                <Card
                                                                    style={{
                                                                        boxShadow:
                                                                            "5px 5px 10px 5px rgba(0, 0, 0, 0.1)",
                                                                    }}
                                                                >
                                                                    <CardHeader>
                                                                        <h5
                                                                            className="p-1 lead_overview"
                                                                            style={{ fontSize: "16px" }}
                                                                        >
                                                                            Company Details
                                                                        </h5>
                                                                    </CardHeader>
                                                                    <CardBody>
                                                                        <Row className="mt-2  border-top">
                                                                            {/* <h6 className="p-2 border-bottom" style={{ fontSize: "14px" }}>
                                                                    <b>Company Details</b>
                                                                </h6> */}
                                                                            <Col lg="6">
                                                                                <div className="p-2">
                                                                                    {
                                                                                        this.getLeadDataFromLocalStorage()?.selectedCompany && (
                                                                                            <>
                                                                                                <b>Company Name:</b>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontSize: "14px",
                                                                                                        marginLeft: "6px",
                                                                                                        color: "#676363",
                                                                                                    }}
                                                                                                >
                                                                                                    {this.getLeadDataFromLocalStorage()?.selectedCompany}
                                                                                                </span>
                                                                                            </>
                                                                                        )
                                                                                    }

                                                                                </div>

                                                                                <div className="p-2">
                                                                                    {
                                                                                        this.getLeadDataFromLocalStorage()?.selectedDepartment && (
                                                                                            <>
                                                                                                <b>Department:</b>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontSize: "14px",
                                                                                                        marginLeft: "6px",
                                                                                                        color: "#676363",
                                                                                                    }}
                                                                                                >
                                                                                                    {this.getLeadDataFromLocalStorage()?.selectedDepartment}
                                                                                                </span>
                                                                                            </>
                                                                                        )
                                                                                    }

                                                                                </div>
                                                                            </Col>
                                                                            <Col lg="6">
                                                                                <div className="p-2">
                                                                                    {
                                                                                        this.getLeadDataFromLocalStorage()?.selectedDesination && (
                                                                                            <>
                                                                                                <b>Designation:</b>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontSize: "14px",
                                                                                                        marginLeft: "6px",
                                                                                                        color: "#676363",
                                                                                                    }}
                                                                                                >
                                                                                                    {this.getLeadDataFromLocalStorage()?.selectedDesination}
                                                                                                </span>
                                                                                            </>
                                                                                        )
                                                                                    }

                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>

                                                            <Col lg="12">
                                                                <Card
                                                                    style={{
                                                                        boxShadow:
                                                                            "5px 5px 10px 5px rgba(0, 0, 0, 0.1)",
                                                                    }}
                                                                >
                                                                    <CardHeader>
                                                                        <h5
                                                                            className="p-1 lead_overview"
                                                                            style={{ fontSize: "16px" }}
                                                                        >
                                                                            Attach File
                                                                        </h5>
                                                                    </CardHeader>
                                                                    <CardBody>
                                                                        <Row className="mt-2  border-top">
                                                                            {/* <h6 className="p-2 border-bottom" style={{ fontSize: "14px" }}><b>Attach File</b></h6> */}
                                                                            <Col lg="6">
                                                                                <div className="p-2">
                                                                                    {this.getDocumentDataFromLocalStorage() && DocumetData.length > 0 && DocumetData[0]?.document_name && (
                                                                                        <>
                                                                                            <b>File Name:</b>
                                                                                            <span
                                                                                                style={{
                                                                                                    fontSize: "14px",
                                                                                                    marginLeft: "6px",
                                                                                                    color: "#676363",
                                                                                                }}
                                                                                            >
                                                                                                {DocumetData[0]?.document_name}
                                                                                            </span>
                                                                                        </>
                                                                                    )}
                                                                                </div>

                                                                            </Col>
                                                                            <Col lg="6">
                                                                                <div className="p-2">
                                                                                    {
                                                                                        this.getDocumentDataFromLocalStorage() && DocumetData.length > 0 &&
                                                                                        (
                                                                                            <div>
                                                                                                <b>File/Images:</b>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontSize: "14px",
                                                                                                        marginLeft: "6px",
                                                                                                        color: "#676363",
                                                                                                    }}
                                                                                                >
                                                                                                    {DocumetData[0]?.document_url_encode.substring(0, 10) + "..."}
                                                                                                </span>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            </Col>

                                                                        </Row>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>

                                                            <Col lg="12">
                                                                <Card
                                                                    style={{
                                                                        boxShadow:
                                                                            "5px 5px 10px 5px rgba(0, 0, 0, 0.1)",
                                                                    }}
                                                                >
                                                                    <CardHeader>
                                                                        <h5
                                                                            className="p-1 lead_overview"
                                                                            style={{ fontSize: "16px" }}
                                                                        >
                                                                            Activity Details
                                                                        </h5>
                                                                    </CardHeader>
                                                                    <CardBody>
                                                                        <Row className="mt-2  border-top">
                                                                            {/* <h6 className="p-2 border-bottom" style={{ fontSize: "14px" }}><b>Activity Details</b></h6> */}
                                                                            {/* {contactpersonDetailsObject && contactpersonDetailsObject.length > 0 && contactpersonDetailsObject.map((item) => ( */}
                                                                            {/* {this.state.contactpersonDetails.map((item, index) => ( */}
                                                                            <>
                                                                                <Col lg="6">
                                                                                    <div className="p-2">
                                                                                        <b>Subject:</b>
                                                                                        <span
                                                                                            style={{
                                                                                                fontSize: "14px",
                                                                                                marginLeft: "6px",
                                                                                                color: "#676363",
                                                                                            }}
                                                                                        >
                                                                                            {this.getActivityDataFromLocalStorage()?.subject || "No data found"}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="p-2">
                                                                                        <b>Description:</b>
                                                                                        <span
                                                                                            style={{
                                                                                                fontSize: "14px",
                                                                                                marginLeft: "6px",
                                                                                                color: "#676363",
                                                                                            }}
                                                                                        >
                                                                                            {this.getActivityDataFromLocalStorage()?.description || "No data found"}
                                                                                        </span>
                                                                                    </div>
                                                                                </Col>
                                                                                <Col lg="6">
                                                                                    <div className="p-2">
                                                                                        <b>Date:</b>
                                                                                        <span
                                                                                            style={{
                                                                                                fontSize: "14px",
                                                                                                marginLeft: "6px",
                                                                                                color: "#676363",
                                                                                            }}
                                                                                        >
                                                                                            {this.getActivityDataFromLocalStorage()?.start_dt || "No data found"}
                                                                                        </span>
                                                                                    </div>
                                                                                </Col>
                                                                                <hr
                                                                                    style={{
                                                                                        height: "1px",
                                                                                        color: "#e3e3e3",
                                                                                    }}
                                                                                />
                                                                            </>
                                                                            {/* ))
                                                                                    } */}
                                                                        </Row>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>

                                                            {/* End Basic Lead Details */}
                                                        </Row>

                                                        {/*End---- listing of Array more data */}

                                                        <div className="d-flex justify-content-between mt-3">
                                                            <Button
                                                                color="primary"
                                                                className={
                                                                    this.state.activeTab === 1
                                                                        ? "previous disabled"
                                                                        : "previous"
                                                                }
                                                                onClick={() => {
                                                                    this.toggleTab(4);
                                                                }}
                                                            >
                                                                Previous
                                                            </Button>
                                                            {/* {this.state.dataArray.length > 0 && ( */}
                                                            <Button
                                                                color="primary"
                                                                type="submit"
                                                                style={{ float: "right" }}
                                                            >
                                                                Next
                                                            </Button>
                                                            {/* )} */}
                                                        </div>
                                                    </AvForm>
                                                </div>
                                            </TabPane>
                                        </TabContent>
                                        {/* <ul className="pager wizard twitter-bs-wizard-pager-link">
                                            <li className={this.state.activeTab === 1 ? "previous disabled" : "previous"}><Link to="#" onClick={() => { this.toggleTab(this.state.activeTab - 1); }}>Previous</Link></li>
                                            <li className={this.state.activeTab === 5 ? "next disabled" : "next"}><Link to="#" onClick={() => { this.toggleTab(this.state.activeTab + 1); }}>Next</Link></li>
                                            <li className={this.state.activeTab === 5 ? "next disabled" : "next"}>
                                                <Button type="submit" onClick={() => { this.toggleTab(this.state.activeTab + 1) }}> Next</Button>
                                            </li>
                                        </ul> */}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Container>
                </div>
                {/* Lead Reference Modal */}
                <Modal isOpen={this.state.leadRefShow} backdrop="static">
                    <ModalHeader
                        toggle={() => {
                            this.setState({
                                leadRefShow: false,
                            });
                        }}
                    >
                        ADD LEAD REFERENCE
                    </ModalHeader>
                    <ModalBody>
                        <CreateLeadRefranceModal
                            leadRefShow={this.state.leadRefShow}
                            closeModalCallback={() => {
                                this.setState({ leadRefShow: false });
                                this.GetAllReferenceId();
                            }}
                        />
                    </ModalBody>
                </Modal>

                {/* customer modal */}
                {/* <Modal isOpen={this.state.customerShow} backdrop="static" size="xl">
                    <ModalHeader toggle={() => {
                        this.setState({
                            customerShow: false,
                        });
                    }}>Add Company
                    </ModalHeader>
                    <ModalBody>
                        <CreateCustomerModal
                            leadRefShow={this.state.customerShow}
                            closeModalCallback={() => {
                                this.setState({ customerShow: false })
                                this.getAllCustomers();
                            }}
                        />
                    </ModalBody>

                </Modal> */}
                {/* Contact Modal */}
                <Modal isOpen={this.state.contactShow} backdrop="static" size="xl">
                    <ModalHeader
                        toggle={() => {
                            this.setState({
                                contactShow: false,
                            });
                        }}
                    >
                        Add Contact Person
                    </ModalHeader>
                    <ModalBody>
                        <CreateContactPersonModal
                            leadRefShow={this.state.contactShow}
                            closeModalCallback={() => {
                                this.setState({ contactShow: false });
                                this.getAllContacts();
                            }}
                        />
                    </ModalBody>
                </Modal>

                {/* Start--- Add more contactperson model  */}
                <Modal
                    size="xl"
                    isOpen={this.state.ContactAddMore_Model}
                    toggle={this.handleContactAddMore}
                >
                    <ModalHeader
                        toggle={() => this.setState({ ContactAddMore_Model: false })}
                    >
                        Add Contact Person Row
                    </ModalHeader>
                    <ModalBody>
                        <AvForm
                            className="needs-validation"
                            onValidSubmit={this.handleFormSubmit}
                        >
                            <Row>
                                <Col lg="4" className="d-inline">
                                    <div
                                        style={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <Label
                                            className="form-label"
                                            htmlFor="validationCustom04"
                                            style={{ fontSize: "14px" }}
                                        >
                                            Designation
                                            {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                        </Label>
                                    </div>
                                    <AvField
                                        required={true}
                                        name="selectedcontactpersonAddMore"
                                        type="select"
                                        // id="validationCustom04"
                                        // value={this.state.selectedleadreference}
                                        // errorMessage="Please Select a Contact Person."
                                        // validate={{ required: { value: true } }}
                                        className="form-control"
                                        onChange={(e) => {
                                            this.setState({
                                                selectedcontactpersonAddMore: e.target.value,
                                            });
                                            if (e.target.value != "") {
                                                this.SearchContactPersonById(e.target.value);
                                            }
                                            // this.handleChange();
                                        }}
                                    >
                                        <option value={""}>Select Designation</option>
                                        {/* <option value={""} >Other</option> */}
                                        {this.state.ContactDesignation.map((item) => {
                                            return (
                                                <option value={item.id}>{item.designation_name}</option>
                                            );
                                        })}
                                    </AvField>
                                </Col>
                                <Col lg="4" className="d-inline">
                                    <div
                                        style={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <Label
                                            className="form-label"
                                            htmlFor="validationCustom04"
                                            style={{ fontSize: "14px" }}
                                        >
                                            Department
                                            {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                        </Label>
                                    </div>
                                    <AvField
                                        required={true}
                                        name="selectedcontactpersonAddMore"
                                        type="select"
                                        id="validationCustom04"
                                        // value={this.state.selectedleadreference}
                                        // errorMessage="Please Select a Contact Person."
                                        // validate={{ required: { value: true } }}
                                        className="form-control"
                                        onChange={(e) => {
                                            this.setState({
                                                selectedcontactpersonAddMore: e.target.value,
                                            });
                                            if (e.target.value != "") {
                                                this.SearchContactPersonById(e.target.value);
                                            }
                                            // this.handleChange();
                                        }}
                                    >
                                        <option value={""}>Select Department</option>
                                        {/* <option value={""} >Other</option> */}
                                        {this.state.FindContactDepartment.map((item) => {
                                            return (
                                                <option value={item.id}>{item.department_name}</option>
                                            );
                                        })}
                                    </AvField>
                                </Col>
                                <Col lg="4" className="d-inline">
                                    <div
                                        style={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <Label
                                            className="form-label"
                                            htmlFor="validationCustom04"
                                            style={{ fontSize: "14px" }}
                                        >
                                            Select Contact Person
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </Label>
                                        {contactActive?.status == "Active" && (
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom04"
                                                style={{ color: "blue" }}
                                                onClick={() =>
                                                    this.setState({
                                                        contactShow: true,
                                                    })
                                                }
                                            >
                                                Add Contact Person
                                            </Label>
                                        )}
                                    </div>
                                    <AvField
                                        required={true}
                                        name="selectedcontactpersonAddMore"
                                        type="select"
                                        id="validationCustom04"
                                        // value={this.state.selectedleadreference}
                                        errorMessage="Please Select a Contact Person."
                                        validate={{ required: { value: true } }}
                                        className="form-control"
                                        onChange={(e) => {
                                            this.setState({
                                                selectedcontactpersonAddMore: e.target.value,
                                            });
                                            if (e.target.value != "") {
                                                this.SearchContactPersonById(e.target.value);
                                            }
                                            // this.handleChange();
                                        }}
                                    >
                                        <option value={""}>Select Company Name </option>
                                        {/* <option value={""} >Other</option> */}
                                        {this.state.ContactPersonSearch.map((item) => {
                                            return (
                                                <option value={item.id}>
                                                    {item.first_name + " " + item.last_name}
                                                </option>
                                            );
                                        })}
                                    </AvField>
                                </Col>
                            </Row>

                            {/* <Row>
                                <Col lg="3" className="d-inline">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                        <Label
                                            className="form-label"
                                            htmlFor="validationCustom04"
                                            style={{ fontSize: "14px" }}

                                        >
                                            Select Contact Person
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </Label>
                                        {
                                            contactActive?.status == "Active" && (

                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                    style={{ color: 'blue' }}
                                                    onClick={() => this.setState({
                                                        contactShow: true,
                                                    })}
                                                >
                                                    Add Contact Person

                                                </Label>
                                            )}
                                    </div>
                                    <AvField
                                        required={true}
                                        name="selectedcontactpersonAddMore"
                                        type="select"
                                        id="validationCustom04"
                                        // value={this.state.selectedleadreference}
                                        errorMessage="Please Select a Contact Person."
                                        validate={{ required: { value: true } }}
                                        className="form-control"
                                        onChange={(e) => {
                                            this.setState({
                                                selectedcontactpersonAddMore: e.target.value,
                                            });
                                            if (e.target.value != "") {
                                                this.SearchContactPersonById(e.target.value)
                                            }
                                            // this.handleChange();
                                        }}
                                    >
                                        <option value={""} >Select Contact Person</option>
                                        <option value={""} >Other</option>
                                        {this.state.contactpersonlistAddMore.map((item) => {
                                            return (
                                                <option value={item.id}>{item.first_name + " " + item.last_name}</option>

                                            );
                                        })}
                                    </AvField>
                                </Col>

                                {this.state.selectedcontactpersonAddMore != "" && (
                                    <>
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                                style={{ fontSize: "14px" }}
                                            >
                                                Contact Person Phone No.
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                value={this.state.ContactPersonDescriptionAddMore.mobile_no_1}
                                                disabled
                                                name="mobile_no_1"
                                                placeholder="Contact Person No."
                                                type="text"
                                                // errorMessage="Please Provide Contact Person Name"
                                                className="form-control"
                                                // validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                                // value={formData.mobile_no_1}
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                                style={{ fontSize: "14px" }}
                                            >
                                                Contact Person Designation
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                value={this.state.ContactPersonDescriptionAddMore.designation_name}
                                                disabled
                                                name="designation_name"
                                                placeholder="Contact Person Designation."
                                                type="text"
                                                // errorMessage="Please Provide Contact Person Designation"
                                                className="form-control"
                                                // validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                                style={{ fontSize: "14px" }}
                                            >
                                                Contact Person Department
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                value={this.state.ContactPersonDescriptionAddMore.department_name}
                                                disabled
                                                name="department_name"
                                                placeholder="Contact Person Department."
                                                type="text"
                                                // errorMessage="Please Provide Contact Person Department"
                                                className="form-control"
                                                // validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                    </>
                                )}
                            </Row> */}

                            <div
                                className="text-center Contactperson"
                                style={{ float: "right" }}
                            >
                                <Row>
                                    <Col lg={8}>
                                        <Button
                                            color="primary"
                                            type="submit"
                                        // onClick={this.handleFormSubmit}
                                        >
                                            Create Row
                                        </Button>
                                    </Col>
                                    <Col lg={4}>
                                        <Button
                                            color="secondary"
                                            className="cancle_contact_person"
                                            // onClick={() => this.props.history.goBack()}
                                            onClick={this.handleCancelAddRowModel}
                                        >
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </AvForm>
                    </ModalBody>
                </Modal>

                {/* End--- Add more contactperson model  */}
            </React.Fragment>
        );
    }
}

export default MarketLeadForWizard;
