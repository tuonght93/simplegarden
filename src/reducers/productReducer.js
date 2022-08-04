import produce from "immer"
import * as Types from '../constants/ActionType';
const initialState = {
    isLoading: true,
    products: [],
    isLoadMore: false,
    categories: []
};

const product = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.LOAD_DATA_LIST_PRODUCT_REQUEST:
                draft.isLoading = true;
                break;
            case Types.LOAD_DATA_LIST_PRODUCT_SUCCESS:
                draft.isLoading = false;
                draft.products = action.data;
                break;
            case Types.LOAD_DATA_LIST_PRODUCT_FAILURE:
                draft.isLoading = false;
                break;
            case Types.LOAD_DATA_CATEGORY_SUCCESS:
                draft.categories = action.data;
                break;
        }
    })
}

export default product;