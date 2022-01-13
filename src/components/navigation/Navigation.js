import React from "react";

const Navigation = ({isSignedIn, onRouteChange}) => {
    if(isSignedIn) { // if sign in, only sign out button will be displayed
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p 
                    className="f3 link dim black underline pa3 pointer" 
                    onClick={() => onRouteChange('signin')}> 
                    Sign Out 
                </p>
            </nav>
        );
    }
    else { // if not, both sign in and register buttons will be displayed
        return(
            <div>
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                    <p 
                        className="f3 link dim black underline pa3 pointer" 
                        onClick={() => onRouteChange('signin')}> 
                        Sign In 
                    </p>
                    <p 
                        className="f3 link dim black underline pa3 pointer" 
                        onClick={() => onRouteChange('register')}> 
                        Register 
                    </p>
                </nav>
            </div>
        );
    }
}

export default Navigation;