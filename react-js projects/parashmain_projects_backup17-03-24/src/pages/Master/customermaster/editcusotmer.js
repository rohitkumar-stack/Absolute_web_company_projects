import React, { Component } from "react";
import {
    Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody, Table, Container, Input, Label, Form, Button, FormGroup
} from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import {
    CREATE_USER, GET_COUNTRY, GET_CONTACTPERSON_DESINATION, GET_CONTACTPERSON, GET_CUSTOMER_BY_ID, CREATE_CONTACTPERSON,
    GET_COMPANYTYPE, GET_CONTACTPERSON_DEPARTMENT, GET_COMPANY_SERVICESOFFERED, DELETE_CONTACTPERSON,
    UPDATE_CONTACTPERSON, GET_CONTACTPERSON_SEARCH, GET_ITEM_MAKER_BY_ID, GET_ITEM_SUB_CATEGORY_BY_ID, GET_LEAD_REFERENCE_BY_ID, GET_LEAVE_BY_ID, GET_LEDGER_GROUP_BY_ID, GET_OWNERSHIP_WO_PAGINATE, GET_SHIFT_BY_ID, GET_STATE, GET_TERMS_CONDITIONS_BY_ID, GET_UNIT_BY_ID, GET_UNIT_MEASURE_BY_ID, GET_USER_BY_ID, GET_WAREHOUSE_BY_ID, UPDATE_COUNTRY, UPDATE_CUSTOMER, UPDATE_DEPARTMENT, UPDATE_DESIGNATION, UPDATE_HSN_CODE, UPDATE_INDUSTRIAL_TYPE, UPDATE_ITEM_CATEGORY, UPDATE_ITEM_MAKE, UPDATE_ITEM_SUB_CATEGORY, UPDATE_LEAD_REFERENCE, UPDATE_LEAVE, UPDATE_LEDGER_GROUP, UPDATE_SHIFT, UPDATE_TERMS_CONDITIONS, UPDATE_UNIT, UPDATE_UNIT_MEASURE, UPDATE_USER, UPDATE_WAREHOUSE
} from "../../../globals";
import { ThreeDots } from "react-loader-spinner";
import { RiDeleteBin6Line } from "react-icons/ri";

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Customer", link: process.env.PUBLIC_URL + "/leadTabs" },
                { title: "Edit Customer", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            GetValueCustomerID: {},
            inputMobileField: "",
            isLoading: false,
            status: "",
            itemcategory: [],
            inputnumber: "",
            inputnumber02: "",
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
            customerserviceDetails: [],
            customertypeDetails: [],
            customertypeDetails: [],
            dataArray: [],
            dataArraygetContactData: [],
            ContactAddMore_Model: false,
            // ContactPersonGetUpdateData: {
            //     customer_name: "",
            //     mobile_no_1: "",
            //     email: "",
            //     designation_name: "",
            //     department_name: "",
            //     mobile_no_2: "",
            // },
            ContactPersonSearchGetData: [],
            modal_small: false,
            LeadContactGetUpdateData: {
                id: '',
                customer_name: "",
                mobile_no_1: "",
                email: "",
                designation_name: "",
                designation_id: "",
                department_name: "",
                department_id: "",
                mobile_no_2: "",
            },
            modal_EditContactPerson: false,
            pathname: '',
            CustomerIdVale: '',
            findCustomerId: '',
            isServiceLoading: false,

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleContactAddMore = this.handleContactAddMore.bind(this);
        this.handleContactPersonApi = this.handleContactPersonApi.bind(this);
        //DeleteCustomer Model 
        // this.handleDeleteContactClick = this.handleDeleteContactClick.bind(this);
        this.tog_small = this.tog_small.bind(this);
        //Edit ContactPerosn
        this.tog_EditContactPerson = this.tog_EditContactPerson.bind(this);
        this.handleUpdateContactPersonApi = this.handleUpdateContactPersonApi.bind(this);
        this.DeleteContactDataApi = this.DeleteContactDataApi.bind(this);
    };

    componentDidMount() {
        this.GetAllOwnership();
        this.GetAllState();
        this.GetAllCountry();

        // Access the location object to get route parameters
        const { location } = this.props;
        const { pathname } = location;

        // Parse the pathname to get the id parameter
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);

        //Customer Id
        //update Activity With Value of the Ids
        const { match } = this.props;
        const CustomerIdVale = match.params.id;
        this.setState({ CustomerIdVale: match.params.id });
        //  console.log(CustomerIdVale, "======>CustomerIdVale")


        // this.setState({ id: id })
        this.GetHSNCOde(id);
        this.getAllContactsDesination();
        this.getAllContactsDepartment();
        this.getAllCompanyType();
        this.getAllCompanyService();
        // this.getAllContactPerson();
        this.getAllContactsPersonSearch();
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

    //GET ALL Contact service
    async getAllCompanyService() {
        this.setState({
            isServiceLoading: true,
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
                // Set CompanyServiceOffered
                this.setState({ CompanyServiceOffered: data.data }, () => {
                    // After setting CompanyServiceOffered, set customerserviceDetails
                    const { CompanyServiceOffered } = this.state;
                    const selectedServices = CompanyServiceOffered.filter(item =>
                        this.state.customerserviceDetails.some(detail =>
                            detail.service_industry === item.service_industry
                        )
                    );

                    this.setState({ customerserviceDetails: selectedServices });
                    console.log(selectedServices, "=====>selectedServices")
                });
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            this.setState({
                isServiceLoading: false, // Ensure isLoading is set to false regardless of success or failure
            });
        }
    }

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

    // GET CUSTOMER ID VALUES
    async GetHSNCOde(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            const response = await fetch(GET_CUSTOMER_BY_ID + id, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.result === true && data.data) {
                const { customer_id } = data.data;
                this.setState({
                    GetValueCustomerID: data.data,
                    customerserviceDetails: data.data.customerserviceDetails,
                    customertypeDetails: data.data.customertypeDetails,
                    findCustomerId: customer_id,
                    isLoading: false,
                }, () => {
                    // Once setState is done, call getAllContactsPersonSearch
                    this.getAllContactsPersonSearch();
                });
            } else {
                this.setState({
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({
                isLoading: false,
            });
        }
    }


    //GET CONTACT PERSON DETAILS
    // async getAllContactPerson() {
    //     var Token = localStorage.getItem("userToken");
    //     try {
    //         fetch(GET_CONTACTPERSON, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: "Bearer " + Token,
    //                 "Content-Type": "application/json",
    //             },
    //         }).then((response) => {
    //             response.json().then((data) => {
    //                 if (data.result === true) {
    //                     this.setState({ ContactPersonSearchGetData: data.data });
    //                     // this.setState({ contactpersonlistAddMore: data.data });
    //                 }
    //                 // else if (data.result === false) {
    //                 //     toast(data.message, {
    //                 //         type: "error",
    //                 //     });
    //                 // }
    //                 else {

    //                 }
    //             });
    //         });
    //     } catch (error) {

    //     }
    // }

    //GET ALL ContactsPerson Search
    async getAllContactsPersonSearch() {
        const { findCustomerId } = this.state;
        console.log(findCustomerId, "====>findCustomerId");
        if (!findCustomerId) {
            // findCustomerId is not properly set, return or handle accordingly
            return;
        }
        this.setState({
            isLoading: true,
        });
        const Token = localStorage.getItem("userToken");
        try {
            const myHeaders = {
                Authorization: "Bearer " + Token,
                "Content-Type": "application/json",
            };

            const raw = JSON.stringify({
                customer_id_encode: findCustomerId,
            });

            const response = await fetch(GET_CONTACTPERSON_SEARCH, {
                method: "POST",
                headers: myHeaders,
                body: raw,
            });

            const data = await response.json();

            if (data.result === true) {
                this.setState({ ContactPersonSearchGetData: data.data });
            } else if (data.result === false) {
                // Handle error
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }

    //CREATE CONTACT PERSON API
    async handleContactPersonApi(event, values, id) {
        this.GetHSNCOde(id);
        // console.log("customerId",  this.state.GetValueCustomerID.customer_id)
        this.setState({
            isLoading: true,
        });
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
                customer_id_encode: this.state.GetValueCustomerID.customer_id, // Update customerId value here
                mobile_no_1: this.state.inputnumber,
                mobile_no_2: this.state.inputnumber02,
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
                //close Model 
                this.handleCancelAddRowModel();
                //Api lists
                this.getAllContactsPersonSearch();
                // this.props.history.goBack();
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

    //Start ---DELETE CINTACT PERSON API
    async DeleteContactDataApi(id) {
        // console.log(this.state.LeadCommentsGetUpdateData?.id , "=======>DeleteCommentsDataApi");
        // const { LeadActivityListsId } = this.state;
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");

        try {
            const response = await fetch(
                DELETE_CONTACTPERSON + this.state.LeadContactGetUpdateData?.id,
                {
                    method: "POST",  // Use DELETE method
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();

                if (data.result === true) {
                    toast("Contact Person Deleted Successfully !", {
                        type: "success",
                    });
                    //Api lists
                    this.getAllContactsPersonSearch();
                    //model close
                    this.handleCancelDeletModel();
                    // this.props.history.goBack();
                }
            }
        } catch (error) {
            console.error("Error:", error);
            // toast("Unable to Delete Comment", {
            //     type: "error",
            // });
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }
    //End--- DeleteActivity ApiCall 

    //Start --- Update Contact Person 
    handleUpdateContactPersonApi = (event, values) => {
        console.log(values, "===>updateConatctvalues");

        const { LeadActivityListsId } = this.state;

        this.setState({
            isLoading: true,
        });

        var Token = localStorage.getItem("userToken");

        try {
            fetch(UPDATE_CONTACTPERSON + this.state.LeadContactGetUpdateData?.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer_name: values.contactName,
                    customer_id_encode: this.state.GetValueCustomerID.customer_id, // Update customerId value here
                    mobile_no_1: this.state.inputnumber || this.state.LeadContactGetUpdateData.mobile_no_1,
                    // mobile_no_1: values.mobile_no_1,
                    mobile_no_2: this.state.inputnumber02 || this.state.LeadContactGetUpdateData.mobile_no_2,
                    email: values.email,
                    designation_id_encode: values.designation,
                    department_id_encode: values.department,
                }),
            }).then((response) => {
                response.json().then((data) => {
                    console.log("API Response:", data); // Log the full API response for debugging

                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("ContactPerson Updated Successfully !", {
                            type: "success",
                        });
                        //Api lists
                        this.getAllContactsPersonSearch();

                        // Close button the form
                        this.handleCloseContactPersonModel();
                        // Reset the form
                        this.form && this.form.reset();


                    } else {
                        toast(data.message, {
                            type: "error",
                        });
                    }

                    this.setState({
                        isLoading: false,
                    });
                });
            });
        } catch (error) {
            console.error("Error:", error);
            toast("Unable to Update State", {
                type: "error",
            });

            this.setState({
                isLoading: false,
            });
        }
    };
    //End --- Update Contact Person 

    //UPDATE CUSTOMER API
    handleSubmit(event, values) {
        const { dataCompanyTypeArray, dataCompanyServiceArray } = this.state;
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_CUSTOMER + this.state.GetValueCustomerID.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    company_name: values.companyname,
                    address: values.address,
                    city: values.city,
                    state_id_encode: values.state,
                    country_id_encode: values.country,
                    pincode: values.pincode,
                    office_phone_no: this.state.inputnumber,
                    customer_category: values.category,
                    // customer_type: values.type,
                    customertypeDetails: dataCompanyTypeArray,
                    customerserviceindustryDetails: dataCompanyServiceArray,
                    ownership_type_id_encode: values.ownership,
                    status: "Active"
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Customer Updated Successfully !", {
                            type: "success",
                        });
                        this.setState({
                            isLoading: false
                        });

                        //redirection
                        this.props.history.push("/parasmanierp/LeadTabs");
                        // this.props.history.goBack();

                    } else {
                        toast("Unable to Update Customer", {
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
            toast("Unable to Update Customer", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

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

    //Add More Contact Lists functionalty
    // async AddContactMoreData(event, values) {
    //     // Extracting only the contact_person_id_encode values from the dataArray
    //     const contactPersonIds = this.state.dataArray.map((item) => {

    //         return {

    //             contact_person_id_encode: item.contact_person_id_encode
    //         }
    //     }
    //     );
    //     this.setState({
    //         contactPersornArray: contactPersonIds
    //     })
    //     await this.setState({
    //         contactpersonDetails: contactPersonIds,
    //         // contactpersonDetails: this.state.dataArray,
    //         activeTab: 4,
    //     });
    // }

    //Add Row Data in one Array 
    // handleContactSubmit = (e) => {
    //     e.preventDefault();
    //     const { selectedcontactpersonAddMore, GetValueCustomerID } = this.state;

    //     // Constructing the new row data
    //     const newRowData = {
    //         customer_name: GetValueCustomerID.customer_name,
    //         mobile_no_1: GetValueCustomerID.mobile_no_1,
    //         email: GetValueCustomerID.email,
    //         designation_name: GetValueCustomerID.designation_name,
    //         department_name: GetValueCustomerID.department_name,
    //         mobile_no_2: GetValueCustomerID.mobile_no_2,
    //     };
    //     // Update the array of data in the state
    //     this.setState(prevState => ({
    //         dataArray: [...(prevState.dataArray || []), newRowData],
    //         ContactAddMore_Model: false,  // Closing the modal
    //         selectedcontactpersonAddMore: "", // Reset selected contact person
    //         GetValueCustomerID: { // Reset ContactPersonDescriptionAddMore object
    //             customer_name: "",
    //             mobile_no_1: "",
    //             email: "",
    //             designation_name: "",
    //             department_name: "",
    //             mobile_no_2: "",
    //         }
    //     }), () => {
    //         localStorage.setItem('dataArray', JSON.stringify(this.state.dataArray));
    //         console.log('New Row Data:', this.state.dataArray);
    //     });
    // };

    // handleChange = (e) => {
    //     const { name, value } = e.target;
    //     this.setState((prevState) => ({
    //         GetValueCustomerID: {
    //             ...prevState.GetValueCustomerID,
    //             [name]: value,
    //         },
    //     }));
    // };
    // Start---- Add more Contact feilds Model 
    handleContactAddMore() {
        this.setState(prevState => ({
            ContactAddMore_Model: !prevState.ContactAddMore_Model
        }));
        // this.removeBodyCss();
    }

    handleCancelAddRowModel = () => {
        this.setState({ ContactAddMore_Model: false });
    }

    //Start----Delete Contact Person
    handleDeleteContactClick(item) {
        // console.log(item, "====>item")
        this.setState({
            LeadContactGetUpdateData: {
                id: item.id,
            },
            modal_small: true,
        });
    }

    tog_small() {
        this.setState((prevState) => ({
            modal_small: !prevState.modal_small,
        }));
    }

    handleCancelDeletModel = () => {
        this.setState({ modal_small: false });
    }
    //End----Delete Contact Person

    //Start ------- Edit Contact Person 
    tog_EditContactPerson(item) {
        // console.log(item, "=========>EditContactdata");
        this.setState(prevState => ({
            modal_EditContactPerson: !prevState.modal_EditContactPerson,
            LeadContactGetUpdateData: { // Corrected syntax
                id: item.id,
                customer_name: item.customer_name,
                mobile_no_1: item.mobile_no_1,
                email: item.email,
                designation_name: item.designation_name,
                designation_id: item.designation_id,
                department_id: item.department_id,
                department_name: item.department_name,
                mobile_no_2: item.mobile_no_2,
            }
        }));
        // this.removeBodyCss();
    }

    handleCloseContactPersonModel = () => {
        this.setState({ modal_EditContactPerson: false });
    };

    // Start--input value Activity 
    handleInputChangeCompanyName = (event) => {
        const updatedContactText = event.target.value;
        this.setState((prevState) => ({
            LeadContactGetUpdateData: {
                ...prevState.LeadContactGetUpdateData,
                customer_name: updatedContactText,
            },
        }));
    };
    handleInputChangeMobile01 = (event) => {
        const updatedContactText = event.target.value;
        this.setState((prevState) => ({
            LeadContactGetUpdateData: {
                ...prevState.LeadContactGetUpdateData,
                mobile_no_1: updatedContactText,
            },
        }));
    };
    handleInputChangeEmail = (event) => {
        const updatedContactText = event.target.value;
        this.setState((prevState) => ({
            LeadContactGetUpdateData: {
                ...prevState.LeadContactGetUpdateData,
                email: updatedContactText,
            },
        }));
    };
    handleInputChangeDesination = (event) => {
        const updatedContactText = event.target.value;
        this.setState((prevState) => ({
            LeadContactGetUpdateData: {
                ...prevState.LeadContactGetUpdateData,
                designation_id: updatedContactText,
            },
        }));
    };
    handleInputChangeDepartment = (event) => {
        const updatedContactText = event.target.value;
        this.setState((prevState) => ({
            LeadContactGetUpdateData: {
                ...prevState.LeadContactGetUpdateData,
                department_id: updatedContactText,
            },
        }));
    };
    handleInputChangeMobile02 = (event) => {
        const updatedContactText = event.target.value;
        this.setState((prevState) => ({
            LeadContactGetUpdateData: {
                ...prevState.LeadContactGetUpdateData,
                mobile_no_2: updatedContactText,
            },
        }));
    };




    render() {
        const { isAadharBase64URL, fileData, CompanyType, CompanyServiceOffered, dataCompanyTypeArray
            , GetValueCustomerID, customerserviceDetails, dataArray, ContactPersonSearchGetData
            , customertypeDetails, findCustomerId,dataCompanyServiceArray } = this.state;
        // console.log(dataCompanyServiceArray, "======>dataCompanyServiceArray")
        // console.log(customertypeDetails, "======>customertypeDetails")
        // console.log(GetValueCustomerID, "======>GetValueCustomerID")
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Edit Customer" breadcrumbItems={this.state.breadcrumbItems} />
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
                                            {/* start---- Company forms */}
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
                                                            value={this.state.GetValueCustomerID.company_name}
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
                                                            value={this.state.GetValueCustomerID.ownership_type_id}
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
                                                            value={this.state.GetValueCustomerID.gst_no}
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
                                                            value={this.state.GetValueCustomerID.customer_category}
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
                                                            value={this.state.GetValueCustomerID.city}
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
                                                            value={this.state.GetValueCustomerID.pincode}
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
                                                            value={this.state.GetValueCustomerID.state_id}
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
                                                            value={this.state.GetValueCustomerID.country_id}
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
                                                            value={this.state.GetValueCustomerID.address}
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
                                            {/* End------- Company forms */}

                                            {/* Start--- Contact Person Detaills */}
                                            <Card className="card-shaddow-inner">
                                                <h2 style={{ fontSize: "16px", fontWeight: "600", marginTop: "20px" }}>Contact Person Details</h2>

                                                {/*Add----- listing of Array more data */}
                                                <Row  >
                                                    <Col>

                                                        <Button color="primary" className="Add_more_Contact_button"
                                                            style={{ float: "right", marginBottom: "20px" }}
                                                            onClick={this.handleContactAddMore}>
                                                            <i className=" ri-add-fill align-middle ms-2"></i>
                                                            Add Contact Person
                                                        </Button>

                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Table className="mb-3 table-nowrap">
                                                        <thead className="bg-light">
                                                            <tr>
                                                                <th>Action</th>
                                                                <th>Name</th>
                                                                <th>Contact Number</th>
                                                                <th>Email</th>
                                                                <th>Department</th>
                                                                <th>Designation</th>
                                                                <th>Other Contact Number</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {this.state.ContactPersonSearchGetData.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>

                                                                        <Link to="#" className="me-3 text-primary"
                                                                            onClick={() => this.tog_EditContactPerson(item)}
                                                                        >
                                                                            <i className=" ri-edit-box-line font-size-18"></i>
                                                                        </Link>

                                                                        {index === 0 ? null : (
                                                                            <Link to="#" onClick={() => this.handleDeleteContactClick(item)}
                                                                                style={{ backgroundColor: "white", border: "none" }}>
                                                                                <RiDeleteBin6Line style={{ color: "red", fontSize: "18px" }} />
                                                                            </Link>
                                                                        )
                                                                        }


                                                                    </td>
                                                                    <td><p>{item.customer_name}</p></td>
                                                                    <td><p>{item.mobile_no_1}</p></td>
                                                                    <td><p>{item.email}</p></td>
                                                                    <td><p>{item.department_name}</p></td>
                                                                    <td><p>{item.designation_name}</p></td>
                                                                    <td><p>{item.mobile_no_2}</p></td>
                                                                </tr>
                                                            ))}
                                                        </tbody>

                                                    </Table>
                                                </Row>
                                                {/*End---- listing of Array more data */}
                                            </Card>
                                            {/* End---- Contact Person Detaills */}

                                            {/* Start---Company Type */}
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
                                                                        // Check if the item's customer_type_id is in customertypeDetails
                                                                        const isChecked = this.state.customertypeDetails.some(
                                                                            detail => detail.customer_type_id === item.id
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
                                                                                    // checked={isChecked} // Set checked attribute based on whether it matches customertypeDetails
                                                                                    customertypeDetails
                                                                                    defaultChecked={isChecked} // Set defaultChecked attribute for initial default selection
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
                                                            {this.state.isServiceLoading ? (
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
                                                                    {/* {CompanyServiceOffered.length === 0 ? (
                                                                    <tr>
                                                                        <td colSpan="7" className="text-center">
                                                                            No data found
                                                                        </td>
                                                                    </tr>
                                                                ) : (
                                                                    <> */}


                                                                    {this.state.CompanyServiceOffered .map((item, index) => {
                                                                        // Check if the item's service_industry is in customerserviceDetails
                                                                        const isChecked = this.state.customerserviceDetails.some(
                                                                            detail => detail.service_industry === item.service_industry
                                                                        );
                                                                        return (
                                                                            <div className="form-check" key={index}>
                                                                                <input
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
                                                                                                dataCompanyServiceArray: prevState.dataCompanyServiceArray.filter(
                                                                                                    item => item.customer_service_industry_id_encode !== value
                                                                                                )
                                                                                            }));
                                                                                        }
                                                                                    }}
                                                                                    value={item.customer_service_industry_id_encode}
                                                                                    defaultChecked={isChecked} // Set defaultChecked attribute for initial default selection
                                                                                />
                                                                                <label className="form-check-label" htmlFor={`customControlInline-${index}`}>{item.service_industry}</label>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                    
                                                                    {/* </>
                                                                )} */}
                                                                </>
                                                            )}






                                                        </Card>
                                                    </Col>
                                                    {/* End--- Services Offered */}

                                                </Row>
                                            </div>
                                            {/* End---Company Type */}

                                        </Row>
                                        <div style={{ marginTop: "20px" }}>
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
                                        </div>

                                    </AvForm>
                                </CardBody>
                            </Card>
                        )}
                    </Container>
                </div>



                {/* Start--- Add more contactperson model  */}
                <Modal
                    size="xl"
                    isOpen={this.state.ContactAddMore_Model}
                    toggle={this.handleContactAddMore}
                >
                    <ModalHeader toggle={() => this.setState({ ContactAddMore_Model: false })}>
                        Add Contact Person
                    </ModalHeader>
                    <ModalBody>
                        <AvForm
                            className="needs-validation"
                            onValidSubmit={this.handleContactPersonApi}
                        >
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
                                                    inputnumber02: phone,
                                                });

                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center Contactperson" style={{ float: "right" }}>
                                <Row>
                                    <Col lg={8}>
                                        <Button color="primary" type="submit">
                                            Create Row
                                        </Button>
                                    </Col>
                                    <Col lg={4} >
                                        <Button color="secondary" className="cancle_contact_person" onClick={this.handleCancelAddRowModel}>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </AvForm>


                    </ModalBody>
                </Modal>
                {/* End--- Add more contactperson model  */}

                {/* start Delete ConatctPerson Model  */}
                <Modal
                    size="md"
                    isOpen={this.state.modal_small}
                    toggle={this.tog_small}
                    centered={true}
                >
                    <ModalHeader toggle={() => this.setState({ modal_small: false })}>
                        Delete this Contact Person?
                    </ModalHeader>
                    <ModalBody>
                        <p>Once you delete it, it's gone for good.</p>
                    </ModalBody>
                    <Row >
                        <Col md="11" style={{ textAlign: "right", marginBottom: "20px" }}>
                            <Button
                                color="danger"
                                type="submit"
                                className="create_comments"
                                onClick={() => {
                                    this.DeleteContactDataApi(this.state.LeadContactGetUpdateData.id);
                                    this.setState({ modal_small: false });
                                }}
                            >
                                Delete
                            </Button>
                            <Button
                                color="secondary"
                                type="button"
                                className="create_Cancel"
                                onClick={() => this.setState({ modal_small: false })}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Modal>
                {/* End Delete ContactPerson Model  */}

                {/* Start-- Edit ConatctPerson Model  */}
                <Modal
                    size="xl"
                    isOpen={this.state.modal_EditContactPerson}
                    toggle={this.tog_EditContactPerson}

                >
                    <ModalHeader toggle={() => this.setState({ modal_EditContactPerson: false })}>
                        Edit Contact Person
                    </ModalHeader>
                    <ModalBody>
                        <AvForm
                            className="needs-validation"
                            onValidSubmit={this.handleUpdateContactPersonApi}
                        >
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
                                        value={this.state.LeadContactGetUpdateData.customer_name}
                                        errorMessage="Please Provide Name"
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="validationCustom01"
                                        onChange={this.handleInputChangeCompanyName}
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
                                            name="mobile_no_1"
                                            country={"in"}
                                            value={this.state.LeadContactGetUpdateData.mobile_no_1}
                                            enableSearch={true}
                                            errorMessage="Please provide a Number"
                                            id="validationCustom007"
                                            validate={{ required: { value: true } }}
                                            inputStyle={{ width: "100%" }}
                                            style={{ borderRadius: 50 }}
                                            inputProps={{ name: 'mobile', required: true }}
                                            onChange={(phone) => {
                                                this.setState({
                                                    inputnumber: phone,  // Update inputnumber state here
                                                    LeadContactGetUpdateData: {
                                                        ...this.state.LeadContactGetUpdateData,
                                                        mobile_no_1: phone,  // Also update the mobile_no_1 in LeadContactGetUpdateData
                                                    },
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
                                        value={this.state.LeadContactGetUpdateData.email}
                                        placeholder="Email"
                                        type="text"
                                        errorMessage="Please Provide Email"
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="validationCustom01"
                                        onChange={this.handleInputChangeEmail}
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
                                        value={this.state.LeadContactGetUpdateData.designation_id}
                                        type="select"
                                        id="validationCustom04"
                                        // value={this.state.selectedleadreference}
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
                                        value={this.state.LeadContactGetUpdateData.department_id}
                                        type="select"
                                        id="validationCustom04"
                                        // value={this.state.selectedleadreference}
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
                                            name="mobile_no_2"
                                            // value={this.state.LeadContactGetUpdateData.mobile_no_2}
                                            value={this.state.LeadContactGetUpdateData.mobile_no_2}
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
                                                    inputnumber02: phone,  // Update inputnumber state here
                                                    LeadContactGetUpdateData: {
                                                        ...this.state.LeadContactGetUpdateData,
                                                        mobile_no_2: phone,  // Also update the mobile_no_1 in LeadContactGetUpdateData
                                                    },
                                                });
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center Contactperson" style={{ float: "right" }}>
                                <Row>
                                    <Col lg={8}>
                                        <Button color="primary" type="submit">
                                            Update
                                        </Button>
                                    </Col>
                                    <Col lg={4} >
                                        <Button color="secondary" className="cancle_contact_person01" onClick={this.handleCancelAddRowModel}>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </AvForm>
                    </ModalBody>
                </Modal>
                {/* End-- Edit ConatctPerson Model  */}
            </React.Fragment >
        );
    };
};

export default EditCustomer;
