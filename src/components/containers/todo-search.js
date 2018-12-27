import React, { Component } from 'react';

export default class TodoSearch extends Component{

    state = {
        term: ''
    }

    onSearchChange = (e) => {
        let term = e.target.value;
        this.setState({ term });
        this.props.onSearchChange(term.trim().toLowerCase());
    };

    render(){
        return(
            <input 
            onChange={this.onSearchChange}
            placeholder='search' 
            className="todo__search"
            value={this.state.term}/>
      );
    }
}
