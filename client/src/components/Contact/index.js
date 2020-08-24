import React, {useState} from 'react';
import emailjs from 'emailjs-com';
import Layout from "../../containers/Layout";
import FAQ from './FAQ';
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react';
// import { ToastContainer } from "react-toastify";
import validator from "validator";
import "./style.scss";

const Contact = () => {
    
    const [firstname, setFirstName] = useState("Ludovic");
    const [lastname, setLastName] = useState("Courbin");
    const [message, setMessage] = useState("Je suis l'homme le plus beau de la promo Galactica");
    const [email, setEmail] = useState("ludo@gmail.com");
    // const [errorEmail, setErrorEmail] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("onSubmit");
        sendEmail(evt);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name==="firstName") {
            setFirstName(value);
        }
        else if (name==="lastName") {
            setLastName(value);
        }
        else if (name==="message") {
            setMessage(value);
        }
        else if (name==="email") {
            setEmail(value);
        }
    };
    const checkMinimumInput = (data1, data2, data3) => {
        return data1.length < 2 || data2.length < 2 || data3.length < 10;
    };


    const checkMail = (mail) => {
        if (mail === "") {
            return true;
        }
        if (!validator.isEmail(mail)) {
            console.log("not ok");
            // setErrorEmail(true);
            return true;
        } 
        else {
            console.log("ok");
            // setErrorEmail(false);
            return false;
        }
        
    };

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('gmail', 'itongueform', e.target, 'user_5aEwx2fJS3ZncS69QRI3a')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });

        e.target.reset();
      }
    console.log(checkMail(email));
    return (
        <Layout>
            <FAQ />
            <div className="contactForm">
                <Form onSubmit={handleSubmit}>
                    <Form.Group widths='equal'>
                    <Form.Field
                        id='form-input-control-first-name'
                        control={Input}
                        name="firstName"
                        label='Prénom'
                        value={firstname}
                        placeholder='Prénom'
                        onChange={handleChange}
                    />
                    <Form.Field
                        id='form-input-control-last-name'
                        control={Input}
                        name="lastName"
                        value={lastname}
                        label='Nom'
                        placeholder='Nom'
                        onChange={handleChange}
                    />
                    </Form.Group>
                    <Form.Field
                    id='form-textarea-control-opinion'
                    control={TextArea}
                    name="message"
                    label='Message'
                    value={message}
                    placeholder='Message'
                    onChange={handleChange}
                    />
                    <Form.Field
                    id='form-input-control-error-email'
                    control={Input}
                    name="email"
                    value={email}
                    label='E-mail'
                    placeholder='joe@schmoe.com'
                    onChange={handleChange}
                    // error={{
                    //     content: 'Please enter a valid email address',
                    //     pointing: 'below',
                    // }}
                    />
                    { checkMail && (
                        <Message negative content={"Email incorrect"} />
                    )}
                    <div className="centerButton">
                        <Form.Field
                        className="contactForm-button"
                        id='form-button-control-public'
                        control={Button}
                        disabled={
                            checkMinimumInput(firstname, lastname, message) ||
                            checkMail(email)
                        }
                        type="submit"
                        content='Envoyez votre message'
                        />
                    </div>
                    
                </Form>
            </div> 
        </Layout>
    )
};

export default Contact;