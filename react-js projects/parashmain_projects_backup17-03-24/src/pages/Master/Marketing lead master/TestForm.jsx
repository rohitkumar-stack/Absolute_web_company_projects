import React, { Component } from "react";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { GET_MARKETING_LEAD, CREATE_ADD_MORE_CONTACTPERSON, CREATE_DESIGNATION, CREATE_DOCUMENT_LEAD, CREATE_ITEM_CATEGORY, CREATE_ITEM_MAKER, CREATE_LEAD_REFERENCE, CREATE_LEAVE, CREATE_MARKETING_LEAD, CREATE_MARKETING_LEAD_WIDTH_DOCUMENTS, CREATE_SHIFT, CREATE_SUBITEM_CATEGORY, CREATE_TERMS_CONDITIONS, CREATE_UNIT, CREATE_UNIT_MEASURE, CREATE_USER, CREATE_WAREHOUSE, GET_ALL_CUSTOMER_WO_PAGINATION, GET_CONTACTPERSON_BY_ID, GET_CONTACTPERSON_WO_PAGINATE, GET_COUNTRY, GET_CUSTOMER_BY_ID, GET_ITEM_CATEGORY, GET_LEAD_REFERENCE_BY_ID, GET_LEAD_REFERENCE_WO_PAGINATE, GET_OWNERSHIP_WO_PAGINATE } from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Row, Col, Card, CardBody, TabContent, TabPane, NavItem, NavLink, Label, Input, Form, Progress, Container, Button, Table, ModalBody, ModalHeader, Modal } from "reactstrap";
import classnames from 'classnames';
import { RiDeleteBin6Line } from "react-icons/ri";
import CreateLeadRefranceModal from "../leadreferencemaster/CreateLeadRefranceModal";
import CreateCustomerModal from "../customermaster/CreateCustomerModal";
import CreateContactPersonModal from "../contactperson/CreateContactPersonModal";
import Select from "react-select";


class TestForm extends Component {
    constructor(props) {
        super(props);
        // Declare initialOptions before using it in options
        const initialOptions = [
            { value: "C++", label: "C++" },
            { value: "JAVA", label: "JAVA" },
            { value: "Javascript", label: "Javascript" },
            { value: "Python", label: "Python" },
            { value: "Swift", label: "Swift" },
        ];
    
        this.state = {
            breadcrumbItems: [
                { title: "Market Lead", link: process.env.PUBLIC_URL + "/marketingleadlist" },
                { title: "Create Market Lead", link: process.env.PUBLIC_URL + "/#" },
            ],
            selectedcontactpersonAddMore: "",
            dataArray: [],
            options: initialOptions, // Now using the declared initialOptions
            selectedOption: null,
        };
    }
    
    

    handleAddOption = () => {
        const newValue = prompt("Enter the new value:");
        if (newValue) {
            const newOption = { value: newValue, label: newValue };
            this.setState(prevState => ({
                options: [...prevState.options, newOption],
                selectedOption: newOption
            }));
        }
    };


    render() {
        // const { fruits } = this.state;
        // const groupedFruits = Object.values(fruits.reduce((acc, current) => {
        //     acc[current.fruit_color] = acc[current.fruit_color] ?? [];
        //     acc[current.fruit_color].push(current);
        //     return acc;
        // }, {}));
        const { options, selectedOption } = this.state;

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add Market Lead" breadcrumbItems={this.state.breadcrumbItems} />

                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title mb-4">Lead Details</h4>
                                    {/* start------ filter of color by listing data */}
                                    {/* <div>
                                        {groupedFruits.map((group, index) => (
                                            <div key={index}>
                                                <h2>{group[0].fruit_color} Fruits</h2>
                                                <ul>
                                                    {group.map((fruit, idx) => (
                                                        <li key={idx}>{fruit.fruit_name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div> */}
                                    {/* End------ filter of color by listing data */}

                                    {/* start--------- populate of array of value in dropdown  */}
                                    <div className="App">
                                        <h1 className="geeks">Geeks For Geeks</h1>
                                        <div className="container">
                                            <Select
                                                className="item"
                                                value={selectedOption}
                                                options={options}
                                                onChange={selectedOption => this.setState({ selectedOption })}
                                                defaultValue={options[1]}
                                            />
                                            <button onClick={this.handleAddOption}>Add Option</button>
                                        </div>
                                    </div>


                                </CardBody>
                            </Card>
                        </Col>
                    </Container >
                </div >




            </React.Fragment >
        );
    };
};

export default TestForm;
