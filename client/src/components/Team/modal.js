import React, {useState} from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const MyModal = ({
    myAvatar,
    toggleModal,
}) => {
    const { name } = myAvatar;

    const [open, setOpen] = React.useState(true);
    console.log('open MyModal : ' + open);

    const quentin = {
        avatar:"",
        desc:""
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
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        >
        <Modal.Header>Select a Photo</Modal.Header>
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
            <Button color='black' onClick={() => setOpen(false)}>
            Nope
            </Button>
            <Button
            content="Yep, that's me"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {
                setOpen(false);
                toggleModal();
            }}
            positive
            />
        </Modal.Actions>
        </Modal>
       
    )
}

export default MyModal;