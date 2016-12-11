import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSummoner } from '../actions/index';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this); 
    }
    
    onInputChange(e) {
        this.setState({ term: e.target.value });
    }

    onFormSubmit(e) {
        e.preventDefault();

        this.props.fetchSummoner(this.state.term);

        this.setState({ term: '' });

    }

    render() {
        return (
            <form
            onSubmit={this.onFormSubmit}
            >

                <input
                placeholder="Enter your summoner name"
                className="input-group"
                value={this.state.term}
                onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Login</button>
                </span>
            </form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchSummoner }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginForm)