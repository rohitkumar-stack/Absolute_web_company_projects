import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Input, Row, Col, Card, CardBody } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CardComp = ({
    allUserData,
}) => {
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
            {/* <Row >
                <Col>
                    <Card>
                        <CardBody>
                            <Row className="text-center">
                                <Col lg="4">
                                    <h6>Lead Name: </h6> {allUserData.lead_topic}
                                </Col>
                                <Col lg="4">
                                    <h6>Lead Status: </h6> {allUserData.lead_status}
                                </Col>
                                <Col lg="4">
                                    <h6>Contact Person :</h6> {allUserData.contact_person_name}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row> */}
        </div >
    );
};

export default CardComp;