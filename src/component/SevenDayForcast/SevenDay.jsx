import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import "./SevenDay.css"
import Displaycard from '../Displaycard/Displaycard'
import { forcastStorage } from '../../Store/Store'
function SevenDay() {

    const { lat, lng } = useSelector((state) => {
        return { lat: state.coordinateStore.lat, lng: state.coordinateStore.lng };
    })
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const getData = async () => {
            const config = {
              method: "GET",
              url: `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&cnt=7&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_PAID}&units=metric`
            }
            const result = await axios(config);
            setData(result.data.list);
            dispatch(forcastStorage.actions.setForcast(result.data.list))
        }
        getData();
    }, [lat, lng , dispatch])
    if (!data) {
        return null;
    }
    return (
        <div className="SevenContainer">
           {data.map((data,idx)=>{
                return <Displaycard data={data} key={idx} idx={idx+1}/>
            })}
        </div>
    )
}

export default SevenDay