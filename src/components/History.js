import React from 'react';

export default class History extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span onClick={this.props.handleRewindClick}>←</span>
                <span onClick={this.props.handleForwardClick}>→</span>
            </div>
        );
    }
}