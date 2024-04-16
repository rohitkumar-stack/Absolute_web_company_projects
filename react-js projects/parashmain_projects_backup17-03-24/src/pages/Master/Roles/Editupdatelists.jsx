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
import { GET_ROLE_BY_ID, UPDATE_ROLE } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";

class Editupdatelists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Role", link: process.env.PUBLIC_URL + "/roleslist" },
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
            selectedFiles: [],
            Img: "",
            status: "",
            inputMobileField: "",
            shiftdetails: "",
            senderList: [],
            selectedcountry: "",
            contactpersonlistData: [],
            customerlist: [],
            customerShow: false,
            contactShow: false,
              //leadUpadteComments
              GetRoleListsByIdData: {
                id: '',
                rolename: '',
                // ... other properties
            },


        };
        this.handleUpdateRoleLists = this.handleUpdateRoleLists.bind(this);
    };

    componentDidMount() {
          // Access the location object to get route parameters
          const { location } = this.props;
          // console.log(location, "========>location");
          const { pathname } = location;
          // console.log(pathname, "========>pathname")
  
          const { match } = this.props;
          const LeadCommentListsId = match.params.id;
  
          // Update the state with the value of ids
          this.setState({ LeadCommentListsId: match.params.id });
          // console.log(LeadCommentListsId, "===========>LeadCommentListsId")
  
          //update Activity With Value of the Ids
          const LeadActivityListsId = match.params.id;
          this.setState({ LeadActivityListsId: match.params.id });
          // console.log(LeadActivityListsId, "==>LeadActivityListsId")
       
          // Parse the pathname to get the id parameter
          const id = pathname.substring(pathname.lastIndexOf("/") + 1);

        this.GetRoleByIdData(id);

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

    // start--- UPDATE  INQUIRY API

      //GET INQUIRY DATA LISTS
      async GetRoleByIdData(id) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                GET_ROLE_BY_ID + id,
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
                                GetRoleListsByIdData: data.data,
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
    
    handleUpdateRoleLists(event, values) {
        // console.log(values, "=>values")
        console.log(this.state.GetRoleListsByIdData.id, "==>Id")
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_ROLE + this.state.GetRoleListsByIdData.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.rolename,
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        this.props.history.goBack();
                        toast("Role  Updated Successfully !", {
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
    //End--- UPDATE  INQUIRY API

    render() {
        // Parse the JSON string into a JavaScript object
        const permissionsString = localStorage.getItem("permissionarray");
        const permissions = JSON.parse(permissionsString);
        const filteredPermissions = permissions.filter(permission => permission.status === 'Active');
        const customerActive = filteredPermissions?.find(permission => permission.name === "Add Customers Master");

        //Api Value 
        const { customerlist, GetRoleListsByIdData} = this.state;
        //  console.log(GetRoleListsByIdData, "===>GetRoleListsByIdData");

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
                                        onValidSubmit={this.handleUpdateRoleLists}
                                    // onSubmit={this.submitStep1}
                                    >
                                        <Row md="12">
                                        <Col lg="4">
                                            <Label
                                                className="form-label"
                                                htmlFor="validationCustom01"
                                            >
                                                Role Name
                                                <span style={{ color: "#ff0000" }}>*</span>
                                            </Label>
                                            <AvField
                                               value={this.state.GetRoleListsByIdData.name}
                                                name="rolename"
                                                placeholder="Role Name"
                                                type="text"
                                                errorMessage="Please Provide Role Name"
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
                                </CardBody>
                            </Card>
                        )}
                    </Container>
                </div>
            </React.Fragment>
        );
    };
};

export default Editupdatelists;
