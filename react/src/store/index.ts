import { combineReducers } from 'redux'
import Snackbar from './Snackbar/reducer'
import Socket from './socket/reducer'
 const rootReducer = combineReducers({
    Snackbar,
    Socket
  });

  export default rootReducer;
  export type RootState = ReturnType<typeof rootReducer>

