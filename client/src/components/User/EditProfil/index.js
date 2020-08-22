import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

/* Containers */ 
import Layout from '../../../containers/Layout';

/* Components */ 
import { Checkbox, Form, Input, Dropdown, TextArea } from 'semantic-ui-react';

/* Style */ 
import './editprofil.scss';
import UpdateAvatar from '../UpdateAvatar';

const EditProfil = (props) => {

    const { 
        currentUser, 
        allLanguagesList, 
        fetchAllLanguages, 
        editProfil, editProfilInput, 
        editProfilData ,
        editProfilAvatar 
    } = props;

    let slug = useParams();

    useEffect(() => {
        fetchAllLanguages();
    }, []);

    const optionsLanguages = allLanguagesList.map(language => {
        return {
            key: language.id,
            value: language.id,
            text: language.name,
            flag: language.code,
        };
    });

    let profilData =  {...editProfilData};

    const handdleInputChange = (e, data) => {
        // Pour les languages cela me retourne un tableau de language_id
        const { name, value } = e.target.value ? e.target : data; 
        const test =  {
            [name]: value,
        };
        editProfilInput(test);
    };

    const handdleSubmit = (e) => {
        e.preventDefault();
        editProfil();
    };

    return (
        <Layout>
            {  (currentUser.slug !== slug.slug) && <Redirect to={`/user/${currentUser.slug}`} /> }
            <div className="edit-profil">
                <div className="edit-profil_profil">
                    <h3 className="edit-profil_title">Modification du profil</h3>
                    <div className="edit-profil_container">
                        <UpdateAvatar
                            avatarUrl={profilData.avatarUrl} 
                            isUserAccount={true}
                            editProfilAvatar={editProfilAvatar}
                        />
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
                    <Form onSubmit={handdleSubmit}>
                        <Form.Field>
                            <span>Bio</span>
                            <TextArea 
                            name="bio"
                            value={profilData.bio}
                            onChange={handdleInputChange}
                            />
                        </Form.Field>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <span>Prénom</span>
                                <Input 
                                name="firstname"
                                value={profilData.firstname}
                                onChange={handdleInputChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <span>Nom</span>
                                <Input 
                                name="lastname"
                                value={profilData.lastname}
                                onChange={handdleInputChange}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <span>iTeach</span>
                                <Dropdown 
                                multiple 
                                selection 
                                placeholder="iTeach" 
                                name="taughtLanguages" 
                                options={optionsLanguages}
                                defaultValue={profilData.modifyTaughtLanguages}
                                onChange={handdleInputChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <span>iLearn</span>
                                <Dropdown 
                                multiple 
                                selection 
                                placeholder="iLearn" 
                                name="learnedLanguages" 
                                options={optionsLanguages}
                                defaultValue={profilData.modifylearnedLanguages}
                                onChange={handdleInputChange}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Button 
                        type="submit"
                        content="Enregistrer le profil"
                        className="edit-profil_formbtn"
                        />
                    </Form>
                </div>
                <div className="edit-profil_password">
                    <h3 className="edit-profil_title">Modification du mot de passe</h3>
                    <Form onSubmit={handdleSubmit}>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <span>Nouveau mot de passe</span>
                                <Input 
                                name="password"
                                type="password"
                                onChange={handdleInputChange}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <span>Confirmation du nouveau mot de passe</span>
                            <Input 
                            name="confirm"
                            type="password"
                            onChange={handdleInputChange}
                            />
                        </Form.Field>
                        <Form.Button 
                        type="submit"
                        content="Enregistrer le mot de passe"
                        className="edit-profil_formbtn"
                        />
                    </Form>
                </div>
                <div className="edit-profil_email">
                    <h3 className="edit-profil_title">Modification de l'email</h3>
                    <Form onSubmit={handdleSubmit}>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <span>Ancien email</span>
                                <Input 
                                name="old_email"
                                type="email"
                                disabled
                                value={currentUser.email}
                                />
                            </Form.Field>
                            <Form.Field>
                                <span>Nouveau email</span>
                                <Input 
                                name="email"
                                type="email"
                                value={profilData.email}
                                onChange={handdleInputChange}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Button 
                        type="submit"
                        content="Enregistrer l'email"
                        className="edit-profil_formbtn"
                        />
                    </Form>
                </div>
                <div className="edit-profil_slug">
                    <h3 className="edit-profil_title">Modification du slug</h3>
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <span>Adresse de votre profil</span>
                                <Input 
                                name="slug"
                                type="email"
                                value={profilData.slug}
                                />
                            </Form.Field>
                            <Form.Button 
                            type="submit"
                            content="Enregistrer le slug"
                            className="edit-profil_formbtn"
                            />
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </Layout>
    );
};

export default EditProfil;