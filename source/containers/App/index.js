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

const options = {
    avatar,
    currentUserFirstName: 'Лилия',//'Дмитрий',
    currentUserLastName:  'Полежаева',//'Вакациенко',
};

@hot(module)
export default class App extends Component {
    state = {
        access: false,
    };



    render () {
        const { access } = this.state;
        console.log('access App',access);

        return (
            <Catcher>                
                <Provider value = { options }>
                    <StatusBar />
                    <Switch>
                        <Route component = { Login } path = '/login' />
                        <Route component = { Feed } path = '/feed' />                    
                        {access && <Route component = { Profile } path = '/profile' />}
                        <Redirect to = '/login' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
