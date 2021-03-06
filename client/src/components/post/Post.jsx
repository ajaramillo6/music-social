import './post.css';
import {MoreVert} from '@material-ui/icons';
import { useState, useEffect, useContext } from "react";
import Song from '../song/Song';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Comments from '../comments/Comments';
import ShareComments from '../shareComments/ShareComments';

export default function Post({ post }) {
    
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const { user:currentUser } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect (()=> {
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async() => {
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser();
    }, [post.userId])

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id })
        }catch(err) {
            
        }

        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                        <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/no-avatar.jpeg"} alt="" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                            <Song post={post} />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {!isLiked ? 
                        <img className="likeIcon" src={`${PF}empty_heart.png`} onClick={likeHandler} alt="" />:
                        <img className="likeIcon" src={`${PF}full_heart.png`} onClick={likeHandler} alt="" />
                        }
                        <span className="postLikeCounter">{like} friends like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
                <div className='postCommentsContainer'>
                    <div className='postCommentsTop'>
                        <ShareComments user={user} />
                    </div>
                    <div className='postCommentsBottom'>
                        <Comments user={user} />
                        <Comments user={user} />
                        <Comments user={user} />
                    </div>
                </div>
            </div>
        </div>
    )
}
