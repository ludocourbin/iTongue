import React from 'react';
import { Form } from 'semantic-ui-react';

const InputTraduction = ( props ) => {

    const { 
        traduction, 
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

    const handdleEditTraductionValue  = (e, traduction) => {

        editTraductionInputValue({
            ...traduction,
            traduction: e.target.value,
        });
    };

    return (
        <div className="input-traduction">
            <Form onSubmit={handdleEditTraductionSubmit}>
                <Form.Input 
                type="text"
                value={editTraductionValue.traduction !== "" ?  editTraductionValue.traduction : traduction.traduction }
                onChange={(e) => handdleEditTraductionValue(e, traduction)}
                />
            </Form>
        </div>
    );
};

export default InputTraduction;