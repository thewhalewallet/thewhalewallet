import React, { Component } from 'react';
import logo from '/public/theWaleWalletLogo.jpeg';
import BasicLayout from '@/components/BasicLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

import AppleLogin from 'react-apple-login'

function Login() {

    const navContent = (<></>);
    const bodyContent = (
        <>
            <div className="login_title-logo">
                <h1>The Wale Wallet</h1>
                <img style={{width: "200px"}} src={logo.src} alt="TheWaleWallet Logo"/>
            </div>
            <div className="login_logins">
                <h3>Sign in : </h3>
                <GoogleOAuthProvider clientId=''>
                    <GoogleLogin 
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </GoogleOAuthProvider>
                <AppleLogin clientId='' redirectURI='' />
            </div>
        </>
    );

    return (
        <BasicLayout navContent={navContent} bodyContent={bodyContent} />
    );
}

export default Login;

