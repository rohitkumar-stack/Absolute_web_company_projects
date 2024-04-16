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
import { CREATE_USER, GET_COUNTRY_BY_ID, GET_DEPARTMENT_BY_ID, GET_DESIGNATION_BY_ID, GET_HSN_CODE_BY_ID, GET_ITEM_CATEGORY, GET_ITEM_CATEGORY_BY_ID, GET_ITEM_MAKER_BY_ID, GET_ITEM_SUB_CATEGORY_BY_ID, GET_LEDGER_GROUP_BY_ID, GET_TERMS_CONDITIONS_BY_ID, GET_USER_BY_ID, UPDATE_COUNTRY, UPDATE_DEPARTMENT, UPDATE_DESIGNATION, UPDATE_HSN_CODE, UPDATE_ITEM_CATEGORY, UPDATE_ITEM_MAKE, UPDATE_ITEM_SUB_CATEGORY, UPDATE_LEDGER_GROUP, UPDATE_TERMS_CONDITIONS, UPDATE_USER } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";

class EditItemMake extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Item Make ", link: process.env.PUBLIC_URL + "/tabsItems" },
                { title: "Edit Item Make", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            status: "",
            itemcategory: []
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
        // Access the location object to get route parameters
        const { location } = this.props;
        const { pathname } = location;

        // Parse the pathname to get the id parameter
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        // this.setState({ id: id })
        this.GetHSNCOde(id);
    }




    // GET 
    async GetHSNCOde(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_ITEM_MAKER_BY_ID +
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
                                status: data.data.status,
                                inputMobileField: data.data.phone_no

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
            fetch(UPDATE_ITEM_MAKE + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    make_name: values.name,
                    contact_name: values.contactname,
                    address: values.address,
                    phone_no: this.state.inputMobileField,
                    note: values.note,
                    status: this.state.status,
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Item Make Updated Successfully !", {
                            type: "success",
                        });
                        this.setState({
                            isLoading: false
                        });
                    } else {
                        toast("Unable to Update Item Make", {
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
            toast("Unable to Update Item Make", {
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
                        <Breadcrumb title="Edit Item Make" breadcrumbItems={this.state.breadcrumbItems} />
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
                                                    Item Make Name
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.make_name}
                                                    name="name"
                                                    placeholder="Item Make Name"
                                                    type="text"
                                                    errorMessage="please Provide Item Make Name"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Contact Name
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.contact_name}
                                                    name="contactname"
                                                    placeholder="Contact Name"
                                                    type="text"
                                                    // errorMessage="please Provide Contact Name"
                                                    className="form-control"
                                                    // validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col>
                                            <Col md="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom007"
                                                    >
                                                        Mobile
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <Row>
                                                        <Col md="12">
                                                            <PhoneInput
                                                                name="mobile"
                                                                placeholder=""
                                                                // country={"in"}
                                                                enableSearch={true}
                                                                errorMessage=" Please provide a Number"
                                                                id="validationCustom007"
                                                                validate={{
                                                                    required: {
                                                                        value: true
                                                                    },
                                                                }}
                                                                value={this.state.getById.phone_no}
                                                                inputStyle={{ width: "100%" }}
                                                                style={{
                                                                    borderRadius: 50,
                                                                }}
                                                                inputProps={{
                                                                    name: 'mobile',
                                                                    required: true,

                                                                }}
                                                                onChange={(phone) => {

                                                                    this.setState({
                                                                        inputMobileField: phone,

                                                                    });
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
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
                                        <Row>

                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Address
                                                        {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.address}
                                                        name="address"
                                                        placeholder="Address"
                                                        type="textarea"
                                                        // errorMessage="please Provide Address"
                                                        className="form-control"
                                                        // validate={{ required: { value: true } }}
                                                        id="validationCustom02"
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Note
                                                        {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.note}
                                                        name="note"
                                                        placeholder="Note"
                                                        type="textarea"
                                                        // errorMessage="please Provide Item Note"
                                                        className="form-control"
                                                        // validate={{ required: { value: true } }}
                                                        id="validationCustom02"
                                                    />
                                                </div>
                                            </Col>

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

export default EditItemMake;
