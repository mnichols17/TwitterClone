import React, {useState} from 'react';
import {connect} from 'react-redux';

function SendTweet(props) {

    const [tweetBody, setBody] = useState("");

    const onSubmit = () => {
        console.log(tweetBody)
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

export default connect(null)(SendTweet)