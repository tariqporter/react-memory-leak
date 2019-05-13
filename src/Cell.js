import React from 'react';

class Cell extends React.PureComponent {
  setCellRef = (ref) => {
    this.cellRef = ref;
  }

  render() {
    const { text } = this.props;
    return (
      <div ref={this.setCellRef}>
        {text}
      </div>
    );
  }
}

export default Cell;
