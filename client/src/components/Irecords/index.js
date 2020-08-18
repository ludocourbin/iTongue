import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Flag, Icon, Image, Progress } from "semantic-ui-react";

import "./irecords.scss";

const Irecords = ({ audio, setAudioPlayingIndex, audioPlayingIndex }) => {
    const audioRef = useRef(null);

    const [playing, setPlaying] = useState(false);

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

    const togglePlaying = () => {
        setPlaying(!playing);
        if (!playing) {
            audioRef.current.play();
            setAudioPlayingIndex(id);
        } else {
            audioRef.current.pause();
        }
    };
    useEffect(() => {
        if (audioPlayingIndex !== id) {
            setPlaying(false);
            audioRef.current.pause();
        }
    }, [audioPlayingIndex]);

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
                    <Icon
                        onClick={togglePlaying}
                        name={playing ? "pause" : "play"}
                    />
                    <Progress />
                </Card.Content>
            </Card>
        </div>
    );
};

export default Irecords;
