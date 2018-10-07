import React, { Component } from 'react';
//import moment from 'moment';

import { withProfile } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

import Styles from './styles.m.css';
//import { getUniqueID } from 'instruments';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';
//import { delay } from '../../instruments';

@withProfile
export default class Feed extends Component {
    state = {
        posts: [
            /*{ id: '123', comment: 'Hi there!', created: 1526825076849, likes: [] },
            { id: '456', comment: 'Приветик!', created: 1526825077500, likes: [] } */
        ],
        isSpinning: false,
    };

    componentDidMount () {
        const { currentUserFirstName,currentUserLastName } = this.props;
        this._fetchPosts();
        //this.refetch = setInterval(this._fetchPosts, 1000);

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
                }));
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter( (post) => post.id !== removedPost.id),
                }));
            }
        });
    }

    componentWillUnmount () {
        //clearInterval(this.refetch);
        socket.removeListener('create');
        socket.removeListener('remove');
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        });
    };

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',            
        });       

        const {data: posts} = await response.json();

        console.log('-> fetched posts', posts)

        this.setState({
            posts,
            isSpinning: false,
        });
    };
    
     _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN
            },
            body: JSON.stringify({ comment }),
        });
        
        const {data: post} = await response.json();

        /*const post = {
            id:      getUniqueID(),
            created: moment.now(),
            comment,
            likes:   []
        };*/      

        this.setState(({ posts }) => ({
            posts:      [post, ...posts],
            isSpinning: false,
        }));
    }

     _likePost = async (id) => {      
        this._setPostsFetchingState(true);
        
        const response = await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {                
                Authorization: TOKEN,
            },            
        });

        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts: posts.map(post => post.id === likedPost.id ? likedPost : post,
            ),
            isSpinning: false,                
        }));                    
    };
    
     _removePost = async (id) => {
        this._setPostsFetchingState(true);        

        //await delay(1200);
                
        this.setState(({ posts }) => ({            
            posts:      posts.filter((post) => post.id !== id),
            isSpinning: false,
        })
        )    
    } 

    render () {
        const { posts, isSpinning } = this.state;

        console.log('-> this.state', this.state)

        const postsJSX = posts.map((post) => {            
            return (
                <Catcher key = { post.id }>
                    <Post                         
                        { ...post }                         
                        _likePost = { this._likePost }
                        _removePost = { this._removePost } 
                    />
                </Catcher>
            );
        });

        return (        
            <section className = { Styles.feed }>        
                <Spinner isSpinning = { isSpinning } />            
                <StatusBar />            
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}