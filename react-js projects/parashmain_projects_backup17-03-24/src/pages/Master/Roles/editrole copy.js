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
import { CREATE_COUNTRY, CREATE_STATE, CREATE_USER, GET_ALL_PERMISSIONS, GET_COUNTRY, GET_PERMISSIONS, GET_PERMISSIONS_BY_ID, GET_ROLE_BY_ID, GET_STATE_BY_ID, UPDATE_PERMISSION, UPDATE_ROLE, UPDATE_STATE } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";
import "../../../assets/custom.css"

class EditRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Roles", link: process.env.PUBLIC_URL + "/rolelist" },
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
            userpermission: []



        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
                                // profileimage: data.data.profile_image,
                                // firstname: data.data.first_name,
                                // middlename: data.data.middle_name,
                                // lastname: data.data.last_name,
                                // email: data.data.email,
                                // mobile: data.data.mobile_number,
                                // designation: data.data.designation,
                                // shiftdetails: data.data.shift_details,
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



    // // FETCH USER PERMISSIONS
    // async getUserPermissions() {
    //     this.setState({
    //         isLoading: true,
    //     });
    //     var Token = localStorage.getItem("userToken");
    //     try {
    //         fetch(
    //             // GET_PERMISSIONS,
    //             GET_ALL_PERMISSIONS,
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     Authorization: "Bearer " + Token,
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         ).then((response) => {
    //             response.json().then((data) => {
    //                 if (data.result === true) {
    //                     if (data.data) {
    //                         // let tempdata = data.data;
    //                         // this.setState({
    //                         //     userPermissions: data.data
    //                         // });
    //                         // var typearr = Array.from(new Set(tempdata.map(item => item.type)));
    //                         // let finalarr = {};
    //                         // typearr.forEach(item => {
    //                         //     let temp, tempobj = {};
    //                         //     temp = tempdata.filter(ele => ele.type == item);
    //                         //     tempobj[item] = temp
    //                         //     finalarr.push(tempobj)
    //                         // })
    //                         // console.log(finalarr);

    //                         // this.setState({
    //                         //     filteruserPermissions: finalarr,
    //                         //     isLoading: false,
    //                         // });
    //                         let tempdata = data.data;
    //                         this.setState({
    //                             userPermissions: data.data
    //                         });
    //                         var typearr = Array.from(new Set(tempdata.map(item => item.type)));
    //                         let finalarr = []; // Initialize as an array
    //                         typearr.forEach(item => {
    //                             let temp, tempobj = {};
    //                             temp = tempdata.filter(ele => ele.type === item);
    //                             tempobj[item] = temp;
    //                             finalarr.push(tempobj);
    //                         });
    //                         console.log(finalarr);

    //                         this.setState({
    //                             filteruserPermissions: finalarr,
    //                             isLoading: false,
    //                         });
    //                     }
    //                 } else {
    //                     this.setState({
    //                         isLoading: false,
    //                     });
    //                 }
    //             });
    //         });
    //     } catch (error) {

    //         this.setState({
    //             isLoading: false,
    //         });
    //     }
    // }



    handleAcceptedFiles = (files) => {
        this.getBase64Icon(files);
        files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),

            })
        );
        this.setState({ selectedFiles: files });
    };

    // CREATE USER API
    handleSubmit(event, values) {
        this.setState({
            isLoading: true,
        });
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


    // async updateUserPermission(item, value) {
    //     let found = false;
    //     this.state.userpermission?.find((data) => {
    //         if (data.permission_id === item.id) {
    //             found = true;
    //             return true;
    //         }
    //         // return false;
    //     });
    //     if (found === true) {
    //         console.log("FOUND ");
    //         var Token = localStorage.getItem("userToken");
    //         try {
    //             fetch(UPDATE_PERMISSION, {
    //                 method: "POST",
    //                 headers: {
    //                     Authorization: "Bearer " + Token,
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     id_encode: item.id,
    //                     role_id_encode: this.state.id,
    //                     permission_id_encode: item.id,
    //                     status: value ? "Active" : "InActive"
    //                 }),
    //             }).then((response) => {
    //                 response.json().then((data) => {
    //                     if (data.result === true) {

    //                         toast("Role Permission Updated Successfully !", {
    //                             type: "success",
    //                         });
    //                         this.getUserPermissions();
    //                     } else {
    //                         toast(data.message, {
    //                             type: "error",
    //                         });

    //                     }
    //                 });
    //             });
    //         } catch (error) {
    //             toast("Unable to Update Role Permission", {
    //                 type: "error",
    //             });


    //         }
    //         found = false;
    //     }
    //     else {
    //         console.log(" NOT FOUND ");
    //         var Token = localStorage.getItem("userToken");
    //         try {
    //             fetch(UPDATE_PERMISSION, {
    //                 method: "POST",
    //                 headers: {
    //                     Authorization: "Bearer " + Token,
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     // id_encode: item.id,
    //                     role_id_encode: this.state.id,
    //                     permission_id_encode: item.id,
    //                     status: value ? "Active" : "InActive"
    //                 }),
    //             }).then((response) => {
    //                 response.json().then((data) => {
    //                     if (data.result === true) {

    //                         toast("Role Permission created Successfully !", {
    //                             type: "success",
    //                         });
    //                         this.getUserPermissions();
    //                     } else {
    //                         toast(data.message, {
    //                             type: "error",
    //                         });

    //                     }
    //                 });
    //             });
    //         } catch (error) {
    //             toast("Unable to Create Role Permission", {
    //                 type: "error",
    //             });


    //         }

    //     }
    // }

    async updateUserPermission(item, value) {
        let found = false;

        // Check if the permission exists in userpermissions
        this.state.userpermission?.find((data) => {
            if (data.permission_id === item.update_id) {
                found = true;
                return true; // Stop the iteration once the permission is found
            }
            return false;
        });

        var Token = localStorage.getItem("userToken");
        try {
            if (found) {
                // Permission exists, update it
                await fetch(UPDATE_PERMISSION, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_encode: item.update_id,
                        role_id_encode: this.state.id,
                        permission_id_encode:item.update_id,
                        status: value ? "Active" : "Inactive", // Ensure correct status for updating
                    }),
                });
            } else {
                // Permission doesn't exist, create it
                await fetch(UPDATE_PERMISSION, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        role_id_encode: this.state.id,
                        permission_id_encode: item.update_id,
                        status: value ? "Active" : "Inactive",
                    }),
                });
            }

            // Common logic after updating or creating
            this.getUserPermissions();
            toast("Role Permission updated successfully!", {
                type: "success",
            });
        } catch (error) {
            toast("Unable to update/create Role Permission", {
                type: "error",
            });
        }
    }

    async updateUserPermission(item, value) {
        let found = false;
        // Check if the permission exists in userpermissions
        this.state.userpermission?.find((data) => {
            if (data.permission_id === item.id) {
                found = true;

                return true; // Stop the iteration once the permission is found
            }
            return false;
        });
        var Token = localStorage.getItem("userToken");
        try {
            if (found == true) {
                // Permission exists, update it
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
                });
                this.getUserPermissions();
            } else {
                // Permission doesn't exist, create it
                await fetch(UPDATE_PERMISSION, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        role_id_encode: this.state.id,
                        permission_id_encode: item.id,
                        status: value ? "Active" : "Inactive",
                    }),

                });
                found = false
            }

            // Common logic after updating or creating
            this.getUserPermissions();
            // toast("Role Permission updated successfully!", {
            //     type: "success",
            // });
        } catch (error) {
            toast("Unable to update/create Role Permission", {
                type: "error",
            });
        }
        this.setState({ userpermission: [] })
    }

    // FETCH USER PERMISSIONS
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
    async getAllUserPermissions(datapara) {
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
                    let temparr = data.data || [];
                    let finalarr = [];
                    var flag = false;
                    datapara.map((datamap) => {
                        flag = false;
                        temparr.map((item) => {
                            if (datamap.id === item.permission_id) {
                                finalarr.push({ ...item, type: datamap.type, update_id: datamap.id })
                                flag = true;
                            }
                            // else {
                            //     finalarr.push({ ...item })
                            // }

                        })

                        if (!flag) {
                            finalarr.push({ ...datamap, status: "InActive" })
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


    render() {
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
                                    <AvForm
                                        className="needs-validation"
                                        onValidSubmit={this.handleSubmit}
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
                                                />
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

                                    <div className="mt-4">
                                        <div
                                            className="mb-3 mt-5"><h4>PERMISSIONS</h4></div>
                                        <AvForm>
                                            <Row>
                                                {/* {this.state.userPermissions?.map((item, index) => {
                                                    return (
                                                        <Col lg="3">
                                                            <input
                                                                checked={item.status === "Active" ? true : false}
                                                                onChange={(val) => {
                                                                    item.status = val.target.checked === true ? "Active" : "InActive";
                                                                    this.updateUserPermission(item, val.target.checked)
                                                                }
                                                                }
                                                                className="form-check-input"
                                                                type="checkbox"

                                                                id="invalidCheck1"
                                                                required={true}
                                                            />
                                                            &nbsp;
                                                            <label
                                                                htmlFor="invalidCheck1">
                                                                {item.name.replace(/_/g, ' ').replace(/\bMaster\b/g, '')}.
                                                            </label>
                                                        </Col>

                                                    )
                                                })} */}


                                                {this.state.filteruserPermissions.map(permissionObj => (
                                                    <div key={Date.now()}>
                                                        {Object.keys(permissionObj).map(type => (
                                                            <Row className="borderbottom1"><Col lg="3" key={""}>
                                                                <h6 className=" mb-3 p-1 mt-4">{type.replace(/_/g, ' ').toUpperCase() + " " + "MASTER"}</h6>
                                                            </Col>
                                                                <Col lg="9" style={{ display: "flex", alignItems: "center" }}>
                                                                    {permissionObj[type].map(permission => (
                                                                        <Col lg="3" key={""}>
                                                                            {/* <li key={""}>  */}
                                                                            <input
                                                                                checked={permission.status === "Active" ? true : false}

                                                                                onChange={(val) => {
                                                                                    permission.status = val.target.checked === true ? "Active" : "InActive";
                                                                                    this.updateUserPermission(permission, val.target.checked)
                                                                                }
                                                                                }
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                id={permission.id}
                                                                                required={true}
                                                                            />
                                                                            &nbsp;
                                                                            <label
                                                                                htmlFor={permission.id}>
                                                                                {permission.name.replace(/_/g, ' ').replace(/\bMaster\b/g, '')}
                                                                            </label>
                                                                            {/* </li> */}
                                                                        </Col>
                                                                    ))}
                                                                </Col>
                                                            </Row>


                                                        ))}
                                                    </div>
                                                ))}
                                            </Row>
                                        </AvForm>
                                    </div>

                                </CardBody>
                            </Card>
                        )}
                    </Container>
                </div>
            </React.Fragment >
        );
    };
};

export default EditRole;
