import React from 'react';
import ReactDOM from 'react-dom';
import { Banner } from './Banner.jsx';
import 'regenerator-runtime/runtime';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Banner signInFunction={this.signIn} signUpFunction={this.join} />
            </div>
        )
    }
}