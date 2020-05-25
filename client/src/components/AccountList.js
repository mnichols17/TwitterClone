import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAccounts} from '../actions/accountActions';

class AccountList extends React.Component {

    componentDidMount = () => {
        console.log(this.props)
        this.props.getAccounts();
    }

    render() {
        return (
            <div>
                <h1>ACCOUNTS</h1>
                <ul>
                    {
                        this.props.accounts.map(account => {
                            return(
                                <li key={account._id}><Link to={`/profile/${account.username}`}>{account.username} - {account.name}</Link></li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts.accounts,
        test: state
    }
}

export default connect(mapStateToProps, {getAccounts})(AccountList);