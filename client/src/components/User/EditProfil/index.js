import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

/* Containers */ 
import Layout from '../../../containers/Layout';

/* Components */ 
import NewPasswordForm from './Forms/newPasswordForm';
import EditEmailForm from './Forms/editEmailForm';
import EditSlugForm from './Forms/editSlugForm';

/* Containers */
import EditProfilForm from '../../../containers/User/Forms/EditProfilForm';

/* Style */ 
import './editprofil.scss';
import { Accordion, Icon } from 'semantic-ui-react';

const EditProfil = (props) => {
    
    const [ activeIndex, setActiveIndex ] = useState(null);

    const handleAccordionClick = (_, titleProps) => {
        const index = titleProps.index;
        const setNewIndex = activeIndex === index ? -1 : index;
        setActiveIndex(setNewIndex);
    };

    const { 
        currentUser, 
        editProfil, 
        editProfilInput, 
        editProfilData ,
    } = props;

    let slug = useParams();
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
            { (currentUser.slug !== slug.slug) && <Redirect to={`/user/${currentUser.slug}`} /> }
            <div className="edit-profil">
                <Accordion className="edit-profil_accordion">
                    <Accordion.Title 
                    onClick={handleAccordionClick} 
                    active={activeIndex === 0} 
                    index={0}
                    >
                        <h3 className={`edit-profil_title ${activeIndex === 0 ? " activeAccordion" : ""}`} >
                            <Icon name="user"/> Modification du profil
                            <Icon className={`edit-profil_title__arrow ${activeIndex === 0 ? " active" : ""}`} name="chevron circle right" />
                        </h3>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <EditProfilForm 
                        handdleInputChange={handdleInputChange} 
                        handdleSubmit={handdleSubmit} 
                        profilData={profilData}
                        />
                    </Accordion.Content>

                    <Accordion.Title 
                    onClick={handleAccordionClick} 
                    active={activeIndex === 1} 
                    index={1}
                    >
                        <h3 className={`edit-profil_title ${activeIndex === 1 ? " activeAccordion" : ""}`} >
                            <Icon name="key"/> Modification du mot de passe
                            <Icon className={`edit-profil_title__arrow ${activeIndex === 1 ? " active" : ""}`} name="chevron circle right" />
                        </h3>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <NewPasswordForm
                        handdleInputChange={handdleInputChange} 
                        handdleSubmit={handdleSubmit} 
                        />
                    </Accordion.Content>

                    <Accordion.Title 
                    onClick={handleAccordionClick} 
                    active={activeIndex === 2} 
                    index={2}
                    >
                        <h3 className={`edit-profil_title ${activeIndex === 2 ? " activeAccordion" : ""}`} >
                        <Icon name="at"/> Modification de l'email
                        <Icon className={`edit-profil_title__arrow ${activeIndex === 2 ? " active" : ""}`} name="chevron circle right" />
                        </h3>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <EditEmailForm 
                        handdleInputChange={handdleInputChange} 
                        handdleSubmit={handdleSubmit} 
                        profilData={profilData}
                        currentUser={currentUser}
                        />
                    </Accordion.Content>

                    <Accordion.Title 
                    onClick={handleAccordionClick} 
                    active={activeIndex === 3} 
                    index={3}
                    >
                        <h3 className={`edit-profil_title ${activeIndex === 3 ? " activeAccordion" : ""}`} >
                            <Icon name="linkify"/>Modification du slug
                            <Icon 
                            className={`edit-profil_title__arrow ${activeIndex === 3 ? " active" : ""}`}
                            name="chevron circle right"
                            />
                        </h3>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                        <EditSlugForm 
                        handdleInputChange={handdleInputChange} 
                        handdleSubmit={handdleSubmit} 
                        profilData={profilData}
                        />
                    </Accordion.Content>
                </Accordion>
            </div>
        </Layout>
    );
};

export default EditProfil;