/*
 * board.jsx - Board React component.
 */

import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import styles from './board.less';

class Tile extends Component {
    static get propTypes() {
        return {
            player: PropTypes.number.isRequired,
            turn: PropTypes.bool.isRequired,
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
        const {turn, x, y, value} = this.props;
        const classes = classNames("tile", {
            turn: turn,
            ring: value === 0,
            cross: value === 1
        });

        return (
            <g className={classes} onClick={this.click}>
                <rect x={x} y={y} width="1" height="1" />
                <circle cx={x + 0.5} cy={y + 0.5} r="0.35" />
                <line x1={x + 0.15} y1={y + 0.15} x2={x + 0.85} y2={y + 0.85} />
                <line x1={x + 0.85} y1={y + 0.15} x2={x + 0.15} y2={y + 0.85} />
            </g>
        )
    }
}

class Row extends Component {
    static get propTypes() {
        return {
            y: PropTypes.number.isRequired,
            row: PropTypes.arrayOf(PropTypes.number).isRequired
        }
    }

    render() {
        const {row, ...other} = this.props;

        return (
            <g>
                <Tile {...other} x={0} value={row[0]} />
                <Tile {...other} x={1} value={row[1]} />
                <Tile {...other} x={2} value={row[2]} />
            </g>
        )
    }
}

export default class Board extends Component {
    static get propTypes() {
        return {
            className: PropTypes.string,
            board: PropTypes.arrayOf(PropTypes.array).isRequired,
            gameStatus: PropTypes.string.isRequired,
            turn: PropTypes.bool.isRequired
        };
    }

    render() {
        const {
            className,
            gameStatus,
            turn,
            board: [row0, row1, row2],
            ...other
        } = this.props;
        const classes = classNames(className, styles.board, {
            waiting: gameStatus === "waiting",
            disconnect: gameStatus === "disconnect",
            blue: gameStatus === 0,
            red: gameStatus === 1,
            turn: gameStatus === "start" && turn
        });
        return (
            <svg className={classes} viewBox="0 0 3 3">
                <Row {...other} turn={turn} y={0} row={row0} />
                <Row {...other} turn={turn} y={1} row={row1} />
                <Row {...other} turn={turn} y={2} row={row2} />
                <g className="lines">
                    <line x1="1" y1="0" x2="1" y2="3" />
                    <line x1="2" y1="0" x2="2" y2="3" />
                    <line x1="0" y1="1" x2="3" y2="1" />
                    <line x1="0" y1="2" x2="3" y2="2" />
                </g>
                <g className="spinner">
                    <path className="red" d="M 1.15,1.5 a 0.35 0.35 0 0 1 0.35,-0.35" />
                    <path className="blue" d="M 1.85,1.5 a 0.35 0.35 0 0 1 -0.35,0.35" />
                </g>
            </svg>
        );
    }
}
