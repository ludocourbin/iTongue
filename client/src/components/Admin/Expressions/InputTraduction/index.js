import React from 'react';
import { Form } from 'semantic-ui-react';

const InputTraduction = ( props ) => {

    const { 
        translation, 
        editTraductionInputValue, 
        editTraductionValue, 
        editTraductionSubmit, 
        setTraductionEditId 
    } = props;

    const handdleEditTraductionSubmit = (e) => {
        e.preventDefault();
        
        editTraductionSubmit();

        console.log("submit")
        setTraductionEditId(0);
    };

    const handdleEditTraductionValue  = (e, translation) => {

        editTraductionInputValue({
            ...translation,
            translation: e.target.value,
        });
    };

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