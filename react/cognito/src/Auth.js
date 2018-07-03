import {AuthenticationDetails,
        CognitoUserPool,
        CognitoUser} from 'amazon-cognito-identity-js';
import React, { Component } from 'react';
import appConfig from './config.js';

const poolData = {
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
};

const authenticationData = {
    Username : 'mqll',
    Password : 'azerty123',
};

class Auth extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            authenticated: false
        };
    }
    
    authenticate() {

        const authenticationDetails = new AuthenticationDetails(authenticationData);
        
        const userPool = new CognitoUserPool(poolData);
        
        const userData = {
            Username : 'mqll',
            Pool : userPool
        };
        
        const cognitoUser = new CognitoUser(userData);
        
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                console.log('Id token + ' + result.getIdToken().getJwtToken());      // -> This is this one to use to fetch protected APIGateway (Authorization: ..)
            },
        
            onFailure: function(err) {
                console.log(err);
                console.log(new Error().stack);
            },
        
        });
                
    }
    
    componentDidMount() {
        this.authenticate();
    }
    
    render() {
        const status = this.state.authenticated ? ( <div>Authenticated</div> ) :
                    ( <div>Not authenticated</div> );
        return (
            <div>{status}</div>
        );
    }
}

export default Auth;