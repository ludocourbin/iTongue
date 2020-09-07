import React, { useState, useEffect } from "react";

/* Components */
import {
  Icon,
  Form,
  Table,
  Flag,
  Segment,
  Header,
  Confirm,
  Message,
} from "semantic-ui-react";

/* Fake Data */
import InputTraduction from "./InputTraduction";

const ExpressionsResult = (props) => {
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
    fetchLanguages,
    languagesList,
  } = props;

  const expressionIdIsSelect = expressionId !== 0 ? false : true;
  const [confirm, setConfirm] = useState(false); // true || false
  const [traductionDeleteId, setTraductionDeleteId] = useState(0);
  const [traductionEditId, setTraductionEditId] = useState(0);
  const [disableEditButton, setDisableEditButton] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  /* Remise en forme des datas pour le dropDown des langues */
  const dropDownOptions = languagesList.map((language) => {
    return {
      ...language,
      value: language.id,
      text: language.name,
      flag: language.code,
    };
  });

  const handdleAddTraductionInputChange = (e, data) => {
    const { name, value } = e.target.value ? e.target : data;

    addTraductionInputValue({
      [name]: value,
    });
  };

  const handdleAddTraductionSubmit = (e) => {
    e.preventDefault();
    if (!newTraductionInputValue.language_id) {
      setMessage("You need to select a language code");
      return;
    }
    setMessage(null);
    addTraductionSubmit();
    fetchLanguages();
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
      <Segment>
        <Header size="medium" content="Translations" />
        <Form onSubmit={handdleAddTraductionSubmit}>
          <Form.Group>
            <Form.Input
              icon="add"
              placeholder="Add a new translation"
              width="15"
              onChange={handdleAddTraductionInputChange}
              name="text"
              value={newTraductionInputValue.text}
              type="text"
              disabled={expressionIdIsSelect}
            />
            <Form.Dropdown
              options={dropDownOptions}
              search
              selection
              placeholder="Languages"
              name="language_id"
              value={newTraductionInputValue.language.code}
              onChange={handdleAddTraductionInputChange}
              disabled={expressionIdIsSelect}
            />
            <Form.Button
              type="submit"
              content="Add"
              disabled={expressionIdIsSelect}
            />
          </Form.Group>
        </Form>
        {message && <Message content={message} />}
      </Segment>

      <Segment
        className="expression-result__table"
        disabled={expressionIdIsSelect}
      >
        <Confirm
          open={confirm}
          onCancel={() => setConfirm(false)}
          onConfirm={handdleDeleteTraduction}
          content="Are you sure you want to delete the translation ?"
          size="tiny"
        />

        <Table celled selectable striped>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Language</Table.HeaderCell>
              <Table.HeaderCell>Translation</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {traductionsList &&
              traductionsList.map((translation, key) => (
                <Table.Row textAlign="center" key={key}>
                  <Table.Cell>{translation.id}</Table.Cell>
                  <Table.Cell>
                    <Flag name={translation.language.code} />
                  </Table.Cell>
                  <Table.Cell>
                    {translation.id === traductionEditId ? (
                      <InputTraduction
                        translation={translation}
                        traductionEditId={traductionEditId}
                        editTraductionInputValue={editTraductionInputValue}
                        editTraductionValue={editTraductionValue}
                        editTraductionSubmit={editTraductionSubmit}
                        setTraductionEditId={setTraductionEditId}
                        setDisableEditButton={setDisableEditButton}
                      />
                    ) : (
                      translation.text
                    )}
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
                      onClick={() =>
                        handdleDeleteTraductionConfirm(translation.id)
                      }
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