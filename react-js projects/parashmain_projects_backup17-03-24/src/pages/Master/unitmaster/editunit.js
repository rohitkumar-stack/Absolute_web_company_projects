import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, FormGroup } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { CREATE_USER, GET_COUNTRY_BY_ID, GET_DEPARTMENT_BY_ID, GET_DESIGNATION_BY_ID, GET_HSN_CODE_BY_ID, GET_ITEM_CATEGORY, GET_ITEM_CATEGORY_BY_ID, GET_ITEM_MAKER_BY_ID, GET_ITEM_SUB_CATEGORY_BY_ID, GET_LEDGER_GROUP_BY_ID, GET_SHIFT_BY_ID, GET_TERMS_CONDITIONS_BY_ID, GET_UNIT_BY_ID, GET_UNIT_MEASURE_WO_PAGINATE, GET_USER_BY_ID, UPDATE_COUNTRY, UPDATE_DEPARTMENT, UPDATE_DESIGNATION, UPDATE_HSN_CODE, UPDATE_ITEM_CATEGORY, UPDATE_ITEM_MAKE, UPDATE_ITEM_SUB_CATEGORY, UPDATE_LEDGER_GROUP, UPDATE_SHIFT, UPDATE_TERMS_CONDITIONS, UPDATE_UNIT, UPDATE_USER } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";

class EditUnit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Unit", link: process.env.PUBLIC_URL + "/unitTabs" },
                { title: "Edit Unit", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            status: "",
            itemcategory: [],
            uomlist: [],
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

    componentDidMount() {
        this.GetAllUOMTYPE();
        // Access the location object to get route parameters
        const { location } = this.props;
        const { pathname } = location;

        // Parse the pathname to get the id parameter
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        // this.setState({ id: id })
        this.GetHSNCOde(id);
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



    // GET 
    async GetHSNCOde(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_UNIT_BY_ID +
                id,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        if (data.data) {
                            this.setState({
                                getById: data.data,
                                status: data.data.status
                            });
                            this.setState({
                                isLoading: false,
                            });
                        }
                    } else {

                        this.setState({
                            isLoading: false,
                        });
                    }
                });
            });
        } catch (error) {
            this.setState({
                isLoading: false,
            });

            this.setState({
                isLoading: false,
            });
        }
    }

    // CREATE USER API
    handleSubmit(event, values) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_UNIT + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    unit_name: values.name,
                    unit_decimal: values.number,
                    unit_measure_type_id_encode: values.uom,
                    conversion_type: values.conversiontype,
                    status: this.state.status
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Unit Updated Successfully !", {
                            type: "success",
                        });
                        this.setState({
                            isLoading: false
                        });
                    } else {
                        toast("Unable to Update Unit", {
                            type: "error",
                        });
                        toast(data.message, {
                            type: "error",
                        });
                        this.setState({
                            isLoading: false,
                        });
                    }
                });
            });
        } catch (error) {
            toast("Unable to Update Unit", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Edit Unit" breadcrumbItems={this.state.breadcrumbItems} />
                        {this.state.isLoading ? (
                            <>
                                <ThreeDots
                                    height="80"
                                    width="80"
                                    radius="9"
                                    color="#4D5DC6"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{
                                        justifyContent: "center",
                                    }}
                                    wrapperClassName=""
                                    visible={true}
                                />
                            </>
                        ) : (
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
                                                    value={this.state.getById.unit_name}
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
                                                    value={this.state.getById.unit_decimal}
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
                                                    value={this.state.getById.unit_measure_type_id_encode}
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
                                            Update
                                        </Button>

                                        <Button
                                            color="secondary"
                                            className="mx-2"
                                            onClick={() => this.props.history.goBack()}
                                        >
                                            Cancel
                                        </Button>
                                    </AvForm>
                                </CardBody>
                            </Card>
                        )}
                    </Container>
                </div>
            </React.Fragment>
        );
    };
};

export default EditUnit;
