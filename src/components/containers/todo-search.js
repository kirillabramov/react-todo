import React, { Component } from 'react';

export default class TodoSearch extends Component{



    handleSearch = (e) => {
        this.props.todo.map((item) => {
            console.log(item.text === e.target.value);
            return item.text === e.target.value;
        });
        console.log(this.props.todo);
        console.log(e.target.value);
    }

    render(){
        return(
            <input 
            onChange={this.handleSearch}
            placeholder='search' 
            className="todo__search"/>
      );
    }
}
