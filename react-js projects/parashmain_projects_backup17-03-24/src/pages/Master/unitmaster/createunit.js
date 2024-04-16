import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_DEPARTMENT, CREATE_DESIGNATION, CREATE_ITEM_CATEGORY, CREATE_ITEM_MAKER, CREATE_SHIFT, CREATE_SUBITEM_CATEGORY, CREATE_TERMS_CONDITIONS, CREATE_UNIT, CREATE_USER, GET_ITEM_CATEGORY, GET_UNIT_MEASURE_WO_PAGINATE } from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class CreateUnit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Unit", link: process.env.PUBLIC_URL + "/unitTabs" },
                { title: "Create Unit", link: process.env.PUBLIC_URL + "/#" },
            ],
            selectedFiles: [],
            Img: "",
            status: "Active",
            inputMobileField: "",
            Night: "0",
            morning: "0",
            isAadharBase64URL: "",
            fileData: "",
            itemcategory: [],
            uomlist: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.GetAllUOMTYPE();
    }

    // GET ALL UOM
    async GetAllUOMTYPE() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_UNIT_MEASURE_WO_PAGINATE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ uomlist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }


    handleAcceptedFiles = (files) => {
        this.getBase64Icon(files);

        files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),

            })
        );
        this.setState({ selectedFiles: files });
    };

    async getBase64Icon(files) {
        const file = files[0];
        if (file) {

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const base64Data = reader.result;
                let base64Split = base64Data.split(",");
                const Img = base64Split[1];
                this.setState({ Img: Img });
            };

            reader.onerror = (error) => {
                console.error("Error occurred while reading the file:", error);
            };
        }
    }


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
                unit_name: values.name,
                unit_decimal: values.number,
                unit_measure_type_id_encode: values.uom,
                conversion_type: values.conversiontype,
                status: this.state.status
            });
            fetch(CREATE_UNIT, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: raw,
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Unit Created Successfully !", {
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
                        toast("Unable to Create Unit", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to create Unit", {
                type: "error",
            });

        }

    }

    // Callback function to handle file data
    handleFileDataChange = (file) => {
        this.setState({ fileData: file });
    };

    handleAadharBase64DataChange = (base64) => {
        this.setState({ isAadharBase64URL: base64 });
    };


    render() {
        const { isAadharBase64URL, fileData } = this.state;
        const { isView } = this.props;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Add Unit" breadcrumbItems={this.state.breadcrumbItems} />
                        <Card>
                            <CardBody>
                                <AvForm
                                    className="needs-validation"
                                    onValidSubmit={this.handleSubmit}
                                // onSubmit={this.submitStep1}
                                >
                                    <Row className="mt-2">
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Unit Name
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="name"
                                                placeholder="Unit Name"
                                                type="text"
                                                errorMessage="Please Provide Unit Name"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom02"
                                            >
                                                Unit Number
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="number"
                                                placeholder="Unit Number"
                                                type="number"
                                                errorMessage="Please Provide Unit Number"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom02"
                                            />
                                        </Col>
                                        <Col md="3" className="d-inline">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Unit Of Measure
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            {/* <input
                                                            style={{ width: "200px" }}
                                                            type="date"
                                                            placeholder="Enter something..."
                                                        // Add other attributes as needed   
                                                        /> */}
                                            <AvField
                                                name="uom"
                                                type="select"
                                                id="validationCustom01"
                                                // value={this.state.getById.ledger_group_type_id}
                                                required
                                                errorMessage=" Please Select Unit Of Measure."
                                                // validate={{ required: { value: true } }}

                                                className="form-control"
                                            >
                                                <option value="">Select Unit Of Measure</option>
                                                {this.state.uomlist.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.name}</option>

                                                    );
                                                })}
                                            </AvField>
                                            {this.state.error && (
                                                <div style={{ color: "red" }}>{this.state.error}</div>
                                            )}
                                        </Col>
                                        {/* <Col md="4">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Status
                                                </Label>
                                                <br></br>
                                                <input
                                                    checked={this.state.status == "Active" ? true : false}
                                                    // checked={
                                                    //     this.state.isWhatsapp === "1" ? true : false
                                                    // }
                                                    onChange={(val) =>
                                                        this.setState({
                                                            status: val.target.checked ? "Active" : "",
                                                        })
                                                    }
                                                    className="form-check-input"
                                                    type="checkbox"

                                                    id="invalidCheck3"
                                                    required={true}
                                                />
                                                <label
                                                    className="form-check-label px-2"
                                                    htmlFor="invalidCheck3"
                                                >
                                                    Active
                                                </label>
                                                <div className="invalid-feedback">
                                                    Select Active
                                                </div>
                                            </div>
                                        </Col> */}
                                    </Row>
                                    <Button color="primary" type="submit" >
                                        Create Unit
                                    </Button>

                                    <Button
                                        color="secondary"
                                        className="mx-2"
                                        onClick={() => this.props.history.goBack('/unitTabs')}
                                    >
                                        Cancel
                                    </Button>
                                </AvForm>
                            </CardBody>
                        </Card>
                    </Container>
                </div>
            </React.Fragment>
        );
    };
};

export default CreateUnit;
