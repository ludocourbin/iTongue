import React, { useState, useEffect } from 'react';
import './style.scss';
import './pyro.scss';
import { Image, Grid } from 'semantic-ui-react';
import Layout from "../../containers/Layout";
import MyModal from '../../containers/Team/Modal';
import { motion } from "framer-motion";

const Team = ({
    // Data du state
    visible,
    // Fonctions
    toggleModal,
    changeAvatar,
}) => {
    
    const [pyroVisible, setPyroVisible] = useState(false);

    const showModal = (evt) => {
        setPyroVisible(true);
        const { alt } = evt.target;
        changeAvatar(alt);
        setTimeout(() => {
            setPyroVisible(false);
            toggleModal();
        }, 500);
        // toggleModal();
        console.log("id : " + alt);
    }

    return (
        <Layout>
            { pyroVisible && 
                <div className="pyro">
                    <div className="before"></div>
                    <div className="after"></div>
                </div>
            }
            
            { !pyroVisible && 
            <motion.div className="team-div"
            initial={{opacity : 0}}
            animate= {{ opacity : 1 }}
            transition={{delay:1, duration:0.5}}
            > 
                <motion.div className="topDiv"
                initial={{ x: '-100vw'}}
                animate={{ x : 0}}
                transition={{delay : 0.3, duration : 1.2}}
                >
                    <Grid columns={2}>
                        <Grid.Column>
                        <Image
                            onClick={showModal}
                            label={{
                            as: 'a',
                            color: 'orange',
                            content: 'Gautier',
                            ribbon: true,
                            }}
                            attached="bottom"
                            circular
                            size='small'
                            src='https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc?v=1598598733917'
                            id="gautier"
                            alt="gautier"
                        />
                        </Grid.Column>

                        <Grid.Column>
                        <Image
                            onClick={showModal}
                            id="axel"
                            label={{
                            as: 'a',
                            color: 'orange',
                            content: 'Axel',
                            ribbon: true,
                            }}
                            circular
                            size='small'
                            alt="axel"
                            src='https://media-exp1.licdn.com/dms/image/C4D03AQESNZlLPJ0_yQ/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=2vuvNJidAV1t7bccoxhTbqyBU8I6aOExOrvcDGhJr08'
                        />
                        </Grid.Column>
                    </Grid>
                </motion.div>
                    {/* <Image onClick={showModal} id="gautier"
                        src='https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc?v=1598598733917'
                        size='small' circular /> */}
                    {/* <Image onClick={showModal} id="axel"src='https://media-exp1.licdn.com/dms/image/C4D03AQESNZlLPJ0_yQ/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=2vuvNJidAV1t7bccoxhTbqyBU8I6aOExOrvcDGhJr08' size='small' circular  /> */}

                <div className="middleDiv">
                    {/* <Image onClick={showModal} id="ludovic"src='https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/5/6/5/7/aa0d3e447aac8a32fb8c3ae0a52c?v=1598599248039' size='small' circular  /> */}
                    <Grid columns={1}>
                        <Grid.Column>
                        <Image
                            onClick={showModal}
                            id="ludovic"
                            label={{
                            as: 'a',
                            color: 'orange',
                            content: 'Ludovic',
                            ribbon: true,
                            }}
                            circular
                            alt="ludovic"
                            size='small'
                            src='https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/5/6/5/7/aa0d3e447aac8a32fb8c3ae0a52c?v=1598599248039'
                        />
                        </Grid.Column>
                    </Grid>
                </div>
                <motion.div className="botDiv"
                initial={{ x: '100vw'}}
                animate={{ x : 0}}
                transition={{delay : 0.3, duration : 1.2}}
                > 
                    {/* <Image onClick={showModal} id="sacha"src='https://media-exp1.licdn.com/dms/image/C5603AQGqAXcak7nJwQ/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=bL6B29ZibHWkKpI2oM8nRRWKeewfdJzjNPxPkWxjnS0' size='small' circular  />  
                    <Image onClick={showModal} id="quentin"src='https://media-exp1.licdn.com/dms/image/C4E03AQGkvnlOcZm7nA/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=no4zBOPgEux8I0eZaUFu1JdzrhAY4fdtbz3gRBhB-IM' size='small' circular  /> */}
                    <Grid columns={2}>
                        <Grid.Column>
                        <Image
                            onClick={showModal}
                            id="sacha"
                            label={{
                            as: 'a',
                            color: 'orange',
                            content: 'Sacha',
                            ribbon: true,
                            }}
                            circular
                            size='small'
                            alt="sacha"
                            src='https://media-exp1.licdn.com/dms/image/C5603AQGqAXcak7nJwQ/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=bL6B29ZibHWkKpI2oM8nRRWKeewfdJzjNPxPkWxjnS0'
                        />
                        </Grid.Column>

                        <Grid.Column>
                        <Image
                            onClick={showModal}
                            id="quentin"
                            label={{
                            as: 'a',
                            color: 'orange',
                            content: 'Quentin',
                            ribbon: true,
                            }}
                            circular
                            size='small'
                            alt="quentin"
                            src='https://media-exp1.licdn.com/dms/image/C4E03AQGkvnlOcZm7nA/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=no4zBOPgEux8I0eZaUFu1JdzrhAY4fdtbz3gRBhB-IM'
                        />
                        </Grid.Column>
                    </Grid>
                
                </motion.div>
            </motion.div>
            }
            {visible && <MyModal /> } 

        </Layout>
    )
};
export default Team;