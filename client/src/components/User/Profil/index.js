import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from "../../../containers/Layout";
import Irecords from "../../../containers/Irecords";
import './userprofil.scss';
import { Segment, Image, Icon } from 'semantic-ui-react';
import Statistics from '../Statistics';

import data from "../../Search/data";

const UserProfil = ({ user }) => {

    let { slug } = useParams();
    // if user.slug !== slug
    console.log(slug, user);

    const audios = data.items.filter((el) => el.type === "audio");

    return (

        <Layout>
            <div className="user-profil">
                <Segment className="user-profil_header">
                    <div className="container_left">
                        <div className="container_left__container">
                            <Image 
                            avatar 
                            size="small"
                            src="https://ca.slack-edge.com/TUZFANP45-U0102DYQRUL-b7d05e08f84a-512"
                            bordered
                            />
                            <Icon name="add" className="add_image_avatar" circular />
                        </div>
                    </div>
                    <div className="container_right">
                        <div className="container_right__first-row">
                            <span className="user-title">
                                Gautier Colasse
                            </span> 
                            <Icon name="check circle" /> 
                            <Icon name="setting" />
                        </div>

                        <div className="container_right__second-row">
                            <div className="second-row_iteach">
                                <div className="title">iTeach</div> 
                                <div className="flags">
                                    <Image src="https://www.countryflags.io/be/flat/32.png" className="flag_image"/>
                                    <Image src="https://www.countryflags.io/fr/flat/32.png" className="flag_image"/>
                                    <Image src="https://www.countryflags.io/us/flat/32.png" className="flag_image"/>
                                </div>
                            </div>
                            <div className="second-row_ilearn">
                                 
                                <div className="title">iLearn</div> 
                                <div className="flags">
                                    <Image src="https://www.countryflags.io/es/flat/32.png" className="flag_image"/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="container_right__third-row">
                            <Statistics /> 
                        </div>
                    </div>
                </Segment>
                <div className="container_bio">
                    <p>« Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum suscipit illo velit ✈️ »</p>
                </div>
                <div className="user-profil_feed">
                    { audios.map(audio => (
                        <Irecords audio={audio} key={audio.id} />
                    )) }
                </div>
            </div>
        </Layout>
    );
};

export default UserProfil;

