import React, { useEffect } from 'react';

/* Components */
import { Form, Segment, Table } from 'semantic-ui-react';
import HeaderAdmin from "../../../containers/Admin/HeaderAdmin";

/* Style */
import './languages.scss'

/* All Country Local Data */
import { allCountry } from '../../../data/allCountry';


const Languages = (props) => {

    const { 
        addLanguageSubmit, 
        languagesList, 
        languageInputValue, 
        languageValue, 
        fetchLanguages 
    } = props;

    useEffect(() => {
        fetchLanguages();
    }, []);

    const handdleSubmitLanguage = () => {
        addLanguageSubmit();
    };

    const handdleInputChange = (e, data) => {

        const { name, value} = e.target.value ? e.target : data;

        languageInputValue({
            [name] : value,
        });
    };

    return (
        <HeaderAdmin>
            <div className="languages">
                <Segment compact>
                <Form onSubmit={handdleSubmitLanguage}>
                    <Form.Group>
                        <Form.Input 
                        name="name"
                        placeholder="Nom de la langue"
                        value={languageValue.name}
                        onChange={handdleInputChange}
                        />
                        <Form.Dropdown 
                        name="code"
                        options={allCountry}
                        placeholder="Choisir le drapeau"
                        search 
                        selection 
                        value={languageValue.code}
                        onChange={handdleInputChange}
                        />
                        <Form.Button 
                        type="submit"
                        content="Ajouter la langue"
                        />
                    </Form.Group>
                </Form>
                <Table>
                    <Table.Header>
                        <Table.Row textAlign="center">
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Code</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { languagesList && languagesList.map(language => (
                            <Table.Row textAlign="center" key={language.id}>
                                <Table.Cell>{ language.id }</Table.Cell>
                                <Table.Cell>{ language.name }</Table.Cell>
                                <Table.Cell>{ language.code }</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                </Segment>
            </div>
        </HeaderAdmin>
    );
};

export default Languages;