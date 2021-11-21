import './song.css';
import {PlayArrow, Pause, VolumeUp, VolumeOff} from '@material-ui/icons';
import { useState, useEffect, useRef } from "react";
import Slider from '../slider/Slider';

export default function Song({post}) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [plays, setPlays] = useState(0);
    const [soundOn, setSoundOn] = useState(true);
    const [percentage, setPercentage] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [clock, setClock] = useState(30);
    const [status, setStatus] = useState(false)

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const audioRef = useRef();

    useEffect(() => {
        if (currentTime < 0.2){
            setClock(30);
        }
    }, [clock, currentTime])


    const sound = () => {
        const audio = audioRef.current;

        if(!isPlaying){
            setIsPlaying(true);
            audio.play();
            setStatus(true);
        } else {
            setIsPlaying(false);
            audio.pause();
            setStatus(false)
        }
    }

    const checkSoundOn = () => {
        const audio = audioRef.current;
        if(!soundOn){
            setSoundOn(true);
            audio.volume=0.6;
        } else {
            setSoundOn(false);
            audio.volume = 0;
        }
    }

    const onChange = (e) => {
        const audio = audioRef.current;
        audio.currentTime = (audio.duration/100) * e.target.value;
        setPercentage(e.target.value);
    }

    const getCurrDuration = (e) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        const time = e.currentTarget.currentTime

        setPercentage(+percent)
        setCurrentTime(time.toFixed(2))
    }

    useEffect(()=> {
        if (clock > 0 && status) {
            setTimeout(() => setClock(clock - 1), 1000);
        }
        if (clock === 1){
            setPlays(plays+1);
        }
    }, [clock, status])


    return (
        <div className="postContainer">
            <img src={PF+post.album} className="postImg" />
            <ul className='song'>
                <li className="song-title">
                    <span>{post.title}</span>
                </li>
                <li>
                    <div className='control-panel'>
                        <div className='song-btn' onClick={sound} style={{'transform': 'scale(1.7)'}}>
                            {isPlaying ? <Pause className="pauseBtn" />:<PlayArrow className="playBtn" />}
                        </div>
                        <div className='volume-btn' onClick={checkSoundOn}>
                            {soundOn ? <VolumeUp /> : <VolumeOff />}
                        </div>
                    </div>
                    <Slider 
                        min={0}
                        max={100}
                        step={0.0001}
                        percentage={percentage}
                        onChange={onChange}
                        currentTime={currentTime}
                        duration={duration}
                        plays={plays}
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
