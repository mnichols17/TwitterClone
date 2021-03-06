import React, {useState} from 'react';
import {connect} from 'react-redux';
import {editAccount} from '../actions/accountActions';

function EditAccount(props) {

    const [username, setUsername] = useState("");

    const onSubmit = async(e) => {
        if(username !== "") {
            e.preventDefault();
            props.editAccount(username)
            props.history.push(`/profile/${username}`)
        } else {
            e.preventDefault();
            window.alert("Please enter information in the username field!")
        }
    }

    return(
        <form id="editAccount" onSubmit={onSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="user" onChange={e => {setUsername(e.target.value)}} value={username}/>
            <br/>
            <button type="submit">Submit Change</button>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        error: state.accounts.error
    }
}

export default connect(mapStateToProps, {editAccount})(EditAccount)