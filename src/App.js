import React from "react";
import Home from "./containers/Home";
import {Helmet} from 'react-helmet'

const App = () => {

	return (
		<div>
			<Helmet>
				<meta charSet="utf-8" />
				<title>HealthiGo</title>
				<meta
					name="description"
					content="Get food suggestions based on weather"
				/>
			</Helmet>
			<Home />
		</div>
	);
};

export default App;
