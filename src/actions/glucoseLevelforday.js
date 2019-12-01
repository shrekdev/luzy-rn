import { GET_GLUCOSE_LEVEL_FORDAY, GET_GLUCOSE_LEVEL_FORWEEK, GET_GLUCOSE_LEVEL_FORMONTH } from '../actions/types';
import { makeRequest } from '../api/apiCall';
import {setAsyncStorage, showAPICallError} from '../helper/appHelper';
import APIConstant from '../api/apiConstant';
import {apiErrorHandler} from "./errorHandle";

export const getGlucoseLevelForDay = (glucoseData) => {
    return (dispatch, getState) => {
        return makeRequest(APIConstant.BASE_URL + APIConstant.GET_GLUCOSE_LEVEL_FORDAY,'post',glucoseData)
            .then((response)=>{    
            //    alert(JSON.stringify(response.data))
                if(response && response.data && response.data.status === '200'){
                    dispatch({
                        type: GET_GLUCOSE_LEVEL_FORDAY,
                        payload: response.data.result,
                    });
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: 'Get glucose level for day successfully'
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
                            message:'something went wrong'
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

export const getGlucoseLevelForWeek = (glucoseData) => {
    return (dispatch, getState) => {
        return makeRequest(APIConstant.BASE_URL + APIConstant.GET_GLUCOSE_LEVEL_FORWEEK,'post',glucoseData)
            .then((response)=>{                   
                if(response && response.data && response.data.status === '200'){
                    dispatch({
                        type: GET_GLUCOSE_LEVEL_FORWEEK,
                        payload: response.data.result,
                    });
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: 'Get glucose level for week successfully'
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
                            message:'something went wrong'
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

export const getGlucoseLevelForMonth = (glucoseData) => {
    return (dispatch, getState) => {
        return makeRequest(APIConstant.BASE_URL + APIConstant.GET_GLUCOSE_LEVEL_FORMONTH,'post',glucoseData)
            .then((response)=>{    
                if(response && response.data && response.data.status === '200'){
                    dispatch({
                        type: GET_GLUCOSE_LEVEL_FORMONTH,
                        payload: response.data.result,
                    });
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: 'Get glucose level for month successfully'
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
                            message:'something went wrong'
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