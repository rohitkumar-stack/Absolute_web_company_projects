import React, { Component } from "react";

import { connect } from "react-redux";
import {
    Row,
    Col,
    Form,
    FormGroup,
    InputGroup,
    Input,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
} from "reactstrap";

import { Link } from "react-router-dom";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

//Import i18n
import { withNamespaces } from "react-i18next";

//Import Megamenu
import MegaMenu from "./MegaMenu";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";

//Import logo Images
import logosmdark from "../../assets/images/logo-sm-dark.png";
import logodark from "../../assets/images/logo-dark.png";
import logosmlight from "../../assets/images/small.png";
import logolight from "../../assets/images/bg.png";

//Import Social Profile Images
import github from "../../assets/images/brands/github.png";
import bitbucket from "../../assets/images/brands/bitbucket.png";
import dribbble from "../../assets/images/brands/dribbble.png";
import dropbox from "../../assets/images/brands/dropbox.png";
import mail_chimp from "../../assets/images/brands/mail_chimp.png";
import slack from "../../assets/images/brands/slack.png";
import { GET_LOGO, THEME_SETTING } from "../../globals";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,
            isSocialPf: false,
            Logo: "",
            faviconlogo: ""
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleRightbar = this.toggleRightbar.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
    }
    /**
     * Toggle sidebar
     */
    toggleMenu() {
        this.props.toggleMenuCallback();
    }

    /**
     * Toggles the sidebar
     */
    toggleRightbar() {
        this.props.toggleRightSidebar();
    }


    toggleFullscreen() {
        if (
            !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
            !document.webkitFullscreenElement
        ) {
            // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(
                    Element.ALLOW_KEYBOARD_INPUT
                );
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    componentDidMount() {
        this.GetThemesetting();
        //     const { location } = this.props;
        //     const { pathname } = location;

        //     // Parse the pathname to get the id parameter
        //     const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        //     this.setState({ id: id })
        // }
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
                                Logo: data.data[0].logo,
                                faviconlogo: data.data[0].favicon,
                            });
    
                            // Store faviconlogo in local storage
                            localStorage.setItem('faviconlogo', data.data[0].favicon);
                            localStorage.setItem('Logo', data.data[0].logo);
    
                            // this.setState({
                            //     isLoading: false,
                            // });
    
                            // IF SESSION GETS OUT IT WILL REDIRECT TO LOGIN
                            if (data == "An Exception occurred while trying to authenticate the User.") {
                                localStorage.clear();
                                this.props.history.push(process.env.PUBLIC_URL + "/login");
                            }
                        }
                    } else {
                        // Handle the case when result is not true
                    }
                });
            });
        } catch (error) {
            // Handle any errors that occur during the fetch or processing
        }
    }
    
    render() {
          // const ThemeData= localStorage.getItem('themeData');
        //   const faviconlogo = localStorage.getItem("faviconlogo");
        //   const Logo = localStorage.getItem("Logo");
          const themeSettings = JSON.parse(localStorage.getItem("themeSettings"));
      
        // const themeSettings = themeSettingsString ? JSON.parse(themeSettingsString) : {};
          console.log("themeSettings:========>", themeSettings?.logo);

        return (
            <React.Fragment>
                <header id="page-topbar">
                    <div className="navbar-header">
                        <div className="d-flex">

                            <div className="navbar-brand-box">
                                <Link to="#" className="logo logo-dark">
                                    <span className="logo-sm">
                                        <img src={themeSettings?.favicon} alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src={themeSettings?.logo} alt="" height="22" />
                                    </span>
                                </Link>

                                <Link to="#" className="logo logo-light">
                                    <span className="logo-sm">
                                        {/* <img src="" alt="Logo" height="22" /> */}
                                        <img src={themeSettings?.favicon} alt="" height="26" width="26" />
                                    </span>
                                    <span className="logo-lg">
                                        {/* <img src="" alt="Logo" height="20" /> */}
                                        <img src={themeSettings?.logo} alt="" height="47" />
                                    </span>
                                </Link>
                            </div>

                            <Button size="sm" color="none" type="button" onClick={this.toggleMenu} className="px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn">
                                <i className="ri-menu-2-line align-middle"></i>
                            </Button>

                            {/* <Form className="app-search d-none d-lg-block">
                                <div className="position-relative">
                                    <Input type="text" className="form-control" placeholder={this.props.t('Search')} />
                                    <span className="ri-search-line"></span>
                                </div>
                            </Form> */}

                            {/* <MegaMenu /> */}
                        </div>

                        <div className="d-flex">
                            <div className="dropdown d-inline-block d-lg-none ms-2">
                                <button type="button" onClick={() => { this.setState({ isSearch: !this.state.isSearch }); }} className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown">
                                    <i className="ri-search-line"></i>
                                </button>
                                <div className={this.state.isSearch === true ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show" : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"}
                                    aria-labelledby="page-header-search-dropdown">

                                    <Form className="p-3">
                                        <FormGroup className="m-0">
                                            <InputGroup>
                                                <Input type="text" className="form-control" placeholder={this.props.t('Search')} />
                                                <div className="input-group-append">
                                                    <Button color="primary" type="submit"><i className="ri-search-line"></i></Button>
                                                </div>
                                            </InputGroup>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </div>

                            {/* <LanguageDropdown /> */}

                            <div className="dropdown d-none d-lg-inline-block ms-1">
                                <Button color="none" type="button" className="header-item noti-icon waves-effect" onClick={this.toggleFullscreen}>
                                    <i className="ri-fullscreen-line"></i>
                                </Button>
                            </div>

                            <NotificationDropdown />

                            <ProfileMenu />

                            {/* <div className="dropdown d-inline-block">
                                <Button color="none" onClick={this.toggleRightbar} type="button" className="header-item noti-icon right-bar-toggle waves-effect">
                                    <i className="ri-settings-2-line"></i>
                                </Button>
                            </div> */}
                        </div>
                    </div>
                </header>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { layoutType } = state.Layout;
    return { layoutType };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(withNamespaces()(Header));
