import React from "react";
import { Form, Input, Label } from "semantic-ui-react";

const EditSlugForm = (props) => {
    const {
        editProfilSlug,
        editProfilSlugInput,
        editProfilData,
        editProfilSlugMsg,
    } = props;

    const handdleSubmit = (e) => {
        e.preventDefault();
        editProfilSlug();
    };

    const handdleInputChange = (e) => {
        editProfilSlugInput(e.target.value);
    };

    return (
        <div className="edit-profil_slug">
            <Form onSubmit={handdleSubmit}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <span className="edit-profil_label">
                            URI of your profile page
                        </span>
                        <Input
                            label="https://itongue.io/user/"
                            name="slug"
                            type="text"
                            value={editProfilData.slug}
                            onChange={handdleInputChange}
                        />
                        {editProfilSlugMsg !== "" && (
                            <Label basic color="red" pointing>
                                {editProfilSlugMsg}
                            </Label>
                        )}
                    </Form.Field>
                    <Form.Button
                        type="submit"
                        content="Save changes"
                        className="edit-profil_formbtn"
                        size="small"
                    />
                </Form.Group>
            </Form>
        </div>
    );
};

export default EditSlugForm;
