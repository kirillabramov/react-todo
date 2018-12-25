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
      this.createTodoItem('first item'),
      this.createTodoItem('second item'),
      this.createTodoItem('third item')
    ],
    term: ''
  };




  toggleProperty(arr, key, propName){
    let indexOfDeleted = arr.findIndex((item) => item.key === key),
    oldItem = arr[indexOfDeleted],
    newItem = {...oldItem, [propName]: !oldItem[propName]};
    
    return [...arr.slice(0, indexOfDeleted),
                newItem,
                ...arr.slice(indexOfDeleted + 1)
              ];
  }

  createTodoItem(text){
    return {
      text: text,
      key: text + this.counter,
      important: false,
      done: false
    }
  }

  
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
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
        let finalArray = [
          newItem, 
          ...todoData
        ];
        return {
          todoData: finalArray
        };
    }); 
  };

  onToggleImportant = (key) => {
    this.setState(({todoData}) =>{
      return{
          todoData: this.toggleProperty(todoData, key, 'important')
      }
    });
  };

  onToggleDone = (key) => {
    this.setState(({todoData}) =>{
            return{
              todoData: this.toggleProperty(todoData, key, 'done')
            };
    });
  };

  search(items, term){
    if(term.length === 0){    
      return items;
    }
    return items.filter((item) => {
      return item.text.indexOf(term) > -1;

    });
  }
  
  render() {
    const numberOfDone = this.state.todoData.filter(item => item.done).length,
          numberOfTodo = this.state.todoData.length - numberOfDone,
          visibleItems = this.search(this.state.todoData, this.state.term);
    
    return (
      <div className="App">
          <div className="todo__wrapper">
            <div className="todo__header">
              <TodoHeader todo={numberOfTodo} done={numberOfDone}/>
            </div>
            <div className="todo__buttons">
              <TodoSearch todo={this.state.todoData}/>
              <TodoStatusFilter />
            </div>
            <TodoList 
            todos={this.state.todoData}
            onDeleted={this.deleteItem}
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}/>
            <TodoAddItem addItem={this.addItem}/>
          </div>
      </div>
    );
  }
}

export default App;
