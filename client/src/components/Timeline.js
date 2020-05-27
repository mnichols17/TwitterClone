import React from 'react';
import {connect} from 'react-redux';

import Tweet from './Tweet';

class Timeline extends React.Component {

    render() {
        return(
            <div>
                <Tweet />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.accounts.profile 
    }
}

export default connect(mapStateToProps)(Timeline)