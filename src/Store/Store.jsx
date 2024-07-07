import { configureStore, createSlice } from "@reduxjs/toolkit";
import { fromAddress } from "react-geocode";

const initialState = {
    scriptLoaded: false,
}
const initialCoordinate = {
    lat: 28.7040592,
    lng: 77.1025
}
const initialForcast = {
    forcastList: []
}
export const scriptSlice = createSlice({
    name: "scriptFlag",
    initialState,
    reducers: {
        changeFlag(state, action) {
            state.scriptLoaded = true;
            return state;
        }
    }
})

export const coordinateSlice = createSlice({
    name: "cordinates",
    initialState: initialCoordinate,
    reducers: {
        setCordinates(state, action) {
            let lat = action.payload.lat;
            let lng = action.payload.lng;
            const newState = {
                lat,
                lng
            }
            return newState;
        }
    }
})

export const forcastStorage = createSlice({
    name: "forcastStore",
    initialState:initialForcast,
    reducers:{
        setForcast(state,action)
        {  
           const list = action.payload;
           return {
               forcastList: list
           }
        }
    }
})

export const sendData = (address) => {
    return async (dispatch) => {
        try {
            const { results } = await fromAddress(address)
            const { lat, lng } = results[0].geometry.location;
            dispatch(coordinateSlice.actions.setCordinates({ lat: lat, lng: lng }))
        } catch (err) {
            console.log(err);
        }
    }
}

export const itemsStore = configureStore({
    reducer: {
        changeIsLoaded: scriptSlice.reducer,
        coordinateStore: coordinateSlice.reducer,
        forcasteStore: forcastStorage.reducer
    }
}) 