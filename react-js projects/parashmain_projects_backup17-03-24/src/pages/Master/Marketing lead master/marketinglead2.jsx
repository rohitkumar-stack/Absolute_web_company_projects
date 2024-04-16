import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, FormGroup, CardHeader, Input, Table, Modal, ModalHeader, ModalBody, NavItem, NavLink, TabContent, TabPane, Collapse, CardImg } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import {
    CREATE_LEAD_ACTIVITY, CREATE_LEAD_COMMENT, UPDATE_LEAD_COMMENT, DELETE_LEAD_COMMENT, UPDATE_LEAD_ACTIVITY,
    DELETE_LEAD_Activity, UPDATE_LEAD_INQUIRY, CREATE_EXPENSES_ACTIVITY, GET_FOLLOWUP_LIST_BY_ID,
    GET_ALL_CUSTOMER_WO_PAGINATION, GET_CONTACTPERSON_BY_ID, GET_CONTACTPERSON_WO_PAGINATE, CREATE_FOLLOWUP,
    UPDATE_FOLLOWUP, GET_CUSTOMER_BY_ID, UPDATE_APPROVE_EXPENSES, UPDATE_DISAPPROVE_EXPENSES, DELETE_FOLLOWUP,
    GET_ACTIVITY_CONTACTPERSON_BY_ID, GET_HISTORY_BY_ID, GET_EXPENSES_BY_ID, GET_ITEM_SUB_CATEGORY_BY_ID, GET_LEAD_ACTIVITY_BY_ID, GET_LEAD_COMMENTS_BY_ID, GET_LEAD_LOG_BY_ID, GET_LEAD_REFERENCE_BY_ID, GET_LEAD_REFERENCE_WO_PAGINATE, GET_LEAVE_BY_ID, GET_LEDGER_GROUP_BY_ID, GET_MARKETING_LEAD_BY_ID, GET_MARKETING_LEAD_DOCUMENT_BY_ID, GET_OWNERSHIP_BY_ID, GET_OWNERSHIP_WO_PAGINATE, GET_SHIFT_BY_ID, GET_TERMS_CONDITIONS_BY_ID, GET_UNIT_BY_ID, GET_UNIT_MEASURE_BY_ID, GET_USER_BY_ID, GET_WAREHOUSE_BY_ID, UPDATE_COUNTRY, UPDATE_DEPARTMENT, UPDATE_DESIGNATION, UPDATE_DOCUMENT_LEAD, UPDATE_HSN_CODE, UPDATE_ITEM_CATEGORY, UPDATE_ITEM_MAKE, UPDATE_ITEM_SUB_CATEGORY, UPDATE_LEAD_MARKETING, UPDATE_LEAD_REFERENCE, UPDATE_LEAVE, UPDATE_LEDGER_GROUP, UPDATE_OWNERSHIP, UPDATE_SHIFT, UPDATE_TERMS_CONDITIONS, UPDATE_UNIT, UPDATE_UNIT_MEASURE, UPDATE_USER, UPDATE_WAREHOUSE
} from "../../../globals";
import { ThreeDots } from "react-loader-spinner";
import CustomFileInputNew from "../../../components/Common/imagefunction";
import Nav from 'react-bootstrap/Nav';
import img4 from "../../../assets/images/small/img-4.jpg";
import classnames from "classnames";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import SimpleBar from "simplebar-react";
import { ImEye } from "react-icons/im";
import NameCard from "./viewLeadComponents/NameCard";
import CardComp from "./viewLeadComponents/cardcomponent";
import "./viewCommentStyle.scss";
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import { MdCreateNewFolder } from "react-icons/md";
import CreateContactPersonModal from "../contactperson/CreateContactPersonModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { width } from "@mui/system";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

class ViewMarketLead2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Marketing Lead", link: process.env.PUBLIC_URL + "/marketingleadlist" },
                { title: "Lead Dashboard", link: process.env.PUBLIC_URL + "/#" },
            ],
            OpenTextArea: false,
            isLoading1: false,
            selectedFiles: [],
            getById: {},
            Paramdata: [],
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
            currentStep: "1",
            ShowModal: false,
            modal_xlarge: false,
            ActivityModal: false,
            displayedComments: 5,
            LeadComments: [],
            historyData: [],
            LeadLogs: [],
            displayedCommentsforHistory: 5,

            historylistingloader: false,
            LeadHistoryTabledata: [],

            displayedLeadHistory: 5,
            Cardloading: false,
            LeadActivity: [],
            ExpensesListData: [],
            leadactivitylistingloader: false,
            LeadActivityDisplay: 5,
            // PROFILE IMAGE 
            defaultfile: "",
            fileData: "",
            selectedStartDate: null,
            //Button show
            showButtons: false,
            //show EditForms
            ShowCommentsEditForm: null,
            //listcomments Id
            LeadCommentListsId: '',
            //leadUpadteComments
            LeadCommentsGetUpdateData: {
                id: '',
                marketing_lead_id_encode: '',
                comment_text: '',
                // ... other properties
            },
            LeadCommentsDeleteData: {
                id: '',
            },
            //DeleteComments Model
            modal_small: false,
            //GeteContactAllData
            LeadAllContactDetaills: [],
            contactpersonlistData: [],

            //EditActivityModel
            modal_EditActivity: false,
            //ActivityUpdatefeilds
            ActivityGetUpdateData: {
                id: '',
                marketing_lead_id_encode: '',
                subject: '',
                description: '',
                start_dt: '',
                end_dt: '',
                contact_person_id_encode: '',
                expense: '',
                expense_description: '',
                contact_person_name: '',
                activity_id_encode: '',
            },
            //listActivity Id
            LeadActivityListsId: '',
            //Delete Activity Model
            modal_deleteActivity: false,

              //Expenses Activity Model
              modal_expenses: false,
            //inquiryModel 
            InquiryModel: false,
            //InquiryId
            LeadInquiryId: '',
            //Expenses Activity 
            ExpenseActivityModel: false,
            //add More ContactPerson
            contactShow: false,
            FollowUpData: [],
            FollowupUpdateData: {
                id: '',
                marketing_lead_id_encode: '',
                followup_name: '',
                mobile_number: '',
                followup_status_value: '',
                description: '',
                followup_date: '',
                reminder: '',
                followup_status: '',
                status: '',
            },
            //FollowUp
            FollowUpModal: false,
            EditFolloupModel: false,
            FollowUpGetId: '',
            modal_deleteFollowUp: false,
            selectedDate: new Date(),
            maxDate: null, // initially set maxDate to null
            reminderDate: new Date(),// Set initial date to current date
            reeminderdate: '',
            //Expenses Approve Model 
            ApproveModel: false,
            ApproveUpdateData: {
                id: '',
                approved_amount: '',
                approved_notes: '',
                flag: '',
            },

            approvedExpensesDetails:{},
            //Expenses DisApprove Model 
            DisApproveModel: false,
            DisApproveUpdateData: {
                id: '',
                flag: '',
                data:{}
            },
            //Hide DisApproveButton
            approvedExpenses: [], // New state variable to track approved expenses

            //Hide ApproveButton
            DisApprovedExpenses: [],
            contactpersonmasterbyid: '',
            // other state variables
            DisApprovedExpenses: [], // initialize as an empty array
            permanentlyDisapprovedExpenses: [], // initialize as an empty array
            inputnumber: "",
            //ActivityContactPersondata
            ActiviyContactPersnData: [],
            //get Allo ContactPerosn data
            // contactpersonDetailsObject: {
            //     contact_person_name: '',
            //     department_id: '',
            //     department_name: '',
            //     designation_name: '',
            //     designation_id: '',
            //     mobile_no_1: '',
            // },
            contactpersonDetailsObject: [],
            contactpersonDetails: [],
            fileDataPath:""


        };
        this.handleLeadActivity = this.handleLeadActivity.bind(this);
        this.handelExpenseActivityApi = this.handelExpenseActivityApi.bind(this);
        this.handleLeadComments = this.handleLeadComments.bind(this);
        this.tog_xlarge = this.tog_xlarge.bind(this);
        this.ActivityModal = this.ActivityModal.bind(this);

        this.t_col1 = this.t_col1.bind(this);
        this.t_col2 = this.t_col2.bind(this);
        this.t_col3 = this.t_col3.bind(this);
        this.t_col5 = this.t_col5.bind(this);

        //updateComment api
        this.handleUpdateCommentApi = this.handleUpdateCommentApi.bind(this);
        this.handleCommentInputChange = this.handleCommentInputChange.bind(this);
        //DeleteComment Model 
        this.tog_small = this.tog_small.bind(this);
        //DeleteComment Api 
        this.DeleteCommentsDataApi = this.DeleteCommentsDataApi.bind(this);
        //Activity Edit Model 
        this.tog_EditActivity = this.tog_EditActivity.bind(this);
        //DeleteActivity Model 
        this.handleCancelDeleteActivity = this.handleCancelDeleteActivity.bind(this);
        //DeleteActivity Api  
        this.DeleteActivityDataApi = this.DeleteActivityDataApi.bind(this);
        //Inquiry model
        this.handleInquiryModel = this.handleInquiryModel.bind(this);
        //Expenses Activity Model 
        this.handelExpenseModel = this.handelExpenseModel.bind(this);
        //FollowUp Model 
        this.handelFolloupModel = this.handelFolloupModel.bind(this);
        //Followup EditModel 
        this.handelEditFolloupModel = this.handelEditFolloupModel.bind(this);
        //Follow up Create Api 
        this.handelCreateFollowUpApi = this.handelCreateFollowUpApi.bind(this);
        //Approve Expenses api
        this.handleUpdateApproveApi = this.handleUpdateApproveApi.bind(this);
        //Approve Expenses Model 
        this.handelEditApproveModel = this.handelEditApproveModel.bind(this);
        //DisApprove Expenses Model
        this.handelEditDisApproveModel = this.handelEditDisApproveModel.bind(this);

        this.handleDateChange = this.handleDateChange.bind(this);

        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);

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
        //InquiryId value 
        const LeadInquiryId = match.params.id;
        this.setState({ LeadInquiryId: match.params.id });
        // console.log(LeadInquiryId, "=====>LeadInquiryId");

        //FollowUpId value
        const FollowUpGetId = match.params.id;
        this.setState({ FollowUpGetId: match.params.id });
        // console.log(FollowUpGetId, '===>FollowUpGetId');

        //findcontactpersonmasterbyid
        const contactpersonmasterbyid = match.params.id;
        this.setState({ contactpersonmasterbyid: match.params.id });
        // console.log(contactpersonmasterbyid, "====>contactpersonmasterbyid");


        // Parse the pathname to get the id parameter
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        // this.setState({ id: id })
        this.GetHSNCOde(id);
        this.LeadComments(id);
        // this.LeadHistoryByID(id);
        this.LeadActivityByID(id);
        this.GetAllReferenceId();
        this.getAllCustomers();
        this.getAllContacts();
        this.getAllContactsData();
        this.HistoryData(id);

        //GetupdateComments Lists
        this.LeadCommentsGetData(id);
        //getActivityData for update 
        this.GetLeadActivityDateByID(id);
        //Follow-Up
        this.FollowUpDataListsByID(id);
        //getAllActivityContactPersonData
        this.getAllActivityContactsData(id);
        //GET EXPENSES DATA
        this.LeadExpensesByID(id);

        //hide DisApproveButton
        // Retrieve the list of approved expense IDs from localStorage
        const approvedExpenses = JSON.parse(localStorage.getItem('approvedExpenses')) || [];
        this.setState({ approvedExpenses });

        //hide ApproveButton
        // Retrieve the list of approved expense IDs from localStorage
        const DisApprovedExpenses = JSON.parse(localStorage.getItem('DisApprovedExpenses')) || [];
        this.setState({ DisApprovedExpenses });

    }

    // GET LEAD COMMENTS
    async LeadComments(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_LEAD_COMMENTS_BY_ID +
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
                                LeadComments: data.data,
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

    // GET LEAD HISTORY
    // async LeadHistoryByID(id) {
    //     this.setState({
    //         isLoading: true,
    //         historylistingloader: true,
    //     });
    //     var Token = localStorage.getItem("userToken");
    //     try {
    //         fetch(
    //             GET_LEAD_LOG_BY_ID +id,
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
    //                             LeadLogs: data.data,
    //                             LeadHistoryTabledata: data.data
    //                         });
    //                         this.setState({
    //                             isLoading: false,
    //                             historylistingloader: false,
    //                         });
    //                     }
    //                 } else {
    //                     this.setState({
    //                         isLoading: false,
    //                         historylistingloader: false,
    //                     });
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //         this.setState({
    //             isLoading: false,
    //             historylistingloader: false,
    //         });

    //         this.setState({
    //             isLoading: false,
    //             historylistingloader: false,
    //         });
    //     }
    // }

    async HistoryData(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_HISTORY_BY_ID +
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
                    console.log(data, "data")
                    if (data) {
                        if (data.data) {
                            this.setState({
                                historyData: data.data,
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

    // GET LEAD ACTIVITY
    async LeadActivityByID(id) {
        this.setState({
            isLoading: true,
            leadactivitylistingloader: true,
        });

        var Token = localStorage.getItem("userToken");

        try {
            const response = await fetch(
                GET_LEAD_ACTIVITY_BY_ID + id,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (data.result === true && data.data) {
                this.setState({
                    LeadActivity: data.data,
                    leadactivitylistingloader: false,
                });
            } else {
                this.setState({
                    isLoading: false,
                    leadactivitylistingloader: false,
                });
            }
        } catch (error) {
            this.setState({
                isLoading: false,
                leadactivitylistingloader: false,
            });
        }
    }

    //GET EXPENSES DATA
    async LeadExpensesByID(id) {
        this.setState({
            isLoading: true,
            leadactivitylistingloader: true,
        });

        var Token = localStorage.getItem("userToken");

        try {
            const response = await fetch(
                GET_EXPENSES_BY_ID + id,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (data.result === true && data.data) {
                this.setState({
                    ExpensesListData: data.data,
                    leadactivitylistingloader: false,
                });
            } else {
                this.setState({
                    isLoading: false,
                    leadactivitylistingloader: false,
                });
            }
        } catch (error) {
            this.setState({
                isLoading: false,
                leadactivitylistingloader: false,
            });
        }
    }


    //GET FOLLOWUP DATA API 
    async FollowUpDataListsByID(id) {
        this.setState({
            isLoading: true,
            leadactivitylistingloader: true,
        });

        var Token = localStorage.getItem("userToken");

        try {
            const response = await fetch(
                GET_FOLLOWUP_LIST_BY_ID + id,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (data.result === true && data.data) {
                this.setState({
                    FollowUpData: data.data,
                    leadactivitylistingloader: false,
                });
            } else {
                this.setState({
                    isLoading: false,
                    leadactivitylistingloader: false,
                });
            }
        } catch (error) {
            this.setState({
                isLoading: false,
                leadactivitylistingloader: false,
            });
        }
    }

    // GET ALL SENDERS ContatData
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

    // GET ALL ACTIVITY CONTACTPERSON DATA
    async getAllActivityContactsData(id) {
        var Token = localStorage.getItem("userToken");
        try {
            const response = await fetch(GET_ACTIVITY_CONTACTPERSON_BY_ID + id, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.result === true) {
                this.setState({ ActiviyContactPersnData: data.data });
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

    // Add a state variable to keep track of the number of comments to display
    loadMoreComments = () => {
        this.setState((prevState) => ({
            displayedComments: prevState.displayedComments + 10,
        }));
    };
    // Add a state variable to keep track of the number of comments to display
    loadMoreCommentsforhistory = () => {
        this.setState((prevState) => ({
            displayedCommentsforHistory: prevState.displayedCommentsforHistory + 10,
        }));
    };
    handleLoadMore = () => {
        this.setState((prevState) => ({
            LeadActivityDisplay: prevState.LeadActivityDisplay + 10,
        }));
    };

    loadMoreLeadHistory = () => {
        this.setState((prevState) => ({
            displayedLeadHistory: prevState.displayedLeadHistory + 5,
        }));
    };

    getTimeAgo(created_at) {
        const currentTime = new Date();
        const createdAt = new Date(created_at);

        const timeDifference = currentTime - createdAt;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            const remainingMinutes = minutes % 60;
            if (remainingMinutes > 0) {
                return `${hours}h ${remainingMinutes}mins ago`;
            } else {
                return `${hours}h ago`;
            }
        } else if (minutes > 0) {
            return `${minutes}mins ago`;
        } else if (seconds > 0) {
            return `${seconds}secs ago`;
        }
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
            Cardloading: true,
            isLoading1: true,
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
                                Paramdata: data?.data,
                                inputnumber: data.data.mobile_no_1,
                                selectedlead: data.data?.lead_reference_id,
                                selectedCopmany: data.data?.customer_id,
                                selectedcontactperson: data.data?.contact_person_id_encode,
                                status: data.data.status,
                                contactpersonDetails: data.data?.contactpersonDetails,

                            });


                            this.setState({
                                isLoading: false,
                                Cardloading: false,
                                isLoading1: false,
                            });
                        }
                    } else {

                        this.setState({
                            isLoading: false,
                            Cardloading: false,
                            isLoading1: false,
                        });
                    }
                });
            });
        } catch (error) {
            this.setState({
                isLoading: false,
                Cardloading: false,
                isLoading1: false,
            });

            this.setState({
                isLoading: false,
                Cardloading: false,
                isLoading1: false,
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

    // CREATE LEAD ACTIVITY
    async handleLeadActivity(event, values) {
        // console.log(values, "====>valuesactivity");
        // Fetch data first using LeadActivityByID
        // await this.LeadActivityByID(this.state.LeadActivity?.id);
        const { LeadActivityListsId } = this.state;

        var Token = localStorage.getItem("userToken");

        try {
            const response = await fetch(CREATE_LEAD_ACTIVITY, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    marketing_lead_id_encode: this.state.getById.id,
                    subject: values.subject,
                    description: values.description,
                    start_dt: values.startdate,
                    end_dt: values.enddate,
                    contact_person_id_encode: values.selectedcontactperson,
                    // expense: values.expense,
                    // expense_description: values.expensedescription,
                    // status: values.activityStatus,
                }),
            });

            const data = await response.json();

            if (data.result === true) {
                toast("Lead Activity Created Successfully", {
                    type: "success",
                });

                // Call getAllContactsData after successful lead activity creation
                // this.LeadActivityByID(this.state.LeadActivity?.id);

                //Get lists 
                this.LeadActivityByID(LeadActivityListsId);

                this.setState({
                    ActivityModal: false,
                });
            } else {
                toast("Unable to Create Lead Activity", {
                    type: "error",
                });
            }
        } catch (error) {
            toast("Unable to Create Lead Activity", {
                type: "error",
            });
        }
    }

    // CREATE LEAD COMMENT
    handleLeadComments(events, values) {
        var Token = localStorage.getItem("userToken");
        const { LeadCommentListsId } = this.state;

        try {
            fetch(CREATE_LEAD_COMMENT, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    marketing_lead_id_encode: this.state.getById.id,
                    comment_text: values.comment,
                    status: "Active"

                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result == true) {
                        toast("Lead Comment Created Successfully", {
                            type: "success",
                        });
                        //Get lists 
                        this.LeadComments(LeadCommentListsId);
                        // Close button the form
                        this.handleCancelButtonClick();
                        // Reset the form
                        this.form && this.form.reset();


                        this.setState({
                            modal_xlarge: false,
                        });
                    }
                    else {
                        toast("Unable to Create Lead Comment", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to Create Lead Comment", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }

    //CREATE EXPENSES ACTIVITY API
    async handelExpenseActivityApi(event, values, errors) {
        // console.log(values, "====>valuesactivity");
        const { LeadActivityListsId } = this.state;
        var Token = localStorage.getItem("userToken");

        try {
            const response = await fetch(CREATE_EXPENSES_ACTIVITY, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    activity_id_encode: this.state.ActivityGetUpdateData.id,
                    marketing_lead_id_encode: this.state.getById.id,
                    // subject: values.subject,
                    // description: values.description,
                    // start_dt: values.startdate,
                    // end_dt: values.enddate,
                    // contact_person_id_encode: values.selectedcontactperson,
                    expense_attach_file_encode: this.state.fileDataPath,
                    expense: values.expense,
                    expense_description: values.expensedescription,
                    status: "Active",
                }),
            });

            const data = await response.json();

            if (data.result === true) {
                toast("Expenses Activity Created Successfully", {
                    type: "success",
                });

                // Call getAllContactsData after successful lead activity creation
                // this.LeadActivityByID(this.state.LeadActivity?.id);

                //Get lists 
                this.LeadExpensesByID(LeadActivityListsId);
           
               
            } else {
                toast("Unable to Create Lead Activity", {
                    type: "error",
                });
            }
        } catch (error) {
            toast("Unable to Create Lead Activity", {
                type: "error",
            });
        }
        if (errors?.length === 0) {
            // Handle form submission here
            console.log('Form submitted:', values);
      
            // Reset the form
            event.target.reset();
          }
    }

    //CREATE FOLLOW Up API
    async handelCreateFollowUpApi(event, values) {
        const { FollowUpGetId } = this.state;
        var Token = localStorage.getItem("userToken");

        try {
            const response = await fetch(CREATE_FOLLOWUP, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    marketing_lead_id_encode: this.state.getById.id,
                    followup_name: values.followUpName,
                    mobile_number: this.state.inputnumber,
                    description: values.description,
                    followup_date: values.Followupdate,
                    reminder: values.reeminderdate,
                    followup_status: values.followupstatus,
                    status: "Active",
                }),
            });

            const data = await response.json();

            if (data.result === true) {
                toast("FollowUp data Created Successfully", {
                    type: "success",
                });

                //Get lists 
                this.FollowUpDataListsByID(FollowUpGetId);

                // Close button the form
                // this.handleFollowupCloseModel();
                // Reset the form
                this.form && this.form.reset();

                this.setState({
                    FollowUpModal: false,
                });
            } else {
                toast("Unable to Create FollowUp", {
                    type: "error",
                });
            }
        } catch (error) {
            toast("Unable to Create FollowUp", {
                type: "error",
            });
        }
    }



    //start--- updateComments ApiCall 

    // GET LEAD COMMENTS
    async LeadCommentsGetData(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_LEAD_COMMENTS_BY_ID +
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
                                LeadCommentsGetUpdateData: data.data,
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

    // UPDATE COMMENTS API
    handleUpdateCommentApi = (event, values) => {
        // console.log(this.state.LeadCommentsGetUpdateData?.marketing_lead_id_encode , "=======>values");
        const { LeadCommentListsId } = this.state;
        this.setState({
            isLoading: true,
        });

        var Token = localStorage.getItem("userToken");

        try {
            fetch(UPDATE_LEAD_COMMENT + this.state.LeadCommentsGetUpdateData.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    marketing_lead_id_encode: this.state.LeadCommentsGetUpdateData?.marketing_lead_id_encode,
                    comment_text: values.comment,
                }),
            }).then((response) => {
                response.json().then((data) => {
                    console.log("API Response:", data); // Log the full API response for debugging

                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Comment Updated Successfully !", {
                            type: "success",
                        });
                        //Get lists 
                        this.LeadComments(LeadCommentListsId);

                        // Close button the form
                        this.handleCancelEditFormClick();
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

    // End---- updateComments ApiCall   

    //Start ---DeleteComments ApiCall
    async DeleteCommentsDataApi(id) {
        // console.log(this.state.LeadCommentsGetUpdateData?.id , "=======>DeleteCommentsDataApi");
        const { LeadCommentListsId } = this.state;
        this.setState({
            isLoading: true,
        });

        var Token = localStorage.getItem("userToken");

        try {
            const response = await fetch(
                DELETE_LEAD_COMMENT + this.state.LeadCommentsGetUpdateData?.id,
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
                    toast("Comment Deleted Successfully !", {
                        type: "success",
                    });
                    //Get lists 
                    this.LeadComments(LeadCommentListsId);

                    this.props.history.goBack();
                } else {
                    toast(data.message, {
                        type: "error",
                    });
                }
            } else {
                toast("Error deleting comment", {
                    type: "error",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast("Unable to Delete Comment", {
                type: "error",
            });
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }
    //End--- updateComments ApiCall 


    // Start Activity Update api 
    async GetLeadActivityDateByID(id) {
        this.setState({
            isLoading: true,
            leadactivitylistingloader: true,
        });

        var Token = localStorage.getItem("userToken");

        try {
            const response = await fetch(
                GET_LEAD_ACTIVITY_BY_ID + id,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (data.result === true && data.data) {
                this.setState({
                    ActivityGetUpdateData: data.data,
                    leadactivitylistingloader: false,
                });
            } else {
                this.setState({
                    isLoading: false,
                    leadactivitylistingloader: false,
                });
            }
        } catch (error) {
            this.setState({
                isLoading: false,
                leadactivitylistingloader: false,
            });
        }
    }

    handleUpdateActivityApi = (event, values) => {
        // console.log(this.state.LeadCommentsGetUpdateData?.marketing_lead_id_encode , "=======>values");
        // console.log(this.state.LeadCommentsGetUpdateData?.contact_person_id_encode , "=======>contact_person_id_encode");
        const { LeadActivityListsId } = this.state;

        this.setState({
            isLoading: true,
        });

        var Token = localStorage.getItem("userToken");

        try {
            fetch(UPDATE_LEAD_ACTIVITY + this.state.ActivityGetUpdateData.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    marketing_lead_id_encode: this.state.ActivityGetUpdateData?.marketing_lead_id_encode,
                    subject: values.subject,
                    description: values.description,
                    start_dt: values.startdate,
                    end_dt: values.enddate,
                    contact_person_id_encode: this.state.ActivityGetUpdateData?.contact_person_id_encode,
                    // expense: values.expense,
                    // expense_description: values.expensedescription,

                    // comment_text: values.comment,
                }),
            }).then((response) => {
                response.json().then((data) => {
                    console.log("API Response:", data); // Log the full API response for debugging

                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Activity Updated Successfully !", {
                            type: "success",
                        });
                        //Get lists 
                        this.LeadActivityByID(LeadActivityListsId);

                        // Close button the form
                        this.handleModalEditActivityClose();
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
    // End------ Activity Update api 

    //Start ---DeleteActivity ApiCall
    async DeleteActivityDataApi(id) {
        // console.log(this.state.LeadCommentsGetUpdateData?.id , "=======>DeleteCommentsDataApi");
        const { LeadActivityListsId } = this.state;
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");

        try {
            const response = await fetch(
                DELETE_LEAD_Activity + this.state.ActivityGetUpdateData?.id,
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
                    toast("Activity Deleted Successfully !", {
                        type: "success",
                    });
                    //Get lists 
                    this.LeadActivityByID(LeadActivityListsId);

                    this.props.history.goBack();
                } else {
                    toast(data.message, {
                        type: "error",
                    });
                }
            } else {
                toast("Error deleting comment", {
                    type: "error",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast("Unable to Delete Comment", {
                type: "error",
            });
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }
    //End--- DeleteActivity ApiCall 

    //start----UPDATE LEAD INQUIRY
    handleUpdateLeadInquiry = (event, values) => {
        const { LeadInquiryId } = this.state;
        // console.log(LeadInquiryId, "=======>LeadInquiryId")
        this.setState({
            isLoading: true,
        });

        var Token = localStorage.getItem("userToken");

        try {
            fetch(UPDATE_LEAD_INQUIRY + LeadInquiryId, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lead_conversion_status: "1"
                    // comment_text: values.comment,
                }),
            }).then((response) => {
                response.json().then((data) => {
                    console.log("API Response:", data); // Log the full API response for debugging

                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("LeadInquiry Updated Successfully !", {
                            type: "success",
                        });
                        //Get lists 
                        // this.LeadActivityByID(LeadActivityListsId);

                        // Close button the form
                        this.handleCancelInquiryModel();
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
    //End----UPDATE LEAD INQUIRY

    // Start-----Followup Update Api 
    handleUpdateFollowupApi = (event, values) => {
        const { FollowUpGetId } = this.state;

        this.setState({
            isLoading: true,
        });

        var Token = localStorage.getItem("userToken");

        try {
            fetch(UPDATE_FOLLOWUP + this.state.FollowupUpdateData.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    marketing_lead_id_encode: this.state.FollowupUpdateData?.marketing_lead_id_encode,
                    followup_name: values.followUpName,
                    mobile_number: this.state.inputMobileField,
                    description: values.description,
                    followup_date: values.Followupdate,
                    reminder: values.reeminderdate,
                    followup_status: values.followupstatus,
                }),
            }).then((response) => {
                response.json().then((data) => {
                    console.log("API Response:", data); // Log the full API response for debugging

                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Followup Updated Successfully !", {
                            type: "success",
                        });
                        //Get lists 
                        this.FollowUpDataListsByID(FollowUpGetId);

                        // Close button the form
                        this.handleFollowupCloseModel();
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
            toast("Unable to Update Followup", {
                type: "error",
            });

            this.setState({
                isLoading: false,
            });
        }
    };
    //End------Followup Update Api 

    //Start ---DeleteFollowup ApiCall
    async DeleteFollowupDataApi(id) {
        const { FollowUpGetId } = this.state;
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");

        try {
            const response = await fetch(
                DELETE_FOLLOWUP + this.state.FollowupUpdateData?.id,
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
                    toast("FollowUp Deleted Successfully !", {
                        type: "success",
                    });
                    //Get lists 
                    this.FollowUpDataListsByID(FollowUpGetId);

                    // Close button the form
                    this.handleDeleteFollowCloseModel();

                    // this.props.history.goBack();
                } else {
                    toast(data.message, {
                        type: "error",
                    });
                }
            } else {
                toast("Error deleting Followup", {
                    type: "error",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast("Unable to Delete Followup", {
                type: "error",
            });
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }
    //End--- DeleteFollowup ApiCall 

    getFileAcceptValue(index) {
        const { fileDataPath } = this.state;
        const selectedFileType = fileDataPath;
    
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
      handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        const reader = new FileReader();
      
        reader.onloadend = () => {
          const base64Url = reader.result; // Get the Base64 URL
          // Perform any additional processing with the base64Url here, such as setting state
          console.log("base64Url==>",base64Url)
          this.setState({ fileDataPath: base64Url });
        };
      
        if (file) {
          reader.readAsDataURL(file); // Read the file as a data URL (Base64)
        }
      };


    // Start-----Approve Expenses Update Api 
    handleUpdateApproveApi = (event, values) => {
        // console.log(this.state.LeadCommentsGetUpdateData?.marketing_lead_id_encode , "=======>values");
        // console.log(this.state.LeadCommentsGetUpdateData?.contact_person_id_encode , "=======>contact_person_id_encode");
        const { LeadActivityListsId } = this.state;

        this.setState({
            isLoading: true,
        });

        var Token = localStorage.getItem("userToken");

        try {
            fetch(UPDATE_APPROVE_EXPENSES + this.state.ApproveUpdateData.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    approved_amount: values.approveAmount,
                    approved_notes: values.ApproveNotes,
                    flag: "1",
                }),
            }).then((response) => {
                response.json().then((data) => {
                    console.log("API Response:", data); // Log the full API response for debugging

                    if (data.result === true) {
                        // this.props.history.goBack();
                        toast("Approve Expenses Successfully !", {
                            type: "success",
                        });

                        // Add the ID of the approved expense to the approvedExpenses array
                        const updatedApprovedExpenses = [...this.state.approvedExpenses, this.state.ApproveUpdateData.id];
                        this.setState({ approvedExpenses: updatedApprovedExpenses });

                        // Store the updated list of approved expense IDs in localStorage
                        localStorage.setItem('approvedExpenses', JSON.stringify(updatedApprovedExpenses));

                        //Get lists 
                        this.LeadExpensesByID(LeadActivityListsId);

                        // Close button the form
                        this.handleApproveCloseModel();
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
            toast("Unable to Approve Expenses", {
                type: "error",
            });

            this.setState({
                isLoading: false,
            });
        }
    };

    // End-----Approve Expenses Update Api 

    // Start-----DisApprove Expenses Update Api 
    handleUpdateDisApproveApi = (event, values) => {
        // console.log(this.state.LeadCommentsGetUpdateData?.marketing_lead_id_encode , "=======>values");
        // console.log(this.state.LeadCommentsGetUpdateData?.contact_person_id_encode , "=======>contact_person_id_encode");
        const { LeadActivityListsId, DisApproveUpdateData } = this.state;

        this.setState({
            isLoading: true,
        });

        var Token = localStorage.getItem("userToken");

        try {
            fetch(UPDATE_DISAPPROVE_EXPENSES + this.state.DisApproveUpdateData.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    flag: "0",
                }),
            }).then((response) => {
                response.json().then((data) => {
                    console.log("API Response:", data); // Log the full API response for debugging

                    if (data.result === true) {
                        // this.props.history.goBack();
                        toast("DisApprove Expenses Successfully !", {
                            type: "success",
                        });

                        const updatedDisApprovedExpenses = [...this.state.DisApprovedExpenses, DisApproveUpdateData.id];
                        this.setState({ DisApprovedExpenses: updatedDisApprovedExpenses });

                        localStorage.setItem('DisApprovedExpenses', JSON.stringify(updatedDisApprovedExpenses));

                        this.LeadExpensesByID(LeadActivityListsId);
                        this.handleDisApproveCloseModel();
                        this.form && this.form.reset();

                        // Hide Approve button permanently after Disapprove API call
                        this.setState(prevState => ({
                            permanentlyDisapprovedExpenses: [...prevState.permanentlyDisapprovedExpenses, DisApproveUpdateData.id]
                        }));


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
            toast("Unable to DisApprove Expenses", {
                type: "error",
            });

            this.setState({
                isLoading: false,
            });
        }
    };

    // End-----DisApprove Expenses Update Api 



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
        const { contactpersonmasterbyid } = this.state;
        var Token = localStorage.getItem("userToken");
        try {
            await fetch(
                GET_CONTACTPERSON_BY_ID + contactpersonmasterbyid,
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

    toggleCustomJustified(tab) {
        if (this.state.activeTabJustify !== tab) {
            this.setState({
                activeTabJustify: tab
            });
        }
    }

    async tog_xlarge() {
        await this.setState(prevState => ({
            modal_xlarge: !prevState.modal_xlarge
        }));
        this.removeBodyCss();
    }

    async ActivityModal() {
        await this.setState(prevState => ({
            ActivityModal: !prevState.ActivityModal
        }));
        this.removeBodyCss();
    }

    removeBodyCss() {
        document.body.classList.add("no_padding");
    }


    t_col1() {
        this.setState({ col1: !this.state.col1, col2: false, col3: false });
    }
    t_col2() {
        this.setState({ col2: !this.state.col2, col1: false, col3: false });
    }
    t_col3() {
        this.setState({ col3: !this.state.col3, col1: false, col2: false });
    }
    t_col5() {
        this.setState({ col5: !this.state.col5 });
    }

    // Function to format date
    formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-GB', 'at', options);
        return formattedDate;
    };
    //Formate Time With date
    formatTimeDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', };
        const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
        return formattedDate;
    };


    // Function to format TimeAgo
    formatTimeAgo = (dateTimeString) => {
        const currentDate = new Date();
        const pastDate = new Date(dateTimeString);
        const timeDifference = currentDate - pastDate;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) {
            return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        } else if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else {
            // return `${days} day${days !== 1 ? 's' : ''} ago`;
            return this.formatDateTime(dateTimeString)
        }
    };


    // Function to format date and time
    formatDateTime = (dateTimeString) => {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            // second: 'numeric',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        const formattedDateTime = new Date(dateTimeString).toLocaleString('en-GB', options);
        return formattedDateTime;
    };


    handleStartDateChange = (event, value) => {
        this.setState({ selectedStartDate: value });
    };

    //Start---show Hide AddComments Button
    handleInputFieldClick = () => {
        this.setState({ showButtons: true });
    };

    handleCancelButtonClick = () => {
        this.setState({ showButtons: false });
    };

    //Start----Show Hide EditFormcomments 
    handleSaveEditFormClick = (item) => {
        // console.log(item, "====>Items");
        this.setState({
            ShowCommentsEditForm: item.id,
            LeadCommentsGetUpdateData: {
                id: item.id, // Assuming your comment data has an 'id' property
                marketing_lead_id_encode: item.marketing_lead_id,
                comment_text: item.comment_text,
                // Include other properties as needed
            }


        });
    }

    handleCancelEditFormClick = () => {
        this.setState({ ShowCommentsEditForm: false });
    }

    handleCommentInputChange = (event) => {
        const updatedCommentText = event.target.value;
        this.setState((prevState) => ({
            LeadCommentsGetUpdateData: {
                ...prevState.LeadCommentsGetUpdateData,
                comment_text: updatedCommentText,
            },
        }));
    };

    //Start----Show Hide DeleteFormcomments 

    handleDeleteCommentClick(item) {
        this.setState({
            LeadCommentsGetUpdateData: {
                id: item.id,
            },
            modal_small: true,
        });
        this.addBodyCss(); // You might have a method to add CSS for modal display
    }

    tog_small() {
        this.setState((prevState) => ({
            modal_small: !prevState.modal_small,
        }));
        this.removeBodyCss(); // You might have a method to remove CSS for modal display
    }

    //Start----- show Hide Activity EditPage
    tog_EditActivity(item) {
        // console.log(item, "=========>EdiItemActivity");
        this.setState(prevState => ({
            modal_EditActivity: !prevState.modal_EditActivity,
            ActivityGetUpdateData: { // Corrected syntax
                id: item.id,
                marketing_lead_id_encode: item.marketing_lead_id,
                subject: item.subject,
                description: item.description,
                start_dt: item.start_dt,
                end_dt: item.end_dt,
                contact_person_id_encode: item.contact_person,
                expense: item.expense,
                expense_description: item.expense_description,
                contact_person_name: item.contact_person_name,

                // Include other properties as needed
            }
        }));
        this.removeBodyCss();
    }

    handleModalEditActivityClose = () => {
        this.setState({ modal_EditActivity: false });
    };

    // Start--input value Activity 
    handleInputChangeSubject = (event) => {
        const updatedActivityText = event.target.value;
        this.setState((prevState) => ({
            ActivityGetUpdateData: {
                ...prevState.ActivityGetUpdateData,
                subject: updatedActivityText,
            },
        }));
    };
    handleInputChangeDescription = (event) => {
        const updatedActivityText = event.target.value;
        this.setState((prevState) => ({
            ActivityGetUpdateData: {
                ...prevState.ActivityGetUpdateData,
                description: updatedActivityText,

            },
        }));
    };
    handleInputChangeStarDate = (event) => {
        const updatedActivityText = event.target.value;
        this.setState((prevState) => ({
            ActivityGetUpdateData: {
                ...prevState.ActivityGetUpdateData,
                start_dt: updatedActivityText,

            },
        }));
    };
    handleInputChangeEndDate = (event) => {
        const updatedActivityText = event.target.value;
        this.setState((prevState) => ({
            ActivityGetUpdateData: {
                ...prevState.ActivityGetUpdateData,
                end_dt: updatedActivityText,
                expense: updatedActivityText,
                expense_description: updatedActivityText,
            },
        }));
    };
    handleInputChangeExpense = (event) => {
        const updatedActivityText = event.target.value;
        this.setState((prevState) => ({
            ActivityGetUpdateData: {
                ...prevState.ActivityGetUpdateData,
                expense: updatedActivityText,
            },
        }));
    };
    handleInputChangeExpenseDescription = (event) => {
        const updatedActivityText = event.target.value;
        this.setState((prevState) => ({
            ActivityGetUpdateData: {
                ...prevState.ActivityGetUpdateData,
                expense_description: updatedActivityText,
            },
        }));
    };
    handleInputChangeExpensePerson = (event) => {
        const updatedActivityText = event.target.value;
        this.setState((prevState) => ({
            ActivityGetUpdateData: {
                ...prevState.ActivityGetUpdateData,
                contact_person_name: updatedActivityText,
            },
        }));
    };
    //End----- show Hide Activity EditPage

    //Start----- showHide Activity-DeletePage
    handleDeleteApiActivity(item) {
        // console.log(item,"==>DeleteItem")
        this.setState({
            ActivityGetUpdateData: {
                id: item.id,
            },
            modal_deleteActivity: true,
        });
        this.addBodyCss(); // You might have a method to add CSS for modal display
    }

    handleExpensesActivity(item) {
        // console.log(item,"==>DeleteItem")
        this.setState({
            modal_expenses: true,
        });
        this.addBodyCss(); // You might have a method to add CSS for modal display
    }
    handleDeleteActivity(item) {
        this.setState(prevState => ({
            modal_deleteActivity: !prevState.modal_deleteActivity
        }));
        this.removeBodyCss();
    }

    handleCancelDeleteActivity = () => {
        this.setState({ modal_deleteActivity: false });
    }
    //End----- showHide Activity-DeletePage

    // start-------- Inquiry Model

    handleInquiryModel(item) {
        this.setState(prevState => ({
            InquiryModel: !prevState.InquiryModel,
            ActivityGetUpdateData: { // Corrected syntax
                id: item.id,
                marketing_lead_id_encode: item.marketing_lead_id,
                lead_conversion_status: "1",
                // Include other properties as needed
            }
        }));
        this.removeBodyCss();
    }

    handleCancelInquiryModel = () => {
        this.setState({ InquiryModel: false });
    }
    // End-------- Inquiry Model

    addBodyCss() {
        document.body.classList.add("modal-open");
    }

    removeBodyCss() {
        document.body.classList.remove("modal-open");
    }

    //start---------Expenses activity Model 
    handelExpenseModel(item) {
        // console.log(item ,"====>ExpenseActivityValue");
        this.setState({
            ActivityGetUpdateData: {
                id: item.id,
            },
            ExpenseActivityModel: true,

        });
        this.removeBodyCss();
    }
    //End----Expenses Activity Model 

    //start---------Create FollowUp Model 
    async handelFolloupModel(item) {
        await this.setState(prevState => ({
            FollowUpModal: !prevState.FollowUpModal
        }));
        // this.removeBodyCss();
    }
    //End---- Create FollowUp Model 

    //start---------Update FollowUp Model 
    async handelEditFolloupModel(item) {
        console.log(item, "===>UpdateFollowup");
        this.setState({
            FollowupUpdateData: {
                id: item.id,
                marketing_lead_id_encode: item.marketing_lead_id,
                followup_name: item.followup_name,
                mobile_number: item.mobile_number,
                description: item.description,
                followup_date: item.followup_date,
                reminder: item.reminder,
                followup_status: item.followup_status,
                followup_status_value: item.followup_status_value,
                // status: item.id,
            },
            EditFolloupModel: true,
        });
        this.removeBodyCss();
    }

    handleFollowupCloseModel = () => {
        this.setState({ EditFolloupModel: false });
    };
    //End---------Update FollowUp Model 

    // Start--input value Activity 
    handleInputChangeTitle = (event) => {
        const updatedFollowText = event.target.value;
        this.setState((prevState) => ({
            FollowupUpdateData: {
                ...prevState.FollowupUpdateData,
                followup_name: updatedFollowText,
            },
        }));
    };
    handleInputChangePhone = (event) => {
        const updatedFollowText = event.target.value;
        this.setState((prevState) => ({
            FollowupUpdateData: {
                ...prevState.FollowupUpdateData,
                mobile_number: updatedFollowText,
            },
        }));
    };
    handleInputDescription = (event) => {
        const UpdateFollowupText = event.target.value;
        this.setState((prevState) => ({
            FollowupUpdateData: {
                ...prevState.FollowupUpdateData,
                description: UpdateFollowupText,
            },
        }));
    };
    handleInputfollowupDate = (event) => {
        const UpdateFollowupText = event.target.value;
        this.setState((prevState) => ({
            FollowupUpdateData: {
                ...prevState.FollowupUpdateData,
                followup_date: UpdateFollowupText,
            },
        }));
    };
    handleInputreminderDate = (event) => {
        const UpdateFollowupText = event.target.value;
        this.setState((prevState) => ({
            FollowupUpdateData: {
                ...prevState.FollowupUpdateData,
                reminder: UpdateFollowupText,
            },
        }));
    };
    handleInputFollowupStatus = (event) => {
        const UpdateFollowupText = event.target.value;
        this.setState((prevState) => ({
            FollowupUpdateData: {
                ...prevState.FollowupUpdateData,
                followup_status: UpdateFollowupText,
            },
        }));
    };
    //End---- Update FollowUp Model 

    //Start---- FoollowUp Delete Model 

    handleDeleteFollowUp(item) {
        console.log(item, "=======>DeleteFollowID");
        this.setState({
            FollowupUpdateData: {
                id: item.id,
            },
            modal_deleteFollowUp: true,

        })
        this.removeBodyCss();
    }

    //Close Delete Model 
    handleDeleteFollowCloseModel = () => {
        this.setState({ modal_deleteFollowUp: false });
    };
    //Start---- FoollowUp Delete Model 



    //start---- update ExpenseApprove model
    async handelEditApproveModel(item) {
        console.log( "===>ApproveData",item);
        this.setState({
            ApproveUpdateData: {
                id: item.id,
                approved_amount: item.expense,
                approved_notes: item.description,
                flag: '1',
            },
            ApproveModel: true,
            approvedExpensesDetails : item
        });
        this.removeBodyCss();
    }

    handleApproveCloseModel = () => {
        this.setState({ ApproveModel: false });
    };

    //Start------- Update Approval-Expenses Model
    handleInputChangeApproveAmount = (event) => {
        const updatedApproveText = event.target.value;
        this.setState((prevState) => ({
            ApproveUpdateData: {
                ...prevState.ApproveUpdateData,
                approved_amount: updatedApproveText,
            },
        }));
    };
    handleInputApproveNotes = (event) => {
        const updatedApproveText = event.target.value;
        this.setState((prevState) => ({
            ApproveUpdateData: {
                ...prevState.ApproveUpdateData,
                approved_notes: updatedApproveText,
            },
        }));
    };
    //End---- update Approval-Expenses model

    //Start--------- update DisApproval-Expenses Model
    async handelEditDisApproveModel(item) {
        console.log(item, "===>DiappValue");
        this.setState({
            DisApproveUpdateData: {
            id: item.id,
            data: item,
                flag: '0',
            },
            DisApproveModel: true,
        });
        this.removeBodyCss();
    }

    handleDisApproveCloseModel = () => {
        this.setState({ DisApproveModel: false });
    };
    //End------ update DisApproval-Expenses Model

    handleDateChange(date) {
        this.setState({
            selectedDate: date,
            maxDate: date // set maxDate to the selected date
        });
    }

    handleDatePickerChange(date) {
        this.setState({ reminderDate: date });
    }

    handleStartDateChange(event) {
        this.setState({ reeminderdate: event.target.value });
    }


    // handleLeadComments = (event, errors, values) => {
    //     // Add your logic for handling lead comments here
    //     console.log('Lead comments submitted:', values);
    // };

    render() {
        const { displayedComments, LeadComments } = this.state;
        // console.log(LeadComments, "=========>LeadComments");
        const { LeadCommentsGetUpdateData } = this.state;
        // console.log(LeadCommentsGetUpdateData, "========>LeadCommentsGetUpdateData");
        const { displayedCommentsforHistory, LeadLogs, historylistingloader, LeadDescription,
            leadactivitylistingloader, LeadActivityDisplay, LeadActivity, FollowUpData, ContactPersonDescription,
            LeadAllContactDetaills, historyData, contactpersonlist, contactpersonlistData,
            ActiviyContactPersnData, ExpensesListData } = this.state;
        // console.log(ExpensesListData, "========>ExpensesListData");
        const { displayedLeadHistory, LeadHistoryTabledata, isLoading } = this.state;
        // console.log(LeadHistoryTabledata, "========>LeadHistoryTabledata");
        const { Paramdata } = this.state;
        const { defaultfile } = this.state;
        //show hide AddComments Button  
        const { showButtons } = this.state;
        //Show Hide EditFormComments 
        const { ShowCommentsEditForm } = this.state;
        //showHideDeleteComment Model
        const { smShow } = this.state;


        //inquery function
        // document.addEventListener('scroll', function () {
        //     var button = document.querySelector('.lead_inquery');
        //     button.style.transition = 'top 0.5s';
        //     button.style.top = window.scrollY + 'px';
        // });

        //Start--------RolePermission 
        // Retrieve data from localStorage
        const permissionsString = localStorage.getItem("permissionarray");


        // Parse the JSON string into a JavaScript object
        const permissions = JSON.parse(permissionsString);
        console.log(permissions, "====>permissions")
        // this is use for all active permission
        const filteredPermissions = permissions.filter(permission => permission.status === 'Active');
        const customerActive = filteredPermissions?.find(permission => permission.name === "Add Customers Master");
        const leadRafActive = filteredPermissions?.find(permission => permission.name === "Add Reference Master");
        const contactActive = filteredPermissions?.find(permission => permission.name === "Add Contact_person Master");

        //Comments
        const CommentsActive = filteredPermissions?.find(permission => permission.name === "Show Comments");
        const CommentsEditActive = filteredPermissions?.find(permission => permission.name === "Edit Comments");
        const CommentsAddActive = filteredPermissions?.find(permission => permission.name === "Add Comments");
        //Activity
        const ActivityActive = filteredPermissions?.find(permission => permission.name === "Show Activity");
        const ActivityEditActive = filteredPermissions?.find(permission => permission.name === "Edit Activity");
        const ActivityAddActive = filteredPermissions?.find(permission => permission.name === "Add Activity");
        
         //Expense
          const ExpenseActive = filteredPermissions?.find(permission => permission.name === "Show Expense");
          const ExpenseEditActive = filteredPermissions?.find(permission => permission.name === "Edit Expense");
          const ExpenseAddActive = filteredPermissions?.find(permission => permission.name === "Add Expense");

           //Followup
           const FollowupActive = filteredPermissions?.find(permission => permission.name === "Show Followup");
           const FollowupEditActive = filteredPermissions?.find(permission => permission.name === "Edit Followup");
           const FollowupAddActive = filteredPermissions?.find(permission => permission.name === "Add Followup");
    
        const ExpensesActive = filteredPermissions?.find(permission => permission.name === "Show Expense");
        // Calculate the current date in ISO format (YYYY-MM-DD)
        // Get current date and time
        const currentDate = new Date().toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM

        //Show hide DiApprove Button
        const { permanentlyDisapprovedExpenses } = this.state;

        //Get All ContactPerosn 
        // Retrieve the value from localStorage
        var contactpersonDetails = localStorage.getItem('contactpersonDetails');

        // Parse the JSON string back to an object
        var contactpersonDetailsObject = JSON.parse(contactpersonDetails);
        // console.log(contactpersonDetailsObject, "======>contactpersonDetailsObject")

        console.log("testing-----1",this.state.fileDataPath)
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Lead Dashboard" breadcrumbItems={this.state.breadcrumbItems} />
                        {this.state.isLoading1 ? (
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
                                {/* start inquiry button */}
                                <Row>
                                    {/* <div className="sticky-button">
                                        <Button variant="primary lead_inquery" onClick={this.handleInquiryModel}>Inquiry</Button>
                                    </div> */}
                                    <div>
                                        <Button color="primary" className="Inquiry_button" onClick={this.handleInquiryModel} >
                                            Inquiry
                                        </Button>
                                    </div>

                                </Row>
                                {/* end inquiry button */}

                                <Row>
                                    {/* start main col */}
                                    <Col lg={8}>
                                        {/* Start Card of Data */}
                                        <NameCard allUserData={Paramdata} />
                                        {/* End Card of Data */}

                                        <Row>
                                            <Col>
                                                <CardComp allUserData={Paramdata} />
                                            </Col>
                                        </Row>

                                        {/* start Tab  */}
                                        <Row >
                                            <Col lg="12">
                                                <Nav variant="tabs" defaultActiveKey="link-1" >
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="link-1" onClick={() => this.setState({ currentStep: "1" })} >Comments</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="link-3" onClick={() => this.setState({ currentStep: "2" })}>Activities</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="link-5" onClick={() => this.setState({ currentStep: "3" })} >
                                                            History
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="link-6" onClick={() => this.setState({ currentStep: "4" })} >
                                                            Expenses
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="link-7" onClick={() => this.setState({ currentStep: "5" })} >
                                                            Follow Up
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Col>
                                        </Row>
                                        {/* End Tab  */}

                                        <Row className="mt-1">
                                            <Col md="12">

                                                {/* start Comments */}
                                                {this.state.currentStep == "1" && (

                                                    <>
                                                        <Card>
                                                            <CardBody>

                                                                <Row className="mb-2">
                                                                    <Col>
                                                                        <h4 className="card-title">Add Comments</h4>
                                                                    </Col>

                                                                    {/* start coments Add */}
                                                                    {/* <Col>
                                                                        <Button onClick={this.tog_xlarge} style={{ float: "right" }} color="primary">
                                                                            Create Comment<i className="ri-add-fill align-middle ms-1"></i></Button>
                                                                    </Col> */}

                                                                    <Col md="12">
                                                                        <AvForm
                                                                            className="needs-validation"
                                                                            onValidSubmit={this.handleLeadComments}
                                                                            ref={c => (this.form = c)} // Create a ref for the form
                                                                        >
                                                                            <Row className="mt-2">
                                                                                <Col md="12" className="d-inline">
                                                                                    {/* <Label
                                                                                        className="form-label"
                                                                                        htmlFor="validationCustom04"
                                                                                    >
                                                                                        Comment
                                                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                                                    </Label> */}
                                                                                    <AvField
                                                                                        name="comment"
                                                                                        type="text"
                                                                                        id="validationCustom04"
                                                                                        errorMessage="Please Select a subject."
                                                                                        validate={{ required: { value: true } }}
                                                                                        className="form-control"
                                                                                        onClick={this.handleInputFieldClick}
                                                                                    />
                                                                                </Col>
                                                                            </Row>

                                                                            {showButtons && (
                                                                                <Row className="mt-2">
                                                                                    <Col md="3">
                                                                                        <Button
                                                                                            color="primary"
                                                                                            type="submit"
                                                                                            className="create_comments"
                                                                                        >
                                                                                            Save
                                                                                        </Button>
                                                                                        <Button
                                                                                            color="secondary"
                                                                                            type="button"
                                                                                            className="create_Cancel"
                                                                                            onClick={() => {
                                                                                                // Reset the form using the ref
                                                                                                this.handleCancelButtonClick();
                                                                                            }}
                                                                                        >
                                                                                            Cancel
                                                                                        </Button>
                                                                                    </Col>
                                                                                </Row>
                                                                            )}
                                                                        </AvForm>
                                                                    </Col>
                                                                    {/* End coments Add */}

                                                                </Row>

                                                                {/* start coments listing */}
                                                                {/* <Row className="mb-2">
                                                                    <Col>
                                                                        <h4 className="card-title">Comments Lists</h4>
                                                                    </Col>
                                                                </Row> */}

                                                                <div className="table-rep-plugin">
                                                                    <div className="table-responsive mb-0" data-pattern="priority-columns">

                                                                        {/* start table */}
                                                                        <div className="chat-widget">
                                                                            <div className="chat-conversation" >
                                                                                <SimpleBar style={{ maxHeight: "300px" }}>
                                                                                    <ul className="list-unstyled mb-0 pr-3">
                                                                                        {LeadComments.length === 0 ? (
                                                                                            <tr>
                                                                                                <td colSpan="7" className="text-center">
                                                                                                    No data found
                                                                                                </td>
                                                                                            </tr>
                                                                                        ) : (
                                                                                            LeadComments.slice(0, displayedComments).map((item, index) => (

                                                                                                <li key={item.id}>
                                                                                                    <div className="conversation-list">
                                                                                                        <div className="chat-avatar">
                                                                                                            <img src={localStorage.getItem("userImage")} alt="" />
                                                                                                        </div>
                                                                                                        <div className="ctext-wrap">
                                                                                                            <div className="conversation-name">
                                                                                                                {item.name}
                                                                                                                {/* <span className="comment_date">{this.formatDate(item.created_at)} at {this.formatDateTime(item.created_at)}</span> */}
                                                                                                                {/* <span className="comment_date">{this.formatDateTime(item.created_at)}</span> */}

                                                                                                                {/* <span className="comment_date">{this.formatDateTime(item.created_at)}</span> */}
                                                                                                                <span className="comment_date">
                                                                                                                    <i className="mdi mdi-clock-outline align-middle me-1"></i>
                                                                                                                    {this.formatTimeAgo(item.created_at)}
                                                                                                                </span>


                                                                                                            </div>

                                                                                                            <div className="comment_content_dummy">
                                                                                                                <p className="mb-0">
                                                                                                                    {item.comment_text}
                                                                                                                </p>
                                                                                                            </div>

                                                                                                            {this.state.ShowCommentsEditForm !== item.id && (

                                                                                                                <>
                                                                                                                    <div className="Action_comments mt-2">
                                                                                                                        <Link to="#" className="me-3 text-primary"
                                                                                                                            onClick={() => this.handleSaveEditFormClick(item)}
                                                                                                                        >
                                                                                                                            <i className=" ri-edit-box-line font-size-18"></i>
                                                                                                                        </Link>
                                                                                                                        <Link to="#" className="text-danger" onClick={() => this.handleDeleteCommentClick(item)}>
                                                                                                                            <i className="mdi mdi-trash-can font-size-18"></i>
                                                                                                                        </Link>
                                                                                                                    </div>
                                                                                                                </>
                                                                                                            )}

                                                                                                            {/* Start Edit Form comments  */}
                                                                                                            {this.state.ShowCommentsEditForm === item.id && (
                                                                                                                <>
                                                                                                                    <AvForm
                                                                                                                        className="needs-validation"
                                                                                                                        onValidSubmit={this.handleUpdateCommentApi}
                                                                                                                        ref={c => (this.form = c)} // Create a ref for the form
                                                                                                                    >
                                                                                                                        <Row className="mt-2">
                                                                                                                            <Col md="12" className="d-inline">
                                                                                                                                <Label
                                                                                                                                    className="form-label"
                                                                                                                                    htmlFor="validationCustom04"
                                                                                                                                >
                                                                                                                                    Comment
                                                                                                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                                                                                                </Label>
                                                                                                                                <AvField
                                                                                                                                    value={this.state.LeadCommentsGetUpdateData.comment_text}
                                                                                                                                    name="comment"
                                                                                                                                    type="text"
                                                                                                                                    id="validationCustom04"
                                                                                                                                    errorMessage="Please Select a subject."
                                                                                                                                    validate={{ required: { value: true } }}
                                                                                                                                    className="form-control"
                                                                                                                                    onChange={this.handleCommentInputChange}
                                                                                                                                />
                                                                                                                            </Col>
                                                                                                                        </Row>

                                                                                                                        <Row className="mt-2">
                                                                                                                            <Col md="12">
                                                                                                                                <Button
                                                                                                                                    color="primary"
                                                                                                                                    type="submit"
                                                                                                                                    className="create_comments"
                                                                                                                                >
                                                                                                                                    Update
                                                                                                                                </Button>
                                                                                                                                <Button
                                                                                                                                    color="secondary"
                                                                                                                                    type="button"
                                                                                                                                    className="create_Cancel"
                                                                                                                                    onClick={() => {
                                                                                                                                        // Reset the form using the ref
                                                                                                                                        this.handleCancelEditFormClick();
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    Cancel
                                                                                                                                </Button>
                                                                                                                            </Col>
                                                                                                                        </Row>

                                                                                                                    </AvForm>
                                                                                                                </>

                                                                                                            )}
                                                                                                            {/* End Edit Form comments  */}


                                                                                                            {/* <p className="chat-time mb-0">
                                                                                                                <i className="mdi mdi-clock-outline align-middle me-1"></i>
                                                                                                                {this.formatTimeAgo(item.created_at)}
                                                                                                            </p> */}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </li>
                                                                                            ))
                                                                                        )
                                                                                        }



                                                                                    </ul>
                                                                                </SimpleBar>
                                                                            </div>
                                                                        </div>


                                                                        {/* <Table className="mb-0" bordered responsive>

                                                                            <thead>
                                                                                <tr>
                                                                                    <th>User Name</th>
                                                                                    <th>Comment</th>
                                                                                    <th>Date</th>
                                                                                    <th>Contact Person Name</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {LeadComments.length === 0 ? (
                                                                                    <tr>
                                                                                        <td colSpan="7" className="text-center">
                                                                                            No data found
                                                                                        </td>
                                                                                    </tr>
                                                                                ) : (
                                                                                    LeadComments.slice(0, displayedComments).map((item, index) => (
                                                                                        <tr>
                                                                                            <th >{item.name}</th>
                                                                                            <td>{item.comment_text}</td>
                                                                                            <td>{this.formatDate(item.created_at)}</td>
                                                                                            <td>Test User</td>
                                                                                        </tr>
                                                                                    ))
                                                                                )
                                                                                }
                                                                            </tbody>
                                                                        </Table> */}
                                                                        {/* End table */}


                                                                        {displayedComments < LeadComments.length && (
                                                                            <button onClick={this.loadMoreComments}
                                                                                className="btn btn-link load_more">
                                                                                See More
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {/* End coments listing */}


                                                                {/* Start Edit Form comments  */}
                                                                {/* {ShowCommentsEditForm && (
                                                                    <>
                                                                        <AvForm
                                                                            className="needs-validation"
                                                                            onValidSubmit={this.handleUpdateCommentApi}
                                                                            ref={c => (this.form = c)} // Create a ref for the form
                                                                        >
                                                                            <Row className="mt-2">
                                                                                <Col md="12" className="d-inline">
                                                                                    <Label
                                                                                        className="form-label"
                                                                                        htmlFor="validationCustom04"
                                                                                    >
                                                                                        Comment
                                                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                                                    </Label>
                                                                                    <AvField
                                                                                        value={this.state.LeadCommentsGetUpdateData.comment_text}
                                                                                        name="comment"
                                                                                        type="text"
                                                                                        id="validationCustom04"
                                                                                        errorMessage="Please Select a subject."
                                                                                        validate={{ required: { value: true } }}
                                                                                        className="form-control"
                                                                                        onChange={this.handleCommentInputChange}
                                                                                    />
                                                                                </Col>
                                                                            </Row>

                                                                            <Row className="mt-2">
                                                                                <Col md="3">
                                                                                    <Button
                                                                                        color="primary"
                                                                                        type="submit"
                                                                                        className="create_comments"
                                                                                    >
                                                                                        Update
                                                                                    </Button>
                                                                                    <Button
                                                                                        color="secondary"
                                                                                        type="button"
                                                                                        className="create_Cancel"
                                                                                        onClick={() => {
                                                                                            // Reset the form using the ref
                                                                                            this.handleCancelEditFormClick();
                                                                                        }}
                                                                                    >
                                                                                        Cancel
                                                                                    </Button>
                                                                                </Col>
                                                                            </Row>

                                                                        </AvForm>
                                                                    </>

                                                                )} */}
                                                                {/* End Edit Form comments  */}


                                                            </CardBody>
                                                        </Card>
                                                    </>

                                                )}
                                                {/* End Comments */}

                                                {/* start Activity */}
                                                {this.state.currentStep == "2" && (

                                                    <>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <Card>
                                                                    <CardBody>
                                                                        <Row className="mb-2">
                                                                            <Col>

                                                                                <h4 className="card-title">Activities</h4>
                                                                            </Col>
                                                                            <Col>
                                                                                <Button onClick={this.ActivityModal} style={{ float: "right" }} color="primary">
                                                                                    Create Activity<i className="ri-add-fill align-middle ms-1"></i></Button>
                                                                            </Col>
                                                                        </Row>

                                                                        <Row lg="12">
                                                                            <div className="table-rep-plugin">
                                                                                <div className="table-responsive mb-0" data-pattern="priority-columns">
                                                                                    <SimpleBar style={{ maxHeight: "300px" }}>
                                                                                        <ul className="list-unstyled mb-0 pr-3">
                                                                                            {leadactivitylistingloader ? (
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
                                                                                            ) : (
                                                                                                <div>
                                                                                                    <Table id="tech-companies-1" bordered responsive className="activity_tables">
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                <th data-priority="`1">Action</th>
                                                                                                                <th data-priority="1">Subject</th>
                                                                                                                <th data-priority="3">Description</th>
                                                                                                                <th data-priority="3">Contact Person</th>
                                                                                                                {/* {
                                                                                                                    ExpensesActive?.status == "Active" && (
                                                                                                                        <th data-priority="3">Expenses</th>
                                                                                                                    )} */}
                                                                                                                    
                                                                                                                    <th data-priority="3">Expenses</th>
                                                                                                                <th data-priority="3">Status</th>
                                                                                                                <th data-priority="3">Followup</th>
                                                                                                                <th data-priority="6">Expense</th>
                                                                                                                <th data-priority="6">Expense Description</th>
                                                                                                                {/* <th data-priority="1">Start Date</th>
                                                                                                                <th data-priority="3">End Date</th> */}
                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            {LeadActivity.length === 0 ? (
                                                                                                                <tr>
                                                                                                                    <td colSpan="7" className="text-center">
                                                                                                                        No data found
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            ) : (
                                                                                                                LeadActivity.slice(0, LeadActivityDisplay).map((item, index) => (
                                                                                                                    <tr key={index}>
                                                                                                                        <td>
                                                                                                                            <Row>
                                                                                                                                <Col xl={4}>
                                                                                                                                    <Link to="#" className="me-3 text-primary"
                                                                                                                                        onClick={() => this.tog_EditActivity(item)}
                                                                                                                                    >
                                                                                                                                        <i className=" ri-edit-box-line font-size-18"></i>
                                                                                                                                    </Link>
                                                                                                                                </Col>
                                                                                                                                <Col xl={4}>
                                                                                                                                    <Link to="#" className="text-danger" onClick={() => this.handleDeleteApiActivity(item)}>
                                                                                                                                        <i className="mdi mdi-trash-can font-size-18"></i>
                                                                                                                                    </Link>
                                                                                                                                </Col>
                                                                                                                                <Col xl={4}>
                                                                                                                                    <Link to="#" className="text-success" onClick={() => this.handleExpensesActivity(item)}>
                                                                                                                                        
                                                                                                                                        <i class="fas fa-eye font-size-18 pt-1"></i> 
                                                                                                                                    </Link>
                                                                                                                                </Col>

                                                                                                                            </Row>
                                                                                                                        </td>
                                                                                                                        <td>{item.subject}</td>
                                                                                                                        <td>{item.description}</td>
                                                                                                                        <td>{item.contact_person_name}</td>

                                                                                                                        {/* {
                                                                                                                            ExpensesActive?.status == "Active" && (
                                                                                                                                <td>
                                                                                                                                
                                                                                                                                    {item.expense ? (
                                                                                                                                        <>
                                                                                                                                            <Button color="primary" onClick={() => this.handelExpenseModel(item)} className="Expensesactivity">
                                                                                                                                         Approve
                                                                                                                                        </Button>
                                                                                                                                        </>
                                                                                                                                    ) : (
                                                                                                                                        <div>
                                                                                                                                            <Button color="primary" onClick={() => this.handelExpenseModel(item)} className="Expensesactivity">
                                                                                                                                                ADD
                                                                                                                                            </Button>

                                                                                                                                        </div>
                                                                                                                                    )}

                                                                                                                                </td>

                                                                                                                            )
                                                                                                                        } */}

                                                                                                                                                        <div>
                                                                                                                                            <Button color="primary" onClick={() => this.handelExpenseModel(item)} className="Expensesactivity">
                                                                                                                                                ADD
                                                                                                                                            </Button>

                                                                                                                                        </div>

                                                                                                                        <td>
                                                                                                                            {item.status}
                                                                                                                        </td>


                                                                                                                        <td>
                                                                                                                            {/* Conditionally render "Add Followup" button */}
                                                                                                                            {item.status === 'Open' ? (
                                                                                                                                <Button color="primary" className="Expensesactivity" onClick={() => this.handelFolloupModel(item)}>
                                                                                                                                    ADD
                                                                                                                                </Button>
                                                                                                                            ) : (
                                                                                                                                <>
                                                                                                                                </>
                                                                                                                                // <span>No Followup</span>
                                                                                                                            )}

                                                                                                                        </td>

                                                                                                                        <td>{item.expense}

                                                                                                                            {/* <Link to="#" className="me-3 text-primary Expensesactivity"
                                                                                                                                         onClick={() =>this.handelExpenseModel(item)}
                                                                                                                                         style={{ marginTop: '10px', marginLeft: '10px' }}
                                                                                                                                    >
                                                                                                                                        <i className=" ri-edit-box-line font-size-16"></i>
                                                                                                                                    </Link> */}

                                                                                                                        </td>
                                                                                                                        <td>{item.expense_description}</td>
                                                                                                                        {/* <td>{this.formatDate(item.start_dt)}</td>
                                                                                                                        <td>{this.formatDate(item.end_dt)}</td> */}
                                                                                                                    </tr>
                                                                                                                ))

                                                                                                            )}
                                                                                                        </tbody>
                                                                                                    </Table>
                                                                                                    <div>
                                                                                                    </div>

                                                                                                </div>
                                                                                            )}
                                                                                        </ul>
                                                                                    </SimpleBar>

                                                                                    {/* Load More button */}
                                                                                    {LeadActivityDisplay < LeadActivity.length && (
                                                                                        <button onClick={this.handleLoadMore}
                                                                                            className="btn btn-link load_more">
                                                                                            Load More
                                                                                        </button>
                                                                                    )}
                                                                                    {/* ... */}
                                                                                </div>
                                                                            </div>
                                                                        </Row>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                    </>

                                                )}
                                                {/* start Activity */}

                                                {/* start History */}
                                                {this.state.currentStep == "3" && (

                                                    <>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <Card>
                                                                    <CardBody>
                                                                        <Row className="mb-2">
                                                                            <Col>
                                                                                <h4 className="card-title">History</h4>
                                                                            </Col>
                                                                            <Col>
                                                                                {/* <Button onClick={this.tog_xlarge} style={{ float: "right" }} color="primary">
                                                                            <ImEye
                                                                                style={{
                                                                                    color: "#fffff",
                                                                                    width: "20px",
                                                                                    cursor: 'pointer',
                                                                                    alignSelf: "center"
                                                                                }}
                                                                            />
                                                                            View </Button> */}
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <div className="table-rep-plugin">
                                                                                <div className="table-responsive mb-0" data-pattern="priority-columns">
                                                                                    <SimpleBar style={{ maxHeight: "300px" }}>
                                                                                        <ul className="list-unstyled mb-0 pr-3">
                                                                                            {historylistingloader ? (
                                                                                                // Render loading state if needed
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
                                                                                            ) : (
                                                                                                <div>
                                                                                                    <Table id="tech-companies-1" bordered responsive>
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                <th style={{ fontWeight: "600", fontSize: "14px" }}>Feild Name </th>
                                                                                                                <th style={{ fontWeight: "600", fontSize: "14px" }}>New Value</th>
                                                                                                                <th style={{ fontWeight: "600", fontSize: "14px" }}>Old Value</th>

                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            {historyData.length === 0 ? (
                                                                                                                <tr>
                                                                                                                    <td colSpan="7" className="text-center">
                                                                                                                        No data found
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            ) : (

                                                                                                                historyData.slice(0, displayedLeadHistory).map((item, index) => (
                                                                                                                    <tr key={index}>
                                                                                                                        {/* <th>GOOG <span className="co-name">Google Inc.</span></th> */}
                                                                                                                        <td>{item.value_name.replace(/_/g, '')}</td>
                                                                                                                        <td>
                                                                                                                            {/* <span style={{fontSize:"16px"}}>{item.value_name}:</span> */}
                                                                                                                            <span style={{ fontSize: "14px" }}>{item.new_value}</span>
                                                                                                                        </td>
                                                                                                                        <td>{item.old_value}</td>

                                                                                                                    </tr>
                                                                                                                ))
                                                                                                            )}
                                                                                                        </tbody>
                                                                                                    </Table>
                                                                                                    {displayedLeadHistory < historyData.length && (
                                                                                                        <button onClick={this.loadMoreLeadHistory} className="btn btn-link" style={{ marginLeft: "300px" }}>
                                                                                                            Load More
                                                                                                        </button>
                                                                                                    )}
                                                                                                </div>
                                                                                            )}
                                                                                        </ul>
                                                                                    </SimpleBar>
                                                                                </div>
                                                                            </div>
                                                                        </Row>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                    </>

                                                )}
                                                {/* End History */}

                                                {/* start Expense Approve DisApprove */}
                                                {this.state.currentStep == "4" && (

                                                    <>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <Card>
                                                                    <CardBody>
                                                                        <Row className="mb-2">
                                                                            <Col>

                                                                                <h4 className="card-title">Expenses test</h4>
                                                                            </Col>
                                                                            {/* <Col>
                                                                                <Button onClick={this.ActivityModal} style={{ float: "right" }} color="primary">
                                                                                    Create Activity<i className="ri-add-fill align-middle ms-1"></i></Button>
                                                                            </Col> */}
                                                                        </Row>

                                                                        <Row lg="12">
                                                                            <div className="table-rep-plugin">
                                                                                <div className="table-responsive mb-0" data-pattern="priority-columns">
                                                                                    <SimpleBar style={{ maxHeight: "300px" }}>
                                                                                        <ul className="list-unstyled mb-0 pr-3">
                                                                                            {leadactivitylistingloader ? (
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
                                                                                            ) : (
                                                                                                <div>
                                                                                                    <Table id="tech-companies-1" bordered responsive className="activity_tables">
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                {/* <th data-priority="`1">Action</th> */}
                                                                                                                {/* <th data-priority="1">Subject</th>
                                                                                                                <th data-priority="3">Description</th> */}
                                                                                                                    {
                                                                                                                    ExpensesActive?.status == 'Active' && (
                                                                                                                        <>
                                                                                                                            <th data-priority="3">Access</th>
                                                                                                                            </>
                                                                                                                        )}

                                                                                                                <th data-priority="6">Expense Proof</th>
                                                                                                                <th data-priority="6">Expense Amount</th>
                                                                                                                <th data-priority="6">Expense Description</th>
                                                                                                                <th data-priority="3">Expense Added By</th>
                                                                                                                {
                                                                                                                    ExpensesActive?.status == 'Active' && (
                                                                                                                        <>
                                                                                                                          
                                                                                                                            <th data-priority="1">Approved Amount</th>
                                                                                                                            <th data-priority="3">Approval Notes</th>
                                                                                                                        </>

                                                                                                                    )
                                                                                                                }

                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            {ExpensesListData.length === 0 ? (
                                                                                                                <tr>
                                                                                                                    <td colSpan="7" className="text-center">
                                                                                                                        No data found
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            ) : (
                                                                                                                ExpensesListData.slice(0, LeadActivityDisplay).map((item, index) => {
                                                                                                                    console.log("testing===>123",item)
                                                                                                                    return (
                                                                                                                        <tr key={index}>
                                                                                                                        {item.expense ? (
                                                                                                                                            <>
                                                                                                                                                <div key={item.id} className="d-flex justify-content-between">
                                                                                                                                                    <div className="w-50">
                                                                                                                                                        { this.state.approvedExpenses.includes(item.id) ? 
                                                                                                                                                         <Button color="success"
                                                                                                                                                        
                                                                                                                                                        className="Expensesactivity" style={{ display: this.state.DisApprovedExpenses.includes(item.id) || permanentlyDisapprovedExpenses.includes(item.id) ? 'none' : 'block' }}>
                                                                                                                                                      
                                                                                                                                                        Approved
                                                                                                                                                    </Button> :
                                                                                                                                                    
                                                                                                                                                    <Button color="success" onClick={() => this.handelEditApproveModel(item)}
                                                                                                                                                    className="Expensesactivity" style={{ display: this.state.DisApprovedExpenses.includes(item.id) || permanentlyDisapprovedExpenses.includes(item.id) ? 'none' : 'block' }}>
                                                                                                                                                    {/* Approve */}
                                                                                                                                                    <FaCheckCircle  size={20}/>
                                                                                                                                                     </Button>
                                                                                                                                                    
                                                                                                                                                    }
                                                                                                                                                 
                                                                                                                                                    </div>

                                                                                                                                                    <div className="w-50">
                                                                                                                                                        <Button color="danger" onClick={() => this.handelEditDisApproveModel(item)}
                                                                                                                                                            className="Expensesactivity" style={{ display: this.state.approvedExpenses.includes(item.id) ? 'none' : 'block' }}>
                                                                                                                                                          <IoIosCloseCircle size={20}/>
                                                                                                                                                        </Button>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </>
                                                                                                                                        ) : (
                                                                                                                                            <div>
                                                                                                                                                {/* <Button color="primary" onClick={() => this.handelExpenseModel(item)} className="Expensesactivity">
                                                                                                                                    ADD
                                                                                                                                </Button>
                                                                                                                                <Button color="primary" onClick={() => this.handelExpenseModel(item)} className="Expensesactivity">
                                                                                                                                    Approve
                                                                                                                                </Button> */}
                                                                                                                                            </div>
                                                                                                                                        )}
                                                                                                                        <td><img src={item.expense_attach_file} alt="exapnce-img"
                                                                                                                         style={{

                                                                                                                                width:'100px',
                                                                                                                                height:'auto'

                                                                                                                        }} />
                                                                                                                        
                                                                                                                        </td>
                                                                                                                        <td>{item.expense}</td>
                                                                                                                        <td>{item.expense_description}</td>
                                                                                                                        <td>{item.tenant_name}</td>
                                                                                                                        {
                                                                                                                            ExpensesActive?.status == 'Active' && (
                                                                                                                                <>
                                                                                                                                    <td>{item.approved_amount}</td>
                                                                                                                                    <td>{item.approved_notes}</td>
                                                                                                                                </>

                                                                                                                            )
                                                                                                                        }



                                                                                                                        {/* <td>{this.formatDate(item.start_dt)}</td>
                                                                                                                        <td>{this.formatDate(item.end_dt)}</td> */}
                                                                                                                    </tr>

                                                                                                                    )
                                                                                                                    
                                                                                                                    })

                                                                                                            )}
                                                                                                        </tbody>
                                                                                                    </Table>
                                                                                                    <div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )}
                                                                                        </ul>
                                                                                    </SimpleBar>

                                                                                    {/* Load More button */}
                                                                                    {LeadActivityDisplay < ExpensesListData.length && (
                                                                                        <button onClick={this.handleLoadMore}
                                                                                            className="btn btn-link load_more">
                                                                                            Load More
                                                                                        </button>
                                                                                    )}
                                                                                    {/* ... */}
                                                                                </div>
                                                                            </div>
                                                                        </Row>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                )}
                                                {/* start Follow Up */}

                                                {/* start Follow Up */}
                                                {this.state.currentStep == "5" && (
                                                    
                                                    <>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <Card>
                                                                    <CardBody>
                                                                        <Row className="mb-2">
                                                                            <Col>

                                                                                <h4 className="card-title">FollowUp</h4>
                                                                            </Col>
                                                                            {/* <Col>
                                                                                <Button onClick={this.handelFolloupModel} style={{ float: "right" }} color="primary">
                                                                                    Create FollowUp<i className="ri-add-fill align-middle ms-1"></i></Button>
                                                                            </Col> */}
                                                                        </Row>

                                                                        <Row lg="12">
                                                                            <div className="table-rep-plugin">
                                                                                <div className="table-responsive mb-0" data-pattern="priority-columns">
                                                                                    <SimpleBar style={{ maxHeight: "300px" }}>
                                                                                        <ul className="list-unstyled mb-0 pr-3">
                                                                                            {leadactivitylistingloader ? (
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
                                                                                            ) : (
                                                                                                <div>
                                                                                                    <Table id="tech-companies-1" bordered responsive className="activity_tables">
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                <th data-priority="`1">Action</th>
                                                                                                                <th data-priority="1">Name</th>
                                                                                                                <th data-priority="1">Mobile Number</th>
                                                                                                                <th data-priority="3">Description</th>
                                                                                                                <th data-priority="3">Followup Date</th>
                                                                                                                <th data-priority="3">Reeminder Date</th>
                                                                                                                <th data-priority="6">Status</th>

                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            {FollowUpData.length === 0 ? (
                                                                                                                <tr>
                                                                                                                    <td colSpan="7" className="text-center">
                                                                                                                        No data found
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            ) : (
                                                                                                                FollowUpData.slice(0, LeadActivityDisplay).map((item, index) => (
                                                                                                                    <tr key={index}>
                                                                                                                        <td>
                                                                                                                            <Row>
                                                                                                                                <Col xl={4}>
                                                                                                                                    <Link to="#" className="me-3 text-primary"
                                                                                                                                        onClick={() => this.handelEditFolloupModel(item)}
                                                                                                                                    >
                                                                                                                                        <i className=" ri-edit-box-line font-size-18"></i>
                                                                                                                                    </Link>
                                                                                                                                </Col>
                                                                                                                                <Col xl={4}>
                                                                                                                                    <Link to="#" className="text-danger" onClick={() => this.handleDeleteFollowUp(item)}>
                                                                                                                                        <i className="mdi mdi-trash-can font-size-18"></i>
                                                                                                                                    </Link>
                                                                                                                                </Col>

                                                                                                                            </Row>
                                                                                                                        </td>
                                                                                                                        <td>{item.followup_name}</td>
                                                                                                                        <td>{item.mobile_number}</td>
                                                                                                                        <td>{item.description}</td>
                                                                                                                        <td>{this.formatTimeDate(item.followup_date)}</td>
                                                                                                                        <td>{this.formatTimeDate(item.reminder)}</td>
                                                                                                                        <td>{item.followup_status}</td>
                                                                                                                    </tr>
                                                                                                                ))

                                                                                                            )}
                                                                                                        </tbody>
                                                                                                    </Table>
                                                                                                    <div>
                                                                                                    </div>

                                                                                                </div>
                                                                                            )}
                                                                                        </ul>
                                                                                    </SimpleBar>

                                                                                    {/* Load More button */}
                                                                                    {LeadActivityDisplay < FollowUpData.length && (
                                                                                        <button onClick={this.handleLoadMore}
                                                                                            className="btn btn-link load_more">
                                                                                            Load More
                                                                                        </button>
                                                                                    )}
                                                                                    {/* ... */}
                                                                                </div>
                                                                            </div>
                                                                        </Row>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                )}
                                                {/* start Follow Up */}


                                            </Col>
                                        </Row>

                                    </Col>
                                    {/* End main col */}

                                    {/* start Basic Lead Details */}
                                    <Col lg="4">
                                        <Card style={{ boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.1)" }}>
                                            <CardHeader>
                                                <h5 className="p-1">Basic Lead Details</h5>
                                            </CardHeader>
                                            <CardBody>
                                                {this.state.Cardloading ? (
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
                                                            <h6 className="mt-2 p-2 border-top border-bottom"><b>Lead Details </b></h6>
                                                            <Col >

                                                                <div className="p-2">
                                                                    <b>Lead Topic:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}>{this.state.getById.lead_topic}</span>
                                                                </div>
                                                                <div className="p-2">
                                                                    <b>Lead Nature:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}> {this.state.getById.nature_of_lead}</span>
                                                                </div>
                                                                <div className="p-2">
                                                                    <b>Lead Type:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}>{this.state.getById.lead_type}</span>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className="p-2">
                                                                    <b>Lead Status:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}> {this.state.getById.lead_status}</span>
                                                                </div>
                                                                <div className="p-2">
                                                                    <b>Priority:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}>  {this.state.getById.priority}</span>
                                                                </div>
                                                                <div className="p-2">
                                                                    <b>Lead Topic:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}> {this.state.getById.lead_topic}</span>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-2  border-top">
                                                            <h6 className="p-2 border-bottom"><b>Company Details</b></h6>
                                                            <Col lg="6">
                                                                <div className="p-2">
                                                                    <b>Company Name:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}>  {this.state.Companydescription.company_name}</span>
                                                                </div>
                                                                <div className="p-2">
                                                                    <b>Customer Category:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}> {this.state.Companydescription.customer_category}</span>
                                                                </div>
                                                                <div className="p-2">
                                                                    <b>Customer Type:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}> {this.state.Companydescription.customer_type}</span>
                                                                </div>
                                                            </Col>
                                                            <Col lg="6">
                                                                <div className="p-2">
                                                                    <b>Customer Field Description :</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}>  {this.state.getById.customer_field_description}</span>
                                                                </div>
                                                                <div className="p-2">
                                                                    <b>Ownership Type:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}>{this.state.Companydescription.ownership_name}</span>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-2  border-top">
                                                            <h6 className="p-2 border-bottom"><b>Reference Details</b></h6>
                                                            <Col lg="6">
                                                                <div className="p-2">
                                                                    <b>Lead Reference Type:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}> {this.state.LeadDescription.name}</span>
                                                                </div>
                                                                <div className="p-2">
                                                                    <b>Lead Reference Description:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}>  {this.state.LeadDescription.description}</span>
                                                                </div>

                                                            </Col>
                                                            <Col lg="6">
                                                                <div className="p-2">
                                                                    <b>Reference Person Details:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}> {this.state.getById.reference_person_description}</span>
                                                                </div>
                                                                <div className="p-2">
                                                                    <b>Comment:</b>
                                                                    <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}> {this.state.getById.comments}</span>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-2  border-top">
                                                            <h6 className="p-2 border-bottom"><b>Contact Person Details</b></h6>
                                                            {/* {contactpersonDetailsObject && contactpersonDetailsObject.length > 0 && contactpersonDetailsObject.map((item) => ( */}
                                                            {this.state.contactpersonDetails.map((item, index) => (
                                                                <>
                                                                    <Col lg="6">
                                                                        <div className="p-2">
                                                                            <b>Contact Person:</b>
                                                                            <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}>{item.contact_person_name}</span>
                                                                        </div>
                                                                        <div className="p-2">
                                                                            <b>Contact Person Phone No:</b>
                                                                            <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}>{item.mobile_no_1}</span>
                                                                        </div>

                                                                    </Col>
                                                                    <Col lg="6">
                                                                        <div className="p-2">
                                                                            <b>Contact Person Department:</b>
                                                                            <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}>{item.department_name}</span>
                                                                        </div>
                                                                        <div className="p-2">
                                                                            <b>Contact Person Designation:</b>
                                                                            <span style={{ fontSize: "14px", marginLeft: "6px", color: "#676363" }}>{item.designation_name}</span>
                                                                        </div>
                                                                    </Col>
                                                                    <hr style={{ height: "1px", color: "#e3e3e3" }} />

                                                                </>
                                                            ))
                                                            }

                                                        </Row>
                                                    </>
                                                )}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    {/* End Basic Lead Details */}
                                </Row>


                                {/* CREATE COMMENT */}
                                {/* <Modal
                                    // size="xl"
                                    isOpen={this.state.modal_xlarge}
                                    toggle={this.tog_xlarge} >
                                    <ModalHeader toggle={() => this.setState({ modal_xlarge: false })}>
                                        Create Lead Comment
                                    </ModalHeader>
                                    <ModalBody>
                                        <Row>
                                            <Col md="12">
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handleLeadComments}>
                                                    <Row className="mt-2">
                                                        <Col md="10" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Comment
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="comment"
                                                                type="text"
                                                                id="validationCustom04"
                                                                errorMessage="Please Select a subject."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                            >
                                                            </AvField>
                                                        </Col>
                                                    </Row>
                                                    <Button color="primary" type="submit" >
                                                        Create Comment
                                                    </Button>
                                                </AvForm>
                                            </Col>
                                            {/* <Col md="4">
                                                <div id="accordion">
                                                    <Card className="mb-1 shadow-none">
                                                        <Link to="#" onClick={this.t_col1} style={{ cursor: "pointer" }} className="text-dark" >
                                                            <CardHeader id="headingOne">
                                                                <h6 className="m-0 font-14">
                                                                    More Details
                                                                    <i className={this.state.col1 ? "mdi mdi-minus float-end accor-plus-icon" : "mdi mdi-plus float-end accor-plus-icon"}></i>
                                                                </h6>
                                                            </CardHeader>
                                                        </Link>
                                                        <Collapse isOpen={this.state.col1}>
                                                            <CardBody>
                                                                Name : User 1
                                                                <br />
                                                                Lead Update : Last Meeting has been cancelled
                                                                <br />
                                                            </CardBody>
                                                        </Collapse>
                                                    </Card>
                                                    <Card className="mb-1 shadow-none">
                                                        <Link to="#" onClick={this.t_col2} style={{ cursor: "pointer" }} className="text-dark" >
                                                            <CardHeader id="headingTwo">
                                                                <h6 className="m-0 font-14">
                                                                    {" "}Further Details{" "}
                                                                    <i className={this.state.col2 ? "mdi mdi-minus float-end accor-plus-icon" : "mdi mdi-plus float-end accor-plus-icon"}></i>
                                                                </h6>
                                                            </CardHeader>
                                                        </Link>
                                                        <Collapse isOpen={this.state.col2}>
                                                            <CardBody>
                                                                <br />
                                                                Lead Update : Next Meeting has been fixed
                                                                <br />
                                                            </CardBody>
                                                        </Collapse>{" "}
                                                    </Card>
                                                </div>
                                            </Col> */}
                                {/* </Row>
                                    </ModalBody>
                                // </Modal> */}

                                {/* CREATE ACTIVITY MODAL */}
                                <Modal
                                    size="xl"
                                    isOpen={this.state.ActivityModal}
                                    toggle={this.ActivityModal}
                                >
                                    <ModalHeader toggle={() => this.setState({ ActivityModal: false })}>
                                        Create Activity
                                    </ModalHeader>
                                    <ModalBody>
                                        <Row>
                                            <Col md="12">
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handleLeadActivity}
                                                >
                                                    <Row className="mt-2">
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
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
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
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
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Start Date
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField

                                                                required={true}
                                                                name="startdate"
                                                                type="date"
                                                                id="validationCustom04"
                                                                // value={this.state.selectedcountry}
                                                                errorMessage="Please Select a start date."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleStartDateChange}
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
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
                                                        </Col>
                                                        {/* <Col md="6" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Expense
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                min="0"
                                                                required={true}
                                                                name="expense"
                                                                type="number"
                                                                id="validationCustom04"
                                                                // value={this.state.selectedcountry}
                                                                errorMessage="Please enter expense."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                            >
                                                            </AvField>
                                                        </Col> */}

                                                        <Col lg="3" className="d-inline">

                                                            <div>
                                                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <Label
                                                                    className="form-label"
                                                                    htmlFor="validationCustom04"
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

                                                            </div>
                                                            {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <Label
                                                                    className="form-label"
                                                                    htmlFor="validationCustom04"
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
                                                            </div> */}

                                                            {/* <AvField
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
                                                                {this.state.ActiviyContactPersnData.map((item) => {
                                                                    return (
                                                                        <option value={item.contact_person_id}>{item.contact_person_name}</option>

                                                                    );
                                                                })}
                                                            </AvField> */}
                                                        </Col>

                                                        {/* <Col lg="3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                            >
                                                                Activity Status
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="activityStatus"
                                                                placeholder="Activity Status"
                                                                type="select"
                                                                errorMessage="Please Provide Activity Status"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom01"
                                                            >
                                                                <option value={""} >Select Activity Status</option>
                                                                <option value={"1"} >Open</option>
                                                                <option value={"2"} >Closed</option>
                                                            </AvField>
                                                        </Col> */}

                                                        {/* <Col md="12" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Expense Description
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="expensedescription"
                                                                type="textarea"
                                                                id="validationCustom04"
                                                                // value={this.state.selectedcountry}
                                                                errorMessage="Please enter an expense description."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                            >
                                                            </AvField>
                                                        </Col> */}
                                                    </Row>

                                                    <Button color="primary" type="submit" >
                                                        Create Activity
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        className="mx-2"
                                                        onClick={() => this.setState({ ActivityModal: false })}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </AvForm>
                                            </Col>
                                            {/* <Col md="4">
                                                <div id="accordion">
                                                    <Card className="mb-1 shadow-none">
                                                        <Link to="#" onClick={this.t_col1} style={{ cursor: "pointer" }} className="text-dark" >
                                                            <CardHeader id="headingOne">
                                                                <h6 className="m-0 font-14">
                                                                    More Details
                                                                    <i className={this.state.col1 ? "mdi mdi-minus float-end accor-plus-icon" : "mdi mdi-plus float-end accor-plus-icon"}></i>
                                                                </h6>
                                                            </CardHeader>
                                                        </Link>
                                                        <Collapse isOpen={this.state.col1}>
                                                            <CardBody>
                                                                Name : User 1
                                                                <br />
                                                                Lead Update : Last Meeting has been cancelled
                                                                <br />
                                                            </CardBody>
                                                        </Collapse>
                                                    </Card>
                                                    <Card className="mb-1 shadow-none">
                                                        <Link to="#" onClick={this.t_col2} style={{ cursor: "pointer" }} className="text-dark" >
                                                            <CardHeader id="headingTwo">
                                                                <h6 className="m-0 font-14">
                                                                    {" "}Further Details{" "}
                                                                    <i className={this.state.col2 ? "mdi mdi-minus float-end accor-plus-icon" : "mdi mdi-plus float-end accor-plus-icon"}></i>
                                                                </h6>
                                                            </CardHeader>
                                                        </Link>
                                                        <Collapse isOpen={this.state.col2}>
                                                            <CardBody>
                                                                <br />
                                                                Lead Update : Next Meeting has been fixed
                                                                <br />
                                                            </CardBody>
                                                        </Collapse>{" "}
                                                    </Card>
                                                </div>
                                            </Col> */}
                                        </Row>

                                    </ModalBody>
                                </Modal>

                                {/* start Delete Comment Model  */}
                                <Modal
                                    size="sm"
                                    isOpen={this.state.modal_small}
                                    toggle={this.tog_small}
                                    centered={true}
                                >
                                    <ModalHeader toggle={() => this.setState({ modal_small: false })}>
                                        Delete this Comment?
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
                                                    this.DeleteCommentsDataApi(this.state.LeadCommentsGetUpdateData.id);
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
                                {/* End Delete Comment Model  */}

                                {/* Start--- Activit model  */}

                                {/* Start-- Edit Model  */}
                                <Modal
                                    size="xl"
                                    isOpen={this.state.modal_EditActivity}
                                    toggle={this.tog_EditActivity}

                                >
                                    <ModalHeader toggle={() => this.setState({ modal_EditActivity: false })}>
                                        Edit Activity
                                        {/* {
                                            JSON.stringify(this.state.ActivityGetUpdateData.contact_person_id_encode)
                                        } */}
                                    </ModalHeader>
                                    <ModalBody>
                                        <Row>
                                            <Col md="12">
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handleUpdateActivityApi}
                                                    ref={c => (this.form = c)} // Create a ref for the form
                                                >
                                                    <Row className="mt-2">
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Subject
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                value={this.state.ActivityGetUpdateData.subject}
                                                                name="subject"
                                                                type="text"
                                                                id="validationCustom04"
                                                                errorMessage="Please Select a subject."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleInputChangeSubject}
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Description
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                value={this.state.ActivityGetUpdateData.description}
                                                                name="description"
                                                                type="text"
                                                                id="validationCustom04"
                                                                // value={this.state.selectedcountry}
                                                                errorMessage="Please Select text."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleInputChangeDescription}
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Start Date
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                value={this.state.ActivityGetUpdateData.start_dt}
                                                                required={true}
                                                                name="startdate"
                                                                type="date"
                                                                id="validationCustom04"
                                                                // value={this.state.selectedcountry}
                                                                errorMessage="Please Select a start date."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleStartDateChange}
                                                            // onChange={this.handleInputChangeStarDate}
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                End Date
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                value={this.state.ActivityGetUpdateData.end_dt}
                                                                name="enddate"
                                                                type="date"
                                                                id="validationCustom04"
                                                                // value={this.state.selectedcountry}
                                                                errorMessage="Please select end date."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                min={this.state.selectedStartDate ? this.state.selectedStartDate : ""}
                                                            // onChange={this.handleInputChangeEndDate}
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        {/* <Col md="6" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Expense
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                min="0"
                                                                required={true}
                                                                value={this.state.ActivityGetUpdateData.expense}
                                                                name="expense"
                                                                type="number"
                                                                id="validationCustom04"
                                                                // value={this.state.selectedcountry}
                                                                errorMessage="Please enter expense."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleInputChangeExpense}
                                                            >
                                                            </AvField>
                                                        </Col> */}
                                                        <Col lg="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Select Contact Person
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                value={this.state.ActivityGetUpdateData.contact_person_id_encode}
                                                                name="selectedcontactperson"
                                                                type="select"
                                                                id="validationCustom04"
                                                                errorMessage="Please Select a Contact Person."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={(e) => {
                                                                    this.setState((prevState) => ({
                                                                        selectedcontactperson: e.target.value,
                                                                        ActivityGetUpdateData: {
                                                                            ...prevState.ActivityGetUpdateData,
                                                                            contact_person_id_encode: e.target.value,
                                                                        },
                                                                    }));
                                                                    if (e.target.value !== "") {
                                                                        this.SearchContactPersonById(e.target.value);
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
                                                        {/* <Col md="12" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Expense Description
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="expensedescription"
                                                                value={this.state.ActivityGetUpdateData.expense_description}
                                                                type="textarea"
                                                                id="validationCustom04"
                                                                // value={this.state.selectedcountry}
                                                                errorMessage="Please enter an expense description."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleInputChangeExpenseDescription}
                                                            >
                                                            </AvField>
                                                        </Col> */}
                                                    </Row>
                                                    <Row>
                                                        <Col xl={12}>
                                                            <Button color="primary" type="submit" >
                                                                Edit Activity
                                                            </Button>

                                                            <Button
                                                                color="secondary"
                                                                type="button"
                                                                className="EditActivity_Cancel"
                                                                onClick={this.handleModalEditActivityClose}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </AvForm>
                                            </Col>
                                            {/* <Col md="4">
                                                <div id="accordion">
                                                    <Card className="mb-1 shadow-none">
                                                        <Link to="#" onClick={this.t_col1} style={{ cursor: "pointer" }} className="text-dark" >
                                                            <CardHeader id="headingOne">
                                                                <h6 className="m-0 font-14">
                                                                    More Details
                                                                    <i className={this.state.col1 ? "mdi mdi-minus float-end accor-plus-icon" : "mdi mdi-plus float-end accor-plus-icon"}></i>
                                                                </h6>
                                                            </CardHeader>
                                                        </Link>
                                                        <Collapse isOpen={this.state.col1}>
                                                            <CardBody>
                                                                Name : User 1
                                                                <br />
                                                                Lead Update : Last Meeting has been cancelled
                                                                <br />
                                                            </CardBody>
                                                        </Collapse>
                                                    </Card>
                                                    <Card className="mb-1 shadow-none">
                                                        <Link to="#" onClick={this.t_col2} style={{ cursor: "pointer" }} className="text-dark" >
                                                            <CardHeader id="headingTwo">
                                                                <h6 className="m-0 font-14">
                                                                    {" "}Further Details{" "}
                                                                    <i className={this.state.col2 ? "mdi mdi-minus float-end accor-plus-icon" : "mdi mdi-plus float-end accor-plus-icon"}></i>
                                                                </h6>
                                                            </CardHeader>
                                                        </Link>
                                                        <Collapse isOpen={this.state.col2}>
                                                            <CardBody>
                                                                <br />
                                                                Lead Update : Next Meeting has been fixed
                                                                <br />
                                                            </CardBody>
                                                        </Collapse>{" "}
                                                    </Card>
                                                </div>
                                            </Col> */}
                                        </Row>

                                    </ModalBody>
                                </Modal>
                                {/* End-- Edit Model  */}

                                {/* Start Delete Model Activity */}
                                <Modal
                                    // size="sm"
                                    isOpen={this.state.modal_deleteActivity}
                                    toggle={this.handleDeleteActivity}
                                    centered={true}
                                >
                                    <ModalHeader toggle={() => this.setState({ modal_deleteActivity: false })}>
                                        Delete this LeadActivity?
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
                                                    this.DeleteActivityDataApi(this.state.ActivityGetUpdateData.id);
                                                    this.setState({ modal_deleteActivity: false });
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                color="secondary"
                                                type="button"
                                                className="create_Cancel"
                                                onClick={() => this.setState({ modal_deleteActivity: false })}
                                            >
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </Modal>
                                {/* End Delete Model Activity */}


                                 {/* Start Delete Model Activity */}
                                 <Modal
                                    size="xl"
                                    isOpen={this.state.modal_expenses}
                                    toggle={this.handleDeleteActivity}
                                    centered={true}
                                >
                                    <ModalHeader toggle={() => this.setState({ modal_expenses: false })}>
                                    Expenses
                                    </ModalHeader>
                                    <ModalBody>
                                    <Table id="tech-companies-1" bordered responsive className="activity_tables">
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                {/* <th data-priority="`1">Action</th> */}
                                                                                                                {/* <th data-priority="1">Subject</th>
                                                                                                                <th data-priority="3">Description</th> */}
                                                                                                                    {
                                                                                                                    ExpensesActive?.status == 'Active' && (
                                                                                                                        <>
                                                                                                                            <th data-priority="3">Access</th>
                                                                                                                            </>
                                                                                                                        )}

                                                                                                                <th data-priority="6">Expense Proof</th>
                                                                                                                <th data-priority="6">Expense Amount</th>
                                                                                                                <th data-priority="6">Expense Description</th>
                                                                                                                <th data-priority="3">Expense Added By</th>
                                                                                                                {
                                                                                                                    ExpensesActive?.status == 'Active' && (
                                                                                                                        <>
                                                                                                                          
                                                                                                                            <th data-priority="1">Approved Amount</th>
                                                                                                                            <th data-priority="3">Approval Notes</th>
                                                                                                                        </>

                                                                                                                    )
                                                                                                                }

                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            {ExpensesListData.length === 0 ? (
                                                                                                                <tr>
                                                                                                                    <td colSpan="7" className="text-center">
                                                                                                                        No data found
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            ) : (
                                                                                                                ExpensesListData.slice(0, LeadActivityDisplay).map((item, index) => {
                                                                                                                    console.log("testing===>123",item)
                                                                                                                    return (
                                                                                                                        <tr key={index}>
                                                                                                                        {item.expense ? (
                                                                                                                                            <>
                                                                                                                                               <div key={item.id} className="d-flex justify-content-between">
                                                                                                                                                    <div className="w-50">
                                                                                                                                                        { this.state.approvedExpenses.includes(item.id) ? 
                                                                                                                                                         <Button color="success"
                                                                                                                                                        
                                                                                                                                                        className="Expensesactivity" style={{ display: this.state.DisApprovedExpenses.includes(item.id) || permanentlyDisapprovedExpenses.includes(item.id) ? 'none' : 'block' }}>
                                                                                                                                                      
                                                                                                                                                        Approved
                                                                                                                                                    </Button> :
                                                                                                                                                    
                                                                                                                                                    <Button color="success" onClick={() => this.handelEditApproveModel(item)}
                                                                                                                                                    className="Expensesactivity" style={{ display: this.state.DisApprovedExpenses.includes(item.id) || permanentlyDisapprovedExpenses.includes(item.id) ? 'none' : 'block' }}>
                                                                                                                                                    {/* Approve */}
                                                                                                                                                    <FaCheckCircle  size={20}/>
                                                                                                                                                     </Button>
                                                                                                                                                    
                                                                                                                                                    }
                                                                                                                                                 
                                                                                                                                                    </div>

                                                                                                                                                    <div className="w-50">
                                                                                                                                                        <Button color="danger" onClick={() => this.handelEditDisApproveModel(item)}
                                                                                                                                                            className="Expensesactivity" style={{ display: this.state.approvedExpenses.includes(item.id) ? 'none' : 'block' }}>
                                                                                                                                                          <IoIosCloseCircle size={20}/>
                                                                                                                                                        </Button>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </>
                                                                                                                                        ) : (
                                                                                                                                            <div>
                                                                                                                                                {/* <Button color="primary" onClick={() => this.handelExpenseModel(item)} className="Expensesactivity">
                                                                                                                                    ADD
                                                                                                                                </Button>
                                                                                                                                <Button color="primary" onClick={() => this.handelExpenseModel(item)} className="Expensesactivity">
                                                                                                                                    Approve
                                                                                                                                </Button> */}
                                                                                                                                            </div>
                                                                                                                                        )}
                                                                                                                        <td><img src={item.expense_attach_file} alt="exapnce-img"
                                                                                                                         style={{

                                                                                                                                width:'100px',
                                                                                                                                height:'auto'

                                                                                                                        }} />
                                                                                                                        
                                                                                                                        </td>
                                                                                                                        <td>{item.expense}</td>
                                                                                                                        <td>{item.expense_description}</td>
                                                                                                                        <td>{item.tenant_name}</td>
                                                                                                                        {
                                                                                                                            ExpensesActive?.status == 'Active' && (
                                                                                                                                <>
                                                                                                                                    <td>{item.approved_amount}</td>
                                                                                                                                    <td>{item.approved_notes}</td>
                                                                                                                                </>

                                                                                                                            )
                                                                                                                        }



                                                                                                                        {/* <td>{this.formatDate(item.start_dt)}</td>
                                                                                                                        <td>{this.formatDate(item.end_dt)}</td> */}
                                                                                                                    </tr>

                                                                                                                    )
                                                                                                                    
                                                                                                                    })

                                                                                                            )}
                                                                                                        </tbody>
                                                                                                    </Table>
                                    </ModalBody>
                               
                                </Modal>
                                {/* End Delete Model Activity */}

                                {/* start inquiry Model   */}
                                <Modal
                                    centered={true}
                                    isOpen={this.state.InquiryModel}
                                    toggle={this.handleInquiryModel}
                                >
                                    <ModalHeader toggle={() => this.setState({ InquiryModel: false })}>
                                        Convert Lead to Inquiry
                                    </ModalHeader>
                                    <ModalBody>
                                        <p>Are you sure you want to convert lead to inquiry?</p>
                                    </ModalBody>
                                    <Row >
                                        <Col md="12">
                                            <AvForm
                                                className="needs-validation"
                                                onValidSubmit={this.handleUpdateLeadInquiry}
                                                ref={c => (this.form = c)} // Create a ref for the form
                                            >
                                                <Col md="11" style={{ textAlign: "right", marginBottom: "20px" }}>
                                                    <Button
                                                        color="primary"
                                                        type="submit"
                                                        className="create_inquery"
                                                    // onClick={() => {
                                                    //     this.DeleteActivityDataApi(this.state.ActivityGetUpdateData.id);
                                                    //     this.setState({ modal_deleteActivity: false });
                                                    // }}
                                                    >
                                                        Yes
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        type="button"
                                                        className="inquiry_Cancel ml-10"
                                                        onClick={this.handleCancelInquiryModel}
                                                    >
                                                        No
                                                    </Button>
                                                </Col>
                                            </AvForm>
                                        </Col>
                                    </Row>
                                </Modal>
                                {/* start inquiry Model   */}

                                {/* start Expenses Activity model  */}
                                <Modal
                                    size="xl"
                                    isOpen={this.state.ExpenseActivityModel}
                                    toggle={this.handelExpenseModel}
                                >
                                    <ModalHeader toggle={() => this.setState({ ExpenseActivityModel: false })}>
                                        Add Expenses Activity
                                    </ModalHeader>
                                    <ModalBody>
                                        <Row>
                                            <Col md="12">
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handelExpenseActivityApi}

                                                >
                                                    <Row className="mt-2" >
                                                      

                                                        <Col md="4" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Expense
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                min="0"
                                                                required={true}
                                                                name="expense"
                                                                type="number"
                                                                id="validationCustom04"
                                                                // value={this.state.selectedcountry}
                                                                errorMessage="Please enter expense."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                            >
                                                            </AvField>
                                                        </Col>


                                                        <Col md="4" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Expense Description
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="expensedescription"
                                                                type="textarea"
                                                                id="validationCustom04"
                                                                // value={this.state.selectedcountry}
                                                                errorMessage="Please enter an expense description."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col lg="4" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                File Upload
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>

                                                            <input
                                                         name={'document_type'}
                                                         type="file"
                                                         accept={this.getFileAcceptValue()}
                                                         onChange={(e) => {
                                                        //    const { fileDataPath } = this.state;
                                                        //    fileDataPath =
                                                        //      e.target.value;
                                                        //    this.setState({ fileDataPath });

                                                           const { value } = e.target;
                                                           this.setState({ fileDataPath: value });



                                                           this.handleFileChange(e); // Call handleFileChange here
                                                         }}

                                                        
                                                         // onChange={(e) => this.handleFileChange(e, index)}
                                                       />
                                                            {/* <AvField
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
                                                                <option value={""} >Other</option>
                                                                {this.state.contactpersonlistData.map((item) => {
                                                                    console.log("contactpersonlistData",item)
                                                                    return (
                                                                        <option value={item.id}>{item.customer_name}</option>

                                                                    );
                                                                })}
                                                            </AvField> */}
                                                        </Col>

                                                        
                                                    </Row>
                                                    <div className="pb-3">
                                                    <Button color="primary" type="submit" >
                                                        Create Expenses
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        className="mx-2"
                                                        onClick={() => this.setState({ ExpenseActivityModel: false })}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    </div>
                                                    <div>
                                                    <Table id="tech-companies-1" bordered responsive className="activity_tables">
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                {/* <th data-priority="`1">Action</th> */}
                                                                                                                {/* <th data-priority="1">Subject</th>
                                                                                                                <th data-priority="3">Description</th> */}
                                                                                                                    {
                                                                                                                    ExpensesActive?.status == 'Active' && (
                                                                                                                        <>
                                                                                                                            <th data-priority="3">Access</th>
                                                                                                                            </>
                                                                                                                        )}

                                                                                                                <th data-priority="6">Expense Proof</th>
                                                                                                                <th data-priority="6">Expense Amount</th>
                                                                                                                <th data-priority="6">Expense Description</th>
                                                                                                                <th data-priority="3">Expense Added By</th>
                                                                                                                {
                                                                                                                    ExpensesActive?.status == 'Active' && (
                                                                                                                        <>
                                                                                                                          
                                                                                                                            <th data-priority="1">Approved Amount</th>
                                                                                                                            <th data-priority="3">Approval Notes</th>
                                                                                                                        </>

                                                                                                                    )
                                                                                                                }

                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            {ExpensesListData.length === 0 ? (
                                                                                                                <tr>
                                                                                                                    <td colSpan="7" className="text-center">
                                                                                                                        No data found
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            ) : (
                                                                                                                ExpensesListData.slice(0, LeadActivityDisplay).map((item, index) => {
                                                                                                                    console.log("testing===>123",item)
                                                                                                                    return (
                                                                                                                        <tr key={index}>
                                                                                                                        {item.expense ? (
                                                                                                                                            <>
                                                                                                                                               <div key={item.id} className="d-flex justify-content-between">
                                                                                                                                                    <div className="w-50">
                                                                                                                                                        { this.state.approvedExpenses.includes(item.id) ? 
                                                                                                                                                         <Button color="success"
                                                                                                                                                        
                                                                                                                                                        className="Expensesactivity" style={{ display: this.state.DisApprovedExpenses.includes(item.id) || permanentlyDisapprovedExpenses.includes(item.id) ? 'none' : 'block' }}>
                                                                                                                                                      
                                                                                                                                                        Approved
                                                                                                                                                    </Button> :
                                                                                                                                                    
                                                                                                                                                    <Button color="success" onClick={() => this.handelEditApproveModel(item)}
                                                                                                                                                    className="Expensesactivity" style={{ display: this.state.DisApprovedExpenses.includes(item.id) || permanentlyDisapprovedExpenses.includes(item.id) ? 'none' : 'block' }}>
                                                                                                                                                    {/* Approve */}
                                                                                                                                                    <FaCheckCircle  size={20}/>
                                                                                                                                                     </Button>
                                                                                                                                                    
                                                                                                                                                    }
                                                                                                                                                 
                                                                                                                                                    </div>

                                                                                                                                                    <div className="w-50">
                                                                                                                                                        <Button color="danger" onClick={() => this.handelEditDisApproveModel(item)}
                                                                                                                                                            className="Expensesactivity" style={{ display: this.state.approvedExpenses.includes(item.id) ? 'none' : 'block' }}>
                                                                                                                                                          <IoIosCloseCircle size={20}/>
                                                                                                                                                        </Button>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </>
                                                                                                                                        ) : (
                                                                                                                                            <div>
                                                                                                                                                {/* <Button color="primary" onClick={() => this.handelExpenseModel(item)} className="Expensesactivity">
                                                                                                                                    ADD
                                                                                                                                </Button>
                                                                                                                                <Button color="primary" onClick={() => this.handelExpenseModel(item)} className="Expensesactivity">
                                                                                                                                    Approve
                                                                                                                                </Button> */}
                                                                                                                                            </div>
                                                                                                                                        )}
                                                                                                                        <td><img src={item.expense_attach_file} alt="exapnce-img"
                                                                                                                         style={{

                                                                                                                                width:'100px',
                                                                                                                                height:'auto'

                                                                                                                        }} />
                                                                                                                        
                                                                                                                        </td>
                                                                                                                        <td>{item.expense}</td>
                                                                                                                        <td>{item.expense_description}</td>
                                                                                                                        <td>{item.tenant_name}</td>
                                                                                                                        {
                                                                                                                            ExpensesActive?.status == 'Active' && (
                                                                                                                                <>
                                                                                                                                    <td>{item.approved_amount}</td>
                                                                                                                                    <td>{item.approved_notes}</td>
                                                                                                                                </>

                                                                                                                            )
                                                                                                                        }



                                                                                                                        {/* <td>{this.formatDate(item.start_dt)}</td>
                                                                                                                        <td>{this.formatDate(item.end_dt)}</td> */}
                                                                                                                    </tr>

                                                                                                                    )
                                                                                                                    
                                                                                                                    })

                                                                                                            )}
                                                                                                        </tbody>
                                                                                                    </Table>
                                                                                                    <div>
                                                                                                    </div>

                                                    </div>

                                                    
                                                </AvForm>
                                            </Col>
                                        </Row>
                                    </ModalBody>
                                </Modal>
                                {/* End Expenses Activity model  */}

                                {/*start----- Contact Modal */}
                                <Modal isOpen={this.state.contactShow} backdrop="static" size="xl">
                                    <ModalHeader toggle={() => {
                                        this.setState({
                                            contactShow: false,
                                        });
                                    }}>Add Contact Person
                                    </ModalHeader>
                                    <ModalBody>
                                        <CreateContactPersonModal
                                            leadRefShow={this.state.contactShow}
                                            closeModalCallback={() => {
                                                this.setState({ contactShow: false })
                                                this.getAllContacts();
                                            }}
                                        />
                                    </ModalBody>

                                </Modal>
                                {/*End----- Contact Modal */}

                                {/* Start---- FollowUp Model  */}
                                <Modal
                                    size="xl"
                                    isOpen={this.state.FollowUpModal}
                                    toggle={this.handelFolloupModel}
                                >
                                    <ModalHeader toggle={() => this.setState({ FollowUpModal: false })}>
                                        Create FollowUp
                                    </ModalHeader>
                                    <ModalBody>
                                        <Row>
                                            <Col md="12">
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handelCreateFollowUpApi}
                                                >
                                                    <Row className="mt-2">
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                FollowUp Name
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                name="followUpName"
                                                                type="text"
                                                                placeholder="  FollowUp Name"
                                                                id="validationCustom04"
                                                                errorMessage="Please Enter a  FollowUp Name."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        {/* <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Mobile Number
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                name="mobileNumber"
                                                                type="text"
                                                                placeholder="Mobile Number"
                                                                id="validationCustom04"
                                                                errorMessage="Please Enter a  Mobile Number."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                            >
                                                            </AvField>
                                                        </Col> */}
                                                        <Col lg="3">
                                                            <div className="mb-3">
                                                                <Label
                                                                    className="form-label"
                                                                    htmlFor="validationCustom007"
                                                                >
                                                                    Phone No.
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

                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Description
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                name="description"
                                                                type="text"
                                                                id="validationCustom04"
                                                                placeholder="Description"
                                                                // value={this.state.selectedcountry}
                                                                errorMessage="Please Enter Description."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Followup  Date
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField

                                                                required={true}
                                                                name="Followupdate"
                                                                type="datetime-local"
                                                                id="validationCustom04"
                                                                // value={this.state.selectedcountry}
                                                                errorMessage="Please Select a Followup date."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleStartDateChange}
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col md="3" className="d-inline">
                                                            <Label className="form-label" htmlFor="validationCustom04">
                                                                Reminder Date
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                name="reeminderdate"
                                                                type="datetime-local"
                                                                id="validationCustom04"
                                                                errorMessage="Please Select a Reminder date."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleStartDateChange}
                                                            // value={this.state.reeminderdate} // Bind the value to the state
                                                            max={currentDate} // Set the max attribute to the current date and time
                                                            // min={new Date().toISOString().split('T')[0]}
                                                            />

                                                            {/* <DatePicker style={{width:"330px"}}
                                                                 selected={this.state.reminderDate} // Ensure the state variable is correctly set
                                                                 onChange={date => this.setState({ reminderDate: date })} // Update state with selected date
                                                                 name="reminderdate" // Assign the correct name to match your API payload
                                                                 // Other props...
                                                                // minDate={new Date()} // set minDate to the current date
                                                                maxDate={new Date()} // set maxDate dynamically
                                                                showTimeSelect
                                                                timeFormat="HH:mm"
                                                                timeIntervals={15}
                                                                timeCaption="time"
                                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                                className="form-control reeminderdate"
                                                                placeholder="select date"
                                                            /> */}
                                                        </Col>
                                                        <Col lg="3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                            >
                                                                Followup Status
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="followupstatus"
                                                                placeholder="Followup Status"
                                                                type="select"
                                                                errorMessage="Please Provide Followup Status"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom01"
                                                            >
                                                                <option value={""} >Select 	Followup Status</option>
                                                                <option value={"1"} >Scheduled</option>
                                                                <option value={"2"} >In Progress</option>
                                                                <option value={"3"} >Waiting for Approval</option>
                                                                <option value={"4"} >Completed</option>
                                                                <option value={"5"} >Cancelled</option>
                                                                <option value={"6"} >Postponed</option>
                                                                <option value={"7"} >Archiveed</option>
                                                            </AvField>
                                                        </Col>
                                                        {/* <Col lg="3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                            >
                                                                Lead Status
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="leadStatus"
                                                                placeholder="Lead Status"
                                                                type="select"
                                                                errorMessage="Please Provide Lead Status"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom01"
                                                            >
                                                                <option value={""} >Select Lead Status</option>
                                                                <option value={"warm"} >warm</option>
                                                                <option value={"cold"} >cold</option>
                                                                <option value={"contact in future"} >contact in future</option>
                                                                <option value={"duplicate lead"} >duplicate lead</option>
                                                                <option value={"multiple time call attempted"} >multiple time call attempted</option>
                                                            </AvField>
                                                        </Col> */}
                                                    </Row>

                                                    <Button color="primary" type="submit" >
                                                        Create FollowUp
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        className="mx-2"
                                                        onClick={() => this.setState({ FollowUpModal: false })}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </AvForm>
                                            </Col>

                                        </Row>

                                    </ModalBody>
                                </Modal>
                                {/* End---- FollowUp Model  */}

                                {/* start---------Followup Edit Model  */}
                                <Modal
                                    size="xl"
                                    isOpen={this.state.EditFolloupModel}
                                    toggle={this.handelEditFolloupModel}
                                >
                                    <ModalHeader toggle={() => this.setState({ EditFolloupModel: false })}>
                                        Edit FollowUp
                                    </ModalHeader>
                                    <ModalBody>
                                        <Row>
                                            <Col md="12">
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handleUpdateFollowupApi}
                                                >
                                                    <Row className="mt-2">
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Followup Name
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                name="followUpName"
                                                                value={this.state.FollowupUpdateData.followup_name}
                                                                type="text"
                                                                placeholder="Followup Name "
                                                                id="validationCustom04"
                                                                errorMessage="Please Enter a Followup Name ."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleInputChangeTitle}
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col lg="3">
                                                            <div className="mb-3">
                                                                <Label
                                                                    className="form-label"
                                                                    htmlFor="validationCustom007"
                                                                >
                                                                    Phone No.
                                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                                </Label>
                                                                <PhoneInput
                                                                    name="mobile"
                                                                    placeholder=""
                                                                    // country={"in"}
                                                                    enableSearch={true}
                                                                    errorMessage=" Please provide a Number"
                                                                    id="validationCustom007"
                                                                    validate={{
                                                                        required: {
                                                                            value: true
                                                                        },
                                                                    }}
                                                                    value={this.state.FollowupUpdateData.mobile_number}
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
                                                                            inputMobileField: phone,

                                                                        });
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>


                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Description
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                name="description"
                                                                type="text"
                                                                id="validationCustom04"
                                                                placeholder="Description"
                                                                value={this.state.FollowupUpdateData.description}
                                                                errorMessage="Please Enter Description."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleInputDescription}
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Followup  Date
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                name="Followupdate"
                                                                type="datetime-local"
                                                                id="validationCustom04"
                                                                value={this.state.FollowupUpdateData.followup_date}
                                                                errorMessage="Please Select a Followup date."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleInputfollowupDate}
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col md="3" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Reeminder Date
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                name="reeminderdate"
                                                                type="datetime-local"
                                                                id="validationCustom04"
                                                                value={this.state.FollowupUpdateData.reminder}
                                                                errorMessage="Please select reeminder date."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                // min={this.state.selectedStartDate ? this.state.selectedStartDate : ""}
                                                                onChange={this.handleInputreminderDate}
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col lg="3">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom01"
                                                            >
                                                                Followup Status
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                name="followupstatus"
                                                                placeholder="Followup Status"
                                                                value={this.state.FollowupUpdateData.followup_status_value}
                                                                type="select"
                                                                errorMessage="Please Provide Followup Status"
                                                                className="form-control"
                                                                validate={{ required: { value: true } }}
                                                                id="validationCustom01"
                                                                onChange={this.handleInputFollowupStatus}
                                                            >
                                                                <option value={""} >Select 	Followup Status</option>
                                                                <option value={"1"} >Scheduled</option>
                                                                <option value={"2"} >In Progress</option>
                                                                <option value={"3"} >Waiting for Approval</option>
                                                                <option value={"4"} >Completed</option>
                                                                <option value={"5"} >Cancelled</option>
                                                                <option value={"6"} >Postponed</option>
                                                                <option value={"7"} >Archiveed</option>
                                                                {/* <option value={"Junk"} >Junk</option> */}
                                                            </AvField>
                                                        </Col>
                                                    </Row>

                                                    <Button color="primary" type="submit" >
                                                        Update Followup
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        className="mx-2"
                                                        onClick={() => this.setState({ EditFolloupModel: false })}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </AvForm>
                                            </Col>

                                        </Row>

                                    </ModalBody>
                                </Modal>
                                {/* End---------Followup Edit Model  */}

                                {/* start------ FollowUp Delete Model  */}
                                <Modal
                                    // size="sm"
                                    isOpen={this.state.modal_deleteFollowUp}
                                    toggle={this.handleDeleteFollowUp}
                                    centered={true}
                                >
                                    <ModalHeader toggle={() => this.setState({ modal_deleteFollowUp: false })}>
                                        Delete this FollowUp?
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
                                                    this.DeleteFollowupDataApi(this.state.FollowupUpdateData.id);
                                                    this.setState({ modal_deleteFollowUp: false });
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                color="secondary"
                                                type="button"
                                                className="create_Cancel"
                                                onClick={() => this.setState({ modal_deleteFollowUp: false })}
                                            >
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </Modal>

                                {/* End------ FollowUp Delete Model  */}

                                {/* start---------Approve Expenses Model  */}
                                <Modal
                                    size="xl"
                                    isOpen={this.state.ApproveModel}
                                    toggle={this.handelEditApproveModel}
                                >
                                    <ModalHeader toggle={() => this.setState({ ApproveModel: false })}>
                                        Approve Expenses
                                    </ModalHeader>
                                    <ModalBody>
                                        <Row>
                                            <Col md="12">
                                                <AvForm
                                                    className="needs-validation"
                                                    onValidSubmit={this.handleUpdateApproveApi}
                                                >
                                                    <Row className="mt-2">
                                                    <Col md="6" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Expense proof
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                           <img
                                                           src={this.state.approvedExpensesDetails.expense_attach_file}
                                                           alt="bill image"
                                                           style={{
                                                            width:"200px",
                                                            height:"auto"
                                                           }}
                                                           />
                                                       
                                                        </Col>
                                                        <Col md="6" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                              Expense Amount
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                name="ApproveNotes"
                                                                type="text"
                                                                id="validationCustom04"
                                                                placeholder="approveNotes"
                                                                value={this.state.approvedExpensesDetails.expense}
                                                                errorMessage="Please Enter  Approve Notes."
                                                                disabled 
                                                                // validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                // onChange={this.handleInputApproveNotes}
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col md="6" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Approve Amount
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                name="approveAmount"
                                                                // value={this.state.ApproveUpdateData.approved_amount}
                                                                type="text"
                                                                placeholder="Approve Amount"
                                                                id="validationCustom04"
                                                                errorMessage="Please Enter a  Approve Amount."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleInputChangeApproveAmount}
                                                            >
                                                            </AvField>
                                                        </Col>
                                                        <Col md="6" className="d-inline">
                                                            <Label
                                                                className="form-label"
                                                                htmlFor="validationCustom04"
                                                            >
                                                                Approve Notes
                                                                <span style={{ color: "#ff0000" }}>*</span>
                                                            </Label>
                                                            <AvField
                                                                required={true}
                                                                name="ApproveNotes"
                                                                type="text"
                                                                id="validationCustom04"
                                                                placeholder="approveNotes"
                                                                // value={this.state.ApproveUpdateData.approved_notes}
                                                                errorMessage="Please Enter  Approve Notes."
                                                                validate={{ required: { value: true } }}
                                                                className="form-control"
                                                                onChange={this.handleInputApproveNotes}
                                                            >
                                                            </AvField>
                                                        </Col>

                                                    </Row>

                                                    <Button color="primary" type="submit" >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        className="mx-2"
                                                        onClick={() => this.setState({ ApproveModel: false })}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </AvForm>
                                            </Col>
                                        </Row>

                                    </ModalBody>
                                </Modal>
                                {/* End---------Approve Expenses Model  */}

                                {/* start-------DisApprove Model  */}
                                <Modal
                                    size="sm"
                                    isOpen={this.state.DisApproveModel}
                                    toggle={this.handelEditDisApproveModel}
                                    centered={true}
                                >
                                    <ModalHeader toggle={() => this.setState({ DisApproveModel: false })}>
                                        Delete this Comment?
                                    </ModalHeader>
                                    <ModalBody>
                                        <p>Once you delete it, it's gone for good.</p>
                                    </ModalBody>
                                    <Row >
                                        <Col md="11" style={{ textAlign: "right", marginBottom: "20px" }}>
                                            <AvForm
                                                className="needs-validation"
                                                onValidSubmit={this.handleUpdateDisApproveApi}
                                            >

                                                <Button
                                                    color="primary"
                                                    type="submit"
                                                    className="create_comments"
                                                >
                                                    DisApprove
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    type="button"
                                                    className="create_Cancel"
                                                    onClick={() => this.setState({ DisApproveModel: false })}
                                                >
                                                    Cancel
                                                </Button>
                                            </AvForm>
                                        </Col>
                                    </Row>
                                </Modal>
                                {/* End--------- DisApprove Model  */}

                            </>
                        )}
                    </Container>
                </div >
            </React.Fragment >
        );
    };
};

export default ViewMarketLead2;
