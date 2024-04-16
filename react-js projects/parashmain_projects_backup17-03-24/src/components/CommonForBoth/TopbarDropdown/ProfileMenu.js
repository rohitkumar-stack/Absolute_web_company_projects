import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Image1 from "../../../assets/images/User1.png"
//i18n
import { withNamespaces } from "react-i18next";
import { withRouter } from 'react-router-dom';



// users
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import { LOGOUT } from '../../../globals';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
        };
        this.toggle = this.toggle.bind(this);
    }


    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }


    async Logout(e) {
        e.preventDefault();
        this.props.history.push(process.env.PUBLIC_URL + "/login");
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                LOGOUT,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + Token,
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                response.json().then((data) => {
                    if (response) {
                        toast("Logout Successfull", {
                            type: "success",
                        });
                        this.props.history.push(process.env.PUBLIC_URL + "/login");
                        localStorage.clear();
                        // this.props.history.push(process.env.PUBLIC_URL + "/login");
                    } else {
                        toast("Logout failed", {
                            type: "error",
                        });
                    }
                });
            });
        } catch (error) {
            toast("Logout failed", {
                type: "error",
            });
        }
    }


    render() {

        let username = "Admin";
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            const uNm = obj.email.split("@")[0];
            username = uNm.charAt(0).toUpperCase() + uNm.slice(1);
        }

        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block user-dropdown">
                    <DropdownToggle tag="button" className="btn header-item waves-effect" id="page-header-user-dropdown">
                        {/* <img className="rounded-circle header-profile-user me-1" src={avatar2} alt="Header Avatar" /> */}
                        <img key={Date.now()} className="rounded-circle header-profile-user me-1" src={localStorage.getItem('userImage') ? localStorage.getItem('userImage') : Image1} alt="" />
                        {/* <img key={Date.now()} className="rounded-circle header-profile-user me-1" src={localStorage.getItem('userImage') + "?" + Date.now()} alt="" /> */}
                        <span className="d-none d-xl-inline-block ms-1 text-transform">{username}</span>
                        <i className="mdi mdi-chevron-down d-none ms-1 d-xl-inline-block"></i>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                        <Link to={process.env.PUBLIC_URL + "/myprofile"}>
                            <DropdownItem>
                                <i className="ri-user-line align-middle me-1"></i> {this.props.t('My Profile')}
                            </DropdownItem>
                        </Link>
                        {/* <DropdownItem href="#"><i className="ri-wallet-2-line align-middle me-1"></i> {this.props.t('My Wallet')}</DropdownItem> */}
                        {/* <DropdownItem className="d-block" href="#"><span className="badge badge-success float-end mt-1">11</span><i className="ri-settings-2-line align-middle me-1"></i> {this.props.t('Settings')}</DropdownItem> */}
                        {/* <DropdownItem href="#"><i className="ri-lock-unlock-line align-middle me-1"></i> {this.props.t('Lock screen')}</DropdownItem> */}
                        <Link to={process.env.PUBLIC_URL + "/changepassword"}>
                        <DropdownItem>
                            <i className="ri-lock-unlock-line align-middle me-1"></i> {this.props.t('Change Password')}
                            </DropdownItem>
                            </Link>
                        <DropdownItem divider />
                        <DropdownItem className="text-danger" href={process.env.PUBLIC_URL + "/login"} onClick={(e) => this.Logout(e)}><i className="ri-shut-down-line align-middle me-1 text-danger"></i> {this.props.t('Logout')}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment >
        );
    }
}

export default withNamespaces()(withRouter(ProfileMenu));
