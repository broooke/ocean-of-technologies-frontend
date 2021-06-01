import React from 'react'
import { Navbar, Nav, Container, Col, Image, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Search from './Search'
import photo from  '../user.png'

function Header() {
    return (
        <header className='header p-2'>
			<Navbar className="border" style={{backgroundColor: '#fff'}} fixed="top" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer exact={true} to='/'>
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

								<LinkContainer to='/q'>
									<Nav.Link>Вопросы</Nav.Link>
								</LinkContainer>
							</Nav>
							</Col>
							<Col>
								<Nav style={{marginTop: 7}}>
									<Search />
									<Image style={{border: '1px solid #e9eaec', borderRadius: '50%', marginLeft: '15px'}} src={photo} width="32px" height="32px" roundedCircle />		
								</Nav>
							</Col>
							</Navbar.Collapse>
					</Row>
				</Container>
			</Navbar>
		</header>
    )
}

export default Header