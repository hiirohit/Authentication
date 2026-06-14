import Context from './Context.jsx';
import {AppConstants} from '../utils/constants.js'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContextProvider = (props) => {

    
    const backend_url = AppConstants.BACKEND_URL;
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [userData,setUserDate] = useState(false);


    const getUserData = async () => {
        try{
            const response = await axios.get(backend_url+"/profile",{withCredentials:true});
            if(response.status === 200){
                setUserDate(response.data);
            }else{
                toast.error("Unable to retrieve profile");
            }
        }catch(error){
            toast.error(error.message)
        }
    }
    const Auth = async () => {
        try{
           const response =  await axios.get(backend_url+"/is-authenticated",{withCredentials:true});
           if(response.status === 200 && response.data === true){
            setIsLoggedIn(true);
            await getUserData();
           }else{
            setIsLoggedIn(false);
           }
        }catch(error){
             if (error.response?.status === 401) {
                    setIsLoggedIn(false);
                    return;
                }
            if(error.response){
                const msg = error.response.data.message || "Authentication check failed";
                toast.error(msg);
            } else{
                toast.error(error.message);
            }
            setIsLoggedIn(false);
        }
    }
    useEffect(() => {
        Auth();
    },[])
    
    const contextValue = {
            backend_url,
            isLoggedIn,setIsLoggedIn,
            userData,setUserDate,
            getUserData,
    }
    

    return ( 
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}