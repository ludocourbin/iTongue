import React from 'react';

/* Components */
import { Icon, Form, Table, Flag, Segment, Header } from 'semantic-ui-react'

/* Fake Data */
import { countryOptions } from '../../../data/countryCode';

const ExpressionsResult = ({ traductionsList }) => {

    return (
    <Segment className="expressions-result" basic>
        <Header size='medium' content='Traductions' />

        <Segment>
            <Header size="tiny" content="Ajouter une traduction"/>
            <Form>
                <Form.Group>
                    <Form.Input icon="add" placeholder="Comment vas-tu aujourd'hui ?" width='15'/>
                    <Form.Dropdown 
                    options={countryOptions} 
                    search 
                    selection 
                    placeholder="Langues"
                    />
                </Form.Group>
            </Form>
        </Segment>

        <Segment className="expression-result__table">
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
                                {key+1}
                            </Table.Cell>
                            <Table.Cell> 
                                <Flag name={traduction.flag} />
                            </Table.Cell>
                            <Table.Cell>
                                {traduction.expression}
                            </Table.Cell>
                            <Table.Cell>
                                <Icon name="edit" link />
                            </Table.Cell>
                            <Table.Cell>
                                <Icon name="delete" link />
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