  
import {SETURL} from "./const";
const initialState = {
    url: ''
};

export function rootReducer(state = initialState, action){
    switch (action.type) {
        case SETURL :
            return {...state,
                url: action.url,
                };
        // case LOGOUT :
        //     return {...state,
        //         authStatus: false
        //         };
        // case RELOAD:
        //     return {...state,
        //         initialization: false
        //         };
        // case TRAFFIC:
        //     return {...state,
        //         traffic: action.traffic
        //         };
        // case CREATEPROXY:
        //     return {...state,
        //         traffic: action.traffic
        //         };
        default: return state;
    }
}