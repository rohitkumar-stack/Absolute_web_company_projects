import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, FormGroup, Modal, ModalHeader, ModalBody, } from "reactstrap";
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { GET_ALL_PERMISSIONS, GET_PERMISSIONS_BY_ID, GET_ROLE_BY_ID, UPDATE_PERMISSION, UPDATE_ROLE } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";
import "../../../assets/custom.css"

class EditRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Roles", link: process.env.PUBLIC_URL + "/roleslist" },
                { title: "Edit Role", link: process.env.PUBLIC_URL + "/#" },
            ],
            isLoading: false,
            selectedFiles: [],
            Img: "",
            status: "",
            inputMobileField: "",
            shiftdetails: "",
            senderList: [],
            selectedcountry: "",
            getById: {},
            userPermissions: [],
            filteruserPermissions: [],
            UserpermissionArray: [],
            id: "",
            allpermissions: [],
            userpermission: [],
            roleModel: false,

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        //RoleUpdate Model
        this.handelEditRoleModel = this.handelEditRoleModel.bind(this);
    };

    componentDidMount() {
        const { location } = this.props;
        const { pathname } = location;

        // Parse the pathname to get the id parameter
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        this.setState({ id: id })
        this.GetRolebyId(id);
        this.getUserPermissions();


    }

    // GET ROLE BY ID 
    async GetRolebyId(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_ROLE_BY_ID +
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
                                getById: data.data
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


    handleAcceptedFiles = (files) => {
        this.getBase64Icon(files);
        files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),

            })
        );
        this.setState({ selectedFiles: files });
    };

    // Update Role USER API
    handleSubmit(event, values) {
        this.setState({
            isLoading: true,
        });
        const { id } = this.state;
        console.log(id, "====>RoleId");
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_ROLE + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.role,
                    status: this.state.getById.status
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Role Updated Successfully !", {
                            type: "success",
                        });

                        //model Close
                        this.handelCloseRoleMode();
                        //get lists of data
                        this.GetRolebyId(id);

                        this.setState({
                            isLoading: false
                        });
                    } else {
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
            toast("Unable to Update Role", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }

    // Update USERRolePermission API
    async updateUserPermission(item, value) {
        console.log('item---', item, value)

        var Token = localStorage.getItem("userToken");
        if (item?.permission_id) {
            await fetch(UPDATE_PERMISSION, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_encode: item.id,
                    role_id_encode: this.state.id,
                    permission_id_encode: item.permission_id,
                    status: value ? "Active" : "Inactive", // Ensure correct status for updating
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    // console.log("RES=====CREATE USERDATA===========", res);
                    if (res.result == true) {
                        //   setIsLoading(false);
                        //   toast("SuccessFully Updated Profile", {
                        //     type: "success",
                        //   });
                        //   history.push(process.env.PUBLIC_URL + "/dashboard");
                        toast("Role Permission updated successfully!", {
                            type: "success",
                        });
                    } else {
                        //   setIsLoading(false);
                        toast(res.message, {
                            type: "warning",
                        });
                    }
                })

                .catch((err) => {
                    toast("Unable to update/create Role Permission", {
                        type: "err",
                    });
                });
        } else {

            await fetch(UPDATE_PERMISSION, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    permission_id_encode: item.id,
                    role_id_encode: this.state.id,
                    // permission_id_encode: item.permission_id,
                    status: value ? "Active" : "Inactive", // Ensure correct status for updating
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    // console.log("RES=====CREATE USERDATA===========", res);
                    if (res.result == true) {
                        //   setIsLoading(false);
                        //   toast("SuccessFully Updated Profile", {
                        //     type: "success",
                        //   });
                        //   history.push(process.env.PUBLIC_URL + "/dashboard");
                        toast("Role Permission created successfully!", {
                            type: "success",
                        });
                    } else {
                        //   setIsLoading(false);
                        toast(res.message, {
                            type: "warning",
                        });
                    }
                })

                .catch((err) => {
                    toast("Unable to update/create Role Permission", {
                        type: "err",
                    });
                });
        }

    };




    // Get USERRolePermission List Data
    async getUserPermissions() {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                // GET_PERMISSIONS,
                GET_ALL_PERMISSIONS,
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
                        this.setState({ allpermissions: data.data })
                        // this.setState({ tempAll: data.data })
                        this.getAllUserPermissions(data.data)
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

    // FETCH ALL USER ROLE  PERMISSIONS
    async getAllUserPermissions(allpermissions) {
        console.log('allpermition--', allpermissions)
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                // GET_PERMISSIONS,
                GET_PERMISSIONS_BY_ID + this.state.id,
                // GET_ALL_PERMISSIONS,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                response.json().then((data) => {
                    this.setState({ userpermission: data.data })
                    // if (data.result === true) {
                    //     if (data.data) {
                    let userpermission = data.data || [];
                    let finalarr = [];
                    var flag = false;
                    allpermissions.map((allpermissions) => {
                        flag = false;
                        userpermission.map((userpermissions) => {
                            if (allpermissions.id === userpermissions.permission_id) {
                                flag = false;
                                finalarr.push({ ...userpermissions, type: allpermissions.type, update_id: allpermissions.id, group_type: allpermissions.group_type })
                                flag = true;
                            }

                        })

                        if (!flag) {
                            finalarr.push({ ...allpermissions, status: "Inactive", update_id: allpermissions.id })
                        }
                    })

                    let tempdata = finalarr
                    this.setState({
                        userPermissions: data.data
                    });
                    var typearr = Array.from(new Set(tempdata.map(item => item.type)));
                    let finalarr1 = []; // Initialize as an array
                    typearr.forEach(item => {
                        let temp, tempobj = {};
                        temp = tempdata.filter(ele => ele.type === item);
                        tempobj[item] = temp;
                        finalarr1.push(tempobj);

                    });
                    this.setState({
                        filteruserPermissions: finalarr1,
                        isLoading: false,
                    });


                    // this.setState({ UserpermissionArray: data.data })
                    //     }
                    // } else {
                    //     this.setState({
                    //         isLoading: false,
                    //     });
                    // }
                });
            });
        } catch (error) {

            this.setState({
                isLoading: false,
            });
        }
    }

    //strat---------Role Model Update 
    handelEditRoleModel() {
        this.setState(prevState => ({
            roleModel: !prevState.roleModel
        }));
        // this.removeBodyCss();
    }

    //close RoleModel
    handelCloseRoleMode = () => {
        this.setState({
            roleModel: false,
        });
    }
    //End---------Role Model Update 

    render() {
        const { allpermissions } = this.state;
        //  console.log(allpermissions, "======>allpermissions")

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Edit Role" breadcrumbItems={this.state.breadcrumbItems} />
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
                                    {/* Start-----UserRole Feild input feild */}
                                    <AvForm
                                        className="needs-validation"
                                    // onValidSubmit={this.handleSubmit}
                                    // onSubmit={this.submitStep1}
                                    >
                                        <Row md="12">
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Role Name
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.name}
                                                    name="role"
                                                    placeholder="Role name"
                                                    type="text"
                                                    errorMessage="please Provide Role Name"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                    readOnly // Add readOnly attribute here
                                                />
                                            </Col>

                                            <Col lg={2} style={{ marginTop: "35px" }}>
                                                <Link to="#" className="me-3 text-primary mt"
                                                    onClick={this.handelEditRoleModel}
                                                >
                                                    <i className=" ri-edit-box-line font-size-18"></i>
                                                </Link>
                                            </Col>
                                        </Row>

                                        {/* <Button color="primary" type="submit" >
                                            Update
                                        </Button>

                                        <Button
                                            color="secondary"
                                            className="mx-2"
                                            onClick={() => this.props.history.goBack()}
                                        >
                                            Cancel
                                        </Button> */}

                                    </AvForm>
                                    {/* End-----UserRole Feild input feild */}

                                    <div className="mt-4">
                                        <div
                                            className="mb-3 mt-5"><h4>PERMISSIONS</h4></div>
                                        <AvForm>
                                            {/* Start--- master Filter of value */}
                                            <Row>
                                                {/* <h1>Test</h1> */}
                                                <div className="mb-3 mt-5"><h5>Master</h5></div>
                                                {this.state.filteruserPermissions
                                                    .filter(permissionObj => Object.keys(permissionObj).some(type => permissionObj[type][0]?.group_type === "masters"))
                                                    .map((permissionObj, index) => (
                                                        <div key={index}>
                                                            {Object.keys(permissionObj).map((type, innerIndex) => (
                                                                <div key={innerIndex}>
                                                                    <Row className="borderbottom1">
                                                                        <Col lg="3">
                                                                            <h6 className="mb-1 p-1 mt-1">{type.replace(/_/g, ' ').toUpperCase()}</h6>
                                                                        </Col>
                                                                        <Col lg="9">
                                                                            {Object.entries(permissionObj[type].reduce((acc, permission) => {
                                                                                if (!acc[permission.group_type]) {
                                                                                    acc[permission.group_type] = [];
                                                                                }
                                                                                acc[permission.group_type].push(permission);
                                                                                return acc;
                                                                            }, {})).map(([groupType, groupPermissions], groupIndex) => (
                                                                                <div key={groupIndex}>
                                                                                    {groupType === "masters" && (
                                                                                        <div>
                                                                                            <Row>

                                                                                                {/* <h6>{groupType}</h6> */}
                                                                                                {groupPermissions.map((permission, permissionIndex) => (
                                                                                                    <Col lg={4} className="mb-1 p-1 mt-1">
                                                                                                        <FormGroup key={permissionIndex}>
                                                                                                            <AvGroup check>
                                                                                                                <AvInput
                                                                                                                    type="checkbox"
                                                                                                                    name="reverse_check"
                                                                                                                    value={permission.status === "Active" ? true : false}
                                                                                                                    className="form-check-input"
                                                                                                                    onChange={(val) => {
                                                                                                                        permission.status = val.target.checked === true ? "Active" : "InActive";
                                                                                                                        this.updateUserPermission(permission, val.target.checked)
                                                                                                                    }}
                                                                                                                />
                                                                                                                <Label check for="checkbox">
                                                                                                                    {permission.name.replace(/_/g, ' ').replace(/\bMaster\b/g, '')}
                                                                                                                </Label>
                                                                                                            </AvGroup>
                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                                ))}
                                                                                            </Row>


                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}



                                            </Row>
                                            {/* End---- master Filter of value */}

                                            {/* Start--- marketing Management Filter of value */}
                                            <Row>
                                                {/* <h1>Test</h1> */}
                                                <div className="mb-3 mt-4"><h5>Marketing Management</h5></div>
                                                {this.state.filteruserPermissions
                                                    .filter(permissionObj => Object.keys(permissionObj).some(type => permissionObj[type][0]?.group_type === "marketing_management"))
                                                    .map((permissionObj, index) => (
                                                        <div key={index}>
                                                            {Object.keys(permissionObj).map((type, innerIndex) => (
                                                                <div key={innerIndex}>
                                                                    <Row className="borderbottom1">
                                                                        <Col lg="3">
                                                                            <h6 className="mb-1 p-1 mt-1">{type.replace(/_/g, ' ').toUpperCase()}</h6>
                                                                        </Col>
                                                                        <Col lg="9">
                                                                            {Object.entries(permissionObj[type].reduce((acc, permission) => {
                                                                                if (!acc[permission.group_type]) {
                                                                                    acc[permission.group_type] = [];
                                                                                }
                                                                                acc[permission.group_type].push(permission);
                                                                                return acc;
                                                                            }, {})).map(([groupType, groupPermissions], groupIndex) => (
                                                                                <div key={groupIndex}>
                                                                                    {groupType === "marketing_management" && (
                                                                                        <div>
                                                                                            <Row>

                                                                                                {/* <h6>{groupType}</h6> */}
                                                                                                {groupPermissions.map((permission, permissionIndex) => (
                                                                                                    <Col lg={4} className="mb-1 p-1 mt-1">
                                                                                                        <FormGroup key={permissionIndex}>
                                                                                                            <AvGroup check>
                                                                                                                <AvInput
                                                                                                                    type="checkbox"
                                                                                                                    name="reverse_check"
                                                                                                                    value={permission.status === "Active" ? true : false}
                                                                                                                    className="form-check-input"
                                                                                                                    onChange={(val) => {
                                                                                                                        permission.status = val.target.checked === true ? "Active" : "InActive";
                                                                                                                        this.updateUserPermission(permission, val.target.checked)
                                                                                                                    }}
                                                                                                                />
                                                                                                                <Label check for="checkbox">
                                                                                                                    {permission.name.replace(/_/g, ' ').replace(/\bMaster\b/g, '')}
                                                                                                                </Label>
                                                                                                            </AvGroup>
                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                                ))}
                                                                                            </Row>


                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}



                                            </Row>
                                            {/* End--- marketing Management Filter of value */}

                                            {/* Start--- Leave Management Filter of value */}
                                            <Row>
                                                {/* <h1>Test</h1> */}
                                                <div className="mb-3 mt-4"><h5>Leave management</h5></div>
                                                {this.state.filteruserPermissions
                                                    .filter(permissionObj => Object.keys(permissionObj).some(type => permissionObj[type][0]?.group_type === "leave_management"))
                                                    .map((permissionObj, index) => (
                                                        <div key={index}>
                                                            {Object.keys(permissionObj).map((type, innerIndex) => (
                                                                <div key={innerIndex}>
                                                                    <Row className="borderbottom1">
                                                                        <Col lg="3">
                                                                            <h6 className="mb-1 p-1 mt-1">{type.replace(/_/g, ' ').toUpperCase()}</h6>
                                                                        </Col>
                                                                        <Col lg="9">
                                                                            {Object.entries(permissionObj[type].reduce((acc, permission) => {
                                                                                if (!acc[permission.group_type]) {
                                                                                    acc[permission.group_type] = [];
                                                                                }
                                                                                acc[permission.group_type].push(permission);
                                                                                return acc;
                                                                            }, {})).map(([groupType, groupPermissions], groupIndex) => (
                                                                                <div key={groupIndex}>
                                                                                    {groupType === "leave_management" && (
                                                                                        <div>
                                                                                            <Row>

                                                                                                {/* <h6>{groupType}</h6> */}
                                                                                                {groupPermissions.map((permission, permissionIndex) => (
                                                                                                    <Col lg={4} className="mb-1 p-1 mt-1">
                                                                                                        <FormGroup key={permissionIndex}>
                                                                                                            <AvGroup check>
                                                                                                                <AvInput
                                                                                                                    type="checkbox"
                                                                                                                    name="reverse_check"
                                                                                                                    value={permission.status === "Active" ? true : false}
                                                                                                                    className="form-check-input"
                                                                                                                    onChange={(val) => {
                                                                                                                        permission.status = val.target.checked === true ? "Active" : "InActive";
                                                                                                                        this.updateUserPermission(permission, val.target.checked)
                                                                                                                    }}
                                                                                                                />
                                                                                                                <Label check for="checkbox">
                                                                                                                    {permission.name.replace(/_/g, ' ').replace(/\bMaster\b/g, '')}
                                                                                                                </Label>
                                                                                                            </AvGroup>
                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                                ))}
                                                                                            </Row>


                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}



                                            </Row>
                                            {/* End--- Leave Management Filter of value */}

                                            {/* Start--- Users Filter of value */}
                                            <Row>
                                                {/* <h1>Test</h1> */}
                                                <div className="mb-3 mt-4"><h5>Users</h5></div>
                                                {this.state.filteruserPermissions
                                                    .filter(permissionObj => Object.keys(permissionObj).some(type => permissionObj[type][0]?.group_type === "users"))
                                                    .map((permissionObj, index) => (
                                                        <div key={index}>
                                                            {Object.keys(permissionObj).map((type, innerIndex) => (
                                                                <div key={innerIndex}>
                                                                    <Row className="borderbottom1">
                                                                        <Col lg="3">
                                                                            <h6 className="mb-1 p-1 mt-1">{type.replace(/_/g, ' ').toUpperCase()}</h6>
                                                                        </Col>
                                                                        <Col lg="9">
                                                                            {Object.entries(permissionObj[type].reduce((acc, permission) => {
                                                                                if (!acc[permission.group_type]) {
                                                                                    acc[permission.group_type] = [];
                                                                                }
                                                                                acc[permission.group_type].push(permission);
                                                                                return acc;
                                                                            }, {})).map(([groupType, groupPermissions], groupIndex) => (
                                                                                <div key={groupIndex}>
                                                                                    {groupType === "users" && (
                                                                                        <div>
                                                                                            <Row>

                                                                                                {/* <h6>{groupType}</h6> */}
                                                                                                {groupPermissions.map((permission, permissionIndex) => (
                                                                                                    <Col lg={4} className="mb-1 p-1 mt-1">
                                                                                                        <FormGroup key={permissionIndex}>
                                                                                                            <AvGroup check>
                                                                                                                <AvInput
                                                                                                                    type="checkbox"
                                                                                                                    name="reverse_check"
                                                                                                                    value={permission.status === "Active" ? true : false}
                                                                                                                    className="form-check-input"
                                                                                                                    onChange={(val) => {
                                                                                                                        permission.status = val.target.checked === true ? "Active" : "InActive";
                                                                                                                        this.updateUserPermission(permission, val.target.checked)
                                                                                                                    }}
                                                                                                                />
                                                                                                                <Label check for="checkbox">
                                                                                                                    {permission.name.replace(/_/g, ' ').replace(/\bMaster\b/g, '')}
                                                                                                                </Label>
                                                                                                            </AvGroup>
                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                                ))}
                                                                                            </Row>


                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}



                                            </Row>
                                            {/* End---Users Filter of value */}

                                        </AvForm>
                                    </div>

                                </CardBody>
                            </Card>
                        )}
                    </Container>
                </div>


                {/* start-------RoleUpdate value Model  */}
                <Modal
                    size="lg"
                    isOpen={this.state.roleModel}
                    toggle={this.handelEditRoleModel}
                    centered={true}
                >
                    <ModalHeader toggle={() => this.setState({ roleModel: false })}>
                        Update Roles
                    </ModalHeader>
                    <ModalBody>
                        <Row >
                            {/* <Col md="11" style={{ textAlign: "right", marginBottom: "20px" }}> */}
                            <Col md="12">
                                <AvForm
                                    className="needs-validation"
                                    onValidSubmit={this.handleSubmit}
                                // onSubmit={this.submitStep1}
                                >
                                    <Row md="12">
                                        <Col lg="6">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Role Name
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                                value={this.state.getById.name}
                                                name="role"
                                                placeholder="Role name"
                                                type="text"
                                                errorMessage="please Provide Role Name"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </Col>
                                    </Row>

                                    <Button color="primary" type="submit" >
                                        Update
                                    </Button>

                                    <Button
                                        color="secondary"
                                        className="mx-2"
                                        onClick={() => this.setState({ roleModel: false })}
                                    >
                                        Cancel
                                    </Button>

                                </AvForm>
                            </Col>

                            {/* </Col> */}
                        </Row>

                    </ModalBody>

                </Modal>
                {/* End--------- RoleUpdate value Model */}
            </React.Fragment >
        );
    };
};

export default EditRole;
