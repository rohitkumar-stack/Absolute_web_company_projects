import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";


// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ChartsKnob from "../pages/Charts/jquery-knob";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle";
import MapsVector from "../pages/Maps/MapsVector";

//Icons
import RemixIcons from "../pages/Icons/RemixIcons";
import MaterialDesign from "../pages/Icons/MaterialDesign";
import DripiIcons from "../pages/Icons/DripiIcons";
import FontAwesome from "../pages/Icons/FontAwesome";

//Utility
import StarterPage from "../pages/Utility/StarterPage";
import Maintenance from "../pages/Utility/Maintenance";
import CommingSoon from "../pages/Utility/CommingSoon";
import Timeline from "../pages/Utility/Timeline";
import FAQs from "../pages/Utility/FAQs";
import Pricing from "../pages/Utility/Pricing";
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";

// Forms
import FormElements from "../pages/Forms/FormElements";
import FormAdvanced from "../pages/Forms/FormAdvanced";
import FormEditors from "../pages/Forms/FormEditors";
import FormValidations from "../pages/Forms/FormValidations";
import FormMask from "../pages/Forms/FormMask";
import FormUpload from "../pages/Forms/FormUpload";
import FormWizard from "../pages/Forms/FormWizard";
import FormXeditable from "../pages/Forms/FormXeditable";

//Ui
import UiAlert from "../pages/Ui/UiAlert";
import UiButtons from "../pages/Ui/UiButtons";
import UiCards from "../pages/Ui/UiCards";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiDropdown from "../pages/Ui/UiDropdown";
import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal";
import UiProgressbar from "../pages/Ui/UiProgressbar";
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiRating from "../pages/Ui/UiRating";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiNotifications from "../pages/Ui/ui-notifications";
import UIRoundSlider from "../pages/Ui/UIRoundSlider";

//Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";
import EditableTables from "../pages/Tables/EditableTables";

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import GetTenantuserList from "../pages/Master/Tenantuser/gettenantuserlist";
import CreateUser from "../pages/Master/Tenantuser/createtenantuser";
import Edittenantuser from "../pages/Master/Tenantuser/edittenantUser";
import GetCountry from "../pages/Master/country/getcountry";
import Editcountry from "../pages/Master/country/editcountry";
import CreateCountry from "../pages/Master/country/addcountry";
import GetStatelist from "../pages/Master/state/getstate";
import CreateState from "../pages/Master/state/addstate";
import EditState from "../pages/Master/state/editstate";
import Roleslist from "../pages/Master/Roles/getroleslist";
import CreateRole from "../pages/Master/Roles/createrole";
import MyProfile from "../pages/Basic/myprofile";
import EditRole from "../pages/Master/Roles/editrole";
import GetHSNCode from "../pages/Master/hsn_code/gethsncodelist";
import CreateHSNCode from "../pages/Master/hsn_code/createhsncode";
import EditHSNCode from "../pages/Master/hsn_code/edithsncode";
import LedgerGroup from "../pages/Master/ledgergroup/getledgergrouplist";
import CreateledgerGroup from "../pages/Master/ledgergroup/createledgergroup";
import EditLedgerGroup from "../pages/Master/ledgergroup/editledgergroup";
import LeagderlList from "../pages/Master/ledger/ledgerlist";
import Createledger from "../pages/Master/ledger/addledger";
import ResetPassword from "../pages/AuthenticationInner/recoverPassword"
import EditLedger from "../pages/Master/ledger/editledger";
import GettermsandConditions from "../pages/Master/termsconditions/gettermsconditions";
import CreateTermsandConditions from "../pages/Master/termsconditions/createtermsandconditions";
import EdittermsandConditions from "../pages/Master/termsconditions/edittermsandconditions";
import GetDepartment from "../pages/Master/department/getdepartment";
import Createdepartment from "../pages/Master/department/createdepartment";
import editDepartment from "../pages/Master/department/editdepartment";
import GetDesignation from "../pages/Master/designation/designationlist";
import CreateDesignation from "../pages/Master/designation/adddesignation";
import EditDesignation from "../pages/Master/designation/editdesignation";
import GetItemCategory from "../pages/Master/itemcategory/itemcategorylist";
import CreateItemCategory from "../pages/Master/itemcategory/additemcategory";
import EditItemCategory from "../pages/Master/itemcategory/edititemcategory";
import GetItemSubCategory from "../pages/Master/itemsubcategory/getitemsubcategory";
import CreateItemSubCategory from "../pages/Master/itemsubcategory/createitemsubcategory";
import EdititemSubCategory from "../pages/Master/itemsubcategory/edititemsubcategory";
import GetItemmakeList from "../pages/Master/Itemmake/itemmakelist";
import CreateItemMake from "../pages/Master/Itemmake/createitemmake";
import EditItemMake from "../pages/Master/Itemmake/edititemmake";
import ItemList from "../pages/Master/item/getitem";
import CreateItem from "../pages/Master/item/createitem";
import GetShiftList from "../pages/Master/shiftmaster/getshiftlist";
import CreateShift from "../pages/Master/shiftmaster/createshift";
import EditShift from "../pages/Master/shiftmaster/editshift";
import GetUnit from "../pages/Master/unitmaster/getunitmaster";
import CreateUnit from "../pages/Master/unitmaster/createunit";
import EditUnit from "../pages/Master/unitmaster/editunit";
import GetUnitMeasure from "../pages/Master/unitmeasure/unitmeasurelist";
import CreateUnitMeasure from "../pages/Master/unitmeasure/createunitmeasure";
import EditunitMeasure from "../pages/Master/unitmeasure/editunitmeasure";
import GetWarehouse from "../pages/Master/warehouse/warehouselist";
import CreateWarehouse from "../pages/Master/warehouse/createwarehouse";
import EditWarehouse from "../pages/Master/warehouse/editwarehouse";
import EditItem from "../pages/Master/item/edititem";
import ThemeSetting from "../pages/Themesetting/Themesetting";
import RolePermission from "../pages/Role&Permission/rolepermission";
import changepassword from "../pages/ChangePassword/changepassword";
import GetLeave from "../pages/Master/leave/getleavelist";
import CreateLeave from "../pages/Master/leave/createleave";
import Editleave from "../pages/Master/leave/editleave";
import GetLeaveBalance from "../pages/Master/Leave Balance/getleavebalance";
import CreateLeaveBalance from "../pages/Master/Leave Balance/createleavebalance";
import EditleaveBalance from "../pages/Master/Leave Balance/editleavebalance";
import GetLeaverequest from "../pages/Master/leave request/getleaverequest";
import CreateleaveRequest from "../pages/Master/leave request/createleaverequest";
import EditLeaveRequest from "../pages/Master/leave request/editleaverequest";
import GetLeaveForEmployee from "../pages/Leave management Employee/getleave";
import CreateEmployeeLeave from "../pages/Leave management Employee/applyleave";
import GetLeaveForEmployees from "../pages/HR PAGES/Getemployeeleaves";
import ViewLeaveRequest from "../pages/HR PAGES/viewemployeeleave";
import GetLeadreference from "../pages/Master/leadreferencemaster/getleadreferences";
import CreateLeadReference from "../pages/Master/leadreferencemaster/createleadreference";
import EditLeadReference from "../pages/Master/leadreferencemaster/editleadreference";
import GetIndustrialType from "../pages/Master/industrialtype/getindustrialtype";
import CreateIndustrialType from "../pages/Master/industrialtype/createindustrialtype";
import EditIndustrialType from "../pages/Master/industrialtype/editindustrialtype";
import GetownerShip from "../pages/Master/ownershipmaster/getownershipmaster";
import CreateOwnership from "../pages/Master/ownershipmaster/createownershipmaster";
import EditOwnership from "../pages/Master/ownershipmaster/editownership";
import GetContacPerson from "../pages/Master/contactperson/getcontactperson";
import CreateContactperson from "../pages/Master/contactperson/createcontactperson";
import GetCustomerMaster from "../pages/Master/customermaster/getcustomermaster";
import CreateCustomer from "../pages/Master/customermaster/Createcustomer";
import EditCustomer from "../pages/Master/customermaster/editcusotmer";
import EditContactPerson from "../pages/Master/contactperson/editcontactperson";
import GetMarketingLead from "../pages/Master/Marketing lead master/geleadlist";
import CreateMarketingLead from "../pages/Master/Marketing lead master/createmarketinglead";
import EditMarketingLead from "../pages/Master/Marketing lead master/editmarketinglead";
import GetLeadDocuments from "../pages/Master/lead documents/getleaddocuments";
import CreateLeadDocument from "../pages/Master/lead documents/createleaddocument";
import CreateMarketingLead1 from "../pages/Master/Marketing lead master/CreateMarketlead1";
import CreateMarketingLead2 from "../pages/Master/Marketing lead master/createmarketinglead2";
import CreateMarketingLead3 from "../pages/Master/Marketing lead master/createmarketinglead3";
import CreateMarketingLead4 from "../pages/Master/Marketing lead master/createmarketinglead4";
import ViewMarketLead from "../pages/Master/Marketing lead master/viewmarketinglead";

import CreateMarketingLead5 from "../pages/Master/Marketing lead master/CreateMarketlead5";
import CreateMarketingLead6 from "../pages/Master/Marketing lead master/CreateMarketlead6";
import MaterialLayout from "../pages/Master/Marketing lead master/components/Layout/MaterialLayout";
import CheckoutPage from "../pages/Master/Marketing lead master/components/CheckoutPage";
import Test from "../pages/Master/Marketing lead master/components/Layout/Test";


const PATH = process.env.PUBLIC_URL;

const authProtectedRoutes = [

	// Tables
	{ path: "/basic-tables", component: BasicTables },
	{ path: "/datatable-table", component: DatatableTables },
	{ path: "/datatable", component: DatatableTables },
	{ path: "/responsive-table", component: ResponsiveTables },
	{ path: "/editable-table", component: EditableTables },

	// Ui
	{ path: "/ui-alerts", component: UiAlert },
	{ path: "/ui-buttons", component: UiButtons },
	{ path: "/ui-cards", component: UiCards },
	{ path: "/ui-carousel", component: UiCarousel },
	{ path: "/ui-dropdowns", component: UiDropdown },
	{ path: "/ui-general", component: UiGeneral },
	{ path: "/ui-grid", component: UiGrid },
	{ path: "/ui-images", component: UiImages },
	{ path: "/ui-lightbox", component: UiLightbox },
	{ path: "/ui-modals", component: UiModal },
	{ path: "/ui-progressbars", component: UiProgressbar },
	{ path: "/ui-tabs-accordions", component: UiTabsAccordions },
	{ path: "/ui-typography", component: UiTypography },
	{ path: "/ui-video", component: UiVideo },
	{ path: "/ui-session-timeout", component: UiSessionTimeout },
	{ path: "/ui-rating", component: UiRating },
	{ path: "/ui-rangeslider", component: UiRangeSlider },
	{ path: "/ui-notifications", component: UiNotifications },
	{ path: "/ui-roundslider", component: UIRoundSlider },

	// Forms
	{ path: "/form-elements", component: FormElements },
	{ path: "/form-advanced", component: FormAdvanced },
	{ path: "/form-editors", component: FormEditors },
	{ path: "/form-mask", component: FormMask },
	{ path: "/form-file-upload", component: FormUpload },
	{ path: "/form-wizard", component: FormWizard },
	{ path: "/form-validation", component: FormValidations },
	{ path: "/form-xeditable", component: FormXeditable },

	//Utility
	{ path: "/starter", component: StarterPage },
	{ path: "/timeline", component: Timeline },
	{ path: "/faqs", component: FAQs },
	{ path: "/pricing", component: Pricing },

	//Icons
	{ path: "/icons-remix", component: RemixIcons },
	{ path: "/material-design", component: MaterialDesign },
	{ path: "/dripicons", component: DripiIcons },
	{ path: "/font-awesome-5", component: FontAwesome },

	// Maps
	{ path: "/google-maps", component: MapsGoogle },
	{ path: "/vector-maps", component: MapsVector },

	//Charts
	{ path: "/apex-charts", component: ChartApex },
	{ path: "/chartjs", component: ChartjsChart },
	{ path: "/charts-sparkline", component: SparklineChart },
	{ path: "/charts-knob", component: ChartsKnob },

	{ path: PATH + "/dashboard", component: Dashboard },


	// ***************************PARASMANI******************************

	// PARASMANI ROUTES
	{ path: PATH + "/myprofile", component: MyProfile },


	// MASTER ROUTES

	// ROLES ROUTES
	{ path: PATH + "/createrole", component: CreateRole },
	{ path: PATH + "/roleslist", component: Roleslist },
	{ path: PATH + "/editrole/:id", component: EditRole },

	// TENANT USER ROUTES
	{ path: PATH + "/createuser", component: CreateUser },
	{ path: PATH + "/users", component: GetTenantuserList },
	{ path: PATH + "/edituser/:id", component: Edittenantuser },

	// COUNTRY LIST
	{ path: PATH + "/countrylist", component: GetCountry },
	{ path: PATH + "/editcountry/:id", component: Editcountry },
	{ path: PATH + "/createcountry", component: CreateCountry },

	// STATE LIST
	{ path: PATH + "/statelist", component: GetStatelist },
	{ path: PATH + "/editstate/:id", component: EditState },
	{ path: PATH + "/createstate", component: CreateState },

	// HSN CODE LIST
	{ path: PATH + "/hsncodelist", component: GetHSNCode },
	{ path: PATH + "/edithsncode/:id", component: EditHSNCode },
	{ path: PATH + "/createhsncode", component: CreateHSNCode },

	// LEDGER GROUP LIST
	{ path: PATH + "/ledgergrouplist", component: LedgerGroup },
	{ path: PATH + "/editledgergroup/:id", component: EditLedgerGroup },
	{ path: PATH + "/addledgergroup", component: CreateledgerGroup },

	// LEDGER  LIST
	{ path: PATH + "/ledgerlist", component: LeagderlList },
	{ path: PATH + "/editledger/:id", component: EditLedger },
	{ path: PATH + "/addledger", component: Createledger },

	// TERMS AND CONDITIONS  LIST
	{ path: PATH + "/termsandconditionslist", component: GettermsandConditions },
	{ path: PATH + "/edittermsconditions/:id", component: EdittermsandConditions },
	{ path: PATH + "/createtermsandconditions", component: CreateTermsandConditions },

	// DEPARTMENT  LIST
	{ path: PATH + "/departmentlist", component: GetDepartment },
	{ path: PATH + "/editdepartment/:id", component: editDepartment },
	{ path: PATH + "/createdepartment", component: Createdepartment },

	// DESIGNATION  LIST
	{ path: PATH + "/designationlist", component: GetDesignation },
	{ path: PATH + "/editdesignation/:id", component: EditDesignation },
	{ path: PATH + "/createdesignation", component: CreateDesignation },

	// ITEM CATEGORY  LIST
	{ path: PATH + "/itemcategorylist", component: GetItemCategory },
	{ path: PATH + "/edititemcategory/:id", component: EditItemCategory },
	{ path: PATH + "/createitemcategory", component: CreateItemCategory },

	// ITEM CATEGORY  LIST
	{ path: PATH + "/itemsubcategorylist", component: GetItemSubCategory },
	{ path: PATH + "/edititemsubcategory/:id", component: EdititemSubCategory },
	{ path: PATH + "/createitemsubcategory", component: CreateItemSubCategory },


	// ITEM CATEGORY  LIST
	{ path: PATH + "/itemmakelist", component: GetItemmakeList },
	{ path: PATH + "/edititemmake/:id", component: EditItemMake },
	{ path: PATH + "/createitemmake", component: CreateItemMake },

	// ITEM   LIST
	{ path: PATH + "/itemlist", component: ItemList },
	{ path: PATH + "/edititem/:id", component: EditItem },
	{ path: PATH + "/createitem", component: CreateItem },

	// SHIFT LIST
	{ path: PATH + "/shiftlist", component: GetShiftList },
	{ path: PATH + "/editshift/:id", component: EditShift },
	{ path: PATH + "/createshift", component: CreateShift },


	// UNIT LIST
	{ path: PATH + "/unitlist", component: GetUnit },
	{ path: PATH + "/editunit/:id", component: EditUnit },
	{ path: PATH + "/createunit", component: CreateUnit },

	// UNIT MEASURE LIST
	{ path: PATH + "/unitmeasurelist", component: GetUnitMeasure },
	{ path: PATH + "/editunitmeasure/:id", component: EditunitMeasure },
	{ path: PATH + "/createunitmeasure", component: CreateUnitMeasure },

	// UNIT MEASURE LIST
	{ path: PATH + "/warehouselist", component: GetWarehouse },
	{ path: PATH + "/editwarehouse/:id", component: EditWarehouse },
	{ path: PATH + "/Createwarehouse", component: CreateWarehouse },

	// LEAVE MASTER LIST
	{ path: PATH + "/leavelist", component: GetLeave },
	{ path: PATH + "/Createleave", component: CreateLeave },
	{ path: PATH + "/editleave/:id", component: Editleave },


	// LEAVE BALANCE MASTER 
	{ path: PATH + "/leavebalancelist", component: GetLeaveBalance },
	{ path: PATH + "/Createleavebalance", component: CreateLeaveBalance },
	{ path: PATH + "/editleavebalance/:id", component: EditleaveBalance },

	// LEAVE REQUEST MASTER 
	{ path: PATH + "/leaverequestlist", component: GetLeaverequest },
	{ path: PATH + "/Createleaverequest", component: CreateleaveRequest },
	{ path: PATH + "/editleaverequest/:id", component: EditLeaveRequest },


	// LEAD REFERENCE MASTER
	{ path: PATH + "/leadreferencelist", component: GetLeadreference },
	{ path: PATH + "/Createleadreference", component: CreateLeadReference },
	{ path: PATH + "/editleadreference/:id", component: EditLeadReference },

	// INDUSTRIAL TYPE MASTER
	{ path: PATH + "/industrialtypelist", component: GetIndustrialType },
	{ path: PATH + "/Createindustrialtype", component: CreateIndustrialType },
	{ path: PATH + "/editindustrialtype/:id", component: EditIndustrialType },

	// OWNER SHIP MASTER

	{ path: PATH + "/ownershiplist", component: GetownerShip },
	{ path: PATH + "/Createownership", component: CreateOwnership },
	{ path: PATH + "/editownership/:id", component: EditOwnership },

	// CUSTOMER MASTER
	{ path: PATH + "/customerlist", component: GetCustomerMaster },
	{ path: PATH + "/createcustomer", component: CreateCustomer },
	{ path: PATH + "/editcustomer/:id", component: EditCustomer },

	// CONTACT  PERSON MASTER
	{ path: PATH + "/contactpersonlist", component: GetContacPerson },
	{ path: PATH + "/createcontactperson", component: CreateContactperson },
	{ path: PATH + "/editcontactperson/:id", component: EditContactPerson },

	// MARKETING LEAD MASTER 
	{ path: PATH + "/marketingleadlist", component: GetMarketingLead },
	{ path: PATH + "/createmarketlead", component: CreateMarketingLead },
	{ path: PATH + "/createmarketlead1", component: CreateMarketingLead1 },
	{ path: PATH + "/createmarketlead2", component: CreateMarketingLead2 },
	{ path: PATH + "/createmarketlead3", component: CreateMarketingLead3 },
	{ path: PATH + "/createmarketlead4", component: CreateMarketingLead4 },
	{ path: PATH + "/createmarketlead5", component: CreateMarketingLead5 },
	{ path: PATH + "/createmarketlead6", component: CreateMarketingLead6 },
	{ path: PATH + "/checkoutPage", component: Test },
	

	{ path: PATH + "/viewmarketlead/:id", component: ViewMarketLead },
	{ path: PATH + "/editmarketlead/:id", component: EditMarketingLead },

	// GET LEAD DOCUMENT MASTER
	{ path: PATH + "/leaddocumentlist", component: GetLeadDocuments },
	{ path: PATH + "/createleaddocument", component: CreateLeadDocument },


	//  EMPLOYEE LEAVE
	{ path: PATH + "/employeeleavelist", component: GetLeaveForEmployee },
	{ path: PATH + "/applyleave", component: CreateEmployeeLeave },


	// FOR HR 
	// GET ALL USERS LEAVES 
	{ path: PATH + "/employeeleaves", component: GetLeaveForEmployees },
	{ path: PATH + "/viewleaverequest/", component: ViewLeaveRequest },

	// THEME  SETTING 
	{ path: PATH + "/themesetting", component: ThemeSetting },

	// ROLE PERMISSION  
	{ path: PATH + "/rolepermission", component: RolePermission },

	// CHANGE PASSWORD
	{ path: PATH + "/changepassword", component: changepassword },

	// this route should be at the end of all other routes
	{ path: PATH + "/", exact: true, component: () => <Redirect to={PATH + "/login"} /> }
];

const publicRoutes = [
	{ path: PATH + "/logout", component: Logout },
	{ path: PATH + "/login", component: Login },
	{ path: PATH + "/forgot-password", component: ForgetPwd },
	{ path: PATH + "/register", component: Register },
	{ path: PATH + "/lock-screen", component: AuthLockScreen },

	// Authentication Inner
	{ path: PATH + "/auth-login", component: Login1 },
	{ path: PATH + "/auth-register", component: Register1 },
	{ path: PATH + "/auth-recoverpw", component: ForgetPwd1 },

	{ path: PATH + "/maintenance", component: Maintenance },
	{ path: PATH + "/comingsoon", component: CommingSoon },
	{ path: PATH + "/404", component: Error404 },
	{ path: PATH + "/500", component: Error500 },
	{ path: PATH + "/reset-password", component: ResetPassword },
];

export { authProtectedRoutes, publicRoutes };
