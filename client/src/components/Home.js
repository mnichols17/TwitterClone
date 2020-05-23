import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Home = props => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        console.log(username, password);
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" onChange={e => {setUsername(e.target.value)}} value={username}/>
                <br/>
                <label htmlFor="password">Password:</label>
                <input type="text" id="password" onChange={e => {setPassword(e.target.value)}} value={password} />
                <input type="submit" value="Submit" />
            </form>
            <Link to="/register">REGISTER</Link>
            <br />
            <br />
            <Link to="/accounts">ACCOUNTS</Link>
        </div>
    )
}

export default Home;
