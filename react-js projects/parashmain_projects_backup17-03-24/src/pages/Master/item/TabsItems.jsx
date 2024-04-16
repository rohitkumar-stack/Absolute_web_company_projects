import React, { Component, useState } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_ROLE } from "../../../globals";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ItemList from "./getitem";
import GetItemCategory from "../itemcategory/itemcategorylist";
import GetItemSubCategory from "../itemsubcategory/getitemsubcategory";
import GetItemmakeList from "../Itemmake/itemmakelist";


const TabsItems = () => {
    const [key, setKey] = useState('Item list');

    const [breadcrumbItems, setBreadcrumbItems] = useState([
        { title: 'Master', link: process.env.PUBLIC_URL + '/dashboard' },
        { title: 'Item', link: process.env.PUBLIC_URL + '/tabsItems' },
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
    const ShowItemTabButton = filteredPermissions?.find(permission => permission.name === "Show Item Master");
    const ShowItemCategoryTabButton = filteredPermissions?.find(permission => permission.name === "Show Item_category Master");
    const ShowItemSubCategoryTabButton = filteredPermissions?.find(permission => permission.name === "Show Item_sub_category Master");
    const ShowItemMakeTabButton = filteredPermissions?.find(permission => permission.name === "Show Item_make Master");
    // console.log(EditLeadReference, "====>EditLeadReference");

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
                            <Tab eventKey="Item list" title="Item lists">
                                {/* Start first tab contents */}
                                {/* {
                                    ShowItemTabButton?.status == 'Active' ?
                                        <> */}
                                < ItemList />
                                `   {/* </>
                                        :
                                        <>
                                            <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                        </>
                                }` */}

                                {/* End first tab contents */}
                            </Tab>


                            <Tab eventKey="Item Category" title="Item Category">

                                {/* Start-- Second tab contents */}
                                {
                                    ShowItemCategoryTabButton?.status == 'Active' ?
                                        <>
                                            <GetItemCategory />
                                        </>
                                        :
                                        <>
                                            <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                        </>
                                }
                                {/* End Second tab contents */}
                            </Tab>
                            <Tab eventKey="Item SubCategory" title="Item SubCategory">
                                {/* Start Third tab contents */}
                                {
                                    ShowItemSubCategoryTabButton?.status == 'Active' ?
                                        <>
                                            <GetItemSubCategory />
                                        </>
                                        :
                                        <>
                                            <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                        </>
                                }
                                {/* End Third tab contents */}
                            </Tab>
                            <Tab eventKey="Item Make" title="Item Make">
                                {/* Start Third tab contents */}
                                {
                                    ShowItemMakeTabButton?.status == 'Active' ?
                                        <>
                                            <GetItemmakeList />
                                        </>
                                        :
                                        <>
                                            <h5 style={{ textAlign: "center", fontWeight: "600", fontFamily: "sans-serif" }}>No Permission View</h5>
                                        </>
                                }
                                {/* End Third tab contents */}
                            </Tab>
                        </Tabs>

                        {/* End Tabs content */}

                    </Container>
                </div>
            </React.Fragment>

        </>
    )
}

export default TabsItems;