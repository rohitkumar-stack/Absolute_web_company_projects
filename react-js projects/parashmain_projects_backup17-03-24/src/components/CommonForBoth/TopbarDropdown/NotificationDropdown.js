import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";

//i18b
import { withNamespaces } from "react-i18next";

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_BY_USER_ID, UPDATE_NOTIFICATION_BY_ID } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";



class NotificationDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            AllNotifications: [],
            isLoading: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    componentDidMount() {
        // this.Notifications();
    }

    // GET ALL LEAVES
    // async Notifications() {
    //     var Token = localStorage.getItem("userToken");
    //     var ID = localStorage.getItem("tenant_id");
    //     try {
    //         fetch(GET_NOTIFICATIONS +
    //             ID, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: "Bearer " + Token,
    //                 "Content-Type": "application/json",
    //             },
    //         })
    //             .then((response) => {
    //                 response.json().then((data) => {
    //                     if (data.result === true) {
    //                         this.setState({ AllNotifications: data.data });
    //                     }
    //                 });
    //             });
    //     } catch (error) {
    //     }
    // }
    async Notifications() {
        var Token = localStorage.getItem("userToken");
        var ID = localStorage.getItem("tenant_id");
        this.setState({
            isLoading: true,
        });
        try {
            fetch(GET_NOTIFICATIONS_BY_USER_ID +
                ID, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    
                    if(response.redirected == true){
                        this.props.history.push(process.env.PUBLIC_URL + "/login");
                    }else{
                        response.json().then((data) => {
                            this.setState({
                                isLoading: false,
                            });
                            if (data.result === true) {
                                this.setState({ AllNotifications: data.data });
                            }
                        });
                    }
                });
        } catch (error) {
        }
    }

    async UpdateNotificationById(data) {
        var Token = localStorage.getItem("userToken");
        await fetch(
            UPDATE_NOTIFICATION_BY_ID + data?.id,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_seen: data?.is_Seen }),
            }
        )
            .then((res) => {
                if (res.result == true) {
                    this.Notifications();
                    //   console.log("RES=====Update USERDATA===========", res);
                    //   toast("SuccessFully Updated Notification", {
                    //     type: "success",
                    //   });
                    //   history.push(process.env.PUBLIC_URL + "/dashboard");
                } else {
                    // toast("Please try again", {
                    //     type: "warning",
                    //   });
                }
            })
            .catch((err) => {
                // console.log(err);
            });
    };

    getTimeAgo(created_at) {
        const currentTime = new Date();
        const createdAt = new Date(created_at);

        const timeDifference = currentTime - createdAt;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            const remainingMinutes = minutes % 60;
            if (remainingMinutes > 0) {
                return `${hours}h ${remainingMinutes}mins ago`;
            } else {
                return `${hours}h ago`;
            }
        } else if (minutes > 0) {
            return `${minutes}mins ago`;
        } else {
            return `${seconds}secs ago`;
        }
    }


    async Checknotification(item) {
        if (item.type === "LeadCreate") {
            this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
        if (item.type === "LeadUpdate") {
            this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
        if (item.type === "LeadLogCreate") {
            this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
        else if (item.type === "LeadLogUpdate") {
            this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
        else if (item.type === "LeadCommentsCreate") {
            this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
        else if (item.type === "LeadCommentsUpdate") {
            this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
        else if (item.type === "LeadActivityCreate") {
            this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
        else if (item.type === "LeadActivityUpdate") {
            this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
        else if (item.type === "LeaveCreate") {
            this.props.history.push(process.env.PUBLIC_URL + "/employeeleaves");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
        else if (item.type === "LeaveUpdate") {
            this.props.history.push(process.env.PUBLIC_URL + "/employeeleaves");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
        else if (item.type === "ProbationEnd") {
            this.props.history.push(process.env.PUBLIC_URL + "/users");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
        // New added type
        else if (item.type === "HRLeave") {
            this.props.history.push(process.env.PUBLIC_URL + "/employeeleaves");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
        else if (item.type === "AllLeaves") {
            this.props.history.push(process.env.PUBLIC_URL + "/employeeleavelist");
            this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block">
                    <DropdownToggle tag="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown">
                        <i className="ri-notification-3-line"  onClick={() => this.Notifications()}></i>
                        {/* {
                            this.state.AllNotifications.length > 0 && (
                                <span className="noti-dot"></span>

                            )
                        } */}
                        <span className="noti-dot"></span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end dropdown-menu-lg p-0"
                        aria-labelledby="page-header-notifications-dropdown">
                        <div className="p-3">
                            <Row className="align-items-center">
                                <Col>
                                    <h6 className="m-0"> {this.props.t('Notifications')} </h6>
                                </Col>
                                {/* <div className="col-auto">
                                    <Link to="#" className="small"> {this.props.t('View All')}</Link>
                                </div> */}
                            </Row>
                        </div>
                        <SimpleBar style={{ maxHeight: "230px" }}>
                            {/* {this.state.AllNotifications.map((item) => {
                                return (
                                    <div value={item.id}>{item.notification_description}</div>
                                );
                            })} */}

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
                            <>
                            {this.state.AllNotifications?.length > 0 ? <>
                                {
                                    this.state.AllNotifications?.map((item) => {
                                        return (
                                            <Link to="#" className="text-reset notification-item"
                                                onClick={() => {
                                                    this.Checknotification(item)
                                                }}
                                            >
                                                <div className="d-flex" id={item.id}>
                                                    <div className="flex-1">
                                                        <h6 className="mt-0 mb-1">{this.props.t(item.notification_description)}</h6>
                                                        <div className="font-size-12 text-muted">
                                                            <p className="mb-1">{this.props.t(item.type)}</p>
                                                            <p className="mb-0"><i className="mdi mdi-clock-outline"></i> {this.props.t(this.getTimeAgo(item.created_at))}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })
                                }</>
                                :
                                <div className="flex-1">
                                    <h6 className="mx-3 mb-3 text-center">{this.props.t("No New Notifications")}</h6>
                                </div>
                            }
                            </>

                        )}

                            {/* {this.state.AllNotifications?.length > 0 ? <>
                                {
                                    this.state.AllNotifications?.map((item) => {
                                        return (
                                            <Link to="#" className="text-reset notification-item"
                                                onClick={() => {
                                                    this.Checknotification(item)
                                                }}
                                            >
                                                <div className="d-flex" id={item.id}>
                                                    <div className="flex-1">
                                                        <h6 className="mt-0 mb-1">{this.props.t(item.notification_description)}</h6>
                                                        <div className="font-size-12 text-muted">
                                                            <p className="mb-1">{this.props.t(item.type)}</p>
                                                            <p className="mb-0"><i className="mdi mdi-clock-outline"></i> {this.props.t(this.getTimeAgo(item.created_at))}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })
                                }</>
                                :
                                <div className="flex-1">
                                    <h6 className="mx-3 mb-3 text-center">{this.props.t("No New Notifications")}</h6>
                                </div>
                            } */}

                            {/* <Link to="#" className="text-reset notification-item">
                                <div className="d-flex">
                                    <img src={avatar3} className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1">{this.props.t('James Lemire')}</h6>
                                        <div className="font-size-12 text-muted">
                                            <p className="mb-1">{this.props.t('It will seem like simplified English.')}</p>
                                            <p className="mb-0"><i className="mdi mdi-clock-outline"></i> {this.props.t('1 hours ago')}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="text-reset notification-item">
                                <div className="d-flex">
                                    <div className="avatar-xs me-3">
                                        <span className="avatar-title bg-success rounded-circle font-size-16">
                                            <i className="ri-checkbox-circle-line"></i>
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1">{this.props.t('Your item is shipped')}</h6>
                                        <div className="font-size-12 text-muted">
                                            <p className="mb-1">{this.props.t('If several languages coalesce the grammar')}</p>
                                            <p className="mb-0"><i className="mdi mdi-clock-outline"></i> {this.props.t('3 min ago')}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link to="#" className="text-reset notification-item">
                                <div className="d-flex">
                                    <img src={avatar4} className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1">{this.props.t('Salena Layfield')}</h6>
                                        <div className="font-size-12 text-muted">
                                            <p className="mb-1">{this.props.t('As a skeptical Cambridge friend of mine occidental.')}</p>
                                            <p className="mb-0"><i className="mdi mdi-clock-outline"></i> {this.props.t('1 hours ago')}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link> */}
                        </SimpleBar>
                        {/* <div className="p-2 border-top">
                            <Link to="#" className="btn btn-sm btn-link font-size-14 btn-block text-center">
                                <i className="mdi mdi-arrow-right-circle me-1"></i>{this.props.t(' View More')}
                            </Link>
                        </div> */}
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}
export default withRouter(withNamespaces()(NotificationDropdown));





// import React, { useState, useEffect } from "react";
// import { Link, withRouter } from 'react-router-dom';
// import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
// import SimpleBar from "simplebar-react";
// import { withNamespaces } from "react-i18next";
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../../assets/images/users/avatar-4.jpg";
// import { GET_NOTIFICATIONS_BY_USER_ID, UPDATE_NOTIFICATION_BY_ID } from "../../../globals";

// const NotificationDropdown = ({ history, t }) => {
//     const [menu, setMenu] = useState(false);
//     const [AllNotifications, setAllNotifications] = useState([]);

//     const toggle = () => {
//         setMenu(prevMenu => !prevMenu);
//     };

//     const Notifications = async () => {
//         try {
//             const Token = localStorage.getItem("userToken");
//             const ID = localStorage.getItem("tenant_id");

//             const response = await fetch(GET_NOTIFICATIONS_BY_USER_ID + ID, {
//                 method: "GET",
//                 headers: {
//                     Authorization: "Bearer " + Token,
//                     "Content-Type": "application/json",
//                 },
//             });

//             console.log("DATATATATATATATATATATATAT---------333",response)
//             const data = await response.json();
//             console.log("DATATATATATATATATATATATAT",data)
//             if(response?.redirected == true){
//                 props.history.push(process.env.PUBLIC_URL + "/employeelist");
//             }else{
                
//                 if (data.result === true) {
//                     setAllNotifications(data.data);
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching notifications:", error);
//         }
//     };

//     const UpdateNotificationById = async (data) => {
//         const Token = localStorage.getItem("userToken");

//         try {
//             const res = await fetch(
//                 UPDATE_NOTIFICATION_BY_ID + data?.id,
//                 {
//                     method: "POST",
//                     headers: {
//                         Authorization: "Bearer " + Token,
//                         Accept: "application/json",
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ is_seen: data?.is_Seen }),
//                 }
//             );

//             const result = await res.json();
//             if (result.result === true) {
//                 Notifications();
//             } else {
//                 // Handle error case
//             }
//         } catch (err) {
//             console.error("Error updating notification:", err);
//         }
//     };

//     const getTimeAgo = (created_at) => {
//         // ... (rest of your existing code for getTimeAgo)
//         const currentTime = new Date();
//         const createdAt = new Date(created_at);

//         const timeDifference = currentTime - createdAt;
//         const seconds = Math.floor(timeDifference / 1000);
//         const minutes = Math.floor(seconds / 60);
//         const hours = Math.floor(minutes / 60);

//         if (hours > 0) {
//             const remainingMinutes = minutes % 60;
//             if (remainingMinutes > 0) {
//                 return `${hours}h ${remainingMinutes}mins ago`;
//             } else {
//                 return `${hours}h ago`;
//             }
//         } else if (minutes > 0) {
//             return `${minutes}mins ago`;
//         } else {
//             return `${seconds}secs ago`;
//         }
//     };

//     const Checknotification = (item) => {
//         // ... (rest of your existing code for Checknotification)
//         if (item.type === "LeadCreate") {
//             this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
//             this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
//         }
//         if (item.type === "LeadUpdate") {
//             this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
//             this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
//         }
//         if (item.type === "LeadLogCreate") {
//             this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
//             this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
//         }
//         else if (item.type === "LeadLogUpdate") {
//             this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
//             this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
//         }
//         else if (item.type === "LeadCommentsCreate") {
//             this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
//             this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
//         }
//         else if (item.type === "LeadCommentsUpdate") {
//             this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
//             this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
//         }
//         else if (item.type === "LeadActivityCreate") {
//             this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
//             this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
//         }
//         else if (item.type === "LeadActivityUpdate") {
//             this.props.history.push(process.env.PUBLIC_URL + "/marketingleadlist");
//             this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
//         }
//         else if (item.type === "LeaveCreate") {
//             this.props.history.push(process.env.PUBLIC_URL + "/employeeleaves");
//             this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
//         }
//         else if (item.type === "LeaveUpdate") {
//             this.props.history.push(process.env.PUBLIC_URL + "/employeeleaves");
//             this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
//         }
//         else if (item.type === "ProbationEnd") {
//             this.props.history.push(process.env.PUBLIC_URL + "/users");
//             this.UpdateNotificationById({ id: item?.id, is_Seen: "1" })
//         }
//     };

//     useEffect(() => {
//         Notifications(); // Initial fetch
//         // Set up interval to fetch notifications every 10 minutes
//         const notificationInterval = setInterval(() => {
//             Notifications();
//         }, 10 * 60 * 1000); // 10 minutes in milliseconds

//         // Clean up the interval when the component is unmounted
//         return () => clearInterval(notificationInterval);
//     }, []); // Empty dependency array to run once when the component mounts

//     return (
//         <>
//             <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
//                 <DropdownToggle tag="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown">
//                     <i className="ri-notification-3-line"></i>
//                     {
//                         AllNotifications.length > 0 && (
//                             <span className="noti-dot"></span>
//                         )
//                     }
//                 </DropdownToggle>
//                 <DropdownMenu className="dropdown-menu-end dropdown-menu-lg p-0"
//                     aria-labelledby="page-header-notifications-dropdown">
//                     <div className="p-3">
//                         <Row className="align-items-center">
//                             <Col>
//                                 <h6 className="m-0"> {t('Notifications')} </h6>
//                             </Col>
//                         </Row>
//                     </div>
//                     <SimpleBar style={{ maxHeight: "230px" }}>
//                         {AllNotifications?.length > 0 ? <>
//                             {
//                                 AllNotifications?.map((item) => (
//                                     <Link to="#" className="text-reset notification-item" key={item.id}
//                                         onClick={() => {
//                                             Checknotification(item)
//                                         }}
//                                     >
//                                         <div className="d-flex">
//                                             <div className="flex-1">
//                                                 <h6 className="mt-0 mb-1">{t(item.notification_description)}</h6>
//                                                 <div className="font-size-12 text-muted">
//                                                     <p className="mb-1">{t(item.type)}</p>
//                                                     <p className="mb-0"><i className="mdi mdi-clock-outline"></i> {t(getTimeAgo(item.created_at))}</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </Link>
//                                 ))
//                             }</>
//                             :
//                             <div className="flex-1">
//                                 <h6 className="mx-3 mb-3 text-center">{t("No New Notifications")}</h6>
//                             </div>
//                         }
//                     </SimpleBar>
//                 </DropdownMenu>
//             </Dropdown>
//         </>
//     );
// };

// export default withRouter(withNamespaces()(NotificationDropdown));
