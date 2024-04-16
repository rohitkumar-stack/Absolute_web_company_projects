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
import { CREATE_USER, GET_COUNTRY_BY_ID, GET_DEPARTMENT_BY_ID, GET_DESIGNATION_BY_ID, GET_HSN_CODE, GET_HSN_CODE_BY_ID, GET_ITEM_BY_ID, GET_ITEM_CATEGORY, GET_ITEM_CATEGORY_BY_ID, GET_ITEM_MAKER, GET_ITEM_MAKER_BY_ID, GET_ITEM_SUB_CATEGORY, GET_ITEM_SUB_CATEGORY_BY_ID, GET_LEDGER_GROUP_BY_ID, GET_TERMS_CONDITIONS_BY_ID, GET_UNIT_MEASURE, GET_USER_BY_ID, GET_WAREHOUSE, UPDATE_COUNTRY, UPDATE_DEPARTMENT, UPDATE_DESIGNATION, UPDATE_HSN_CODE, UPDATE_ITEM, UPDATE_ITEM_CATEGORY, UPDATE_ITEM_MAKE, UPDATE_ITEM_SUB_CATEGORY, UPDATE_LEDGER_GROUP, UPDATE_TERMS_CONDITIONS, UPDATE_USER } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";

class EditItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Item", link: process.env.PUBLIC_URL + "/tabsItems" },
                { title: "Edit Item ", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            status: "",
            itemcategory: [],
            itemsubcategory: [],
            makeidlist: [],
            makerlist: [],
            hsnlist: [],
            warehouselist: [],
            uomlist: []
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
        this.GetCategory();
        this.GetSubCategory();
        this.GetMakerName();
        this.GetHSNCODE();
        this.GetWAreHouse();
        this.GetAllOUM();
        // Access the location object to get route parameters
        const { location } = this.props;
        const { pathname } = location;

        // Parse the pathname to get the id parameter
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        // this.setState({ id: id })
        this.GetItembyId(id);
    }

    // GET ALL OUM
    async GetAllOUM() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_UNIT_MEASURE, {
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


    // GET ALL CATEGORY GROUP
    async GetCategory() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_ITEM_CATEGORY, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ itemcategory: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }
    // GET ALL SUB CATEGORY GROUP
    async GetSubCategory() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_ITEM_SUB_CATEGORY, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ itemsubcategory: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }


    // GET ALL MAKE ID GROUP
    async GetMakerName() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_ITEM_MAKER, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ makerlist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }

    // GET ALL WAREHOUSE GROUP
    async GetWAreHouse() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_WAREHOUSE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ warehouselist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }
    // GET ALL HSN CODE GROUP
    async GetHSNCODE() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_HSN_CODE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ hsnlist: data.data });
                    } else {

                    }
                });
            });
        } catch (error) {

        }
    }

    // GET 
    async GetItembyId(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_ITEM_BY_ID +
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
            fetch(UPDATE_ITEM + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    item_name: values.name,
                    item_description: values.description,
                    uom_id_encode: values.oum,
                    item_decimal: values.decimal,
                    conversion_factor: values.conversion,
                    catalogue_no: values.catno,
                    store_location: values.location,
                    mrp_or_rate: values.mrp,
                    cgst: values.cgst,
                    sgst: values.sgst,
                    igst: values.igst,
                    discountable: values.discountable,
                    max_purchase_qty: values.maxpurchaseqty,
                    min_purchase_qty: values.minpurchaseqty,
                    status: this.state.status,
                    category_id_encode: values.itemcategory, /* from item category master */
                    sub_category_id_encode: values.subcategory, /* from item subcategory master */
                    item_make_id_encode: values.itemmakeid, /* from item make master */
                    default_warehouse_id_encode: values.warehouse, /* from warehouse master */
                    hsncode_id_encode: values.hsncode /* from hsncode master */
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Item Updated Successfully !", {
                            type: "success",
                        });
                        this.setState({
                            isLoading: false
                        });
                    } else {
                        toast("Unable to Update Item", {
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
            toast("Unable to Update Item", {
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
                        <Breadcrumb title="Edit Item" breadcrumbItems={this.state.breadcrumbItems} />
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
                                                    Item Name
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.item_name}
                                                    name="name"
                                                    placeholder="Item Name"
                                                    type="text"
                                                    errorMessage="Please Provide Item Name"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col>
                                            <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Item Category
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                {/* <input
                                                            style={{ width: "200px" }}
                                                            type="date"
                                                            placeholder="Enter something..."
                                                        // Add other attributes as needed   
                                                        /> */}
                                                <AvField
                                                    // disabled={true}
                                                    value={this.state.getById.category_id_encode}
                                                    name="itemcategory"
                                                    type="select"
                                                    id="validationCustom01"
                                                    // value={this.state.selectedcountry}
                                                    required
                                                    errorMessage=" Please Select Item Category"
                                                    // validate={{ required: { value: true } }}

                                                    className="form-control"
                                                >
                                                    <option value={""}>Select Item Category</option>
                                                    {this.state.itemcategory.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.category_name}</option>

                                                        );
                                                    })}
                                                </AvField>
                                                {this.state.error && (
                                                    <div style={{ color: "red" }}>{this.state.error}</div>
                                                )}
                                            </Col>
                                            <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Item Sub-Category
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    // disabled={true}
                                                    value={this.state.getById.sub_category_id_encode}
                                                    name="subcategory"
                                                    type="select"
                                                    id="validationCustom02"
                                                    // value={this.state.selectedcountry}
                                                    required
                                                    errorMessage=" Please Select Item Sub-Category"
                                                    // validate={{ required: { value: true } }}

                                                    className="form-control"
                                                >
                                                    <option value={""}>Select Item Sub-Category</option>
                                                    {this.state.itemsubcategory.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.sub_category_name}</option>

                                                        );
                                                    })}
                                                </AvField>
                                                {this.state.error && (
                                                    <div style={{ color: "red" }}>{this.state.error}</div>
                                                )}
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom03"
                                                >
                                                    Item Decimal
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.item_decimal}
                                                    name="decimal"
                                                    placeholder="Item Decimal"
                                                    type="text"
                                                    errorMessage="Please Provide Item Decimal"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom03"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Conversion Factor
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.conversion_factor}
                                                    name="conversion"
                                                    placeholder="Conversion Factor"
                                                    type="text"
                                                    errorMessage="Please Provide Conversion Factor"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom04"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom05"
                                                >
                                                    Catalogue No.
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.catalogue_no}
                                                    name="catno"
                                                    placeholder="Catalogue No."
                                                    type="text"
                                                    errorMessage="Please Provide Catalogue No."
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom05"
                                                />
                                            </Col>

                                            <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom06"
                                                >
                                                    Item Make
                                                </Label>
                                                <AvField
                                                    // disabled={true}
                                                    value={this.state.getById.item_make_id_encode}
                                                    name="itemmakeid"
                                                    type="select"
                                                    id="validationCustom06"
                                                    // value={this.state.selectedcountry}
                                                    required
                                                    errorMessage=" Please Select Item Make "
                                                    // validate={{ required: { value: true } }}

                                                    className="form-control"
                                                >
                                                    <option value="">Select Make </option>
                                                    {this.state.makerlist.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.make_name}</option>

                                                        );
                                                    })}
                                                </AvField>
                                                {this.state.error && (
                                                    <div style={{ color: "red" }}>{this.state.error}</div>
                                                )}
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom07"
                                                >
                                                    Store Location
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.store_location}
                                                    name="location"
                                                    placeholder="Store Location"
                                                    type="text"
                                                    errorMessage="Please Provide Store Location"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom07"
                                                >
                                                    MRP ( in ₹ )
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.mrp_or_rate}
                                                    name="mrp"
                                                    placeholder="MRP ( in ₹ )"
                                                    type="text"
                                                    errorMessage="Please Provide MRP ( in ₹ )"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom08"
                                                >
                                                    CGST
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.cgst}
                                                    name="cgst"
                                                    placeholder="CGST"
                                                    type="text"
                                                    errorMessage="Please Provide CGST"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom08"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom09"
                                                >
                                                    SGST
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.sgst}
                                                    name="sgst"
                                                    placeholder="SGST"
                                                    type="text"
                                                    errorMessage="Please Provide SGST"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom09"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom10"
                                                >
                                                    IGST
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.igst}
                                                    name="igst"
                                                    placeholder="IGST"
                                                    type="text"
                                                    errorMessage="Please Provide IGST"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom10"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom11"
                                                >
                                                    Discountable
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.discountable}
                                                    name="discountable"
                                                    placeholder="Discountable"
                                                    type="text"
                                                    errorMessage="Please Provide Discountable"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom11"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom12"
                                                >
                                                    Max Purchase Quantity
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.max_purchase_qty}
                                                    name="maxpurchaseqty"
                                                    placeholder="Max Purchase Quantity"
                                                    type="number"
                                                    errorMessage="Please Provide Max Purchase Quantity"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom13"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom14"
                                                >
                                                    Min Purchase Quantity
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.min_purchase_qty}
                                                    name="minpurchaseqty"
                                                    placeholder="Min Purchase Quantity"
                                                    type="number"
                                                    errorMessage="Please Provide Min Purchase Quantity"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom14"
                                                />
                                            </Col>
                                            {/* <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    UOM
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.uom}
                                                    name="uom"
                                                    placeholder="UOM"
                                                    type="text"
                                                    errorMessage="Enter UOM"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom22"
                                                />
                                            </Col> */}
                                            <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom023"
                                                >
                                                    Select UOM
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                {/* <input
                                                            style={{ width: "200px" }}
                                                            type="date"
                                                            placeholder="Enter something..."
                                                        // Add other attributes as needed   
                                                        /> */}
                                                <AvField
                                                    name="oum"
                                                    type="select"
                                                    id="validationCustom023"
                                                    value={this.state.getById.uom_id}
                                                    required
                                                    errorMessage="Please Select UOM"
                                                    // validate={{ required: { value: true } }}

                                                    className="form-control"
                                                >
                                                    <option value="">Select UOM</option>
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
                                            <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom22"
                                                >
                                                    HSN Code
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    // disabled={true}
                                                    value={this.state.getById.hsn_code_id_encode}
                                                    name="hsncode"
                                                    type="select"
                                                    id="validationCustom15"
                                                    // value={this.state.selectedcountry}
                                                    required
                                                    errorMessage=" Please Select HSN Code"
                                                    // validate={{ required: { value: true } }}

                                                    className="form-control"
                                                >
                                                    <option value="">Select HSN Code</option>
                                                    {this.state.hsnlist.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.hsn_code}</option>

                                                        );
                                                    })}
                                                </AvField>
                                                {this.state.error && (
                                                    <div style={{ color: "red" }}>{this.state.error}</div>
                                                )}
                                            </Col>
                                            <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom26"
                                                >
                                                    Warehouse
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    // disabled={true}
                                                    value={this.state.getById.default_warehouse_id_encode}
                                                    name="warehouse"
                                                    type="select"
                                                    id="validationCustom26"
                                                    // value={this.state.selectedcountry}
                                                    required
                                                    errorMessage=" Please Select Item Sub-Category"
                                                    // validate={{ required: { value: true } }}

                                                    className="form-control"
                                                >
                                                    <option value="">Select Warehouse</option>
                                                    {this.state.warehouselist.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.warehouse_name}</option>

                                                        );
                                                    })}
                                                </AvField>
                                                {this.state.error && (
                                                    <div style={{ color: "red" }}>{this.state.error}</div>
                                                )}
                                            </Col>
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom16"
                                                    >
                                                        Description
                                                        {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.item_description}
                                                        name="description"
                                                        placeholder="Description"
                                                        type="textarea"
                                                        // errorMessage="Please Provide Item Description"
                                                        className="form-control"
                                                        // validate={{ required: { value: true } }}
                                                        id="validationCustom16"
                                                    />
                                                </div>
                                            </Col>
                                            {/* <Col md="4">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom17"
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

export default EditItem;
