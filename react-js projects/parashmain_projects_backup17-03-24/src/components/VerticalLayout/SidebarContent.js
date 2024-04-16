import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faBuilding, faCode, faCriticalRole, faDotCircle, faFlagUsa, faCircle, faGear, faGlobe, faHome, faLocationDot, faMarsStrokeRight, faRuler, faShieldHalved, faSitemap, faUniversity, faUser, faUsps, faShop, faLeaf, faSailboat } from '@fortawesome/free-solid-svg-icons';


//i18n
import { withNamespaces } from 'react-i18next';

import { connect } from "react-redux";
import {
    changeLayout,
    changeLayoutWidth,
    changeSidebarTheme,
    changeSidebarType,
    changePreloader
} from "../../store/actions";
import { GET_ALL_PERMISSIONS, GET_PERMISSIONS_BY_ID, GET_USER_BY_ID, THEME_SETTING } from "../../globals";
import "../VerticalLayout/sidbar.scss";

class SidebarContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allpermissions: [],
            userpermission: [],
            ShowLeaveModule: false
        };


        // start -Sidebar-Country array 
        this.sidebarCountryArray = [
            {
                href: "countrylist",
                value: "country",
                label: "Country"
            },

        ];
        // End -Sidebar-Country array 

        // start -Sidebar-state array 
        this.sidebarstateArray = [
            {
                href: "statelist",
                value: "state",
                label: "State"
            },

        ];
        // End -Sidebar-Department array

        // start -Sidebar-Designation array 
        this.sidebarDesignationArray = [
            {
                href: "designationlist",
                value: "designation",
                label: "Designation"
            },

        ];
        // End -Sidebar-Department array

        // start -Sidebar-Department array 
        this.sidebarDepartmentArray = [
            {
                href: "departmentlist",
                value: "department",
                label: "Department"
            },

        ];
        // End -Sidebar-Department array

        // start -Sidebar-HSNCode array 
        this.sidebarHSNCodeArray = [
            {
                id: 1,
                href: "hsncodelist",
                value: "hsn_code",
                label: "HSN Code"
            },

        ];
        // End -Sidebar-HSNCode array

        // start -Sidebar-Item array 
        this.sidebarItemCodeArray = [
            {
                id: 2,
                href: "tabsItems",
                value: "item",
                label: "Item"
            },

        ];
        // End -Sidebar-Item array

        // start -Sidebar-HSNCode array 
        this.sidebarLederCodeArray = [
            {
                id: 3,
                href: "ledgerTabs",
                value: "ledger",
                label: "Ledger"
            },

        ];
        // End -Sidebar-HSNCode array

        // start -Sidebar-Shift array 
        this.sidebarShiftArray = [
            {
                id: 1,
                href: "shiftlist",
                value: "shift",
                label: "Shift"
            },

        ];
        // End -Sidebar-Shift array

        // start -Sidebar-termsandconditionslist array 
        this.sidebarTermArray = [
            {
                id: 1,
                href: "termsandconditionslist",
                value: "terms_condition",
                label: "Terms & Conditions"
            },

        ];
        // End -Sidebar-Shift array

        // start -Sidebar-Shift array 
        this.sidebarUnitArray = [
            {
                id: 2,
                href: "unitTabs",
                value: "unit",
                label: "Unit"
            },

        ];
        // End -Sidebar-Shift array





        // start -Sidebar-Single-Unit array 
        // this.sidebarSingleUnitsArray = [
        //     {
        //         id: 1,
        //         href: "unitlist",
        //         value: "unit",
        //         label: "Unit"
        //     },
        //     {
        //         id: 2,
        //         href: "unitmeasurelist",
        //         value: "unit_measure",
        //         label: "Unit Measure"
        //     },

        // ];
        // End -Sidebar- single-Unit array

        // start -Sidebar-Sidebar array 
        this.sidebarwarehouserArray = [
            {
                id: 1,
                href: "warehouselist",
                value: "warehouse",
                label: "Warehouse"
            },

        ];
        // End -Sidebar-Sidebar array
        // start -Sidebar-Single-Leave Manangement array 
        // this.sidebarSingleLeaveArray = [
        //     {
        //         id: 1,
        //         href: "leavelist",
        //         value: "leave",
        //         label: "Leave"
        //     },
        //     {
        //         id: 2,
        //         href: "leavebalancelist",
        //         value: "leave_balances",
        //         label: "Leave Balance"
        //     },
        //     {
        //         id: 2,
        //         href: "leaveentitlementlist",
        //         value: "leave_entitlement",
        //         label: "Leave Entitlemenent"
        //     },

        // ];
        // End -Sidebar- single-Leave Manangement array

        // start -Sidebar-Leave Appliocation array 
        this.sidebarleavemanagementArray = [
            {
                id: 1,
                href: "leavetabs",
                value: "leave",
                label: "Leave Masters"
            },
        ];
        // End -Sidebar-Leave Appliocation  array

        // start -Sidebar-Leave Appliocation array 
        this.sidebarleaveApplicationArray = [

            {
                id: 1,
                // href: "Createleaverequest",
                href: "employeeleaves",
                value: "leave_applications",
                label: "Leave Applications"
            },

        ];
        // End -Sidebar-Leave Appliocation  array



        //comman array of variables
        // Combine the two arrays into one using the spread operator
        this.sidebarArr = [...this.sidebarCountryArray, ...this.sidebarstateArray,
        ...this.sidebarDesignationArray, ...this.sidebarDepartmentArray, ...this.sidebarHSNCodeArray,
        ...this.sidebarItemCodeArray, ... this.sidebarLederCodeArray, , ...this.sidebarShiftArray,
        ...this.sidebarTermArray, ...this.sidebarUnitArray, ...this.sidebarwarehouserArray,
        ...this.sidebarleavemanagementArray, ...this.sidebarleaveApplicationArray];

        // Now, combinedArray contains elements from both sidebarArr and sidebarstateArray
        // console.log(this.sidebarArr);


    }


    async componentDidMount() {
        this.loadPermissions();
        this.getUserPermissions();
        this.initMenu();
        this.GetThemesetting();
    }

    // GET USER Theme Seting 
    async GetThemesetting() {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                THEME_SETTING,
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
                            this.GetUserByID(data.data[0].employee_leave_allow_afterdays)
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
        }
    }

    // GET USER BY Id
    async GetUserByID(Days) {
        let id = localStorage.getItem("tenant_id")
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_USER_BY_ID +
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
                            const endDate = new Date(data.data.end_dt);
                            const today = new Date();
                            const countedtotaldays = new Date(endDate.setDate(endDate.getDate() + parseInt(Days)));
                            if (countedtotaldays < today) {
                                this.setState({ ShowLeaveModule: true });
                            } else if (data.data.end_dt === "" && data.data.employee_status === "2") {
                                this.setState({ ShowLeaveModule: true });
                            } else {
                                this.setState({ ShowLeaveModule: false });
                            }
                        }
                    }
                });
            });
        } catch (error) {
        }
    }

    async loadPermissions() {
        const PermissionArr = await JSON.parse(localStorage.getItem("permissionarray"));
        let tempArr = [];
        PermissionArr?.map((item) => {
            this.sidebarArr.map((sidebar) => {
                if (item.name.includes("Show") && (item.type === sidebar.value)) {
                    tempArr.push({
                        lebel: sidebar.label,
                        value: sidebar.href,
                        active: item.status,
                    });
                }
            });
        });
        this.setState({ finalLI: tempArr })
    }

    // FETCH USER PERMISSIONS
    async getUserPermissions() {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                // GET_PERMISSIONS,
                GET_ALL_PERMISSIONS,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {

                if (response.redirected == true) {
                    this.props.history.push(process.env.PUBLIC_URL + "/login");
                } else {

                    response.json().then((data) => {
                        if (data.result === true) {
                            this.setState({ allpermissions: data.data })
                            // this.setState({ tempAll: data.data })
                            this.getAllUserPermissions(data.data)
                        } else {
                            this.setState({
                                isLoading: false,
                            });
                        }
                    });
                }
            });
        } catch (error) {

            this.setState({
                isLoading: false,
            });
        }
    }

    // FETCH ALL USER ROLE PERMISSIONS
    async getAllUserPermissions(allpermissions) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                // GET_PERMISSIONS,
                GET_PERMISSIONS_BY_ID + this.state.id,
                // GET_ALL_PERMISSIONS,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                response.json().then((data) => {
                    this.setState({ userpermission: data.data })
                    // if (data.result === true) {
                    //     if (data.data) {
                    let userpermission = data.data || [];
                    let finalarr = [];
                    var flag = false;
                    allpermissions.map((allpermissions) => {
                        flag = false;
                        userpermission.map((userpermissions) => {
                            if (allpermissions.id === userpermissions.permission_id) {
                                flag = false;
                                finalarr.push({ ...userpermissions, type: allpermissions.type, update_id: allpermissions.id })
                                flag = true;
                            }

                        })

                        if (!flag) {
                            finalarr.push({ ...allpermissions, status: "Inactive", update_id: allpermissions.id })
                        }
                    })

                    let tempArr = [];
                    finalarr?.map((item) => {
                        this.sidebarArr.map((sidebar) => {
                            if (item.name.includes("Add") && (item.type === sidebar.value)) {
                                tempArr.push({
                                    lebel: sidebar.label,
                                    value: sidebar.href,
                                    active: item.status
                                })
                            }
                        })
                    })
                });
            });
        } catch (error) {

            this.setState({
                isLoading: false,
            });
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if (this.props.type !== prevProps.type) {
                this.initMenu();
            }

        }
    }

    initMenu() {
        new MetisMenu("#side-menu");

        var matchingMenuItem = null;
        var ul = document.getElementById("side-menu");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("mm-active");
                    }
                }
            }
            return false;
        }
        return false;
    };

    toggleDropdown = () => {
        this.setState((prevState) => ({
            isDropdownOpen: !prevState.isDropdownOpen,
        }));
    }


    render() {
        const { isDropdownOpen, ShowLeaveModule } = this.state;
        const Roleid = localStorage.getItem("roleid");
        const Employee_Status = localStorage.getItem("Employee_Status");

        // Retrieve data from localStorage
        const permissionsString = localStorage.getItem("permissionarray");

        // Parse the JSON string into a JavaScript object
        const permissions = JSON.parse(permissionsString);
        const filteredPermissions = permissions.filter(permission => permission.status === 'Active');

        // Output the filtered data
        // console.log("filteredPermissions", filteredPermissions);

        // Check if 'permissions' is an array before using the filter method
        // if (Array.isArray(permissions)) {
        //     // Filter the data where the 'name' property is equal to 'Show'
        //     const filteredPermissions = permissions.filter(permission => permission.status === 'Active');

        //     // Output the filtered data
        //     console.log("filteredPermissions",filteredPermissions);
        // } else {
        //     console.error("'permissions' is not an array.");
        // }
        const CountryListActive = filteredPermissions?.find(permission => permission.name === "Show Country");
        const StateListActive = filteredPermissions?.find(permission => permission.name === "Show State Master");
        const DesignationListActive = filteredPermissions?.find(permission => permission.name === "Show Designation Master");
        const DepartmentListActive = filteredPermissions?.find(permission => permission.name === "Show Department Master");
        const HsnCodeListActive = filteredPermissions?.find(permission => permission.name === "Show Hsn_code Master");
        const ItemListActive = filteredPermissions?.find(permission => permission.name === "Item Masters");
        const LedgerListActive = filteredPermissions?.find(permission => permission.name === "Ledger Masters");
        const ShiftListActive = filteredPermissions?.find(permission => permission.name === "Show Shift Master");
        const termsconditionsListActive = filteredPermissions?.find(permission => permission.name === "Show Terms_condition Master");
        const UnitListActive = filteredPermissions?.find(permission => permission.name === "Unit Masters");
        const warehousListActive = filteredPermissions?.find(permission => permission.name === "Show Warehouse Master");
        // console.log(StateListActive, "StateListActive=====>")

        // Leave Management
        const LeaveManagementListActive = filteredPermissions?.find(permission => permission.name === "Leave Management");
        const LeaveApplicationsListActive = filteredPermissions?.find(permission => permission.name === "Show Leave_applications");
        const LeaveMasterListActive = filteredPermissions?.find(permission => permission.name === "Leave Masters");
        // console.log(LeaveMasterListActive, "===>LeaveMasterListActive")
        //Markrting Management
        const marketingMasterListActive = filteredPermissions?.find(permission => permission.name === "Marketing Management");
        const marketingLeadActiveLists = filteredPermissions?.find(permission => permission.name === "Show Marketing_lead Master");
        const marketingMasterLead = filteredPermissions?.find(permission => permission.name === "Marketing Masters");
        // console.log(marketingMasterLead, "=====>marketingMasterLead");
        //Users
        const UserListActive = filteredPermissions?.find(permission => permission.name === "Show Users");
        //Inquiry
        const InquiryListActive = filteredPermissions?.find(permission => permission.name === "Show Inquiry");




        return (
            <React.Fragment>

                {/* ADMIN  */}
                {Roleid === "NxOpZowo9GmjKqdR" && (
                    <div id="sidebar-menu">
                        <ul className="metismenu list-unstyled" id="side-menu" >
                            <li>
                                <Link to={process.env.PUBLIC_URL + "/dashboard"} className="waves-effect">
                                    <i className="ri-dashboard-fill"></i>
                                    <span className="ms-1">{this.props.t('Dashboard')}</span>
                                </Link>
                            </li>
                            {this.state.finalLI != [] && (
                                <li >
                                    <Link to="/#" className="has-arrow waves-effect ">
                                        <FontAwesomeIcon icon={faSailboat} />
                                        <span className="ms-1">{this.props.t('Masters')}</span>
                                    </Link>
                                    <ul className="sub-menu">
                                        {/* Role */}
                                        <li >
                                            <Link to={process.env.PUBLIC_URL + "/roleslist"}>
                                                <span style={{ marginLeft: "10px" }}>
                                                    <FontAwesomeIcon icon={faCircle} className="circle_icons" /> {this.props.t('Roles')}</span>
                                            </Link>

                                        </li>

                                        {/* Country */}
                                        {
                                            CountryListActive?.status == 'Active' ?
                                                <>
                                                    <li >
                                                        <Link to={process.env.PUBLIC_URL + "/countrylist"}>
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <FontAwesomeIcon icon={faCircle} className="circle_icons" /> {this.props.t('Country')}</span>
                                                        </Link>
                                                    </li>
                                                </>
                                                :
                                                <>

                                                </>
                                        }

                                        {/* State */}
                                        {
                                            StateListActive?.status == 'Active' ?
                                                <>
                                                    {/* <li >
                                                    <Link to={process.env.PUBLIC_URL + "/statelist"}>
                                                        <span style={{ marginLeft: "10px" }}>
                                                            <FontAwesomeIcon icon={faCircle} className="circle_icons" /> {this.props.t('State')}</span>
                                                    </Link>
                                                </li> */}
                                                    {/* Start---  State lists */}
                                                    {this.sidebarstateArray.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                <span style={{ marginLeft: "10px" }}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                            </Link>

                                                        </li>
                                                    ))}
                                                    {/* End-- State dynamic lists */}

                                                </>
                                                :
                                                <>

                                                </>
                                        }

                                        {/* Designation */}

                                        {
                                            DesignationListActive?.status == 'Active' ?
                                                <>
                                                    {/* Start---  Designation lists */}
                                                    {this.sidebarDesignationArray.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                <span style={{ marginLeft: "10px" }}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                            </Link>

                                                        </li>
                                                    ))}
                                                    {/* End-- Designation dynamic lists */}
                                                </>
                                                :
                                                <>
                                                </>
                                        }

                                        {/* Department */}
                                        {
                                            DepartmentListActive?.status == 'Active' ?
                                                <>
                                                    {/* Start---  Department lists */}
                                                    {this.sidebarDepartmentArray.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                <span style={{ marginLeft: "10px" }}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                            </Link>

                                                        </li>
                                                    ))}
                                                    {/* End-- Department dynamic lists */}
                                                </>
                                                :
                                                <>
                                                </>
                                        }

                                        {/* HsnCode */}
                                        {
                                            HsnCodeListActive?.status == 'Active' ?
                                                <>
                                                    {/* Start---  HsnCode lists */}
                                                    {this.sidebarHSNCodeArray.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                <span style={{ marginLeft: "10px" }}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                            </Link>

                                                        </li>
                                                    ))}
                                                    {/* End-- HsnCode dynamic lists */}
                                                </>
                                                :
                                                <>
                                                </>
                                        }

                                        {/* Items */}
                                        {
                                            ItemListActive?.status == 'Active' ?
                                                <>
                                                    {/* Start---  Items lists */}
                                                    {this.sidebarItemCodeArray.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                <span style={{ marginLeft: "10px" }}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                            </Link>

                                                        </li>
                                                    ))}
                                                    {/* End-- HsnCode dynamic lists */}
                                                </>
                                                :
                                                <>
                                                </>
                                        }

                                        {/* Leder */}
                                        {
                                            LedgerListActive?.status == 'Active' ?
                                                <>
                                                    {/* Start---  Leder lists */}
                                                    {this.sidebarLederCodeArray.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                <span style={{ marginLeft: "10px" }}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                            </Link>

                                                        </li>
                                                    ))}
                                                    {/* End-- HsnCode dynamic lists */}
                                                </>
                                                :
                                                <>
                                                </>
                                        }

                                        {/* Shift */}
                                        {
                                            ShiftListActive?.status == 'Active' ?
                                                <>
                                                    {/* Start--- Shift dynamic lists */}
                                                    {this.sidebarShiftArray.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                <span style={{ marginLeft: "10px" }}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                            </Link>

                                                        </li>
                                                    ))}
                                                    {/* End-- shift dynamic lists */}
                                                </>
                                                :
                                                <>
                                                </>
                                        }

                                        {/* Term-condtion */}
                                        {
                                            termsconditionsListActive?.status == 'Active' ?
                                                <>
                                                    {/* Start--- Term condtion dynamic lists */}
                                                    {this.sidebarTermArray.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                <span style={{ marginLeft: "10px" }}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                            </Link>

                                                        </li>
                                                    ))}
                                                    {/* End-- Term condtion dynamic lists */}
                                                </>
                                                :
                                                <>
                                                </>
                                        }

                                        {/* Unit */}
                                        {
                                            UnitListActive?.status == 'Active' ?
                                                <>
                                                    {/* Start--- Unit dynamic lists */}
                                                    {this.sidebarUnitArray.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                <span style={{ marginLeft: "10px" }}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                            </Link>

                                                        </li>
                                                    ))}
                                                    {/* End-- Term condtion dynamic lists */}
                                                </>
                                                :
                                                <>
                                                </>
                                        }

                                        {/* Warehouse */}
                                        {
                                            warehousListActive?.status == 'Active' ?
                                                <>
                                                    {/* Start--- Warehouse dynamic lists */}
                                                    {this.sidebarwarehouserArray.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                <span style={{ marginLeft: "10px" }}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                            </Link>

                                                        </li>
                                                    ))}
                                                    {/* End-- Warehouse dynamic lists */}
                                                </>
                                                :
                                                <>
                                                </>
                                        }




                                    </ul>
                                </li>

                            )}

                            {/* Start---  Leave Management dynamic lists */}
                            {
                                LeaveManagementListActive?.status == 'Active' ?
                                    <>

                                        <li >
                                            <Link to="/#" className="has-arrow waves-effect ">
                                                <FontAwesomeIcon icon={faLeaf} />

                                                <span className="ms-1">{this.props.t('Leave Management')}</span>
                                            </Link>
                                            <ul className="sub-menu">
                                                {/* Start---Leave Master lists */}
                                                {
                                                    LeaveMasterListActive?.status == 'Active' ?
                                                        <>

                                                            {this.sidebarleavemanagementArray.map((item, index) => (
                                                                <li key={index}>
                                                                    <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                        <span style={{ marginLeft: "10px" }}>
                                                                            <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                                    </Link>

                                                                </li>
                                                            ))}
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }

                                                {/* End---Leave Master lists */}

                                                {/* Start---Leave Application lists */}
                                                {
                                                    LeaveApplicationsListActive?.status == 'Active' ?
                                                        <>
                                                            {this.sidebarleaveApplicationArray.map((item, index) => (
                                                                <li key={index}>
                                                                    <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                        <span style={{ marginLeft: "10px" }}>
                                                                            <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                                    </Link>

                                                                </li>
                                                            ))}
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }

                                                {/* End---Leave Application lists */}

                                            </ul>
                                        </li>
                                    </>
                                    :
                                    <>
                                    </>
                            }

                            {/* End--  Leave Management dynamic lists */}



                            {/* Marketing Management */}
                            {
                                marketingMasterListActive?.status == 'Active' ?
                                    <>
                                        {/* Start--- Marketing Management dynamic lists */}
                                        {/* Marketing Management */}
                                        <li>
                                            <Link to="/#" className="has-arrow waves-effect">
                                                <FontAwesomeIcon icon={faShop} />
                                                <span className="ms-1">{this.props.t('Marketing Management')}</span>
                                            </Link>
                                            <ul className="sub-menu">

                                                {/* marketing Master */}
                                                {
                                                    marketingMasterLead?.status == 'Active' ?
                                                        <>
                                                            <li>
                                                                <Link to={process.env.PUBLIC_URL + "/LeadTabs"}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} />
                                                                    <span > {this.props.t('Master Modules')}</span>
                                                                </Link>
                                                            </li>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }

                                                {/* Marketing Lead */}
                                                {
                                                    marketingLeadActiveLists?.status == 'Active' ?
                                                        <>
                                                            <li>
                                                                <Link to={process.env.PUBLIC_URL + "/marketingleadlist"}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} />
                                                                    <span > {this.props.t('Marketing Lead')}</span>
                                                                </Link>
                                                            </li>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }


                                                {/* Inquiry */}
                                                {
                                                    InquiryListActive?.status == 'Active' ?
                                                        <>
                                                            <li>
                                                                <Link to={process.env.PUBLIC_URL + "/inquirylist"}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} />
                                                                    <span > {this.props.t('Inquiry')}</span>
                                                                </Link>
                                                            </li>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }


                                            </ul>
                                        </li>

                                        {/* End-- Marketing Management dynamic lists */}
                                    </>
                                    :
                                    <>
                                    </>
                            }

                            {/* Users */}
                            {
                                UserListActive?.status == 'Active' ?
                                    <>
                                        <li>
                                            <Link to={process.env.PUBLIC_URL + "/users"}>
                                                <i className="fas fa-user-friends" style={{ paddingRight: "5px" }}></i>
                                                <span > {this.props.t('Users')}</span>
                                            </Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                    </>
                            }

                            {/* Marketing Lead */}
                            {/* <li >
                                <Link to={process.env.PUBLIC_URL + "/marketingleadlist"}>
                                    <i className="ri ri-file-edit-line" style={{ paddingRight: "5px" }}></i>
                                    <span> {this.props.t('Marketing Lead')}</span>
                                </Link>
                            </li> */}
                            {/*Theme Setting*/}
                            <li>
                                <Link to={process.env.PUBLIC_URL + "/themesetting"}>
                                    <i className="ri ri-palette-line" style={{ paddingRight: "5px" }}></i>
                                    <span > {this.props.t('Theme Setting')}</span>
                                </Link>
                            </li>

                            {/* <li >
                                <Link to={process.env.PUBLIC_URL + `/slottimelist`}>
                                    <span style={{ marginLeft: "10px" }}>
                                        <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t("Slot Time")}</span>
                                </Link>

                            </li> */}

                        </ul>
                    </div>
                )}

                {/* OTHER ROLES */}
                {/* IF NOT ADMIN THEN THIS DASHBOARD WILL BE SHOWN  */}

                {/* HR Role condtion */}
                {Roleid != "NxOpZowo9GmjKqdR" && (
                    <div id="sidebar-menu">
                        <ul className="metismenu list-unstyled" id="side-menu">
                            <li >
                                <Link to={process.env.PUBLIC_URL + "/dashboard"} className="waves-effect">
                                    <i className="ri-dashboard-fill"></i>
                                    <span className="ms-1">{this.props.t('Dashboard')}</span>
                                </Link>
                            </li>
                            {/* master */}
                            <li >
                                <Link to="/#" className="has-arrow waves-effect ">
                                    <FontAwesomeIcon icon={faSailboat} />
                                    <span className="ms-1">{this.props.t('Masters')}</span>
                                </Link>
                                <ul className="sub-menu">
                                    {/* Country */}
                                    {
                                        CountryListActive?.status == 'Active' ?
                                            <>
                                                <li >
                                                    <Link to={process.env.PUBLIC_URL + "/countrylist"}>
                                                        <span style={{ marginLeft: "10px" }}>
                                                            <FontAwesomeIcon icon={faCircle} className="circle_icons" /> {this.props.t('Country')}</span>
                                                    </Link>
                                                </li>
                                            </>
                                            :
                                            <>

                                            </>
                                    }

                                    {/* State */}
                                    {
                                        StateListActive?.status == 'Active' ?
                                            <>
                                                {/* <li >
                                                    <Link to={process.env.PUBLIC_URL + "/statelist"}>
                                                        <span style={{ marginLeft: "10px" }}>
                                                            <FontAwesomeIcon icon={faCircle} className="circle_icons" /> {this.props.t('State')}</span>
                                                    </Link>
                                                </li> */}
                                                {/* Start---  State lists */}
                                                {this.sidebarstateArray.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                        </Link>

                                                    </li>
                                                ))}
                                                {/* End-- State dynamic lists */}

                                            </>
                                            :
                                            <>

                                            </>
                                    }

                                    {/* Designation */}

                                    {
                                        DesignationListActive?.status == 'Active' ?
                                            <>
                                                {/* Start---  Designation lists */}
                                                {this.sidebarDesignationArray.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                        </Link>

                                                    </li>
                                                ))}
                                                {/* End-- Designation dynamic lists */}
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                    {/* Department */}
                                    {
                                        DepartmentListActive?.status == 'Active' ?
                                            <>
                                                {/* Start---  Department lists */}
                                                {this.sidebarDepartmentArray.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                        </Link>

                                                    </li>
                                                ))}
                                                {/* End-- Department dynamic lists */}
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                    {/* HsnCode */}
                                    {
                                        HsnCodeListActive?.status == 'Active' ?
                                            <>
                                                {/* Start---  HsnCode lists */}
                                                {this.sidebarHSNCodeArray.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                        </Link>

                                                    </li>
                                                ))}
                                                {/* End-- HsnCode dynamic lists */}
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                    {/* Items */}
                                    {
                                        ItemListActive?.status == 'Active' ?
                                            <>
                                                {/* Start---  Items lists */}
                                                {this.sidebarItemCodeArray.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                        </Link>

                                                    </li>
                                                ))}
                                                {/* End-- HsnCode dynamic lists */}
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                    {/* Leder */}
                                    {
                                        LedgerListActive?.status == 'Active' ?
                                            <>
                                                {/* Start---  Leder lists */}
                                                {this.sidebarLederCodeArray.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                        </Link>

                                                    </li>
                                                ))}
                                                {/* End-- HsnCode dynamic lists */}
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                    {/* Shift */}
                                    {
                                        ShiftListActive?.status == 'Active' ?
                                            <>
                                                {/* Start--- Shift dynamic lists */}
                                                {this.sidebarShiftArray.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                        </Link>

                                                    </li>
                                                ))}
                                                {/* End-- shift dynamic lists */}
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                    {/* Term-condtion */}
                                    {
                                        termsconditionsListActive?.status == 'Active' ?
                                            <>
                                                {/* Start--- Term condtion dynamic lists */}
                                                {this.sidebarTermArray.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                        </Link>

                                                    </li>
                                                ))}
                                                {/* End-- Term condtion dynamic lists */}
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                    {/* Unit */}
                                    {
                                        UnitListActive?.status == 'Active' ?
                                            <>
                                                {/* Start--- Unit dynamic lists */}
                                                {this.sidebarUnitArray.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                        </Link>

                                                    </li>
                                                ))}
                                                {/* End-- Term condtion dynamic lists */}
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                    {/* Warehouse */}
                                    {
                                        warehousListActive?.status == 'Active' ?
                                            <>
                                                {/* Start--- Warehouse dynamic lists */}
                                                {this.sidebarwarehouserArray.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                        </Link>

                                                    </li>
                                                ))}
                                                {/* End-- Warehouse dynamic lists */}
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                    {/* <li >
                                        <Link to={process.env.PUBLIC_URL + "/countrylist"}>
                                            <span style={{ marginLeft: "10px" }}>
                                                <FontAwesomeIcon icon={faCircle} className="circle_icons" /> {this.props.t('Country')}</span>
                                        </Link>

                                    </li> */}

                                </ul>
                            </li>


                            {/* Start---  Leave Management dynamic lists */}
                            {
                                LeaveManagementListActive?.status == 'Active' ?
                                    <>

                                        <li >
                                            <Link to="/#" className="has-arrow waves-effect ">
                                                <FontAwesomeIcon icon={faLeaf} />

                                                <span className="ms-1">{this.props.t('Leave Management')}</span>
                                            </Link>
                                            <ul className="sub-menu">
                                                {/* Start---Leave Master lists */}
                                                {
                                                    LeaveMasterListActive?.status == 'Active' ?
                                                        <>

                                                            {this.sidebarleavemanagementArray.map((item, index) => (
                                                                <li key={index}>
                                                                    <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                        <span style={{ marginLeft: "10px" }}>
                                                                            <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                                    </Link>

                                                                </li>
                                                            ))}
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }

                                                {/* End---Leave Master lists */}

                                                {/* Start---Leave Application lists */}
                                                {
                                                    LeaveApplicationsListActive?.status == 'Active' ?
                                                        <>
                                                            {this.sidebarleaveApplicationArray.map((item, index) => (
                                                                <li key={index}>
                                                                    <Link to={process.env.PUBLIC_URL + `/${item.href}`}>
                                                                        <span style={{ marginLeft: "10px" }}>
                                                                            <FontAwesomeIcon className="circle_icons" icon={faCircle} /> {this.props.t(item.label)}</span>
                                                                    </Link>

                                                                </li>
                                                            ))}
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }

                                                {/* End---Leave Application lists */}

                                            </ul>
                                        </li>
                                    </>
                                    :
                                    <>
                                    </>
                            }

                            {/* End--  Leave Management dynamic lists */}

                            {/* Marketing Management */}
                            {
                                marketingMasterListActive?.status == 'Active' ?
                                    <>
                                        {/* Start--- Marketing Management dynamic lists */}
                                        {/* Marketing Management */}
                                        <li>
                                            <Link to="/#" className="has-arrow waves-effect">
                                                <FontAwesomeIcon icon={faShop} />
                                                <span className="ms-1">{this.props.t('Marketing Management')}</span>
                                            </Link>
                                            <ul className="sub-menu">

                                                {/* marketing Master */}
                                                {
                                                    marketingMasterLead?.status == 'Active' ?
                                                        <>
                                                            <li>
                                                                <Link to={process.env.PUBLIC_URL + "/LeadTabs"}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} />
                                                                    <span > {this.props.t('Marketing Master Lead')}</span>
                                                                </Link>
                                                            </li>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }


                                                {/* Marketing Lead */}
                                                {
                                                    marketingLeadActiveLists?.status == 'Active' ?
                                                        <>
                                                            <li>
                                                                <Link to={process.env.PUBLIC_URL + "/marketingleadlist"}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} />
                                                                    <span > {this.props.t('Marketing Lead')}</span>
                                                                </Link>
                                                            </li>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }

                                                {/* Inquiry */}
                                                {
                                                    InquiryListActive?.status == 'Active' ?
                                                        <>
                                                            <li>
                                                                <Link to={process.env.PUBLIC_URL + "/inquirylist"}>
                                                                    <FontAwesomeIcon className="circle_icons" icon={faCircle} />
                                                                    <span > {this.props.t('Inquiry')}</span>
                                                                </Link>
                                                            </li>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }

                                            </ul>
                                        </li>

                                        {/* End-- Marketing Management dynamic lists */}
                                    </>
                                    :
                                    <>
                                    </>
                            }


                            {/* Users */}
                            {
                                UserListActive?.status == 'Active' ?
                                    <>
                                        <li>
                                            <Link to={process.env.PUBLIC_URL + "/users"}>
                                                <i className="fas fa-user-friends" style={{ paddingRight: "5px" }}></i>
                                                <span > {this.props.t('Users')}</span>
                                            </Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                    </>
                            }



                            {/* {this.state.finalLI && this.state.finalLI.length > 0 && this.state.finalLI.filter(item => item.active === "Active").length > 0 && (
                                <li >
                                 
                                    <Link to="#" className={`nav-link dropdown-toggle has-arrow waves-effect`}>
                                        <i className="ri ri-settings-2-fill "></i>
                                        <span className="ms-1">{this.props.t('Masters')}</span>
                                    </Link>
                                   
                                    <ul className={`sub-menu ${isDropdownOpen ? 'show' : ''}`}>

                                        {this.state.finalLI.map((item) => {

                                            if (item.active === "Active") {
                                                return (
                                                    <li>
                                                        <Link to={process.env.PUBLIC_URL + `/${item.value}`} >
                                                            <span className="ms-1">{this.props.t(`${item.lebel}`)}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </li>
                            )} */}

                            {/* {ShowLeaveModule == true && (
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/employeeleavelist"} className="waves-effect">
                                        <i className=" ri-calendar-todo-fill "></i>
                                        <span className="ms-1">{this.props.t('Leave')}</span>
                                    </Link>
                                </li>
                            )} */}

                            {/* production & Staff Role condtion */}
                            {/* Employee_Status == '2' only show Leave tab  */}
                            {(Roleid !== "NxOpZowo9GmjKqdR" && Employee_Status == '2') && (
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/employeeleavelist"} className="waves-effect">
                                        <i className=" ri-calendar-todo-fill "></i>
                                        <span className="ms-1">{this.props.t('Leave')}</span>
                                    </Link>
                                </li>
                            )}


                            {Roleid === "0QvXO3GJyzkxAqYR" && (
                                < li >
                                    <Link to={process.env.PUBLIC_URL + `/employeeleaves`}>
                                        <i className=" ri-calendar-check-fill "></i>
                                        <span className="ms-1">{this.props.t(`Employee Leaves`)}</span>
                                    </Link>
                                </li>
                            )}


                            {/* {Roleid !== "NxOpZowo9GmjKqdR" && (
                                < li >
                                    <Link to={process.env.PUBLIC_URL + `/employeeleaves`}>
                                        <i className=" ri-calendar-check-fill "></i>
                                        <span className="ms-1">{this.props.t(`Employee Leaves`)}</span>
                                    </Link>
                                </li>
                            )} */}


                        </ul>
                    </div>
                )
                }
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return { ...state.Layout };
};

export default withRouter(connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader
})(withNamespaces()(SidebarContent)));



