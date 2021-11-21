import './comments.css';
import { Link } from 'react-router-dom';

export default function Comments({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
    <>
        <div className='commentContainer'>
            <div className='commentTop'>
                <Link to={`profile/${user.username}`}>
                    <img className="commentProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/no-avatar.jpeg"} alt="" />
                </Link>
                <span className="commentUsername">{user.username}</span>
                <span className="commentDate">7 days ago</span>
            </div>
            <div className='commentBottom'>
                <div className='commentText' >
                    <span> Wow, I love this song! </span>
                </div>
            </div>
            <div className='commentLike'>
                <img className="commentLikeIcon" src={`${PF}empty_heart.png`} alt="" />
                <span className="commentLikeCounter">0</span>
            </div>
        </div>
    </>
    )
}
