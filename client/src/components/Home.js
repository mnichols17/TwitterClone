import React from 'react';
import {connect} from 'react-redux';
import {createAccounts} from '../actions/accountActions';

function Home(props) {
    return(
        <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
            <br/>
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" name="password" />
            <br/>
            {/* add a check for password */}
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
            <br/>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
            <br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         accounts: state.accounts.accounts
//     }
// }

export default connect(null, {createAccounts})(Home)
