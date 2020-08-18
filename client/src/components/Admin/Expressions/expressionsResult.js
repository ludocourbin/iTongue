import React, { useState } from 'react';

/* Components */
import { Icon, Form, Table, Flag, Segment, Header, Confirm, Button } from 'semantic-ui-react'

/* Fake Data */
import { countryOptions } from '../../../data/countryCode';
import InputTraduction from './InputTraduction';

const ExpressionsResult = ( props ) => {

    const {
        traductionsList,
        addTraductionInputValue,
        newTraductionInputValue,
        addTraductionSubmit,
        expressionId,
        deleteTraduction,
        editTraductionValue,
        editTraductionInputValue,
        editTraductionSubmit,
    } = props;

    const expressionIdIsSelect = expressionId !== 0 ? false : true;
    const [ confirm, setConfirm ] = useState(false); // true || false
    const [ traductionDeleteId, setTraductionDeleteId ] = useState(0);
    const [ traductionEditId, setTraductionEditId ] = useState(0);
    const [ disableEditButton, setDisableEditButton ] = useState(false);

    const handdleAddTraductionInputChange = (e, data) => {

        const { name, value} = e.target.value ? e.target : data;

        console.log( name, value )
        addTraductionInputValue({
            [name] : value,
        });
    };

    const handdleAddTraductionSubmit = (e) => {
        e.preventDefault();
        addTraductionSubmit();
    };

    const handdleDeleteTraductionConfirm = (exprId) => {
        setConfirm(true);
        setTraductionDeleteId(exprId);
    };

    const handdleDeleteTraduction = () => {
        setConfirm(false);
        deleteTraduction(traductionDeleteId);
    };

    return (
    <Segment className="expressions-result" basic>
        <Header size='medium' content='Traductions' />

        <Segment>
            <Header size="tiny" content="Ajouter une traduction"/>
            <Form onSubmit={handdleAddTraductionSubmit}>
                <Form.Group>
                    <Form.Input 
                    icon="add" 
                    placeholder="Comment vas-tu aujourd'hui ?" 
                    width='15'
                    onChange={handdleAddTraductionInputChange}
                    name="text"
                    value={newTraductionInputValue.text}
                    type="text"
                    disabled={expressionIdIsSelect}
                    />
                    <Form.Dropdown 
                    options={countryOptions} 
                    search 
                    selection 
                    placeholder="Langues"
                    name="code"
                    value={newTraductionInputValue.language.code}
                    onChange={handdleAddTraductionInputChange}
                    disabled={expressionIdIsSelect}
                    />
                    <Form.Button 
                    type="submit" 
                    content="Ajouter"
                    disabled={expressionIdIsSelect}
                    />
                </Form.Group>
            </Form>
        </Segment>

        <Segment className="expression-result__table" disabled={expressionIdIsSelect}>
        
            <Confirm
            open={confirm}
            onCancel={() => setConfirm(false)}
            onConfirm={handdleDeleteTraduction}
            content="Vous souhaitez vraiment supprimer cette traduction ?"
            size="tiny"
            />

            <Table celled>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Langue</Table.HeaderCell>
                        <Table.HeaderCell>Traduction</Table.HeaderCell>
                        <Table.HeaderCell>Editer</Table.HeaderCell>
                        <Table.HeaderCell>Supprimer</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { traductionsList && traductionsList.map((translation, key) => (
                        <Table.Row textAlign='center' key={key}>
                            <Table.Cell>
                                {translation.id}
                            </Table.Cell>
                            <Table.Cell> 
                                <Flag name={translation.language.code} />
                            </Table.Cell>
                            <Table.Cell>
                               
                                { translation.id ===  traductionEditId ? 
                                    <InputTraduction 
                                    translation={translation} 
                                    traductionEditId={traductionEditId}
                                    editTraductionInputValue={editTraductionInputValue}
                                    editTraductionValue={editTraductionValue}
                                    editTraductionSubmit={editTraductionSubmit}
                                    setTraductionEditId={setTraductionEditId}
                                    setDisableEditButton={setDisableEditButton}
                                    /> 
                                    :
                                    translation.text
                                }
                            </Table.Cell>
                            <Table.Cell>
                                <Icon 
                                name="edit" 
                                link 
                                onClick={() => {
                                    editTraductionInputValue(translation);
                                    setTraductionEditId(translation.id);
                                    setDisableEditButton(true);
                                }}
                                disabled={disableEditButton}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Icon 
                                name="delete" 
                                link 
                                
                                onClick={() => handdleDeleteTraductionConfirm(translation.id)}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>
    </Segment>
    );
};

export default ExpressionsResult;