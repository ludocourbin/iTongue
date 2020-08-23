import React from 'react';
import { Form, Input } from 'semantic-ui-react';

const EditSlugForm = (props) => {

    const { 
        handdleInputChange, 
        handdleSubmit, 
        profilData, 
    } = props;

    return (
        <div className="edit-profil_slug">
            <h3 className="edit-profil_title">Modification du slug</h3>
            <Form>
                <Form.Group widths="equal">
                    <Form.Field>
                        <span>Adresse de votre profil</span>
                        <Input 
                        name="slug"
                        type="email"
                        value={profilData.slug}
                        />
                    </Form.Field>
                    <Form.Button 
                    type="submit"
                    content="Enregistrer le slug"
                    className="edit-profil_formbtn"
                    />
                </Form.Group>
            </Form>
        </div>
    );
};

export default EditSlugForm;