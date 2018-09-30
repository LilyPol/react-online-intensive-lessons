import React, {Component} from 'react';

import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            {id: '123', comment: 'Hi there!', created: 1526825076849},
            {id: '456', comment: 'Приветик!', created: 1526825077500} 
        ],
        isSpinning: false //
    };   
    
    render() {
        const {posts} = this.state; 
        const {isSpinning} = this.state; //
        
        console.log('1 Feed this.state=',this.state);        
        console.log('1 Feed isSpinning=',isSpinning)

        const postsJSX = posts.map((post) => {
            //console.log('Feed post.isSpinning=',post.isSpinning);
            return <Post key = {post.id} {...post} />;
        });

        //      
        console.log('2 Feed isSpinning=',this.state.isSpinning)
        setTimeout(() => this.setState({
            isSpinning: !this.state.isSpinning
        }), 15000)
        console.log('3 Feed isSpinning=',this.state.isSpinning)                      
        //

        return (        
        <section className = {Styles.feed}>        
            <Spinner isSpinning />            
            <StatusBar />            
            <Composer />
            {postsJSX}
        </section>
        );
    }
}