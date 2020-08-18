import React, { useRef, useState } from "react";
import { Progress, Icon } from "semantic-ui-react";

const Audio = ({ url }) => {
    const [audio] = useState(new Audio(url));

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);

    const [playing, toggle] = useAudio(url);

    return (
        <div className="audio">
            <Icon onClick={togglePlaying} name={playing ? "pause" : "play"} />
            <Progress percent={percent} />
        </div>
    );
};

export default Audio;

// <audio
//                 id={id}
//                 onLoadedData={() => {
//                     setDuration(audioRef.current.duration);
//                 }}
//                 onTimeUpdate={() => {
//                     setCurrenTime(audioRef.current.currentTime);
//                 }}
//                 type="audio/mpeg"
//                 src={audioUrl}
//             />
