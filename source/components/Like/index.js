import React, {Component} from 'react';
import {string, arrayOf, func, shape} from 'prop-types';
import cx from 'classnames';

import Styles from './styles.m.css';

export default class Like extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id: string.isRequired,
        likes: arrayOf(
            shape({
                id: string.isRequired,
                firstName: string.isRequired,
                lastName: string.isRequired,
            }),
        ).isRequired,
    };

    constructor (){
        super();

        this._getLikedByMe = this._getLikedByMe.bind(this);
        this._getLikeStyle = this._getLikeStyle.bind(this);
        this._likePost = this._likePost.bind(this);
    }

    _likePost(){
        const {_likePost, id} = this.props;

        _likePost(id);
    }

    _getLikedByMe(){
        const {currentUserFirstName, currentUserLastName, likes} = this.props;

        return likes.some(({firstName, lastName}) => {
            return (`${firstName} ${lastName}` === 
                    `${currentUserFirstName}${currentUserLastName}`
            );
        });
    }

    _getLikeStyle(){
        const likedByMe = this._getLikedByMe();

        return cx(Styles.icon, {
            [Styles.liked]: likedByMe,
        })
    }

    render(){
        console.log('this.props',this.props);

        const likeStyles = this._getLikeStyle();

        return (
            <section className = {Styles.like}>
                <span className = {likeStyles} onClick = {this._likePost}> 
                    Like
                </span>
            </section>
        );
    }
}