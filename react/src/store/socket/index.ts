import { SOCKET_CONNECT, SOCKET_CONNECTED } from "../actionTypes"

export interface Socket{
    connection: WebSocket | null
}

export function socketConnect(){
    return {
        type: SOCKET_CONNECT
    }
}

export function socketConnected(connection: WebSocket){
    return {
        type: SOCKET_CONNECTED,
        connection
    }
}