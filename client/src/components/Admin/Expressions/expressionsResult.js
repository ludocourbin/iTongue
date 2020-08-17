import React from 'react';

/* Components */
import { Icon, Form, Table, Flag, Segment, Header } from 'semantic-ui-react'

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
    } = props;

    const expressionIdIsSelect = expressionId !== 0 ? false : true;

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

    const handdleDeleteTraduction = (exprId) => {
        const check = window.confirm('Vous souhaitez vraiment supprimer cette traduction ?');
        if (check) {
            deleteTraduction(exprId);
        }
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
                                {traduction.traduction}
                            </Table.Cell>
                            <Table.Cell>
                                <Icon name="edit" link />
                            </Table.Cell>
                            <Table.Cell>
                                <Icon 
                                name="delete" 
                                link 
                                onClick={() => handdleDeleteTraduction(traduction.id)}
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