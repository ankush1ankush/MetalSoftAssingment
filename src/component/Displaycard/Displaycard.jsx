import React from 'react'
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./Displaycard.css"
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Displaycard({data,idx}) {
  console.log(data)
  const date = new Date(Date.now()+(idx*24*60*60*1000));
  
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
               <Typography sx={{ fontSize: 12 ,display:"flex" , justifyContent:"space-around" , alignItems:"center"}} color="text.secondary" gutterBottom>
                    {days[date.getDay()]} , {date.getDate()} {months[date.getMonth()]}
                </Typography>
                <Typography sx={{ fontSize:14, display: "flex", alignItems: "center", justifyContent: "space-around" }}  color="text.secondary">
                    <div style={{marginTop:"0.2em"}}>{data.weather[0].main} </div> <img height={25} width={25} src={`/images/${data.weather[0].icon}.png`} alt="icon" />
                </Typography>
                <Typography sx={{ fontSize:10, display: "flex", alignItems: "center", justifyContent: "space-around", marginTop:"0.2sem" }}  color="text.secondary">
                    <div style={{marginTop:"0.2em"}}>Humidity</div> <div style={{marginTop:"0.2em"}}>{data.humidity}%</div>
                </Typography>
                <Typography sx={{ fontSize:10, display: "flex", alignItems: "center", justifyContent: "space-around", marginTop:"0.2sem" }}  color="text.secondary">
                    <div style={{marginTop:"0.2em"}}>min</div> <div style={{marginTop:"0.2em"}}>{data.temp.min}{bull}C</div>
                </Typography>
                <Typography sx={{ fontSize:10, display: "flex", alignItems: "center", justifyContent: "space-around", marginTop:"0.2sem" }}  color="text.secondary">
                    <div style={{marginTop:"0.2em"}}>max</div> <div style={{marginTop:"0.2em"}}>{data.temp.max}{bull}C</div>
                </Typography>
            </CardContent>
            
        </React.Fragment>
    );

    return (
        <div className="cardContainer">
            <Box sx={{ minWidth: 140 , maxWidth : 400}}>
                <Card variant="outlined">{card}</Card>
            </Box>
        </div>
    )
}

export default Displaycard