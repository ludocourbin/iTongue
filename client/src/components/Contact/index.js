import React, { useState } from "react";
import emailjs from "emailjs-com";
import Layout from "../../containers/Layout";
import FAQ from "./FAQ";
import { Form, Input, TextArea, Button, Message } from "semantic-ui-react";
import { toast } from "react-toastify";
import validator from "validator";
import "./style.scss";

toast.configure();
const Contact = () => {
    const [firstname, setFirstName] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const checkMinimumInput = (data1, data3) => {
        return data1.length < 2 || data3.length < 10;
    };

    const checkMail = (mail) => {
        if (mail === "") {
            return true;
        }
        if (!validator.isEmail(mail)) {
            console.log("mail not ok");
            return true;
        } else {
            console.log("mail ok");
            return false;
        }
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);
        console.log("onSubmit");
        if (!checkMail(email) && !checkMinimumInput(firstname, message)) {
            console.log("email sent");
            sendEmail(evt);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "from_name") {
            setFirstName(value);
        } else if (name === "message_html") {
            setMessage(value);
        } else if (name === "from_email") {
            setEmail(value);
        }
    };
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "gmail",
                "template_gpbfGRjS",
                e.target,
                "user_kSuLjAnY4mY1pMsAvuLR9"
            )
            .then(
                (result) => {
                    setLoading(false);
                    console.log(result.text);
                    setFirstName("");
                    setMessage("");
                    setEmail("");
                    toast.success("We'll get back to you as soon as possible", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                },
                (error) => {
                    console.log(error.text);
                }
            );

        e.target.reset();
    };

    return (
        <Layout titlePage="Contact">
            <FAQ />
            <div className="contactForm">
                <Form onSubmit={handleSubmit}>
                    <Form.Group widths="equal">
                        <Form.Field
                            id="form-input-control-first-name"
                            control={Input}
                            name="from_name"
                            label="Full Name"
                            value={firstname}
                            placeholder="Full name"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Field
                        id="form-textarea-control-opinion"
                        control={TextArea}
                        name="message_html"
                        label="Message"
                        value={message}
                        placeholder="Message"
                        onChange={handleChange}
                    />
                    <Form.Field
                        id="form-input-control-error-email"
                        control={Input}
                        name="from_email"
                        value={email}
                        label="E-mail"
                        placeholder="johndoe@gmail.com"
                        onChange={handleChange}
                    />
                    {email !== "" && checkMail(email) && (
                        <Message negative content={"E-mail incorrect"} />
                    )}
                    <div className="centerButton">
                        <Form.Field
                            className="contactForm-button"
                            id="form-button-control-public"
                            control={Button}
                            loading={loading}
                            disabled={
                                checkMinimumInput(firstname, message) || checkMail(email)
                            }
                            type="submit"
                            content="Send"
                        />
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default Contact;
