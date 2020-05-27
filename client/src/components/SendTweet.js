import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createTweet} from '../actions/tweetActions';

function SendTweet(props) {

    const [tweetBody, setBody] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        if(tweetBody !== "") {
            props.createTweet(tweetBody);
            props.setTweeting(false);
        }
        else alert("Tweet body must contain at least 1 character")
    }

    return(
        <form id="sendTweet" onSubmit={onSubmit}>
            <textarea maxLength="140" onChange={e => {setBody(e.target.value)}} value={tweetBody}></textarea>
            <div>
                <p>{tweetBody.length}/140</p>
                <button type="submit">Send Tweet</button>
            </div>
        </form>
    )
}

export default connect(null, {createTweet})(SendTweet)