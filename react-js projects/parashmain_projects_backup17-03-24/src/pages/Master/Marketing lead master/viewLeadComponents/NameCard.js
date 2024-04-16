import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Input, Row, Col, Card, CardBody } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./nameCardStyle.scss";

const NameCard = ({
    allUserData,
  
}) => {
    // console.log(allUserData, "===>allUserData");
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState(""); // Step 2
   

    // old functionality
    // useEffect(() => {
    //     const filtered = allUserData?.filter((item) =>

    //         item.first_name.toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    //     setFilteredData(filtered);
    // }, [searchQuery]);

    // useEffect(() => {
    //     const filtered = allUserData?.filter((item) => {
    //         if (isOnFleetListPage) {
    //             return item.fleet_name.toLowerCase().includes(searchQuery.toLowerCase()) || item.model_name.toLowerCase().includes(searchQuery.toLowerCase())
    //         } else {
    //             return item.username.toLowerCase().includes(searchQuery.toLowerCase()) || item.mobile.toLowerCase().includes(searchQuery.toLowerCase()) || item.email.toLowerCase().includes(searchQuery.toLowerCase())
    //         }
    //     }
    //     );
    //     setFilteredData(filtered);
    // }, [searchQuery]);

    // useEffect(() => {
    //     const filtered = allUserData?.filter((item) => {
    //         if (MasterSearch) {
    //             return item[MasterSearch]?.toLowerCase().includes(searchQuery.toLowerCase()) || item[MasterSearch1]?.toLowerCase().includes(searchQuery.toLowerCase())
    //         } else {
    //             return item[MasterSearch]?.toLowerCase().includes(searchQuery.toLowerCase()) || item.city?.toLowerCase().includes(searchQuery.toLowerCase())
    //         }
    //     }
    //     );
    //     setFilteredData(filtered);
    // }, [searchQuery]);


    return (
        <div>
            <Row>
                <Card>
                    <CardBody>
                        <Row>
                            <Col lg={4}>
                                <h5 className="lead_contents">Lead Number </h5>
                                <p className="lead_data">{allUserData?.lead_no}</p>
                            </Col>

                            <Col lg={4}>
                                <h5 className="lead_contents">Lead Name </h5>
                                <p className="lead_data">{allUserData?.lead_topic}</p>
                            </Col>

                            <Col lg={4}>
                                <h5 className="lead_contents">Lead Status </h5>
                                <p className="lead_data">{allUserData?.lead_status}</p>
                            </Col>

                            <Col lg={4}>
                                <h5 className="lead_contents">Contact Person </h5>
                                <p className="lead_data"> {allUserData?.activity_contact_person_name}</p>
                            </Col>
                        </Row>
                        
                    </CardBody>
                </Card>

                {/* <Col lg={4}>
                    <Card>
                        <CardBody>
                            <h4>Lead Name </h4>
                            <p>{allUserData?.lead_topic}</p>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card>
                        <CardBody>
                            <h4>Lead Status </h4>
                            <p>{allUserData?.lead_status}</p>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card>
                        <CardBody>
                            <>
                                <h4>Contact Person </h4>

                                <p> {allUserData?.contact_person_name}</p>
                            </>

                        </CardBody>
                    </Card>
                </Col> */}
            </Row>


        </div >
    );
};

export default NameCard;