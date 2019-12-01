import { REGISTER_BMI } from '../actions/types';
import { makeRequest } from '../api/apiCall';
import {setAsyncStorage, showAPICallError} from '../helper/appHelper';
import APIConstant from '../api/apiConstant';
import {apiErrorHandler} from "./errorHandle";

export const registerBMI = (BMIData) => {
    return (dispatch, getState) => {
        return makeRequest(APIConstant.BASE_URL + APIConstant.REGISTER_BMI,'post',BMIData)
            .then((response)=>{
                if(response && response.data && response.data.status === '200'){
                    dispatch({
                        type: REGISTER_BMI,
                        payload: response.data.result,
                    });
                    return Promise.resolve({
                        status: response.data.status,
                        message: 'Successfully register BMI'
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