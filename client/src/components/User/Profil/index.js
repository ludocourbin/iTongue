import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from "../../../containers/Layout";
import './userprofil.scss';
import { Segment, Image, Icon, Flag, Statistic } from 'semantic-ui-react';
import Statistics from '../Statistics';

const UserProfil = ({ user }) => {

    let { slug } = useParams();
    // if user.slug !== slug
    console.log(slug, user);

    return (

        <Layout>
            <div className="user-profil">
                <Segment className="user-profil_header">
                    <div className="container_left">
                        <Image 
                        avatar 
                        size="small"
                        src="https://ca.slack-edge.com/TUZFANP45-U0102DYQRUL-b7d05e08f84a-512"
                        bordered
                        />
                    </div>

                    <div className="container_right">

                        <div className="container_right__first-row">
                            <span className="header-title">
                                Gautier Colasse
                            </span> 
                            <Icon name="check circle" /> 
                        </div>

                        <div className="container_right__second-row">
                            <div className="second-row_iteach">
                                <div className="title">iTeach</div> 
                                <div className="flags">
                                    <Image src="https://www.countryflags.io/be/flat/16.png" className="flag_image"/>
                                    <Image src="https://www.countryflags.io/fr/flat/16.png" className="flag_image"/>
                                    <Image src="https://www.countryflags.io/us/flat/16.png" className="flag_image"/>
                                </div>
                            </div>
                            <div className="second-row_ilearn">
                                 
                                <div className="title">iLearn</div> 
                                <div className="flags">
                                    <Image src="https://www.countryflags.io/es/flat/16.png" className="flag_image"/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="container_right__third-row">
                            <Statistics /> 
                        </div>
                        
                    </div>
                </Segment>
            </div>
        </Layout>
    );
};

export default UserProfil;