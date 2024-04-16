//*****************************
//********* AUTH APIs *********
//*****************************


//API BASE URL
const BASE_URL = "https://absoluteweb.org/parasmanierp/api/public/v1";


export const LOGIN_URL = `${BASE_URL}/tenantuser/login`;
export const UPDATE_PROFILE = `${BASE_URL}/updateuserprofilebyid/`;
export const THEME_SETTING = `${BASE_URL}/getallthemesettings`;
export const GET_LOGO = `${BASE_URL}/getallthemesettingswithoutauth`;
export const UPDATE_THEME_SETTING = `${BASE_URL}/updatethemesettingsbyid/`;


//TENANT USER MASTER APIS

// ROLES API
export const GET_ALL_ROLES = `${BASE_URL}/getallrolemasters`;
export const GET_ALL_ROLES_WITHOUT_ADMIN = `${BASE_URL}/getallrolemasterswithoutadmin`;
export const UPDATE_ROLE_STATUS = `${BASE_URL}/updaterolemastersstatusbyid/`;
export const CREATE_ROLE = `${BASE_URL}/createrolemasters`;
export const DELETE_ROLE = `${BASE_URL}/deleterolemasters/`;
export const GET_ROLE_BY_ID = `${BASE_URL}/findrolemastersbyid/`;
export const UPDATE_ROLE = `${BASE_URL}/updaterolemastersbyid/`;

// TENANT USER API
export const GET_ALL_USERS = `${BASE_URL}/getalltenantusers`;
export const CREATE_USER = `${BASE_URL}/createtenantuser`;
export const DELETE_USER = `${BASE_URL}/deletetenantusers/`;
export const GET_USER_BY_ID = `${BASE_URL}/findtenantusersbyid/`;
export const UPDATE_USER = `${BASE_URL}/updatetenantusersbyid/`;
export const UPDATE_USER_STATUS = `${BASE_URL}/updatetenantusersstatusbyid/`;

// TENANT USER PERSONAL DETAILS 
export const CREATE_USER_PERSONAL_DETAILS = `${BASE_URL}/createtenantuserpersonaldetails`;
export const GET_USER_PERSONAL_DETAILS_BY_ID = `${BASE_URL}/findtenantuserspersonaldetailsbyuserid/`;
export const UPDATE_USER_PERSONAL_DETAILS = `${BASE_URL}/updatetenantuserspersonaldetailsbyid/`;

// TENANT USER SALARY DETAILS 
export const CREATE_USER_SALARY_DETAILS = `${BASE_URL}/createsalarydetails`;
export const GET_USER_SALARY_DETAILS_BY_ID = `${BASE_URL}/findsalarydetailsbyuserid/`;
export const UPDATE_USER_SALARY_DETAILS = `${BASE_URL}/updatesalarydetailsbyid/`;


// GET ALL USER WITHOUT ADMIN AND THAT PARTICULAR ID 
export const GET_USERS_WITHOUT_ADMIN_ = `${BASE_URL}/getalltenantuserswithoutadmin`;
export const GET_USERS_WITHOUT_ADMIN_AND_USER = `${BASE_URL}/getalltenantuserswithoutadminandid/`;

// COUNTRY MASTER 
export const GET_COUNTRY = `${BASE_URL}/getallcountrymasters`;
export const GET_COUNTRY_BY_ID = `${BASE_URL}/findcountrymastersbyid/`;
export const CREATE_COUNTRY = `${BASE_URL}/createcountrymasters`;
export const DELETE_COUNTRY = `${BASE_URL}/deletecountrymasters/`;
export const UPDATE_COUNTRY = `${BASE_URL}/updatecountrymastersbyid/`;
export const UPDATE_COUNTRY_STATUS = `${BASE_URL}/updatecountrymastersstatusbyid/`;

// STATE MASTER 
export const GET_STATE = `${BASE_URL}/getallstatemasters`;
export const GET_STATE_BY_ID = `${BASE_URL}/findstatemastersbyid/`;
export const CREATE_STATE = `${BASE_URL}/createstatemasters`;
export const DELETE_STATE = `${BASE_URL}/deletestatemasters/`;
export const UPDATE_STATE = `${BASE_URL}/updatestatemastersbyid/`;
export const UPDATE_STATE_STATUS = `${BASE_URL}/updatestatemastersstatusbyid/`;

// HSN CODE MASTER 
export const GET_HSN_CODE = `${BASE_URL}/getallhsncodemasters`;
export const GET_HSN_CODE_BY_ID = `${BASE_URL}/findhsncodemastersbyid/`;
export const CREATE_HSN_CODE = `${BASE_URL}/createhsncodemasters`;
export const DELETE_HSN_CODE = `${BASE_URL}/deletehsncodemasters/`;
export const UPDATE_HSN_CODE = `${BASE_URL}/updatehsncodemastersbyid/`;
export const UPDATE_HSN_CODE_STATUS = `${BASE_URL}/updatehsncodemastersstatusbyid/`;

// LEDGER GROUP MASTER 
export const GET_LEDGER_GROUP = `${BASE_URL}/getallledgergroupmasters`;
export const GET_LEDGER_GROUP_BY_ID = `${BASE_URL}/findledgergroupmastersbyid/`;
export const CREATE_LEDGER_GROUP = `${BASE_URL}/createledgergroupmasters`;
export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_LEDGER_GROUP = `${BASE_URL}/updateledgergroupmastersbyid/`;
export const UPDATE_LEDGER_GROUP_STATUS = `${BASE_URL}/updateledgergroupmastersstatusbyid/`;

// LEDGER MASTER 
export const GET_LEDGER = `${BASE_URL}/getallledgermaster`;
export const GET_LEDGER_BY_ID = `${BASE_URL}/findledgermasterbyid/`;
export const CREATE_LEDGER = `${BASE_URL}/createledgermaster`;
// export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_LEDGER = `${BASE_URL}/updateledgermasterbyid/`;
export const UPDATE_LEDGER_STATUS = `${BASE_URL}/updateledgermasterstatusbyid/`;

// TERMS & CONDITIONS MASTER 
export const GET_TERMS_CONDITIONS = `${BASE_URL}/getalltermsandconditionmasters`;
export const GET_TERMS_CONDITIONS_BY_ID = `${BASE_URL}/findtermsandconditionmastersbyid/`;
export const CREATE_TERMS_CONDITIONS = `${BASE_URL}/createtermsandconditionmasters`;
// export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_TERMS_CONDITIONS = `${BASE_URL}/updatetermsandconditionmastersbyid/`;
export const UPDATE_TERMS_CONDITIONS_STATUS = `${BASE_URL}/updatetermsandconditionmastersstatusbyid/`;

// DEPARTMENT MASTER 
export const GET_DEPARTMENT = `${BASE_URL}/getalldepartmentcompanywisemaster`;
export const GET_DEPARTMENT_WO_PAGINATE = `${BASE_URL}/getalldepartmentmasterwithoutpaginate`;
export const GET_DEPARTMENT_BY_ID = `${BASE_URL}/finddepartmentcompanywisemasterbyid/`;
export const CREATE_DEPARTMENT = `${BASE_URL}/createdepartmentcompanywisemaster`;
// // export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_DEPARTMENT = `${BASE_URL}/updatedepartmentmasterbyid/`;
export const UPDATE_DEPARTMENT_COMPANY = `${BASE_URL}/updatedepartmentcompanywisemasterbyid/`;
// export const UPDATE_DEPARTMENT_STATUS = `${BASE_URL}/updatedepartmentmasterstatusbyid/`;
export const UPDATE_DEPARTMENT_STATUS = `${BASE_URL}/updatedepartmentcompanywisemasterstatusbyid/`;

//INQUIRY
export const UPDATE_INQUIRY_LEAD_MARKETING = `${BASE_URL}/updatemarketingleadconversionstatusbyid/`;


// changes---
export const GET_ALLDEPARTMENTCOMPANYWISE = `${BASE_URL}/getalldepartmentcompanywisemaster`;
export const GET_FINDDEPARTMENTCOMPANYWISE = `${BASE_URL}/finddepartmentcompanywisemasterbycompanyid/`;

// DESIGNATION MASTER 
export const GET_DESIGNATION = `${BASE_URL}/getalldesignationmaster`;
export const GET_DESIGNATION_WO_ADMIN = `${BASE_URL}/getalldesignationmasterwithoutadmin`;
export const GET_DESIGNATION_BY_ID = `${BASE_URL}/finddesignationcompanywisemasterbyid/`;
export const CREATE_DESIGNATION = `${BASE_URL}/createdesignationmaster`;
export const UPDATE_DESIGNATION = `${BASE_URL}/updatedesignationmasterbyid/`;
// // // export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_DESIGNATION_COMPANY = `${BASE_URL}/updatedesignationcompanywisemasterbyid/`;
// export const UPDATE_DESIGNATION_STATUS = `${BASE_URL}/updatedesignationmasterstatusbyid/`;
export const UPDATE_DESIGNATION_STATUS = `${BASE_URL}/updatedesignationcompanywisemasterstatusbyid/`;
export const CREATE_DESIGNATION_COMPANY_WISE_MASTER = `${BASE_URL}/createdesignationcompanywisemaster`;

//----new_updates
export const GET_AllDESIGNATION = `${BASE_URL}/getalldesignationcompanywisemaster`;
export const GET_AllDESIGNATIONCOMPANYWISE = `${BASE_URL}/getallcustomermasterwithoutpaginate`;
export const GET_DESIGNATION_BY_COMPANY_ID = `${BASE_URL}/finddesignationcompanywisemasterbycompanyid/`;

// ITEM CATEGORY MASTER 
export const GET_ITEM_CATEGORY = `${BASE_URL}/getallitemcategorymaster`;
export const GET_ITEM_CATEGORY_BY_ID = `${BASE_URL}/finditemcategorymasterbyid/`;
export const CREATE_ITEM_CATEGORY = `${BASE_URL}/createitemcategorymaster`;
// export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_ITEM_CATEGORY = `${BASE_URL}/updateitemcategorymasterbyid/`;
export const UPDATE_ITEM_CATEGORY_STATUS = `${BASE_URL}/updateitemcategorymasterstatusbyid/`;


// ITEM SUBCATEGORY MASTER 
export const GET_ITEM_SUB_CATEGORY = `${BASE_URL}/getallitemsubcategorymaster`;
export const GET_ITEM_SUB_CATEGORY_BY_ID = `${BASE_URL}/finditemsubcategorymasterbyid/`;
export const CREATE_SUBITEM_CATEGORY = `${BASE_URL}/createitemsubcategorymaster`;
// // // // export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_ITEM_SUB_CATEGORY = `${BASE_URL}/updateitemsubcategorymasterbyid/`;
export const UPDATE_ITEM_SUB_CATGEORY_STATUS = `${BASE_URL}/updateitemsubcategorymasterstatusbyid/`;


// SHIFT MASTER 
export const GET_SHIFT = `${BASE_URL}/getallshiftmaster`;
export const GET_SHIFT_BY_ID = `${BASE_URL}/findshiftmasterbyid/`;
export const CREATE_SHIFT = `${BASE_URL}/createshiftmaster`;
// export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_SHIFT = `${BASE_URL}/updateshiftmasterbyid/`;
export const UPDATE_SHIFT_STATUS = `${BASE_URL}/updateshiftmasterstatusbyid/`;

// UNIT MASTER 
export const GET_UNIT = `${BASE_URL}/getallunitmasters`;
export const GET_UNIT_BY_ID = `${BASE_URL}/findunitmastersbyid/`;
export const CREATE_UNIT = `${BASE_URL}/createunitmasters`;
// // export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_UNIT = `${BASE_URL}/updateunitmastersbyid/`;
export const UPDATE_UNIT_STATUS = `${BASE_URL}/updateunitmastersstatusbyid/`;

// UNIT MEASURE MASTER 
export const GET_UNIT_MEASURE = `${BASE_URL}/getallunitmeasuremaster`;
export const GET_UNIT_MEASURE_WO_PAGINATE = `${BASE_URL}/getallunitmeasuremasterwithoutpaginate`;
export const GET_UNIT_MEASURE_BY_ID = `${BASE_URL}/findunitmeasuremasterbyid/`;
export const CREATE_UNIT_MEASURE = `${BASE_URL}/createunitmeasuremaster`;
// // // export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_UNIT_MEASURE = `${BASE_URL}/updateunitmeasuremasterbyid/`;
export const UPDATE_UNIT_MEASURE_STATUS = `${BASE_URL}/updateunitmeasuremasterstatusbyid/`;

// WAREHOUSE MASTER 
export const GET_WAREHOUSE = `${BASE_URL}/getallwarehousemaster`;
export const GET_WAREHOUSE_BY_ID = `${BASE_URL}/findwarehousemasterbyid/`;
export const CREATE_WAREHOUSE = `${BASE_URL}/createwarehousemaster`;
// export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_WAREHOUSE = `${BASE_URL}/updatewarehousemasterbyid/`;
export const UPDATE_WAREHOUSE_STATUS = `${BASE_URL}/updatewarehousemasterstatusbyid/`;


// ITEM MAKER MASTER 
export const GET_ITEM_MAKER = `${BASE_URL}/getallitemmakemaster`;
export const GET_ITEM_MAKER_BY_ID = `${BASE_URL}/finditemmakemasterbyid/`;
export const CREATE_ITEM_MAKER = `${BASE_URL}/createitemmakemaster`;
// export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_ITEM_MAKE = `${BASE_URL}/updateitemmakemasterbyid/`;
export const UPDATE_ITEM_MAKE_STATUS = `${BASE_URL}/updateitemmakemasterstatusbyid/`;


// ITEM  MASTER 
export const GET_ITEM = `${BASE_URL}/getallitemmaster`;
export const GET_ITEM_BY_ID = `${BASE_URL}/finditemmasterbyid/`;
export const CREATE_ITEM = `${BASE_URL}/createitemmaster`;
// export const DELETE_LEDGER_GROUP = `${BASE_URL}/deleteledgergroupmasters/`;
export const UPDATE_ITEM = `${BASE_URL}/updateitemmasterbyid/`;
export const UPDATE_ITEM_STATUS = `${BASE_URL}/updateitemmasterstatusbyid/`;

// GET LEAVE MASTER
export const GET_LEAVE = `${BASE_URL}/getallleavesmaster`;
export const GET_LEAVE_WO_PAGINATE = `${BASE_URL}/getallleavesmasterwithoutpaginate`;
export const GET_LEAVE_BASED_ROLE = `${BASE_URL}/getallleavesmasterbyroleidwithoutpaginate/`;
export const GET_LEAVE_TIME_SLOT = `${BASE_URL}/findslotrolebasedbyroleid/`;
export const UPDATE_LEAVE_STATUS = `${BASE_URL}/updateleavemasterstatusbyid/`;
export const CREATE_LEAVE = `${BASE_URL}/createleavemaster`;
export const GET_LEAVE_BY_ID = `${BASE_URL}/findleavemasterbyid/`;
export const UPDATE_LEAVE = `${BASE_URL}/updateleavemasterbyid/`;
export const DELETE_LEAVE = `${BASE_URL}/deleteleavemaster/`;


// GET LEAVE BALANCE MASTER
export const GET_LEAVE_BALANCE = `${BASE_URL}/getallleavesbalances`;
export const UPDATE_LEAVE_BALANCE_STATUS = `${BASE_URL}/updateleavebalancesstatusbyid/`;
export const CREATE_LEAVE_BALANCE = `${BASE_URL}/createleavebalances`;
export const GET_LEAVE_BALANCE_BY_ID = `${BASE_URL}/findleavebalancesbyid/`;
export const UPDATE_LEAVE_BALANCE = `${BASE_URL}/updateleavebalancesbyid/`;
export const DELETE_LEAVE_BALANCE = `${BASE_URL}/deleteleavebalances/`;

// GET LEAVE BALANCE MASTER
export const GET_LEAVE_REQUEST = `${BASE_URL}/getallleavesrequests`;
export const UPDATE_LEAVE_REQUEST_STATUS = `${BASE_URL}/updateleaverequestsstatusbyid/`;
export const CREATE_LEAVE_REQUEST = `${BASE_URL}/createleaverequests`;
export const GET_LEAVE_REQUEST_BY_ID = `${BASE_URL}/findleaverequestsbyid/`;
export const UPDATE_LEAVE_REQUEST = `${BASE_URL}/updateleaverequestsbyid/`;
export const DELETE_LEAVE_REQUEST = `${BASE_URL}/deleteleaverequests/`;


// FOR LEAD REFERENCE MASTER 
export const GET_LEAD_REFERENCE = `${BASE_URL}/getallleadreferencemaster`;
export const GET_LEAD_REFERENCE_WO_PAGINATE = `${BASE_URL}/getallleadreferencemasterwithoutpaginate`;
export const UPDATE_LEAD_REFERENCE_STATUS = `${BASE_URL}/updateleadreferencemasterstatusbyid/`;
export const CREATE_LEAD_REFERENCE = `${BASE_URL}/createleadreferencemaster`;
export const GET_LEAD_REFERENCE_BY_ID = `${BASE_URL}/findleadreferencemasterbyid/`;
export const UPDATE_LEAD_REFERENCE = `${BASE_URL}/updateleadreferencemasterbyid/`;

// FOR INDUSTRIAL TYPE MASTER
export const GET_INDUSTRIAL_TYPE = `${BASE_URL}/getallindustrialtypemaster`;
export const CREATE_INDUSTRIAL_TYPE = `${BASE_URL}/createindustrialtypemaster`;
export const GET_INDUSTRIAL_TYPE_BY_ID = `${BASE_URL}/findindustrialtypemasterbyid/`;
export const UPDATE_INDUSTRIAL_TYPE = `${BASE_URL}/updateindustrialtypemasterbyid/`;
export const UPDATE_INDSUTRIAL_TYPE_STATUS = `${BASE_URL}/updateindustrialtypemasterstatusbyid/`;

// OWNERSHIP MASTER
export const GET_OWNERSHIP = `${BASE_URL}/getallownershipmaster`;
export const GET_OWNERSHIP_WO_PAGINATE = `${BASE_URL}/getallownershipmasterwithoutpaginate`;
export const CREATE_OWNERSHIP = `${BASE_URL}/createownershipmaster`;
export const GET_OWNERSHIP_BY_ID = `${BASE_URL}/findownershipmasterbyid/`;
export const UPDATE_OWNERSHIP = `${BASE_URL}/updateownershipmasterbyid/`;
export const UPDATE_OWNERSHIP_STATUS = `${BASE_URL}/updateownershipmasterstatusbyid/`;

// CUSTOMER MASTER
export const GET_CUSTOMER = `${BASE_URL}/getallcustomermaster`;
export const CREATE_CUSTOMER = `${BASE_URL}/createcustomermaster`;
export const GET_CUSTOMER_BY_ID = `${BASE_URL}/findcustomermasterbyid/`;
export const UPDATE_CUSTOMER = `${BASE_URL}/updatecustomermasterbyid/`;
export const GET_ALL_CUSTOMER_WO_PAGINATION = `${BASE_URL}/getallcustomermasterwithoutpaginate`;
export const UPDATE_CUSTOMER_STATUS = `${BASE_URL}/updatecustomermasterstatusbyid/`;


// CONTACT PERSON MASTER
export const UPDATE_CONTACTPERSON_STATUS = `${BASE_URL}/updatecontactpersonmasterstatusbyid/`;
export const GET_CONTACTPERSON = `${BASE_URL}/getallcontactpersonmaster`;
export const GET_CONTACTPERSON_WO_PAGINATE = `${BASE_URL}/getallcontactpersonmasterwithoutpagination`;
export const CREATE_CONTACTPERSON = `${BASE_URL}/createcontactpersonmaster`;
export const GET_CONTACTPERSON_BY_ID = `${BASE_URL}/findcontactpersonmasterbyid/`;
export const UPDATE_CONTACTPERSON = `${BASE_URL}/updatecontactpersonmasterbyid/`;
export const DELETE_CONTACTPERSON = `${BASE_URL}/deletecontactpersonmaster/`;

//CONTACT PERSON Designation
export const GET_CONTACTPERSON_DESINATION = `${BASE_URL}/getalldesignationcompanywisemasterwithoutpaginate`;
export const GET_COMPANYTYPE = `${BASE_URL}/getallcustomertypemasterwithoutpaginate`;
export const GET_COMPANY_SERVICESOFFERED = `${BASE_URL}/getallcustomerserviceindustrymastersearch`;
export const FIND_CONTACTPERSON_DESINATION_BYID = `${BASE_URL}/finddesignationcompanywisemasterbycompanyid/`;

//CONTACT PERSON Department
export const GET_CONTACTPERSON_DEPARTMENT = `${BASE_URL}/getalldepartmentcompanywisemasterwithoutpaginate`;
export const FIND_CONTACTPERSON_DEPARTMENT_BYID = `${BASE_URL}/finddepartmentcompanywisemasterbycompanyid/`;

//CONTACT PERSON Department
export const GET_CONTACTPERSON_SEARCH = `${BASE_URL}/getallcontactpersonmastersearch`;
// export const GET_De_BY_COMPANY_ID = `${BASE_URL}/finddepartmentcompanywisemasterbycompanyid/`;

//ACTIVITY CONTACTPERSON 
export const GET_ACTIVITY_CONTACTPERSON_BY_ID = `${BASE_URL}/getallcontactpersonbyleadid/`;

// MARKETING LEAD  MASTER 
export const UPDATE_LEAD_MARKETING_STATUS = `${BASE_URL}/updatemarketingleadstatusbyid/`;
export const GET_MARKETING_LEAD = `${BASE_URL}/getallmarketinglead`;
export const GET_MARKETING_LEAD_BY_ID = `${BASE_URL}/findmarketingleadbyid/`;
export const CREATE_MARKETING_LEAD = `${BASE_URL}/createmarketinglead`;
export const CREATE_MARKETING_LEAD_WIDTH_DOCUMENTS = `${BASE_URL}/createmarketingleaddocuments`;
export const UPDATE_LEAD_MARKETING = `${BASE_URL}/updatemarketingleadbyid/`;

//Add More Contact Person Master
export const CREATE_ADD_MORE_CONTACTPERSON = `${BASE_URL}/createcontactpersonmasterd`;

// GET LEAD DOCUMENT MASTER
export const GET_LEAD_DOCUMENT = `${BASE_URL}/getallleaddocuments`;
export const CREATE_DOCUMENT_LEAD = `${BASE_URL}/createleaddocuments`;
export const GET_MARKETING_LEAD_DOCUMENT_BY_ID = `${BASE_URL}/findleaddocumentsbyleadid/`;

export const UPDATE_DOCUMENT_LEAD = `${BASE_URL}/updateleaddocumentsbyid`;




// APPLY FOR LEAVE IN EMPLOYEE
export const GET_LEAVE_REQUEST_BY_USER_ID = `${BASE_URL}/getallleavesrequestsbyuserid/`;
export const GET_LEAVE_REQUEST_BY_USER_ID_MERGE = `${BASE_URL}/getallleavesrequestsbyuseridmerge/`;
export const GET_LEAVE_REQUEST_WO_PAGINATE_BY_USER_ID = `${BASE_URL}/getallleavesrequestsbyuseridwithoutpaginate/`;
export const FIND_ALL_LEAVES_BY_ROLE_ID = `${BASE_URL}/findleaveentitlementrolebasedbyroleid/`;


// FOR HR 
export const GET_LEAVE_REQUEST_FOR_HR = `${BASE_URL}/getallleavesrequests`;
export const GET_LEAVE_REQUEST_FOR_HR_SEARCH = `${BASE_URL}/getallleavesrequestsbysearch`;



// STILL NOT WORKING 
// export const UPDATE_ITEM_SUB_CATGEORY_STATUS = `${BASE_URL}/updateitemsubcategorymasterstatusbyid/`;


// USER PERMISSIONS
export const GET_PERMISSIONS = `${BASE_URL}/getalluserrolepermission`;
export const GET_ALL_PERMISSIONS = `${BASE_URL}/getallpermission`;
export const GET_PERMISSIONS_BY_ID = `${BASE_URL}/getalluserrolepermissionbyroleid/`;
export const UPDATE_PERMISSION = `${BASE_URL}/updateuserrolepermissionbyid`;


// FIND LEAVE BALANCE BY ID 
export const GET_LEAVE_BALANCE_OF_USER_ID = `${BASE_URL}/getallleavesrequestscountbyuserid/`;
// export const GET_LEAVE_BALANCE_OF_USER_ID_2 = `${BASE_URL}/getallleavesbalancesbyuserid/`;
export const GET_LEAVE_BALANCE_OF_USER_ID_2 = `${BASE_URL}/getallleavesbalancescountbyuserid/`;
export const UPDATE_LEAVE_BALANCE_BY_LEAVE_ID = `${BASE_URL}/updateleavebalancesbyleaveid/`;
export const UPDATE_LEAVE_ENTITLEMENT_CREATE = `${BASE_URL}/updateleaveentitlementrolebasedbyid`;



// NOTIFICATIONS URL 
export const GET_NOTIFICATIONS = `${BASE_URL}/findnotificationbyuserid/`;
export const GET_NOTIFICATIONS_BY_USER_ID = `${BASE_URL}/getallnotificationsbyuserid/`;
export const UPDATE_NOTIFICATION_BY_ID = `${BASE_URL}/updatenotificationstatusbyid/`;


// LEAD ENTITLEMENT URL
export const GET_LEAVE_ENTITLEMENT = `${BASE_URL}/getallleaveentitlementrolebased`;
export const CREATE_LEAVE_ENTITLEMENT = `${BASE_URL}/createleaveentitlementrolebased`;
// export const GET_ALL_PERMISSIONS = `${BASE_URL}/getallpermission`;
export const GET_LEAVE_ENTITLEMENT_BY_ID = `${BASE_URL}/findleaveentitlementrolebasedbyid/`;
export const UPDATE_LEAVE_ENTITLEMENT = `${BASE_URL}/updateleaveentitlementrolebasedbyid`;

// MARKETING LEAD URL FOR VIEW PAGE 
export const GET_LEAD_COMMENTS_BY_ID = `${BASE_URL}/getallleadcommentsbyleadid/`;
export const GET_LEAD_LOG_BY_ID = `${BASE_URL}/getallleadlogbyleadid/`;
export const GET_LEAD_ACTIVITY_BY_ID = `${BASE_URL}/getallleadactivitybyleadid/`;
export const UPDATE_LEAD_ACTIVITY = `${BASE_URL}/updateleadactivitybyid/`;
export const DELETE_LEAD_Activity = `${BASE_URL}/deleteleadactivity/`;

//EXPENSES API URL
export const GET_EXPENSES_BY_ID = `${BASE_URL}/getallleadexpensebyleadid/`;

//History
export const GET_HISTORY_BY_ID = `${BASE_URL}/getallmarketingleadaudits/`;

//FOLLOW UP API URL
export const GET_FOLLOWUP_LIST_BY_ID = `${BASE_URL}/getallleadfollowupbyleadid/`;
export const CREATE_FOLLOWUP = `${BASE_URL}/createleadfollowup`;
export const UPDATE_FOLLOWUP = `${BASE_URL}/updateleadfollowupbyid/`;
export const DELETE_FOLLOWUP = `${BASE_URL}/deleteleadfollowup/`;

//APPROVE DISAPPROVE EXPENSES API
export const UPDATE_APPROVE_EXPENSES = `${BASE_URL}/updateleadexpensebyid/`;
export const UPDATE_DISAPPROVE_EXPENSES = `${BASE_URL}/updateleadexpenseflagbyid/`;


// MARKETING LEAD VIEW AND UPDATE 
export const CREATE_LEAD_ACTIVITY = `${BASE_URL}/createleadactivity`;
export const CREATE_LEAD_COMMENT = `${BASE_URL}/createleadcomments`;
export const UPDATE_LEAD_COMMENT = `${BASE_URL}/updateleadcommentsbyid/`;
export const DELETE_LEAD_COMMENT = `${BASE_URL}/deleteleadcomments/`;

//EXPENSES ACTIVITY API 
export const CREATE_EXPENSES_ACTIVITY = `${BASE_URL}/createleadexpense`;



// LEAD INQUIRY
export const UPDATE_LEAD_INQUIRY = `${BASE_URL}/updatemarketingleadconversionstatusbyid/`;
export const CREATE_INQUIRY = `${BASE_URL}/createinquiry`;
export const GET_INQUIRY = `${BASE_URL}/getallinquiry`;
export const UPDATE_INQUIRY = `${BASE_URL}/updateinquirybyid/`;
export const GET_INQUIRY_BY_ID = `${BASE_URL}/findinquirybyid/`;




// TIMESLOT 
export const GET_ALL_SLOTS = `${BASE_URL}/getallslotrolebased`;
export const CREATE_SLOTTIME_ROLEWISE = `${BASE_URL}/updateslotrolebasedbyid`;
export const UPDATE_SLOTTIME_ROLEWISE = `${BASE_URL}/updateslotrolebasedbyid`;
export const GET_SLOTTIME_BY_ROLE_BASE_ID = `${BASE_URL}/findslotrolebasedbyroleid/`;
export const GET_SLOTTIME_BY_ROLE_ID = `${BASE_URL}/findslotrolebasedbyid/`; 


// FORGOT PASSWORD LINK
export const FORGOT_USING_LINK = `${BASE_URL}/sendpasswordresetlink`;
export const RESET_PASSWORD = `${BASE_URL}/forgottenantuserpassword`;
export const CHANGE_PASSWORD = `${BASE_URL}/changetenantuserpassword/`;


// LOGOUT
export const LOGOUT = `${BASE_URL}/tenantuserlogout`;


export const token_key = "userToken";
export const getToken = () => {

    let token = localStorage.getItem(token_key);
    if (!!token) return token;
    return false;
};

export const isSessionActive = () => {
    if (!!getToken()) {
        return true;
    }

    // false if token not found
    return false;
};

export const logout = () => {
    localStorage.clear();
};



