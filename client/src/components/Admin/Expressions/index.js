import React, { useState } from 'react';

/* Components */
import { Input, Icon, Form, Table, Flag, Segment, Header } from 'semantic-ui-react'

/* Data */
import { countryOptions } from '../../../data/countryCode';
import { expressions } from '../../../data/expressions';

/* Style */
import './expressions.scss';

/**
 * Séparation en plusieurs composants à prévoir
 * Redux
 */

const Expressions = () => {

    const [ traductions, setTraductions ] = useState([]);
    const [ editStatus, setEditStatus ] = useState(false);
    

    const handdleEdit = (e) => {
        console.log(e.target)
        setEditStatus(true);
    };


    return (
        <div className="expressions">

            <Segment className="expressions-list" basic>
                <Header size='medium' content='Expressions' />

                <Segment>
                    <Header size="tiny" content="Ajouter une expression"/>
                    <Form>
                        <Form.Group>
                            <Form.Input icon="add" placeholder="How are you today ?" width="16"/>
                        </Form.Group>
                    </Form>
                </Segment>
                
                <Segment className="expression-list__table">
                    <Form className="expressions-form">
                        <Input icon='search' fluid placeholder='Search..' />
                    </Form>

                    <Table celled selectable sortable striped>
                        <Table.Header>
                            <Table.Row textAlign='center'>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Langue</Table.HeaderCell>
                                <Table.HeaderCell>NbrTraduction</Table.HeaderCell>
                                <Table.HeaderCell>Expression</Table.HeaderCell>
                                <Table.HeaderCell>Editer</Table.HeaderCell>
                                <Table.HeaderCell>Supprimer</Table.HeaderCell>
                                <Table.HeaderCell>Afficher</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            { expressions.map((expression, key) => (
                                <Table.Row textAlign='center' key={key} >
                                    <Table.Cell>{key+1}</Table.Cell>
                                    <Table.Cell>
                                        <Flag name={expression.country} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        {expression.nbrTraductions}
                                    </Table.Cell>
                                    <Table.Cell onClick={handdleEdit}>
                                        { editStatus ?
                                         <Input value={expression.expression} /> 
                                         :
                                         expression.expression
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Icon name="edit" link />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Icon name="delete" link />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Icon 
                                        name="eye" 
                                        link  
                                        onClick={() => 
                                            setTraductions(expression.traductions
                                        )}
                                        />
                                    </Table.Cell>
                                    
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Segment>
            </Segment>

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
                            { traductions && traductions.map((traduction, key) => (
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
        </div>
    );
};

export default Expressions;