import React from 'react'
import { Image, Modal, Icon, Flag} from 'semantic-ui-react';
import './style.scss';
import { motion } from "framer-motion";
import creepyface from 'creepyface';

const MyModal = ({
    myAvatar,
    visible,
    toggleModal,
}) => {
    const thisAvatar = {
        name:"",
        picture:"",
        creepyface:"",
        desc:"",
        location:"",
        spe:"",
        github:"",
        linkedin:"",
    }
    switch (myAvatar) {
        case 'ludovic' :
            thisAvatar.name="Ludovic Courbin";
            thisAvatar.picture ="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/5/6/5/7/aa0d3e447aac8a32fb8c3ae0a52c?v=1598967009884";
            thisAvatar.creepyface="./creepyface/ludovic/"
            thisAvatar.desc ="A la tête de cette aventure iTongue, Ludovic vit la vie à fond, il ne s'arrête jamais.";
            thisAvatar.location = "Pau, Nouvelle-Aquitaine";
            thisAvatar.spe = "Product Owner / Front-end";
            thisAvatar.github="https://github.com/ludocourbin";
            thisAvatar.linkedin="https://www.linkedin.com/in/ludoviccourbin/";
            break;
        case 'quentin' :
            thisAvatar.name="Quentin Lemogodeuc";
            thisAvatar.picture = "https://media-exp1.licdn.com/dms/image/C4E03AQGkvnlOcZm7nA/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=no4zBOPgEux8I0eZaUFu1JdzrhAY4fdtbz3gRBhB-IM";
            thisAvatar.creepyface="./creepyface/quentin/"
            thisAvatar.desc="Maitre guitariste, Quentin est bohémien."
            thisAvatar.location = "Bordeaux, Aquitaine";
            thisAvatar.spe = "Lead dev Back-end";
            thisAvatar.github="https://github.com/Lemogodeuc";
            thisAvatar.linkedin="https://www.linkedin.com/in/lemogodeuc/";
            break;
        case 'gautier' :
            thisAvatar.name="Gautier Colasse";
            thisAvatar.picture="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc?v=1598598733917";
            thisAvatar.creepyface="./creepyface/gautier/"
            thisAvatar.desc="Amateur de motos des bois, Gautier n'a pas froid aux yeux."
            thisAvatar.location = "Lille, Hauts-de-France";
            thisAvatar.spe = "Lead dev Front-end";
            thisAvatar.github="https://github.com/GautierCo";
            thisAvatar.linkedin="https://www.linkedin.com/in/gautier-colasse/";
            break;
        case 'sacha' :
            thisAvatar.name="Sacha Zacaropoulos"
            thisAvatar.picture="https://media-exp1.licdn.com/dms/image/C5603AQGqAXcak7nJwQ/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=bL6B29ZibHWkKpI2oM8nRRWKeewfdJzjNPxPkWxjnS0";
            thisAvatar.creepyface="./creepyface/sacha/"
            thisAvatar.desc="Maître lunétier, Sacha voit plus loin que l'être humain lambda.";
            thisAvatar.location = "Nice, PACA";
            thisAvatar.spe = "Git master / Back-end";
            thisAvatar.github="https://github.com/sacha-smz";
            thisAvatar.linkedin="https://www.linkedin.com/in/sacha-zacaropoulos/";
            break;
        case 'axel' :
            thisAvatar.name="Axel Le Boucher"
            thisAvatar.picture="https://media-exp1.licdn.com/dms/image/C4D03AQESNZlLPJ0_yQ/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=2vuvNJidAV1t7bccoxhTbqyBU8I6aOExOrvcDGhJr08";
            thisAvatar.creepyface="./creepyface/axel/"
            thisAvatar.desc="Axel est un petit chenapan, il n'hésite jamais à faire une petite blague."
            thisAvatar.location = "Tours, Centre Val-de-Loire";
            thisAvatar.spe = "Scrum master, Front-end";
            thisAvatar.github="https://github.com/LBAxel";
            thisAvatar.linkedin="https://www.linkedin.com/in/lbaxel/";

            break;
        default:
            console.log('This guy is not in the team. Get him out !');
        }
        console.log(thisAvatar);
    return (
        <Modal
        onClose={toggleModal}
        onOpen={toggleModal}
        open={visible}
        className="myModal"
        >
            <motion.div className="myModal-topside"
            initial={{ x: '+100vw'}}
            animate={{ x : 0}}
            transition={{delay : 0.3, duration : 1.2}}
            >
                <Image size="small"
                src={thisAvatar.picture}
                wrapped
                circular
                centered
                />
                <h3>{thisAvatar.name}</h3>
                <span>{thisAvatar.spe}</span>
            </motion.div>
            <div className="myModal-botside">
                <motion.div className="myModal-botside__quote"
                initial={{ x: '-100vw'}}
                animate={{ x : 0}}
                transition={{delay : 0.3, duration : 1.2}}
                >
                    <Icon name="quote left" size="tiny" className="myQuote" />
                    <p>{thisAvatar.desc}</p>
                </motion.div>
                <div className="myModal-botside__links">
                    <a href={thisAvatar.linkedin}>
                        <Icon name="linkedin"  size="big" />
                    </a>
                    <a href={thisAvatar.github}>
                        <Icon name="github" size="big" />
                    </a>
                </div>
                <div className="myModal-botside__location">
                    <Flag name='france' />
                    <h4>{thisAvatar.location}</h4>
                </div>
            </div>
        </Modal>             
    )
}

export default MyModal;

{/* <Modal
            onClose={toggleModal}
            onOpen={toggleModal}
            open={visible}
            className="modal-avatar"
            >
            <Card className="card-avatar">
                <Image size="medium" src={thisAvatar.picture} wrapped ui={false} />
                <Card.Content className="center-content">
                <Card.Header>{thisAvatar.name}</Card.Header>
                <Card.Meta>
                    <span className='date'>{thisAvatar.spe}</span>
                </Card.Meta>
                <Card.Description className="remove-padding-desc">
                    <div className="desc">
                        {thisAvatar.desc}
                        <div className="links">
                            <a href={thisAvatar.linkedin}>
                                <Icon name="linkedin" size="big" />
                            </a>
                            <a href={thisAvatar.github}>
                                <Icon name="github" size="big" />
                            </a>
                        </div>
                    </div>   
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {thisAvatar.location}
                </a>
                </Card.Content>
            </Card>
            </Modal>  */}