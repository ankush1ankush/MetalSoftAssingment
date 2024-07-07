import React from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import "./Graph.css"
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


function Graph() {

    const forcastList = useSelector((state) => {
        return state.forcasteStore.forcastList;
    })
    
    
    if(!forcastList.length)
    {
        return ;
    }
   
    let data = forcastList.map((data,idx)=>{
         const date = new Date(Date.now()+((idx+1)*24*60*60*1000));
         return { "name":`${date.getDate()} ${months[date.getMonth()]}` , "max":`${data.temp.max}` , "min" : `${data.temp.min}`}
        })
    return (
        <div className='graphContainer'>
 <ResponsiveContainer width={750} height={250} >
   <LineChart  data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="max" stroke="#8884d8" />
  <Line type="monotone" dataKey="min" stroke="#82ca9d" />
</LineChart>
 </ResponsiveContainer>
       </div>
    )
}

export default Graph