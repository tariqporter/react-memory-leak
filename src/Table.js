import React from 'react';
import uuidv4 from 'uuid/v4';
import { loremIpsum } from 'lorem-ipsum';
import Cell from './Cell';

class Table extends React.PureComponent {
  state = {
    allRows: [],
    currentRows: [],
    startIndex: 0,
    isStarted: false
  };

  componentWillMount() {
    const allRows = [];
    for (let i = 0; i < 10000; i++) {
      const row = { id: uuidv4(), cells: [] };
      for (let j = 0; j < 20; j++) {
        row.cells.push({ id: uuidv4(), text: loremIpsum() });
      }
      allRows.push(row);
    }
    this.setState({ allRows });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  createCurrentRows = () => {
    const { allRows, startIndex } = this.state;
    const newStartIndex = startIndex + 100 >= allRows.length ? 0 : startIndex + 100;
    const currentRows = allRows.slice(newStartIndex, newStartIndex + 100);
    this.setState({ currentRows, startIndex: newStartIndex });
  }

  toggleStart = () => {
    const { isStarted } = this.state;
    if (isStarted) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(this.createCurrentRows, 100);
    }
    this.setState({ isStarted: !isStarted });
  }

  render() {
    const { currentRows, isStarted } = this.state;
    const rows = currentRows.map((row, i) => (
      <div key={row.id} className="row">
        {
          row.cells.map((cell, j) => (
            <div key={cell.id} className="cell">
              <Cell text={cell.text} />
            </div>
          ))
        }
      </div>
    ));

    return (
      <div>
        <div>
          <button onClick={this.toggleStart}>{isStarted ? 'Stop' : 'Start'}</button>
        </div>
        <div>
          {rows}
        </div>
      </div>
    );
  }
}

export default Table;
