import React, { Component } from 'react';
import uniqid from 'uniqid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.css';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class App extends Component {

  state = {
    todos: []
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const todos = reorder(
      this.state.todos,
      result.source.index,
      result.destination.index
    );

    this.setState({
      todos,
    });
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

                <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} >
                        <ul className="list-group">
                          {this.state.todos.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <li className="list-group-item" >{item.name}<button className="btn btn-danger float-right" onClick={this.deleteTodo.bind(this, item.id)}>Delete</button></li>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ul>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
