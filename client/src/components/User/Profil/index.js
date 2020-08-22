import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';

/* Containers */ 
import Layout from "../../../containers/Layout";
import Irecords from "../../../containers/Irecords";

/* Components */ 
import { Segment, Image, Icon } from 'semantic-ui-react';
import Statistics from '../Statistics';

/* Style */
import './userprofil.scss';

const UserProfil = ({ currentUser, editProfilAvatar, checkUserSlug, userSlugInfos }) => {

    const [ isUserAccount , setIsUserAccount ] = useState(false);

    const addAvatarRef = useRef(null);

    let slug = useParams();

    const checkUser = () => {
        if(currentUser.slug === slug.slug) {
            setIsUserAccount(true);
        } else {
            setIsUserAccount(false);
        }
    };

    console.log(slug.slug);

    useEffect(() => {
        checkUserSlug(slug.slug);
    }, [slug.slug]);

    useEffect(() => {
        checkUser();
    }, [isUserAccount, slug]);
    
    const { 
        id, 
        avatarUrl, 
        firstname, 
        lastname, 
        isAdmin, 
        bio, 
        records,
        learnedLanguages,
        taughtLanguages,
    } = userSlugInfos;


    const handdleClickAvatar = (e) => {
        addAvatarRef.current.click();
    };

    const handdleAvatarChange = (e) => {
        if(e.target.files) {
            editProfilAvatar(e.target.files[0]);
        }
    };

    return (
        <Layout>
            
             {  !userSlugInfos.slug  && <Redirect to={`/user/${currentUser.slug}`} /> }
            
            <div className="user-profil">
                <Segment className="user-profil_header">
                    <div className="container_left">
                        <div className="container_left__container">
                            <Image 
                            avatar 
                            size="small"
                            src={`${process.env.REACT_APP_API_URL}/${avatarUrl}` || 'https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg'}
                            bordered
                            />
                            { isUserAccount && <Icon name="add" className="add_image_avatar" circular onClick={handdleClickAvatar}/> }
                            <input 
                            type="file" 
                            ref={addAvatarRef} 
                            style={{ visibility: "hidden" }}
                            onChange={handdleAvatarChange}
                            />
                        </div>
                    </div>
                    <div className="container_right">
                        <div className="container_right__first-row">
                            <span className="user-title">
                                {firstname} {lastname}
                            </span> 
                            { isAdmin && <Icon name="check circle" /> }
                            { isUserAccount && 
                            <Link to={`/user/${slug.slug}/edit`}>
                                <Icon name="setting" style={{ color: "#fe734c", }} className="icon-settings" /> 
                            </Link>
                            }
                        </div>

                        <div className="container_right__second-row">
                            <div className="second-row_iteach">
                                <div className="title">iTeach</div> 
                                <div className="flags">
                                    { taughtLanguages && taughtLanguages.map(language => (
                                        <Image key={language.id} src={`https://www.countryflags.io/${language.code}/flat/32.png`} className="flag_image"/>
                                    ))}
                                </div>
                            </div>
                            <div className="second-row_ilearn">
                                 
                                <div className="title">iLearn</div> 
                                <div className="flags">
                                    { learnedLanguages && learnedLanguages.map((language, i) => (
                                        <Image key={i} src={`https://www.countryflags.io/${language.code}/flat/32.png`} className="flag_image"/>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="container_right__third-row">
                            <Statistics 
                            totalRecords={records ? records.length : 0}
                            totalFollow={547}
                            totalFollower={645}
                            /> 
                        </div>
                    </div>
                </Segment>

                <div className="container_bio">
                    { bio &&  <p><strong>«</strong> {bio} <strong>»</strong></p> }
                </div>
                <div className="user-profil_feed">
                    { records && records.length ? 
                        records.map(audio => (
                            <Irecords record={audio} user={userSlugInfos} key={audio.id} isUserRecord={id} />
                        )) 
                    :
                    <>
                    <div className="user-profil_feed__norecords">
                        <Icon name="microphone slash" size="big" circular/>
                        <div className="norecords-informations">
                            Aucun iRecord.
                        </div>
                    </div>
                    </>
                    }
                </div>
            </div> 
        </Layout>
    );
};

export default UserProfil;

