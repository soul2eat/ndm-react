import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faWindowMinimize } from '@fortawesome/free-regular-svg-icons/faWindowMinimize'
// const { remote } = require('electron');
import { remote } from "electron"


export default class Header extends React.PureComponent {
    maximize(): void{
        if(remote){
            if(remote.getCurrentWindow().isMaximized())
                remote.getCurrentWindow().unmaximize()
            else
                remote.getCurrentWindow().maximize()
        }
            
    }
    hide(): void{
        if(remote)
            remote.getCurrentWindow().minimize()
    }
    close(): void{
        if(remote)
            remote.getCurrentWindow().close()
    }
    render(): JSX.Element {
        return <div className="header">
            <div className="header-title">
                <Typography variant="h6" align="center">
                    NDM
            </Typography>
            </div>
            <div className="header-drag"/>
            <div className="header-bar">
                <div onClick={this.hide} className="header-icon-container">
                    <FontAwesomeIcon icon={faWindowMinimize} className="header-icon" />
                </div>
                <div onClick={this.maximize} className="header-icon-container">
                    <img src="assets/img/maximize.png" />
                </div>
                <div onClick={this.close} className="header-icon-container">
                    <FontAwesomeIcon icon={faTimes} className="header-icon header-icon-close" />
                </div>
            </div>
        </div>
    }
}