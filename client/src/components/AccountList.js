import React from 'react';
import {connect} from 'react-redux';
import {getAccounts} from '../actions/accountActions';

class AccountList extends React.Component {

    componentDidMount = () => {
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
                                <li key={account.id}>{account.username} - {account.name}</li>
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
        accounts: state.accounts.accounts
    }
}

export default connect(mapStateToProps, {getAccounts})(AccountList);