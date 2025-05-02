import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import styles from './CreateCharacter.module.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'

function CreateCharacter() {
    const [formData, setFormData] = useState({
        name: "",
        alias: "",
        alignment: "",
        powers: "",
        image_url: "",
    });

    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate();
    const [character, setCharacter] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePost = async (e) => {
        e.preventDefault();
        

        try {
            const response = await axios.post(`http://127.0.0.1:5000/characters`, formData);
            console.log(response.data)
            setCharacter(response.data)
            setSubmitted(true);
            setError(null);
        } catch (error) {
            setError("Failed to create character.");
        } 
    };

    return (
        <Container>  
            <h2 className={styles.title}>Create a Character</h2>

            {submitted && <Alert variant="success" dismissible>{character.name} created successfully!</Alert>}
            {error && <Alert variant="danger" dismissible>{error}</Alert>}

            <Form onSubmit={handlePost} className={styles.form}>
                <Form.Group>
                    <Form.Label className={styles.label}>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label}>Alias:</Form.Label>
                    <Form.Control
                        type="text"
                        name="alias"
                        value={formData.alias}
                        onChange={handleInputChange}
                        placeholder="Alias"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label}>Alignment:</Form.Label>
                    <Form.Control
                        type="text"
                        name="alignment"
                        value={formData.alignment}
                        onChange={handleInputChange}
                        placeholder="Alignment"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label}>Powers:</Form.Label>
                    <Form.Control
                        type="text"
                        name="powers"
                        value={formData.powers}
                        onChange={handleInputChange}
                        placeholder="Powers"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label}>Image URL:</Form.Label>
                    <Form.Control
                        type="text"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                    />
                </Form.Group>

                <Button type="submit" className={styles.button} >
                     Save Changes
                </Button>
            </Form>
        </Container>
    );
}

export default CreateCharacter;