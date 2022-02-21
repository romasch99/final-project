import React from 'react';
import {useAuth} from "../../hooks/useAuth";
import {
  Nav,
  NavLink,
  NavStart,
  NavImg,
  NavMenu
} from '../atoms/NavElements';

import {CardButton} from "../atoms/CardElements"
  
export const Navbar = ({goLogin, goRegister}) => {
    const auth = useAuth();
    
    const skillMenu = auth.token ? ( 
        <NavMenu>
            <NavLink to='/' >
                Customers
            </NavLink>
            <NavLink to='/shows' >
                Shows
            </NavLink>
        </NavMenu>    
    ) : null;
    
    const loginButtons =  auth.token ? (
        <NavStart>
            <NavImg src = {`${process.env.PUBLIC_URL}/logo192.png`} alt="logo"></NavImg>
            <CardButton onClick={() => auth.logout()} inputWidht= "8vw" inputColor = "#138d83d7" inputMarginTop ="0.5rem" inputFontSize = "1rem">
                Logout
            </CardButton>
        </NavStart>
    ) : (
        <NavStart>
            <NavImg src = {`${process.env.PUBLIC_URL}/logo192.png`} alt="logo"></NavImg>
            <CardButton onClick={goRegister} inputWidht= "8vw" inputColor = "#138d83d7" inputMarginTop ="0.5rem" inputFontSize = "1rem">
                Register
            </CardButton>
            <CardButton onClick={goLogin} inputWidht= "8vw" inputColor = "#138d83d7" inputMarginTop ="0.5rem" inputFontSize = "1rem">
                Login
            </CardButton>
        </NavStart>
    );
    
    return (
        <>
        <Nav>
            {loginButtons}
            {skillMenu}
        </Nav>
        </>
  );
};
