import { variantIcon } from '../../modules/Snackbar/Snackbar'
import { SHOW_SNACKBAR, HIDE_SNACKBAR } from "../actionTypes"
export interface SHOW_PAYLOAD{
    open: boolean,
    message?: string,
    variant?: keyof typeof variantIcon 
}


export function showSnackbar(payload: SHOW_PAYLOAD){
    return {
        type: SHOW_SNACKBAR,
        payload: {
            ...payload,
            open: true
        }
    }
}

export function hideSnackbar(){
    return {
        type: HIDE_SNACKBAR
    }
}