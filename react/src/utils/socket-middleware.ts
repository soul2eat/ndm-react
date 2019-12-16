import config  from '../../config';
import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import { ActionTypes } from "../store/socket/reducer"
import { socketConnect, socketConnected } from "../store/socket"
import { RootState } from "../store";

const middleware: Middleware = (Store: MiddlewareAPI) => (next: Dispatch) => (action: ActionTypes) => {
    const { dispatch } = Store;
    const state: RootState = Store.getState();
    switch (action.type) {
        case 'SOCKET_CONNECT': {
            if (state.Socket.connection)
                break;
            const socket = new WebSocket('ws://' + config.host + ':' + config.apiPort);
            socket.onopen = function(){
                Store.dispatch(socketConnected(socket));
                console.log('Connected');
                console.log(socket);
                
                
            }
            socket.onclose = function (event: CloseEvent) {
                // connection == null
                dispatch(socketConnected(null));
                if (event.wasClean) {
                    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
                } else {
                    console.log(`[close]  Соединение прервано,  код=${event.code} причина=${event.reason}`);
                    setTimeout(dispatch.bind(Store), 5000, socketConnect());
                }
            }
            socket.onerror = function ( { message }: ErrorEvent) {
                console.log(`[error] ${message}`);
            };

            socket.onmessage = function ({ data }: MessageEvent){
                const json = JSON.parse(data) as ActionTypes;
                dispatch({...json});
            }
            next(action)
            break;
        }
        default:
            next(action);
            break;

    }
}

export default middleware;