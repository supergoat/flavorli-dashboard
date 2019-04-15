import React, {useState} from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <NavbarWrapper>
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
        <DropDownItem>Menu</DropDownItem>
        <DropDownItem>Order History</DropDownItem>
        <DropDownItem>Settings</DropDownItem>
        <DropDownItem>Log Out</DropDownItem>
      </Dropdown>
    </NavbarWrapper>
  );
};

/* Export
============================================================================= */
export default Navbar;

/* Styled Components
============================================================================= */
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
  background: var(--alabaster);
  opacity: 0.98;
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
