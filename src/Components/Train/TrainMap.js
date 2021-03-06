import React, { useState, useEffect, useRef } from "react";
import {
  Map,
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import mrtdata from "./data/TrainStation.json";
import axios from "axios";
import orangepin from "./data/orange.png";
import bluepin from "./data/blue.png";
import greenpin from "./data/green.png";
import greypin from "./data/grey.png";
import purplepin from "./data/purple.png";
import redpin from "./data/red.png";
import LTAAPI from "../API/LTAAPI";
import { nanoid } from "nanoid";

function TrainMap({ selectedValue }) {
  // const [Traindensity, setTraindensity] = useState([]);
  // const listTraindensity = async () => {
  //   const { data } = await LTAAPI.get("/PCDRealTime", { params: { TrainLine: selectedValue } });
  //   setTraindensity(data.value);
  // };
  // useEffect(() => {
  //   listTraindensity()
  // }, []);
  // Data Extraction from LTA
  const [TraindensityCCL, setTraindensityCCL] = useState([]);
  const [TraindensityCEL, setTraindensityCEL] = useState([]);
  const [TraindensityCGL, setTraindensityCGL] = useState([]);
  const [TraindensityDTL, setTraindensityDTL] = useState([]);
  const [TraindensityEWL, setTraindensityEWL] = useState([]);
  const [TraindensityNEL, setTraindensityNEL] = useState([]);
  const [TraindensityNSL, setTraindensityNSL] = useState([]);
  const [TraindensityBPL, setTraindensityBPL] = useState([]);
  const [TraindensitySLRT, setTraindensitySLRT] = useState([]);
  const [TraindensityPLRT, setTraindensityPLRT] = useState([]);

  const listTraindensityCCL = async () => {
    const { data } = await LTAAPI.get("/PCDRealTime", { params: { TrainLine: "CCL" } });
    setTraindensityCCL(data.value);
  };
  const listTraindensityCEL = async () => {
    const { data } = await LTAAPI.get("/PCDRealTime", { params: { TrainLine: "CEL" } });
    setTraindensityCEL(data.value);
  };
  const listTraindensityCGL = async () => {
    const { data } = await LTAAPI.get("/PCDRealTime", { params: { TrainLine: "CGL" } });
    setTraindensityCGL(data.value);
  };
  const listTraindensityDTL = async () => {
    const { data } = await LTAAPI.get("/PCDRealTime", { params: { TrainLine: "DTL" } });
    setTraindensityDTL(data.value);
  };
  const listTraindensityEWL = async () => {
    const { data } = await LTAAPI.get("/PCDRealTime", { params: { TrainLine: "EWL" } });
    setTraindensityEWL(data.value);
  };
  const listTraindensityNEL = async () => {
    const { data } = await LTAAPI.get("/PCDRealTime", { params: { TrainLine: "NEL" } });
    setTraindensityNEL(data.value);
  };
  const listTraindensityNSL = async () => {
    const { data } = await LTAAPI.get("/PCDRealTime", { params: { TrainLine: "NSL" } });
    setTraindensityNSL(data.value);
  };
  const listTraindensityBPL = async () => {
    const { data } = await LTAAPI.get("/PCDRealTime", { params: { TrainLine: "BPL" } });
    setTraindensityBPL(data.value);
  };
  const listTraindensitySLRT = async () => {
    const { data } = await LTAAPI.get("/PCDRealTime", { params: { TrainLine: "SLRT" } });
    setTraindensitySLRT(data.value);
  };
  const listTraindensityPLRT = async () => {
    const { data } = await LTAAPI.get("/PCDRealTime", { params: { TrainLine: "PLRT" } });
    setTraindensityPLRT(data.value);
  };

  useEffect(() => {
    listTraindensityCCL()
    listTraindensityCEL()
    listTraindensityCGL()
    listTraindensityDTL()
    listTraindensityEWL()
    listTraindensityNEL()
    listTraindensityNSL()
    listTraindensityBPL()
    listTraindensitySLRT()
    listTraindensityPLRT()
  }, []);

  const Traindensity = [...TraindensityCCL, ...TraindensityCEL, ...TraindensityCGL, ...TraindensityDTL, ...TraindensityEWL, ...TraindensityNEL, ...TraindensityNSL, ...TraindensityBPL, ...TraindensitySLRT, ...TraindensityPLRT]

  // console.log("Traindensity", Traindensity)

  // Combining GEOJSON and LTA Data
  const geodata2 = mrtdata.features;
  geodata2.forEach(element => {
    element.properties.LTA = ""
  });
  let sortedgeodata = []
  for (let i = 0; i < geodata2.length; i++) {
    for (let j = 0; j < Traindensity.length; j++) {
      if (geodata2[i].properties.STN_NO === Traindensity[j].Station) {
        sortedgeodata.push(geodata2[i]);
        const datalength = sortedgeodata.length - 1
        sortedgeodata[datalength].properties.LTA = Traindensity[j].CrowdLevel;
      }
    }
  }
  // console.log("sortedgeodata", sortedgeodata)

  //All Icons
  var orangeicon = L.icon({
    iconUrl: orangepin,
    iconSize: [25, 41],
    popupAnchor: [0, -28],
  });
  var redicon = L.icon({
    iconUrl: redpin,
    iconSize: [25, 41],
    popupAnchor: [0, -28],
  });
  var blueicon = L.icon({
    iconUrl: bluepin,
    iconSize: [25, 41],
    popupAnchor: [0, -28],
  });
  var greenicon = L.icon({
    iconUrl: greenpin,
    iconSize: [25, 41],
    popupAnchor: [0, -28],
  });
  var greyicon = L.icon({
    iconUrl: greypin,
    iconSize: [25, 41],
    popupAnchor: [0, -28],
  });
  var purpleicon = L.icon({
    iconUrl: purplepin,
    iconSize: [25, 41],
    popupAnchor: [0, -28],
  });

  //Filtered Data
  const geodata = sortedgeodata;
  const filteredCCL = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("CC"))
    .map((geodata) => geodata);
  const filteredCEL = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("CE"))
    .map((geodata) => geodata);
  const filteredCGL = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("CG"))
    .map((geodata) => geodata);
  const filteredDTL = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("DT"))
    .map((geodata) => geodata);
  const filteredEWL = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("EW"))
    .map((geodata) => geodata);
  const filteredNEL = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("NE"))
    .map((geodata) => geodata);
  const filteredNSL = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("NS"))
    .map((geodata) => geodata);
  const filteredBPL = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("BP"))
    .map((geodata) => geodata);
  const filteredSLRT1 = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("STC"))
    .map((geodata) => geodata);
  const filteredSLRT2 = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("SW"))
    .map((geodata) => geodata);
  const filteredSLRT3 = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("SE"))
    .map((geodata) => geodata);
  const filteredPLRT1 = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("PTC"))
    .map((geodata) => geodata);
  const filteredPLRT2 = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("PW"))
    .map((geodata) => geodata);
  const filteredPLRT3 = geodata
    .filter((geodata) => geodata.properties.STN_NO.match("PE"))
    .map((geodata) => geodata);
  // console.log(filteredgeodata);

  //Pop-up Info
  // const onEachStation = (station, layer) => {
  //   const stationName = station.properties.STN_NAME;
  //   const stationNum = station.properties.STN_NO;
  //   layer.bindPopup(stationName + "<br>" + stationNum);
  // };

  // BPL markers
  const bplMarkers = filteredBPL.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={nanoid()}
        position={[stationLat, stationLng]}
        icon={greyicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });

  //CCL markers
  const cclMarkers = filteredCCL.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={nanoid()}
        position={[stationLat, stationLng]}
        icon={orangeicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });

  //CEL markers
  const celMarkers = filteredCEL.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={nanoid()}
        position={[stationLat, stationLng]}
        icon={orangeicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });
  //CGL markers
  const cglMarkers = filteredCGL.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={nanoid()}
        position={[stationLat, stationLng]}
        icon={greenicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });
  //DTL markers
  const dtlMarkers = filteredDTL.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={nanoid()}
        position={[stationLat, stationLng]}
        icon={blueicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });
  //EWL markers
  const ewlMarkers = filteredEWL.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={nanoid()}
        position={[stationLat, stationLng]}
        icon={greenicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });

  //NEL markers
  const nelMarkers = filteredNEL.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={nanoid}
        position={[stationLat, stationLng]}
        icon={purpleicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });
  //NSL markers
  const nslMarkers = filteredNSL.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker key={nanoid()} position={[stationLat, stationLng]} icon={redicon}>
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });

  //PLRT1 markers
  const plrt1Markers = filteredPLRT1.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={nanoid()}
        position={[stationLat, stationLng]}
        icon={greyicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });
  //PLRT2 markers
  const plrt2Markers = filteredPLRT2.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={nanoid()}
        position={[stationLat, stationLng]}
        icon={greyicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });

  //PLRT3 markers
  const plrt3Markers = filteredPLRT3.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={nanoid()}
        position={[stationLat, stationLng]}
        icon={greyicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });

  //SLRT1 markers
  const slrt1Markers = filteredSLRT1.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={stationNum}
        position={[stationLat, stationLng]}
        icon={greyicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });

  //SLRT2 markers
  const slrt2Markers = filteredSLRT2.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={nanoid()}
        position={[stationLat, stationLng]}
        icon={greyicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });

  //SLRT3 markers
  const slrt3Markers = filteredSLRT3.map((station) => {
    const stationName = station.properties.STN_NAME;
    const stationNum = station.properties.STN_NO;
    const stationDen = station.properties.LTA;
    const stationLat = station.geometry.coordinates[1];
    const stationLng = station.geometry.coordinates[0];
    return (
      <Marker
        key={nanoid()}
        position={[stationLat, stationLng]}
        icon={greyicon}
      >
        <Popup>
          <h3>{stationName}</h3>
          <p>{stationNum}</p>
          <p>Platform Density: {stationDen}</p>
        </Popup>
      </Marker>
    );
  });
  const cclCelMarkers = [cclMarkers, celMarkers];

  const ewlCglMarkers = [ewlMarkers, cglMarkers];

  const plrtMarkers = [plrt1Markers, plrt2Markers, plrt3Markers];

  const slrtMarkers = [slrt1Markers, slrt2Markers, slrt3Markers];

  const allMarkers = [
    bplMarkers,
    cclCelMarkers,
    dtlMarkers,
    ewlCglMarkers,
    nelMarkers,
    nslMarkers,
    plrtMarkers,
    slrtMarkers,
  ];

  //switch case for the selected value
  // const switchCase = (selectedValue) => {
  //   switch (selectedValue) {
  //     case "CCL":
  //       return (
  //         <>
  //           <GeoJSON
  //             data={filteredCCL}
  //             onEachFeature={onEachStation}
  //             pointToLayer={function (feature, latlng) {
  //               return L.marker(latlng, { icon: orangeicon });
  //             }}
  //           />
  //           <GeoJSON
  //             data={filteredCEL}
  //             onEachFeature={onEachStation}
  //             pointToLayer={function (feature, latlng) {
  //               return L.marker(latlng, { icon: orangeicon });
  //             }}
  //           />
  //         </>
  //       );
  //       break;
  //     case "DTL":
  //       return (
  //         <>
  //           <GeoJSON
  //             data={filteredDTL}
  //             onEachFeature={onEachStation}
  //             pointToLayer={function (feature, latlng) {
  //               return L.marker(latlng, { icon: blueicon });
  //             }}
  //           />
  //         </>
  //       );
  //       break;
  //     case "EWL":
  //       return (
  //         <>
  //           <GeoJSON
  //             data={filteredEWL}
  //             onEachFeature={onEachStation}
  //             pointToLayer={function (feature, latlng) {
  //               return L.marker(latlng, { icon: greenicon });
  //             }}
  //           />
  //           <GeoJSON
  //             data={filteredCGL}
  //             onEachFeature={onEachStation}
  //             pointToLayer={function (feature, latlng) {
  //               return L.marker(latlng, { icon: greenicon });
  //             }}
  //           />
  //         </>
  //       );
  //       break;
  //     case "NEL":
  //       return (
  //         <GeoJSON
  //           data={filteredNEL}
  //           onEachFeature={onEachStation}
  //           pointToLayer={function (feature, latlng) {
  //             return L.marker(latlng, { icon: purpleicon });
  //           }}
  //         />
  //       );
  //       break;
  //     case "NSL":
  //       return (
  //         <GeoJSON
  //           data={filteredNSL}
  //           onEachFeature={onEachStation}
  //           pointToLayer={function (feature, latlng) {
  //             return L.marker(latlng, { icon: redicon });
  //           }}
  //         />
  //       );
  //     case "BPL":
  //       return (
  //         <>
  //           <GeoJSON
  //             data={filteredBPL}
  //             onEachFeature={onEachStation}
  //             pointToLayer={function (feature, latlng) {
  //               return L.marker(latlng, { icon: greyicon });
  //             }}
  //           />
  //         </>
  //       );
  //       break;
  //     case "SLRT":
  //       return (
  //         <>
  //           <GeoJSON
  //             data={filteredSLRT1}
  //             onEachFeature={onEachStation}
  //             pointToLayer={function (feature, latlng) {
  //               return L.marker(latlng, { icon: greyicon });
  //             }}
  //           />
  //           <GeoJSON
  //             data={filteredSLRT2}
  //             onEachFeature={onEachStation}
  //             pointToLayer={function (feature, latlng) {
  //               return L.marker(latlng, { icon: greyicon });
  //             }}
  //           />
  //           <GeoJSON
  //             data={filteredSLRT3}
  //             onEachFeature={onEachStation}
  //             pointToLayer={function (feature, latlng) {
  //               return L.marker(latlng, { icon: greyicon });
  //             }}
  //           />
  //         </>
  //       );
  //       break;
  //     case "PLRT":
  //       return (
  //         <>
  //           <GeoJSON
  //             data={filteredPLRT1}
  //             onEachFeature={onEachStation}
  //             pointToLayer={function (feature, latlng) {
  //               return L.marker(latlng, { icon: greyicon });
  //             }}
  //           />
  //           <GeoJSON
  //             data={filteredPLRT2}
  //             onEachFeature={onEachStation}
  //             pointToLayer={function (feature, latlng) {
  //               return L.marker(latlng, { icon: greyicon });
  //             }}
  //           />
  //           <GeoJSON
  //             data={filteredPLRT3}
  //             onEachFeature={onEachStation}
  //             pointToLayer={function (feature, latlng) {
  //               return L.marker(latlng, { icon: greyicon });
  //             }}
  //           />
  //         </>
  //       );
  //       break;
  //   }
  // };

  //Draw Map
  return (
    <MapContainer center={[1.3521, 103.8198]} zoom={11} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedValue === "ALL" && allMarkers}
      {selectedValue === "CCL" && cclCelMarkers}
      {selectedValue === "DTL" && dtlMarkers}
      {selectedValue === "EWL" && ewlCglMarkers}
      {selectedValue === "NEL" && nelMarkers}
      {selectedValue === "NSL" && nslMarkers}
      {selectedValue === "BPL" && bplMarkers}
      {selectedValue === "SLRT" && slrtMarkers}
      {selectedValue === "PLRT" && plrtMarkers}
    </MapContainer>
  );
}

export default TrainMap;
