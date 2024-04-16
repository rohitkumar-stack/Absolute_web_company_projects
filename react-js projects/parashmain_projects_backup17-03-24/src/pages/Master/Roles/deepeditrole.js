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
import { CREATE_COUNTRY, CREATE_STATE, CREATE_USER, GET_ALL_PERMISSIONS, GET_COUNTRY, GET_PERMISSIONS, GET_ROLE_BY_ID, GET_STATE_BY_ID, UPDATE_PERMISSION, UPDATE_ROLE, UPDATE_STATE } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";
import "../../../assets/custom.css"

class DeepTest extends Component {
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



        };

    };

    componentDidMount() {
        const { location } = this.props;
        const { pathname } = location;

        // Parse the pathname to get the id parameter
        this.getUserPermissions();
        // this.getAllUserPermissions();

    }
    // FETCH ALL USER ROLE  PERMISSIONS
    async getAllUserPermissions(datapara) {
        // this.setState({
        //     isLoading: true,
        // });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_PERMISSIONS,
                // GET_ALL_PERMISSIONS,
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
                            let temparr = data.data
                            let finalarr = []
                            temparr.map((item) => {
                                datapara.map((datamap) => {
                                    if (datamap.id === item.permission_id) {
                                        finalarr.push({ ...item, type: datamap.type })
                                    }
                                })
                            })
                           
                            // this.setState({ UserpermissionArray: data.data })
                        }
                    } else {
                        // this.setState({
                        //     isLoading: false,
                        // });
                    }
                });
            });
        } catch (error) {

            // this.setState({
            //     isLoading: false,
            // });
        }
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



    render() {

        return (
            <React.Fragment>

            </React.Fragment >
        );
    };
};

export default DeepTest;
