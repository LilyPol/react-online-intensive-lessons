import React, { Component } from 'react';

import { withProfile } from 'components/HOC/withProfile';

import Styles from './styles.m.css';

@withProfile
export default class Login extends Component {
    constructor () {
        super ();

         this.state = {                    
                access:               false,                
            }; 
        }
        
    _handleFormSubmit  = () => {        
        this.setState({
            access: true,
        });       
    };

    render () {
        return (            
                <section className = { Styles.login }>                    
                    <form onSubmit = { this._handleFormSubmit }>                          
                        <input type = 'submit' value = '    Войти    ' />
                    </form>
                </section>                            
        );        
    }
}