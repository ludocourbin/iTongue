import React from "react";
import { Link } from "react-router-dom";
import {
    Input,
    Checkbox,
    Button,
    Form,
    Container,
    Message,
} from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.scss";

/* Component */
import Header from "../../Containers/Header";

const Signup = ({
    signupData,
    onInputChange,
    errorMessage,
    setErrorMessage,
}) => {
    /* Destructuration de l'object state.user.signupData */
    const { name, surname, email, password, passwordConfirm } = signupData;
    const handleSubmit = () => {
        console.log("submit");
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
        return pass1 !== pass2 || pass1.length < 6 || pass2.length < 6;
    };

    /* Création d'une fonction pour vérifier que le mail contient @ */
    const checkMail = (mail) => {
        return !mail.includes("@");
    };

    /* Ici j'utilise la fonction checkPassword pour dispatcher un message d'erreur  */
    if (checkPassword(password, passwordConfirm)) {
        if (password && passwordConfirm !== "")
            setErrorMessage(
                "Les deux mot de passes doivent être identiques et supérieur à 6 charactères"
            );
    } else {
        setErrorMessage("");
    }

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
                        type="password"
                        width={16}
                        name="password"
                        onChange={handleChange}
                        value={password}
                        placeholder="**********"
                    />
                    <Form.Field
                        control={Input}
                        width={16}
                        label="Confirmation du mot de passe"
                        type="password"
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

                    {errorMessage && (
                        <Message negative content={errorMessage} />
                    )}

                    <div className="signup-button">
                        <Button
                            disabled={
                                checkPassword(password, passwordConfirm) ||
                                checkMail(email)
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
