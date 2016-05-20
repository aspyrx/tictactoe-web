/*
 * board.jsx - Board React component.
 */

import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from './board.less';

class Tile extends Component {
    static get propTypes() {
        return {
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired,
            playMove: PropTypes.func.isRequired
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
        const classes = classNames("tile", {
            circle: value === 0,
            cross: value === 1
        });
        return (
            <div className={classes} onClick={this.click}></div>
        )
    }
}

class Row extends Component {
    static get propTypes() {
        return {
            y: PropTypes.number.isRequired,
            row: PropTypes.arrayOf(PropTypes.number).isRequired,
            playMove: PropTypes.func.isRequired
        }
    }

    constructor() {
        super();
    }

    render() {
        const {row, ...other} = this.props;

        return (
            <div className="row">
                <Tile {...other} x={0} value={row[0]} />
                <Tile {...other} x={1} value={row[1]} />
                <Tile {...other} x={2} value={row[2]} />
            </div>
        )
    }
}

export default class Board extends Component {
    static get propTypes() {
        return {
            board: PropTypes.arrayOf(PropTypes.array).isRequired,
            playMove: PropTypes.func.isRequired
        };
    }

    constructor() {
        super();
    }

    render() {
        const {board: [row0, row1, row2], ...other} = this.props;

        return (
            <div className={styles.board}>
                <Row {...other} y={0} row={row0} />
                <Row {...other} y={1} row={row1} />
                <Row {...other} y={2} row={row2} />
            </div>
        );
    }
}
