import './share.css';
import {PermMedia, Cancel} from '@material-ui/icons';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Share() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);

    const submitHandler = async(e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }
            if(file1){
                const data = new FormData();
                const fileName = Date.now() + file1.name
                const fileTitle = file1.name
                const fileTitle2 = fileTitle.split('.').slice(0,-1).join('.')
                data.append("name", fileName)
                data.append("file1", file1)
                newPost.img = fileName
                newPost.title = fileTitle2
                
                if(file2){
                    const data2 = new FormData();
                    const fileName2 = Date.now() + file2.name
                    data2.append("name", fileName2)
                    data2.append("file2", file2)
                    newPost.album = fileName2
                
                    try {
                        await axios.post("/upload", data)
                        await axios.post("/upload", data2)
                    } catch(err) {
                        console.log(err);
                    }
                    try {
                        await axios.post("/posts", newPost);
                        window.location.reload();
                    } catch(err) {
                        console.log(err)
                    }
                }
            }
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img 
                        className="shareProfileImg" 
                        src={user.profilePicture
                             ? PF+user.profilePicture 
                             : PF+"person/no-avatar.jpeg"} 
                        alt="" 
                    />
                    <input placeholder={`What's on your mind ${user.username}?`} className="shareInput" ref={desc} />
                </div>
                <hr className="shareHr" />
                {file2 && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file2)} alt="" />
                        <Cancel className="shareCancelImg2" onClick={()=>setFile2(null)} />
                    </div>
                )}
                {file1 && (
                    <div className="shareImgContainer">
                        <audio src={URL.createObjectURL(file1)} type="audio/mpeg" controls />
                        <Cancel className="shareCancelImg1" onClick={()=>setFile1(null)} />
                    </div>
                )}
                <form className="shareBottom" encType="multipart/form-data" onSubmit={ submitHandler }>
                    <div className="shareOptions">
                        <label htmlFor="file2" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Album cover</span>
                            <input 
                                style={{display:"none"}} 
                                id = "file2"
                                type="file"
                                name="file2"
                                accept=".jpeg, .jpg, .png" 
                                onChange={(e)=> setFile2(e.target.files[0])} 
                            />
                        </label>
                        <label htmlFor="file1" className="shareOption">
                            <LibraryMusicIcon htmlColor="yellow" className="shareIcon" />
                            <span className="shareOptionText">Song file</span>
                            <input 
                                style={{display:"none"}} 
                                id = "file1"
                                type="file"
                                name="file1"
                                accept=".mp3" 
                                onChange={(e)=> setFile1(e.target.files[0])} 
                                required
                            />
                        </label>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>

            </div>
        </div>
    )
}
