import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Container, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

// Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import { DELETE_USER, GET_ALL_USERS, UPDATE_USER_STATUS } from '../../../globals';
import TableComponent from '../../../components/Common/tablecomponent';
import { ThreeDots } from "react-loader-spinner";
import { toast } from 'react-toastify';

const GetTenantuserList = () => {
    const [breadcrumbItems] = useState([
        { title: 'Dashboard', link: process.env.PUBLIC_URL + '/dashboard' },
        { title: 'User', link: process.env.PUBLIC_URL + '/users' },
    ]);

    const [page, setPage] = useState(1);
    const [isLoading, setisLoading] = useState(false);
    const [userlist, setUserlist] = useState([]);
    const [totalPages, setTotalPages] = useState('');
    const [currentpageIndex, setCurrentpageIndex] = useState('');
    const [perPage, setPerPage] = useState('');
    const [show, setShow] = useState(false);
    const [isUserID, setIsUserID] = useState(false);
    const columns = [
        { Header: 'Id', accessor: 'Id', disableFilters: true, filterable: false },
        // ... (other columns)
    ];



    useEffect(() => {
        getAllUsers();
    }, []); // Run the effect when the page changes


    const getAllUsers = async (page, perPage) => {
        setisLoading(true)
        var Token = await localStorage.getItem("userToken");
        try {
            const response = await fetch(page ? `${GET_ALL_USERS}?page=${page}` : `${GET_ALL_USERS}`, {
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
            DELETE_USER + isUserID,
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
                toast("User Deleted !", {
                    type: "success",
                });

                setShow(false);
                setisLoading(false);
                getAllUsers();
            })
            .catch((err) => {
                toast("Unable to Delete User", {
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
        await fetch(UPDATE_USER_STATUS + userid, {
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
                    toast("Tenant User Status Updated Successfully !", {
                        type: "success",
                    });
                    getAllUsers();
                    setShow(false);
                    setisLoading(false);
                }
                else {
                    getAllUsers();
                    setisLoading(false);
                    toast("Tenant User Status Cannot Be Updated", {
                        type: "error",
                    });
                }
            });
        })
            .catch((err) => {

                toast("Unable to Update Tenant User", {
                    type: "error",
                });
                setShow(false);
                setisLoading(false);
            });
    };

    // TABLE HEADER
    const renderTHContent = () => (
        <tr>
            <th className="text-center">Action</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Mobile No.</th>
            <th>Shift Details</th>
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
                        <span className="fw-medium">{item.first_name}{" "}{item.middle_name}{" "}{item.last_name}</span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.email}</span>
                    </p>
                </td>

                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.designation_name}</span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.mobile_number}</span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.shift_details == "1" ? "First Half" : "Second Half"}</span>
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

     // Start------------RolePermission for Button 
    // Retrieve data from localStorage
    const permissionsString = localStorage.getItem("permissionarray");

    // Parse the JSON string into a JavaScript object
    const permissions = JSON.parse(permissionsString);
    // this is use for all active permission
    const filteredPermissions = permissions.filter(permission => permission.status === 'Active');
    const AddUser = filteredPermissions?.find(permission => permission.name === "Add Users");
    const EditUser = filteredPermissions?.find(permission => permission.name === "Edit Users");
    // console.log(EditLeadReference, "====>EditLeadReference");
   
     
   // End------------RolePermission for Button 



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="User list" breadcrumbItems={breadcrumbItems} />

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
                                btnName="Add User"
                                // addData="/createuser"
                                // editData="/edituser/"
                                addData={AddUser?.status == "Active" ? "/createuser" : ""}
                                editData={EditUser?.status == "Active" ? "/edituser/" : ""}
                                MasterSearch={'first_name'}
                                emailSearch1={'email'}
                            />
                        )}
                    </CardBody>
                </Container>
            </div>
            <Modal isOpen={show} backdrop="static">
                <ModalHeader toggle={() => setShow(false)}>Delete Confirmation</ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to delete this user?</p>
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

export default GetTenantuserList;