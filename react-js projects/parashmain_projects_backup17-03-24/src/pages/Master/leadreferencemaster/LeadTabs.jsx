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
import GetLeadreference from "./getleadreferences";
import GetIndustrialType from "../industrialtype/getindustrialtype";
import GetownerShip from "../ownershipmaster/getownershipmaster";
import GetContacPerson from "../contactperson/getcontactperson";
import GetCustomerMaster from "../customermaster/getcustomermaster";
// import GetDesignation from "../designation/getDesignation";
import GetDesignationCompany from "../designation/getDesignationCompany";
// import AddDepartment from "../department/adddepartment";
import Getcompanytypedepartment from "../department/getcompanytypedepartment";

const LeadTabs = () => {
    const [key, setKey] = useState('Reference');

    const [breadcrumbItems, setBreadcrumbItems] = useState([
        { title: 'Master', link: process.env.PUBLIC_URL + '/dashboard' },
        { title: 'Lead', link: process.env.PUBLIC_URL + '/LeadTabs' },
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
    const ShowReferenceMaster = filteredPermissions?.find(permission => permission.name === "Show Customers Master");
    const ShowIndustrialType = filteredPermissions?.find(permission => permission.name === "Show Industrial_type Master");
    const ShowOwnerShip = filteredPermissions?.find(permission => permission.name === "Show Ownership Master");
    const ShowContactPerson = filteredPermissions?.find(permission => permission.name === "Show Contact_person Master");
    const ShowCustomer = filteredPermissions?.find(permission => permission.name === "Show Customers Master");

    // console.log(ShowReferenceMaster, "====>ShowReferenceMaster");

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
                            <Tab eventKey="Reference" title="Reference">
                                {/* Start first tab contents */}
                                {
                                    ShowReferenceMaster?.status == 'Active' ?
                                        <>
                                            < GetLeadreference />
                                        </>
                                        :
                                        <>
                                            <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                        </>
                                }


                                {/* End first tab contents */}
                            </Tab>
                            <Tab eventKey="Industrial Type" title="Industrial Type">
                                {/* Start Second tab contents */}
                                {
                                    ShowIndustrialType?.status == 'Active' ?
                                        <>
                                            <GetIndustrialType />
                                        </>
                                        :
                                        <>
                                            <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                        </>
                                }


                                {/* End Second tab contents */}
                            </Tab>
                            <Tab eventKey="Ownership" title="Ownership">
                                {/* Start Second tab contents */}
                                {
                                    ShowOwnerShip?.status == 'Active' ?
                                        <>
                                            <GetownerShip />
                                        </>
                                        :
                                        <>
                                            <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                        </>
                                }

                                {/* End Second tab contents */}
                            </Tab>
                            <Tab eventKey="Customers" title="Customers">
                                {/* Start Second tab contents */}
                                {
                                    ShowCustomer?.status == "Active" ?
                                        <>
                                            <GetCustomerMaster />
                                        </>
                                        :
                                        <>
                                            <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                        </>
                                }

                                {/* End Second tab contents */}
                            </Tab>
                            <Tab eventKey="Designation" title="Designation">
                                {/* Start Second tab contents */}
                                {
                                    ShowCustomer?.status =="Active"?
                                    <>
                                     {/* <GetDesignation />    */}
                                     <GetDesignationCompany/>
                                    </>
                                    :
                                    <>
                                     <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                    </>
                                }
                                                          
                                {/* End Second tab contents */}
                            </Tab>
                            <Tab eventKey="Department" title="Department">
                                {/* Start Second tab contents */}
                                {
                                    ShowCustomer?.status =="Active"?
                                    <>
                                     {/* <GetDepartment />    */}
                                     <Getcompanytypedepartment/>
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

export default LeadTabs;