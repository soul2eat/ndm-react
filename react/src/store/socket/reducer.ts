import * as actionCreators from './' 
import InferValueTypes from "../../types/infer-types"
import { Socket } from "./";
import { SOCKET_CONNECT, SOCKET_CONNECTED } from "../actionTypes"

export type ActionTypes = ReturnType<InferValueTypes<typeof actionCreators>>;

const initialState: Socket = {
    connection: null
}

export default function (state = initialState, action: ActionTypes){
    switch(action.type){
        case 'SOCKET_CONNECTED':{
            return {
                ...state,
                connection: action.connection
            }
        }
    }
    return { ...state };
}