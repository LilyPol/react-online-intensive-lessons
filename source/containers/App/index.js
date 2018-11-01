// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import { Provider } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Login from 'components/Login';

//Instruments
import avatar from 'theme/assets/lisa';

@hot(module)
export default class App extends Component {
    constructor () {
        super ();

        this.state = {            
                avatar,
                access:               true,
                currentUserFirstName: 'Лилия',//'Дмитрий',
                currentUserLastName:  'Полежаева',//'Вакациенко',
                _logout:              this._logout,
            };
        }

    _login = () => {
        this.setState({
            access: true,
        });
    };

    _logout = () => {
        this.setState({
            access: false,
        });
    };


    render () {
        const { access } = this.state;

        return (
            <Catcher>                
                <Provider value = { this.state }>
                    <StatusBar />
                    <Switch>
                        <Route
                            path = '/login'
                            render = { (props) => ( <Login _login = { this._login } { ...props } /> )}
                        />

                        { !access && <Redirect to = '/login' /> }
                        <Route component = { Feed } path = '/feed' />                    
                        <Route component = { Profile } path = '/profile' />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
