import './slider.css';
import { useEffect, useRef} from 'react';

export default function Slider(props) {

    const rangeRef = useRef();

    const {
        min,
        max,
        step,
        percentage,
        onChange,
        currentTime,
        duration,
        plays
    } = props;

    useEffect(()=> {
        rangeLinearGradient(percentage, min, max)
    }, [rangeRef, min, max, percentage])

    const handleChange = (max) => e => {
        onChange(e);
        rangeLinearGradient(e.target.value, min, max)
    }

    const calculatePercentage = (percentage, min, max) => {
        return ((percentage - min) / (max - min)) * 100 + '%';
    }

    const rangeLinearGradient = (percentage, min, max) => {
        const percent = calculatePercentage(percentage, min, max);
        const newBackgroundStyle = `linear-gradient(90deg, #009FFF 0% ${percent}, white ${percent} 100%)`;
        rangeRef.current.style.background = newBackgroundStyle;
    }

    const timeConverter = (seconds) => {
        if (!seconds) {
            return '0:00'
        }

        let duration = seconds
        let hours = duration / 3600
        duration = duration % 3600
    
        let min = parseInt(duration / 60)
        duration = duration % 60
    
        let sec = parseInt(duration)
    
        if (sec < 10) {
          sec = `0${sec}`
        }
        if (min < 10) {
          min = `${min}`
        }
    
        if (parseInt(hours, 10) > 0) {
          return `${parseInt(hours, 10)}:${min}:${sec}`
        } else if (min == 0) {
          return `0:${sec}`
        } else {
          return `${min}:${sec}`
        }
    }   

    return (
        <div>
            <div className="sliderContainer">
                <input className='range-slider'
                    ref={rangeRef}
                    type='range'
                    min={min}
                    max={max}
                    step={step}
                    value = {percentage}
                    onChange= {handleChange(max)}
                />
                <div className="range-min-max-values">
                    <div className="min-value">{timeConverter(currentTime)}</div> 
                    <div className="max-value">/ {timeConverter(duration)}</div>
                    <div className="min-value-mini">{timeConverter(currentTime)}</div> 
                    <div className="max-value-mini">/{timeConverter(duration)}</div>
                    <div className="plays-count">{plays} plays</div>
                </div>
               
            </div>
        </div>
    )
}
