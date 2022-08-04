import AsyncStorage from '@react-native-community/async-storage';
import * as Config from '../constants/Config';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
// import NavigationService from '../router/NavigationService';
// import * as Types from '../constants/ActionType';
callApi = (endpoint, method = 'GET', body) => {
    let header = {
        "X-Place-Id": "gVxqPuyBt9gxtAbg99Vs-",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    return axios({
        method: method,
        url: `${Config.API_URL}${endpoint}`,
        data: body,
        headers: header,
        timeout: 90000,
    }).then(response => {
        return response;
    }).catch((error) => {
        return error.response
    });
}

callApiWithHeader = async (endpoint, method = 'GET', body, xplace = true) => {
    const auValue = await AsyncStorage.getItem('userToken');
    let header = {
        "Authorization": `Bearer ${auValue}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    if (xplace) header["X-Place-Id"] = body?.place_uuid || "gVxqPuyBt9gxtAbg99Vs-";
    return axios({
        method: method,
        url: `${Config.API_URL}${endpoint}`,
        data: body,
        headers: header,
        timeout: 90000,
    }).then(response => {
        return response;
    }).catch(error => {
        console.log(error.response)
        if (error.response && error.response.status == 401) {
            var res = {
                data: {
                    status: 401,
                    message: 'Authentication required'
                },
                status: 401,
            }
            return res;
        } else if (error.response) {
            Toast.showWithGravity(error.response.status + ' Connect errors', Toast.LONG, Toast.TOP)
        } else {
            Toast.showWithGravity(JSON.stringify(error.message), Toast.LONG, Toast.TOP)
        }
    });
};


module.exports = {
    callApi,
    callApiWithHeader
};
