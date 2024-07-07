
import './App.css';
import Navbar from './component/Navbar/Navbar';
import { useJsApiLoader } from '@react-google-maps/api';
import { scriptSlice } from './Store/Store';
import CircularProgress from '@mui/joy/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaults } from "react-geocode";
import MapContainer from './component/MapContainer/MapContainer';
import LocationForcast from './component/LocationForcast/LocationForcast';
import SevenDay from './component/SevenDayForcast/SevenDay';
import Graph from './component/Graph/Graph';
const libraries = (process.env.REACT_APP_GOOGLE_LIBRARIES || '').split(',')
function App() {
    setDefaults({
        key: `${process.env.REACT_APP_GOOGLE_MAP_KEY}`, // Your API key here.
        language: "en", // Default language for responses.
        region: "es", // Default region for responses.
    });
    const dispatch = useDispatch();
    const flag = useSelector((state) => {
        return state.changeIsLoaded.scriptLoaded;
    })
    const { isLoaded = true } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
        libraries: libraries,
    })

    if (isLoaded) {
        dispatch(scriptSlice.actions.changeFlag())
        console.log(flag);
    }
    return (
        <div className="app">
            {
                !isLoaded ?
                    <div className='progressBar'>
                        <CircularProgress />
                    </div>
                    :
                    <div >
                        <Navbar />
                        <div className='appContainer'>
                            <div className='forcastContainer'>
                            <LocationForcast/>
                           
                            <MapContainer />
                            </div>
                            <div className='myWraper'>
                            <SevenDay/>
                             <Graph/>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );

}

export default App;
