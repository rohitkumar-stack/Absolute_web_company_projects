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
import { CREATE_DEPARTMENT, CREATE_DESIGNATION, CREATE_ITEM, CREATE_ITEM_CATEGORY, CREATE_ITEM_MAKER, CREATE_SUBITEM_CATEGORY, CREATE_TERMS_CONDITIONS, CREATE_USER, GET_HSN_CODE, GET_ITEM_CATEGORY, GET_ITEM_MAKER, GET_ITEM_SUB_CATEGORY, GET_LEDGER_GROUP, GET_SHIFT, GET_UNIT_MEASURE, GET_WAREHOUSE } from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Item", link: process.env.PUBLIC_URL + "/tabsItems" },
                { title: "Create Item", link: process.env.PUBLIC_URL + "/#" },
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


    // CREATE USER API
    handleSubmit(event, values) {
        if (this.state.status == "") {
            toast("Please select status", {
                type: "error",
            });
        }
        else {
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
                    item_name: values.name,
                    item_description: values.description,
                    category_id_encode: values.itemcategory,
                    sub_category_id_encode: values.subcategory,
                    uom_id_encode: values.oum,
                    item_decimal: values.decimal,
                    conversion_factor: values.conversion,
                    catalogue_no: values.catno,
                    item_make_id_encode: values.itemmakeid,
                    default_warehouse_id_encode: values.warehouse,
                    store_location: values.location,
                    hsncode_id_encode: values.hsncode,
                    mrp_or_rate: values.mrp,
                    cgst: values.cgst,
                    sgst: values.sgst,
                    igst: values.igst,
                    discountable: values.discountable,
                    max_purchase_qty: values.maxpurchaseqty,
                    min_purchase_qty: values.minpurchaseqty,
                    status: this.state.status

                });
                fetch(CREATE_ITEM, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                    body: raw,
                }).then((response) => {
                    response.json().then((data) => {
                        if (data.result === true) {
                            toast("Item Created Successfully !", {
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
                            toast("Unable to Create Item ", {
                                type: "error",
                            });
                        }
                    });
                });
            } catch (error) {
                toast("Unable to create Item ", {
                    type: "error",
                });

            }
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
                        <Breadcrumb title="Add Item " breadcrumbItems={this.state.breadcrumbItems} />
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
                                                name="itemcategory"
                                                type="select"
                                                // id="validationCustom01"
                                                // value={this.state.selectedcountry}
                                                required
                                                errorMessage=" Please Select Item Category"
                                                validate={{ required: { value: true } }}

                                                className="form-control"
                                            >
                                                <option value={""}>{"Select Item Category"}</option>
                                                {this.state.itemcategory.map((item) => {
                                                    return <option value={item.id}>{item.category_name}</option>


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
                                                name="subcategory"
                                                type="select"
                                                id="validationCustom02"
                                                // value={this.state.selectedcountry}
                                                required
                                                errorMessage=" Please Select Item Sub-Category"
                                                // validate={{ required: { value: true } }}

                                                className="form-control"
                                            >
                                                <option value="">Select Item Sub-Category</option>
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
                                                name="itemmakeid"
                                                type="select"
                                                id="validationCustom06"
                                                // value={this.state.selectedcountry}
                                                required
                                                errorMessage=" Please Select Item Make"
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
                                                // value={this.state.selectedcountry}
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
                                                name="warehouse"
                                                type="select"
                                                id="validationCustom26"
                                                // value={this.state.selectedcountry}
                                                required
                                                errorMessage=" Please Select Warehouse"
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
                                        Create Item Make
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
                    </Container>
                </div>
            </React.Fragment>
        );
    };
};

export default CreateItem;
