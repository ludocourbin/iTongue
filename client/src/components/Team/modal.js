import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const MyModal = ({
    myAvatar,
    visible,
    toggleModal,
}) => {

    const quentin = {
        avatar:"",
        desc:"",
    };
    const ludovic = {
        avatar:"",
        desc:"",
    }
    const sacha = {
        avatar:"",
        desc:"",
    }
    const axel = {
        avatar:"",
        desc:"",
    }
    const gautier = {
        avatar:"",
        desc:"",
    }
    return (
        <Modal
        onClose={toggleModal}
        onOpen={toggleModal}
        open={visible}
        >
        <Modal.Header>Hey {myAvatar}</Modal.Header>
        <Modal.Content image>
            <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
            <Modal.Description>
            <Header>Mon ID est</Header>
            <p>
                We've found the following gravatar image associated with your e-mail
                address.
            </p>
            <p>Is it okay to use this photo?</p>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button
            content="Yep, that's me"
            icon='checkmark'
            onClick={() => {
                toggleModal();
            }}
            positive
            />
        </Modal.Actions>
        </Modal>
       
    )
}

export default MyModal;