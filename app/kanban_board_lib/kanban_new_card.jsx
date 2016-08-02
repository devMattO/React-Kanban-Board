'use strict';
import React from 'react';
import KanbanBox from './kanban_box.jsx';
import KanbanColumns from './kanban_columns.jsx';
import KanbanItems from './kanban_items.jsx';

class NewCard extends React.Component {

  constructor(){
    super();
    this.state = {
      title: '',
      status: '',
      priority: '',
      createdBy: '',
      assignedTo: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handlePost(event) {
    event.preventDefault()
    this.props.handlePost(this.state)
  }

  handleInput(event) {
    let newState = {}
    newState[event.target.name] = event.target.value;

    this.setState(newState);
    console.log(newState,'<----newState');
  }
// <option value='status'>Status:</option>
  render() {
    return(
      <div className='newCard'>
        <form action='/test' onSubmit={this.handlePost} method='post'>
          <input className='textInput' onChange={this.handleInput} placeholder='Title' type='text' name='title' value={this.state.title} />

          <select className='selectInput' onChange={this.handleInput} placeholder='Status' value={this.state.status} name='status'>
            <option value='status' selected> </option>
            <option value='todo'>To-do</option>
            <option value='doing'>Doing</option>
            <option value='done'>Done</option>
          </select>

          <select className='selectInput' onChange={this.handleInput} placeholder='Priority' value={this.state.priority} name='priority'>
            <option value='status' selected> </option>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>

          <input className='textInput' type='text' onChange={this.handleInput} placeholder='Created By' name='createdBy' value={this.state.createdBy}/>

          <input className='textInput' type='text' onChange={this.handleInput} placeholder='Assigned To' name='assignedTo' value={this.state.assignedTo} />

          <input className='submitButton' type='submit' value='Click me' />
        </form>
      </div>
    )
  }
}

export default NewCard;