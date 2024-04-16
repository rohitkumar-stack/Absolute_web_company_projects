import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Input, Row, Col, Card, CardBody } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const TableComponent = ({
    approveButton,
    approvelink,
    listbutton,
    allUserData,
    MasterSearch,
    emailSearch1,
    perPage,
    currentpageIndex,
    pageTotal,
    setPerPage,
    setIsUserID,
    setShow,
    getAllUsers,
    renderTdContent,
    renderTHContent,
    addData,
    editData,
    editRolePermission,
    btnName,
    deletedata,
    isDropDown = true,
    role_id = false,
    only=false,
}) => {
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState(""); // Step 2
    const [filteredData, setFilteredData] = useState(allUserData);

    // old functionality
    // useEffect(() => {
    //     const filtered = allUserData?.filter((item) =>

    //         item.first_name.toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    //     setFilteredData(filtered);
    // }, [searchQuery]);

    // useEffect(() => {
    //     const filtered = allUserData?.filter((item) => {
    //         if (isOnFleetListPage) {
    //             return item.fleet_name.toLowerCase().includes(searchQuery.toLowerCase()) || item.model_name.toLowerCase().includes(searchQuery.toLowerCase())
    //         } else {
    //             return item.username.toLowerCase().includes(searchQuery.toLowerCase()) || item.mobile.toLowerCase().includes(searchQuery.toLowerCase()) || item.email.toLowerCase().includes(searchQuery.toLowerCase())
    //         }
    //     }
    //     );
    //     setFilteredData(filtered);
    // }, [searchQuery]);

    // useEffect(() => {
    //     const filtered = allUserData?.filter((item) => {
    //         if (MasterSearch) {
    //             return item[MasterSearch]?.toLowerCase().includes(searchQuery.toLowerCase()) || item[MasterSearch1]?.toLowerCase().includes(searchQuery.toLowerCase())
    //         } else {
    //             return item[MasterSearch]?.toLowerCase().includes(searchQuery.toLowerCase()) || item.city?.toLowerCase().includes(searchQuery.toLowerCase())
    //         }
    //     }
    //     );
    //     setFilteredData(filtered);
    // }, [searchQuery]);
    // console.log(editRolePermission, "===>editRolePermission");

    return (
        <div>
            <Row>
                <Col xl="12" sm="12">
                    <div className="text-end mb-3">
                        {addData != "" ?
                            <Link to={process.env.PUBLIC_URL + addData} className="action-icon text-light">
                                <Button color="primary" type="button" className="waves-effect waves-light me-1">
                                    {btnName}<i className=" ri-add-fill align-middle ms-2"></i>
                                </Button>
                            </Link>
                            : ""}
                        {listbutton === "Active" ?
                            <Link to={process.env.PUBLIC_URL + addData} className="action-icon text-light">
                                <Button color="primary" type="button" className="waves-effect waves-light me-1">
                                    View Leave Policy
                                </Button>
                            </Link>
                            : ""}
                    </div>
                    <Card>
                        <CardBody>
                            <Row className="mb-2">
                                <div className='d-flex justify-content-between'>
                                    <Col md={"2"}>
                                        {/* <select
                                            className="form-select"
                                            value={perPage}
                                            onChange={(e) => {
                                                setPerPage(parseInt(e.target.value));
                                                getAllUsers(currentpageIndex, parseInt(e.target.value));
                                            }}
                                        >
                                            {isDropDown ?
                                                [10, 20, 30, 40, 50].map((pageSize) => {
                                                    return (
                                                        <option key={pageSize} value={pageSize}>
                                                            Show {pageSize}
                                                        </option>
                                                    );
                                                }) :
                                                [10].map((pageSize) => {
                                                    return (
                                                        <option key={pageSize} value={pageSize}>
                                                            Show {pageSize}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </select> */}
                                    </Col>
                                    {/* <Col md={"2"}>
                                        <Input
                                            type="text"
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)} // Step 4
                                        />
                                    </Col> */}
                                </div>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <div className="table-responsive">
                                        <Table className="table-centered mb-0 table-nowrap">
                                            <thead className="bg-light">
                                                {renderTHContent()}
                                            </thead>
                                            {allUserData.length > 0 ?
                                                <tbody>
                                                    {allUserData?.map((item, index) => {
                                                        // {filteredData?.map((item, index) => {
                                                        // console.log('item---', item)
                                                        return (

                                                            <tr key={item.id}>
                                                                {deletedata != "" || editData != "" || editRolePermission !='' || approveButton ?
                                                                    <td style={{ width: "90px" }} className="text-center">
                                                                        {/* {deletedata != "" ?
                                                                            < RiDeleteBinLine
                                                                                style={{
                                                                                    color: "#ff3d60",
                                                                                    height: "23px",
                                                                                    width: "23px",
                                                                                    marginTop: "8px",
                                                                                }}
                                                                                onClick={() => {
                                                                                    setIsUserID(item?.id);
                                                                                    setShow(true);
                                                                                }}
                                                                            />
                                                                            : ""} */}
                                                                        {approveButton === "Active" ?
                                                                            <>
                                                                             {/* view button  */}
                                                                                <Tooltip title="View" placement="top-start" arrow>
                                                                                    <IconButton>
                                                                                        <ImEye
                                                                                            style={{
                                                                                                color: "#5664d2",
                                                                                                height: "20px",
                                                                                                width: "20px",
                                                                                                marginTop: "8px",
                                                                                                marginLeft: "10px",
                                                                                                cursor: 'pointer'
                                                                                            }}
                                                                                            onClick={() =>
                                                                                                history.push(process.env.PUBLIC_URL + approvelink + item.id)
                                                                                            }
                                                                                        />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                            </> : ""}
                                                                        
                                                                        {/* Edit button  */}
                                                                        {editData != "" ?
                                                                            <Tooltip title="Edit" placement="top-start" arrow>
                                                                                <IconButton>
                                                                                    < FiEdit
                                                                                        style={{
                                                                                            color: "#5664d2",
                                                                                            height: "20px",
                                                                                            width: "20px",
                                                                                            marginTop: "8px",
                                                                                            marginLeft: "10px",
                                                                                        }}
                                                                                        onClick={() => {
                                                                                            console.log('role_id--', role_id)
                                                                                            if (role_id) {
                                                                                                history.push(process.env.PUBLIC_URL + editData + item.role_id, { isView: false })
                                                                                            } else {

                                                                                                history.push(process.env.PUBLIC_URL + editData + item.id, { isView: false })
                                                                                            }
                                                                                        }

                                                                                        }
                                                                                    />
                                                                                </IconButton>
                                                                            </Tooltip>

                                                                            : ""}

                                                                      {/* RoleListsEdit button  */}
                                                                      
                                                                      {
                                                                        only && (
                                                                            <Tooltip title="RolePermission" placement="top-start" arrow>
                                                                                <IconButton>
                                                                                    < FiEdit
                                                                                        style={{
                                                                                            color: "#5664d2",
                                                                                            height: "20px",
                                                                                            width: "20px",
                                                                                            marginTop: "8px",
                                                                                            marginLeft: "10px",
                                                                                        }}
                                                                                        onClick={() => {
                                                                                            console.log('role_id--', role_id)
                                                                                            if (role_id) {
                                                                                                history.push(process.env.PUBLIC_URL + editRolePermission + item.role_id, { isView: false })
                                                                                            } else {

                                                                                                history.push(process.env.PUBLIC_URL + editRolePermission + item.id, { isView: false })
                                                                                            }
                                                                                        }

                                                                                        }
                                                                                    />
                                                                                </IconButton>
                                                                            </Tooltip>

                                                                        )
                                                                      }

                                                                         
                                                                    </td>
                                                                    : ""}
                                                                {renderTdContent(item)}
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                                : <tbody>
                                                    <tr>
                                                        <td colSpan="12" className="text-center">
                                                            No Record Found
                                                        </td>
                                                    </tr>
                                                </tbody>}
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-4 justify-content-md-end justify-content-center align-items-center mb-2">
                                <Col className="col-md-auto">
                                    <div className="d-flex gap-1">
                                        <Button color="primary" onClick={() => getAllUsers(0)} disabled={currentpageIndex == 1}>
                                            {"<<"}
                                        </Button>
                                        <Button
                                            color="primary"
                                            onClick={() => getAllUsers(currentpageIndex - 1)}
                                            disabled={currentpageIndex == 1}
                                        >
                                            {"<"}
                                        </Button>
                                    </div>
                                </Col>
                                <Col className="col-md-auto d-none d-md-block">
                                    Page <strong>{currentpageIndex} of {pageTotal}</strong>
                                </Col>
                                <Col className="col-md-auto">
                                    <Input
                                        type="number"
                                        min={1}
                                        style={{ width: 70 }}
                                        max={allUserData?.length}
                                        defaultValue={currentpageIndex}
                                        onClick={(event) => event.target.select()}
                                        onChange={(e) => getAllUsers(parseInt(e.target.value))}
                                    />
                                </Col>
                                <Col className="col-md-auto">
                                    <div className="d-flex gap-1">
                                        <Button
                                            color="primary"
                                            onClick={() => getAllUsers(currentpageIndex + 1)}
                                            disabled={currentpageIndex === pageTotal}
                                        >
                                            {">"}
                                        </Button>
                                        <Button
                                            color="primary"
                                            onClick={() => getAllUsers(pageTotal)}
                                            disabled={currentpageIndex === pageTotal}
                                        >
                                            {">>"}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </div >
    );
};

export default TableComponent;