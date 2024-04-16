import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Container, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { DELETE_COUNTRY, DELETE_USER, GET_ALL_USERS, GET_COUNTRY, GET_LEAVE_REQUEST_BY_USER_ID, UPDATE_COUNTRY_STATUS, getToken } from '../../globals';
import TableComponent from '../../components/Common/tablecomponent';
import { ThreeDots } from "react-loader-spinner";
import { toast } from 'react-toastify';

const GetLeaveForEmployee = () => {
    const [breadcrumbItems] = useState([
        { title: 'Parasmani', link: process.env.PUBLIC_URL + '/dashboard' },
        { title: 'Leave Request', link: process.env.PUBLIC_URL + '/employeeleavelist' },
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
    const [DeleteButton, setDeleteButton] = useState([]);
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



    useEffect(() => {
        setCreateButton("Active");
        setEditButton("Active");
        getAllUsers();
        // loadCreatePermissions();
        // loadEditPermissions();
        // loadDeletePermissions();
    }, []); // Run the effect when the page changes

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

    const getAllUsers = async (page, perPage) => {
        setisLoading(true)
        var id = localStorage.getItem("tenant_id")
        var Token = await localStorage.getItem("userToken");
        try {
            const response = await fetch(page ? `${GET_LEAVE_REQUEST_BY_USER_ID}` + id + `?page=${page}` : `${GET_LEAVE_REQUEST_BY_USER_ID}` + id, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + Token,
                    'Content-Type': 'application/json',
                },
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
                        <span className="fw-medium"> {formatDate(item.start_date)}</span>
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
                    <Breadcrumbs title="Leave Request list" breadcrumbItems={breadcrumbItems} />

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
                        ) : (
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