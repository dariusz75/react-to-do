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
      <div className="App application-container container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">To do list</h5>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={this.state.input} onChange={e => this.setState({ imput: e.target.value })}></input>
                  <div className="input-group-append">
                    <button className="btn btn-info" type="button" onClick={this.addTodo.bind(this, this.state.imput)}>Add task</button>
                  </div>
                </div>


                <ul className="list-group">
                  {this.state.todos.map(el => <li className="list-group-item" key={el.id}>{el.name}<button className="btn btn-danger float-right" onClick={this.deleteTodo.bind(this, el.id)}>Delete</button></li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
