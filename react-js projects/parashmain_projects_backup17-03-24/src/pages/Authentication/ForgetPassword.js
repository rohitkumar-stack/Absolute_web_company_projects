
import React, { Component } from "react";
import { Row, Col, Alert, Button, Container, Label } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { forgetUser } from '../../store/actions';

// import images
import logodark from "../../assets/images/bg.png";
import { FORGOT_USING_LINK, GET_LOGO } from "../../globals";
import { toast } from "react-toastify";

class ForgetPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = { Logo: "" };

        // handleValidSubmit
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    componentDidMount() {
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
                                Logo: data.data[0].loginscreen_logo
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


    // handleValidSubmit
    handleValidSubmit(event, values) {
        try {
            var myHeaders = JSON.stringify({

                "Content-Type": "application/json",
            });
            var raw = JSON.stringify({
                email: values.useremail,
                link:
                    "https://" +
                    window.location.host +
                    process.env.PUBLIC_URL +
                    "/reset-password",
                // link: "https://absoluteweb.org/parasmanierp/reset-password"
            });
            fetch(FORGOT_USING_LINK, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: raw,
            })
                .then((response) => {
                    response.text().then((responseText) => {
                        try {
                            const jsonData = JSON.parse(responseText);
                            // Handle the JSON data
                            if (jsonData.result === true) {
                                toast("Recovery Mail Sent Successfully !", {
                                    type: "success",
                                });
                                // this.props.history.goBack();
                            } else {
                                toast("Unable to Send Recovery Mail", {
                                    type: "error",
                                });
                            }
                        } catch (error) {
                            console.error('Error parsing JSON:', error);
                            // Handle non-JSON response
                            toast("No User Found With Given E-Mail", {
                                type: "error",
                            });
                        }
                    });
                    // .then((response) => {
                    //     response.json().then((data) => {
                    //         if (data.result === true) {
                    //             toast("Recovery Mail Sent Successfully !", {
                    //                 type: "success",
                    //             });
                    //             this.props.history.goBack();
                    //         } else {
                    //             toast("Unable to Send Recovery Mail", {
                    //                 type: "error",
                    //             });
                    //         }
                    //     });
                });
        } catch (error) {
            toast("Unable to Send Mail", {
                type: "error",
            });

        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Container fluid className="p-0">
                        <Row className="g-0">
                            <Col lg={4}>
                                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100 auth-body-bg ">
                                    <div className="w-100">
                                        <Row className="justify-content-center">
                                            <Col lg={9}>
                                                <div>
                                                    <div className="text-center">
                                                        <div>
                                                            <Link to="/" className="logo"><img src={this.state.Logo} height="57" alt="logo" /></Link>
                                                            {/* <Link to="/" className="logo"><img src="" height="20" alt="logo" /></Link> */}
                                                        </div>

                                                        <h4 className="font-size-18 mt-4">Reset Password</h4>
                                                        <p className="text-muted">Reset your password to Parasmani.</p>
                                                    </div>

                                                    <div className="p-2 mt-5">
                                                        {this.props.forgetError && this.props.forgetError ?
                                                            <Alert color="danger" className="mb-4">{this.props.forgetError}</Alert> : null}
                                                        {
                                                            this.props.message ?
                                                                <Alert color="success" className="mb-4">{this.props.message}</Alert> : null
                                                        }
                                                        <AvForm className="form-horizontal" onValidSubmit={this.handleValidSubmit}>

                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-mail-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="useremail">Email</Label>
                                                                <AvField name="useremail" value={this.state.username} type="email" validate={{ email: true, required: true }} className="form-control" id="useremail" placeholder="Enter email" />
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                <Button color="primary" className="w-md waves-effect waves-light" type="submit">{this.props.loading ? "Loading..." : "Reset"}</Button>
                                                            </div>
                                                        </AvForm>
                                                    </div>

                                                    <div className="mt-5 text-center">
                                                        <p>Already have an account ? <Link to={process.env.PUBLIC_URL + "/login"} className="fw-medium text-primary"> Log in </Link> </p>

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
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { message, forgetError, loading } = state.Forget;
    return { message, forgetError, loading };
}

export default withRouter(
    connect(mapStatetoProps, { forgetUser })(ForgetPasswordPage)
);
