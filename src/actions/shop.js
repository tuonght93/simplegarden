import * as Types from '../constants/ActionType';
import HTTP from '../services/HTTP';


export const actLoadDataShop = () => {
    return dispatch => {
        return HTTP.callApi('sm/places', 'GET', null).then(response => {
            if (response.status == 200) {
                dispatch({ type: Types.LOAD_DATA_SHOP_SUCCESS, data: response.data });
            }
        }).catch(function (error) {
            
        });
    }
}




