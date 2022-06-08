import React, {useState, useEffect} from "react";
import LTAAPI from "../API/LTAAPI";
import {Route, NavLink} from "react-router-dom";
import CarList from "./CarList";
//import CarMap from "./CarMap";
import SearchCarpark from "./SearchCarpark";

const Car = () => {
    const [carParkInfo, setCarParkInfo] = useState([]);
    const [carparkList, setCarParkList] = useState([]);
    const [carParkLocation, setCarParkLocation] = useState([]);
    const [availableLots, setAvailableLots] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await LTAAPI.get("/CarParkAvailabilityv2");
                setCarParkList(response.data.value);
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
        <h1>Carpark Availability</h1>
        <SearchCarpark/>
        <button>List</button>
        <button>Map</button>
        <CarList
            carparkList={carparkList}
        
        />
        </div>
    )
}

export default Car;