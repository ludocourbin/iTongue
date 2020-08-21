import React from 'react';
import './editprofil.scss';
import { Divider, Image, Checkbox, Form, Label, Input, Dropdown } from 'semantic-ui-react';
import Layout from '../../../containers/Layout';

const EditProfil = ({ currentUser }) => {

    const { 
        id, 
        email,
        bio, 
        avatarUrl, 
        firstname, 
        lastname, 
        slug, 
        learnedLanguages, 
        taughtLanguages
    } = currentUser;


    console.log("learnedLanguages", learnedLanguages);
    console.log("taughtLanguages", taughtLanguages);

    const options = [
        {value:'1', text:'A', flag: 'fr'},
        {value:'2', text:'B', flag: 'fr'},
        {value:'3', text:'C', flag: 'fr'},
      ];

      const selected = ['1', '2'];

    return (
        <Layout>
            <div className="edit-profil">

                <div className="edit-profil_profil">
                    <h3 className="edit-profil_title">Modification du profil</h3>

                    <div className="edit-profil_container">

                        <Image src={avatarUrl} avatar size="big" className="edit-profil_container__avatar"/>

                        <div className="edit-profil_container__toggle">
                            <div className="toggle_container">
                                <span>Profil Privé</span>
                                <Checkbox 
                                toggle 
                                name="toggle_privateprofil" 
                                disabled
                                />
                            </div>
                            <div className="toggle_container">
                                <span>Notifications</span>
                                <Checkbox 
                                toggle 
                                name="toggle_notifications" 
                                disabled
                                />
                            </div>
                        </div>
                    </div>

                    <Form>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <span>Prénom</span>
                                <Input 
                                name="firstname"
                                value={firstname}
                                />
                            </Form.Field>
                            <Form.Field>
                                <span>Nom</span>
                                <Input 
                                name="lastname"
                                value={lastname}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <span>iLearn</span>
                                <Dropdown 
                                multiple 
                                selection 
                                placeholder="iLearn" 
                                name="learnedLanguages" 
                                />
                            </Form.Field>
                            <Form.Field>
                                <span>iTeach</span>
                                <Dropdown 
                                multiple 
                                selection 
                                placeholder="iTeach" 
                                name="taughtLanguages" 
                                options={options}
                                //defaultSelectedLabel={[{text: "Test", value: "Test"}]}
                                defaultValue={selected}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Button 
                        type="submit"
                        content="Enregistrer"
                        className="edit-profil_formbtn"
                        />
                    </Form>
                </div>

                <div className="edit-profil_password">
                    <h3 className="edit-profil_title">Modification du mot de passe</h3>
                </div>

                <Divider horizontal />

                <div className="edit-profil_email">
                    <h3 className="edit-profil_title">Modification de l'email</h3>
                </div>

                <Divider horizontal />

                <div className="edit-profil_slug">
                    <h3 className="edit-profil_title">Modification du slug</h3>
                </div>
            </div>
        </Layout>
    );
};

export default EditProfil;