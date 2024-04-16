import React, { Component } from "react";
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
import "../TabsSales/sales.scss";
import { Chart } from "react-google-charts";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import SalesAnalytics from "./SalesAnalytics";
import OrdersModifiedLists from "./OrdersModifiedLists";
import DraftOrdersLists from "./DraftOrdersLists";
import OrderSalesPreoessLists from "./OrderSalesPreoessLists";

// Start--Charts data
const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

const options = {
  title: "My Daily Activities",
  pieHole: 0.4,
  is3D: false,
};

// End--Charts data
class OrderLists extends Component {
  

    render() {
        return (
            <React.Fragment>
                {/* start first section */}
                <section>
                    <Row>
                        {/* Start Statistics-Sales Orders content */}
                        <Col xl={6}>
                           <div className="bg-light statics-Order" >
                             <p>Statistics-Sales Orders</p>
                           </div>
                           <SalesAnalytics />
                           <div className="bg-light statics-Order" style={{marginTop:"30px"}}>
                             <p>Total <span style={{float:"right"}}>2248</span></p>
                           </div>
                        </Col>
                         {/* End Statistics-Sales Orders content */}

                        {/* Start Latest 5 modified Orders content */}
                        <Col xl={6}>
                          <div className="bg-light statics-Order">
                             <p>Latest 5 modified Orders</p>
                           </div> 
                           
                            <OrdersModifiedLists/>
                                   
                        </Col>
                         {/* End Statistics-Sales Orders content */}
                    </Row>
                </section>   
                 {/* Ends first section */}

                {/* start second section */}
                <section>
                    <Row>
                        {/* Start Draft Order content */}

                       
                        <Col xl={6}>
                        {/* <div className="draft-page" style={{marginTop:"50px;"}}> */}

                          <div className="bg-light statics-Order01">
                             <p>Draft Order </p> 
                           </div> 
                           <DraftOrdersLists/>
                          

                         {/* </div>      */}
                        </Col>
                       
                         {/* End Draft Order content */}

                        {/* Start Slaes Order to process content */}
                        <Col xl={6}>
                          <div className="bg-light statics-Order02">
                             <p>Slaes Order to process<span className="number-box">233</span></p>
                           </div> 
                           <OrderSalesPreoessLists/>
                          
                      
                        </Col>
                         {/* End Slaes Order to process content */}
                    </Row>
                </section>   

                {/* End second section */}





            </React.Fragment>
        );
    };
};

export default OrderLists;
