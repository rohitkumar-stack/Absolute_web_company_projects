import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Label,
  Form,
  Button,
  FormGroup,
  Table,
  CardHeader,
} from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
  AvGroup,
  AvInput,
} from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import {
  GET_MARKETING_LEAD,
  GET_ALL_CUSTOMER_WO_PAGINATION,
  GET_CONTACTPERSON_BY_ID,
  GET_CONTACTPERSON_WO_PAGINATE,
  GET_COUNTRY,
  GET_COUNTRY_BY_ID,
  GET_CUSTOMER_BY_ID,
  GET_DEPARTMENT_BY_ID,
  GET_DESIGNATION_BY_ID,
  GET_HSN_CODE_BY_ID,
  GET_ITEM_CATEGORY,
  GET_ITEM_CATEGORY_BY_ID,
  GET_ITEM_MAKER_BY_ID,
  GET_ITEM_SUB_CATEGORY_BY_ID,
  GET_LEAD_REFERENCE_BY_ID,
  GET_LEAD_REFERENCE_WO_PAGINATE,
  GET_LEAVE_BY_ID,
  GET_LEDGER_GROUP_BY_ID,
  GET_MARKETING_LEAD_BY_ID,
  GET_MARKETING_LEAD_DOCUMENT_BY_ID,
  GET_OWNERSHIP_BY_ID,
  GET_OWNERSHIP_WO_PAGINATE,
  GET_SHIFT_BY_ID,
  GET_TERMS_CONDITIONS_BY_ID,
  GET_UNIT_BY_ID,
  GET_UNIT_MEASURE_BY_ID,
  GET_USER_BY_ID,
  GET_WAREHOUSE_BY_ID,
  UPDATE_COUNTRY,
  UPDATE_DEPARTMENT,
  UPDATE_DESIGNATION,
  UPDATE_DOCUMENT_LEAD,
  UPDATE_HSN_CODE,
  UPDATE_ITEM_CATEGORY,
  UPDATE_ITEM_MAKE,
  UPDATE_ITEM_SUB_CATEGORY,
  UPDATE_LEAD_MARKETING,
  UPDATE_LEAD_REFERENCE,
  UPDATE_LEAVE,
  UPDATE_LEDGER_GROUP,
  UPDATE_OWNERSHIP,
  UPDATE_SHIFT,
  UPDATE_TERMS_CONDITIONS,
  UPDATE_UNIT,
  UPDATE_UNIT_MEASURE,
  UPDATE_USER,
  UPDATE_WAREHOUSE,
  FIND_CONTACTPERSON_DEPARTMENT_BYID,
  FIND_CONTACTPERSON_DESINATION_BYID,
  GET_CONTACTPERSON_SEARCH,
} from "../../../globals";
import { ThreeDots } from "react-loader-spinner";
import CustomFileInputNew from "../../../components/Common/imagefunction";
import {
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Input,
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import classnames from "classnames";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiDownload2Fill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXls } from "react-icons/bs";
import { RiPdf } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import Image from "react-bootstrap/Image";



class EditMarketingLead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        {
          title: "Marketing Lead",
          link: process.env.PUBLIC_URL + "/marketingleadlist",
        },
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
      FindContactDepartment: [],
      contactpersonDetailsValues: [],
      FindContactDesignation: [],
      ContactPersonSearch: [],
      selectedcontactperson: "",
      ContactPersonDescription: "",
      leadDocument: "",
      department_id: "",
      inputnumber: "",
      activeTab: 1,
      leadvalue: "",
      lead_topic: "",
      nature_of_lead: "",
      mobile_number: "",
      designation: "",
      lead_reference_description: "",

      lead_type: "",
      lead_status: "",
      lead_reference_id_encode: "",
      reference_person_description: "",
      customer_id_encode: "",
      customer_field_description: "",
      comments: "",
      priority: "",
      subject: "",
      description: "",
      start_dt: "",
      end_dt: "",
      contact_person_id_encode: "",
      status: "",
      document_type: "",
      document_name: "",
      selectedCompany: "",
      selectedDepartment: "",
      selectedDesination: "",
      document_url_encode: "",
      selectedFiles: [],
      customer_id_encode: "",

      // PROFILE IMAGE
      defaultfile: "",
      fileData: "",
      contact_person_id_encode_new: [],
      rows: [
        {
          // id_encode: "",
          // document_name: "",
          // document_type: "",
          // document_url_encode: "",
          // is_uploaded: "",

          id: "",
          document_name: "",
          document_type: "",
          document_url_encode: "",
        },
      ],
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
      contactPersornArray: [],
      // contact_person_id_encode: [],
      contactsearchPersonId: "",
      getMarkertinglistbyIdValue: [
        {
          contact_person_id_encode: "",
          mobile_no_1: "",
          department_name: "",
          designation_name: "",
        },
      ],
      contactpersonDetailsValue: [],
      contactpersonDetails: [],
      activity_contact_person_name: "",
      activity_contact_person: "",
      contactpersonDetailsObject: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleTab.bind(this);
    this.toggleTabProgress.bind(this);
    this.handleContactAddMore = this.handleContactAddMore.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  componentDidMount() {
    this.GetAllReferenceId();
    this.getAllCustomers();
    // Access the location object to get route parameters
    const { location } = this.props;
    const { pathname } = location;

    const { match } = this.props;
    // Parse the pathname to get the id parameter
    const id = pathname.substring(pathname.lastIndexOf("/") + 1);
    // this.setState({ id: id })

    const contactsearchPersonId = match.params.id;
    this.setState({ contactsearchPersonId: match.params.id });
    // console.log(LeadInquiryId, "=====>LeadInquiryId");

    this.GetHSNCOde(id);
    this.GetAllReferenceId();
    this.getAllCustomers();
    this.GetAllOwnership();
    this.getAllContacts();
    this.getAllMarketinglists();
  }

  // Callback function to handle file data
  handleFileDataChange = (file) => {
    this.setState({ fileData: file });
  };

  handleAadharBase64DataChange = (base64) => {
    this.setState({ defaultfile: base64 });
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
            this.setState({ Leadreferencelist: data?.data });
          } else if (data.result === false) {
            toast(data.message, {
              type: "error",
            });
          } else {
          }
        });
      });
    } catch (error) {}
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
            toast(data.message, {
              type: "error",
            });
          } else {
          }
        });
      });
    } catch (error) {}
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
      reference_person_description: values.referencepersondetails,
      mobile_number: this.state.inputnumber,
      designation: values.designation,
      lead_reference_description: values.referenceDescription,
      comments: values.comment,
      priority: values.priority, // Update priority with the new value

      // subject: this.state.subject,
      // description: this.state.description,
      // start_dt: this.state.start_dt,
      // end_dt: this.state.end_dt,
      activeTab: 2,
    });
    // this.handleSubmit();
  }

  async StepTwoSubmit(event, values) {
    await this.setState({
      customer_id_encode: values.customerid,
      customer_field_description: values.customerfielddescription,
      contact_person_id_encode: values.selectedcontactperson,
      activeTab: 3,
    });
  }

  async StepThreeSubmit(event, values) {
    // Extracting only the contact_person_id_encode values from the dataArray
    const contactPersonIds = this.state.dataArray.map((item) => {
      return {
        // contact_person_id_encode_AddMore: item.contact_person_id_encode_AddMore,
        contact_person_id_encode: item.contact_person_id_encode,
      };
    });
    this.setState({
      contactPersornArray: contactPersonIds,
    });
    await this.setState({
      contactpersonDetails: contactPersonIds,
      // contactpersonDetails: this.state.dataArray,
      activeTab: 4,
    });
  }

  async StepFourSubmit(event, values) {
    await this.setState({
      subject: values.subject,
      description: values.description,
      start_dt: values.startdate,

      // for file update important
      document_type: values.documenttype,
      document_name: values.documentname,
      // document_url_encode: this.state.selectedFiles[0].base64.split(",")[1],
      status: "Active",
      activeTab: 5,
    });
  }
  async StepFiveSubmit(event, values) {
    await this.setState({
      // subject: values.subject,
      // description: values.description,
      // start_dt: values.startdate,
      // end_dt: values.enddate,
      contact_person_id_encode: values.selectedcontactperson,
    });

    //--- my code
    const data = this.state.contact_person_id_encode_new?.map((data) => {
      return {
        contact_person_id_encode: data?.contact_person_id_encode_new,
      };
    });
    console.log("DRSUB--", this.state.description, this.state.subject);
    // return false;
    this.FinalSubmit(data);

    // console.log(values, "StepFiveSubmit" )
    this.props.history.push("/parasmanierp/marketingleadlist");
    this.getAllMarketinglists();
  }

  async FinalSubmit(data) {
    var Token = localStorage.getItem("userToken");

    try {
      var row = JSON.stringify({
        lead_topic: this.state.lead_topic,
        nature_of_lead: this.state.nature_of_lead,
        lead_type: this.state.lead_type,
        lead_status: this.state.lead_status,
        lead_reference_id_encode: this.state.lead_reference_id_encode,
        reference_person_description: this.state.reference_person_description,

        mobile_number: this.state.inputnumber,
        designation: this.state.designation,
        lead_reference_description: this.state.lead_reference_description,

        customer_id_encode: this.state.customer_id_encode,
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
        contactpersonDetails: data,

        // contactpersonDetails: this.state.getMarkertinglistbyIdValue,
        // contact_person_id_encode: this.state.contact_person_id_encode,
        // contactpersonDetails: this.state.contactPersornArray,
      });
      fetch(UPDATE_LEAD_MARKETING + this.state.getById.id, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token,
          "Content-Type": "application/json",
        },
        body: row,
      }).then((response) => {
        response.json().then((data) => {
          if (data.result === true) {
            this.UpdateLeadDocument(data.data.id);
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
      console.log("DATA-=--", values);
      // this.props.history.push('/parasmanierp/marketingleadlist');
    } else if (this.state.activeTab == 5) {
      this.StepFiveSubmit(event, values);
      // this.props.history.push('/parasmanierp/marketingleadlist');
      this.getAllMarketinglists();
    } else {
      return;
    }
    return;
  }

  // async StepFiveSubmit(event, values) {
  //     await this.setState({
  //         subject: values.subject,
  //         description: values.description,
  //         start_dt: values.startdate,
  //         end_dt: values.enddate,
  //         contact_person_id_encode: values.selectedcontactperson,

  //     })
  //     this.FinalSubmit();
  //     // console.log(values, "=======>StepFiveSubmit");
  //     this.props.history.push('/parasmanierp/marketingleadlist');
  //     this.getAllMarketinglists();
  // }

  //imagePdfFileType Allow
  // getFileAcceptValue(index) {
  //   const { rows } = this.state;
  //   const selectedFileType = rows[index].document_type;

  //   // Set the accept attribute based on the selected file type
  //   switch (selectedFileType) {
  //     case "image":
  //       return ".jpg, .jpeg, .png"; // Only images allowed
  //     case "pdf":
  //       return ".pdf"; // Only PDF files allowed
  //     case "document":
  //       return ".doc, .docx"; // Only DOC and DOCX files allowed
  //     case "spreadsheet":
  //       return ".xls, .xlsx"; // Only XLS and XLSX files allowed
  //     default:
  //       return ""; // Allow all file types if no specific type selected
  //   }
  // }

  //All value of api
  // handleSubmit(event, values) {
  //   if (this.state.activeTab == 1) {
  //     this.StepOneSubmit(event, values);
  //     //   console.log(values, "==========>StepOneSubmit");
  //   } else if (this.state.activeTab == 2) {
  //     this.StepTwoSubmit(event, values);
  //     this.getAllContacts();
  //   } else if (this.state.activeTab == 3) {
  //     this.StepThreeSubmit(event, values);
  //     this.getAllMarketinglists();
  //   } else if (this.state.activeTab == 4) {
  //     this.StepFourSubmit(event, values);
  //     // this.props.history.push('/parasmanierp/marketingleadlist');
  //     this.getAllMarketinglists();
  //   }
  //   // else if (this.state.activeTab == 5) {
  //   //     this.StepFiveSubmit(event, values);
  //   //     // console.log(values, "=======>StepFiveSubmit");
  //   //     // this.props.history.push('/parasmanierp/marketingleadlist');
  //   //      this.getAllMarketinglists();

  //   // }
  //   else {
  //     return;
  //   }
  //   return;
  // }

  // CREATE LEAD API

  //   End------ All step pass value

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
            this.setState({ customerlist: data?.data });
          } else if (data.result === false) {
            toast(data.message, {
              type: "error",
            });
          } else {
          }
        });
      });
    } catch (error) {}
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
            this.setState({ contactpersonlist: data?.data });
            this.setState({ contactpersonlistAddMore: data.data });
          } else if (data.result === false) {
            toast(data.message, {
              type: "error",
            });
          } else {
            this.setState({ contactPersornArray: [] });
          }
        });
      });
    } catch (error) {}
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
            this.setState({ ownershiplist: data?.data });
          } else {
          }
        });
      });
    } catch (error) {}
  }

  //GET ALL Contact Department

  async FindAllContactsDepartment(selectedCompany) {
    this.setState({
      isLoading: true,
    });
    // console.log("====>DepartmentId:123", selectedCompany);
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

        // this.setState({ contactpersonDetailsValues: data.data });
        this.setState({ DepartmentId: data.data.id }, () => {});
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

  //GET ALL ContactsPerson Search
  async getAllContactsPersonSearch(customer_id, department_id, designation_id) {
    // console.log("log---", data);
    // this.setState({
    //   isLoading: true,
    // });
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
        customer_id_encode: customer_id, // Pass the customer_id_encode obtained from state
        department_id_encode: department_id,
        designation_id_encode: designation_id,
      });

      const response = await fetch(GET_CONTACTPERSON_SEARCH, {
        method: "POST",
        headers: myHeaders,
        body: raw,
      });

      const data = await response.json();
      console.error("Error fetching data:", data);
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
    } finally {
      this.setState({
        isLoading: false, // Ensure isLoading is set to false regardless of success or failure
      });
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
            this.setState({ Leadreferencelist: data?.data });
          } else if (data.result === false) {
            toast(data.message, {
              type: "error",
            });
          } else {
          }
        });
      });
    } catch (error) {}
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
            this.setState({ customerlist: data?.data });
          } else if (data.result === false) {
            toast(data.message, {
              type: "error",
            });
          } else {
          }
        });
      });
    } catch (error) {}
  }

  // GET BY ID
  async GetHSNCOde(id) {
    // this.GetLeadDocument(id);
    this.setState({
      isLoading: true,
    });
    var Token = localStorage.getItem("userToken");
    try {
      fetch(GET_MARKETING_LEAD_BY_ID + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Token,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        response.json().then(async (data) => {
          if (data.result === true) {
            if (data.data) {
              console.log("====>LeadMarketingdata", data.data);
              await this.SearchLeadById(data.data?.lead_reference_id);
              await this.SearchCompanyById(data.data?.customer_id);
              await this.SearchContactPersonById(
                data.data?.contact_person_id_encode
              );
              this.FindAllContactsDepartment(data.data?.customer_id);
              this.FindAllContactsDesination(data.data?.customer_id);
              this.getAllContactsPersonSearch(data.data?.customer_id);

              this.setState(
                {
                  getById: data?.data,
                  leadvalue: data.data?.lead_topic,
                  lead_topic: data.data?.lead_topic,
                  nature_of_lead: data.data?.nature_of_lead,
                  lead_type: data.data?.lead_type,
                  lead_status: data.data?.lead_status,
                  lead_reference_id_encode: data.data?.lead_reference_id,
                  reference_person_description: data.data?.lead_reference_name,
                  designation: data.data?.designation,
                  mobile_number: data.data?.mobile_number,

                  customer_id_encode: data.data?.customer_id,
                  customer_field_description:
                    data.data?.customer_field_description,
                  contact_person_id_encode: data.data?.contact_person_id_encode,
                  selectedcontactperson: data.data?.contact_person_id_encode,
                  contactpersonDetails: data.data?.contactpersonDetails,
                  contactpersonDetailsValues: data.data?.contactpersonDetails,
                  comments: data.data?.comments,
                  priority: data.data?.priority,
                  subject: data.data?.subject,
                  description: data.data?.description,
                  start_dt: data.data?.start_dt,
                  end_dt: data.data?.end_dt,
                  status: "Active",
                  document_type: data.data?.document_type,
                  document_name: data.data?.document_name,
                  rows: data?.data?.documents,
                  getMarkertinglistbyIdValue:
                    data?.data?.contact_person_id_encode,
                  activity_contact_person_name:
                    data.data?.activity_contact_person_name,
                  activity_contact_person: data.data?.activity_contact_person,
                },

                () => {
                  // After setting state, save contactpersonDetails in localStorage
                  localStorage.setItem(
                    "contactpersonDetails",
                    JSON.stringify(data.data?.contactpersonDetails)
                  );
                  this.setState({
                    isLoading: false,
                  });
                }
              );
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
  // async GetLeadDocument(LeadID) {
  //   var Token = localStorage.getItem("userToken");
  //   try {
  //     fetch(
  //       GET_MARKETING_LEAD_DOCUMENT_BY_ID +
  //         // "XbPW7awNkzl83LD6"
  //         LeadID,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer " + Token,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     ).then((response) => {
  //       response.json().then((data) => {
  //         console.log(data.data, "==>documentType");
  //         if (data.result === true) {
  //           this.setState({
  //             // rows: data.data[0].documents,
  //             // document_type: data.data?.document_type,
  //             // document_name: data.data?.document_name,
  //             // leadDocument: data?.data?,
  //             // defaultfile: data.data?.document_url
  //           });
  //         } else {
  //           this.setState({ rows: [] });
  //         }
  //       });
  //     });
  //   } catch (error) {
  //     toast("Unable to Fetch Marketing Document", {
  //       type: "error",
  //     });
  //   }
  // }

  // DOCUMENT UPDATE API
  async UpdateLeadDocument(leadid) {
    var Token = localStorage.getItem("userToken");
    try {
      var raw = JSON.stringify({
        marketing_lead_id_encode: this.state.getById.id,
        documents: this.state.rows,
        contactpersonDetails: this.state.contactPersornArray,
        // priority: this.state.priority,
        // subject: this.state.subject,
        // description: this.state.description,
        // start_dt: this.state.start_dt,
        // end_dt: this.state.end_dt,

        // document_type: this.state.document_type,
        // document_name: this.state.document_name,
        // document_url_encode: this.state.selectedFiles[0]?.base64.split(",")[1] ? this.state.selectedFiles[0]?.base64.split(",")[1] : this.state.defaultfile?.split(",")?.[1],
      });
      fetch(UPDATE_DOCUMENT_LEAD, {
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
            this.setState({
              activeTab: 5,
            });
            // this.props.history.goBack();
          } else if (data.result === false) {
            toast(data.message, {
              type: "error",
            });
            this.setState({
              isLoading: false,
            });
          } else {
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

  // ALL DROPDOWN FIELDS
  async SearchLeadById(id) {
    var Token = localStorage.getItem("userToken");
    try {
      await fetch(GET_LEAD_REFERENCE_BY_ID + id, {
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
    } catch (error) {}
  }

  async SearchCompanyById(id) {
    var Token = localStorage.getItem("userToken");
    try {
      await fetch(GET_CUSTOMER_BY_ID + id, {
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
                Companydescription: data.data,
              });
            }
          } else {
          }
        });
      });
    } catch (error) {}
  }

  async SearchContactPersonById(id) {
    const { contactsearchPersonId } = this.state;
    // console.log(contactsearchPersonId, "=======>contactsearchPersonId")
    var Token = localStorage.getItem("userToken");
    try {
      await fetch(GET_CONTACTPERSON_BY_ID + contactsearchPersonId, {
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
                inputnumber: data.data.mobile_no_1,
                ContactPersonDescriptionAddMore: data.data,
              });
            }
          } else {
          }
        });
      });
    } catch (error) {}
  }

  handleDownloadView = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file"); // You can set a custom file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading/viewing file", error);
      });
  };

  handleDownload = async (documentUrl, Name) => {
    // console.log('download---', documentUrl, Name)
    try {
      // Construct the full URL by appending the relative path to the base URL
      const fullUrl = new URL(
        documentUrl,
        "https://" + window.location.host + process.env.PUBLIC_URL + "/"
      );
      const response = await fetch(fullUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = Name; // Set the desired file name
      anchor.target = ""; // Set target to an empty string to force download
      document.body.appendChild(anchor);
      anchor.click();
      // Remove the anchor from the document body
      document.body.removeChild(anchor);
      // Revoke the Object URL to free up resources
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

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
      contact_person_id_encode_AddMore: ContactPersonDescriptionAddMore.id,
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
          contact_person_id_encode_AddMore: "",
        },
      }),
      () => {
        // this.handleAddMoreContactPerson();
        console.log("New Row Data:", this.state.dataArray);
      }
    );
  };

  handleChange = (selectedValue) => {
    // Find the selected contact person object from the list
    const selectedContactPerson = this.state.contactpersonlistAddMore.find(
      (person) => person.id === selectedValue
    );

    // Update state with the selected contact person details
    this.setState({
      selectedcontactpersonAddMore: selectedValue,
      ContactPersonDescriptionAddMore: {
        first_name: selectedContactPerson.first_name,
        last_name: selectedContactPerson.last_name,
        mobile_no_1: selectedContactPerson.mobile_no_1,
        department_name: selectedContactPerson.department_name,
        designation_name: selectedContactPerson.designation_name,
        contact_person_id_encode_AddMore: selectedContactPerson.id,
      },
    });
  };

  deleteAddMorwRow = (Index) => {
    // if (Index >= 1) {
    this.setState((prevState) => ({
      dataArray: prevState.dataArray.filter((_, i) => i !== Index), // Remove the row at the specified index
    }));
    // }
  };

  deleteListsMorwRow = (Index) => {
    // if (Index >= 1) {
    this.setState((prevState) => ({
      dataArray: prevState.dataArray.filter((_, i) => i !== Index), // Remove the row at the specified index
    }));
    // }
  };

  // async getFileIcon(documentUrl) {
  //     const fileType = getFileType(documentUrl);
  //     if (fileType === 'image') {
  //         return <Image src={documentUrl} alt="No file" style={{ width: "80px", height: "80px" }} rounded />;
  //     } else if (fileType === 'pdf') {
  //         return <PdfIcon />;
  //     } else if (fileType === 'xls') {
  //         return <XlsIcon />;
  //     } else {
  //         return <DefaultFileIcon />;
  //     }
  // }

  // async getFileType(documentUrl) {
  //     const extension = documentUrl.split('.').pop().toLowerCase();
  //     if (extension === 'pdf') {
  //         return 'pdf';
  //     } else if (extension === 'xls' || extension === 'xlsx') {
  //         return 'xls';
  //     } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
  //         return 'image';
  //     } else {
  //         return 'other';
  //     }
  // }

  // Function to get file icon based on file extension
  getFileIcon = (url) => {
    if (url) {
      if (url.endsWith(".pdf")) {
        return (
          <span>
            <FaFilePdf />
          </span>
        ); // Replace with your PDF icon
      } else if (url.endsWith(".xls") || url.endsWith(".xlsx")) {
        return (
          <span>
            <BsFiletypeXls />
          </span>
        ); // Replace with your Excel icon
      } else {
        return (
          <Image
            src={url}
            alt="File"
            style={{ width: "80px", height: "80px" }}
            rounded
          />
        ); // Assuming it's an image
      }
    } else {
      return null; // Or any other fallback content you want to render if url is undefined
    }
  };

  render() {
    const { defaultfile } = this.state;
    const {
      isAadharBase64URL,
      getMarkertinglistbyIdValue,
      contactPersornArray,
      contact_person_id_encode,
      selectedcontactpersonAddMore,
      rows,
      dataArray,
      ContactPersonDescriptionAddMore,
      ContactPersonDescription,
      ContactPersonSearch,
    } = this.state;
    console.log(this.state.lead_status, ".state.lead_stat");
    //  console.log(getMarkertinglistbyIdValue, "=====>getMarkertinglistbyIdValue");
    //  console.log(ContactPersonDescriptionAddMore?.mobile_no_1, "=====>ContactPersonDescriptionAddMore");
    // const { isView } = this.props;
    // Retrieve data from localStorage
    const permissionsString = localStorage.getItem("permissionarray");

    // Parse the JSON string into a JavaScript object
    const permissions = JSON.parse(permissionsString);
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

    // Retrieve the value from localStorage
    var contactpersonDetails = localStorage.getItem("contactpersonDetails");

    // Parse the JSON string back to an object
    var contactpersonDetailsObject = JSON.parse(contactpersonDetails);
    // console.log(contactpersonDetailsObject, "======>contactpersonDetailsObject")

    // Now you can use the contactpersonDetailsObject
    console.log("contactpersonlist", this.state.contactpersonlist);
    console.log(
      "====>DepartmentId:123",
      this.state.contact_person_id_encode_new
    );
    // document_type: data.data?.document_type,
    // document_name: data.data?.document_name,
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb
              title="Edit Marketing Lead"
              breadcrumbItems={this.state.breadcrumbItems}
            />
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
              <Col lg="12">
                <Card>
                  <CardBody>
                    <h4 className="card-title mb-4">Lead Details</h4>
                    <div id="basic-pills-wizard" className="twitter-bs-wizard">
                      <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeTab === 1,
                            })}
                            onClick={() => {
                              this.toggleTab(1);
                            }}
                          >
                            <span className="step-number">01</span>
                            <span className="step-title">
                              Lead Detailssssss
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeTab === 2,
                            })}
                            onClick={() => {
                              this.toggleTab(2);
                            }}
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
                            onClick={() => {
                              this.toggleTab(3);
                            }}
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
                            onClick={() => {
                              this.toggleTab(4);
                            }}
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
                        {/* <NavItem>
                                                    <NavLink className={classnames({ active: this.state.activeTab === 5 })}  >
                                                        <span className="step-number">05</span>
                                                        <span className="step-title">Activity Details</span>
                                                    </NavLink>
                                                </NavItem> */}
                      </ul>

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
                            <Row className=" mt-2">
                           
                              <Col lg="4">
                                <Label
                                  className="form-label"
                                  htmlFor="validationCustom01"
                                  style={{ fontSize: "14px" }}
                                >
                                  Topic
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </Label>
                                <AvField
                                  value={this.state.leadvalue}
                                  name="leadtopic"
                                  placeholder="Topic"
                                  type="text"
                                  errorMessage="Please Provide Topic"
                                  className="form-control"
                                  validate={{ required: { value: true } }}
                                  id="validationCustom01"
                                />
                              </Col>

                              <Col lg="4">
                                <Label
                                  className="form-label"
                                  htmlFor="validationCustom01"
                                  style={{ fontSize: "14px" }}
                                >
                                  Nature
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </Label>
                                <AvField
                                  value={this.state.nature_of_lead}
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
                              <Col lg="4">
                                <Label
                                  className="form-label"
                                  htmlFor="validationCustom01"
                                  style={{ fontSize: "14px" }}
                                >
                                  Type
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </Label>
                                <AvField
                                  value={this.state.lead_type}
                                  name="leadtype"
                                  placeholder="Type"
                                  type="select"
                                  errorMessage="Please Provide Type"
                                  className="form-control"
                                  validate={{ required: { value: true } }}
                                  id="validationCustom01"
                                >
                                  <option value={""}>Select Lead Type</option>
                                  <option value={"Active"}>Active</option>
                                  <option value={"In Active"}>In Active</option>
                                  <option value={"Junk"}>Junk</option>
                                </AvField>
                              </Col>
                              <Col lg="4">
                                <Label
                                  className="form-label"
                                  htmlFor="validationCustom01"
                                  style={{ fontSize: "14px" }}
                                >
                                  Status
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </Label>
                                <AvField
                                  value={this.state.lead_status}
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
                                  <option
                                    value={"Multiple Time Call Attempted"}
                                  >
                                    Multiple Time Call Attempted
                                  </option>
                                </AvField>
                              </Col>
                              <Col lg="4">
                                <Label
                                  className="form-label"
                                  htmlFor="validationCustom01"
                                  style={{ fontSize: "14px" }}
                                >
                                  Priority
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </Label>
                                <AvField
                                  name="priority"
                                  value={this.state.priority}
                                  placeholder="Priority"
                                  type="select"
                                  errorMessage="Please Provide Priority"
                                  className="form-control"
                                  validate={{ required: { value: true } }}
                                  id="validationCustom01"
                                >
                                  <option value={""}>Select Priority</option>
                                  <option value={"Low"}>Low</option>
                                  <option value={"Medium"}>Medium</option>
                                  <option value={"High"}>High</option>
                                </AvField>
                              </Col>
                              <Col lg="4" className="d-inline">
                                <Label
                                  className="form-label"
                                  htmlFor="validationCustom04"
                                  style={{ fontSize: "14px" }}
                                >
                                  Reference Type
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </Label>
                                <AvField
                                  value={this.state.lead_reference_id_encode}
                                  required={true}
                                  name="selectedleadreference"
                                  type="select"
                                  id="validationCustom04"
                                  // value={this.state.selectedleadreference}
                                  errorMessage="Please Select a Reference Type."
                                  validate={{ required: { value: true } }}
                                  className="form-control"
                                  onChange={(e) => {
                                    this.setState({
                                      selectedlead: e.target.value,
                                    });
                                    if (e.target.value != "") {
                                      this.SearchLeadById(e.target.value);
                                    }
                                  }}
                                >
                                  <option value={""}>
                                    Select Reference Type
                                  </option>
                                  {this.state.Leadreferencelist.map((item) => {
                                    return (
                                      <option value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </AvField>
                              </Col>
                              <Col lg="4">
                                <Label
                                  className="form-label"
                                  htmlFor="validationCustom01"
                                  style={{ fontSize: "14px" }}
                                >
                                  Reference Person Name
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </Label>
                                <AvField
                                  value={
                                    this.state.reference_person_description
                                  }
                                  // value={this.state.LeadDescription}
                                  // disabled
                                  name="referencepersondetails"
                                  placeholder="Reference Person Name"
                                  type="text"
                                  errorMessage="Please Provide Reference Person Name"
                                  className="form-control"
                                  // validate={{ required: { value: true } }}
                                  id="validationCustom01"
                                />
                              </Col>

                              {this.state.selectedlead != "" ||
                                (this.state.LeadDescription && (
                                  <>
                                    {this.state.selectedlead ===
                                      "76qxErGXQ2yXP3lV" ||
                                    this.state.designation ||
                                    this.state.mobile_number ? (
                                      <>
                                        <Col lg="4">
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="validationCustom007"
                                              style={{ fontSize: "14px" }}
                                            >
                                              Phone No.
                                              <span
                                                style={{ color: "#ff0000" }}
                                              >
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
                                              value={this.state.mobile_number}
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

                                        <Col lg="4">
                                          <Label
                                            className="form-label"
                                            htmlFor="validationCustom01"
                                            style={{ fontSize: "14px" }}
                                          >
                                            Designation teat
                                            {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                          </Label>

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
                                              this.state.FindContactDesignation
                                            ).map((key) => (
                                              <option
                                                key={key}
                                                value={
                                                  this.state
                                                    .FindContactDesignation[key]
                                                    .id
                                                }
                                              >
                                                {
                                                  this.state
                                                    .FindContactDesignation[key]
                                                    .designation_name
                                                }
                                              </option>
                                            ))}
                                          </AvField>
                                          {/* <AvField
                                            name="designation"
                                            value={this.state.designation}
                                            placeholder="Designation"
                                            type="text"
                                            // errorMessage="Please Provide designation"
                                            className="form-control"
                                            // validate={{ required: { value: true } }}
                                            id="validationCustom01"
                                          /> */}
                                        </Col>
                                      </>
                                    ) : (
                                      <Col lg="4">
                                        <Label
                                          className="form-label"
                                          htmlFor="validationCustom01"
                                          style={{ fontSize: "14px" }}
                                        >
                                          Reference Description
                                        </Label>
                                        <AvField
                                          value={this.state.LeadDescription}
                                          name="referenceDescription"
                                          placeholder="Lead Reference Description"
                                          type="textarea"
                                          className="form-control"
                                        />
                                      </Col>
                                    )}
                                  </>
                                ))}
                            </Row>

                            <Col lg="12">
                              <Label
                                className="form-label"
                                // htmlFor="validationCustom01"
                                style={{ fontSize: "14px" }}
                              >
                                Comment
                                {/* <span style={{ color: "#ff0000" }}>*</span> */}
                              </Label>
                              <AvField
                                value={this.state.comments}
                                name="comment"
                                placeholder="Comment"
                                type="textarea"
                                // errorMessage="Please Provide Comment"
                                className="form-control"
                                // validate={{ required: { value: true } }}
                                // id="validationCustom01"
                              />
                            </Col>

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
                          </AvForm>
                        </TabPane>
                        <TabPane tabId={2}>
                          <div>
                            <AvForm
                              className="needs-validation"
                              onValidSubmit={this.handleSubmit}
                              // onSubmit={this.submitStep1}
                            >
                              <Row>
                                <Col lg="4" className="d-inline">
                                  <Label
                                    className="form-label"
                                    htmlFor="validationCustom04"
                                    style={{ fontSize: "14px" }}
                                  >
                                    Select Company Name
                                    <span style={{ color: "#ff0000" }}>*</span>
                                  </Label>
                                  <AvField
                                    value={this.state.customer_id_encode}
                                    required={true}
                                    name="customerid"
                                    type="select"
                                    id="validationCustom04"
                                    // value={this.state.selectedleadreference}
                                    errorMessage="Please Select a Company Name."
                                    validate={{ required: { value: true } }}
                                    disabled
                                    className="form-control"
                                    // onChange={(e) => {
                                    //   this.setState({
                                    //     selectedCopmany: e.target.value,
                                    //   });
                                    //   if (e.target.value != "") {
                                    //     this.SearchCompanyById(e.target.value);
                                    //   }
                                    // }}

                                    onChange={(e) => {
                                      const selectedCompany = e.target.value; // Retrieve selected company ID
                                      console.log(
                                        "Selected Company ID:",
                                        selectedCompany
                                      );
                                      this.setState(
                                        {
                                          selectedCompany: selectedCompany,
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
                                    <option value={""}>Other</option>
                                    {this.state.customerlist.map((item) => {
                                      return (
                                        <option value={item.id}>
                                          {item.company_name}
                                        </option>
                                      );
                                    })}
                                  </AvField>
                                </Col>
                                {/* {this.state.selectedCopmany ||
                                this.state.Companydescription ? (
                                  <>
                                    <Col lg="4">
                                      <Label
                                        className="form-label"
                                        htmlFor="validationCustom01"
                                        style={{ fontSize: "14px" }}
                                      >
                                        Customer Category
                                        <span style={{ color: "#ff0000" }}>
                                          *
                                        </span>
                                      </Label>
                                      <AvField
                                        value={
                                          this.state.Companydescription
                                            .customer_category
                                        }
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
                                    <Col lg="4">
                                      <Label
                                        className="form-label"
                                        htmlFor="validationCustom01"
                                        style={{ fontSize: "14px" }}
                                      >
                                        Customer Type
                                        <span style={{ color: "#ff0000" }}>
                                          *
                                        </span>
                                      </Label>
                                      <AvField
                                        value={
                                          this.state.Companydescription
                                            .customer_type
                                        }
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
                                  </>
                                ) : (
                                  ""
                                )} */}
                                <Col lg="4">
                                  <Label
                                    className="form-label"
                                    htmlFor="validationCustom01"
                                    style={{ fontSize: "14px" }}
                                  >
                                    Department
                                    <span style={{ color: "#ff0000" }}>*</span>
                                  </Label>
                                  <AvField
                                    // required={true}
                                    name="selectedcontactpersonAddMore"
                                    type="select"
                                    id="validationCustom04"
                                    value={this.state.FindContactDepartment}
                                    className="form-control"
                                    onChange={(e) => {
                                      const selectedDepartment = e.target.value; // Retrieve selected company ID
                                      console.log(
                                        "Selected Department ID:",
                                        selectedDepartment
                                      );
                                      this.setState(
                                        {
                                          department_id: selectedDepartment,
                                        },
                                        () => {
                                          this.getAllContactsPersonSearch(
                                            this.state.customer_id_encode,
                                            e.target.value
                                          );
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
                                          this.state.FindContactDepartment[key]
                                            .id
                                        }
                                      >
                                        {
                                          this.state.FindContactDepartment[key]
                                            .department_name
                                        }
                                      </option>
                                    ))}
                                  </AvField>
                                </Col>
                                <Col lg="4">
                                  <Label
                                    className="form-label"
                                    htmlFor="validationCustom01"
                                    style={{ fontSize: "14px" }}
                                  >
                                    Designation
                                    <span style={{ color: "#ff0000" }}>*</span>
                                  </Label>
                                  <AvField
                                    // required={true}
                                    name="selectedcontactpersonAddMore"
                                    type="select"
                                    // id="validationCustom04"
                                    // value={this.state.selectedleadreference}
                                    // errorMessage="Please Select a Contact Person."
                                    // validate={{ required: { value: true } }}
                                    value={this.state.FindContactDesignation}
                                    className="form-control"
                                    onChange={(e) => {
                                      const selectedDesination = e.target.value; // Retrieve selected company ID
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
                                          this.getAllContactsPersonSearch(
                                            this.state.customer_id_encode,
                                            this.state.FindContactDepartment[0]
                                              .id,
                                            e.target.value
                                          );
                                        }
                                      );
                                    }}
                                  >
                                    <option value={""}>
                                      Select Designation
                                    </option>
                                    {/* <option value={""} >Other</option> */}
                                    {Object.keys(
                                      this.state.FindContactDesignation
                                    ).map((key) => (
                                      <option
                                        key={key}
                                        value={
                                          this.state.FindContactDesignation[key]
                                            .id
                                        }
                                      >
                                        {
                                          this.state.FindContactDesignation[key]
                                            .designation_name
                                        }
                                      </option>
                                    ))}
                                  </AvField>
                                </Col>
                              </Row>
                              <div>
                                {/* Start--- Company Tables */}
                                <h4> Select Contact Person </h4>
                                <hr />
                                <Table className="mb-3 table-nowrap">
                                  <thead className="bg-light">
                                    <tr>
                                      <th style={{ width: "50px" }}>
                                        <div className="form-check">
                                          {/* <Input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="customControlInline"
                                          /> */}
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
                                        {ContactPersonSearch?.length === 0 ? (
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
                                              (item, index) => {
                                                // const isAssociateIdPresent =
                                                //   item?.associate_order_data?.some(
                                                //     (assoc) =>
                                                //       assoc.associate_id ===
                                                //       AssociateId
                                                //   );

                                                const isSelected =
                                                  this.state.contactpersonDetailsValues?.some(
                                                    (assoc) =>
                                                      assoc.contact_person_id_encode ===
                                                      item.id
                                                  );

                                                const matchedObject =
                                                  this.state.contactpersonDetailsValues?.find(
                                                    (assoc) =>
                                                      assoc.contact_person_id_encode ===
                                                      item.id
                                                  );

                                                const isSelectedFind =
                                                  this.state.contactpersonDetailsValues?.find(
                                                    (assoc) =>
                                                      assoc.contact_person_id_encode ===
                                                      item.id
                                                  );

                                                console.log(
                                                  "isAssociateIdPresent===>",
                                                  this.state
                                                    .contactpersonDetailsValues
                                                );
                                                console.log(
                                                  "testing===>",
                                                  this.state
                                                    .contact_person_id_encode_new,
                                                  matchedObject
                                                );

                                                return (
                                                  <tr key={index}>
                                                    <td>
                                                      <div className="form-check">
                                                        <Input
                                                          type="checkbox"
                                                          className="form-check-input"
                                                          id={`customControlInline_${index}`}
                                                          // checked={
                                                          //   item.contact_person_id_encode ==
                                                          //     this.state
                                                          //       .contact_person_id_encode &&
                                                          //   "true"
                                                          // }
                                                          // checked

                                                          defaultChecked={
                                                            isSelected
                                                          }
                                                          // checked={
                                                          //   isSelected
                                                          //     ? true
                                                          //     : false
                                                          // }
                                                          onChange={(e) => {
                                                            console.log(
                                                              " ",
                                                              this.state
                                                                .contact_person_id_encode_new
                                                            );
                                                            //   this.setState({
                                                            //     contactPersornArrayData:
                                                            //       item.id,
                                                            //   });
                                                            const commonElements =
                                                              this.state.contact_person_id_encode_new.filter(
                                                                (item) =>
                                                                  this.state.ContactPersonSearch.includes(
                                                                    item
                                                                  )
                                                              );

                                                            console.log(
                                                              "testing===>",
                                                              commonElements
                                                            );
                                                            // contactpersonDetailsValues

                                                            // this.setState({
                                                            //   data: this.state.contact_person_id_encode_new.map(items => {
                                                            //     if (items.id === item.id) {
                                                            //       return { ...items, checked: !item.checked };
                                                            //     }
                                                            //     return item;
                                                            //   })
                                                            // });

                                                            // this.setState(
                                                            //   (prevState) => ({
                                                            //     contact_person_id_encode_new:
                                                            //       [
                                                            //         {
                                                            //           contact_person_id_encode_new:
                                                            //             item.id,
                                                            //         },
                                                            //       ],
                                                            //   })
                                                            // );

                                                            this.setState(
                                                              (prevState) => ({
                                                                contact_person_id_encode_new:
                                                                  [
                                                                    matchedObject,
                                                                    ...prevState.contact_person_id_encode_new,

                                                                    {
                                                                      contact_person_id_encode_new:
                                                                        item,
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
                                                        {item.designation_name}
                                                      </p>
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                            )}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </tbody>
                                </Table>
                              </div>
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
                                Previous
                              </Button>
                              <Button
                                color="primary"
                                type="submit"
                                style={{ float: "right" }}
                              >
                                Next
                              </Button>
                            </AvForm>
                          </div>
                        </TabPane>

                        <TabPane tabId={3}>
                          <div>
                            <AvForm
                              className="needs-validation"
                              onValidSubmit={this.handleSubmit}
                              // onSubmit={this.submitStep1}
                            >
                              <Row>
                                <div className="table-responsive">
                                  <Table className="mb-3 table-nowrap">
                                    <thead className="bg-light">
                                      <tr>
                                        <th>File Name</th>
                                        <th>Image</th>
                                        <th>File</th>
                                        <th>Actions</th>
                                      </tr>
                                    </thead>
                                    {/* <tbody>
                                                                            {this.state.rows?.map((item, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        <AvField
                                                                                            value={item.document_name}
                                                                                            name={`FileName-${index}`}
                                                                                            placeholder="File Name"
                                                                                            type="text"
                                                                                            errorMessage="Please Provide File Name"
                                                                                            className="form-control"
                                                                                            onChange={(e) => {
                                                                                                const { rows } = this.state;
                                                                                                rows[index].document_name = e.target.value;
                                                                                                this.setState({ rows });
                                                                                            }}
                                                                                        />
                                                                                    </td>
                                                                                    <td>
                                                                                        <AvField
                                                                                            value={item.document_type}
                                                                                            name={`FileType-${index}`}
                                                                                            placeholder="File Type"
                                                                                            type="select"
                                                                                            errorMessage="Please Provide File Type"
                                                                                            className="form-control"
                                                                                            onChange={(e) => {
                                                                                                const { rows } = this.state;
                                                                                                rows[index].document_type = e.target.value;
                                                                                                this.setState({ rows });
                                                                                            }}
                                                                                        >
                                                                                            <option value={""}>Select Document Type</option>
                                                                                            <option value={"image"}>Image</option>
                                                                                            <option value={"pdf"}>PDF</option>
                                                                                        </AvField>
                                                                                    </td>
                                                                                    <td style={{ width: '200px' }}>
                                                                                        {item.document_url ? (
                                                                                            <Button color="primary" onClick={() => this.handleDownload(item.document_url)}>
                                                                                                Download File
                                                                                                <RiDownload2Fill style={{ color: "white", width: "20px", height: "20px", marginLeft: "5px" }} />
                                                                                            </Button>
                                                                                        ) : (
                                                                                            <h6>
                                                                                                <input
                                                                                                    type="file"
                                                                                                    onChange={(e) => this.handleFileChange(e, index)}
                                                                                                />
                                                                                            </h6>
                                                                                        )}
                                                                                    </td>
                                                                                    <td>
                                                                                        <Button color="primary" onClick={this.addRow}>
                                                                                            Add Row
                                                                                        </Button>
                                                                                        <Button
                                                                                            onClick={() => this.deleteRow(index)}
                                                                                            style={{
                                                                                                backgroundColor: "white",
                                                                                                border: "none",
                                                                                                marginLeft: "5px",
                                                                                            }}
                                                                                        >
                                                                                            <RiDeleteBin6Line style={{ color: "red" }} />
                                                                                        </Button>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody> */}
                                    <tbody>
                                      {this.state.rows?.length > 0 ? (
                                        this.state.rows.map((item, index) => (
                                          <tr key={index}>
                                            <td>
                                              <AvField
                                                value={item.document_name}
                                                name={`FileName-${index}`}
                                                placeholder="File Name"
                                                type="text"
                                                errorMessage="Please Provide File Name"
                                                className="form-control"
                                                onChange={(e) => {
                                                  const { rows } = this.state;
                                                  rows[index].document_name =
                                                    e.target.value;
                                                  this.setState({ rows });
                                                }}
                                              />
                                            </td>
                                            {/* <td>
                                                                                            <AvField
                                                                                                value={item.document_type}
                                                                                                name={`FileType-${index}`}
                                                                                                placeholder="File Type"
                                                                                                type="select"
                                                                                                errorMessage="Please Provide File Type"
                                                                                                className="form-control"
                                                                                                onChange={(e) => {
                                                                                                    const { rows } = this.state;
                                                                                                    rows[index].document_type = e.target.value;
                                                                                                    this.setState({ rows });
                                                                                                }}
                                                                                            >
                                                                                                <option value={""}>Select Document Type</option>
                                                                                                <option value={"image"}>Image</option>
                                                                                                <option value={"pdf"}>PDF</option>
                                                                                            </AvField>
                                                                                        </td> */}
                                            <td>
                                              {/* <AvField> */}
                                              {/* <div style={{ border: '1px solid white', width: "80px", height: "80px", borderRadius: "10px" }}>
                                                                                                <Image src={item.document_url} alt="No file" style={{ width: "80px", height: "80px" }} rounded />
                                                                                            </div> */}
                                              <div
                                                style={{
                                                  border: "1px solid white",
                                                  width: "80px",
                                                  height: "80px",
                                                  borderRadius: "10px",
                                                }}
                                              >
                                                {this.getFileIcon(
                                                  item.document_url
                                                )}
                                              </div>

                                              {/* </AvField> */}
                                            </td>

                                            <td style={{ width: "200px" }}>
                                              {item.document_url ? (
                                                <Button
                                                  color="primary"
                                                  onClick={() =>
                                                    this.handleDownload(
                                                      item.document_url,
                                                      item.document_name
                                                    )
                                                  }
                                                >
                                                  Download File
                                                  <RiDownload2Fill
                                                    style={{
                                                      color: "white",
                                                      width: "20px",
                                                      height: "20px",
                                                      marginLeft: "5px",
                                                    }}
                                                  />
                                                </Button>
                                              ) : (
                                                <h6>
                                                  {/* <input
                                                    type="file"
                                                    onChange={(e) =>
                                                      this.handleFileChange(
                                                        e,
                                                        index
                                                      )
                                                    }
                                                  /> */}

                                                  <input
                                                    name={`document_type-${index}`}
                                                    type="file"
                                                    accept={this.getFileAcceptValue(
                                                      index
                                                    )}
                                                    onChange={(e) => {
                                                      const { rows } =
                                                        this.state;
                                                      rows[
                                                        index
                                                      ].document_type =
                                                        e.target.value;
                                                      this.setState({ rows });
                                                      this.handleFileChange(
                                                        e,
                                                        index
                                                      ); // Call handleFileChange here
                                                    }}
                                                    // onChange={(e) => this.handleFileChange(e, index)}
                                                  />
                                                </h6>
                                              )}
                                            </td>
                                            <td>
                                              <Button
                                                color="primary"
                                                onClick={this.addRow}
                                              >
                                                Add Row
                                              </Button>
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
                                            </td>
                                          </tr>
                                        ))
                                      ) : (
                                        <tr>
                                          <td
                                            colSpan="4"
                                            className="text-center"
                                          >
                                            No files found
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
                              </Row>
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
                            </AvForm>
                          </div>
                        </TabPane>
                        {/* <TabPane tabId={3}>
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
                       
                                      <th>File </th>
                                      <th>Actionssss</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.rows.map((item, index) => {
                                      const isAssociateIdPresent =
                                        item?.associate_order_data?.some(
                                          (assoc) =>
                                            assoc.associate_id ===
                                            this.state
                                              .contactpersonDetailsValues
                                        );
                                      return (
                                        <tr key={index}>
                                          <td>
                                            <AvField
                                              name={`FileName-${index}`}
                                              placeholder="File Name"
                                              type="text"
                                          
                                              className="form-control"
                                              onChange={(e) => {
                                                const { rows } = this.state;
                                                rows[index].document_name =
                                                  e.target.value;
                                                this.setState({ rows });
                                              }}
                                          
                                            />
                                          </td>
                                         
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
                                                  this.handleFileChange(
                                                    e,
                                                    index
                                                  ); 
                                                }}
                                           
                                              />
                                              <p className="allow_text_image">
                                                (Allowed file types: pdf, jpg,
                                                jpeg, png, docs, docx, xls,
                                                xlsx)
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
                                      );
                                    })}
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
                        </TabPane> */}
                        <TabPane tabId={4}>
                          <div>
                            <AvForm
                              className="needs-validation"
                              onValidSubmit={this.handleSubmit}
                              // onSubmit={this.submitStep1}
                              // subject: this.state.subject,
                              // description: this.state.description,
                              // start_dt: this.state.start_dt,
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
                                    value={this.state.subject}
                                    // value={this.state.leadvalue}
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
                                    value={this.state.description}
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
                                    value={this.state.start_dt} // Set current date as the value
                                    errorMessage="Please select a date."
                                    validate={{ required: { value: true } }}
                                    className="form-control"
                                    onChange={this.handleStartDateChange}
                                  ></AvField>
                                </Col>
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
                                            <span
                                              style={{
                                                fontSize: "14px",
                                                marginLeft: "6px",
                                                color: "#676363",
                                              }}
                                            >
                                              {this.state.leadvalue}
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
                                              {this.state.nature_of_lead}
                                              {/* {this.state.getById.lead_topic} */}
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
                                              {this.state.lead_type}
                                            </span>
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
                                              {this.state.lead_status}
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
                                              {this.state.priority}
                                            </span>
                                          </div>
                                          <div className="p-2">
                                            <b>Reference Type:</b>
                                            <span
                                              style={{
                                                fontSize: "14px",
                                                marginLeft: "6px",
                                                color: "#676363",
                                              }}
                                            >
                                              {
                                                this.state
                                                  .lead_reference_id_encode
                                              }
                                            </span>
                                          </div>
                                          <div className="p-2">
                                            <b>Comment:</b>
                                            <span
                                              style={{
                                                fontSize: "14px",
                                                marginLeft: "6px",
                                                color: "#676363",
                                              }}
                                            >
                                              {this.state.comments}
                                            </span>
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
                                            <b>Company Name:</b>
                                            <span
                                              style={{
                                                fontSize: "14px",
                                                marginLeft: "6px",
                                                color: "#676363",
                                              }}
                                            >
                                              {this.state.selectedCompany}
                                              pendding
                                            </span>
                                          </div>

                                          <div className="p-2">
                                            <b>Department:</b>
                                            <span
                                              style={{
                                                fontSize: "14px",
                                                marginLeft: "6px",
                                                color: "#676363",
                                              }}
                                            >
                                              pendding
                                              {/* {this.state.FindContactDepartment} */}
                                            </span>
                                          </div>
                                        </Col>
                                        <Col lg="6">
                                          <div className="p-2">
                                            <b>Designation:</b>
                                            <span
                                              style={{
                                                fontSize: "14px",
                                                marginLeft: "6px",
                                                color: "#676363",
                                              }}
                                            >
                                              pendding
                                              {/* {
                                                this.state
                                                  .FindContactDesignation
                                              } */}
                                            </span>
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
                                      {this.state.rows.map((items) => {
                                        return (
                                          <Row className="mt-2  border-top">
                                            {/* <h6 className="p-2 border-bottom" style={{ fontSize: "14px" }}><b>Attach File</b></h6> */}
                                            <Col lg="6">
                                              <div className="p-2">
                                                <b>File Name:</b>
                                                <span
                                                  style={{
                                                    fontSize: "14px",
                                                    marginLeft: "6px",
                                                    color: "#676363",
                                                  }}
                                                >
                                                  {items.document_name}
                                                </span>
                                              </div>
                                            </Col>
                                            <Col lg="6">
                                              <div className="p-2">
                                                <b>File/Images:</b>
                                                <span
                                                  style={{
                                                    fontSize: "14px",
                                                    marginLeft: "6px",
                                                    color: "#676363",
                                                  }}
                                                >
                                                  {/* {this.state.getById.lead_topic} */}
                                                  pandding
                                                  {items.document_name}
                                                </span>
                                              </div>
                                            </Col>
                                          </Row>
                                        );
                                      })}
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
                                                {this.state.subject}
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
                                                {this.state.description}
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
                                                {this.state.end_dt}
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

                    {/* <Button color="primary" type="submit" className="MT-2" >
                                            Create Market Lead
                                        </Button>

                                        <Button
                                            color="secondary"
                                            className="mx-2"
                                            onClick={() => this.props.history.goBack()}
                                        >
                                            Cancel
                                        </Button> */}
                  </CardBody>
                </Card>
              </Col>
            )}
          </Container>
        </div>

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
              onValidSubmit={this.handleSubmit}
              // onSubmit={this.submitStep1}
            >
              <Row>
                <Col lg="3" className="d-inline">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Label className="form-label" htmlFor="validationCustom04">
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
                    errorMessage="Please Select a Contact Person."
                    validate={{ required: { value: true } }}
                    className="form-control"
                    onChange={(e) => this.handleChange(e.target.value)}
                  >
                    <option value={""}>Select Contact Person</option>
                    <option value={""}>Other</option>
                    {this.state.contactpersonlistAddMore.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.first_name + " " + item.last_name}
                        </option>
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
                      >
                        Contact Person Phone No.
                        <span style={{ color: "#ff0000" }}>*</span>
                      </Label>
                      <AvField
                        value={
                          this.state.ContactPersonDescriptionAddMore.mobile_no_1
                        }
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
                      >
                        Contact Person Designation
                        <span style={{ color: "#ff0000" }}>*</span>
                      </Label>
                      <AvField
                        value={
                          this.state.ContactPersonDescriptionAddMore
                            .designation_name
                        }
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
                      >
                        Contact Person Department
                        <span style={{ color: "#ff0000" }}>*</span>
                      </Label>
                      <AvField
                        value={
                          this.state.ContactPersonDescriptionAddMore
                            .department_name
                        }
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
              </Row>
              <div
                className="text-center Contactperson"
                style={{ float: "right" }}
              >
                <Row>
                  <Col lg={8}>
                    <Button
                      color="primary"
                      type="submit"
                      onClick={this.handleFormSubmit}
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

export default EditMarketingLead;
