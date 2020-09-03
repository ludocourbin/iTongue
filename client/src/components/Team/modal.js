import React from 'react'
import { Image, Modal, Icon, Flag} from 'semantic-ui-react';
import './style.scss';
import { motion } from "framer-motion";
import Creepyface from "react-creepyface";
import seriousA from "../../assets/axel/serious.jpeg";
import seriousS from "../../assets/sacha/serious.jpeg";
import seriousQ from "../../assets/quentin/serious.jpeg";
// import seriousG from "../../assets/gautier/serious.jpeg";
import seriousL from "../../assets/ludovic/serious.jpeg";
import hoverA from "../../assets/axel/hover.jpeg";
import hoverQ from "../../assets/quentin/hover.jpeg";
// import hoverG from "../../assets/gautier/hover.jpeg";
import hoverS from "../../assets/sacha/hover.jpeg";
import hoverL from "../../assets/ludovic/hover.jpeg";
import zeroS from "../../assets/sacha/0.jpeg";
import zeroA from "../../assets/axel/0.jpeg";
import zeroQ from "../../assets/quentin/0.jpeg";
//import zeroG from "../../assets/gautier/0.jpeg";
import zeroL from "../../assets/ludovic/0.jpeg";
import oneA from "../../assets/axel/45.jpeg";
import oneQ from "../../assets/quentin/45.jpeg";
//import oneG from "../../assets/gautier/45.jpeg";
import oneS from "../../assets/sacha/45.jpeg";
import oneL from "../../assets/ludovic/45.jpeg";
import twoA from "../../assets/axel/90.jpeg";
import twoQ from "../../assets/quentin/90.jpeg";
import twoL from "../../assets/ludovic/90.jpeg";
//import twoG from "../../assets/gautier/90.jpeg";
import twoS from "../../assets/sacha/90.jpeg";
import threeA from "../../assets/axel/135.jpeg";
import threeQ from "../../assets/quentin/135.jpeg";
// import threeG from "../../assets/gautier/135.jpeg";
import threeS from "../../assets/sacha/135.jpeg";
import threeL from "../../assets/ludovic/135.jpeg";
import fourA from "../../assets/axel/180.jpeg";
import fourQ from "../../assets/quentin/180.jpeg";
//import fourG from "../../assets/gautier/180.jpeg";
import fourS from "../../assets/sacha/180.jpeg";
import fourL from "../../assets/ludovic/180.jpeg";
import fiveA from "../../assets/axel/225.jpeg";
import fiveQ from "../../assets/quentin/225.jpeg";
//import fiveG from "../../assets/gautier/225.jpeg";
import fiveS from "../../assets/sacha/225.jpeg";
import fiveL from "../../assets/ludovic/225.jpeg";
import sixA from "../../assets/axel/270.jpeg";
import sixQ from "../../assets/quentin/270.jpeg";
//import sixG from "../../assets/gautier/270.jpeg";
import sixS from "../../assets/sacha/270.jpeg";
import sixL from "../../assets/ludovic/270.jpeg";
import sevenA from "../../assets/axel/315.jpeg";
import sevenQ from "../../assets/quentin/315.jpeg";
//import sevenG from "../../assets/gautier/315.jpeg";
import sevenS from "../../assets/sacha/315.jpeg";
import sevenL from "../../assets/ludovic/315.jpeg";





const MyModal = ({
    myAvatar,
    visible,
    toggleModal,
}) => {
    // const [thisSerious, setThisSerious] = useState(serious);
    // setThisSerious("come on bro");
   
    const thisAvatar = {
        name:"",
        picture:"",
        creepyface:{
            serious:"",
            hover:"",
            zero:"",
            one:"",
            two:"",
            three:"",
            four:"",
            five:"",
            six:"",
            seven:"",
        },
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
            thisAvatar.creepyface.serious=[seriousL];
            thisAvatar.creepyface.hover=[hoverL];
            thisAvatar.creepyface.zero=[zeroL];
            thisAvatar.creepyface.one=[oneL];
            thisAvatar.creepyface.two=[twoL];
            thisAvatar.creepyface.three=[threeL];
            thisAvatar.creepyface.four=[fourL];
            thisAvatar.creepyface.five=[fiveL];
            thisAvatar.creepyface.six=[sixL];
            thisAvatar.creepyface.seven=[sevenL];
            thisAvatar.desc ="A la tête de cette aventure iTongue, Ludovic vit la vie à fond, il ne s'arrête jamais.";
            thisAvatar.location = "Pau, Nouvelle-Aquitaine";
            thisAvatar.spe = "Product Owner / Front-end";
            thisAvatar.github="https://github.com/ludocourbin";
            thisAvatar.linkedin="https://www.linkedin.com/in/ludoviccourbin/";
            break;
        case 'quentin' :
            thisAvatar.name="Quentin Lemogodeuc";
            thisAvatar.picture = "https://media-exp1.licdn.com/dms/image/C4E03AQGkvnlOcZm7nA/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=no4zBOPgEux8I0eZaUFu1JdzrhAY4fdtbz3gRBhB-IM";
            thisAvatar.creepyface.serious=[seriousQ];
            thisAvatar.creepyface.hover=[hoverQ];
            thisAvatar.creepyface.zero=[zeroQ];
            thisAvatar.creepyface.one=[oneQ];
            thisAvatar.creepyface.two=[twoQ];
            thisAvatar.creepyface.three=[threeQ];
            thisAvatar.creepyface.four=[fourQ];
            thisAvatar.creepyface.five=[fiveQ];
            thisAvatar.creepyface.six=[sixQ];
            thisAvatar.creepyface.seven=[sevenQ];
            thisAvatar.desc="Maitre guitariste, Quentin est bohémien."
            thisAvatar.location = "Bordeaux, Aquitaine";
            thisAvatar.spe = "Lead dev Back-end";
            thisAvatar.github="https://github.com/Lemogodeuc";
            thisAvatar.linkedin="https://www.linkedin.com/in/lemogodeuc/";
            break;
        case 'gautier' :
            thisAvatar.name="Gautier Colasse";
            thisAvatar.picture="https://itongue.s3.eu-west-3.amazonaws.com/uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc?v=1598598733917";
            // thisAvatar.creepyface.serious=[seriousG];
            // thisAvatar.creepyface.hover=[hoverG];
            // thisAvatar.creepyface.zero=[zeroG];
            // thisAvatar.creepyface.one=[oneG];
            // thisAvatar.creepyface.two=[twoG];
            // thisAvatar.creepyface.three=[threeG];
            // thisAvatar.creepyface.four=[fourG];
            // thisAvatar.creepyface.five=[fiveG];
            // thisAvatar.creepyface.six=[sixG];
            // thisAvatar.creepyface.seven=[sevenG];
            thisAvatar.desc="Amateur de motos des bois, Gautier n'a pas froid aux yeux."
            thisAvatar.location = "Lille, Hauts-de-France";
            thisAvatar.spe = "Lead dev Front-end";
            thisAvatar.github="https://github.com/GautierCo";
            thisAvatar.linkedin="https://www.linkedin.com/in/gautier-colasse/";
            break;
        case 'sacha' :
            thisAvatar.name="Sacha Zacaropoulos"
            thisAvatar.picture="https://media-exp1.licdn.com/dms/image/C5603AQGqAXcak7nJwQ/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=bL6B29ZibHWkKpI2oM8nRRWKeewfdJzjNPxPkWxjnS0";
            thisAvatar.creepyface.serious=[seriousS];
            thisAvatar.creepyface.hover=[hoverS];
            thisAvatar.creepyface.zero=[zeroS];
            thisAvatar.creepyface.one=[oneS];
            thisAvatar.creepyface.two=[twoS];
            thisAvatar.creepyface.three=[threeS];
            thisAvatar.creepyface.four=[fourS];
            thisAvatar.creepyface.five=[fiveS];
            thisAvatar.creepyface.six=[sixS];
            thisAvatar.creepyface.seven=[sevenS];
            thisAvatar.desc="Maître lunétier, Sacha voit plus loin que l'être humain lambda.";
            thisAvatar.location = "Nice, PACA";
            thisAvatar.spe = "Git master / Back-end";
            thisAvatar.github="https://github.com/sacha-smz";
            thisAvatar.linkedin="https://www.linkedin.com/in/sacha-zacaropoulos/";
            break;
        case 'axel' :
            thisAvatar.name="Axel Le Boucher"
            thisAvatar.picture="https://media-exp1.licdn.com/dms/image/C4D03AQESNZlLPJ0_yQ/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=2vuvNJidAV1t7bccoxhTbqyBU8I6aOExOrvcDGhJr08";
            thisAvatar.creepyface.serious=[seriousA];
            thisAvatar.creepyface.hover=[hoverA];
            thisAvatar.creepyface.zero=[zeroA];
            thisAvatar.creepyface.one=[oneA];
            thisAvatar.creepyface.two=[twoA];
            thisAvatar.creepyface.three=[threeA];
            thisAvatar.creepyface.four=[fourA];
            thisAvatar.creepyface.five=[fiveA];
            thisAvatar.creepyface.six=[sixA];
            thisAvatar.creepyface.seven=[sevenA];
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
                <Creepyface
                    className="creepyface"
                    // src={`${thisAvatar.creepyface}serious.jpeg`}
                    src={thisAvatar.creepyface.serious}
                    options={{
                    hover: `${thisAvatar.creepyface.hover}` ,
                    looks: [
                        { angle: 0, src: `${thisAvatar.creepyface.zero}` },
                        { angle: 45, src: `${thisAvatar.creepyface.one}` },
                        { angle: 90, src: `${thisAvatar.creepyface.two}` },
                        { angle: 135, src: `${thisAvatar.creepyface.three}`},
                        { angle: 180, src: `${thisAvatar.creepyface.four}` },
                        { angle: 225, src: `${thisAvatar.creepyface.five}` },
                        { angle: 270, src: `${thisAvatar.creepyface.six}` },
                        { angle: 315, src: `${thisAvatar.creepyface.seven}` },
                    ],
                    }}
                />
                {/* <Image size="small"
                src={thisAvatar.picture}
                wrapped
                circular
                centered
                /> */}
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