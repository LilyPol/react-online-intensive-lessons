import React, {Component} from 'react';

import Styles from './styles.m.css';

import moment from 'moment';

export default class Post extends Component {
    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName
        } = this.props;
        return (
            <section className = {Styles.post}> 
                <img src = {avatar} />
                <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                <time>{moment().format('MMMM DD h:mm:ss a')}</time>
                <p>Howdy!</p>
            </section>
        );
    }
}
