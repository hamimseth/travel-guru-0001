import React, { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { Context } from '../../App';

const PrivateRoute = ({children,...rest}) => {

    const [showPlace, setShowPlace, loggedIn, setLoggedIn] = useContext(Context) 
    const location = useLocation()

    return (
        <Route
            {...rest}
            render={
                ()=> loggedIn ?
                 (children)
                : (
                    <Redirect to={
                        {pathname:"/auth",
                            location
                    }
                }
            />
        )
            
        }

        />
    );
};

export default PrivateRoute;