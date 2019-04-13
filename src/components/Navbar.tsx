import React from 'react';
import styled from 'styled-components/macro';

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Title>flavorli</Title>
    </NavbarWrapper>
  );
};

/* Export
============================================================================= */
export default Navbar;

/* Styled Components
============================================================================= */
const NavbarWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100%;
  border-bottom: 1px solid var(--alabaster);
  padding: 5px 20px;
  background: var(--white);
  opacity: 0.95;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
`;

const Title = styled.div`
  display: flex;
  font-family: Pacifico;
  font-size: 22px;
  flex: auto;
  justify-content: center;
  cursor: default;
`;
