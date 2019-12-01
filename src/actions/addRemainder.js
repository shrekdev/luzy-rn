import { ADD_REMAINDER,GET_REMAINDER } from './types';
import { makeRequest } from '../api/apiCall';
import {setAsyncStorage, showAPICallError} from '../helper/appHelper';
import APIConstant from '../api/apiConstant';
import {apiErrorHandler} from "./errorHandle";


export const addRemainder = (addRemainderData) => {
    return (dispatch, getState) => {
        return makeRequest(APIConstant.BASE_URL + APIConstant.ADD_REMAINDER,'post',addRemainderData)
            .then((response)=>{
                alert(JSON.stringify(response.data.Message));
                if(response && response.data && response.data.status === '200'){
                    dispatch({
                        type: ADD_REMAINDER,
                        payload: response.data.result,
                    });
                    return Promise.resolve({
                        status: response.data.status,
                        message: response.data.Message
                        
                    });
                }else{
                    if(response && response.data && response.data.Message){
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message
                        });
                    }else{
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message
                            
                        });
                    }
                }
            })
            .catch((error)=>{
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            })
    };
};


export const getRemainder = (getRemainderData) => {
    return (dispatch, getState) => {
        return makeRequest(APIConstant.BASE_URL + APIConstant.GET_REMAINDER,'post',getRemainderData)
            .then((response)=>{
                if(response && response.data && response.data.status === '200'){
                    alert(JSON.stringify(response.data.Message))
                    dispatch({
                        type: GET_REMAINDER,
                        payload: response.data.result,
                    });
                    return Promise.resolve({
                        data: response.data.result,
                        status: response.data.status,
                        message: response.data.Message
                       
                    });
                }else{
                    if(response && response.Message){
                        return Promise.resolve({
                            status:response.data.status,
                            message:response.data.Message
                        });
                    }else{
                        return Promise.resolve({
                            status:response.data.status,
                            message: response.data.Message
                        });
                    }
                }
            })
            .catch((error)=>{
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            })
    };
};