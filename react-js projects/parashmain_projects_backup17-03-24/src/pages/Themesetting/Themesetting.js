import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container, Label, Form, Button, FormGroup } from "reactstrap";
//Import Breadcrumb

import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput } from "availity-reactstrap-validation";
import PhoneInput from "react-phone-input-2";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import CustomFileInputNew1 from "../../components/Common/smallimagefunction";
import CustomFileInputNew from "../../components/Common/imagefunction";
import { GET_USER_BY_ID, THEME_SETTING, UPDATE_THEME_SETTING, UPDATE_USER } from "../../globals";
import Breadcrumb from "../../components/Common/Breadcrumb";

class ThemeSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Dashboard", link: process.env.PUBLIC_URL + "/Dashboard" },
                { title: "Theme Setting", link: process.env.PUBLIC_URL + "/#" },
            ],

            selectedFiles: [],
            getById: {},
            inputMobileField: "",
            isLoading: false,
            isAadharBase64URL: "",
            isloginlogourl: "",
            isFavIconURL: "",
            fileData: null,
            fileData1: null,
            fileData2: null,
            mobile: "",
            Night: "",
            morning: "",
            id: "",
            timeZones: [
                "Africa / Abidjan",
                "Africa / Algiers",
                "Africa / Bissau",
                "Africa / Cairo",
                "Africa / Casablanca",
                "Africa / Ceuta",
                "Africa / El_Aaiun",
                "Africa / Johannesburg",
                "Africa / Juba",
                "Africa / Khartoum",
                "Africa / Lagos",
                "Africa / Maputo",
                "Africa / Monrovia",
                "Africa / Nairobi",
                "Africa / Ndjamena",
                "Africa / Sao_Tome",
                "Africa / Tripoli",
                "Africa / Tunis",
                "Africa / Windhoek",
                "America / Adak",
                "America / Anchorage",
                "America / Araguaina",
                "America / Argentina / Buenos_Aires",
                "America / Argentina / Catamarca",
                "America / Argentina / Cordoba",
                "America / Argentina / Jujuy",
                "America / Argentina / La_Rioja",
                "America / Argentina / Mendoza",
                "America / Argentina / Rio_Gallegos",
                "America / Argentina / Salta",
                "America / Argentina / San_Juan",
                "America / Argentina / San_Luis",
                "America / Argentina / Tucuman",
                "America / Argentina / Ushuaia",
                "America / Asuncion",
                "America / Bahia",
                "America / Bahia_Banderas",
                "America / Barbados",
                "America / Belem",
                "America / Belize",
                "America / Boa_Vista",
                "America / Bogota",
                "America / Boise",
                "America / Cambridge_Bay",
                "America / Campo_Grande",
                "America / Cancun",
                "America / Caracas",
                "America / Cayenne",
                "America / Chicago",
                "America / Chihuahua",
                "America / Ciudad_Juarez",
                "America / Costa_Rica",
                "America / Cuiaba",
                "America / Danmarkshavn",
                "America / Dawson",
                "America / Dawson_Creek",
                "America / Denver",
                "America / Detroit",
                "America / Edmonton",
                "America / Eirunepe",
                "America / El_Salvador",
                "America / Fort_Nelson",
                "America / Fortaleza",
                "America / Glace_Bay",
                "America / Goose_Bay",
                "America / Grand_Turk",
                "America / Guatemala",
                "America / Guayaquil",
                "America / Guyana",
                "America / Halifax",
                "America / Havana",
                "America / Hermosillo",
                "America / Indiana / Indianapolis",
                "America / Indiana / Knox",
                "America / Indiana / Marengo",
                "America / Indiana / Petersburg",
                "America / Indiana / Tell_City",
                "America / Indiana / Vevay",
                "America / Indiana / Vincennes",
                "America / Indiana / Winamac",
                "America / Inuvik",
                "America / Iqaluit",
                "America / Jamaica",
                "America / Juneau",
                "America / Kentucky / Louisville",
                "America / Kentucky / Monticello",
                "America / La_Paz",
                "America / Lima",
                "America / Los_Angeles",
                "America / Maceio",
                "America / Managua",
                "America / Manaus",
                "America / Martinique",
                "America / Matamoros",
                "America / Mazatlan",
                "America / Menominee",
                "America / Merida",
                "America / Metlakatla",
                "America / Mexico_City",
                "America / Miquelon",
                "America / Moncton",
                "America / Monterrey",
                "America / Montevideo",
                "America / New_York",
                "America / Nome",
                "America / Noronha",
                "America / North_Dakota / Beulah",
                "America / North_Dakota / Center",
                "America / North_Dakota / New_Salem",
                "America / Nuuk",
                "America / Ojinaga",
                "America / Panama",
                "America / Paramaribo",
                "America / Phoenix",
                "America / Port, - au - Prince",
                "America / Porto_Velho",
                "America / Puerto_Rico",
                "America / Punta_Arenas",
                "America / Rankin_Inlet",
                "America / Recife",
                "America / Regina",
                "America / Resolute",
                "America / Rio_Branco",
                "America / Santarem",
                "America / Santiago",
                "America / Santo_Domingo",
                "America / Sao_Paulo",
                "America / Scoresbysund",
                "America / Sitka",
                "America / St_Johns",
                "America / Swift_Current",
                "America / Tegucigalpa",
                "America / Thule",
                "America / Tijuana",
                "America / Toronto",
                "America / Vancouver",
                "America / Whitehorse",
                "America / Winnipeg",
                "America / Yakutat",
                "Antarctica / Casey",
                "Antarctica / Davis",
                "Antarctica / Macquarie",
                "Antarctica / Mawson",
                "Antarctica / Palmer",
                "Antarctica / Rothera",
                "Antarctica / Troll",
                "Asia / Almaty",
                "Asia / Amman",
                "Asia / Anadyr",
                "Asia / Aqtau",
                "Asia / Aqtobe",
                "Asia / Ashgabat",
                "Asia / Atyrau",
                "Asia / Baghdad",
                "Asia / Baku",
                "Asia / Bangkok",
                "Asia / Barnaul",
                "Asia / Beirut",
                "Asia / Bishkek",
                "Asia / Chita",
                "Asia / Choibalsan",
                "Asia / Colombo",
                "Asia / Damascus",
                "Asia / Dhaka",
                "Asia / Dili",
                "Asia / Dubai",
                "Asia / Dushanbe",
                "Asia / Famagusta",
                "Asia / Gaza",
                "Asia / Hebron",
                "Asia / Ho_Chi_Minh",
                "Asia / Hong_Kong",
                "Asia / Hovd",
                "Asia / Irkutsk",
                "Asia / Jakarta",
                "Asia / Jayapura",
                "Asia / Jerusalem",
                "Asia / Kabul",
                "Asia / Kamchatka",
                "Asia / Karachi",
                "Asia / Kathmandu",
                "Asia / Khandyga",
                "Asia / Kolkata",
                "Asia / Krasnoyarsk",
                "Asia / Kuching",
                "Asia / Macau",
                "Asia / Magadan",
                "Asia / Makassar",
                "Asia / Manila",
                "Asia / Nicosia",
                "Asia / Novokuznetsk",
                "Asia / Novosibirsk",
                "Asia / Omsk",
                "Asia / Oral",
                "Asia / Pontianak",
                "Asia / Pyongyang",
                "Asia / Qatar",
                "Asia / Qostanay",
                "Asia / Qyzylorda",
                "Asia / Riyadh",
                "Asia / Sakhalin",
                "Asia / Samarkand",
                "Asia / Seoul",
                "Asia / Shanghai",
                "Asia / Singapore",
                "Asia / Srednekolymsk",
                "Asia / Taipei",
                "Asia / Tashkent",
                "Asia / Tbilisi",
                "Asia / Tehran",
                "Asia / Thimphu",
                "Asia / Tokyo",
                "Asia / Tomsk",
                "Asia / Ulaanbaatar",
                "Asia / Urumqi",
                "Asia / Ust - Nera",
                "Asia / Vladivostok",
                "Asia / Yakutsk",
                "Asia / Yangon",
                "Asia / Yekaterinburg",
                "Asia / Yerevan",
                "Atlantic / Azores",
                "Atlantic / Bermuda",
                "Atlantic / Canary",
                "Atlantic / Cape_Verde",
                "Atlantic / Faroe",
                "Atlantic / Madeira",
                "Atlantic / South_Georgia",
                "Atlantic / Stanley",
                "Australia / Adelaide",
                "Australia / Brisbane",
                "Australia / Broken_Hill",
                "Australia / Darwin",
                "Australia / Eucla",
                "Australia / Hobart",
                "Australia / Lindeman",
                "Australia / Lord_Howe",
                "Australia / Melbourne",
                "Australia / Perth",
                "Australia / Sydney",
                "Europe / Andorra",
                "Europe / Astrakhan",
                "Europe / Athens",
                "Europe / Belgrade",
                "Europe / Berlin",
                "Europe / Brussels",
                "Europe / Bucharest",
                "Europe / Budapest",
                "Europe / Chisinau",
                "Europe / Dublin",
                "Europe / Gibraltar",
                "Europe / Helsinki",
                "Europe / Istanbul",
                "Europe / Kaliningrad",
                "Europe / Kirov",
                "Europe / Kyiv",
                "Europe / Lisbon",
                "Europe / London",
                "Europe / Madrid",
                "Europe / Malta",
                "Europe / Minsk",
                "Europe / Moscow",
                "Europe / Paris",
                "Europe / Prague",
                "Europe / Riga",
                "Europe / Rome",
                "Europe / Samara",
                "Europe / Saratov",
                "Europe / Simferopol",
                "Europe / Sofia",
                "Europe / Tallinn",
                "Europe / Tirane",
                "Europe / Ulyanovsk",
                "Europe / Vienna",
                "Europe / Vilnius",
                "Europe / Volgograd",
                "Europe / Warsaw",
                "Europe / Zurich",
                "Indian / Chagos",
                "Indian / Maldives",
                "Indian / Mauritius",
                "Pacific / Apia",
                "Pacific / Auckland",
                "Pacific / Bougainville",
                "Pacific / Chatham",
                "Pacific / Easter",
                "Pacific / Efate",
                "Pacific / Fakaofo",
                "Pacific / Fiji",
                "Pacific / Galapagos",
                "Pacific / Gambier",
                "Pacific / Guadalcanal",
                "Pacific / Guam",
                "Pacific / Honolulu",
                "Pacific / Kanton",
                "Pacific / Kiritimati",
                "Pacific / Kosrae",
                "Pacific / Kwajalein",
                "Pacific / Marquesas",
                "Pacific / Nauru",
                "Pacific / Niue",
                "Pacific / Norfolk",
                "Pacific / Noumea",
                "Pacific / Pago_Pago",
                "Pacific / Palau",
                "Pacific / Pitcairn",
                "Pacific / Port_Moresby",
                "Pacific / Rarotonga",
                "Pacific / Tahiti",
                "Pacific / Tarawa",
                "Pacific / Tongatapu",
            ]
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    };


    handleAcceptedFiles = (files) => {
        this.getBase64Icon(files);
        files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),

            })
        );
        this.setState({ selectedFiles: files });
    };

    async getBase64Icon(files) {
        const file = files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const base64Data = reader.result;
                let base64Split = base64Data.split(",");
                const Img = base64Split[1];
                this.setState({ Img: Img });
            };

            reader.onerror = (error) => {
                console.error("Error occurred while reading the file:", error);
            };
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
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(
                THEME_SETTING,
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
                                getById: data.data[0],
                                isAadharBase64URL: data.data[0].logo,
                                isloginlogourl: data.data[0].loginscreen_logo,
                                isFavIconURL: data.data[0].favicon,
                                inputMobileField: data.data[0].mobile

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
        }
    }

    // CREATE USER API
    handleSubmit(event, values) {
        this.setState({
            isLoading: true,
        });
        var Token = localStorage.getItem("userToken");
        try {
            fetch(UPDATE_THEME_SETTING + this.state.getById.id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    logo_encode: this.state.isAadharBase64URL.split(",")?.[1],
                    favicon_encode: this.state.isFavIconURL.split(",")?.[1],
                    loginscreen_logo_encode: this.state.isloginlogourl.split(",")?.[1],
                    description: values.description,
                    mobile: this.state.inputMobileField,
                    email: values.email,
                    address: values.address,
                    mailer: values.mailer,
                    mailpath: values.mailpath,
                    smtphost: values.smtp,
                    smtpemail: values.smtpmail,
                    smtppassword: values.smtppassword,
                    port: values.port,
                    ssl_tls_type: values.ssltsltype,
                    recaptcha_key: values.recaptchakey,
                    recaptcha_secret: values.recaptchasecret,
                    image_api_url: values.imageapiurl,
                    sms_otp_api_key: values.smsotpapikey,
                    employee_leave_allow_afterdays: values.leaveallow,
                    date_format: values.dateformat,
                    timezone: values.timezone,
                    currency: values.currency
                    // sick_leave: values.sickleave,
                    // casual_leave: values.casualleave,
                    // privilege_leave: values.priviledgeleave,
                    // half_day_leave: values.halfdayleave,
                    // sort_leave: values.shortleave
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.result === true) {
                        toast("Theme Setting Updated Successfully !", {
                            type: "success",
                        });

                        this.GetThemesetting();
                        this.props.history.push(process.env.PUBLIC_URL + "/themesetting");
                        // this.props.history.goBack();
                        this.setState({
                            isLoading: false,
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
            toast("Unable To Update Theme Setting", {
                type: "error",
            });
            this.setState({
                isLoading: false,
            });

        }
    }

    // Callback function to handle file data
    handleFileDataChange = (file) => {
        this.setState({ fileData: file });
    };

    handleAadharBase64DataChange = (base64) => {
        this.setState({ isAadharBase64URL: base64 });
    };

    // Callback function to handle file data
    handleFileDataChange1 = (file) => {
        this.setState({ fileData1: file });
    };

    handleAadharBase64DataChange1 = (base64) => {
        this.setState({ isFavIconURL: base64 });
    };

    // Callback function to handle file data
    handleFileDataChange2 = (file) => {
        this.setState({ fileData2: file });
    };

    handleAadharBase64DataChange2 = (base64) => {
        this.setState({ isloginlogourl: base64 });
    };

    render() {
        const { isAadharBase64URL, fileData } = this.state;
        const { isFavIconURL, fileData1 } = this.state;
        const { isloginlogourl, fileData2 } = this.state;
        const { isView } = this.props;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Theme Setting" breadcrumbItems={this.state.breadcrumbItems} />
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
                                        onValidSubmit={this.handleSubmit}
                                    // onSubmit={this.submitStep1}
                                    >
                                        <Row className="mt-2">

                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Name
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.name}
                                                    name="name"
                                                    placeholder="Name"
                                                    type="text"
                                                    errorMessage="Please Provide Name"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom007"
                                                    >
                                                        Mobile
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <Row>
                                                        <Col md="12">
                                                            <PhoneInput
                                                                value={this.state.getById.mobile}
                                                                name="mobile"
                                                                placeholder=""
                                                                // country={"in"}
                                                                enableSearch={true}
                                                                errorMessage=" Please provide a Number"
                                                                id="validationCustom007"
                                                                validate={{
                                                                    required: {
                                                                        value: true
                                                                    },
                                                                }}

                                                                inputStyle={{ width: "100%" }}
                                                                style={{
                                                                    borderRadius: 50,
                                                                }}
                                                                // onChange={(phone) => alert(phone)}
                                                                inputProps={{
                                                                    name: 'mobile',
                                                                    required: true,

                                                                }}
                                                                onChange={(phone) => {
                                                                    this.setState({
                                                                        inputMobileField: phone,
                                                                    });
                                                                    // }
                                                                    // inputWhatsappField: phone,
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        E-Mail
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.email}
                                                        name="email"
                                                        placeholder="E-Mail"
                                                        type="email"
                                                        errorMessage="Please provide a valid E-Mail."
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div></Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Mailer
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.mailer}
                                                    name="mailer"
                                                    placeholder="Mailer"
                                                    type="text"
                                                    errorMessage="Please provide a valid Mailer"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Mail Path
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.mailpath}
                                                    name="mailpath"
                                                    placeholder="Mail Path"
                                                    type="text"
                                                    errorMessage="Please provide a valid Mail Path"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col>

                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom02"
                                                    >
                                                        Port
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label >
                                                    <AvField
                                                        value={this.state.getById.port}
                                                        name="port"
                                                        placeholder="Port"
                                                        type="text"
                                                        errorMessage="Please provide a valid Port"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom02"
                                                    />
                                                </div >
                                            </Col >
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Recaptcha Key
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.recaptcha_key}
                                                        name="recaptchakey"
                                                        placeholder="Recaptcha Key"
                                                        type="text"
                                                        errorMessage="Please provide a valid Recaptcha Key."
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Recaptcha Secret
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.recaptcha_secret}
                                                        name="recaptchasecret"
                                                        placeholder="Recaptcha Secret"
                                                        type="text"
                                                        errorMessage="Please provide a valid Recaptcha Secret."
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Image Url
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.image_api_url}
                                                        name="imageapiurl"
                                                        placeholder="Image Url"
                                                        type="text"
                                                        errorMessage="Please provide a valid Image Url."
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Time-zone
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.timezone}
                                                        name="timezone"
                                                        placeholder="Time-zone"
                                                        type="select"
                                                        errorMessage="Please provide a valid Time-zone."
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    >
                                                        {this.state.timeZones.map((timeZone) => (
                                                            <option key={timeZone} value={timeZone}>
                                                                {timeZone}
                                                            </option>
                                                        ))}
                                                    </AvField>
                                                </div>
                                            </Col>
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Date Format
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.date_format}
                                                        name="dateformat"
                                                        placeholder="Date Format"
                                                        type="select"
                                                        errorMessage="Please provide a valid Date Format."
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    >
                                                        <option value={"Select Date Format"}>Select Date Format</option>
                                                        <option value={"d-m-y"}>d-m-y</option>
                                                        <option value={"dd-mm-yyyy"}>dd-mm-yyyy</option>
                                                        <option value={"mm-dd-yyyy"}>mm-dd-yyyy</option>
                                                        <option value={"yyyy-mm-dd"}>yyyy-mm-dd</option>
                                                    </AvField>
                                                </div>
                                            </Col>
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Currency
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.currency}
                                                        name="currency"
                                                        placeholder="Currency"
                                                        type="select"
                                                        errorMessage="Please provide a valid Currency."
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    >
                                                        <option value={"Select Currency"}>Select Currency</option>
                                                        <option value={"$"}>$</option>
                                                        <option value={"₹"}>₹</option>
                                                    </AvField>
                                                </div>
                                            </Col>
                                        </Row >
                                        <Row>
                                            <Col lg="3">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Smtp Host
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.smtphost}
                                                    name="smtp"
                                                    placeholder="Smtp Host"
                                                    type="text"
                                                    errorMessage="Please Provide Smtp Host"
                                                    className="form-control"
                                                    validate={{ required: { value: true } }}
                                                    id="validationCustom01"
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Smtp E-Mail
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.smtpemail}
                                                        name="smtpmail"
                                                        placeholder="Smtp E-Mail"
                                                        type="email"
                                                        errorMessage="Please provide a valid Smtp E-Mail."
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom02"
                                                    >
                                                        Smtp Password
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label >
                                                    <AvField
                                                        value={this.state.getById.smtppassword}
                                                        name="smtppassword"
                                                        placeholder="Smtp Password"
                                                        type="text"
                                                        errorMessage="Please provide a valid Smtp Password"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom02"
                                                    />
                                                </div >
                                            </Col >
                                            <Col lg="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Sms Otp Api Key
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.sms_otp_api_key}
                                                        name="smsotpapikey"
                                                        placeholder="SMS Otp Api Key"
                                                        type="text"
                                                        errorMessage="Please provide a valid Sms Otp Api Key"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg="3" className="d-inline">
                                                <Label
                                                    className="form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Type
                                                    <span style={{ color: "#ff0000" }}>*</span>
                                                </Label>
                                                <AvField
                                                    value={this.state.getById.ssl_tls_type}
                                                    name="ssltsltype"
                                                    type="select"
                                                    id="validationCustom02"
                                                    required
                                                    errorMessage=" Please Select Item Sub-Category"
                                                    defaultValue={"language"}
                                                    className="form-control"
                                                >
                                                    <option value={""}>Select Type</option>
                                                    <option value={"ssl"}>SSL</option>
                                                    <option value={"tsl"}>TSL</option>

                                                </AvField>
                                                {this.state.error && (
                                                    <div style={{ color: "red" }}>{this.state.error}</div>
                                                )}
                                            </Col>
                                            <Row>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Description
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            value={this.state.getById.description}
                                                            name="description"
                                                            placeholder="Description"
                                                            type="textarea"
                                                            errorMessage="Please provide a valid Description"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom02"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="validationCustom01"
                                                        >
                                                            Address
                                                            <span style={{ color: "#ff0000" }}>*</span>
                                                        </Label>
                                                        <AvField
                                                            value={this.state.getById.address}
                                                            name="address"
                                                            placeholder="Address"
                                                            type="textarea"
                                                            errorMessage="Please provide a valid Address"
                                                            className="form-control"
                                                            validate={{ required: { value: true } }}
                                                            id="validationCustom02"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Row>

                                        <h5 className="mt-3 p-1 border-bottom">Employee Leave Policy</h5>
                                        <Row >
                                            <Col md="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        After Leave Count Days
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.employee_leave_allow_afterdays}
                                                        name="leaveallow"
                                                        placeholder="Sick Leave"
                                                        type="number"
                                                        errorMessage="Please provide a valid After Leave Count Days"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div>
                                            </Col>
                                            {/* <Col md="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Sick Leave
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.sick_leave}
                                                        name="sickleave"
                                                        placeholder="Sick Leave"
                                                        type="number"
                                                        errorMessage="Please provide a valid Sick Leave"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Casual Leave
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.casual_leave}
                                                        name="casualleave"
                                                        placeholder="Casual Leave"
                                                        type="number"
                                                        errorMessage="Please provide a valid Casual Leave"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Priviledge Leave
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.privilege_leave}
                                                        name="priviledgeleave"
                                                        placeholder="Priviledge Leave"
                                                        type="number"
                                                        errorMessage="Please provide a valid Priviledge Leave"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Half Day Leave
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.half_day_leave}
                                                        name="halfdayleave"
                                                        placeholder="Half Day Leave"
                                                        type="number"
                                                        errorMessage="Please provide a valid Half Day Leave"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="3">
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="validationCustom04"
                                                    >
                                                        Short Leave
                                                        <span style={{ color: "#ff0000" }}>*</span>
                                                    </Label>
                                                    <AvField
                                                        value={this.state.getById.sort_leave}
                                                        name="shortleave"
                                                        placeholder="Short Leave"
                                                        type="number"
                                                        errorMessage="Please provide a valid Short Leave"
                                                        className="form-control"
                                                        validate={{ required: { value: true } }}
                                                        id="validationCustom04"
                                                    />
                                                </div>
                                            </Col> */}
                                        </Row>
                                        <Row className="mt-3 mb-3">
                                            <Col lg="3">
                                                <Label className="form-label" htmlFor="validationCustom04">
                                                    Logo
                                                </Label>
                                                <CustomFileInputNew
                                                    onDataChange={this.handleFileDataChange}
                                                    onBase64Change={this.handleAadharBase64DataChange}
                                                    defaultFile={isAadharBase64URL}
                                                // isView={isView}
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label className="form-label" htmlFor="validationCustom04">
                                                    Login Logo
                                                </Label>
                                                <CustomFileInputNew
                                                    onDataChange={this.handleFileDataChange2}
                                                    onBase64Change={this.handleAadharBase64DataChange2}
                                                    defaultFile={isloginlogourl}
                                                // isView={isView}
                                                />
                                            </Col>
                                            <Col lg="3">
                                                <Label className="form-label" htmlFor="validationCustom04">
                                                    Favicon
                                                </Label>
                                                <CustomFileInputNew
                                                    onDataChange={this.handleFileDataChange1}
                                                    onBase64Change={this.handleAadharBase64DataChange1}
                                                    defaultFile={isFavIconURL}
                                                // isView={isView}
                                                />
                                            </Col>
                                        </Row>
                                        <Button color="primary" type="submit" >
                                            Update
                                        </Button>
                                        <Button
                                            color="secondary"
                                            className="mx-2"
                                            onClick={() => this.props.history.goBack()}>
                                            Cancel
                                        </Button>
                                    </AvForm >
                                </CardBody >
                            </Card >
                        )}
                    </Container>
                </div >
            </React.Fragment >
        );
    };
};
export default ThemeSetting;
