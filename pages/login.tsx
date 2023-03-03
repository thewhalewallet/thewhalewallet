import React, { Component } from 'react';
import Image from 'next/image';
import logo from '/public/theWaleWalletLogo.jpeg';
import BasicLayout from '@/components/BasicLayout';

function Login() {

    const navContent = (<></>);
    const bodyContent = (
        <>
            <div className="login_title-logo">
                <h1>The Whale Wallet</h1>
                <Image style={{width: "200px"}} src={logo.src} alt="TheWaleWallet Logo"/>
            </div>
            <div className="login_logins">
                <h3>Sign in : </h3>
                {/* <GoogleOAuthProvider clientId=''>
                    <GoogleLogin 
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </GoogleOAuthProvider> */}
                {/* <AppleLogin clientId='' redirectURI='' /> */}
            </div>
        </>
    );

    return (
        <BasicLayout navContent={navContent} bodyContent={bodyContent} />
    );
}

export default Login;

