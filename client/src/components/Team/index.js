import React, {useState, useEffect} from 'react';
import './style.scss';
import Layout from "../../containers/Layout";
import MyModal from './modal';

const Team = ({
    visible,
    idAvatar,
    toggleModal,
    changeId,
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [avatarId, setAvatarId] = useState("");
    const showModal = (e) => {
        console.log(e.target.id);
        
        setAvatarId(e.target.id);
        setOpenModal(true);
        console.log('in showModal : ' + openModal)
    }
    useEffect(() => {
        console.log('apres useEffect : ' + openModal)
    })
    
    console.log("openModal bro : " + openModal)
    return (
        <Layout>
            <h3> L'équipe du projet iTongue</h3>
            <div className="team-div"> 
                <div className="topDiv">
                    <img onClick={showModal} id="gautier" src="https://image.flaticon.com/icons/svg/147/147144.svg" alt="avatar" />
                    <img onClick={showModal} id="axel"src="https://image.flaticon.com/icons/svg/147/147144.svg" alt="avatar" />
                </div>
                <div className="middleDiv">
                    <img onClick={showModal} id="ludovic" src="https://image.flaticon.com/icons/svg/147/147144.svg" alt="avatar" />
                </div>
                <div className="botDiv"> 
                    <img onClick={showModal} id="sacha" src="https://image.flaticon.com/icons/svg/147/147144.svg" alt="avatar" />  
                    <img onClick={showModal} id="quentin" src="https://image.flaticon.com/icons/svg/147/147144.svg" alt="avatar" />
                </div>
            </div>
            {visible && <MyModal idAvatar={avatarId} /> } 
        </Layout>
    )
};
export default Team;