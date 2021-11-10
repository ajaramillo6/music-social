import './song.css';
import {PlayArrow, Pause, VolumeUp, VolumeOff} from '@material-ui/icons';
import { useState, useEffect, useRef } from "react";
import Slider from '../slider/Slider';
import { useCountUp } from 'react-countup';

export default function Song({post}) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [plays, setPlays] = useState(0);
    const [soundOn, setSoundOn] = useState(true);
    const [percentage, setPercentage] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const audioRef = useRef();
    const countUpRef = useRef(null);

    const { countUp, start, pauseResume } = useCountUp({
        ref: countUpRef,
        end: 30,
        duration: 30,
        startOnMount: false
      });

    const sound = () => {
        const audio = audioRef.current;

        if(!isPlaying){
            setIsPlaying(true);
            audio.play();
            start();
        } else {
            setIsPlaying(false);
            audio.pause();
            pauseResume();
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


    const count = countUpRef.current;

    useEffect(()=> {
        countPlays(count)
    }, [count, plays])

    const countPlays = (c) =>{
        if(c > 5){
            setPlays(plays + 1)
        }
    }


    return (
        <div className="postContainer">
            <img src={PF+post.album} className="postImg" />

            <h1 ref={countUpRef}></h1>
                {console.log(countUpRef.current)}

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
