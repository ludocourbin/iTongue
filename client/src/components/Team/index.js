import React from 'react';
import './style.scss';
import Layout from "../../containers/Layout";
import MyModal from './modal';

const Team = ({
    // Data du state
    visible,
    // Fonctions
    toggleModal,
    changeId,
}) => {
    const showModal = (evt) => {
        const { id } = evt.target;
        console.log(this.changeId(id));
        // changeId({
        //     [id]:id,
        // })   
        
        toggleModal();
    }
    
    console.log("state visible : " + visible)
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
            {visible && <MyModal /> } 
        </Layout>
    )
};
export default Team;