import { USER_DETAILS } from '../actions/types';
import { makeRequest } from '../api/apiCall';
import {setAsyncStorage, showAPICallError} from '../helper/appHelper';
import APIConstant from '../api/apiConstant';
import {apiErrorHandler} from "./errorHandle";

export const userLogin = (userData) => {
    return (dispatch, getState) => {
        return makeRequest(APIConstant.BASE_URL + APIConstant.USER_LOGIN,'post',userData)
            .then((response)=>{
                if(response && response.data && response.data.status === '200'){
                    try{
                        let obj = {
                            token: response.data.result[0].Token,
                            user: userData.in_Username,
                            password: userData.in_Password,
                        };
                        setAsyncStorage('User', JSON.stringify(obj));
                    }catch (e) {
                        console.log(e);
                    }
                    dispatch({
                        type: USER_DETAILS,
                        payload: response.data.result,
                    });
                    return Promise.resolve({
                        status: response.data.status,
                        message: 'Successfully login'
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
                            message: 'something went wrong'
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

export const userRegistration = (userData) => {
    return (dispatch, getState) => {
        return makeRequest(APIConstant.BASE_URL + APIConstant.USER_SIGNUP,'post',userData)
            .then((response)=>{
                if(response && response.data && response.data.status === '200'){
                    try{
                        let obj = {
                            token: response.data.result[0].UserToken,
                            user: userData.in_Username,
                            password:userData.in_Password,
                        };
                        setAsyncStorage('User', JSON.stringify(obj));
                    }catch (e) {
                        console.log(e);
                    }
                    dispatch({
                        type: USER_DETAILS,
                        payload: response.data.result,
                    });
                    return Promise.resolve({
                        status: response.data.status,
                        message: 'Successfully signup'
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
                            message: 'something went wrong'
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