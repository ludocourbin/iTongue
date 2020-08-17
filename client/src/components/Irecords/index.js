import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Flag, Icon, Image, Progress } from "semantic-ui-react";

const Irecords = ({ audio, audioIsPlaying, setAudioIsPlaying }) => {
    const audioRef = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const user = { slug: "ludocourbin" };
    const {
        avatar,
        author,
        id,
        flagOrigin,
        flagTarget,
        label,
        traduction,
        audioUrl,
    } = audio;

    const handleClick = (id) => {
        // setAudioIsPlaying(!playing);
        setPlaying(!playing);
        setTimeout(() => {
            if (audioRef && id === audioRef.current.id) {
                if (playing) {
                    audioRef.current.play();
                } else {
                    audioRef.current.pause();
                }
            } else {
                audioRef.current.pause();
            }
        }, 2000);
        console.log(id);
    };

    // useEffect(() => {
    //     console.log(`outside if :  ${audioRef.current.id}`);
    //     // console.log(audioRef);
    //     if (audioRef && audioRef.current && audioRef.current.id) {
    //         if (playing) {
    //             console.log(`inside if (current) :  ${audioRef.current.id}`);
    //             audioRef.current.play();
    //         } else {
    //             audioRef.current.pause();
    //         }
    //     } else {
    //         audioRef.current.pause();
    //     }
    // });

    return (
        <div className="irecords">
            <Card key={id}>
                <Card.Content className="flex">
                    <Image avatar floated="left" size="large" src={avatar} />
                    <Link to={user.slug}>{author}</Link>
                </Card.Content>
                <Card.Content>
                    <p>
                        <Flag name={flagOrigin} />
                        {label}
                    </p>
                </Card.Content>
                <Card.Content>
                    <p>
                        <Flag name={flagTarget} />
                        {traduction}
                    </p>
                </Card.Content>
                <Card.Content className="flex" textAlign="left">
                    <audio
                        id={id}
                        ref={audioRef}
                        type="audio/mpeg"
                        src={audioUrl}
                    />
                    {playing ? (
                        <Icon onClick={() => handleClick(id)} name="pause" />
                    ) : (
                        <Icon onClick={() => handleClick(id)} name="play" />
                    )}
                    <Progress />
                </Card.Content>
            </Card>
        </div>
    );
};

export default Irecords;
