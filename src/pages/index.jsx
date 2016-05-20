/*
 * index.jsx - Index page for the app.
 */

/* eslint no-console: [ "error", { allow: [ "warn" ] } ] */

import React, {Component} from 'react';
import io from 'socket.io-client';

import styles from './index.less';
import Board from '../components/board';

const socket = io('/tictactoe');

export default class Index extends Component {
    constructor() {
        super();
        this.playMove = this.playMove.bind(this);
        const initialGame = {
            player: -1,
            turn: false,
            board: [
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1]
            ]
        }

        this.state = {
            gameStatus: "disconnect",
            ...initialGame
        };

        socket.on('connect', () => this.setState({ gameStatus: "waiting" }));
        socket.on('disconnect', () => this.setState({
            gameStatus: "disconnect",
            turn: false
        }));
        socket.on('game start', () => this.setState({
            gameStatus: "start", ...initialGame
        }));
        socket.on('game end', winner => {
            let gameStatus;
            switch (winner) {
                case null:
                    gameStatus = "disconnect";
                    break;
                default:
                    gameStatus = winner;
            }
            this.setState({ gameStatus: gameStatus, turn: false });
        });
        socket.on('turn start', player => this.setState({
            player: player, turn: true
        }));
        socket.on('turn end', player => {
            if (player === this.state.player) {
                this.setState({ turn: false });
            }
        });
        socket.on('board', board => this.setState({ board: board }));
    }

    playMove(x, y) {
        if (this.state.turn) {
            socket.emit('move', x, y);
        }
    }

    render() {
        const game = this.state;
        return (
            <div className={styles.index}>
                <Board className="board" playMove={this.playMove} {...game} />
            </div>
        );
    }
}

