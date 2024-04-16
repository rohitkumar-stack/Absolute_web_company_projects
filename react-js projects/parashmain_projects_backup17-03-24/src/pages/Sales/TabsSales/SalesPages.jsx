import React, { Component,useState } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_ROLE } from "../../../globals";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import OrderLists from "./OrderLists";
import OrderSalesLists from "./OrderSalesLists/OrderSalesLists";
import OrderListspages from "./OrderLists/OrderListspages";


class SalesPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'Dashboard',
            breadcrumbItems: [
                { title: "Sales ", link: process.env.PUBLIC_URL + "/roleslist" },
                { title: "Sales", link: process.env.PUBLIC_URL + "/#" },
            ],
            selectedFiles: [],
            Img: "",
            status: "Active",
            inputMobileField: "",
            shiftdetails: ""

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    handleAcceptedFiles = (files) => {
        this.getBase64Icon(files);
        files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),

            })
        );
        this.setState({ selectedFiles: files });
    };


    // CREATE USER API
    handleSubmit(event, values) {
        // this.setState({
        //     isLoading: true,
        // });
        var Token = localStorage.getItem("userToken");
        try {
            var myHeaders = JSON.stringify({
                Authorization: "Bearer " + Token,
                "Content-Type": "application/json",
            });
            var raw = JSON.stringify({
                name: values.role,
                status: this.state.status
            });
            fetch(CREATE_ROLE, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Role Created Successfully !", {
                            type: "success",
                        });
                        this.props.history.goBack();
                    }
                    else if (data.result === false) {
                        toast(data.message, {
                            type: "error",
                        });
                    }
                    else {
                        toast("Unable to Create Role", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to create Role", {
                type: "error",
            });

        }
    }

    //Tabs
    handleSelect = (k) => {
        this.setState({ key: k });
      };



    render() {
    

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Sales" breadcrumbItems={this.state.breadcrumbItems} />
                          {/* Start Tabs content */}
                          <Tabs
                                id="controlled-tab-example"
                                activeKey={this.state.key}
                                onSelect={this.handleSelect}
                                className="mb-3"
                            >

                            <Tab eventKey="Dashboard" title="Dashboard">
                            {/* Start first tabs contents */}
                             <Card>
                                <CardBody>
                                  <OrderLists />
                       
                                </CardBody>
                            </Card>
                            {/* Start first tabs contents */}
                             </Tab>
                                <Tab eventKey="Order Lists" title="Order Lists">
                                  {/* Start Second tabs contents */}
                                  <OrderSalesLists />
                                     {/* End Second tabs contents */}
                                </Tab>
                                <Tab eventKey="sale Lists" title="Sale Lists" >
                                    {/* Start Second tabs contents */}
                                   <OrderListspages />
                                 {/* End Second tabs contents */}
                                </Tab>
                            </Tabs>

                          {/* End Tabs content */}

                    </Container>
                </div>
            </React.Fragment>
        );
    };
};

export default SalesPages;
