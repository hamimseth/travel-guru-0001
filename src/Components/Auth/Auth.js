import { FormGroup } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import "./Auth.css"
import Header from '../Header/Header'
import logoBlack from '../../images/Logo-black.png'
import fb from '../../images/Icon/fb.png'
import google from '../../images/Icon/google.png'
import * as firebase from "firebase/app";
import { Context } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';



const Auth = () => {   
    const [showPlace, setShowPlace, loggedIn, setLoggedIn, name, setName] = useContext(Context)
    const [confirmationError, setConfirmationError]=useState(false)
    const [isSignedUp, setisSignedUp]=useState(false)
    const [submiter, setSubmiter]=useState("")
    const [user, setUser]=useState({})
    const location=useLocation().location?.pathname
    const history=useHistory()
    const [verified, setVerified]=useState("null")
    const [verifyMessage, setVerifyMessage]=useState(false)
    

    const formHandler=(event)=>{
        event.preventDefault()
            if(submiter === "signup") {
                user.password === user.confirmationPassword ?
                firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
                .then(res=>{
                    setConfirmationError(false)
                    setUser({...user, signupError:""})
                    setisSignedUp(true)
                    setVerifyMessage(true)
                    const currentUser = firebase.auth().currentUser;
                    currentUser.updateProfile({
                    displayName: `${user.fname} ${user.lname}`
                    })
                    currentUser.sendEmailVerification()

                })
                .catch(err=>{
                    setUser({...user, signupError:err.message})
                })
                : setConfirmationError(true)
            }

        if(submiter === "signin"){
            setVerifyMessage(false)
            setUser({...user, signinError:""})
                    firebase.auth().signInWithEmailAndPassword(user.email,user.password)
                    .then(res=>{
                        const currentUser = firebase.auth().currentUser;
                        setName(currentUser.displayName)
                        if(currentUser.emailVerified){
                            setLoggedIn(true)
                            history.replace(location || "/" )
                        }else{
                            currentUser.sendEmailVerification()
                            setVerified("false")
                        }

                    })
                    .catch(err=>{
                        setUser({...user, signinError:err.message})
                    })
                
             }     
    }

//Facebook-signin
    const facebookSigninHandler =()=>{
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(res=>{
            const currentUser = firebase.auth().currentUser;
            setName(currentUser.displayName)
            setLoggedIn(true)
            history.replace(location || '/')
        })
        .catch(err=>{
            setUser({...user, signinError:err.message})
        })
    }

// Google-signin 
    const googleSigninHandler =()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(res=>{
            const currentUser = firebase.auth().currentUser;
            setName(currentUser.displayName)
            setLoggedIn(true)
            history.replace(location || '/')
        })
        .catch(err=>{
            setUser({...user, signinError:err.message})
        })
    }


//signup-and-login-toogler-button
    const loginToggleHandler=()=>{
        setisSignedUp(true)
        setConfirmationError(false) 
        setUser({...user, signupError:""})
    }
    const signupToggleHandler=()=>{
        setisSignedUp(false)
        setUser({...user, signinError:""})
    }
    const sendVerification=(email)=>{
        firebase.auth().sendPasswordResetEmail(email)
    }

    return (
        <div>  
            <Header  color="black" img={logoBlack}></Header>

            <form onSubmit={formHandler}
            className="form-group auth-form-group"> 

                {
                        verifyMessage && 
                            <h5 style={{
                                textAlign:"center",
                                width:"150px",
                                margin:"auto",
                                padding:"5px",
                                borderRadius:"15px",
                                background:"#268b268c",
                                color:"white"
                            }}>
                                Verification mail sent!
                            </h5>
                    }

                <FormGroup>
                    {
                        isSignedUp? <h2 style={{textAlign:"left"}}>Login</h2>
                        : <h2 style={{textAlign:"left"}}>Create an account</h2>
                    }

                    {
                        !isSignedUp && <>
                            <input onBlur={(event)=>setUser({...user,fname:event.target.value})}
                                type="text" placeholder="First name" required/>
                            <input onBlur={(event)=>setUser({...user,lname:event.target.value})}
                                type="text" placeholder="Last name" required/>
                        </> 
                    }

                    <input onBlur={(event)=>setUser({...user,email:event.target.value})}
                        type="email" placeholder="Email address" required/>

                    <input onBlur={(event)=>setUser({...user,password:event.target.value})}
                        type="password" placeholder="Password" required/>
                    {
                        !isSignedUp && 
                            <input onBlur={(event)=>setUser({...user,confirmationPassword:event.target.value})}
                                type="password" placeholder="Confirm Password" required/>
                    }

                    {
                        isSignedUp && 
                            <div style={{display:"flex", justifyContent:"space-between", fontSize:"13px", fontWeight:"500"}}>
                                <div style={{display:"flex", alignItems:"center"}}>     
                                    <input id="checkbox" type="Checkbox" />
                                    <label htmlFor="checkbox" style={{marginBottom:"6px"}}>
                                        Remember me
                                    </label>
                                </div>
                                <p onClick={ ()=>user.email && sendVerification(user.email)} style={{color:"#3b5998"}}>Forgotten password?</p>
                            </div>
                    }

                    {
                        user.signinError ?
                            <p style={{color:"red", fontSize:"15px"}}>
                                {user.signinError}
                            </p>
                        : ""
                    }
                    {
                         verified &&
                         verified==="false" &&
                            <p style={{color:"red", fontSize:"15px"}}>
                                 Inverified
                            </p>

                    }
                    {
                         user.signupError ?
                            <p style={{color:"red", fontSize:"15px"}}>
                                {user.signupError}
                            </p>
                         : ""
                    }
                    
                    {
                        confirmationError ?
                            <p style={{color:"red", fontSize:"15px"}}>
                                Wrong password
                            </p>
                        : ""
                    }
                    {
                        isSignedUp ?
                        <input name="signin" type="submit" value="Signin" 
                            onClick={(event)=>setSubmiter(event.target.name)} />

                        : <input name="signup" type="submit" value="Signup"                     
                            onClick={(event)=>setSubmiter(event.target.name)} />
                    }
                </FormGroup>
                    {
                        isSignedUp ?
                            <>
                                <span>Don't have an account? </span>
                                <span onClick={signupToggleHandler} 
                                    style={{color:"#3b5998"}}>
                                        Signup
                                </span>
                            </>
                        
                        :<>
                            <span>Already have an account? </span>
                            <span onClick={loginToggleHandler} 
                                style={{color:"#3b5998"}}>
                                    Login
                            </span>
                        </>
                        
                    } 
            </form>


       
           <div style={{width:"300px", margin:"auto"}}>
                    <div onClick={facebookSigninHandler}
                        style={{cursor:"pointer"}} 
                        className="auth-provider-section">
                    <img style={{width:"25px", height:"25px", marginRight:"7px"}} src={fb} alt=""/>
                    <p>
                        Continue with Facebook
                    </p>
                </div>
                <div onClick={googleSigninHandler} 
                        style={{cursor:"pointer"}} 
                        className="auth-provider-section">
                    <img style={{width:"25px", height:"25px", marginRight:"7px"}} src={google} alt=""/>
                    <p>
                        Continue with Google
                    </p>
                </div>

            </div>
        </div>
    );
 }

export default Auth;