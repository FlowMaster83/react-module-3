import React, { Component } from 'react';
// создание портала
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');

    //   при монтировании будет регистрироваться keydown с колбеком
    window.addEventListener('keydown', this.handleKeyDown);
  }

  //   метод для очистки "за собой"
  componentWillUnmount() {
    console.log('Modal componentWillUnmount');

    //   при размонтировании будет сниматься keydown с колбеком
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  //   размонитрование происходит автоматически

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('pressed ESC, need close modal');

      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    console.log('Click in backdrop');

    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    // возврат результат вызова метода createPortal, куда передается 1м аргументом передается разметка...
    return createPortal(
      <div className="Modal__backdrop" onCLick={this.handleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      //   а 2м аргументом - ссылка на modalRoot.
      modalRoot
    );
  }
}
