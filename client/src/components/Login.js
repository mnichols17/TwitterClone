import React, {useState} from 'react';
import {connect} from 'react-redux';
import {loginAccount} from '../actions/accountActions';

function Login(props) {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        if(user !== "" || password !== "") {
            console.log(user, password);
            props.loginAccount(user, password)
            //props.history.push("/accounts")
        } else {
            window.alert("Please enter information in both fields!")
        }
        //window.confirm("TEST")
        //props.loginAccount(user, password)
        //props.history.push("/accounts")
    }

    return(
        <form id="login" onSubmit={onSubmit}>
            <div>
                <label htmlFor="username">Username or Email:</label><br/>
                <input type="text" id="user" onChange={e => {setUser(e.target.value)}} value={user}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label><br/>
                <input type="text" id="password" onChange={e => {setPassword(e.target.value)}} value={password} />
            </div>
            <input id="login-button" type="submit" value="Login" />
        </form>
    )
}

export default connect(null, {loginAccount})(Login)