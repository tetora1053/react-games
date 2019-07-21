import React from 'react';

export default class SkipTurn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_enable: false
    }
  }

  enable() {
    this.setState({
      is_enable: true
    });
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.state.is_enable) {
            return <button onClick={this.props.skipTurn}>パス</button>
          }
          return <button onClick={this.props.skipTurn} disabled>パス</button>
        })()}
        
      </div>
    );
  }
}