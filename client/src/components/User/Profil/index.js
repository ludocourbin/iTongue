import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from "../../../containers/Layout";
import Irecords from "../../../containers/Irecords";
import { Segment, Image, Icon } from 'semantic-ui-react';
import Statistics from '../Statistics';
import './userprofil.scss';

const UserProfil = ({ fetchAllUsers, allUsersList, currentUser, match }) => {

    const [ isUserAccount , setIsUserAccount ] = useState(false);
    let slug = useParams();

    const checkUser = () => {
        if(currentUser.slug === slug.slug) {
            setIsUserAccount(true);
        } else {
            setIsUserAccount(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
        checkUser();
    }, []);

    const filterUser = allUsersList.filter(user => {
        if( user.slug == slug.slug) {
            return true;
        }
    });

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
    } = filterUser[0] || filterUser;

    return (
        <Layout>
            <div className="user-profil">
                <Segment className="user-profil_header">
                    <div className="container_left">
                        <div className="container_left__container">
                            <Image 
                            avatar 
                            size="small"
                            src={avatarUrl || 'https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg'}
                            bordered
                            />
                            { isUserAccount && <Icon name="add" className="add_image_avatar" circular /> }
                            
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
                                <Icon name="setting" /> 
                            </Link>
                            }
                        </div>

                        <div className="container_right__second-row">
                            <div className="second-row_iteach">
                                <div className="title">iTeach</div> 
                                <div className="flags">
                                    { taughtLanguages && taughtLanguages.map(language => (
                                        <Image src={`https://www.countryflags.io/${language.code}/flat/32.png`} className="flag_image"/>
                                    ))}
                                </div>
                            </div>
                            <div className="second-row_ilearn">
                                 
                                <div className="title">iLearn</div> 
                                <div className="flags">
                                    { learnedLanguages && learnedLanguages.map(language => (
                                        <Image src={`https://www.countryflags.io/${language.code}/flat/32.png`} className="flag_image"/>
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
                    { bio &&  <p>« {bio} »</p> }
                </div>
                <div className="user-profil_feed">
                    { records && records.length ? 
                        records.map(audio => (
                            <Irecords record={audio} user={filterUser[0]} key={audio.id} isUserRecord={id} />
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

