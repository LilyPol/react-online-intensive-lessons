import React, {Component} from 'react';
import {createPortal} from 'react-dom';

import Styles from './styles.m.css';

const portal = document.getElementById('spinner');

export default class Spinner extends Component{
    render () {
        const {isSpinning} = this.props;
        console.log('Spinner this.props',this.props);
        console.log('Spinner isSpinning',isSpinning);

        return createPortal(
            isSpinning ? <div className = {Styles.spinner} /> : null,                        
            portal,
        )
    }
}