import React, {useState} from 'react';
import {connect} from 'react-redux';
import {editAccount} from '../actions/accountActions';

function EditAccount(props) {

    const [username, setUsername] = useState("");

    const onSubmit = e => {
        if(username !== "") {
            props.editAccount(username)
        } else {
            e.preventDefault();
            window.alert("Please enter information in the username field!")
        }
        //window.confirm("TEST")
        //props.loginAccount(user, password)
        //props.history.push("/accounts")
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

export default connect(null, {editAccount})(EditAccount)