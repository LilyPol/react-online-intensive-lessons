import React, {Component} from 'react';

import Styles from './styles.m.css';

export default class Composer extends Component {
    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName
        } = this.props
        return (
        <section className = {Styles.statusBar}>
            <button>
                <img src = {avatar} />
                <span>{`${currentUserFirstName} ${currentUserLastName}`}</span>
            </button>
        </section>
        );
    }
}