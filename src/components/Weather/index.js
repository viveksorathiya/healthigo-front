import React from "react";
import "./styles.css";
// import weather from 'weather-js'

const Weather = ({ weather, location }) => {
	const getImage = (code) => {
		switch (code) {
			case 1000:
				if (weather.condition.text === "Clear") {
					return "/moon.png";
				}
				return "/sun.png";
			case 1003:
				return "/cloudy-day.png";
			case 1006:
				return "/cloudy.png";
			case 1009:
				return "/cloudy.png";
			case 1030:
				return "/cloudy.png";
			case 1063:
				return "/rainy.png";
			case 1066:
				return "/snowflake.png";
			case 1069:
				return "/rainy.png";
			case 1072:
				return "/snowflake.png";
			case 1087:
				return "/storm.png";
			case 1114:
				return "/snowflake.png";
			case 1117:
				return "/snowflake.png";
			case 1135:
				return "/storm.png";
			case 1147:
				return "/storm.png";
			case 1150:
				return "/rainy.png";
			case 1153:
				return "/rainy.png";
			case 1168:
				return "/snowflake.png";
			case 1171:
				return "/snowflake.png";
			case 1180:
				return "/rainy.png";
			case 1183:
				return "/rainy.png";
			case 1186:
				return "/rainy.png";
			case 1192:
				return "/rainy.png";
			case 1195:
				return "/rainy.png";
			case 1198:
				return "/rainy.png";
			case 1201:
				return "/rainy.png";
			case 1204:
				return "/rainy.png";
			default:
				return "";
		}
	};
	const renderWeather = () => {
		if (weather !== "") {
			return (
				<>
					<div className="weather_header">
						<h2>{location.name}</h2>
						<h1>{weather.temp_c}° C</h1>
						<h3>{weather.condition.text}</h3>
					</div>
					<div className="weather_display">
						<img
							className="display_image"
							src={getImage(weather.condition.code)}
							alt=""
						/>
					</div>
				</>
			);
		}
		return <div></div>;
	};

	return (
		<div
			className={
				weather.is_day === 0 ? "weather_container night" : "weather_container"
			}>
			{renderWeather()}
		</div>
	);
};

export default Weather;
