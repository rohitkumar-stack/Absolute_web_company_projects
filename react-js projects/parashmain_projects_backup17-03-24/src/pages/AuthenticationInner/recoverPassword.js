import React, { Component } from "react";
import { Row, Col, Alert, Button, Container, Label, FormGroup } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link, useParams } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { forgetUser } from "../../store/actions";
import Logo from "../../assets/images/bg.png";
// import images
import logodark from "../../assets/images/logo-dark.png";

import { toast } from "react-toastify";
import { GET_LOGO, RESET_PASSWORD } from "../../globals";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            url: "",
            Logo: ""
        };

        // handleValidSubmit
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(this.props.location.search);
        const email = searchParams.get("email");
        // const token = searchParams.get("token");
        // const expiration = searchParams.get("expiration");

        const currentUrl = window.location.href;
        this.setState({ email: email, url: currentUrl });
        this.GetThemesetting();
    }

    // GET USER
    async GetThemesetting() {
        try {
            fetch(
                GET_LOGO,
                {
                    method: "GET",
                    headers: {
                        // Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {

                        if (data.data) {
                            this.setState({
                                Logo: data.data[0].logo

                            });
                            this.setState({
                                isLoading: false,
                            });
                        }
                    } else {


                    }
                });
            });
        } catch (error) {

        }
    }

    // SUBMIT
    handleValidSubmit(event, values) {
        if (values.password !== values.confirmpassword) {
            toast("Both the password must be same", {
                type: "error",
            });
            return false;
        }
        try {
            fetch(RESET_PASSWORD, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password_link: "?" + this.state.url.split("?")[1],
                    newpassword: values.password,
                    confirmnewpassword: values.confirmpassword,
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Password changed successfully ! Please login to continue", {
                            type: "success",
                        });
                        this.props.history.push(process.env.PUBLIC_URL + "/login");
                    } else {
                        toast("Unable to change the password ! Link has expired", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {

        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Container fluid className="p-0">
                        <Row className="g-0">
                            <Col lg={4}>
                                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100 auth-body-bg">
                                    <div className="w-100">
                                        <Row className="justify-content-center">
                                            <Col lg={9}>
                                                <div>
                                                    <div className="text-center">
                                                        <div>
                                                            <Link to={process.env.PUBLIC_URL + "/dashboard"} className="logo">
                                                                <img
                                                                    src={this.state.Logo}
                                                                    alt=""
                                                                    height="60"
                                                                    className="auth-logo logo-dark mx-auto"
                                                                />
                                                            </Link>
                                                        </div>

                                                        <h4 className="font-size-18 mt-4">
                                                            Reset Password
                                                        </h4>
                                                        <p className="text-muted">
                                                            Enter Your Registered Email
                                                        </p>
                                                    </div>

                                                    <div className="p-2 mt-5">
                                                        {this.props.forgetError &&
                                                            this.props.forgetError ? (
                                                            <Alert color="danger" className="mb-4">
                                                                {this.props.forgetError}
                                                            </Alert>
                                                        ) : null}
                                                        {this.props.message ? (
                                                            <Alert color="success" className="mb-4">
                                                                {this.props.message}
                                                            </Alert>
                                                        ) : null}
                                                        <AvForm
                                                            className="form-horizontal"
                                                            onValidSubmit={this.handleValidSubmit}
                                                        >
                                                            {/* <FormGroup className="auth-form-group-custom mb-4">
                                                                <i className="ri-mail-line auti-custom-input-icon"></i>
                                                                <Label for="username">Email</Label>
                                                                <AvField name="email" type="email" className="form-control" id="username" placeholder="Enter email" />
                                                            </FormGroup> */}
                                                            <div className="auth-form-group-custom mb-4">

                                                                <i className="ri-lock-password-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="useremail">New Password</Label>
                                                                <AvField
                                                                    name="password"
                                                                    type="password"
                                                                    validate={{ required: true }}
                                                                    className="form-control"
                                                                    id="password"
                                                                    placeholder="Enter New Password"
                                                                />
                                                            </div>
                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-lock-password-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="useremail">
                                                                    Confirm Password
                                                                </Label>
                                                                <AvField
                                                                    name="confirmpassword"
                                                                    type="password"
                                                                    validate={{ required: true }}
                                                                    className="form-control"
                                                                    id="confirmpassword"
                                                                    placeholder="Enter Confirm Password"
                                                                />
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                <Button
                                                                    color="primary"
                                                                    className="w-md waves-effect waves-light"
                                                                    type="submit"
                                                                >
                                                                    {this.props.loading
                                                                        ? "Loading..."
                                                                        : "Change Password"}
                                                                </Button>
                                                            </div>
                                                        </AvForm>
                                                    </div>
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

const mapStatetoProps = (state) => {
    const { message, forgetError, loading } = state.Forget;
    return { message, forgetError, loading };
};

export default withRouter(
    connect(mapStatetoProps, { forgetUser })(ResetPassword)
);
