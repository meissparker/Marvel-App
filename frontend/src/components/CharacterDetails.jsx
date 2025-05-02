import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from 'react-router-dom';
import styles from './CharacterDetails.module.css';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'

function CharacterDetails() {
    const [formData, setFormData] = useState({
        name: "",
        alias: "",
        alignment: "",
        powers: "",
        image_url: ""
      })
      const [character, setCharacter] = useState(null)
      const [message, setMessage] = useState(null)
      const {id} = useParams();
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
      const [editMode, setEditMode] = useState(false)
      const navigate = useNavigate()
      const [showModal, setShowModal] = useState(false);
      const handleShowModal = () => setShowModal(true)
      const handleCloseModal = () => setShowModal(false);
      
      
    
      useEffect(() => {
        axios.get(`http://127.0.0.1:5000/characters/${id}`)
        .then((response) => {
          setCharacter(response.data);
          setFormData({
            name: response.data.name,
            alias: response.data.alias,
            alignment: response.data.alignment,
            powers: response.data.powers,
            image_url: response.data.image_url
          })
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to load character")
          setLoading(false)
          setTimeout(() => {
            navigate('/');
          }, 2000)
        })
      }, [id]);
    
      const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`http://127.0.0.1:5000/characters/${id}`)
        .then(() => {
            setMessage("Character has been successfully deleted.")
            setCharacter(null)
            setLoading(false)
            setTimeout(() => {
                navigate('/');
            }, 2000)
        })
        .catch((error) => {
            setError("Failed to delete item.")
            setLoading(false)

        })
        }
    
        const handleInputChange = (e) => {
          const {name, value} = e.target;
          setFormData((prevData) => ({
              ...prevData,
              [name]: value
          }));
      };
    
        const handleEdit = (e) => {
            e.preventDefault();
            axios.put(`http://127.0.0.1:5000/characters/${id}`, formData)
            .then(() => {
                setEditMode(false);
                setMessage("Character updated successfully!")

            })
            .catch((error) => {
                console.error(error)
                setError("Failed to edit character.")
                setLoading(false)
            })
          }
         
        if (loading) return (
          <div className={styles.messagebox}>
          <p className={styles.message}>Loading Character...</p>
          </div>)
        
        if (error) return (
          <div className={styles.messagebox}>
         <p className={styles.message}>{error}</p>
         </div>)

        if (message) return (
          <div className={styles.messagebox}>
        <p className={styles.message}>{message}</p>
        </div>)
    
        return( 
          editMode ? (
            <Form onSubmit={handleEdit} className={styles.editform}>

              <Form.Group>
                <Form.Label className={styles.name_label}>Name: </Form.Label>
                <Form.Control className={styles.formbox}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Title"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className={styles.label}>Alias: </Form.Label>
                <Form.Control className={styles.formbox}
                type="text"
                name="alias"
                value={formData.alias}
                onChange={handleInputChange}
                placeholder="Alias"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className={styles.label}>Alignment: </Form.Label>
                <Form.Control className={styles.formbox}
                  type="text"
                  name="alignment"
                  value={formData.alignment}
                  onChange={handleInputChange}
                  placeholder="Alignment"
                  />
              </Form.Group>

              <Form.Group>
                <Form.Label className={styles.label}>Powers: </Form.Label>
                <Form.Control className={styles.formbox}
                  type="text"
                  name="powers"
                  value={formData.powers}
                  onChange={handleInputChange}
                  placeholder="Powers"
                  />
              </Form.Group>

              <Form.Group>
                <Form.Label className={styles.label}>Image URL: </Form.Label>
                <Form.Control className={styles.formbox}
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="Alignment"
                  />
              </Form.Group>
  
              <Button type="submit" className={styles.edit}>Save Changes</Button>

            </Form>
          ) : (
            <>
            <Container className={styles.content_box}>
              <Card className="text-center">
                    <Card.Img 
                    className={styles.character_image}
                    variant="top" 
                    src={character.image_url} 
                    alt={character.title} 
                    />
                    <Card.Body >
                        <Card.Title style={{color: 'red'}}>Name: {character.name}</Card.Title>
                        <Card.Title style={{color: 'red'}}>Alias: {character.alias}</Card.Title>
                        <Card.Title style={{color: 'red'}}>Type: {character.alignment}</Card.Title>
                        <Card.Title style={{color: 'red'}}>Powers: {character.powers}</Card.Title>
                        
                        <div className={styles.box}>
                            <Button variant="danger" onClick={handleShowModal}>
                                Delete Character
                            </Button>
                            <Button style={{color: 'white'}} variant="primary" onClick={() => setEditMode(true)}>
                                Edit Character
                            </Button>
                          </div>
                      
                    </Card.Body>
              </Card>
            </Container>

            

            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this character? This action cannot be undone.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={(e) => {
                  handleCloseModal();
                  handleDelete(e);
                }}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
            </>
          )
           
        )
      
}

export default CharacterDetails