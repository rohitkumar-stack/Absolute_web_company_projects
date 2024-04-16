import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, Container, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

// Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import OrderSalesPreoessTables from '../../../components/Common/OrderSalesPreoessTables';
import { DELETE_COUNTRY, GET_LEAVE_REQUEST_FOR_HR_SEARCH, GET_USERS_WITHOUT_ADMIN_, UPDATE_COUNTRY_STATUS } from '../../../globals';
import { ThreeDots } from "react-loader-spinner";
import { toast } from 'react-toastify';
import { AvField } from 'availity-reactstrap-validation';
import * as XLSX from 'xlsx';




const OrderSalesPreoessLists = () => {
    const [breadcrumbItems] = useState([
        { title: 'Parasmani', link: process.env.PUBLIC_URL + '/dashboard' },
        { title: 'Employee Leaves List', link: process.env.PUBLIC_URL + '/employeeleaves' },
    ]);

    const [page, setPage] = useState(1);
    const [isLoading, setisLoading] = useState(false);
    const [userlist, setUserlist] = useState([]);
    const [totalPages, setTotalPages] = useState('');
    const [currentpageIndex, setCurrentpageIndex] = useState('');
    const [perPage, setPerPage] = useState('');
    const [show, setShow] = useState(false);
    const [isUserID, setIsUserID] = useState(false);
    const [CreateButton, setCreateButton] = useState(["Active"]);
    const [EditButton, setEditButton] = useState(["Active"]);
    const [approveButton, setapproveButton] = useState(["Active"]);
    const [DeleteButton, setDeleteButton] = useState([]);
    const [Alluser, SetAllUser] = useState([]);
    const [SelectedUser, SetSelectedUser] = useState("");
    const [StartDate, SetStartDate] = useState("");
    const [EndDate, SetEndDate] = useState("");
    const [Status, SetStatus] = useState("");
    const PermissionArr = JSON.parse(localStorage.getItem("permissionarray")) || [];
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



    // useEffect(() => {
    //     setCreateButton("Active");
    //     setEditButton("Active");
    //     setapproveButton("Active");
    //     getAllUsersBySearch();
    //     GetAllUser();


    //     // loadCreatePermissions();
    //     // loadEditPermissions();
    //     // loadDeletePermissions();
    // }, []); // Run the effect when the page changes

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
    // };+



    const GetAllUser = () => {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_USERS_WITHOUT_ADMIN_, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        SetAllUser(data.data);
                    }
                });
            });
        } catch (error) {

        }
    }

    const getAllUsersBySearch = async (page, perPage) => {
        setUserlist([])
        setisLoading(true)
        var id = localStorage.getItem("tenant_id")
        var Token = await localStorage.getItem("userToken");
        try {
            const response = await fetch(page ? `${GET_LEAVE_REQUEST_FOR_HR_SEARCH}?page=${page}` : `${GET_LEAVE_REQUEST_FOR_HR_SEARCH}`, {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + Token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    start_date: StartDate,
                    end_date: EndDate,
                    status: Status,
                    user_id_encode: SelectedUser
                }),
            });

            const data = await response.json();

            if (data.result === true) {
                setUserlist(data.data);
                setisLoading(false)
                setTotalPages(data.meta.pagination.total_pages);
                setCurrentpageIndex(data.meta.pagination.current_page);
                setPerPage(data.meta.pagination.per_page);
            } else {

                setisLoading(false)
            }
        } catch (error) {

            setisLoading(false)
        }
    };


    useEffect(() => {
        getAllUsersBySearch();
    }, [SelectedUser, StartDate, EndDate, Status]);


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
                toast("Employee Leave Deleted !", {
                    type: "success",
                });
                setShow(false);
                setisLoading(false);
                getAllUsersBySearch();
            })
            .catch((err) => {
                toast("Unable to Delete Employee Leave", {
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
                    toast("Employee Leave Updated Successfully !", {
                        type: "success",
                    });
                    getAllUsersBySearch();
                    setShow(false);
                    setisLoading(false);
                }
                else {
                    getAllUsersBySearch();
                    setisLoading(false);
                    toast("Employee Leave Cannot Be Updated", {
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
        <>
        </>
        // <tr style={{fontSize: "15px"}}>
        //     {EditButton == "Active" || DeleteButton == "Active" || approveButton == "Active" ? <th className="text-center">Ref. Order Id</th> : ""}
        //     <th>Ref. order for</th>
        //     <th>project ref</th>
        //     {/* <th>Third-party</th> */}
        //     <th>Order date</th>
        //     <th>Amount(inc..)</th>
        //     <th>Sales representally</th>
        //     {/* <th>Custom feild 1</th> */}
        //     <th>Creation date</th>
        //     <th>Shippable</th>
        //     <th>Billed</th>
        //     <th>Status</th>
            
        // </tr>
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
        console.log(item, "===========>ItemRohit")
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
                        <span className="fw-medium">{item.first_name}{" "}{item.middle_name}{" "}{item.last_name}</span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.name}</span>
                    </p>
                </td>
                {/* <td style={{ whiteSpace: item.leave_reason.length > 30 ? 'normal' : 'nowrap', maxWidth: '300px' }}>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0" style={{ whiteSpace: item.leave_reason.length > 30 ? 'normal' : 'nowrap', maxWidth: '300px' }}>
                        <span className="fw-medium">{item.leave_reason}</span>
                    </p>
                </td> */}
                <td style={{ whiteSpace: item.leave_reason.length > 30 ? 'normal' : 'nowrap', maxWidth: '300px' }}>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0" style={{ whiteSpace: item.leave_reason.length > 30 ? 'normal' : 'nowrap', maxWidth: '300px' }}>
                        <span className="fw-medium">
                            {item.leave_reason.split(' ').slice(0, 5).join(' ')}
                            {item.leave_reason.split(' ').length > 5 ? '...' : ''}
                        </span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium"> {formatDate(item.start_date)}</span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">

                        <span className="fw-medium"> {formatDate(item.end_date)}</span>
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

    // Stat -Export Excel of Data
    const handleExport = () => {
        const dataToExport = userlist.map(item => ({
            'Employee Name': `${item.first_name} ${item.middle_name} ${item.last_name}`,
            'Leave Name': item.name,
            'Leave Reason': item.leave_reason,
            'Start Date': formatDate(item.start_date),
            'End Date': formatDate(item.end_date),
            'Status': item.status === 1 ? 'Pending' :
                      item.status === 2 ? 'Approved' :
                      item.status === 3 ? 'Disapproved' :
                      item.status === 4 ? 'Cancelled' : '',
                                    
        }));
       
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        console.log(dataToExport, "==========>dataToExportExpot")
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'EmployeeLeavesData');
    
        // Create a link element and trigger a click event to download the file
        XLSX.writeFile(wb, 'EmployeeLeavesData.xlsx');
    };

     // End -Export Excel of Data


    return (
        <React.Fragment>
          

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

                            <OrderSalesPreoessTables
                                approveButton={"Active"}
                                approvelink={"/viewleaverequest/"}
                                listbutton={""}
                                allUserData={userlist || []}
                                perPage={perPage}
                                currentpageIndex={currentpageIndex}
                                pageTotal={totalPages}
                                setPerPage={perPage}
                                setIsUserID={setIsUserID}
                                setShow={setShow}
                                getAllUsers={getAllUsersBySearch}
                                renderTHContent={renderTHContent}
                                renderTdContent={renderTdContent}
                                btnName="Apply Leave"
                                addData={CreateButton == "iActive" ? "/applyleave" : ""}
                                editData={EditButton == "iActive" ? "/editcountry/" : ""}
                                MasterSearch={'country_name'}
                                deletedata={DeleteButton == "Active" ? "Active" : ""}
                            // emailSearch1={'email'}
                            />
                        </>)}

                    </CardBody>

                
            {/* <Modal isOpen={show} backdrop="static">
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
            </Modal> */}
        </React.Fragment>
    );
};

export default OrderSalesPreoessLists;