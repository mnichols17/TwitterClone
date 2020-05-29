import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createReply} from '../actions/replyActions';

function SendReply(props) {

    const [replyBody, setBody] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        if(replyBody !== "") {
            props.createReply(props.tweetId, replyBody);
            props.setReplying(false);
        }
        else alert("Reply body must contain at least 1 character")
    }

    return(
        <form id="sendTweet" onSubmit={onSubmit}>
            <textarea maxLength="140" onChange={e => {setBody(e.target.value)}} value={replyBody}></textarea>
            <div>
                <p>{replyBody.length}/140</p>
                <button type="submit">Reply</button>
            </div>
        </form>
    )
}

export default connect(null, {createReply})(SendReply)