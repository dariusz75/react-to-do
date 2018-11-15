import React, { Component } from 'react';
import uniqid from 'uniqid';

import './App.css';

class App extends Component {

  state = {
    todos: []
  }

  // add todo item method
  addTodo(todoName) {
    this.setState(prevState => {
      const newTodos = prevState.todos.slice().concat(
        {
          name: todoName,
          id: uniqid()
        }
      )
      return { todos: newTodos }
    })
  }

  //delete todo item method


  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
