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
            <Form>
                <Form.Group widths="equal">
                    <Form.Field>
                        <span className="edit-profil_label">Adresse de votre profil</span>
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
                    size="small"
                    />
                </Form.Group>
            </Form>
        </div>
    );
};

export default EditSlugForm;