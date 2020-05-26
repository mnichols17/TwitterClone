import React, {useState} from 'react';
import {connect} from 'react-redux';
import {registerAccount} from '../actions/accountActions';

function Register(props) {

    const [newUsername, setUsername] = useState("");
    const [newPassword, setPassword] = useState("");
    // check password const [newPassword, setPassword] = useState(0);
    const [newEmail, setEmail] = useState("");
    const [newName, setName] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        props.registerAccount(newUsername, newPassword, newEmail, newName)
        //props.history.push("/accounts")
    }

    return(
        <form onSubmit={onSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" onChange={e => {setUsername(e.target.value)}} value={newUsername}/>
            <br/>
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" onChange={e => {setPassword(e.target.value)}} value={newPassword} />
            <br/>
            {/* add a check for password */}
            <label htmlFor="email">Name:</label>
            <input type="text" id="name" onChange={e => {setName(e.target.value)}} value={newName} />
            <br/>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" onChange={e => {setEmail(e.target.value)}} value={newEmail} />
            <br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default connect(null, {registerAccount})(Register)