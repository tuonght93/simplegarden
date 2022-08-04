import * as Types from '../constants/ActionType';
import HTTP from '../services/HTTP';


export const actLoadDataProductRequest = () => {
    return dispatch => {
        dispatch({ type: Types.LOAD_DATA_LIST_PRODUCT_REQUEST });
        return HTTP.callApiWithHeader('sm/products', 'GET', null).then(response => {
            if (response.status == 200) {
                dispatch({ type: Types.LOAD_DATA_LIST_PRODUCT_SUCCESS, data: response.data });
            } else {
                dispatch({ type: Types.LOAD_DATA_LIST_PRODUCT_FAILURE, errors: response.errors });
            }
        }).catch(function (error) {
            dispatch({ type: Types.LOAD_DATA_LIST_PRODUCT_FAILURE, errors: {} });
        });
    }
}

export const actLoadDataMenu = () => {
    return dispatch => {
        return HTTP.callApiWithHeader('sm/categories?type=menu&state=1', 'GET', null).then(response => {
            if (response.status == 200) {
                dispatch({ type: Types.LOAD_DATA_CATEGORY_SUCCESS, data: response.data });
            }
        }).catch(function (error) {
        });
    }
}




