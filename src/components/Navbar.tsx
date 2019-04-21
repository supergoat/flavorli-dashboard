import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';
import styled from 'styled-components/macro';
import LogOutButton from '../containers/LogOutButton';
import Colours from '../Colours';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasShadow(window.scrollY !== 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <NavbarWrapper hasShadow={hasShadow}>
      <OpenTimes>
        <Dot /> Open - Accepting Orders
      </OpenTimes>
      <RestaurantInfo onClick={() => setShowDropdown(d => !d)}>
        <RestaurantName>
          <p>BIFF'S JACK SHACK</p>
          <p>Biff Burrows</p>
        </RestaurantName>
        <Avatar />
      </RestaurantInfo>

      <Dropdown showDropdown={showDropdown}>
        <DropDownItem>Account</DropDownItem>
        <DropDownItem onClick={() => navigate('/menu-builder')}>
          Menu Builder
        </DropDownItem>
        <DropDownItem onClick={() => navigate('/')}>Orders</DropDownItem>
        <DropDownItem>Order History</DropDownItem>
        <DropDownItem>Settings</DropDownItem>

        <DropDownItem>
          <LogOutButton />
        </DropDownItem>
      </Dropdown>
    </NavbarWrapper>
  );
};

/* Export
============================================================================= */
export default Navbar;

/* Styled Components
============================================================================= */
interface NavbarWrapperProps {
  hasShadow?: boolean;
}
const NavbarWrapper = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  width: calc(100% - 370px);
  padding: 0 20px;
  background: var(--white);
  opacity: 0.98;

  &:after {
    content: '';
    z-index: -1;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 600px;
    height: 60px;
    margin: 0 auto;
    box-shadow: ${(props: NavbarWrapperProps) =>
      props.hasShadow ? '0 6px 4px -4px rgba(0, 0, 0, 0.2)' : 'none'};
  }
`;

const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  background: green;
  margin-right: 5px;
`;

const OpenTimes = styled.div`
  display: flex;
  align-items: center;
`;

const RestaurantInfo = styled.div`
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

const RestaurantName = styled.div`
  text-align: right;
  margin-right: 10px;
  font-size: 14px;
  p:last-of-type {
    font-weight: bold;
  }
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: var(--osloGrey);
`;

interface DropdownProps {
  showDropdown?: boolean;
}
const Dropdown = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 250px;
  background: ${Colours.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 70px 25px 15px;
  transition: transform 200ms;
  transform: ${(props: DropdownProps) =>
    props.showDropdown ? 'translateX(0)' : 'translateX(110%)'};
`;

const DropDownItem = styled.li`
  padding: 15px 0;
  user-select: none;

  &:last-of-type {
    margin-top: 30px;
    text-align: right;
    width: 100%;
    border-top: 1px solid var(--gallery);
  }
`;
