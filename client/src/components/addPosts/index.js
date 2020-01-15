import React, {useState} from "react";
import "./index.css";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { CLOSEPOST } from "../../actions";
import API from "../../utils/API";

function AddPost(){  
    const [input, setInput] = useState({});
    const [image, setImage] = useState({});
    const [file, setFile] = useState({});
    const showPost = useSelector(state => state.showPost);  
    const userState = useSelector(state => state.userData);
    const dispatch = useDispatch();
    let data = new FormData();
    const close = () => {
        dispatch(CLOSEPOST())
    };   
    const handleSubmit = e => {
        e.preventDefault();   
        console.log(data);
        for(const i in input){
            data.append(i, input[i])
        }   
       data.append('file', image)
        API.post(userState.email, data)
        .then(res => {
            close();
            setInput({});
        })
        .catch(err => console.log(err))
    };
    const handleChange = e => {
        e.persist();
        const { name, value } = e.target;
        setInput(input => ({
            ...input, [name]: value
        })); 
    };
    const fileUpload = e => {
        const files = e.target.files;    
        console.log(e.target.files[0])    
        const src = URL.createObjectURL(files[0]);       
        setFile(src);
        setImage(e.target.files[0]);
    };
    return (
        <Modal show={showPost} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Add a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control onChange={handleChange} name="type" as="select">
                        <option>Select a type</option>
                        <option value="favor">I need a favor</option>
                        <option value="offer">I have an offer</option>  
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control onChange={handleChange} name="category" as="select">
                        <option>Select a category</option>
                        <option value="automotive">Automotive</option>     
                        <option value="childcare">Childcare</option>  
                        <option value="tools">Tools</option>    
                        <option value="education">Education</option>     
                        <option value="home">Home</option> 
                        <option value="yard">Landscaping</option>
                        <option value="pet">Pet sitting or walking</option> 
                        <option value="errands">Errands</option>   
                        <option value="other">Other</option>                     
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control onChange={handleChange} name="title" type="text" />                    
                </Form.Group>  
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control onChange={handleChange} name="message" type="text" as="textarea" rows="5" />  
                </Form.Group>  
                <Form.Group>    
                    { file.length ? (
                        <img src={file} alt="upload preview" id="previewImg"/>   
                    ) : (
                        null
                    )
                    }            
                    <Form.Control type='file' id='single' onChange={fileUpload} />                    
                </Form.Group>               
                <Button type="submit" onClick={handleSubmit}>Submit</Button>             
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={close}>Close</Button>               
        </Modal.Footer>
    </Modal>          
    )
}

export default AddPost;