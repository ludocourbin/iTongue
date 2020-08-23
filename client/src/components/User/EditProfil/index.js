import React from 'react';
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

const EditProfil = (props) => {

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
                <EditProfilForm 
                    handdleInputChange={handdleInputChange} 
                    handdleSubmit={handdleSubmit} 
                    profilData={profilData}
                />
                <NewPasswordForm
                    handdleInputChange={handdleInputChange} 
                    handdleSubmit={handdleSubmit} 
                />
                <EditEmailForm 
                    handdleInputChange={handdleInputChange} 
                    handdleSubmit={handdleSubmit} 
                    profilData={profilData}
                    currentUser={currentUser}
                />
                <EditSlugForm 
                    handdleInputChange={handdleInputChange} 
                    handdleSubmit={handdleSubmit} 
                    profilData={profilData}
                />
            </div>
        </Layout>
    );
};

export default EditProfil;