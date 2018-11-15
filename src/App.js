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
          id: uniqid(),
          input: ''
        }
      )
      return { todos: newTodos }
    })
  }

  //delete todo item method
  deleteTodo(todoId) {
    this.setState(prevState => {
      const newTodos = prevState.todos.slice().filter(el => el.id !== todoId);
      return { todos: newTodos }
    })

  }


  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.input} onChange={e => this.setState({ imput: e.target.value })}></input>
        <button onClick={this.addTodo.bind(this, this.state.imput)}>Add task</button>
        <ul>
          {this.state.todos.map(el => <li key={el.id}>{el.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
