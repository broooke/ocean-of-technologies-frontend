/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { Navbar, Nav, Container, Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Menu() {
    return (

        <header className="border" style={{background: '#F7F7F8', padding: 15}}>
			<Navbar expand="lg" collapseOnSelect>
				<Container>
                <Row style={{width: '100%'}}>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
                            <Col style={{display: 'flex', justifyContent: 'flex-start'}}>
                                <Nav >
                                    <LinkContainer style={{color:'black', textDecoration: 'none', marginLeft: 15}} to='/'>
                                        <a>Все потоки</a>
                                    </LinkContainer>
                                    <LinkContainer style={{color:'black', textDecoration: 'none', marginLeft: 15}} to='?category=programmirovanie'>
                                        <a>Программирование</a>
                                    </LinkContainer>

                                    <LinkContainer style={{color:'black', textDecoration: 'none', marginLeft: 15}} to='?category=devops'>
                                        <a>Devops</a>
                                    </LinkContainer>

                                    <LinkContainer style={{color:'black', textDecoration: 'none', marginLeft: 15}} to='/qjjj'>
                                        <a>Системное администрирование</a>
                                    </LinkContainer>
                                </Nav>
                            </Col>
                            <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Nav>
                                    <LinkContainer style={{color: '#686c7d', border: '1px solid #bbbcc4', borderRadius: '8px', background: '#fff' }} to='/lll'>
                                        <button>Тех. поддержка</button>
                                    </LinkContainer>
                                    <LinkContainer style={{color: '#686c7d', border: '1px solid #bbbcc4', borderRadius: '8px', marginLeft: 8, background: '#fff' }} to='/lll'>
                                        <button>Написать статью</button>
                                    </LinkContainer>
                                </Nav>
                            </Col>
					</Navbar.Collapse>
                </Row>
				</Container>
			</Navbar>
		</header>
//         <Container>
//   <Row>
//     <Col>1 of 2</Col>
//     <Col>2 of 2</Col>
//   </Row>
//   <Row>
//     <Col>1 of 3</Col>
//     <Col>2 of 3</Col>
//     <Col>3 of 3</Col>
//   </Row>
// </Container>
    )
}

export default Menu
