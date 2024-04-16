import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Components
import MiniWidgets from "./MiniWidgets";
import RevenueAnalytics from "./RevenueAnalytics";
import SalesAnalytics from "./SalesAnalytics";
import EarningReports from "./EarningReports";
import Sources from "./Sources";
import RecentlyActivity from "./RecentlyActivity";
import RevenueByLocations from "./RevenueByLocations";
import ChatBox from "./ChatBox";
import LatestTransactions from "./LatestTransactions";
import { logDOM } from "@testing-library/react";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Parasmani", link: process.env.PUBLIC_URL + "/dashboard" },
                { title: "Dashboard", link: process.env.PUBLIC_URL + "/dashboard" },
            ],
            reports: [
                { icon: "ri-stack-line", title: "Number of Sales", value: "1452", rate: "2.4%", desc: "From previous period" },
                { icon: "ri-store-2-line", title: "Sales Revenue", value: "$ 38452", rate: "2.4%", desc: "From previous period" },
                { icon: "ri-briefcase-4-line", title: "Average Price", value: "$ 15.4", rate: "2.4%", desc: "From previous period" },
            ]
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* <Breadcrumbs title="Dashboard" breadcrumbItems={this.state.breadcrumbItems} /> */}
                        <Row>
                            <Col xl={8}>
                                <Row>
                                    <h3><b> Welcome to Dashboard</b></h3>
                                    {/* <MiniWidgets reports={this.state.reports} /> */}
                                </Row>
                                {/* revenue Analytics */}
                                {/* <RevenueAnalytics /> */}
                            </Col>

                            <Col xl={4}>
                                {/* sales Analytics */}
                                {/* <SalesAnalytics/> */}

                                {/* earning reports */}
                                {/* <EarningReports/> */}
                            </Col>
                        </Row>

                        <Row>
                            {/* sources */}
                            {/* <Sources/> */}

                            {/* recent activity */}
                            {/* <RecentlyActivity/> */}

                            {/* revenue by locations */}
                            {/* <RevenueByLocations/> */}
                        </Row>

                        <Row>
                            {/* chat box */}
                            {/* <ChatBox/> */}

                            {/* latest transactions */}
                            {/* <LatestTransactions/> */}
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
