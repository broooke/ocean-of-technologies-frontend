import React from 'react'
import { Navbar, Nav, Container, Col, Image, Row, Button, NavDropdown, DropdownButton, Dropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Search from './Search'
import photo from  '../user.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'


function Header() {
	const userLogin = useSelector(state=>state.userLogin)
	const {userInfo} = userLogin
	const dispatch = useDispatch()

	const logoutHandler = () => {
		dispatch(logout())
	}

    return (
        <header className='header p-2'>
			<Navbar className="border-bottom px-5" style={{backgroundColor: '#fff'}} fixed="top" expand="lg" collapseOnSelect>
					<LinkContainer style={{color: 'rgb(0, 97, 235)'}} exact={true} to='/'>
						<Navbar.Brand>Ocean Of Technologies</Navbar.Brand>
					</LinkContainer>
					<Row style={{width: '100%'}}>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Col>
							<Nav>
								<LinkContainer exact={true} to='/'>
									<Nav.Link>Статьи</Nav.Link>
								</LinkContainer>
							</Nav>
							</Col>
							<Col>
								<Nav style={{marginTop: 7}}>
									{/* <Image style={{border: '1px solid #e9eaec', borderRadius: '50%', marginLeft: '15px'}} src={photo} width="32px" height="32px" roundedCircle />		 */}
									{userInfo?(
										<div style={{marginLeft: 'auto'}}>
											<Row>
												<Col style={{padding: 0}}>
													<Image style={{border: '1px solid #e9eaec', borderRadius: '50%', marginLeft: '15px'}} src={photo} width="32px" height="32px" roundedCircle />
												</Col>
												<Col style={{paddingLeft: 0}}>
													<NavDropdown title={userInfo.username}>
														<LinkContainer to='/profile'>
															<NavDropdown.Item>Profile</NavDropdown.Item>
														</LinkContainer>

														<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
													</NavDropdown >
												</Col>
											</Row>
										</div>
									):(
										<LinkContainer style={{marginLeft: 'auto'}} to="/login">
											<Button style={{maxHeight: 37, marginLeft: 10}}>Войти</Button>
										</LinkContainer>
									)}
									<Search />
								</Nav>
							</Col>
							</Navbar.Collapse>
					</Row>
			</Navbar>
		</header>
    )
}

export default Header