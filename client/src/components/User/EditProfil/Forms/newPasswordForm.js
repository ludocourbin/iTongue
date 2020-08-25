import React from 'react';
import { Form, Input } from 'semantic-ui-react';

const NewPasswordForm = ({ handdleInputChange, handdleSubmit }) => {

    return (
        <div className="edit-profil_password">
            <Form onSubmit={handdleSubmit}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <span className="edit-profil_label">Nouveau mot de passe</span>
                        <Input 
                        name="password"
                        type="password"
                        onChange={handdleInputChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <span className="edit-profil_label">Confirmation du nouveau mot de passe</span>
                    <Input 
                    name="confirm"
                    type="password"
                    onChange={handdleInputChange}
                    />
                </Form.Field>
                <Form.Button 
                type="submit"
                content="Enregistrer le mot de passe"
                className="edit-profil_formbtn"
                size="small"
                />
            </Form>
        </div>
    );
};

export default NewPasswordForm;












