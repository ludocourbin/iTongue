import React from "react";
import { Input, Button } from "semantic-ui-react";
import "./signup.scss";

//import components
import Menu from "../Menu";
import Field from "./field";

const Signup = () => {
    return (
        <div>
            <Menu>
                <form className="signup">
                    <h3>Inscription</h3>
                    <div className="signup-fullname">
                        <div className="signup-fullname--name">
                            <label htmlFor="name">Prénom</label>
                            <Input
                                className="signup-input--item"
                                id="name"
                                size="mini"
                                placeholder="John"
                            />
                        </div>
                        <div className="signup-fullname--surname">
                            <label htmlFor="surname">Nom</label>
                            <Input
                                className="signup-input--item"
                                id="surname"
                                size="mini"
                                placeholder="Doe"
                            />
                        </div>
                    </div>
                    <div className="signup-input">
                        <Field
                            label="Email"
                            id="email"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="signup-input">
                        <Field
                            label="Mot de passe"
                            id="password"
                            placeholder="********"
                        />
                    </div>
                    <div className="signup-input">
                        <Field
                            label="Confirmation du mot de passe"
                            id="confirmPassword"
                            placeholder="********"
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="conditions"
                            id="conditions"
                            className="signup-conditions"
                        />
                        <label htmlFor="conditions">
                            J'accepte les conditions générales d'utilisations
                        </label>
                    </div>
                    <Button className="signup-button">S'inscrire</Button>
                </form>
            </Menu>
        </div>
    );
};

export default Signup;
