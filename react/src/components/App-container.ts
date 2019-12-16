import { connect } from 'react-redux'
import App from './App';
import { showSnackbar } from '../store/Snackbar'
import { RootState } from '../store'

const mapStateToProps = (state: RootState)=>{
    console.log(state);
    return {}
}

const mapDispatchToProps = {
    showSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(App);