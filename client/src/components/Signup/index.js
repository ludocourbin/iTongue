import React from "react";
import { Input, Checkbox, Button, Form, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./signup.scss";

//import components
import Header from "../../Containers/Header";

const Signup = () => {
    const handleSubmit = () => {
        console.log("submit");
    };

    const handleChange = (e, data) => {
        const { name, value, id } = e.target;
        const formData = {
            [name || id]: value || data.checked,
        };
        console.log(formData);
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
                            placeholder="John"
                        />
                        <Form.Field
                            control={Input}
                            label="Nom"
                            type="text"
                            fluid
                            name="surname"
                            onChange={handleChange}
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
                        placeholder="john@example.com"
                    />
                    <Form.Field
                        control={Input}
                        label="Mot de passe"
                        type="password"
                        width={16}
                        name="password"
                        onChange={handleChange}
                        placeholder="**********"
                    />
                    <Form.Field
                        control={Input}
                        width={16}
                        label="Confirmation du mot de passe"
                        type="password"
                        name="passwordConfirm"
                        onChange={handleChange}
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

                    <div className="signup-button">
                        <Button className="signup-button--item" type="submit">
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
