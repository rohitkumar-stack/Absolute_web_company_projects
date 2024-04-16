import React, { Component, useState, useEffect } from "react";
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
import GetUnit from "./getunitmaster";
import GetUnitMeasure from "../unitmeasure/unitmeasurelist";
import { useHistory, useLocation } from 'react-router-dom';


const UnitTabs = () => {
    const [key, setKey] = useState('Unit list');

    const [breadcrumbItems, setBreadcrumbItems] = useState([
        { title: 'Master', link: process.env.PUBLIC_URL + '/unitTabs' },
        { title: 'Unit', link: process.env.PUBLIC_URL + '/itemlist' },
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
    const ShowUnitMeasure = filteredPermissions?.find(permission => permission.name === "Show Unit Measure Master");
    console.log(ShowUnitMeasure, "====>ShowUnitMeasure");

    // End------------RolePermission for Button



    return (
        <>
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Unit" breadcrumbItems={breadcrumbItems} />
                        {/* Start Tabs content */}
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={handleSelect}
                            className="mb-3"
                        >
                            <Tab eventKey="Unit list" title="Unit list">
                                {/* Start first tab contents */}
                                {/* {
                                    ShowUnitMeasure?.status == 'Active' ?
                                        <> */}
                                < GetUnit />
                                {/* </>
                                        :
                                        <>
                                            <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                        </>
                                } */}


                                {/* End first tab contents */}
                            </Tab>
                            <Tab eventKey="Unit Measure" title="Unit Measure">
                                {/* Start Second tab contents */}
                                {
                                    ShowUnitMeasure?.status == 'Active' ?
                                        <>
                                            <GetUnitMeasure />
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

export default UnitTabs;