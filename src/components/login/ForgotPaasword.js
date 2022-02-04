import React from 'react';
// import axios from "axios";
import {Form, Input, Button} from 'reactstrap';
import "./login.css";

const SendUrlReset =(props)=>{
    
    return(
        <div>
            <h4>Modifier votre mot de passe</h4>
            <Form >
                <Input type="email" name={props.name} id="email" placeholder="Votre Email" value={props.value} onChange={props.handleChange} />
                <Button id="btn_sendUrlReset" onClick={props.sendUrl} type="submit" color="success" size="sm">Envoyer</Button>
                <span style={{color:'#f00'}}>{props.messageResponse && props.messageResponse}</span>
                <span style={{color:'#f00'}}>{props.errorEmailReset}</span>
            </Form>
            
        </div>
        
    )
}

export default SendUrlReset;