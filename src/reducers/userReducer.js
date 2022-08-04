// import * as Types from '../constants/ActionType';
const initialState = {
    loading: false,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        // case Types.LOGIN_REQUEST:
            // state.loading = true;
            // state.errors = {};
            // return { ...state };
        
        default: return { ...state };
    }
}

export default user;