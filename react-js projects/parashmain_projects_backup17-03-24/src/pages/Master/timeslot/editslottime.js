// new code
import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, Container, Label, Button } from "reactstrap";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { GET_ALL_ROLES_WITHOUT_ADMIN, GET_SLOTTIME_BY_ROLE_BASE_ID, GET_SLOTTIME_BY_ROLE_ID, UPDATE_SLOTTIME_ROLEWISE } from "../../../globals";
import { ThreeDots } from "react-loader-spinner";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

const EditSlotTime = ({ history, location }) => {
  const [breadcrumbItems] = useState([
    { title: "Slot Time", link: process.env.PUBLIC_URL + "/leavetabs" },
    { title: "Edit Slot Time", link: process.env.PUBLIC_URL + "#" },
  ]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [getById, setGetById] = useState({});
  const [getByRoleId, setGetByRoleId] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rolelist, setRoleList] = useState([]);
  const [timeEntries, setTimeEntries] = useState([
    {
      id_encode: "",
      start_time: "",
      end_time: "",
      description: ""
    },
  ]);

  const handleSubmit = async (event, values) => {
    setIsLoading(true);
    const Token = localStorage.getItem("userToken");

    try {
      const response = await fetch(UPDATE_SLOTTIME_ROLEWISE, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role_id_encode: values.selectedrole,
          timeSlots: timeEntries,
        }),
      });

      const data = await response.json();

      if (data.result === true) {
        history.goBack();
        toast("Slot Time Updated Successfully !", {
          type: "success",
        });
        setIsLoading(false);
      } else {
        toast("Unable to Update Slot Time", {
          type: "error",
        });
        toast(data.message, {
          type: "error",
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast("Unable to Update Slot Time", {
        type: "error",
      });
      setIsLoading(false);
    }
  };

  const handleAddButtonClick = () => {
    const arr = [...timeEntries, { start_time: '', end_time: '', description: '' }];
    setTimeEntries(arr);
    console.log(arr);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { pathname } = location;
      const id = pathname.substring(pathname.lastIndexOf("/") + 1);
      
      setIsLoading(true);

      try {
        const Token = localStorage.getItem("userToken");
        const response = await fetch(GET_SLOTTIME_BY_ROLE_ID + id, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.result === true) {
          if (data.data) {
            setGetById(data.data);
            setTimeEntries(data.data.timeSlots);
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      const { pathname } = location;
      const id = pathname.substring(pathname.lastIndexOf("/") + 1);
      const roleid = localStorage.getItem("roleid");

      setIsLoading(true);

      try {
        const Token = localStorage.getItem("userToken");
        const response = await fetch(GET_SLOTTIME_BY_ROLE_BASE_ID + id, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.result === true) {
          if (data.data) {
            setGetByRoleId(data.data);
            setTimeEntries(data.data.timeSlots);
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location]);
  console.log('getByRoleId---', getByRoleId)

  useEffect(() => {
    const fetchRoles = async () => {
      const Token = localStorage.getItem("userToken");

      try {
        const response = await fetch(GET_ALL_ROLES_WITHOUT_ADMIN, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.result === true) {
          setRoleList(data.data);
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchRoles();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Edit Slot Time" breadcrumbItems={breadcrumbItems} />
          {isLoading ? (
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
          ) : (
            <Card>
              <CardBody>
                <AvForm
                  className="needs-validation"
                  onValidSubmit={handleSubmit}
                >
                  <Row className="mt-2 border-bottom">
                    <Col md="3" className="d-inline">
                      <Label className="form-label" htmlFor="validationCustom01">
                        Select Role
                        <span style={{ color: "#ff0000" }}>*</span>
                      </Label>
                      <AvField
                        required={true}
                        name="selectedrole"
                        type="select"
                        id="validationCustom01"
                        value={getByRoleId.role_id}
                        errorMessage="Please Select a Role."
                        validate={{ required: { value: true } }}
                        className="form-control"
                      >
                        <option value={""}>Select Role</option>
                        {rolelist.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </AvField>
                    </Col>
                  </Row>
                  <Row className="mb-3 mt-2">
                    <Col md="2" className="mb-3 border-bottom">
                      <Label className="form-label">
                        Slot Timings :
                      </Label>
                      <Button onClick={handleAddButtonClick} className="m-2" color="primary">
                        Add Timing +
                      </Button>
                    </Col>
                    {timeEntries.map((entry, index) => (
                      <Row key={index} className="mb-3">
                        <Col md="2">
                          <Label className="form-label" htmlFor={`startTime${index}`}>
                            Start Time
                            <span style={{ color: "#ff0000" }}>*</span>
                          </Label>
                          <Flatpickr
                            className="time-picker"
                            value={entry.start_time}
                            name={`starttime${index}`}
                            id={`startTime${index}`}
                            options={{
                              enableTime: true,
                              noCalendar: true,
                              dateFormat: 'h:i K', // Use 12-hour format with AM/PM
                              defaultHour: 12,
                              time_24hr: false, // Set to false for 12-hour format
                            }}
                            onChange={(selectedDates) => {
                              const timeEntriesCopy = [...timeEntries];
                              timeEntriesCopy[index] = {
                                ...entry,
                                start_time: selectedDates[0].toTimeString().split(" ")[0],
                              };
                              setTimeEntries(timeEntriesCopy);
                            }}
                          >
                            <span className="mdi mdi-clock"></span>
                          </Flatpickr>
                        </Col>

                        <Col md="2">
                          <Label className="form-label" htmlFor={`endTime${index}`}>
                            End Time
                            <span style={{ color: "#ff0000" }}>*</span>
                          </Label>
                          <Flatpickr
                            className="time-picker"
                            name={`endtime${index}`}
                            id={`endTime${index}`}
                            options={{
                              enableTime: true,
                              noCalendar: true,
                              dateFormat: 'h:i K', // Use 12-hour format with AM/PM
                              time_24hr: false, // Set to false for 12-hour format
                              defaultHour: 12,
                            }}
                            value={entry.end_time}
                            onChange={(selectedDates) => {
                              const timeEntriesCopy = [...timeEntries];
                              timeEntriesCopy[index] = {
                                ...entry,
                                end_time: selectedDates[0].toTimeString().split(" ")[0],
                              };
                              setTimeEntries(timeEntriesCopy);
                            }}
                          />
                        </Col>

                        <Col md="3" className="d-inline">
                          <Label className="form-label" htmlFor={`details${index}`}>
                            Details
                            <span style={{ color: "#ff0000" }}>*</span>
                          </Label>

                          <AvField
                            value={entry.description}
                            onChange={(event) => {
                              const timeEntriesCopy = [...timeEntries];
                              timeEntriesCopy[index] = {
                                ...entry,
                                description: event.target.value,
                              };
                              setTimeEntries(timeEntriesCopy);
                            }}
                            name={`details${index}`}
                            id={`details${index}`}
                            type="text"
                            required
                            errorMessage="Please Enter Details"
                            className="form-control"
                          />
                        </Col>
                      </Row>
                    ))}
                  </Row>
                  <Button color="primary" type="submit">
                    Update
                  </Button>

                  <Button
                    color="secondary"
                    className="mx-2"
                    onClick={() => history.goBack()}
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

export default EditSlotTime;






// import React, { Component } from "react";
// import { Row, Col, Card, CardBody, Container, Label, Form, Button, FormGroup } from "reactstrap";
// //Import Breadcrumb
// import Breadcrumb from "../../../components/Common/Breadcrumb";
// import { AvForm, AvField } from "availity-reactstrap-validation";
// import PhoneInput from "react-phone-input-2";
// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";
// import 'react-phone-input-2/lib/style.css'
// import { toast } from "react-toastify";
// import { CREATE_USER, GET_ALL_ROLES_WITHOUT_ADMIN, GET_COUNTRY_BY_ID, GET_SLOTTIME_BY_ID, GET_SLOTTIME_BY_ROLE_ID, GET_USER_BY_ID, UPDATE_COUNTRY, UPDATE_SLOTTIME_ROLEWISE, UPDATE_USER } from "../../../globals";
// import { ThreeDots } from "react-loader-spinner";
// import Flatpickr from 'react-flatpickr';
// import 'flatpickr/dist/themes/material_blue.css';

// class EditSlotTime extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             breadcrumbItems: [
//                 { title: "Slot Time", link: process.env.PUBLIC_URL + "/slottimelist" },
//                 { title: "Edit Slot Time", link: process.env.PUBLIC_URL + "#" },
//             ],

//             selectedFiles: [],
//             getById: {},
//             inputMobileField: "",
//             isLoading: false,
//             status: "",
//             rolelist: [],
//             timeEntries: [{
//                 id_encode: "",
//                 start_time: "",
//                 end_time: "",
//                 description: ""
//             }],
//             updatedEntries: [{
//                 id_encode: "",
//                 start_time: "",
//                 end_time: "",
//                 description: ""
//             }],
//         };
//         this.handleSubmit = this.handleSubmit.bind(this);
//     };



//     componentDidMount() {

//         // Access the location object to get route parameters
//         const { location } = this.props;
//         const { pathname } = location;

//         // Parse the pathname to get the id parameter
//         const id = pathname.substring(pathname.lastIndexOf("/") + 1);
//         // this.setState({ id: id })
//         this.GetSlotTimeByID(id);
//         this.GetAllRoles();
//     }

//     // GET USER
//     async GetSlotTimeByID(id) {
//         this.setState({
//             isLoading: true,
//         });
//         var Token = localStorage.getItem("userToken");
//         try {
//             fetch(
//                 GET_SLOTTIME_BY_ROLE_ID +
//                 id,
//                 {
//                     method: "GET",
//                     headers: {
//                         Authorization: "Bearer " + Token,
//                         "Content-Type": "application/json",
//                     },
//                 }
//             ).then((response) => {
//                 response.json().then((data) => {
//                     if (data.result === true) {

//                         if (data.data) {
//                             this.setState({
//                                 getById: data.data,
//                                 timeEntries: data.data.timeSlots,
//                             });
//                             this.setState({
//                                 isLoading: false,
//                             });
//                         }
//                     } else {

//                         this.setState({
//                             isLoading: false,
//                         });
//                     }
//                 });
//             });
//         } catch (error) {

//             this.setState({
//                 isLoading: false,
//             });
//         }
//     }

//     // GET ALL ROLES
//     async GetAllRoles() {
//         var Token = localStorage.getItem("userToken");
//         try {
//             fetch(GET_ALL_ROLES_WITHOUT_ADMIN, {
//                 method: "GET",
//                 headers: {
//                     Authorization: "Bearer " + Token,
//                     "Content-Type": "application/json",
//                 },
//             }).then((response) => {
//                 response.json().then((data) => {
//                     if (data.result === true) {
//                         this.setState({ rolelist: data.data });
//                     } else {

//                     }
//                 });
//             });
//         } catch (error) {

//         }
//     }

//     // CREATE USER API
//     handleSubmit(event, values) {
//         this.setState({
//             isLoading: true,
//         });
//         var Token = localStorage.getItem("userToken");
//         try {
//             fetch(UPDATE_SLOTTIME_ROLEWISE, {
//                 method: "POST",
//                 headers: {
//                     Authorization: "Bearer " + Token,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     role_id_encode: values.selectedrole,
//                     timeSlots: this.state.timeEntries,
//                 }),
//             }).then((response) => {
//                 response.json().then((data) => {
//                     if (data.result === true) {
//                         this.props.history.goBack();
//                         toast("Slot Time Updated Successfully !", {
//                             type: "success",
//                         });
//                         this.setState({
//                             isLoading: false
//                         });
//                     } else {
//                         toast("Unable to Update Slot Time", {
//                             type: "error",
//                         });
//                         toast(data.message, {
//                             type: "error",
//                         });
//                         this.setState({
//                             isLoading: false,
//                         });
//                     }
//                 });
//             });
//         } catch (error) {
//             toast("Unable to Update Slot Time", {
//                 type: "error",
//             });
//             this.setState({
//                 isLoading: false,
//             });
//         }
//     }


//     handleAddButtonClick = () => {
//         let arr = [...this.state.timeEntries, { start_time: '', end_time: '', description: '' }]

//         this.setState({ timeEntries: arr })
//         console.log(arr)
//     };


//     render() {

//         return (
//             <React.Fragment>
//                 <div className="page-content">
//                     <Container fluid>
//                         <Breadcrumb title="Edit Slot Time" breadcrumbItems={this.state.breadcrumbItems} />
//                         {this.state.isLoading ? (
//                             <>
//                                 <ThreeDots
//                                     height="80"
//                                     width="80"
//                                     radius="9"
//                                     color="#4D5DC6"
//                                     ariaLabel="three-dots-loading"
//                                     wrapperStyle={{
//                                         justifyContent: "center",
//                                     }}
//                                     wrapperClassName=""
//                                     visible={true}
//                                 />
//                             </>
//                         ) : (
//                             <Card>
//                                 <CardBody>

//                                     <AvForm
//                                         className="needs-validation"
//                                         onValidSubmit={this.handleSubmit}
//                                     // onSubmit={this.submitStep1}
//                                     >
//                                         <Row className="mt-2 border-bottom">
//                                             <Col md="3" className="d-inline">
//                                                 <Label
//                                                     className="form-label"
//                                                     htmlFor="validationCustom01"
//                                                 >
//                                                     Select Role
//                                                     <span style={{ color: "#ff0000" }}>*</span>
//                                                 </Label>
//                                                 <AvField
//                                                     required={true}
//                                                     name="selectedrole"
//                                                     type="select"
//                                                     id="validationCustom01"
//                                                     value={this.state.getById.role_id}
//                                                     errorMessage="Please Select a Leave."
//                                                     validate={{ required: { value: true } }}
//                                                     className="form-control"
//                                                 >
//                                                     <option value={""} >Select Role</option>
//                                                     {this.state.rolelist.map((item) => {
//                                                         return (
//                                                             <option value={item.id}>{item.name}</option>

//                                                         );
//                                                     })}
//                                                 </AvField>
//                                             </Col>
//                                         </Row>
//                                         <Row className="mb-3 mt-2">
//                                             <Col md="2" className="mb-3 border-bottom">
//                                                 <Label className="form-label " >
//                                                     Slot Timings :
//                                                 </Label>
//                                                 <Button onClick={this.handleAddButtonClick} className="m-2" color="primary">Add Timing +</Button>
//                                             </Col>
//                                             {this.state.timeEntries.map((entry, index) => (
//                                                 <Row key={index} className="mb-3">
//                                                     <Col md="2">
//                                                         <Label className="form-label" htmlFor={`startTime${index}`}>
//                                                             Start Time
//                                                             <span style={{ color: "#ff0000" }}>*</span>
//                                                         </Label>
//                                                         <Flatpickr
//                                                             className="time-picker"
//                                                             value={entry.start_time}
//                                                             name={`starttime${index}`}
//                                                             id={`startTime${index}`}
//                                                             options={{
//                                                                 enableTime: true,
//                                                                 noCalendar: true,
//                                                                 dateFormat: 'h:i K', // Use 12-hour format with AM/PM
//                                                                 defaultHour: 12,
//                                                                 time_24hr: false, // Set to false for 12-hour format
//                                                             }}
//                                                             onChange={(selectedDates) => {
//                                                                 const timeEntries = [...this.state.timeEntries];
//                                                                 timeEntries[index] = {
//                                                                     ...entry,
//                                                                     start_time: selectedDates[0].toTimeString().split(" ")[0],
//                                                                 };
//                                                                 this.setState({ timeEntries: timeEntries });

//                                                             }}
//                                                         >
//                                                             <span className="mdi mdi-clock"></span>
//                                                         </Flatpickr>
//                                                     </Col>

//                                                     <Col md="2">
//                                                         <Label className="form-label" htmlFor={`endTime${index}`}>
//                                                             End Time
//                                                             <span style={{ color: "#ff0000" }}>*</span>
//                                                         </Label>
//                                                         <Flatpickr
//                                                             className="time-picker"
//                                                             name={`endtime${index}`}
//                                                             id={`endTime${index}`}
//                                                             options={{
//                                                                 enableTime: true,
//                                                                 noCalendar: true,
//                                                                 dateFormat: 'h:i K', // Use 12-hour format with AM/PM
//                                                                 time_24hr: false, // Set to false for 12-hour format
//                                                                 defaultHour: 12,
//                                                             }}
//                                                             value={entry.end_time}
//                                                             onChange={(selectedDates) => {


//                                                                 const timeEntries = [...this.state.timeEntries];
//                                                                 timeEntries[index] = {
//                                                                     ...entry,
//                                                                     end_time: selectedDates[0].toTimeString().split(" ")[0],
//                                                                 };
//                                                                 this.setState({ timeEntries: timeEntries });

//                                                             }}
//                                                         />
//                                                     </Col>

//                                                     <Col md="3" className="d-inline">
//                                                         <Label
//                                                             className="form-label"
//                                                             htmlFor={`details${index}`}
//                                                         >
//                                                             Details
//                                                             <span style={{ color: "#ff0000" }}>*</span>
//                                                         </Label>

//                                                         <AvField
//                                                             value={entry.description}
//                                                             onChange={(event) => {


//                                                                 const timeEntries = [...this.state.timeEntries];
//                                                                 timeEntries[index] = {
//                                                                     ...entry,
//                                                                     description: event.target.value,
//                                                                 };
//                                                                 this.setState({ timeEntries: timeEntries });

//                                                             }}
//                                                             name={`details${index}`}
//                                                             id={`details${index}`}
//                                                             type="text"
//                                                             required
//                                                             errorMessage="Please Enter Details"
//                                                             className="form-control"
//                                                         >
//                                                         </AvField>
//                                                     </Col>
//                                                 </Row>
//                                             ))}

//                                         </Row>
//                                         <Button color="primary" type="submit" >
//                                             Update
//                                         </Button>

//                                         <Button
//                                             color="secondary"
//                                             className="mx-2"
//                                             onClick={() => this.props.history.goBack()}
//                                         >
//                                             Cancel
//                                         </Button>
//                                     </AvForm>
//                                 </CardBody>
//                             </Card>
//                         )}
//                     </Container>
//                 </div>
//             </React.Fragment>
//         );
//     };
// };

// export default EditSlotTime;





