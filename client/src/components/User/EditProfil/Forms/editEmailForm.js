import React from 'react';
import { Form, Input  } from 'semantic-ui-react';

const EditEmailForm = (props) => {

    const { 
        handdleInputChange, 
        handdleSubmit, 
        profilData, 
        currentUser,
    } = props;

    return (
        <div className="edit-profil_email">
            <h3 className="edit-profil_title">Modification de l'email</h3>
            <Form onSubmit={handdleSubmit}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <span>Ancien email</span>
                        <Input 
                        name="old_email"
                        type="email"
                        disabled
                        value={currentUser.email}
                        />
                    </Form.Field>
                    <Form.Field>
                        <span>Nouveau email</span>
                        <Input 
                        name="email"
                        type="email"
                        value={profilData.email}
                        onChange={handdleInputChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Button 
                    type="submit"
                    content="Enregistrer l'email"
                    className="edit-profil_formbtn"
                />
            </Form>
        </div>
    );
};

export default EditEmailForm;