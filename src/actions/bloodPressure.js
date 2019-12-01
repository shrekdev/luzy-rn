import { REGISTER_BLOOD_PRESSURE } from '../actions/types';
import { makeRequest } from '../api/apiCall';
import {setAsyncStorage, showAPICallError} from '../helper/appHelper';
import APIConstant from '../api/apiConstant';
import {apiErrorHandler} from "./errorHandle";

export const registerBloodPressure = (bloodPressureData) => {
    return (dispatch, getState) => {
        return makeRequest(APIConstant.BASE_URL + APIConstant.REGISTER_BLOOD_PRESSURE,'post',bloodPressureData)
            .then((response)=>{              
                if(response && response.data && response.data.status === '200'){
                    dispatch({
                        type: REGISTER_BLOOD_PRESSURE,
                        payload: response.data.result,
                    });
                    return Promise.resolve({
                        status: response.data.status,
                        message: 'Register blood pressure successfully'
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