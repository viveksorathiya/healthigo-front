import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

const Food = ({ weather }) => {
	const [foods, setFoods] = useState([]);
	const [type, setType] = useState("");

	useEffect(() => {
		const time = Date.now();
		const hour = new Date().getHours();

		if (hour < 11) {
			setType("Breakfast");
		} else if (hour > 11 && hour < 15) {
			setType("Lunch");
		} else if (hour > 15 && hour < 19) {
			setType("Tea");
		} else {
			setType("Dinner");
		}

		if (weather !== "") {
			axios
				.get(`https://api-healthigo.herokuapp.com/api//${time}`)
				.then((res) => {
					setFoods(res.data);
				})
				.catch((err) => {});
		}

		return () => {};
	}, [weather]);

	const getData = (type) => {
		switch (type) {
			case "Breakfast":
				return "BreakFast Time | Milk: ~100ml, Sugar: ~15g, Cereals: ~70g, Pulses: ~20g, Meat/Egg/Seafood: ~50g";
			case "Lunch":
				return "Lunch Time | Milk: ~100ml, Cereals: ~120g, Vegetables: ~200g, Pulses: ~20g, Meat/Egg/Seafood: ~50g";
			case "Tea":
				return "Tea Time | Milk: ~50ml, Fruit: 100g";
			case "Dinner":
				return "Dinner Time | Milk: ~50ml, Cereals: ~120g, Vegetables: ~150g, Pulses: ~20g, Meat/Egg/Seafood: ~50g";
			default: return ''
		}
	};

	return (
		<div className="food_container">
		<h5>{getData(type)}</h5>	
<h1>Curated Suggestions For You</h1>
			
			{foods.length !== 0 ? (
				<div className="grid">
					{foods.map((food) => (
						<div key={food._id} className="grid-item">
							<div className="image">
								<img src={food.image} alt={food.title} />
							</div>
							<h3 className="title">{food.title}</h3>
							<span className="category">{food.category}</span>
						</div>
					))}
				</div>
			) : (
				<>
					<h3>Cooking new suggestions...</h3>
					<h4>Please allow location access...</h4>
				</>
			)}
			<br/>
			<br/>
			<br/>
		</div>
	);
};

export default Food;
