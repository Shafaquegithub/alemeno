import React, { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo>MyLogo</Logo>
        <HamburgerIcon onClick={toggleNavbar}>
          {isOpen ? <ImCross /> : <FaBars />}
        </HamburgerIcon>
        <NavLinks isOpen={isOpen}>
          <Link className="link" to="/" onClick={() => setIsOpen(false)}>
            Courses
          </Link>
          <Link
            className="link"
            to="/dashboard"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        </NavLinks>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;

// Styled Components
const NavbarContainer = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 20px 30px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 99;
`;

const NavLinks = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    position: fixed;
    flex-direction: column;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    padding-top: 100px;
    background-color: #0f0f0ff1;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  }
  .link {
    color: #fff;
    text-decoration: none;
    margin-left: 20px;
    &:hover {
      color: #00bcd4;
    }
    @media screen and (max-width: 768px) {
      padding: 20px 0;
    }
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 30px;
  font-size: 20px;
  z-index: 100;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;
