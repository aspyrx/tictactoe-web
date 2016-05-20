/*
 * index.jsx - Index page for the app.
 */

import React from 'react';

import Board from '../components/board';

export default class Index extends React.Component {
    constructor() {
        super();
        this.playMove = this.playMove.bind(this);
        this.state = {
            x: -1,
            y: -1,
            board: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ]
        };
    }

    playMove(x, y) {
        this.setState({ x: x, y: y });
    }

    render() {
        const {board, x, y} = this.state;
        return (
            <div>
                <h1>{x} {y}</h1>
                <Board board={board} playMove={this.playMove} />
            </div>
        );
    }
}

