import  * as actionCreators from './' 
import  { SHOW_PAYLOAD } from './' 
import InferValueTypes from "../../types/infer-types"
type ActionTypes = ReturnType<InferValueTypes<typeof actionCreators>>;

const initialState: SHOW_PAYLOAD = {
    open: false
}

export default function (state = initialState, action: ActionTypes){
    if(action.type === 'SHOW_SNACKBAR'){
        return {open: true, ...action.payload};
    }
    if(action.type == 'HIDE_SNACKBAR'){
        return {
            ...state,
            open: false
        }
    }
    return {
        ...state
    }
}
