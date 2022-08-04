import produce from "immer"
import * as Types from '../constants/ActionType';
const initialState = {
    shops: [],
};

const product = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.LOAD_DATA_SHOP_SUCCESS:
                draft.shops = action.data;
                break;
        }
    })
}

export default product;