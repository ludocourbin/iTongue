import React, { useState } from 'react';

/* Components */
import { Icon, Form, Table, Flag, Segment, Header, Confirm, Button } from 'semantic-ui-react'

/* Fake Data */
import { countryOptions } from '../../../data/countryCode';

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
    } = props;

    const expressionIdIsSelect = expressionId !== 0 ? false : true;
    const [ confirm, setConfirm ] = useState(false); // true || false
    const [ traductionDeleteId, setTraductionDeleteId ] = useState(0);

    const handdleAddTraductionInputChange = (e, data) => {

        const { name, value} = e.target.value ? e.target : data;

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

    const handdleEditTraductionSubmit = (e) => {
        e.preventDefault();
    };

    const handdleEditTraductionValue  = (e, traductionId, traduction) => {


        const test = editTraductionInputValue({
            id: traductionId,
            traductionDefault: traduction,
            value: e.target.value,
        })

        console.log(test)
        console.log('traductionId', traductionId)
        console.log('traduction', traduction)
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
                    name="traduction"
                    value={newTraductionInputValue.traduction}
                    type="text"
                    disabled={expressionIdIsSelect}
                    />
                    <Form.Dropdown 
                    options={countryOptions} 
                    search 
                    selection 
                    placeholder="Langues"
                    name="langue"
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
                    { traductionsList && traductionsList.map((traduction, key) => (
                        <Table.Row textAlign='center' key={key}>
                            <Table.Cell>
                                {traduction.id}
                            </Table.Cell>
                            <Table.Cell> 
                                <Flag name={traduction.langue} />
                            </Table.Cell>
                            <Table.Cell>
                                {/*
                                <Form onSubmit={handdleEditTraductionSubmit}>
                                    <Form.Input 
                                    type="text"
                                    value={editTraductionValue.value}
                                    onChange={(e) => handdleEditTraductionValue(e, traduction.id, traduction.traduction)}
                                    />
                                </Form>
                                <Button onClick={testOnClickTrad}>{traduction.traduction}</Button>
                                */}
                                {traduction.traduction}

                            </Table.Cell>
                            <Table.Cell>
                                <Icon name="edit" link />
                            </Table.Cell>
                            <Table.Cell>
                                <Icon 
                                name="delete" 
                                link 
                                onClick={() => handdleDeleteTraductionConfirm(traduction.id)}
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