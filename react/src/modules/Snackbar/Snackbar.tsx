import * as React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'
import { amber, green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Slide from '@material-ui/core/Slide'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles,  {WithStyles} from  '@material-ui/core/styles/withStyles'
import { TransitionProps } from '@material-ui/core/transitions'
import { SHOW_PAYLOAD } from '../../store/Snackbar'

export interface Props extends WithStyles<typeof styles>, SHOW_PAYLOAD{
    className?: string,
    hideSnackbar?: ()=>void 
}
export const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const defaultProps: SHOW_PAYLOAD = Object.freeze({
    open: false,
    message: '',
    variant: 'info'
})

const styles = (theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});
 
class SnackbarUI extends React.PureComponent<Props> {
    public static readonly defaultProps = defaultProps;

    private handleClose (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, reason?: string): void {
        if(reason !== 'clickaway')
            this.props.hideSnackbar();
    }

    public render(){
        const {...other} = this.props;
        console.log(other);
        
        const { open, message, variant, classes, hideSnackbar } = this.props;
        const Icon = variantIcon[variant];
    
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={5000}
                onClose={this.handleClose.bind(this)}
            >
                <SnackbarContent
                className={classes[variant]}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={classes.icon + ' ' + classes.iconVariant} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton  onClick={hideSnackbar} key="close" aria-label="close" color="inherit">
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
                />
            </Snackbar>
        );
    }
}

function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="right" />;
}

export default withStyles(styles)(SnackbarUI);