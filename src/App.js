import React, { createContext, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Booking from './Components/Booking/Booking';
import Destination from './Components/Destination/Destination';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Auth from './Components/Auth/Auth';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import News from './Components/News/News'
import Blog from './Components/Blog/Blog';
import Contact from './Components/Contact/Contact';
import NotFound from './Components/NotFound/NotFound';

export const Context=createContext()
firebase.initializeApp(firebaseConfig);
function App() {

  const [showArea,setShowArea]=useState(
    {
      id:1,
      title:"Cox's Bazar",
      description:"Why Cox's Bazar is a Great Tourist Attraction Cox's Bazar Review. Cox's Bazar is famous for its long natural sandy sea beach. ... Cox's Bazar has the world's largest unbroken sea beach which stretches more than 120 km. The entire beach is a stretch of golden sandy sea beach which is reachable by motorbike.",
      img:"https://i.ibb.co/p1Fm5yD/coxsbazar.png"
    }
  )

  const [loggedIn,setLoggedIn]=useState(false)
  const [name, setName]=useState("user")
  return (
    <Context.Provider value={[showArea,setShowArea,loggedIn,setLoggedIn,name, setName]}>
    <Router>
      <Switch>

        <Route exact path="/">
          <Home></Home>
        </Route>

        <Route exact path="/booking">
          <Booking></Booking>
        </Route>

        <Route exact path="/auth">
          <Auth></Auth>
        </Route>

        <PrivateRoute exact path="/booking/destination">
          <Destination></Destination>
        </PrivateRoute>

        <Route path="/news">
          <News></News>
        </Route>

        <Route path="/blog">
          <Blog></Blog>
        </Route>

        <Route path="/contact">
          <Contact></Contact>
        </Route>

    {/* Not Found Route */}
        <Route path="*">
          <NotFound></NotFound>
        </Route>

      </Switch>
    </Router>
    
    </Context.Provider>
  );
}

export default App;