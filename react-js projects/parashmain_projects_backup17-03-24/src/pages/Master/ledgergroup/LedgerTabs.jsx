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
import LeagderlList from "../ledger/ledgerlist";
import LedgerGroup from "./getledgergrouplist";

const LedgerTabs = () => {
    const [key, setKey] = useState('Ledger list');

    const [breadcrumbItems, setBreadcrumbItems] = useState([
        { title: 'Master', link: process.env.PUBLIC_URL + '/dashboard' },
        { title: 'ledger', link: process.env.PUBLIC_URL + '/itemlist' },
    ]);

    //Tabs functionalty 
    const handleSelect = (selectedKey) => {
        setKey(selectedKey);
    };


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
                            <Tab eventKey="Ledger list" title="Ledger list">
                                {/* Start first tab contents */}
                                < LeagderlList/>
                             
                                {/* End first tab contents */}
                            </Tab>
                            <Tab eventKey="Ledger Group" title="Ledger Group">
                                {/* Start Second tab contents */}
                                 <LedgerGroup />
                             
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

export default LedgerTabs;