import React, { Component } from 'react';

import { withProfile } from 'components/HOC/withProfile';

import Styles from './styles.m.css';

@withProfile
export default class Login extends Component {    
    _handleFormSubmit  = () => {        
        this.setState({
            access: true,
        });
    };

    render () {
        //const { access } = this.state;
        console.log('access Login this.state',this.state);
        console.log('access Login this.props',this.props);

        return (
                <section className = { Styles.login }>                    
                    <form onSubmit = { this._handleFormSubmit }>                          
                        <input type = 'submit' value = '    Войти    ' />
                    </form>
                </section>                
        );        
    }
}