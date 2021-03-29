  
import {DISPATCHURL, GETDATA} from "./const";
const initialState = {
    url: '',
    data: []
};

export function rootReducer(state = initialState, action){
    switch (action.type) {
        case DISPATCHURL :
            return {...state,
                url: action.url,
                };
        case GETDATA :
            return {...state,
                data: action.data,
                };
        default: return state;
    }
}