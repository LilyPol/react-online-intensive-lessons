import React, {Component} from 'react';
import moment from 'moment';

import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

import Styles from './styles.m.css';
import {getUniqueID} from 'instruments';

export default class Feed extends Component {
    constructor(){
        super();

        this._createPost = this._createPost.bind(this);
    }

    state = {
        posts: [
            {id: '123', comment: 'Hi there!', created: 1526825076849},
            {id: '456', comment: 'Приветик!', created: 1526825077500} 
        ],
        isPostsFetching: false
    };
    
    _createPost(comment){
        const post = {
            id: getUniqueID(),
            created: moment.now(),
            comment,
        };

        this.setState(({posts}) =>({
            posts: [post, ...posts],
        }));
    }
    
    render() {
        const {posts} = this.state; 
        const {isPostsFetching} = this.state;
        
        /*console.log('1 Feed this.state=',this.state);        
        console.log('1 Feed isSpinning=',isPostsFetching)*/

        const postsJSX = posts.map((post) => {
            //console.log('Feed post.isSpinning=',post.isSpinning);
            return <Post key = {post.id} {...post} />;
        });

        //      
        /* console.log('2 Feed isSpinning=',this.state.isPostsFetching)
        setTimeout(() => this.setState({
            isPostsFetching: !this.state.isPostsFetching
        }), 5000)
        console.log('3 Feed isSpinning=',this.state.isPostsFetching) */                      
        //

        return (        
        <section className = {Styles.feed}>        
            <Spinner isSpinning = {isPostsFetching} />            
            <StatusBar />            
            <Composer _createPost = {this._createPost} />
            {postsJSX}
        </section>
        );
    }
}