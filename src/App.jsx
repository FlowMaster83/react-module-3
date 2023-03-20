// сначала стейт, метод жизненного цикла, кастомные методы, метод рендер
import React, { Component } from 'react';
import Container from './components/Container/Container';
import Modal from './components/Modal';
import Clock from './components/Clock';
import Tabs from './components/Tabs';

class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };

  // при маунте можем что-то забрать, зафетчить и засетить начальное состояние этих данных
  // вызывается 1 раз (чтобы взять начальные данные)
  componentDidMount() {
    // console.log('App componentDidMount');

    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);

    console.log(parsedTodos);

    // если есть распарсенные todo, тогда они пишутся в стейт
    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  //может после обновления что-то сделать, например: отправить в локал, отправить хттп-запрос
  // вызывается после каждого обновления
  // если делается сетстейт, проверить, обновилось ли какое-то поле, иначе зациклится компонент
  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');

    // если не равны после обновления
    if (this.state.todos !== prevState.todos) {
      console.log('todos was updated & written to storage');

      // НЕ ИСПОЛЬЗОВАТЬ СТРЕЛОЧНУЮ ФУНКЦИЮ !!!
      // если обновление произошло, todos записывается в localStorage в виде JSON
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
    // !!!! нельзя делать setState() !!!! (зацикливается компонент)

    // до обновления компонента
    console.log(prevState);

    // актуальный стейт после обновления компонента
    console.log(this.state);
  }

  // метод закрытия и открытия окна
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;

    return (
      <Container>
        {/* {showModal && <Clock />} */}

        {/* <button type="button" onClick={this.toggleModal}>
          Show/Hide timer
        </button> */}

        <Tabs />
        <button type="button" onClick={this.toggleModal}>
          Open Modal Window
        </button>

        {showModal && (
          // ссылка на закрытие, открытие окна
          <Modal onClose={this.toggleModal}>
            <h1>This is modal's content</h1>
            <button type="button" onClick={this.toggleModal}></button>
          </Modal>
        )}

        <Clock />

        {/* <TodoEditor onSubmit={this.addTodo} /> */}

        {/* <Filter value={filter} onChange={this.changeFilter} /> */}

        {/* <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.onToggleCompleted}
        /> */}
      </Container>
    );
  }
}

export default App;
