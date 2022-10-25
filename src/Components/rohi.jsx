import axios from 'axios'
import React, { useEffect } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap'

function Rohi () {
  const FetchData = async () => {
    try {
      const res = await axios.get(
        'https://www.breakingbadapi.com/api/characters'
      )
      console.log('data', res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    FetchData()
  })
  return (
    <div>
      <Navbar>
        <NavbarBrand href='/'>reactstrap</NavbarBrand>
        <NavbarToggler onClick={''} />
        <Collapse isOpen={''} navbar>
          <Nav className='me-auto' navbar>
            <NavItem>
              <NavLink href='/components/'>Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://github.com/reactstrap/reactstrap'>
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Rohi
