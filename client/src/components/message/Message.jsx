import './message.css';
import {format} from "timeago.js";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Message({message, own}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);



    return (
        <div className={own ? "message own" : "message"}>
           <div className="messageTop">
               {own ? 
                <img className="messageImg" src={user?.profilePicture ? PF+user.profilePicture : PF+"person/no-avatar.jpeg" } alt="" />:
                <img className="messageImg" src={user?.profilePicture ? PF+user.profilePicture : PF+"person/no-avatar.jpeg" } alt="" />}
                <p className="messageText">{message.text}</p>
            </div> 
           <div className="messageBottom">{format(message.createdAt)}</div> 
        </div>
    )
}
