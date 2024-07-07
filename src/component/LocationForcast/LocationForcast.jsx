import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AirIcon from '@mui/icons-material/Air';
import "./LocationForcast.css"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function LocationForcast() {
    const { lat, lng } = useSelector((state) => {
        return { lat: state.coordinateStore.lat, lng: state.coordinateStore.lng };
    })
    const [data, setData] = useState(null)
    const date = new Date();

    useEffect(() => {
        console.log(lat);
        console.log(lng);
        const getData = async () => {
            const config = {
                method: "GET",
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
            }
            const results = await axios(config)
            console.log(results.data)
            setData(results.data);
        }
        getData()
    }, [lat, lng])
    if (!data) {
        return;
    }

    const bull = (
        <Box
            component="span"
            sx={{ display: "inline-block", mx: "2px", transform: "scale(0.5)", verticalAlign: "super" }}
        >
            o
        </Box>
    );
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 ,display:"flex" , justifyContent:"space-around" , alignItems:"center"}} color="text.secondary" gutterBottom>
                    {days[date.getDay()]} , {date.getDate()} {months[date.getMonth()]}
                </Typography>
                <Typography variant="h5" sx={{ display: "flex", justifyContent: "space-around" }} >
                    <div style={{ padding: 0 }} >{data.main.temp}{bull}C</div>
                </Typography>
                <Typography sx={{  display: "flex", alignItems: "center", justifyContent: "space-around" }} variant="h7" color="text.secondary">
                    <div style={{marginTop:"0.2em"}}>{data.weather[0].main} </div> <img height={40} width={40} src={`/images/${data.weather[0].icon}.png` } alt="icon" />
                </Typography>
                <Typography sx={{  display: "flex", alignItems: "center", justifyContent: "space-around" }} variant="h7" color="text.secondary">
                    <div style={{marginTop:"0.2em"}}><AirIcon/></div> <div>{data.wind.speed} Km/hr</div>
                </Typography>
                <Typography sx={{  display: "flex", alignItems: "center", justifyContent: "space-around" }} variant="h7" color="text.secondary">
                    <div style={{marginTop:"0.2em"}}>Humidity</div> <div>{data.main.humidity}%</div>
                </Typography>
            </CardContent>
            
        </React.Fragment>
    );

    return (
        <div className="cardContainer1">
            <Box sx={{ minWidth: 300, maxWidth : 400 }}>
                <Card variant="outlined">{card}</Card>
            </Box>
        </div>
    )
}

export default LocationForcast