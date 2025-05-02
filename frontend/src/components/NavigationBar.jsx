import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container'
import styles from './NavigationBar.module.css'
import React, {useState} from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'

function NavigationBar() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button variant="danger" onClick={handleShow} className={styles.fixed_top_button}>
            Menu 
         </Button>

         <Offcanvas show={show} onHide={handleClose} placement="end" className={styles.offCanvas}> 
            <Offcanvas.Header closeButton>
                <Offcanvas.Title style ={{color: 'red'}}>Marvel Database</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>


                    <Navbar bg="danger" variant="dark" className={`me-auto flex-column`} >

                        
                            <Nav className={`me-auto flex-column`}>
                                    <Nav.Link as={NavLink} to ="/" className={styles.link}>
                                        Home
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to ="/createcharacter" className={styles.link}>
                                        Create Character
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to ="/viewcharacter" className={styles.link}>
                                        View Character
                                    </Nav.Link>              
                            </Nav>
                    </Navbar>






                
            </Offcanvas.Body>
         </Offcanvas>

 
        
    </>
    )

}

export default NavigationBar

