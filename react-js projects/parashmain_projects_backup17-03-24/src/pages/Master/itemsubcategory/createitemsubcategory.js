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
import { CREATE_DEPARTMENT, CREATE_DESIGNATION, CREATE_ITEM_CATEGORY, CREATE_SUBITEM_CATEGORY, CREATE_TERMS_CONDITIONS, CREATE_USER, GET_ITEM_CATEGORY } from "../../../globals";
import CustomFileInputNew from "../../../components/Common/imagefunction";

class CreateItemSubCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Item Sub-Category", link: process.env.PUBLIC_URL + "/itemsubcategorylist" },
                { title: "Create Item Sub-Category", link: process.env.PUBLIC_URL + "/#" },
            ],
            selectedFiles: [],
            Img: "",
            status: "Active",
            inputMobileField: "",
            Night: "0",
            morning: "0",
            isAadharBase64URL: "",
            fileData: "",
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
        this.ItemCategory();
    }

    // GET 
    async ItemCategory() {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_ITEM_CATEGORY,
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
                                itemcategory: data.data,

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
                    sub_category_name: values.name,
                    sub_category_description: values.description,
                    status: this.state.status,
                });
                fetch(CREATE_SUBITEM_CATEGORY, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                    body: raw,
                }).then((response) => {
                    response.json().then((data) => {
                        if (data.result === true) {
                            toast("Item Sub-Category Created Successfully !", {
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
                            toast("Unable to Create Item Sub-Category", {
                                type: "error",
                            });
                        }
                    });
                });
            } catch (error) {
                toast("Unable to create Item Sub-Category", {
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
                        <Breadcrumb title="Add Item Sub-Category" breadcrumbItems={this.state.breadcrumbItems} />
                        <Card>
                            <CardBody>
                                <AvForm
                                    className="needs-validation"
                                    onValidSubmit={this.handleSubmit}
                                // onSubmit={this.submitStep1}
                                >
                                    <Row className="mt-2">
                                        {/* <Col md="3" className="d-inline">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Select Item Item Category
                                            </Label>
                                         
                                            <AvField
                                                name="ledger"
                                                type="select"
                                                id="validationCustom01"
                                                // value={this.state.selectedcountry}
                                                required
                                                errorMessage=" Please provide Sub-Category"
                                                // validate={{ required: { value: true } }}
                                                defaultValue={"language"}
                                                className="form-control"
                                            >
                                                <option value="">Select Item Category Name</option>
                                                {this.state.itemcategory.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.category_name}</option>

                                                    );
                                                })}
                                            </AvField>
                                            {this.state.error && (
                                                <div style={{ color: "red" }}>{this.state.error}</div>
                                            )}
                                        </Col> */}
                                        <Col lg="3">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Item Sub-Category Name
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                name="name"
                                                placeholder="Item Sub-Category Name"
                                                type="text"
                                                errorMessage="please Provide Item Sub-Category Name"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>
                                        <Col lg="4">
                                            <div className="mb-3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Item Sub-Category Description
                                                    {/* <span style={{ color: "#ff0000" }}>*</span> */}
                                                </Label>
                                                <AvField
                                                    name="description"
                                                    placeholder="Item Sub-Category Description"
                                                    type="textarea"
                                                    // errorMessage="please Provide Item Sub-Category Description"
                                                    className="form-control"
                                                    // validate={{ required: { value: true } }}
                                                    id="validationCustom02"
                                                />
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

                                    <Button color="primary" type="submit" >
                                        Create Item Sub-Category
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

export default CreateItemSubCategory;
