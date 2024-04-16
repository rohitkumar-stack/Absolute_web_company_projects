import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Input, Row, Col, Card, CardBody } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {  Form, } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faHospital } from '@fortawesome/free-solid-svg-icons';


const SaleTableComponent = ({
    approveButton,
    approvelink,
    listbutton,
    allUserData,
    MasterSearch,
    emailSearch1,
    perPage,
    currentpageIndex,
    pageTotal,
    setPerPage,
    setIsUserID,
    setShow,
    getAllUsers,
    renderTdContent,
    renderTHContent,
    addData,
    editData,
    btnName,
    deletedata,
    isDropDown = true,
}) => {
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState(""); // Step 2
    const [filteredData, setFilteredData] = useState(allUserData);

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
                <Col xl="12" sm="12">
                    <Row>
                                <Col lg={12}>
                                    <div className="table-responsive">
                                        

                                        <Table className="table-centered mb-0 table-nowrap">
                                            <thead className="bg-light">
                                                {renderTHContent()}
                                            </thead>
                                         
                                                <tbody>
                                                    <tr className="border-bottom">
                                                    <Row>
                                                        <Col xl={2}> 
                                                        <FontAwesomeIcon icon={faSave} />
                                                        <span style={{marginLeft:"5px"}}>Co2312</span></Col>
                                                        <Col xl={2}> <FontAwesomeIcon  icon={faDownload} /> </Col>
                                                        <Col xl={2}> <FontAwesomeIcon icon={faHospital} /><span style={{marginLeft:"5px"}}>jiiii</span></Col>
                                                        <Col xl={2}> 29/12/23</Col>
                                                    </Row> 
                                                    </tr>
                                                    <tr className="border-bottom">
                                                    <Row>
                                                        <Col xl={2}> 
                                                        <FontAwesomeIcon icon={faSave} />
                                                        <span style={{marginLeft:"5px"}}>Co2312</span></Col>
                                                        <Col xl={2}> <FontAwesomeIcon  icon={faDownload} /> </Col>
                                                        <Col xl={2}> <FontAwesomeIcon icon={faHospital} /><span style={{marginLeft:"5px"}}>jiiii</span></Col>
                                                        <Col xl={2}> 29/12/23</Col>
                                                    </Row> 
                                                    </tr>
                                                    <tr className="border-bottom">
                                                    <Row>
                                                        <Col xl={2}> 
                                                        <FontAwesomeIcon icon={faSave} />
                                                        <span style={{marginLeft:"5px"}}>Co2312</span></Col>
                                                        <Col xl={2}> <FontAwesomeIcon  icon={faDownload} /> </Col>
                                                        <Col xl={2}> <FontAwesomeIcon icon={faHospital} /><span style={{marginLeft:"5px"}}>jiiii</span></Col>
                                                        <Col xl={2}> 29/12/23</Col>
                                                    </Row> 
                                                    </tr>
                                                    <tr className="border-bottom">
                                                    <Row>
                                                        <Col xl={2}> 
                                                        <FontAwesomeIcon icon={faSave} />
                                                        <span style={{marginLeft:"5px"}}>Co2312</span></Col>
                                                        <Col xl={2}> <FontAwesomeIcon  icon={faDownload} /> </Col>
                                                        <Col xl={2}> <FontAwesomeIcon icon={faHospital} /><span style={{marginLeft:"5px"}}>jiiii</span></Col>
                                                        <Col xl={2}> 29/12/23</Col>
                                                    </Row> 
                                                    </tr>
                                                    <tr className="border-bottom">
                                                    <Row>
                                                        <Col xl={2}> 
                                                        <FontAwesomeIcon icon={faSave} />
                                                        <span style={{marginLeft:"5px"}}>Co2312</span></Col>
                                                        <Col xl={2}> <FontAwesomeIcon  icon={faDownload} /> </Col>
                                                        <Col xl={2}> <FontAwesomeIcon icon={faHospital} /><span style={{marginLeft:"5px"}}>jiiii</span></Col>
                                                        <Col xl={2}> 29/12/23</Col>
                                                    </Row> 
                                                    </tr>
                                                    <tr className="border-bottom">
                                                    <Row>
                                                        <Col xl={2}> 
                                                        <FontAwesomeIcon icon={faSave} />
                                                        <span style={{marginLeft:"5px"}}>Co2312</span></Col>
                                                        <Col xl={2}> <FontAwesomeIcon  icon={faDownload} /> </Col>
                                                        <Col xl={2}> <FontAwesomeIcon icon={faHospital} /><span style={{marginLeft:"5px"}}>jiiii</span></Col>
                                                        <Col xl={2}> 29/12/23</Col>
                                                    </Row> 
                                                    </tr>
                                                    <tr className="border-bottom">
                                                    <Row>
                                                        <Col xl={2}> 
                                                        <FontAwesomeIcon icon={faSave} />
                                                        <span style={{marginLeft:"5px"}}>Co2312</span></Col>
                                                        <Col xl={2}> <FontAwesomeIcon  icon={faDownload} /> </Col>
                                                        <Col xl={2}> <FontAwesomeIcon icon={faHospital} /><span style={{marginLeft:"5px"}}>jiiii</span></Col>
                                                        <Col xl={2}> 29/12/23</Col>
                                                    </Row> 
                                                    </tr>
                                                    <tr className="border-bottom">
                                                    <Row>
                                                        <Col xl={2}> 
                                                        <FontAwesomeIcon icon={faSave} />
                                                        <span style={{marginLeft:"5px"}}>Co2312</span></Col>
                                                        <Col xl={2}> <FontAwesomeIcon  icon={faDownload} /> </Col>
                                                        <Col xl={2}> <FontAwesomeIcon icon={faHospital} /><span style={{marginLeft:"5px"}}>jiiii</span></Col>
                                                        <Col xl={2}> 29/12/23</Col>
                                                    </Row> 
                                                    </tr>
                                                    <tr className="border-bottom">
                                                    <Row>
                                                        <Col xl={2}> 
                                                        <FontAwesomeIcon icon={faSave} />
                                                        <span style={{marginLeft:"5px"}}>Co2312</span></Col>
                                                        <Col xl={2}> <FontAwesomeIcon  icon={faDownload} /> </Col>
                                                        <Col xl={2}> <FontAwesomeIcon icon={faHospital} /><span style={{marginLeft:"5px"}}>jiiii</span></Col>
                                                        <Col xl={2}> 29/12/23</Col>
                                                    </Row> 
                                                    </tr>
                                                   
                                                   
                                                </tbody>
                                                <tbody>
                                                    {/* <tr>
                                                        <td colSpan="12" className="text-center">
                                                            No Record Found
                                                        </td>
                                                    </tr> */}
                                                </tbody>
                                        </Table>

                                    </div>
                                </Col>
                     </Row>  
                </Col>
            </Row>      
              <Row className="justify-content-md-end justify-content-center align-items-center mb-2" style={{marginTop:"10px"}}>
                <Col className="col-md-auto">
                    <div className="d-flex gap-1">
                        <Button color="primary" onClick={() => getAllUsers(0)} disabled={currentpageIndex == 1}>
                            {"<<"}
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => getAllUsers(currentpageIndex - 1)}
                            disabled={currentpageIndex == 1}
                        >
                            {"<"}
                        </Button>
                    </div>
                </Col>
                <Col className="col-md-auto d-none d-md-block">
                    Page <strong>{currentpageIndex} of {pageTotal}</strong>
                </Col>
                <Col className="col-md-auto">
                    <Input
                        type="number"
                        min={1}
                        style={{ width: 70 }}
                        max={allUserData?.length}
                        defaultValue={currentpageIndex}
                        onClick={(event) => event.target.select()}
                        onChange={(e) => getAllUsers(parseInt(e.target.value))}
                    />
                </Col>
                <Col className="col-md-auto">
                    <div className="d-flex gap-1">
                        <Button
                            color="primary"
                            onClick={() => getAllUsers(currentpageIndex + 1)}
                            disabled={currentpageIndex === pageTotal}
                        >
                            {">"}
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => getAllUsers(pageTotal)}
                            disabled={currentpageIndex === pageTotal}
                        >
                            {">>"}
                        </Button>
                    </div>
                </Col>
            </Row>
        </div >
    );
};

export default SaleTableComponent;