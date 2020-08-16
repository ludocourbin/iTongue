import validator from "validator";
import React from "react";
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

// console.log(validator);
import "./signup.scss";

/* Component */
import Header from "../../containers/Header";

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
}) => {
    /* Destructuration de l'object state.user.signupData */
    const {
        name,
        surname,
        email,
        password,
        passwordConfirm,
        terms,
    } = signupData;

    const handleSubmit = () => {
        console.log("submit");
        signup();
    };

    const handleChange = (e, data) => {
        /* Extraction de l'id pour le checkbox */
        const { name, value, id } = e.target;

        /* Ici je créer une variable pour les input et donne leur valeur, je donne l'id et la props checked  pour la checkbox  */
        const formData = {
            [name || id]: value || data.checked || "",
        };
        /* Dispatch de l'action pour actualiser le store user */
        onInputChange(formData);
    };

    /* Création d'une fonction pour vérifier l'igualité et la taille des mdp  */
    const checkPassword = (pass1, pass2) => {
        if (pass1 && pass2 === "") {
            return true;
        }
        if (
            (pass1 && pass2 !== "" && pass1 !== pass2) ||
            pass1.length < 6 ||
            pass2.length < 6
        ) {
            setErrorMessagePassword(
                "Les deux mot de passes doivent être identiques et supérieur à 6 charactères"
            );
            return true;
        } else {
            setErrorMessagePassword("");
            return false;
        }
    };

    /* Création d'une fonction pour vérifier que le mail est valide*/
    const checkMail = (mail) => {
        if (email === "") {
            return true;
        }
        if (mail !== "" && !validator.isEmail(mail)) {
            setErrorMessageEmail("Le mail n'est pas valide");
            return true;
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
        <Header>
            <Container>
                <Form onSubmit={handleSubmit} size="large" className="signup">
                    <h3 className="signup-title">Inscription</h3>
                    <Form.Group widths="equal">
                        <Form.Field
                            control={Input}
                            label="Prénom"
                            type="text"
                            fluid
                            name="name"
                            onChange={handleChange}
                            value={name}
                            placeholder="John"
                        />
                        <Form.Field
                            control={Input}
                            label="Nom"
                            type="text"
                            fluid
                            name="surname"
                            onChange={handleChange}
                            value={surname}
                            placeholder="Doe"
                        />
                    </Form.Group>

                    <Form.Field
                        control={Input}
                        label="Email"
                        type="email"
                        width="16"
                        name="email"
                        onChange={handleChange}
                        value={email}
                        placeholder="john@example.com"
                    />
                    <Form.Field
                        control={Input}
                        label="Mot de passe"
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
                        label="Confirmation du mot de passe"
                        type={showPassword ? "text" : "password"}
                        name="passwordConfirm"
                        onChange={handleChange}
                        value={passwordConfirm}
                        placeholder="**********"
                    />

                    <Form.Field
                        control={Checkbox}
                        onChange={(e, data) => handleChange(e, data)}
                        id="terms"
                        label={{
                            children:
                                "J'accepte les conditions générales d'utilisations",
                        }}
                    />

                    {errorMessagePassword && (
                        <Message negative content={errorMessagePassword} />
                    )}
                    {errorMessageEmail && (
                        <Message negative content={errorMessageEmail} />
                    )}

                    <div className="signup-button">
                        <Button
                            disabled={
                                checkMinimumInput(name, surname) ||
                                checkMail(email) ||
                                checkPassword(password, passwordConfirm) ||
                                !terms
                            }
                            className="signup-button--item"
                            type="submit"
                        >
                            S'inscrire
                        </Button>
                        <Link className="signup-link" to={"/login"}>
                            Déjà inscrit ? Connectez vous
                        </Link>
                    </div>
                </Form>
            </Container>
        </Header>
    );
};

export default Signup;
