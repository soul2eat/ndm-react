import { connect } from 'react-redux'

import Snackbar, { Props } from './Snackbar';
import { hideSnackbar } from '../../store/Snackbar';
import { RootState } from '../../store'
const mapStateToProps = (state: RootState): {}=>{
    const { Snackbar, } = state;
    return {...Snackbar}
}

const mapDispatchToProps = {
    hideSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);