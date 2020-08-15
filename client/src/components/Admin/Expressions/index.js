import React from 'react';

import { Container, Input, Icon, Form, Table, Flag } from 'semantic-ui-react'
import './expressions.scss';

const Expressions = () => {

    const countryCode = ['es', 'uk', 'us', 'fr', 'de', 'be', 'ch', 'tr', 'pl', 'pt'];

    const handdleShowDetails = (e) => {
        console.log(e.target);
    };

    return (
        <Container className="expressions" >
            <Form className="expressions-form">
                <Input icon='search' fluid placeholder='Search..' />
            </Form>

            <Table celled selectable sortable striped>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Drapeau</Table.HeaderCell>
                        <Table.HeaderCell>Traduction</Table.HeaderCell>
                        <Table.HeaderCell>Expression</Table.HeaderCell>
                        <Table.HeaderCell>Editer</Table.HeaderCell>
                        <Table.HeaderCell>Supprimer</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { countryCode.map((code, key) => (
                        <Table.Row textAlign='center' key={key} >
                            <Table.Cell>{key+1}</Table.Cell>
                            <Table.Cell>
                                <Flag name={code} />
                            </Table.Cell>
                            <Table.Cell>Comment allez-vous ?</Table.Cell>
                            <Table.Cell>How are you ?</Table.Cell>
                            <Table.Cell>
                                <Icon name="edit" link onClick={handdleShowDetails} />
                            </Table.Cell>
                            <Table.Cell>
                                <Icon name="delete" link />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container>
    );
};

export default Expressions;