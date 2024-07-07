import React, { useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Fab from "@mui/material/Fab";
import { Autocomplete } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { sendData } from '../../Store/Store';
import "./Navbar.css"
function Navbar() {
    const [address, setAddress] = useState(null);
    const inputRef = useRef();
    const dispatch = useDispatch();
    const handleClick = () => {
          dispatch(sendData(address))
    }
    const handleChange = () => {
         setAddress(inputRef.current.value)
    }
    const handleWrong = () => {
        alert("please select valid city name");
    }
    return (
        <div className="navbar">
            <img className="logo" src="logo.png" alt='logo' />
            <div className='searchContainer'>
                <Autocomplete onPlaceChanged={handleChange}>
                    <input ref={inputRef} placeholder='Search place' className='searchBar' type="text" />
                </Autocomplete>
                <Fab onClick={address ? handleClick : handleWrong}>
                    <SearchIcon fontSize='medium' />
                </Fab>
            </div>
        </div>
    )
}

export default Navbar