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
        if(newUsername === "" || newPassword === "" || newEmail === "" || newName === ""){
            alert("Please enter all fields")
            e.preventDefault();
        } else {
            props.registerAccount(newUsername, newPassword, newEmail, newName)
            e.preventDefault();
        }
    }

    return(
        <form id="register" onSubmit={onSubmit}>
            <div>
                <label><h3>Create your account</h3></label>
            </div>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" onChange={e => {setUsername(e.target.value)}} value={newUsername}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="text" id="password" onChange={e => {setPassword(e.target.value)}} value={newPassword} />
            </div>
            {/* add a check for password */}
            <div>
                <label htmlFor="email">Name:</label>
                <input type="text" id="name" onChange={e => {setName(e.target.value)}} value={newName} />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={e => {setEmail(e.target.value)}} value={newEmail} />
            </div>
            <button type="submit">Register</button>
        </form>
    )
}

export default connect(null, {registerAccount})(Register)