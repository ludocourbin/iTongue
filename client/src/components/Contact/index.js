import React from 'react';
import emailjs from 'emailjs-com';
import Layout from "../../containers/Layout";
import FAQ from './FAQ';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import { ToastContainer } from "react-toastify";
import "./style.scss";

const Contact = () => {
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("onSubmit");
        sendEmail(evt);
        //contact();
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
                        label='First name'
                        placeholder='First name'
                    />
                    <Form.Field
                        id='form-input-control-last-name'
                        control={Input}
                        name="lastName"
                        label='Last name'
                        placeholder='Last name'
                    />
                    </Form.Group>
                    <Form.Field
                    id='form-textarea-control-opinion'
                    control={TextArea}
                    name="message"
                    label='Opinion'
                    placeholder='Opinion'
                    />
                    <Form.Field
                    id='form-input-control-error-email'
                    control={Input}
                    name="email"
                    label='Email'
                    placeholder='joe@schmoe.com'
                    // error={{
                    //     content: 'Please enter a valid email address',
                    //     pointing: 'below',
                    // }}
                    />
                    <Form.Field
                    className="contactForm-button"
                    id='form-button-control-public'
                    control={Button}
                    type="submit"
                    content='Envoyez votre message'
                    />
                </Form>
            </div> 
        </Layout>
    )
};

export default Contact;