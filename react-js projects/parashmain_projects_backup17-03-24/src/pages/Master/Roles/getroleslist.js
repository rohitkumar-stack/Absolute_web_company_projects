import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Container, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

// Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import { DELETE_COUNTRY, DELETE_ROLE, DELETE_USER, GET_ALL_ROLES, GET_ALL_USERS, GET_COUNTRY, UPDATE_ROLE_STATUS, getToken } from '../../../globals';
import TableComponent from '../../../components/Common/tablecomponent';
import { ThreeDots } from "react-loader-spinner";
import { toast } from 'react-toastify';
import { logDOM } from '@testing-library/react';

const Roleslist = () => {
    const [breadcrumbItems] = useState([
        { title: 'Master', link: process.env.PUBLIC_URL + '/dashboard' },
        { title: 'Roles', link: process.env.PUBLIC_URL + '/roleslist' },
    ]);

    const [page, setPage] = useState(1);
    const [isLoading, setisLoading] = useState(false);
    const [userlist, setUserlist] = useState([]);
    const [totalPages, setTotalPages] = useState('');
    const [currentpageIndex, setCurrentpageIndex] = useState('');
    const [perPage, setPerPage] = useState('');
    const [show, setShow] = useState(false);
    const [isUserID, setIsUserID] = useState(false);
    const [EditRoleButton, setEditRoleButton] = useState("Active");
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
        getAllUsers();
       
    }, []);



    const getAllUsers = async (page, perPage) => {
        setisLoading(true)
        var Token = await localStorage.getItem("userToken");
        try {
            const response = await fetch(page ? `${GET_ALL_ROLES}?page=${page}` : `${GET_ALL_ROLES}`, {
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


    // DELETE API 
    const DeleteUserData = async (isUserID) => {
        setisLoading(true);
        var Token = localStorage.getItem("userToken");
        await fetch(
            DELETE_ROLE + isUserID,
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
                toast("Role Status Deleted !", {
                    type: "success",
                });

                setShow(false);
                setisLoading(false);
                getAllUsers();
            })
            .catch((err) => {
                toast("Unable to Delete Role", {
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
        await fetch(UPDATE_ROLE_STATUS + userid, {
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
                    toast("Role Status Updated Successfully !", {
                        type: "success",
                    });
                    getAllUsers();
                    setShow(false);
                    setisLoading(false);
                }
                else {
                    getAllUsers();
                    setisLoading(false);
                    toast("Role Status Cannot Be Updated", {
                        type: "error",
                    });
                }
            });
        })
            .catch((err) => {

                toast("Unable to Update Role Status", {
                    type: "error",
                });
                setShow(false);
                setisLoading(false);
            });
    };

    const loadEditPermissions = async () => {
        try {
            const tempArr = PermissionArr
                .filter(item => item.name.includes("Edit Leave Master"))
                .flatMap(item => sidebarArr
                    .filter(sidebar => item.type === sidebar.value)
                    .map(sidebar => ({
                        active: item.status,
                    }))
                );
            const finalString = tempArr.map(item => item.active).join(', ');
            EditRoleButton(finalString);
        } catch (error) {
        }
    };


    // TABLE HEADER
    const renderTHContent = () => (
        <tr>
            {/* <th className="text-center">Action</th> */}
            {EditRoleButton == "Active"  ? <th className="text-center">Action</th> : ""}
            <th>Role Name</th>
            <th>Status</th>
        </tr>
    );

    // TABLE DATA
    function renderTdContent(item) {

        return (
            <>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.name}</span>
                    </p>
                </td>
                <td>
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
                </td>
            </>
        );
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Roles list" breadcrumbItems={breadcrumbItems} />

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
                            //    approveButton={"Active"}  //view button
                            //    approvelink={"/editrolelists/"}
                            //    editRolePermissionlinks={"/editstate"}  //view button
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
                                btnName="Add Role"
                                addData="/createrole"
                                // editData="/editrole/"
                                editData="/editrole/"
                                // editRolePermission={EditRoleButton == "Active" ? "/editinquiry/" : ""}
                                MasterSearch={'name'}
                               // emailSearch1={'email'}
                            //    only={true}
                            //    onlylink={"/editrolelists/"}
                            //    editRolePermission={EditRoleButton == "Active" ? "/editrolelists/" : ""}

                            />
                        )}
                    </CardBody>
                </Container>
            </div>
            <Modal isOpen={show} backdrop="static">
                <ModalHeader toggle={() => setShow(false)}>Delete Confirmation</ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to delete this Role?</p>
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

export default Roleslist;