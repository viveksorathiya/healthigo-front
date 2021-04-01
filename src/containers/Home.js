import React, { useState, useEffect } from "react";
import Weather from "../components/Weather";
import Food from "../components/Food";
import Navbar from "../components/Navbar";
import Ticker from "../components/Ticker";
import axios from "axios";
import "./Home.css";

const Home = () => {
	const [lat, setLat] = useState("");
	const [long, setLong] = useState("");
	const [location, setLocation] = useState("");
	const [weather, setWeather] = useState("");
	const [city, SetCity] = useState("");
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLat(position.coords.latitude);
				setLong(position.coords.longitude);
			},
			(err) => {},
			{ enableHighAccuracy: true }
		);
		return () => {};
	}, []);

	useEffect(() => {
		if (lat !== "" && long !== "") {
			axios
				.get(
					`https://api.weatherapi.com/v1/current.json?key=6de79738779f43db88760324213003&q=${lat},${long}&aqi=no`
				)
				.then((res) => {
					setWeather(res.data.current);
					setLocation(res.data.location);
				})
				.catch((err) => {});
		}
		return () => {};
	}, [lat, long, city]);

	return (
		<>
			<Navbar />
			<div className="container">
				<Weather weather={weather} location={location} />
				<Food weather={weather} />
			</div>
			<Ticker />
		</>
	);
};

export default Home;
