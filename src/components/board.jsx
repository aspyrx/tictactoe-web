/*
 * board.jsx - Board React component.
 */

import React from 'react';

class Tile extends React.Component {
    static get propTypes() {
        return {
            x: React.PropTypes.number.isRequired,
            y: React.PropTypes.number.isRequired,
            value: React.PropTypes.number.isRequired,
            playMove: React.PropTypes.func.isRequired
        }
    }

    constructor() {
        super();
        this.click = this.click.bind(this);
    }

    click() {
        const {x, y, playMove} = this.props;
        playMove(x, y);
    }

    render() {
        const {value} = this.props;
        return (
            <div onClick={this.click}>
                <span>{value}</span>
            </div>
        )
    }
}

class Row extends React.Component {
    static get propTypes() {
        return {
            y: React.PropTypes.number.isRequired,
            row: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
            playMove: React.PropTypes.func.isRequired
        }
    }

    constructor() {
        super();
    }

    render() {
        const {row, ...other} = this.props;

        return (
            <div>
                <Tile {...other} x={0} value={row[0]} />
                <Tile {...other} x={1} value={row[1]} />
                <Tile {...other} x={2} value={row[2]} />
            </div>
        )
    }
}

export default class Board extends React.Component {
    static get propTypes() {
        return {
            board: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
            playMove: React.PropTypes.func.isRequired
        };
    }

    constructor() {
        super();
    }

    render() {
        const {board: [row0, row1, row2], ...other} = this.props;

        return (
            <div>
                <Row {...other} y={0} row={row0} />
                <Row {...other} y={1} row={row1} />
                <Row {...other} y={2} row={row2} />
            </div>
        );
    }
}
