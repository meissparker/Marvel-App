import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from 'react-router-dom';
import styles from './ViewCharacters.module.css'


function ViewCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/characters")
    .then((response) => { 
      setCharacters(response.data);
      setLoading(false);
    })
    .catch((error) => {
      setError("Failed to generate characters.")
      setLoading(false);
    })
  }, []);

  if (loading) return (
    <div className={styles.messagebox}>
   <p className={styles.message}>Loading characters...</p>
   </div>)
    if (error) return (
      <div className={styles.messagebox}>
     <p className={styles.message}>{error}</p>
     </div>)

  return (
    <div>
    <Container>
      <Row>
        {characters.map((character) => (
            <Col key={character.id} md={4} className="mb-3" >
                <Card className={styles.box}>
                    <Card.Img className={styles.image} variant="top" src={character.image_url} alt={character.name}/>
                    <Card.Body className={styles.box}>
                      <Card.Title style={{color: 'red'}} className={styles.title}>{character.name}</Card.Title>
                      
                      <Link className={styles.custom_button} to={`/characters/${character.id}`}>View Details</Link> 
                    </Card.Body>
                </Card>
            </Col>
        ))}
      </Row>
    
</Container>

</div>
  )

}
  export default ViewCharacters