import './shareComments.css';
import { Link } from 'react-router-dom';

export default function ShareComments({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className='writeCommentContainer'>
            <Link to={`profile/${user.username}`}>
                <img className="shareCommentProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/no-avatar.jpeg"} alt="" />
            </Link>
            <input className='writeComment' placeholder= {'Write your comment here...'} />
        </div>
    )
}
