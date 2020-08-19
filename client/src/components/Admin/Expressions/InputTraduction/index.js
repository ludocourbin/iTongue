import React from 'react';
import { Form } from 'semantic-ui-react';

const InputTraduction = ( props ) => {

    const { 
        translation, 
        editTraductionInputValue, 
        editTraductionValue, 
        editTraductionSubmit, 
        setTraductionEditId,
        setDisableEditButton
    } = props;

    const handdleEditTraductionSubmit = (e) => {
        e.preventDefault();
        
        editTraductionSubmit();
        setTraductionEditId(0);
        setDisableEditButton(false);
    };

    const handdleEditTraductionValue  = (e, translation) => {

        console.log("language_id", translation.language_id)
        console.log("language.id", translation.language.id)
        editTraductionInputValue({
            ...translation,
            translation: e.target.value,
        });
    };

    console.log(editTraductionValue)
    return (
        <div className="input-traduction">
            <Form onSubmit={handdleEditTraductionSubmit}>
                <Form.Input 
                type="text"
                value={editTraductionValue.translation !== "" ?  editTraductionValue.translation : translation.text }
                onChange={(e) => handdleEditTraductionValue(e, translation)}
                />
            </Form>
        </div>
    );
};

export default InputTraduction;


// Lors du clique sur edit et qu'on entre une valeur, sans submit la valeur de l'input reste la meme partout
// voir pour faire en sorte de détecter l'id de l'edit ? un useref ?