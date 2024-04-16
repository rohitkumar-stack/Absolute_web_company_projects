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
import { CREATE_USER, FIND_ALL_LEAVES_BY_ROLE_ID, GET_ALL_CUSTOMER_WO_PAGINATION, GET_ALL_ROLES_WITHOUT_ADMIN, GET_CONTACTPERSON_BY_ID, GET_COUNTRY_BY_ID, GET_DEPARTMENT_BY_ID, GET_DEPARTMENT_WO_PAGINATE, GET_DESIGNATION_BY_ID, GET_DESIGNATION_WO_ADMIN, GET_HSN_CODE_BY_ID, GET_INDUSTRIAL_TYPE_BY_ID, GET_ITEM_CATEGORY, GET_ITEM_CATEGORY_BY_ID, GET_ITEM_MAKER_BY_ID, GET_ITEM_SUB_CATEGORY_BY_ID, GET_LEAD_REFERENCE_BY_ID, GET_LEAVE_BY_ID, GET_LEAVE_ENTITLEMENT_BY_ID, GET_LEAVE_WO_PAGINATE, GET_LEDGER_GROUP_BY_ID, GET_SHIFT_BY_ID, GET_TERMS_CONDITIONS_BY_ID, GET_UNIT_BY_ID, GET_UNIT_MEASURE_BY_ID, GET_USER_BY_ID, GET_WAREHOUSE_BY_ID, UPDATE_CONTACTPERSON, UPDATE_COUNTRY, UPDATE_DEPARTMENT, UPDATE_DESIGNATION, UPDATE_HSN_CODE, UPDATE_INDUSTRIAL_TYPE, UPDATE_ITEM_CATEGORY, UPDATE_ITEM_MAKE, UPDATE_ITEM_SUB_CATEGORY, UPDATE_LEAD_REFERENCE, UPDATE_LEAVE, UPDATE_LEAVE_ENTITLEMENT, UPDATE_LEDGER_GROUP, UPDATE_SHIFT, UPDATE_TERMS_CONDITIONS, UPDATE_UNIT, UPDATE_UNIT_MEASURE, UPDATE_USER, UPDATE_WAREHOUSE } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";

class EditLeaveentitlement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Leave Entitlement", link: process.env.PUBLIC_URL + "/leavetabs" },
                { title: "Edit Leave Entitlement", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            status: "",
            AllLeaves: [],
            rolelist: [],
            selectedCounts: [],
            id: ""
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
        this.GetHSNCOde(id);
        // this.setState({ id: id })
        this.GetAllRoles();
        // this.GetAllLeaves();
    }

    // GET ALL LEAVES
    async GetAllLeaves(roleid) {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_LEAVE_WO_PAGINATE, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.GetPermissionById(roleid, data.data)
                        // this.setState({ AllLeaves: data.data });

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


    // // GET ALL LEAVES
    async GetPermissionById(roleid, allLeaves) {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(FIND_ALL_LEAVES_BY_ROLE_ID + roleid, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        let tempArr = data.data
                        let finalArr = []
                        console.log("ALL LEAVES ", allLeaves);
                        console.log("PARTICULAR LEAVES #########", tempArr);
                        // allLeaves?.map((allleave) => {
                        //     tempArr?.map((particularleave) => {
                        //         if (particularleave?.leave_id == allleave?.id) {
                        //             if (parseInt(particularleave?.total_leave) > 0) {
                        //                 console.log("PARTICULAR LEAVE", particularleave.total_leave);
                        //                 finalArr.push({ ...allleave, total_leave: particularleave?.total_leave, leaveentitlementID: particularleave?.id })
                        //             }
                        //             // else {
                        //             //     finalArr.push({ ...allleave, total_leave: "1", leaveentitlementID: "" })
                        //             // }

                        //         }

                        //     })
                        // })

                        allLeaves?.map((allleave) => {
                            let matchFound = false;

                            tempArr?.map((particularleave) => {
                                if (particularleave?.leave_id === allleave?.id) {
                                    if (parseInt(particularleave?.total_leave) > 0) {
                                        console.log("PARTICULAR LEAVE", particularleave.total_leave);
                                        finalArr.push({ ...allleave, total_leave: particularleave?.total_leave, leaveentitlementID: particularleave?.id });
                                        matchFound = true;
                                    }
                                }
                            });

                            // If no match was found, push the element from the first array to finalArr
                            if (!matchFound) {
                                finalArr.push({ ...allleave, total_leave: "0", leaveentitlementID: "" });
                            }
                        });

                        console.log("FINAL ARRAY", finalArr);
                        this.setState({ AllLeaves: finalArr });
                        this.setState({
                            isLoading: false,
                        });
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

    // GET ALL ROLES
    async GetAllRoles() {
        var Token = localStorage.getItem("userToken");
        try {
            fetch(GET_ALL_ROLES_WITHOUT_ADMIN, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.setState({ rolelist: data.data });
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
            id: id
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_LEAVE_ENTITLEMENT_BY_ID +
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
                            });
                            this.GetAllLeaves(data.data.role_id);
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

    handleSubmit(event, values) {
        // const selectedLeaves = Object.keys(this.state.selectedCounts).map((id) => ({
        //     leave_id_encode: id,
        //     total_leave: this.state.selectedCounts[id],
        //     id: this.state.selectedCounts[id].EntitlemenetID
        // }));
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_LEAVE_ENTITLEMENT, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_encode: this.state.AllLeaves.leaveentitlementID,
                    role_id_encode: values.selectedrole,
                    leaveCounts: this.state.selectedCounts
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Leave Entitlement Updated Successfully !", {
                            type: "success",
                        });
                        this.setState({
                            isLoading: false
                        });
                    } else {
                        toast("Unable to Update Leave Entitlement", {
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
            toast("Unable to Update Leave Entitlement", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }

    // handleCountChange = (id, count, entitlementID) => {
    //     // Update the selectedCounts state with the new count for the corresponding ID
    //     this.setState((prevState) => ({
    //         selectedCounts: {
    //             ...prevState.selectedCounts,
    //             [id]: count,
    //             EntitlemenetID: entitlementID
    //         },
    //     }));
    // };

    handleCountChange = (leave_id_encode, total_leave, id) => {
        // Find the index of the item in the array
        const itemIndex = this.state.selectedCounts.findIndex((item) => item.id === id);

        // If the item is not in the array, add it
        if (itemIndex === -1) {
            this.setState((prevState) => ({
                selectedCounts: [
                    ...prevState.selectedCounts,
                    { leave_id_encode, total_leave, id: id },
                ],
            }));
        } else {
            // If the item is already in the array, update its count
            this.setState((prevState) => {
                const updatedCounts = [...prevState.selectedCounts];
                updatedCounts[itemIndex] = { leave_id_encode, total_leave, id: id };
                return { selectedCounts: updatedCounts };
            });
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Edit Leave Entitlement" breadcrumbItems={this.state.breadcrumbItems} />
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
                                            <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Select Role
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.role_id}
                                                    required={true}
                                                    name="selectedrole"
                                                    type="select"
                                                    id="validationCustom04"
                                                    // value={this.state.selectedcountry}
                                                    errorMessage="Please Select a Role."
                                                    validate={{ required: { value: true } }}
                                                    className="form-control"
                                                >
                                                    <option value={""} >Select Role</option>
                                                    {this.state.rolelist.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.name}</option>

                                                        );
                                                    })}
                                                </AvField>
                                            </Col>

                                            {/* <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Select Leave
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.leave_id}
                                                    required={true}
                                                    name="selectedLeave"
                                                    type="select"
                                                    id="validationCustom04"
                                                    // value={this.state.selectedcountry}
                                                    errorMessage="Please Select a Leave."
                                                    validate={{ required: { value: true } }}
                                                    className="form-control"
                                                >
                                                    <option value={""} >Select Leave</option>
                                                    {this.state.AllLeaves.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.name}</option>

                                                        );
                                                    })}
                                                </AvField>
                                            </Col>

                                            <Col md="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    Select Count
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.total_leave}
                                                    min="0"
                                                    required={true}
                                                    name="selectedcount"
                                                    type="number"
                                                    id="validationCustom04"
                                                    // value={this.state.selectedcountry}
                                                    errorMessage="Please Select a Count."
                                                    validate={{ required: { value: true } }}
                                                    className="form-control"
                                                >
                                                </AvField>
                                            </Col> */}

                                        </Row>
                                        <Row>
                                            {this.state.AllLeaves?.map((item) => {
                                                return (<>
                                                    <Col md="2" className="d-inline">
                                                        <Label
                                                            className="form-label"
                                                        >
                                                            Entitlement count
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <h5
                                                            htmlFor={item.id}>
                                                            {item.name}
                                                        </h5>
                                                        <AvField
                                                            value={item.total_leave ? item.total_leave : ""}
                                                            name={`selectedcount-${item.id}`}
                                                            type="number"
                                                            id={item.id}
                                                            className="form-control"
                                                            onChange={(e) => this.handleCountChange(item.id, parseInt(e.target.value, 10), item.leaveentitlementID)}
                                                        >
                                                        </AvField>
                                                    </Col >
                                                </>
                                                )
                                            }
                                            )}
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

export default EditLeaveentitlement;
