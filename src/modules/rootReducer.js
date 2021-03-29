  
import {DISPATCHURL, GETDATA, ERROR} from "./const";
const initialState = {
    url: '',
    data: [],
    error: false
};

export function rootReducer(state = initialState, action){
    switch (action.type) {
        case DISPATCHURL :
            return {...state,
                url: action.url,
                error: action.error
                };
        case GETDATA :
            return {...state,
                data: action.data
                };
        case ERROR :
            return {...state,
                error: action.error,
                };
        default: return state;
    }
}