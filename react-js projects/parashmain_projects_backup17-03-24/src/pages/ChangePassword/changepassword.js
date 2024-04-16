import React, { Component } from "react";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import { CHANGE_PASSWORD } from "../../globals";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Dashboard", link: process.env.PUBLIC_URL + "/dashboard" },
                { title: "Change Password", link: process.env.PUBLIC_URL + "/#" },
            ],
            changePsw: null,
        };
    }

    changePassword = async (data) => {
        var tenantid = await localStorage.getItem("tenant_id");
        var Token = localStorage.getItem("userToken");
        var userID = await localStorage.getItem("authUserID");


        await fetch(
            CHANGE_PASSWORD + tenantid,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify(data),
                body: JSON.stringify({
                    oldpassword: data.oldpassword,
                    newpassword: data.newpassword
                }),
            }
        )
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.result === true) {

                    toast("SuccessFully Changed Password", {
                        type: "success",
                    });
                } else {
                    toast(res.message, {
                        type: "warning",
                    });
                }
            })
            .catch((err) => {

            });
    };

    handleSubmit = (event, values) => {
        event.preventDefault();

        this.setState({ changePsw: values }, () => {
            this.changePassword(values);
        });
    };

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumb title="Change password" breadcrumbItems={this.state.breadcrumbItems} />
                        <Card>
                            <CardBody>
                                <AvForm className="needs-validation" onValidSubmit={this.handleSubmit}>
                                    <Row md="3">
                                        <div>
                                            <AvField
                                                name="oldpassword"
                                                label="Current Password"
                                                placeholder="Enter Current Password"
                                                type="password"
                                                errorMessage="Enter Current Password"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01"
                                            />
                                        </div>
                                    </Row>
                                    <Row md="3">
                                        <div>
                                            <AvField
                                                name="newpassword"
                                                label="New Password"
                                                placeholder="Enter New Password"
                                                type="password"
                                                errorMessage="Enter New Password"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="validationCustom01=2"
                                            />
                                        </div>
                                    </Row>
                                    <Row md="3">
                                        <div>
                                            <AvField
                                                name="confirm_password"
                                                label="Re-type Password"
                                                placeholder="Enter re-type Password"
                                                type="password"
                                                errorMessage="Enter re-type Password"
                                                className="form-control"
                                                validate={{
                                                    required: { value: true },
                                                    match: { value: 'newpassword', errorMessage: 'Passwords do not match' },
                                                }}
                                                id="validationCustom03"
                                            />
                                        </div>
                                    </Row>
                                    <div>
                                        <Button className="mt-3" color="primary" type="submit">
                                            Change
                                        </Button>
                                    </div>
                                </AvForm>
                            </CardBody>
                        </Card>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default ChangePassword;