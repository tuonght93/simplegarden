import * as Types from '../constants/ActionType';
import HTTP from '../services/HTTP';
import NavigationService from '../routers/NavigationService';

export const actAddProductToOrder = (product, quantity) => {
    return dispatch => {
        dispatch({ type: Types.ADD_PRODUCT_TO_ORDER_SUCCESS, product, quantity });
    }
}

export const actCheckout = (body) => {
    return dispatch => {
        return HTTP.callApiWithHeader('sm/orders', 'post', body).then(response => {
            if (response.status === 201) {
                dispatch({ type: Types.CHECKOUT_SUCCESS });
                NavigationService.navigate('profile', {
                    screen: 'OrderDetail',
                    params: { data: response.data }
                })
            }
        }).catch(function (error) {
            console.log(error)
            alert('error')
        });
    }
}

export const actLoadDataOrderHistory = () => {
    return dispatch => {
        return HTTP.callApiWithHeader('sm/orders/list', 'GET', null).then(response => {
            if (response.status == 200) {
                dispatch({ type: Types.LOAD_DATA_LIST_ORDER_HISTORY_SUCCESS, data: response.data?.data || [] });
            }
        }).catch(function (error) {
        });
    }
}




