import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
} from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";

// Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";
import {
  DELETE_LEAVE,
  DELETE_USER,
  GET_CONTACTPERSON,
  GET_DESIGNATION_BY_COMPANY_ID,
  GET_AllDESIGNATION,
  GET_AllDESIGNATIONCOMPANYWISE,
  GET_DESIGNATION_BY_ID,
  GET_LEAD_REFERENCE,
  GET_LEAVE,
  GET_OWNERSHIP,
  GET_SHIFT,
  GET_UNIT,
  GET_UNIT_MEASURE,
  GET_WAREHOUSE,
  UPDATE_CONTACTPERSON_STATUS,
  UPDATE_CUSTOMER_STATUS,
  UPDATE_ITEM_SUB_CATGEORY_STATUS,
  UPDATE_LEAD_REFERENCE_STATUS,
  UPDATE_LEAVE_STATUS,
  UPDATE_OWNERSHIP_STATUS,
  UPDATE_SHIFT_STATUS,
  UPDATE_UNIT_MEASURE_STATUS,
  UPDATE_UNIT_STATUS,
  UPDATE_WAREHOUSE_STATUS,
} from "../../../globals";
import TableComponent from "../../../components/Common/tablecomponent";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const GetDesignation = () => {
  const [breadcrumbItems] = useState([
    { title: "Master", link: process.env.PUBLIC_URL + "/dashboard" },
    { title: "Customer", link: process.env.PUBLIC_URL + "/customerlist" },
  ]);

  const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [allDesignation, setAllDesignation] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [currentpageIndex, setCurrentpageIndex] = useState("");
  const [perPage, setPerPage] = useState("");
  const [show, setShow] = useState(false);
  const [isUserID, setIsUserID] = useState(false);
  const [CreateButton, setCreateButton] = useState([]);
  const [EditButton, setEditButton] = useState([]);
  const [DeleteButton, setDeleteButton] = useState([]);
  const [allDesignationWiseCompany, setAllDesignationWiseCompany] =
    useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [designationCompanyWise, setDesignationCompanyWise] = useState(null);

  console.log("checkselectedata", designationCompanyWise);
  console.log("checkselectedatabbb", allDesignation);
  
  const PermissionArr =
    JSON.parse(localStorage.getItem("permissionarray")) || [];
    const sidebarArr = [
      {
          href: "hsncodelist",
          value: "hsn_code",
          label: "HSN Code"
      },
      {
          href: "countrylist",
          value: "country",
          label: "Country"
      },
      {
          href: "statelist",
          value: "state",
          label: "State"
      },
      {
          href: "ledgerlist",
          value: "ledger",
          label: "Ledger"
      },
      {
          href: "ledgergrouplist",
          value: "ledger_group",
          label: "Ledger Group"
      },
      {
          href: "termsandconditionslist",
          value: "terms_condition",
          label: "Terms & Conditions"
      },
      {
          href: "departmentlist",
          value: "department",
          label: "Department"
      },
      {
          href: "designationlist",
          value: "designation",
          label: "Designation"
      },
      {
          href: "itemcategorylist",
          value: "item_category",
          label: "Item Category"
      },
      {
          href: "itemsubcategorylist",
          value: "item_sub_category",
          label: "Item Sub-Category"
      },
      {
          href: "itemmakelist",
          value: "item_make",
          label: "Item Make"
      },
      {
          href: "itemlist",
          value: "item",
          label: "Item"
      },
      {
          href: "shiftlist",
          value: "shift",
          label: "Shift"
      },
      {
          href: "unitlist",
          value: "unit",
          label: "Unit"
      },
      {
          href: "unitmeasurelist",
          value: "unit_measure",
          label: "Unit Measure"
      },
      {
          href: "warehouselist",
          value: "warehouse",
          label: "Warehouse"
      },
      {
          href: "leavelist",
          value: "leave",
          label: "Leave"
      },
      {
          href: "leavebalancelist",
          value: "leave_balances",
          label: "Leave Balance"
      },
      {
          href: "leaverequestlist",
          value: "leave_request",
          label: "Leave Request"
      },


  ]

  useEffect(() => {
    getAllDesignation();
    getAllCompany();
    loadCreatePermissions();
    loadEditPermissions();
    // loadDeletePermissions();
  }, []); // Run the effect when the page changes


  const getAllDesignation = async (page, perPage) => {
    setisLoading(true);
    var Token = await localStorage.getItem("userToken");
    try {
      const response = await fetch(
        page ? `${GET_AllDESIGNATION}?page=${page}` : `${GET_AllDESIGNATION}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.result === true) {
        setAllDesignation(data.data);
        setisLoading(false);
        setTotalPages(data.meta.pagination.total_pages);
        setCurrentpageIndex(data.meta.pagination.current_page);
        setPerPage(data.meta.pagination.per_page);
      } else {
        setisLoading(false);
      }
    } catch (error) {
      setisLoading(false);
    }
  };

  const getAllCompany = async (page, perPage) => {
    setisLoading(true);
    var Token = await localStorage.getItem("userToken");
    try {
      const response = await fetch(
        page
          ? `${GET_AllDESIGNATIONCOMPANYWISE}?page=${page}`
          : `${GET_AllDESIGNATIONCOMPANYWISE}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.result === true) {
        console.log("checkDesignationData", data);
        setAllDesignationWiseCompany(data.data);
        setisLoading(false);
      } else {
        setisLoading(false);
      }
    } catch (error) {
      setisLoading(false);
    }
  };

  const findDesignationCompanyWise = async (page, perPage) => {
    setisLoading(true);
    var Token = await localStorage.getItem("userToken");
    var id = 123;
    // allDesignationWiseCompany
    try {
      const response = await fetch(
        page
          ? `${GET_DESIGNATION_BY_COMPANY_ID}?page=${page}${selectedCompany}`
          : `${GET_DESIGNATION_BY_COMPANY_ID}${selectedCompany}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.result === true) {
        setDesignationCompanyWise(data.data);
        setisLoading(false);
      } else {
        setisLoading(false);
      }
    } catch (error) {
      setisLoading(false);
    }
  };

  useEffect(() => {
    findDesignationCompanyWise();
  }, [selectedCompany]);

  const DeleteUserData = async (isUserID) => {
    setisLoading(true);
    var Token = localStorage.getItem("userToken");
    await fetch(DELETE_LEAVE + isUserID, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Token,
      },
    })
      .then((res) => {
        return res.json();
      })

      .then((res) => {
        toast("Contact Person Deleted !", {
          type: "success",
        });

        setShow(false);
        setisLoading(false);
        getAllDesignation();
      })
      .catch((err) => {
        toast("Unable to Delete Contact Person", {
          type: "error",
        });

        setShow(false);
        setisLoading(false);
      });
  };

  // UPDATE SATATUS FROM SWITCH
  const updateContactStatus = async (userid, status) => {
    setisLoading(true);
    var Token = localStorage.getItem("userToken");
    await fetch(UPDATE_CUSTOMER_STATUS + userid, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status == true ? "Active" : "Inactive",
      }),
    })
      .then((response) => {
        response.json().then((data) => {
          if (data.result == true) {
            toast("Customer Updated Successfully !", {
              type: "success",
            });
            getAllDesignation();
            setShow(false);
            setisLoading(false);
          } else {
            getAllDesignation();
            setisLoading(false);
            toast("Customer Cannot Be Updated", {
              type: "error",
            });
          }
        });
      })
      .catch((err) => {
        toast("Unable to Update Customer", {
          type: "error",
        });
        setShow(false);
        setisLoading(false);
      });
  };


  const loadCreatePermissions = async () => {
    try {

        const tempArr = PermissionArr
            .filter(item => item.name.includes("Add Designation Master"))
            .flatMap(item => sidebarArr
                .filter(sidebar => item.type === sidebar.value)
                .map(sidebar => ({
                    active: item.status,
                }))
            );
        const finalString = tempArr.map(item => item.active).join(', ');
        setCreateButton(finalString);
    } catch (error) {

    }
};

const loadEditPermissions = async () => {
    try {
        const tempArr = PermissionArr
            .filter(item => item.name.includes("Edit Designation Master"))
            .flatMap(item => sidebarArr
                .filter(sidebar => item.type === sidebar.value)
                .map(sidebar => ({
                    active: item.status,
                }))
            );
        const finalString = tempArr.map(item => item.active).join(', ');
        setEditButton(finalString);
    } catch (error) {
    }
};


  const loadDeletePermissions = async () => {
    try {
        const tempArr = PermissionArr
            .filter(item => item.name.includes("Delete Designation Master"))
            .flatMap(item => sidebarArr
                .filter(sidebar => item.type === sidebar.value)
                .map(sidebar => ({
                    active: item.status,
                }))
            );
        const finalString = tempArr.map(item => item.active).join(', ');
        setDeleteButton(finalString);
    } catch (error) {
    }
};


  // TABLE HEADER
  const renderTHContent = () => (
    <>
      <tr>
        {EditButton == "Active" || DeleteButton == "Active" ? (
          <th className="text-center">Action</th>
        ) : (
          ""
        )}
        <th>Company Name</th>
        <th>Designation Name</th>
        <th>Status</th>
      </tr>
    </>
  );

  // TABLE DATA
  function renderTdContent(item) {
    return (
      <>
          <>
            <td>
              <h5 className="font-size-14 text-truncate"></h5>
              <p className="mb-0">
                <span className="fw-medium">{item.company_name}</span>
              </p>
            </td>
            <td>
              <h5 className="font-size-14 text-truncate"></h5>
              <p className="mb-0">
                <span className="fw-medium">{item.designation_name}</span>
              </p>
            </td>
            <td>
              <div
                style={{ margin: "10px" }}
                className="form-check form-switch mb-3"
                dir="ltr"
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customSwitch2" // Make sure id is unique
                  style={{ height: "18px", width: "30px" }}
                  checked={item.status === "Active"}
                  onChange={(e) => {
                    const newStatus = e.target.checked ? "Active" : "Inactive";
                    // Assuming updateContactStatus takes (id, status) parameters
                    updateContactStatus(item.id, newStatus);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="customSwitch2" // Make sure htmlFor matches input id
                  onClick={(e) => {
                    this.setState({ toggleSwitch: !this.state.toggleSwitch });
                  }}
                ></label>
              </div>
            </td>
          </>
      </>
    );
  }

  // Start------------RolePermission for Button
  // Retrieve data from localStorage
  const permissionsString = localStorage.getItem("permissionarray");

  // Parse the JSON string into a JavaScript object
  const permissions = JSON.parse(permissionsString);
  // this is use for all active permission
  const filteredPermissions = permissions.filter(
    (permission) => permission.status === "Active"
  );
  const AddDesignation = filteredPermissions?.find(
    (permission) => permission.name === "Add Designation Master"
  );
  const EditDesignation = filteredPermissions?.find(
    (permission) => permission.name === "Edit Designation Master"
  );

  console.log("checkdesignationpermision", EditDesignation);
  // console.log(EditLeadReference, "====>EditLeadReference");

  // End------------RolePermission for Button

  return (
    <React.Fragment>
      {/* <div className="page-content"> */}
      <Container fluid>
        {/* <Breadcrumbs title="Customer list" breadcrumbItems={breadcrumbItems} /> */}

        <CardBody>
          <AvForm>
            <Row>
              <Col lg="3">
                <Label className="form-label" htmlFor="validationCustom01">
                  Company Type <span style={{ color: "#ff0000" }}>*</span>
                </Label>
                <AvField
                  name="Company"
                  type="select"
                  id="validationCustom01"
                  errorMessage="Please Select a Company."
                  validate={{ required: { value: true } }}
                  className="form-control"
                  onChange={(e) => {
                    setSelectedCompany(e.target.value);
                  }}
                >
                  <option value={""}>Select Company</option>
                  {allDesignationWiseCompany?.map((item) => {
                    return (
                      <option value={item.customer_id}>
                        {item.company_name}
                      </option>
                    );
                  })}
                </AvField>
              </Col>
              <Col lg="3" className="mt-4">
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </AvForm>

          {isLoading ? (
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
            <TableComponent
              allUserData={designationCompanyWise?designationCompanyWise:allDesignation || []}
              perPage={perPage}
              currentpageIndex={currentpageIndex}
              pageTotal={totalPages}
              setPerPage={perPage}
              setIsUserID={setIsUserID}
              setShow={setShow}
              getAllDesignation={getAllDesignation}
              renderTHContent={renderTHContent}
              renderTdContent={renderTdContent}
              btnName="Add Designation"
              addData={
                AddDesignation?.status == "Active" ? "/createdesignation" : ""
              }
              editData={
                EditDesignation?.status == "Active" ? "/editdesignation/" : ""
              }
              MasterSearch={"terms_condition_type"}
              deletedata={DeleteButton == "Active" ? "Active" : ""}
              // emailSearch1={'email'}
            />
          )}
        </CardBody>
      </Container>
      {/* </div> */}
      <Modal isOpen={show} backdrop="static">
        <ModalHeader toggle={() => setShow(false)}>
          Delete Confirmation
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this Lead Reference?</p>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="light" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => DeleteUserData(isUserID)}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default GetDesignation;
