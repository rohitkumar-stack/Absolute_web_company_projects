import React, { Component } from 'react';

import { Row, Col, Input, Button, Container, Label } from "reactstrap";

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
import { checkLogin, apiError } from '../../store/actions';

// import images
import logodark from "../../assets/images/bg.png";
import logolight from "../../assets/images/bg.png";
import { GET_ALL_PERMISSIONS, GET_LOGO, GET_PERMISSIONS_BY_ID, GET_USER_BY_ID, LOGIN_URL, THEME_SETTING } from '../../globals';
import { toast } from "react-toastify";


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "", password: "",
            Logo: "",
            allpermissions: [],
            userpermission: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    // GET Images All Lists
    async GetThemesetting() {
        try {
            const response = await fetch(GET_LOGO, {
                method: "GET",
                headers: {
                    // Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            });
    
            const data = await response.json();
    
            if (data.result === true && data.data) {
                const loginscreenLogo = data.data[0].loginscreen_logo;
    
                // Save data in localStorage
                localStorage.setItem("Logo", loginscreenLogo);
    
                // Update state
                this.setState({
                    Logo: loginscreenLogo,
                    isLoading: false,
                });
            } else {
                // Handle the case where the result is not true or there is no data
            }
        } catch (error) {
            // Handle errors
            console.error("Error fetching data:", error);
        }
    }
    

    // GET USER Theme Setting 
    // async GetThemesetting1(Token, tenantid) {
    //     try {
    //         fetch(
    //             THEME_SETTING,
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
    //                         this.GetUserByID1(data.data[0].employee_leave_allow_afterdays, Token, tenantid)
    //                     }
    //                 } else {
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //     }
    // }

    async GetThemesetting1(Token, tenantid) {
        try {
            const response = await fetch(
                THEME_SETTING,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            );
    
            const data = await response.json();
    
            if (data.result === true && data.data) {
                // Store the data in local storage
                localStorage.setItem('themeSettings', JSON.stringify(data.data[0]));
    
                // Example: You can also call another function here or perform additional actions
                this.GetUserByID1(data.data[0].employee_leave_allow_afterdays, Token, tenantid);
            } else {
                // Handle the case when the result is not true or there is no data
            }
        } catch (error) {
            // Handle errors
        }
    }
    
    

    // GET USER
    async GetUserByID1(Days, Token, tenantid) {
        // let id = localStorage.getItem("tenant_id")
        this.setState({
            isLoading: true,
        });
        try {
            fetch(
                GET_USER_BY_ID +
                tenantid,
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
                            const endDate = new Date(data.data.end_dt);
                            const today = new Date();
                            const countedtotaldays = new Date(endDate.setDate(endDate.getDate() + parseInt(Days)));
                            if (countedtotaldays < today) {
                                // this.setState({ ShowLeaveModule: true });
                                localStorage.setItem("module", true)
                            } else if (data.data.end_dt === "" && data.data.employee_status === "2") {
                                // this.setState({ ShowLeaveModule: true });
                                localStorage.setItem("module", true)
                            } else {
                                // this.setState({ ShowLeaveModule: false });
                                localStorage.setItem("module", false)
                            }
                        }
                    }
                });
            });
        } catch (error) {
        }
    }


    handleSubmit(event, values) {
        try {
            fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: values.username,
                    password: values.password,
                }),
            })
                .then(response => {
                    if (!response.ok) {

                        toast("Login Failed! Please check your credentials", {
                            type: "error",
                        });
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(async data => {
                    await this.getUserPermissions(data.access_token, data.role_id, data.tenant_id);
                    // Handle successful login

                    let user = "";
                    let authUser = {
                        id: data.role_id,
                        username: user,
                        email: "",
                    };
                    localStorage.setItem("tenant_id", data.tenant_id);
                    localStorage.setItem("roleid", data.role_id);
                    localStorage.setItem("Employee_Status", data.employee_status);

                    await localStorage.setItem("authUser", JSON.stringify(authUser));
                    this.GetThemesetting1(data.access_token, data.tenant_id)

                })
                .catch(error => {

                    // Handle error
                    console.error('Error:', error.message);
                    // Additional error handling based on status code or other criteria
                    if (error.message.includes('401')) {
                        // Handle unauthorized (invalid credentials) error
                    } else {
                        // Handle other errors
                        // toast("Login Failed! Please check your credentials", {
                        //     type: "error",
                        // });
                    }
                });
        } catch (error) {
            // toast("Login Failed! Please check your credentials", {
            //     type: "error",
            // });

        }
    }

    // FETCH USER PERMISSIONS
    async getUserPermissions(Token, roleid, tenant_id) {
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
                response.json().then(async (data) => {
                    let returnVal
                    if (data.result === true) {
                        this.setState({ allpermissions: data.data })
                        // this.setState({ tempAll: data.data })
                        returnVal = await this.getAllUserPermissions(data.data, roleid, Token, tenant_id)
                    }
                });
            });
        } catch (error) {
        }
    }

    // FETCH ALL USER ROLE  PERMISSIONS
    async getAllUserPermissions(allpermissions, roleid, Token, tenant_id) {
        try {
            fetch(
                GET_PERMISSIONS_BY_ID + roleid,
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
                                finalarr.push({ ...userpermissions, type: allpermissions.type, update_id: allpermissions.id })
                                flag = true;
                            }
                        })

                        if (!flag) {
                            finalarr.push({ ...allpermissions, status: "Inactive", update_id: allpermissions.id })
                        }
                    })

                    localStorage.setItem("permissionarray", JSON.stringify(finalarr))
                    this.GetUserByID(Token, tenant_id);
                    return true;
                });
            });
        } catch (error) {
        }
    }


    async GetUserByID(token, ID) {
        try {
            fetch(
                GET_USER_BY_ID +
                ID,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                response.json().then(async (data) => {
                    if (data.result == true) {
                        if (data.data) {
                            localStorage.setItem('userImage', data?.data?.profile_image)
                            localStorage.setItem('employmentstatus', data?.data?.employee_status)
                            localStorage.setItem("userToken", token);
                            localStorage.setItem("tenantid", ID);


                            toast("Welcome Back !", {
                                type: "success",
                            });
                            this.props.history.push(process.env.PUBLIC_URL + "/dashboard");
                        }
                    } else {

                        this.setState({
                            isLoading: false,
                        });
                        // toast("Login Failed! Please check your credentials", {
                        //     type: "error",
                        // });
                    }
                });
            });
        } catch (error) {

            this.setState({
                isLoading: false,
            });
            // toast("Login Failed! Please check your credentials", {
            //     type: "error",
            // });
        }
    }

    componentDidMount() {
        this.GetThemesetting();
        this.props.apiError("");
        document.body.classList.add("auth-body-bg");
    }

    componentWillUnmount() {
        document.body.classList.remove("auth-body-bg");
    }

    render() {

        return (
            <React.Fragment>
                <div>
                    <Container fluid className="p-0">
                        <Row className="g-0">
                            <Col lg={4}>
                                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                    <div className="w-100">
                                        <Row className="justify-content-center">
                                            <Col lg={9}>
                                                <div>
                                                    <div className="text-center">
                                                        <div>
                                                            <Link to={process.env.PUBLIC_URL + "/login"} className="">
                                                                {/* <img src="" alt="Logo" height="20" class="auth-logo logo-dark mx-auto" /> */}
                                                                <img src={this.state.Logo} alt="" height="57" className="auth-logo logo-dark mx-auto" />
                                                                <img src={this.state.Logo} alt="" height="57" className="auth-logo logo-light mx-auto" />
                                                            </Link>
                                                        </div>

                                                        <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                                                        <p className="text-muted">Sign in to continue to Parasmani.</p>
                                                    </div>

                                                    {/* 
                                                    {this.props.loginError && this.props.loginError ? <Alert color="danger">{this.props.loginError}</Alert> : null} */}

                                                    <div className="p-2 mt-5">
                                                        <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} >

                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="username">Email</Label>
                                                                <AvField name="username" value={this.state.username ? this.state.username : ''} type="email" className="form-control" id="username" errorMessage="Please provide an email" validate={{ email: true, required: true }} placeholder="Enter username" />
                                                            </div>

                                                            {/* <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="userpassword">Password</Label>
                                                                <AvField name="password" value={this.state.password} type="password" className="form-control" validate={{ email: true, required: true }} id="userpassword" errorMessage="Please provide a password" placeholder="Enter password" />
                                                            </div> */}
                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="userpassword">Password</Label>
                                                                <AvField
                                                                    name="password"
                                                                    value={this.state.password ? this.state.password : ""}
                                                                    type="password"
                                                                    className="form-control"
                                                                    validate={{ required: { value: true, errorMessage: 'Please provide a password' } }}
                                                                    id="userpassword"
                                                                    placeholder="Enter password"
                                                                />
                                                            </div>

                                                            <div className="form-check">
                                                                <Input type="checkbox" className="form-check-input" id="customControlInline" />
                                                                <Label className="form-check-label" htmlFor="customControlInline">Remember me</Label>
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                <Button color="primary" className="w-md waves-effect waves-light" type="submit">Log In</Button>
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                <Link to={process.env.PUBLIC_URL + "/forgot-password"} className="text-muted"><i className="mdi mdi-lock me-1"></i> Forgot your password?</Link>
                                                            </div>
                                                        </AvForm>
                                                    </div>

                                                    {/* <div className="mt-5 text-center">
                                                        <p>Don't have an account ? <Link to={process.env.PUBLIC_URL + "/register"} className="fw-medium text-primary"> Register </Link> </p>
                                                    </div> */}
                                                </div>

                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={8}>
                                <div className="authentication-bg">
                                    <div className="bg-overlay"></div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment >
        );
    }
}

const mapStatetoProps = state => {
    const { loginError } = state.Login;
    return { loginError };
}

export default withRouter(connect(mapStatetoProps, { checkLogin, apiError })(Login));