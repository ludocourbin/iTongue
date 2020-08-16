import React, { useState, useEffect } from 'react';

/* Components */
import { Input, Icon, Form, Table, Flag, Segment, Header } from 'semantic-ui-react';

const ExpressionsList = ( props ) => {

    const {
        getFakeData, 
        newExpressionInputValue, 
        newExpressionLoading,
        addExpressionInputValue, 
        addExpressionSubmit,
        expressionsList,
        setTraductionsByExpression,
        expressionIdSelect,
        expressionId,
        deleteExpression,
    } = props;

    useEffect(() => {
        getFakeData();
    }, []);

    const [ editStatus, setEditStatus ] = useState(false);
    
    const handdleEdit = (e) => {
        setEditStatus(true);
    };

    const handdleAddExpressionInputChange = (e) => {
        addExpressionInputValue(e.target.value);
    };

    const handdleAddExpressionSubmit = (e) => {
        e.preventDefault();
        addExpressionSubmit();
    };

    const handdleShowTraductionsByExpression = (exprId) => {
        expressionIdSelect(exprId);
        setTraductionsByExpression();
    };

    const handdleDeleteExpression = (exprId) => {
        const check = window.confirm('Vous souhaitez vraiment supprimer cette expression ?');
        if (check) {
            deleteExpression(exprId);
        }
    };

    return (
        
    <Segment className="expressions-list" basic>
        <Header size='medium' content='Expressions' />

        <Segment>
            <Header size="tiny" content="Ajouter une expression"/>
            <Form onSubmit={handdleAddExpressionSubmit}>
                <Form.Group>
                    <Form.Input 
                    icon="add" 
                    placeholder="How are you today ?" 
                    width="16" 
                    value={newExpressionInputValue}
                    onChange={handdleAddExpressionInputChange}
                    loading={newExpressionLoading}
                    />
                    <Form.Button type="submit" content="Ajouter"/>
                </Form.Group>
            </Form>
        </Segment>
        
        <Segment className="expression-list__table">
            <Form className="expressions-form">
                <Form.Input icon='search' fluid placeholder='Search..' />
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
                    { expressionsList && expressionsList.map((expression, key) => (
                        <Table.Row 
                        textAlign='center' 
                        key={key} 
                        active={expressionId === expression.id ? true : false }
                        >
                            <Table.Cell>{expression.id}</Table.Cell>
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
                                <Icon 
                                name="delete" 
                                link 
                                onClick={() => handdleDeleteExpression(expression.id)}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Icon 
                                name="eye" 
                                link
                                onClick={() => handdleShowTraductionsByExpression(expression.id) }
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

export default ExpressionsList;