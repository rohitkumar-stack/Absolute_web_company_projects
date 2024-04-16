import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

// import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

// Inner Authentication
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
import Createcompanytypedepartment from "../pages/Master/department/createcompanytypedepartment";
import Editcompanytypedepartment from "../pages/Master/department/editcompanytypedepartment";

import editDepartment from "../pages/Master/department/editdepartment";
import GetDesignation from "../pages/Master/designation/designationlist";
import CreateDesignation from "../pages/Master/designation/adddesignation";
import createdesignationCompany from "../pages/Master/designation/createdesignationCompany";
import EditdesignationCompany from "../pages/Master/designation/editdesignationCompany";


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
import TabsItems from "../pages/Master/item/TabsItems";

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
import Duplicateviewleave from "../pages/HR PAGES/Duplicateviewleave";
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
// import CreateMarketingLead1 from "../pages/Master/Marketing lead master/CreateMarketlead1";
// import CreateMarketingLead2 from "../pages/Master/Marketing lead master/createmarketinglead2";
// import CreateMarketingLead3 from "../pages/Master/Marketing lead master/createmarketinglead3";
// import CreateMarketingLead4 from "../pages/Master/Marketing lead master/createmarketinglead4";
import ViewMarketLead from "../pages/Master/Marketing lead master/viewmarketinglead";
import SeeEmployeeLeave from "../pages/HR PAGES/seeemployeeleave";
import EditLeaveentitlement from "../pages/Master/leadentitlement/editleaveentitlement";
import CreateLeaveEntitlement from "../pages/Master/leadentitlement/createleaveentitlement";
import LeaveEntitlement from "../pages/Master/leadentitlement/leaveentitlementlist";
// import ViewMarketLead1 from "../pages/Master/Marketing lead master/marketinglead1";
import ViewMarketLead2 from "../pages/Master/Marketing lead master/marketinglead2";
import CreateMarketingLead5 from "../pages/changepages/Marketing lead master/CreateMarketlead5";
import CreateMarketingLead6 from "../pages/changepages/Marketing lead master/CreateMarketlead6";
import Test from "../pages/changepages/Marketing lead master/components/Layout/Test";
import MarketLeadForWizard from "../pages/Master/Marketing lead master/marketleadfomwizard";
import GetSlot from "../pages/Master/timeslot/gettimeslotlist";
import CreateSlotTime from "../pages/Master/timeslot/addslottime";
import EditSlotTime from "../pages/Master/timeslot/editslottime";
// import ListingPage from "../pages/ExampleNishit/ListingPage";
//Slaes
// import SalesPages from "../pages/Sales/TabsSales/SalesPages";
import Rolepermissionsample from "../pages/Master/Roles/rolepermissionsample";
import LedgerTabs from "../pages/Master/ledgergroup/LedgerTabs";
import UnitTabs from "../pages/Master/unitmaster/UnitTabs";
import LeaveTabs from "../pages/Master/leave/LeaveTabs";
import LeadTabs from "../pages/Master/leadreferencemaster/LeadTabs";


//Slaes
import SalesPages from "../pages/Sales/TabsSales/SalesPages";
import InquiryLists from "../pages/Master/Inquiry/InquiryLists";
import CreateInquiry from "../pages/Master/Inquiry/CreateInquiry";
import EditInquiry from "../pages/Master/Inquiry/EditInquiry";
import Editupdatelists from "../pages/Master/Roles/Editupdatelists";
import TestForm from "../pages/Master/Marketing lead master/TestForm";

//Specific Department Company Type
// import Getdepartmentcompany from "../pages/Master/department/getdepartmentcompany";



const PATH = process.env.PUBLIC_URL;

const authProtectedRoutes = [

	//Utility
	{ path: PATH + "/dashboard", component: Dashboard },

	// ***************************PARASMANI******************************

	// PARASMANI ROUTES
	{ path: PATH + "/myprofile", component: MyProfile },

	// MASTER ROUTES

	// ROLES ROUTES
	{ path: PATH + "/createrole", component: CreateRole },
	{ path: PATH + "/roleslist", component: Roleslist },

	//rolePermission
	{ path: PATH + "/editrole/:id", component: EditRole },

	//roleListsUpdate
	{ path: PATH + "/editrolelists/:id", component: Editupdatelists },

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
	{ path: PATH + "/ledgerTabs", component: LedgerTabs },
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

	// DEPARTMENT COMPANY SPECIFIC  LIST
	{ path: PATH + "/createdepartmentcompany", component: Createcompanytypedepartment },
	{ path: PATH + "/editdepartmentcompany/:id", component: Editcompanytypedepartment },

	// DESIGNATION  LIST
	{ path: PATH + "/designationlist", component: GetDesignation },
	{ path: PATH + "/editdesignation/:id", component: EditDesignation },
	{ path: PATH + "/createdesignation", component: CreateDesignation },

	//DESINATION COMPANY TYPE 
	{ path: PATH + "/createdesignationcompany", component: createdesignationCompany },
	{ path: PATH + "/editdesignationcompany/:id", component: EditdesignationCompany },
	

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
	{ path: PATH + "/tabsItems", component: TabsItems },
	{ path: PATH + "/edititem/:id", component: EditItem },
	{ path: PATH + "/createitem", component: CreateItem },

	// SHIFT LIST
	{ path: PATH + "/shiftlist", component: GetShiftList },
	{ path: PATH + "/editshift/:id", component: EditShift },
	{ path: PATH + "/createshift", component: CreateShift },


	// UNIT LIST
	{ path: PATH + "/unitTabs", component: UnitTabs },
	// { path: PATH + "/unitmeasurelist", component: UnitTabs },
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
	{ path: PATH + "/leavetabs", component: LeaveTabs },
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
	{ path: PATH + "/leadTabs", component: LeadTabs },
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
	{ path: PATH + "/createmarketlead", component: CreateMarketingLead },
	// { path: PATH + "/createmarketlead1", component: CreateMarketingLead1 },
	// { path: PATH + "/createmarketlead2", component: CreateMarketingLead2 },
	// { path: PATH + "/createmarketlead3", component: CreateMarketingLead3 },
	// { path: PATH + "/createmarketlead4", component: CreateMarketingLead4 },
	{ path: PATH + "/viewmarketlead/:id", component: ViewMarketLead },
	{ path: PATH + "/createmarketlead5", component: CreateMarketingLead5 },
	{ path: PATH + "/createmarketlead6", component: CreateMarketingLead6 },
	{ path: PATH + "/checkoutPage", component: Test },

	// MAIN PAGES MARKET LEAD
	{ path: PATH + "/createmarketleadwizard", component: MarketLeadForWizard },
	{ path: PATH + "/testform", component: TestForm },
	{ path: PATH + "/marketingleadlist", component: GetMarketingLead },
	{ path: PATH + "/editmarketlead/:id", component: EditMarketingLead },
	// { path: PATH + "/viewmarketlead1/:id", component: ViewMarketLead1 },
	{ path: PATH + "/viewmarketlead2/:id", component: ViewMarketLead2 },

	// MAIN PAGES INQUIRY 
	{ path: PATH + "/inquirylist", component: InquiryLists },
	{ path: PATH + "/createInquiry", component: CreateInquiry },
	{ path: PATH + "/editinquiry/:id", component: EditInquiry },

	// GET LEAD DOCUMENT MASTER
	{ path: PATH + "/leaddocumentlist", component: GetLeadDocuments },
	{ path: PATH + "/createleaddocument", component: CreateLeadDocument },


	//  EMPLOYEE LEAVE
	{ path: PATH + "/employeeleavelist", component: GetLeaveForEmployee },
	{ path: PATH + "/applyleave", component: CreateEmployeeLeave },

	// LEAVE ENTITLEMENT 
	{ path: PATH + "/leaveentitlementlist", component: LeaveEntitlement },
	{ path: PATH + "/createleaveentitlement", component: CreateLeaveEntitlement },
	{ path: PATH + "/editleaveentitlement/:id", component: EditLeaveentitlement },

	// SLOT MASTER 
	{ path: PATH + "/slottimelist", component: GetSlot },
	{ path: PATH + "/createslottime", component: CreateSlotTime },
	{ path: PATH + "/editslottime/:id", component: EditSlotTime },

	// FOR HR 
	// GET ALL USERS LEAVES 
	{ path: PATH + "/employeeleaves", component: GetLeaveForEmployees },
	{ path: PATH + "/viewleaverequest/", component: ViewLeaveRequest },
	{ path: PATH + "/viewemployeeleave/", component: SeeEmployeeLeave },
	{ path: PATH + "/viewleaveduplicate/", component: Duplicateviewleave },

	// THEME  SETTING 
	{ path: PATH + "/themesetting", component: ThemeSetting },

	// ROLE PERMISSION  
	{ path: PATH + "/rolepermission", component: RolePermission },
	{ path: PATH + "/rolepermissionsample", component: Rolepermissionsample },

	// CHANGE PASSWORD
	{ path: PATH + "/changepassword", component: changepassword },


	// this route should be at the end of all other routes
	{ path: PATH + "/", exact: true, component: () => <Redirect to={PATH + "/dashboard"} /> }
];

const publicRoutes = [
	{ path: PATH + "/logout", component: Logout },
	{ path: PATH + "/login", component: Login },
	{ path: PATH + "/forgot-password", component: ForgetPwd },
	// { path: PATH + "/register", component: Register },

	// Authentication Inner
	{ path: PATH + "/reset-password", component: ResetPassword },
];

export { authProtectedRoutes, publicRoutes };
