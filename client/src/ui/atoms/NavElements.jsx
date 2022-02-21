import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background:  #f39c12 ;
  height: 65px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 90vw) / 2) 1.2rem;
  z-index: 12;
  /* justify-content: flex-start; */
`;
  
export const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color:  #24395e
    ;
  }
`;
  
export const NavStart = styled.div`
  justify-content: flex-start;
`;

export const NavImg = styled.img`
  margin: 18px 40px 0 0;
  height: 32px;
  width: 32px;
  box-sizing: content-box;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
  
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  margin-top: 24px;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
  
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #808080;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color:  #566573;
  }
`;
