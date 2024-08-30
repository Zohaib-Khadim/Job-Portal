import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const applicationSlice = createSlice({
    name:"applications",
    initialState:{
        applications: [],
        loading: false,
        error: null,
        message: null,
    },
    reducers:{
        requestForAllApplication(state,action){
            state.loading = true;
            state.error = null;
        },
        successForAllApplication(state,action){
            state.loading = false;
            state.error = null;
            state.applications = action.payload;
        },
        failureForAllApplication(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        requestForMyApplication(state,action){
            state.loading = true;
            state.error = null;
        },
        successForMyApplication(state,action){
            state.loading = false;
            state.error = null;
            state.applications = action.payload;
        },
        failureForMyApplication(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        requestForPostApplication(state,action){
            state.loading=true;
            state.error=null;
            state.message=null;
        },
        successForPostApplication(state,action){
            state.loading=false;
            state.error=null;
            state.message=action.payload;
        },
        failureForPostApplication(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
        },
        clearAllErrors(state,action){
            state.error=null;
            state.applications=state.applications;
        },
        resetApplicationSlice(state,action){
            state.error=null;
            state.applications=state.applications;
            state.message=null;
            state.loading=false;
        }
    }
});

export const fetchEmployerApplications = () => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForAllApplication());
    try {
        const response = await axios.get('http://localhost:4000/api/v1/application/employer/getall',{withCredentials:true},);
        // console.log("API Response:", response); 
        dispatch(applicationSlice.actions.successForAllApplication(response.data.applications));
        dispatch(applicationSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(applicationSlice.actions.failureForAllApplication(error.response.data.message))
    }
}

export const fetchJobSeakerApplications = () => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForMyApplication());
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/application/jobeseaker/getall`,{withCredentials:true},);
        
        dispatch(applicationSlice.actions.successForMyApplication(response.data.applications));
        dispatch(applicationSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(applicationSlice.actions.failureForMyApplication(error.response.data.message))
    }
}

export const postApplication = (data,jobId)=>async(dispatch)=>{
    dispatch(applicationSlice.actions.requestForPostApplication());
    try {
        const response = await axios.post(`http://localhost:4000/api/v1/application/post/${jobId}`,{data},{withCredentials:true,headers:{"Content-Type":"multipart/form-data"},});
        console.log("API Response:", response.data); 
        dispatch(applicationSlice.actions.successForPostApplication(response.data.message));
        dispatch(applicationSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(applicationSlice.actions.failureForPostApplication(error.response.data.message))
    }
}


export const clearAllApplicationErrors = ()=>(dispatch)=>{
    dispatch(applicationSlice.actions.clearAllErrors())
}

export const resetApplicationSlice = ()=>(dispatch)=>{
    dispatch(applicationSlice.actions.resetApplicationSlice())
}

export default applicationSlice.reducer; 