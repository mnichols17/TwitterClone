import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createTweet} from '../actions/tweetActions';

function SendReply(props) {

    const [replyBody, setBody] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        if(replyBody !== "") {
            console.log(replyBody)
            //props.createReply(tweetBody);
            //props.setReplying(false);
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

export default connect(null, {createTweet})(SendReply)