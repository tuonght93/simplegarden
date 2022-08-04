import produce from "immer"
import * as Types from '../constants/ActionType'
const initialState = {
    isLoading: true,
    isFirstTime: 0,
    isSignout: false,
    userToken: null,
    location: {}
}

const auth = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.RESTORE_TOKEN:
                draft.userToken = action.userToken
                draft.isFirstTime = action.isFirstTime === null ? 1 : 0
                draft.isLoading = false
                break
            case Types.GO_TO_LOGIN:
                draft.isFirstTime = 0
                break
            case Types.LOGIN_SUCCESS:
                draft.userToken = action.userToken
                break
            case Types.UPDATE_PROFILE:
                draft.user = action.data
                break
            case Types.SIGN_OUT:
                draft.userToken = null
                draft.isSignout = true
                break
            case Types.SET_DATA_MY_LOCATION:
                draft.location = action.location
                break
        }
    })
}

export default auth