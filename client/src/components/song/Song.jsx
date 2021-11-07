import './song.css';
import {PlayArrow, Pause} from '@material-ui/icons';
import { useState, useRef } from "react";
import { Button } from '@material-ui/core';
import Slider from '../slider/Slider';

export default function Song({post}) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const audioRef = useRef();

    const sound = () => {
        const audio = audioRef.current;
        audio.volume = 0.6

        if(!isPlaying){
            setIsPlaying(true);
            audio.play();
        } else {
            setIsPlaying(false);
            audio.pause();
        }
    }

    const onChange = (e) => {
        const audio = audioRef.current
        audio.currentTime = (audio.duration/100) * e.target.value
        setPercentage(e.target.value);
    }

    const getCurrDuration = (e) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        const time = e.currentTarget.currentTime

        setPercentage(+percent)
        setCurrentTime(time.toFixed(2))
    }

    return (
        <div className="postContainer">
            <img src={PF+post.album} className="postImg" />
            <ul className='song'>
                <li className="song-title">
                    <span>{post.img}</span>
                </li>
                <li>
                    <div onClick={sound} style={{'transform': 'scale(1.7)'}}>
                        {isPlaying ? <Pause className="pauseBtn" />:<PlayArrow className="playBtn" />}
                    </div>
                    <Slider 
                        min={0}
                        max={100}
                        step={0.001}
                        percentage={percentage}
                        onChange={onChange}
                        currentTime={currentTime}
                        duration={duration}
                    />
                    <audio 
                        ref={audioRef} 
                        src={PF+post.img}
                        onTimeUpdate = {getCurrDuration}
                        onLoadedData = {(e) => {
                            setDuration(e.currentTarget.duration.toFixed(2))
                        }}
                        >
                    </audio>
                </li>
            </ul>
        </div>
    )
}
