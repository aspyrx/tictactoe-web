/*
 * index.jsx - Index page for the app.
 */

import React, {Component} from 'react';

import './index.less';
import Board from '../components/board';

export default class Index extends Component {
    constructor() {
        super();
        this.playMove = this.playMove.bind(this);
        this.state = {
            player: 0,
            board: [
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1]
            ]
        };
    }

    playMove(x, y) {
        const {board, player} = this.state;
        board[y][x] = player;
        this.setState({ board: board });
    }

    render() {
        const {board} = this.state;
        return (
            <div className="index">
                <Board board={board} playMove={this.playMove} />
            </div>
        );
    }
}

