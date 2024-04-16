import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Container, Label, Table, Input, Form, Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { GET_ALL_PERMISSIONS, GET_PERMISSIONS_BY_ID, GET_ROLE_BY_ID, UPDATE_PERMISSION, UPDATE_ROLE } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";
import "../../../assets/custom.css"
import "../Roles/rolepermissionStyle.scss";

const Rolepermissionsample = () => {

    const [breadcrumbItems, setBreadcrumbItems] = useState([
        { title: "Roles", link: process.env.PUBLIC_URL + "/roleslist" },
        { title: "Edit Role", link: process.env.PUBLIC_URL + "/#" },
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const [getById, setGetById] = useState(null);
    const [searchValue, setSearchValue] = useState('');


    //search value
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const data = [
        { menu: 'Dashboard', subMenus: [], submenuChild: [], permissions: [false, false, false, false] },
        { menu: 'Master', subMenus: ['Roles'], permissions: [false, true, true, true] },
        // Add more data as needed
    ];

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb title="Edit Role" breadcrumbItems={breadcrumbItems} />
                    <Card>
                        <CardBody>

                            <h5 className="role_heading">ROLE PERMISSIONS</h5>
                            <Row className="mb-4">
                                <Col lg={{ span: 3, offset: 9 }} style={{ flex: "left", width: "244px" }}>
                                    <div>
                                        {/* Search input */}
                                        <Input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchValue}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={12}>
                                    <div className="table-responsive" style={{ height: '500px', overflow: 'auto' }}>
                                        <Table bordered className="mb-0">
                                            <thead className="sticky-header bg-light" style={{ position: 'sticky', top: '0', backgroundColor: '#ffffff', zIndex: '100' }}>
                                                <tr className="th_menu">
                                                    <th>Menu</th>
                                                    <th>SubMenu</th>
                                                    <th>SubMenu</th>
                                                    <th>SubMenu</th>
                                                    <th>View</th>
                                                    <th>Add</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="th_menu">
                                                    <td scope="row" className="th_menu">Dashboard</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input
                                                                className="form-check-input custom-checkbox-border"
                                                                type="checkbox"
                                                                value=""
                                                                id="defaultCheck1"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                {/* master */}
                                                <tr className="th_menu">
                                                    <th scope="row"></th>
                                                    <td className="th_menu">Master</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr className="th_menu">
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Roles</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr >

                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Country</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">State</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Designation</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Department</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">HSN Code</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Items */}
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td className="th_menu">Items</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Item</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Item Category</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu"> Item Sub-Category</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Item Make</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Ledger */}
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td className="th_menu">Ledger</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Ledger</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Ledger Group</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* shift */}
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td className="th_menu">Shift</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Terms & Conditions */}
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td className="th_menu">Terms & Conditions</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Unit */}
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td className="th_menu">Unit</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                    <td></td>

                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Unit</td>
                                                    <td></td>

                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Unit Measure</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Warehouse */}
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td className="th_menu">Warehouse</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* Leave Management */}
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td className="th_menu">Leave Management</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                {/* master */}
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td className="th_menu">Master</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Reference</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Industrial Type</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Ownership</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Contact Person</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td className="th_menu">Customers</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-inpu custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* Marketing Lead */}
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td className="th_menu">Marketing Lead</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check mb-3">
                                                            <Input className="form-check-input custom-checkbox-border"
                                                                type="checkbox" value="" id="defaultCheck1" />
                                                        </div>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};


export default Rolepermissionsample;
