import React, { useState, useEffect } from "react";
import Weather from "../components/Weather";
import Food from "../components/Food";
import Navbar from "../components/Navbar";
import Ticker from "../components/Ticker";
import {
	Dialog as MUIDialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Button,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { LocationSearching } from "@material-ui/icons";
import axios from "axios";
import "./Home.css";

const Home = () => {
	const [lat, setLat] = useState("");
	const [long, setLong] = useState("");
	const [location, setLocation] = useState("");
	const [weather, setWeather] = useState("");
	const [city, setCity] = useState("");

	const [open, setOpen] = React.useState(true);
	const [locations, setLocations] = React.useState([]);

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = () => {
		setOpen(true);
	};

	const handleSubmit = () => {
		axios
			.get(
				`https://api.weatherapi.com/v1/current.json?key=6de79738779f43db88760324213003&q=${city}&aqi=no`
			)
			.then((res) => {
				setWeather(res.data.current);
				setLocation(res.data.location);
			})
			.catch((err) => {});
		handleClose();
	};

	const fetchLocation = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLat(position.coords.latitude);
				setLong(position.coords.longitude);
			},
			(err) => {},
			{ enableHighAccuracy: true }
		);
		handleClose();
	};

	const handleChange = (e) => {
		axios
			.get(
				`https://api.weatherapi.com/v1/search.json?key=6de79738779f43db88760324213003&q=${e.target.value}`
			)
			.then((res) => {
				setLocations(res.data);
			})
			.catch((err) => {});
	};

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
	}, [lat, long]);

	return (
		<>
			<MUIDialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Search Location</DialogTitle>
				<DialogContent>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}>
						<Autocomplete
							id="country-select-demo"
							style={{ width: 300 }}
							options={locations}
							autoHighlight
							getOptionLabel={(option) => option.name}
							renderOption={(option) => option.name}
							onInputChange={(e, value) => {
								setCity(value);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Search"
									variant="outlined"
									onChange={handleChange}
								/>
							)}
						/>
						<LocationSearching onClick={fetchLocation} style={{ margin: 10 }} />
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Ok</Button>
				</DialogActions>
			</MUIDialog>
			<Navbar />
			<div className="container">
				<Weather
					weather={weather}
					location={location}
					handleEdit={handleEdit}
				/>
				<Food weather={weather} />
			</div>
			<Ticker />
		</>
	);
};

export default Home;
