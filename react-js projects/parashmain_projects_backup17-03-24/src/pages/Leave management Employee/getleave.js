import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Container, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { DELETE_COUNTRY, DELETE_USER, FIND_ALL_LEAVES_BY_ROLE_ID, GET_ALL_USERS, GET_COUNTRY, GET_LEAVE_BALANCE_OF_USER_ID_2, GET_LEAVE_REQUEST_BY_USER_ID, GET_LEAVE_REQUEST_BY_USER_ID_MERGE, THEME_SETTING, UPDATE_COUNTRY_STATUS, getToken } from '../../globals';
import TableComponent from '../../components/Common/tablecomponent';
import { ThreeDots } from "react-loader-spinner";
import { toast } from 'react-toastify';
import Grid from '@mui/material/Unstable_Grid2'
    

const GetLeaveForEmployee = () => {
    const [breadcrumbItems] = useState([
        { title: 'Parasmani', link: process.env.PUBLIC_URL + '/dashboard' },
        { title: 'Leave Request', link: process.env.PUBLIC_URL + '/employeeleavelist' },
    ]);

    const [page, setPage] = useState(1);
    const [isLoading, setisLoading] = useState(false);
    const [userlist, setUserlist] = useState([]);
    const [userListBalance, setUserListBalence] = useState([]);
    const [totalPages, setTotalPages] = useState('');
    const [currentpageIndex, setCurrentpageIndex] = useState('');
    const [perPage, setPerPage] = useState('');
    const [show, setShow] = useState(false);
    const [isUserID, setIsUserID] = useState(false);
    const [CreateButton, setCreateButton] = useState(["Active"]);
    const [EditButton, setEditButton] = useState(["Active"]);
    const [DeleteButton, setDeleteButton] = useState([]);
    const PermissionArr = JSON.parse(localStorage.getItem("permissionarray")) || [];
    const [themeSetting, setThemeSetting] = useState([]);
    const [leaveData, setLeaveData] = useState({
        SickLeave: 0,
        CasualLeave: 0,
        PriviledgeLeave: 0,
        halfdayleave: 0,
        sortleave: 0,
        AllLeaves: {},
    });

    const sidebarArr = [
        {
            href: "hsncodelist",
            value: "hsn_code",
            label: "HSN Code"
        },
        {
            href: "countrylist",
            value: "country",
            label: "Country"
        },
        {
            href: "statelist",
            value: "state",
            label: "State"
        },
        {
            href: "ledgerlist",
            value: "ledger",
            label: "Ledger"
        },
        {
            href: "ledgergrouplist",
            value: "ledger_group",
            label: "Ledger Group"
        },
        {
            href: "termsandconditionslist",
            value: "terms_condition",
            label: "Terms & Conditions"
        },
        {
            href: "departmentlist",
            value: "department",
            label: "Department"
        },
        {
            href: "designationlist",
            value: "designation",
            label: "Designation"
        },
        {
            href: "itemcategorylist",
            value: "item_category",
            label: "Item Category"
        },
        {
            href: "itemsubcategorylist",
            value: "item_sub_category",
            label: "Item Sub-Category"
        },
        {
            href: "itemmakelist",
            value: "item_make",
            label: "Item Make"
        },
        {
            href: "itemlist",
            value: "item",
            label: "Item"
        },
        {
            href: "shiftlist",
            value: "shift",
            label: "Shift"
        },
        {
            href: "unitlist",
            value: "unit",
            label: "Unit"
        },
        {
            href: "unitmeasurelist",
            value: "unit_measure",
            label: "Unit Measure"
        },
        {
            href: "warehouselist",
            value: "warehouse",
            label: "Warehouse"
        },
        {
            href: "leavelist",
            value: "leave",
            label: "Leave"
        },
        {
            href: "leavebalancelist",
            value: "leave_balances",
            label: "Leave Balance"
        },
        {
            href: "leaverequestlist",
            value: "leave_request",
            label: "Leave Request"
        },


    ]

    const columns = [
        { Header: 'Id', accessor: 'Id', disableFilters: true, filterable: false },
        // ... (other columns)
    ];



    useEffect(() => {
        setCreateButton("Active");
        setEditButton("Active");
        getAllUsers();
        FetchLeaves();
        // fetchData();
        // loadCreatePermissions();
        // loadEditPermissions();
        // loadDeletePermissions();
    }, []); // Run the effect when the page changes


    const FetchLeaves = async () => {
        setisLoading(true);
        const Token = localStorage.getItem("userToken");
        const ROLEID = localStorage.getItem("roleid");

        try {
            const response = await fetch(FIND_ALL_LEAVES_BY_ROLE_ID + ROLEID, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.result === true && data.data) {
                console.log("ALL LEAVE DATA TRUE", data.data);
                fetchData(data.data);
            } else {
                setThemeSetting([]);
            }

        } catch (error) {
            console.error("Error fetching leaves by role ID:", error);
            setThemeSetting([]);
        } finally {
            setisLoading(false);
        }
    };

    const fetchData = async (entitledleaves) => {
        console.log("INSIDE FETCH LEAVE BALANCE OF USER ID ");
        setisLoading(true);
        const ID = localStorage.getItem("tenant_id");
        const Token = localStorage.getItem("userToken");

        try {
            const response = await fetch(GET_LEAVE_BALANCE_OF_USER_ID_2 + ID, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.result === true) {
                console.log("USER LEAVE DATA TRUE", data.data);

                if (data.data) {
                    const finalarr = entitledleaves?.map((item) => {
                        console.log("ALL LEAVES ", item.leave_id);
                        const matchingEntitled = data.data.find((entitled) => entitled.leave_id === item.leave_id);

                        return matchingEntitled ? { ...item, remainingbalance: matchingEntitled.balance } : item;
                    }) || [];

                    setThemeSetting(finalarr);
                }

            } else {
                setThemeSetting([]);
            }

        } catch (error) {
            console.error("Error fetching leave balance of user ID:", error);
            setThemeSetting([]);
        } finally {
            setisLoading(false);
        }
    };

    // const FetchLeaves = async () => {
    //     setisLoading(true);
    //     const Token = localStorage.getItem("userToken");
    //     var ROLEID = localStorage.getItem("roleid");
    //     try {
    //         const response = await fetch(FIND_ALL_LEAVES_BY_ROLE_ID +
    //             ROLEID, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: "Bearer " + Token,
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         const data = await response.json();
    //         if (data.result === true && data.data) {
    //             console.log("ALL LEAVE DATA TRUE", data.data);
    //             fetchData(data.data);
    //             // setThemeSetting(data.data);
    //         }
    //         else {
    //             setThemeSetting([]);
    //             setisLoading(false);
    //         }

    //     } catch (error) {
    //         setisLoading(false);
    //         console.error("Error fetching theme setting:", error);
    //     }
    // };

    // const fetchData = async (entitledleaves) => {
    //     console.log("INSIDE FETCH LEAVE BALANCE OF USER ID ");
    //     setisLoading(true);
    //     const ID = localStorage.getItem("tenant_id");
    //     const Token = localStorage.getItem("userToken");

    //     try {
    //         const response = await fetch(GET_LEAVE_BALANCE_OF_USER_ID_2 + ID, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: "Bearer " + Token,
    //                 "Content-Type": "application/json",
    //             },
    //         });

    //         const data = await response.json();
    //         if (data.result === true) {
    //             console.log("USER LEAVE DATA TRUE", data.data);
    //             if (data) {
    //                 let finalarr = [];
    //                 if (entitledleaves) {
    //                     entitledleaves?.forEach((item) => {
    //                         console.log("ALL LEAVES ", item.leave_id);
    //                         const matchingEntitled = data.data?.find((entitled) => entitled?.leave_id === item?.leave_id);
    //                         if (matchingEntitled) {
    //                             finalarr.push({ ...item, remainingbalance: matchingEntitled?.balance });
    //                         }
    //                     });
    //                 }
    //                 setThemeSetting(finalarr)
    //                 setisLoading(false);
    //             }

    //         } else {
    //             setThemeSetting([])
    //             setisLoading(false);
    //         }
    //     } catch (error) {
    //         setThemeSetting([])
    //         setisLoading(false);
    //     }
    // };

    // async GetThemesetting() {
    //     this.setState({
    //         isLoading: true,
    //     });
    //     var Token = localStorage.getItem("userToken");
    //     var ROLEID = localStorage.getItem("roleid");
    //     try {
    //         fetch(
    //             FIND_ALL_LEAVES_BY_ROLE_ID +
    //             ROLEID,
    //             // "DxrnX3z9mzBReV4Y",
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
    //                             Leavesetting: data?.data,
    //                         });
    //                         this.setState({
    //                             isLoading: false,
    //                         });
    //                     }
    //                 } else {
    //                     this.setState({
    //                         isLoading: false,
    //                     });
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //         this.setState({
    //             isLoading: false,
    //         });
    //     }
    // }

    // const loadCreatePermissions = async () => {
    //     try {
    //         const tempArr = PermissionArr
    //             .filter(item => item.name.includes("Add Country Master"))
    //             .flatMap(item => sidebarArr
    //                 .filter(sidebar => item.type === sidebar.value)
    //                 .map(sidebar => ({
    //                     active: item.status,
    //                 }))
    //             );
    //         const finalString = tempArr.map(item => item.active).join(', ');
    //         setCreateButton(finalString);
    //     } catch (error) {

    //     }
    // };

    // const loadEditPermissions = async () => {
    //     try {
    //         const tempArr = PermissionArr
    //             .filter(item => item.name.includes("Edit Country Master"))
    //             .flatMap(item => sidebarArr
    //                 .filter(sidebar => item.type === sidebar.value)
    //                 .map(sidebar => ({
    //                     active: item.status,
    //                 }))
    //             );
    //         const finalString = tempArr.map(item => item.active).join(', ');
    //         setEditButton(finalString);
    //     } catch (error) {
    //     }
    // };
    // const loadDeletePermissions = async () => {
    //     try {
    //         const tempArr = PermissionArr
    //             .filter(item => item.name.includes("Delete Country Master"))
    //             .flatMap(item => sidebarArr
    //                 .filter(sidebar => item.type === sidebar.value)
    //                 .map(sidebar => ({
    //                     active: item.status,
    //                 }))
    //             );
    //         const finalString = tempArr.map(item => item.active).join(', ');
    //         setDeleteButton(finalString);
    //     } catch (error) {
    //     }
    // };

    // const getAllUsers = async (page, perPage) => {
    //     setisLoading(true)
    //     var id = localStorage.getItem("tenant_id")
    //     var Token = await localStorage.getItem("userToken");
    //     try {
    //         const response = await fetch(page ? `${GET_LEAVE_REQUEST_BY_USER_ID}` + id + `?page=${page}` : `${GET_LEAVE_REQUEST_BY_USER_ID}` + id, {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: "Bearer " + Token,
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         const data = await response.json();

    //         if (data.result === true) {
    //             setUserlist(data.data);
    //             setTotalPages(data.meta.pagination.total_pages);
    //             setCurrentpageIndex(data.meta.pagination.current_page);
    //             setPerPage(data.meta.pagination.per_page);
    //             setisLoading(false)
    //         } else {
    //             setisLoading(false)
    //         }
    //     } catch (error) {
    //         setisLoading(false)
    //     }
    // };
    const getAllUsers = async (page, perPage) => {
        setisLoading(true)
        var id = localStorage.getItem("tenant_id")
        var Token = await localStorage.getItem("userToken");
        try {
            const response = await fetch(page ? `${GET_LEAVE_REQUEST_BY_USER_ID_MERGE}` + id + `?page=${page}` : `${GET_LEAVE_REQUEST_BY_USER_ID_MERGE}` + id, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + Token,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.result === true) {
                console.log('dataa---', data)
                setUserlist(data.leave)
                setUserListBalence(data?.balance)
                setTotalPages(data.meta.pagination.total_pages);
                setCurrentpageIndex(data.meta.pagination.current_page);
                setPerPage(data.meta.pagination.per_page);
                setisLoading(false)
            } else {
                setisLoading(false)
            }
        } catch (error) {
            setisLoading(false)
        }
    };

console.log('userlistMerge--', userListBalance)
    const DeleteUserData = async (isUserID) => {

        setisLoading(true);
        var Token = localStorage.getItem("userToken");
        await fetch(
            DELETE_COUNTRY + isUserID,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                },
            }
        )
            .then((res) => {
                return res.json();
            })

            .then((res) => {
                toast("Leave Deleted !", {
                    type: "success",
                });
                setShow(false);
                setisLoading(false);
                getAllUsers();
            })
            .catch((err) => {
                toast("Unable to Delete Leave", {
                    type: "error",
                });

                setShow(false);
                setisLoading(false);
            });
    };

    // UPDATE SATATUS FROM SWITCH
    const updateContactStatus = async (userid, status) => {
        setisLoading(true);
        var Token = localStorage.getItem("userToken");
        await fetch(UPDATE_COUNTRY_STATUS + userid, {
            // UPDATE_USER_STATUS + userid,
            // {
            //     method: "POST",
            //     headers: {
            //         Authorization: "Bearer " + Token,
            //     },
            //     body: JSON.stringify({
            //         status: status == true ? "Active" : "Inactive",
            //     }),
            // }
            method: "POST",
            headers: {
                Authorization: "Bearer " + Token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: status == true ? "Active" : "Inactive",
            }),
        }
        ).then((response) => {
            response.json().then((data) => {
                if (data.result == true) {
                    toast("Leave Updated Successfully !", {
                        type: "success",
                    });
                    getAllUsers();
                    setShow(false);
                    setisLoading(false);
                }
                else {
                    getAllUsers();
                    setisLoading(false);
                    toast("Leave Cannot Be Updated", {
                        type: "error",
                    });
                }
            });
        })
            .catch((err) => {

                toast("Unable to Update Leave", {
                    type: "error",
                });
                setShow(false);
                setisLoading(false);
            });
    };


    // TABLE HEADER
    const renderTHContent = () => (
        <tr>
            {EditButton == "iActive" || DeleteButton == "iActive" ? <th className="text-center">Action</th> : ""}
            <th>Leave Name</th>
            <th>Leave Reason</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
        </tr>
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Get day, month, and year
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        // Concatenate in "dd-mm-yyyy" format
        const formattedDate = `${day}-${month}-${year}`;

        return formattedDate;
    };

    // TABLE DATA
    function renderTdContent(item) {
        console.log('time--', item)
        let status = "";
        if (item.status == 1) {
            status = "Pending"
        }
        if (item.status == 2) {
            status = "Approved"
        }
        if (item.status == 3) {
            status = "Disapproved"
        }
        if (item.status == 4) {
            status = "Cancelled"
        }
        return (
            <>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.name}</span>
                    </p>
                </td>
                <td style={{ whiteSpace: item.leave_reason.length > 30 ? 'normal' : 'nowrap', maxWidth: '300px' }}>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0" style={{ whiteSpace: item.leave_reason.length > 30 ? 'normal' : 'nowrap', maxWidth: '300px' }}>
                        <span className="fw-medium">{item.leave_reason}</span>
                    </p>
                </td>
                {/* <td style={{ whiteSpace: item.leave_reason.length > 20 ? 'normal' : 'nowrap', maxWidth: '300px' }}>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0" style={{ whiteSpace: item.leave_reason.length > 20 ? 'normal' : 'nowrap', maxWidth: '300px' }}>
                        <span className="fw-medium">
                            {item.leave_reason.split(' ').slice(0, 5).join(' ')}
                            {item.leave_reason.split(' ').length > 5 ? ' ...' : ''}
                        </span>
                    </p>
                </td> */}
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium"> {formatDate(item.start_date) + " " + (item.timeslot ? " , " + item.timeslot : "")}</span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{formatDate(item.end_date)}</span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{status}</span>
                    </p>
                </td>
                {/* <td>
                    <div
                        style={{ margin: "10px" }}
                        className="form-check form-switch mb-3"
                        dir="ltr"
                    >
                        <Input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitch1"
                            style={{
                                height: "18px",
                                width: "30px",
                            }}
                            checked={
                                item.status == "Active" ? true : false
                            }
                            onChange={(val) => {
                                item.status = val.target
                                    .checked
                                    ? true
                                    : false;

                                updateContactStatus(
                                    item.id,
                                    val.target.checked
                                );
                            }}
                        />
                        <Label
                            className="form-check-label"
                            htmlFor="customSwitch1"
                            onClick={(e) => {
                                this.setState({
                                    toggleSwitch:
                                        !this.state.toggleSwitch,
                                });
                            }}
                        ></Label>
                    </div>
                </td> */}
            </>
        );
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Leave Request list " breadcrumbItems={breadcrumbItems} />

                    <CardBody>
                        {isLoading ? (
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
                        ) : (<>
                            {/* <div>
                                {themeSetting != [] && (
                                          <Grid container spacing={2} columns={15}>
                                        {themeSetting.map((item) => {
                                            console.log(item);
                                            if (item.total_leave != "" && parseInt(item?.total_leave) > 0) {
                                                return (
                                                    <Grid xl={3} lg={3} md={5} sm={5} xs={15}>
                                                        <Card className="text-center">
                                                        <CardBody style={{padding: '10px 3%'}}>
                                                            <CardHeader className="bg-transparent ">
                                                                <h5 className="my-0"><i className="ri ri-hospital-line me-3"></i>{item.name}</h5>
                                                            </CardHeader>
                                                            <div className="d-flex justify-content-between">
                                                            <div>
                                                            <h6 className='font-weight-bold' >Leave Balance</h6>
                                                            <h2 className='font-weight-bold'>{parseInt(item.remainingbalance)}</h2>
                                                            </div>
                                                            <div>
                                                            <h6 className='font-weight-bold'>Entitled Leave</h6>
                                                            <h2 className='font-weight-bold'>{item.total_leave}</h2>
                                                           
                                                            </div>
                                                            </div>
                                                        </CardBody>
                                                        </Card>
                                                    </Grid>
                                                )
                                            }
                                        })}

                                        {themeSetting["Sick Leave"] != "" ?
                                            <Col md="2">
                                                <Card outline color="primary" className="border text-center">
                                                    <CardHeader className="bg-transparent border-primary">
                                                        <h5 className="my-0 text-primary"><i className="ri ri-hospital-line me-3"></i>Sick Leave</h5>
                                                    </CardHeader>

                                                    <Row className='border-bottom mt-0  p-2'>
                                                        <span className='font-weight-bold'>Leave Balance : <b>{leaveData.SickLeave}</b></span>
                                                    </Row>
                                                    <Row className='p-2'>
                                                        <span className="font-weight-bold">Entitled Leave : {themeSetting["Sick Leave"]}</span>
                                                    </Row>

                                                </Card>
                                            </Col>
                                            : ""}

                                        {themeSetting["Casual Leave"] != "" ?
                                            <Col md="2">
                                                <Card outline color="primary" className="border text-center">
                                                    <CardHeader className="bg-transparent border-primary">
                                                        <h5 className="my-0 text-primary"><i className="ri ri-home-fill me-3"></i>Casual Leave</h5>
                                                    </CardHeader>

                                                    <Row className='border-bottom mt-0  p-2'>
                                                        <span className='font-weight-bold'>Leave Balance : <b>{leaveData.CasualLeave}</b></span>
                                                    </Row>
                                                    <Row className='p-2'>
                                                        <span className="font-weight-bold">Entitled Leave : {themeSetting["Casual Leave"]}</span>
                                                    </Row>

                                                </Card>
                                            </Col>
                                            : ""}

                                        {themeSetting["Privilege Leave"] != "" ?
                                            <Col md="2">
                                                <Card outline color="primary" className="border text-center">
                                                    <CardHeader className="bg-transparent border-primary">
                                                        <h5 className="my-0 text-primary"><i className="ri ri-briefcase-line me-3"></i>Privilege Leave</h5>
                                                    </CardHeader>

                                                    <Row className='border-bottom mt-0  p-2'>
                                                        <span className='font-weight-bold'>Leave Balance : <b>{leaveData.PriviledgeLeave}</b></span>
                                                    </Row>
                                                    <Row className='p-2'>
                                                        <span className="font-weight-bold">Entitled Leave : {themeSetting["Privilege Leave"]}</span>
                                                    </Row>

                                                </Card>
                                            </Col>
                                            : ""}

                                        {themeSetting["Sort Leave"] != "" ?
                                            <Col md="2">
                                                <Card outline color="primary" className="border text-center">
                                                    <CardHeader className="bg-transparent border-primary">
                                                        <h5 className="my-0 text-primary"><i className="ri ri-run-fill me-3"></i>Sort Leave</h5>
                                                    </CardHeader>

                                                    <Row className='border-bottom mt-0  p-2'>
                                                        <span className='font-weight-bold'>Leave Balance : <b>{leaveData.sortleave}</b></span>
                                                    </Row>
                                                    <Row className='p-2'>
                                                        <span className="font-weight-bold">Entitled Leave : {themeSetting["Sort Leave"]}</span>
                                                    </Row>

                                                </Card>
                                            </Col>
                                            : ""}
                                        {themeSetting["Half day Leave"] != "" ?
                                            <Col md="2">
                                                <Card outline color="primary" className="border text-center">
                                                    <CardHeader className="bg-transparent border-primary">
                                                        <h5 className="my-0 text-primary"><i className="fas fa-house-user me-3"></i>Half day Leave</h5>
                                                    </CardHeader>

                                                    <Row className='border-bottom mt-0  p-2'>
                                                        <span className='font-weight-bold'>Leave Balance : <b>{leaveData.halfdayleave}</b></span>
                                                    </Row>
                                                    <Row className='p-2'>
                                                        <span className="font-weight-bold">Entitled Leave : {themeSetting["Half day Leave"]}</span>
                                                    </Row>

                                                </Card>
                                            </Col>
                                            : ""}
                                    </Grid>
                                )}

                                <Card>
                                    <CardHeader>
                                        Leave Balance
                                    </CardHeader>
                                    <CardBody>

                                        <Row lg="12" style={{ textAlign: "center" }}>
                                            <Col>Sick Leave <br />
                                                <div>
                                                    {leaveData.SickLeave} /{themeSetting["Sick Leave"]}
                                                </div>
                                            </Col>
                                            <Col>Casual Leave<br />
                                                <div>
                                                    {leaveData.CasualLeave} /{themeSetting["Casual Leave"]}
                                                </div>
                                            </Col>
                                            <Col>Priviledge Leave<br />

                                                <div>
                                                    {leaveData.PriviledgeLeave} /{themeSetting["Privilege Leave"]}
                                                </div>
                                            </Col>

                                            <Col>Half Day Leave<br />

                                                <div>
                                                    {leaveData.halfdayleave} /{themeSetting["Half day Leave"]}
                                                </div>
                                            </Col>
                                            <Col>Sort Leave<br />

                                                <div>
                                                    {leaveData.sortleave} /{themeSetting["Sort Leave"]}
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </div > */}
                            {/* <div>
                                {themeSetting != [] && (
                                          <Grid container spacing={2} columns={15}>
                                        {themeSetting.map((item) => {
                                            console.log(item);
                                            if (item.total_leave != "" && parseInt(item?.total_leave) > 0) {
                                                return (
                                                    <Grid xl={3} lg={3} md={5} sm={5} xs={15}>
                                                        <Card className="text-center">
                                                        <CardBody style={{padding: '10px 3%'}}>
                                                            <CardHeader className="bg-transparent ">
                                                                <h5 className="my-0"><i className="ri ri-hospital-line me-3"></i>{item.name}</h5>
                                                            </CardHeader>
                                                            <div className="d-flex justify-content-between">
                                                            <div>
                                                            <h6 className='font-weight-bold' >Leave Balance</h6>
                                                            <h2 className='font-weight-bold'>{parseInt(item.remainingbalance)}</h2>
                                                            </div>
                                                            <div>
                                                            <h6 className='font-weight-bold'>Entitled Leave</h6>
                                                            <h2 className='font-weight-bold'>{item.total_leave}</h2>
                                                           
                                                            </div>
                                                            </div>
                                                        </CardBody>
                                                        </Card>
                                                    </Grid>
                                                )
                                            }
                                        })}

                                      
                                    </Grid>
                                )}

                          
                            </div > */}
                            <div>
                                {userListBalance?.length > 0 && (
                                          <Grid container spacing={2} columns={15}>
                                        {userListBalance.map((item) => {
                                            console.log(item);
                                            if (item.leave_entitlement.total_leave != "" && parseInt(item?.leave_entitlement.total_leave) > 0) {
                                                return (
                                                    <Grid xl={3} lg={3} md={5} sm={5} xs={15}>
                                                        <Card className="text-center">
                                                        <CardBody style={{padding: '10px 3%'}}>
                                                            <CardHeader className="bg-transparent ">
                                                                <h5 className="my-0"><i className="ri ri-hospital-line me-3"></i>{item.name}</h5>
                                                            </CardHeader>
                                                            <div className="d-flex justify-content-between mt-1">
                                                            <div>
                                                            <h6 className='font-weight-bold' >Leave Balance</h6>
                                                            <h2 className='font-weight-bold'>{parseInt(item.balance)}</h2>
                                                            </div>
                                                            <div>
                                                            <h6 className='font-weight-bold'>Entitled Leave</h6>
                                                            <h2 className='font-weight-bold'>{item?.leave_entitlement.total_leave}</h2>
                                                           
                                                            </div>
                                                            </div>
                                                        </CardBody>
                                                        </Card>
                                                    </Grid>
                                                )
                                            }
                                        })}

                                      
                                    </Grid>
                                )}

                          
                            </div >
                            <TableComponent
                                // approveButton={""}
                                // listbutton={"Active"}
                                allUserData={userlist || []}
                                perPage={perPage}
                                currentpageIndex={currentpageIndex}
                                pageTotal={totalPages}
                                setPerPage={perPage}
                                setIsUserID={setIsUserID}
                                setShow={setShow}
                                getAllUsers={getAllUsers}
                                renderTHContent={renderTHContent}
                                renderTdContent={renderTdContent}
                                btnName="Apply Leave"
                                addData={CreateButton == "Active" ? "/applyleave" : ""}
                                editData={EditButton == "iActive" ? "/editcountry/" : ""}
                                MasterSearch={'country_name'}
                                deletedata={DeleteButton == "Active" ? "Active" : ""}
                            // emailSearch1={'email'}
                            />
                        </>
                        )}
                    </CardBody>
                </Container>
            </div>
            <Modal isOpen={show} backdrop="static">
                <ModalHeader toggle={() => setShow(false)}>Delete Confirmation</ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to delete this Country?</p>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="light" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button type="button" color="primary" onClick={() => DeleteUserData(isUserID)}>
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default GetLeaveForEmployee;