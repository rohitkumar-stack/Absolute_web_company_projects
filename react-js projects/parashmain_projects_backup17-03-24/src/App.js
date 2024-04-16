import React, { Component } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

//Fake backend
import fakeBackend from './helpers/AuthType/fakeBackend';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { GET_LOGO } from "./globals";
//Firebase helper
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// Activating fake backend
fakeBackend();

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_APIKEY,
// 	authDomain: process.env.REACT_APP_AUTHDOMAIN,
// 	databaseURL: process.env.REACT_APP_DATABASEURL,
// 	projectId: process.env.REACT_APP_PROJECTID,
// 	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
// 	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
// 	appId: process.env.REACT_APP_APPID,
// 	measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getLayout = this.getLayout.bind(this);
	}

	async componentDidMount() {
		this.FetchLogo();
	}

	async FetchLogo() {
		try {
			fetch(GET_LOGO, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}).then((response) => {
				response.json().then((data) => {
					this.setFavicon(data?.data[0]?.favicon);
				});
			});
		} catch (error) {

		}

	}
	setFavicon(url) {
		let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		link.href = url;

		document.getElementsByTagName('head')[0].appendChild(link);
	}
	componentWillUnmount() {
		const link = document.querySelector("link[rel*='icon']");
		if (link) {
			document.getElementsByTagName('head')[0].removeChild(link);
		}
	}

	/**
   * Returns the layout
   */
	getLayout = () => {
		let layoutCls = VerticalLayout;

		switch (this.props.layout.layoutType) {
			case "horizontal":
				layoutCls = HorizontalLayout;
				break;
			default:
				layoutCls = VerticalLayout;
				break;
		}
		return layoutCls;
	};



	render() {
		const Layout = this.getLayout();

		return (
			<React.Fragment>
				<Router>
					<Switch>
						{publicRoutes.map((route, idx) => (
							<AppRoute
								path={route.path}
								layout={NonAuthLayout}
								component={route.component}
								key={idx}
								isAuthProtected={false}
							/>
						))}

						{authProtectedRoutes.map((route, idx) => (
							<AppRoute
								path={route.path}
								layout={Layout}
								component={route.component}
								key={idx}
								isAuthProtected={true}
							/>
						))}
					</Switch>
					<ToastContainer />
				</Router>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		layout: state.Layout
	};
};


export default connect(mapStateToProps, null)(App);
