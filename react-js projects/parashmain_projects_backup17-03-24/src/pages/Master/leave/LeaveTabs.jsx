import React, { Component, useState } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css';
import { toast } from "react-toastify";
import { CREATE_ROLE } from "../../../globals";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import GetLeave from "./getleavelist";
import GetLeaveBalance from "../Leave Balance/getleavebalance";
import LeaveEntitlement from "../leadentitlement/leaveentitlementlist";
import GetSlot from "../timeslot/gettimeslotlist";


const LeaveTabs = () => {
    const [key, setKey] = useState('Leave list');

    const [breadcrumbItems, setBreadcrumbItems] = useState([
        { title: 'Master', link: process.env.PUBLIC_URL + '/dashboard' },
        { title: 'leave', link: process.env.PUBLIC_URL + '/itemlist' },
    ]);

    //Tabs functionalty 
    const handleSelect = (selectedKey) => {
        setKey(selectedKey);
    };


    // Start------------RolePermission for Button 
    // Retrieve data from localStorage
    const permissionsString = localStorage.getItem("permissionarray");

    // Parse the JSON string into a JavaScript object
    const permissions = JSON.parse(permissionsString);
    // this is use for all active permission
    const filteredPermissions = permissions.filter(permission => permission.status === 'Active');
    const ShowLeaveEntitlement = filteredPermissions?.find(permission => permission.name === "Show Leave_entitlement Master");
    const ShowSlotTime = filteredPermissions?.find(permission => permission.name === "Show Slot Time");
    const ShowLeaveBalance = filteredPermissions?.find(permission => permission.name === "Show Leave Balance");
    // console.log(ShowUnitMeasure, "====>ShowUnitMeasure");

    // End------------RolePermission for Button

    return (
        <>
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Master" breadcrumbItems={breadcrumbItems} />
                        {/* Start Tabs content */}
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={handleSelect}
                            className="mb-3"
                        >
                            <Tab eventKey="Leave list" title="Leave list">
                                {/* Start first tab contents */}
                                < GetLeave />
                                {/* End first tab contents */}
                            </Tab>
                            <Tab eventKey="Leave Balance" title="Leave Balance">
                                {/* Start Second tab contents */}
                                {
                                    ShowLeaveBalance?.status == 'Active' ?
                                        <>
                                            <GetLeaveBalance />
                                        </>
                                        :
                                        <>
                                            <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                        </>
                                }


                                {/* End Second tab contents */}
                            </Tab>
                            <Tab eventKey="Leave Entitlemenent" title="Leave Entitlemenent">
                                {/* Start Second tab contents */}
                                {
                                    ShowLeaveEntitlement?.status == 'Active' ?
                                        <>
                                            <LeaveEntitlement />
                                        </>
                                        :
                                        <>
                                            <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                        </>
                                }

                                {/* End Second tab contents */}
                            </Tab>
                            <Tab eventKey="Slot Times" title="Slot Times ">
                                {/* Start Second tab contents */}
                                {
                                    ShowSlotTime?.status == 'Active' ?
                                        <>
                                            <GetSlot />
                                        </>
                                        :
                                        <>
                                            <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                        </>
                                }

                                {/* End Second tab contents */}
                            </Tab>

                        </Tabs>

                        {/* End Tabs content */}

                    </Container>
                </div>
            </React.Fragment>

        </>
    )
}

export default LeaveTabs;