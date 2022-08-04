import produce from "immer"
import * as Types from '../constants/ActionType'
const initialState = {
    orders: [],
    orderHistory: []
}

const order = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.ADD_PRODUCT_TO_ORDER_SUCCESS:
                const index = draft.orders.findIndex(order => order.product.uuid === action.product.uuid)
                if (action.quantity === 0) {
                    draft.orders.splice(index, 1)
                } else {
                    if (index !== -1) {
                        draft.orders[index].quantity = action.quantity
                    } else {
                        draft.orders.push({ product: action.product, quantity: action.quantity })
                    }
                }
                break
            case Types.CHECKOUT_SUCCESS:
                draft.orders = []
                break
            case Types.LOAD_DATA_LIST_ORDER_HISTORY_SUCCESS:
                draft.orderHistory = action.data
                break
        }
    })
}

export default order