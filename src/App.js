import React, { Component } from 'react';
import TodoList from './components/presentationals/todo-list';
import TodoSearch from './components/containers/todo-search';
import TodoHeader from './components/presentationals/todo-header';
import TodoStatusFilter from './components/containers/todo-status-filter';
import TodoAddItem from './components/containers/todo-add-item';
import './scss/todo-list.scss';



class App extends Component {


  counter = 1;


  state = {
    todoData : [
      {'text': 'first item', 'key': 'first item'},
      {'text': 'second item', 'key': 'second item'},
      {'text': 'third item', 'key': 'third item'}
    ],
    important: false,
    done: false
  };

  deleteItem = (key) =>{
    this.setState(({ todoData }) => {
      let indexOfDeleted = todoData.findIndex((item) => item.key === key),
          arrayBeforeItem = todoData.slice(0, indexOfDeleted),
          arrayAfterItem = todoData.slice(indexOfDeleted + 1),
          finalArray = [...arrayBeforeItem, ...arrayAfterItem];

      return {
        todoData: finalArray
      };

    });
  };

  addItem = (text) => {
    this.counter++;
    const newItem = {
      text: text,
      key: text + this.counter
    }
    this.setState(({todoData}) => {
        let finalArray = [
          newItem, 
          ...todoData
        ];
        return {
          todoData: finalArray
        };
    }); 
  }

  onToggleImportant = (id) => {
    this.setState(({important}) =>{
      return{
        important: !important
      }
    });
  }

  onToggleDone = (id) => {
    this.setState(({done}) =>{
      return{
        done: !done
      }
    });
  }

  render() {
    return (
      <div className="App">
          <div className="todo__wrapper">
            <div className="todo__header">
              <TodoHeader todo={3} done={4}/>
            </div>
            <div className="todo__buttons">
              <TodoSearch />
              <TodoStatusFilter />
            </div>
            <TodoList 
            todos={this.state.todoData}
            onDeleted={this.deleteItem}
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}/>
            <TodoAddItem addItem={() =>{this.addItem('text')}}/>
          </div>
      </div>
    );
  }
}

export default App;
