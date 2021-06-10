import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function FormContainer({children}) {
    return (
        <div style={{backgroundImage: `url("https://ocean-of-technologies.s3.us-east-2.amazonaws.com/bg.png")`, height: '100vh'}}>
        <Container>
            <Row className="justify-content-md-center">
                <Col style={{background: '#fff', padding: 25, borderRadius:10, marginTop: 150}} xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default FormContainer
