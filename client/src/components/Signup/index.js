import validator from "validator";
import React, { useState, useEffect } from "react";
// import { ToastContainer } from "react-toastify";

import { Link } from "react-router-dom";
import {
    Input,
    Checkbox,
    Button,
    Form,
    Container,
    Message,
    Icon,
} from "semantic-ui-react";

import "./signup.scss";

/* Component */
import Layout from "../../containers/Layout";

const Signup = ({
    signupData,
    onInputChange,
    errorMessagePassword,
    errorMessageEmail,
    setErrorMessagePassword,
    setErrorMessageEmail,
    showPassword,
    togglePassword,
    signup,
    loading,
    errorMailUsed,
    isLogged,
}) => {
    const [terms, setTerms] = useState(false);
    const [showText, setShowText] = useState(false);
    /* Destructuration de l'object state.user.signupData */

    const { firstname, lastname, email, password, confirm } = signupData;

    const handleSubmit = () => {
        // console.log("submit");
        signup();
    };

    useEffect(() => {
        if (errorMailUsed) {
            setShowText(true);
        }
        setTimeout(() => {
            setShowText(false);
        }, 3000);
    }, [errorMailUsed, errorMessageEmail]);

    const handleChange = (e) => {
        /* Extraction de l'id pour le checkbox */
        const { name, value } = e.target;

        /* Ici je créer une variable pour les input et donne leur valeur, je donne l'id et la props checked  pour la checkbox  */
        const formData = {
            [name]: value || "",
        };
        /* Dispatch de l'action pour actualiser le store user */
        onInputChange(formData);
    };

    /* Création d'une fonction pour vérifier l'igualité et la taille des mdp  */
    const checkPassword = (pass1, pass2) => {
        if (pass1 && pass2 !== "") {
            if (pass1 !== pass2 || pass1.length < 6 || pass2.length < 6) {
                setErrorMessagePassword(
                    "Both passwords must be identical and at least 6 characters long."
                );
                return true;
            } else {
                setErrorMessagePassword("");
                return false;
            }
        }
    };

    /* Création d'une fonction pour vérifier que le mail est valide*/
    const checkMail = (mail) => {
        if (mail === "") {
            return true;
        }
        if (mail !== "" && !validator.isEmail(mail)) {
            setErrorMessageEmail("E-mail is not valid");
        } else {
            setErrorMessageEmail("");
            return false;
        }
    };

    /* Création d'une fonction pour vérifier le nombre de charactères  */
    const checkMinimumInput = (data1, data2) => {
        return data1.length < 2 || data2.length < 2;
    };

    return (
        <Layout titlePage="Signup">
            {isLogged ? (
                <Container className="auth-form-container">
                    <Form onSubmit={handleSubmit} size="large" className="signup">
                        <h3 className="signup-title">Sign up</h3>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Input}
                                label="Firstname"
                                type="text"
                                fluid
                                name="firstname"
                                onChange={handleChange}
                                value={firstname}
                                placeholder="John"
                            />
                            <Form.Field
                                control={Input}
                                label="Lastname"
                                type="text"
                                fluid
                                name="lastname"
                                onChange={handleChange}
                                value={lastname}
                                placeholder="Doe"
                            />
                        </Form.Group>

                        <Form.Field
                            control={Input}
                            label="E-mail"
                            type="email"
                            width="16"
                            name="email"
                            onChange={handleChange}
                            value={email}
                            placeholder="john@example.com"
                        />
                        <Form.Field
                            control={Input}
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            width={16}
                            name="password"
                            onChange={handleChange}
                            value={password}
                            icon={
                                <Icon
                                    name={showPassword ? "eye slash" : "eye"}
                                    onClick={togglePassword}
                                    link
                                />
                            }
                            placeholder="**********"
                        />
                        <Form.Field
                            control={Input}
                            width={16}
                            label="Confirm"
                            type={showPassword ? "text" : "password"}
                            name="confirm"
                            onChange={handleChange}
                            value={confirm}
                            placeholder="**********"
                        />

                        <Form.Field
                            control={Checkbox}
                            onChange={() => setTerms(!terms)}
                            id="terms"
                            label={{
                                children: [
                                    "I accept the ",
                                    <a className="internal-link" href="/terms">
                                        terms of use
                                    </a>,
                                ],
                            }}
                        />

                        {errorMessagePassword && (
                            <Message negative content={errorMessagePassword} />
                        )}
                        {errorMessageEmail && (
                            <Message negative content={errorMessageEmail} />
                        )}
                        {showText && <Message negative content={errorMailUsed} />}

                        <div className="signup-button">
                            <Button
                                disabled={
                                    checkMinimumInput(firstname, lastname) ||
                                    checkMail(email) ||
                                    checkPassword(password, confirm) ||
                                    !terms
                                }
                                loading={loading}
                                className="signup-button--item"
                                type="submit"
                            >
                                Sign up
                            </Button>

                            <div>
                                Already have an account?&nbsp;
                                <Link className="signup-link internal-link" to={"/login"}>
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </Form>
                </Container>
            ) : (
                <Container className="signup-beta">
                    <h3 className="signup-beta__header">
                        Hello there and welcome to iTongue, unfortunately at the moment we
                        only accept beta tester, as the app doesn't meet the moderation
                        standards we wish to have before open to everyone.
                    </h3>
                    <p>If you wish to be a beta tester, please fill out this form</p>
                    <div className="signup-button">
                        <Button className="signup-beta--button">
                            <a
                                href={
                                    "https://docs.google.com/forms/d/e/1FAIpQLSfOYnzFjPAqwC1pvQPMkPAE6rnT5ZAxtrSYMYhtu8BXPpAVTA/viewform?usp=sf_link"
                                }
                                className="link-google"
                            >
                                Go to form
                            </a>
                        </Button>
                    </div>
                </Container>
            )}
        </Layout>
    );
};

export default Signup;
