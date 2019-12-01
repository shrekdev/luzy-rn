import { MEDITATION_RECORDING_LIST } from '../actions/types';
import { makeRequest } from '../api/apiCall';
import {setAsyncStorage, showAPICallError} from '../helper/appHelper';
import APIConstant from '../api/apiConstant';
import {apiErrorHandler} from "./errorHandle";

export const meditationRecordingList = () => {
    return (dispatch, getState) => {
        return makeRequest(APIConstant.BASE_URL + APIConstant.ALL_MEDITATION_RECORDING,'post')
            .then((response)=>{
                if(response && response.data && response.data.status === '200'){
                    dispatch({
                        type: MEDITATION_RECORDING_LIST,
                        payload: response.data.result,
                    });
                    return Promise.resolve({
                        status: response.data.status,
                        message: 'Get recording list successfully'
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