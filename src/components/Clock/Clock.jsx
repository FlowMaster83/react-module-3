// таймер, который показывает время в формате
import React, { Component } from 'react';

export default class Clock extends Component {
    // в стейте хранится время
    state = {
        time: new Date().toLocaleTimeString(),
    };

    intervalId = null;

    componentDidMount() {
        console.log('setInterval');

        this.intervalId = setInterval(
            () => this.setState({ time: new Date().toLocaleTimeString() }), 1000,
        );
    }

    // как только компонент размонтируется, интервал снимается
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return <div className="Clock__face">{this.state.time}</div>;
    }
}