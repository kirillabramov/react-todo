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
    term: '',
    filter: 'all' // active, all, done
  };






  //Session storage 
    getFromSessionStorage(item){
      if(sessionStorage.getItem(item)){
        return JSON.parse(sessionStorage.getItem(item));
        
      } else{
        return null;
        
      }

    }

    saveInSessionStorage(array, title){
      sessionStorage.setItem(title, JSON.stringify(array));
    }

    deleteFromSessionStorage(array, item){

      array.splice(item, 1);
      this.saveInSessionStorage(array, 'todo');

    }

    addToSessionStorage(array, item){
      array.push(item);
      this.saveInSessionStorage(array, 'todo')
    }



  //Session storage

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
  };

  
  deleteItem = (key) =>{
    this.setState(({ todoData }) => {
      let indexOfDeleted = todoData.findIndex((item) => item.key === key),
          arrayBeforeItem = todoData.slice(0, indexOfDeleted),
          arrayAfterItem = todoData.slice(indexOfDeleted + 1),
          finalArray = [...arrayBeforeItem, ...arrayAfterItem];
        this.deleteFromSessionStorage(this.getFromSessionStorage('todo'), this.getFromSessionStorage('todo').findIndex(item => item.key === key));
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
        this.saveInSessionStorage(finalArray, 'todo');
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

  onSearchChange = (term) => {
      this.setState({ term });
  };
  onStatusChange = (filter) => {
    this.setState({ filter });
  }
  search(items, term){
    if(term.length === 0){    
      return items;
    }
    return items.filter((item) => {
      return item.text.indexOf(term) > -1;

    });
  };

  filter(items, filter){
    switch(filter){
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    };
  }
  
  render() {

    const checkSessionStorage = sessionStorage.getItem('todo') ? this.getFromSessionStorage('todo')  : this.state.todoData,
          numberOfDone = checkSessionStorage.filter(item => item.done).length,
          numberOfTodo = checkSessionStorage.length - numberOfDone,
          visibleItems = this.filter(this.search(checkSessionStorage, this.state.term), this.state.filter);
    
    return (
      <div className="App">
          <div className="todo__wrapper">
            <div className="todo__header">
              <TodoHeader todo={numberOfTodo} done={numberOfDone}/>
            </div>
            <div className="todo__buttons">
              <TodoSearch todo={checkSessionStorage} onSearchChange={this.onSearchChange}/>
              <TodoStatusFilter onStatusChange={this.onStatusChange} filter={this.state.filter}/>
            </div>
            <TodoList 
            todos={visibleItems}
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
