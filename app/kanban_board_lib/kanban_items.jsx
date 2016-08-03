'use strict';
import React from 'react';
import style from './kanban_items.scss';

class KanbanItems extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
      priority: '',
      status: '',
      assignedTo: '',
      createdBy: '',
      id: ''
    }
    this.changeStatusUp = this.changeStatusUp.bind(this);
    this.changeStatusDown = this.changeStatusDown.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.setState({
      title: this.props.title,
      priority: this.props.priority,
      status: this.props.status,
      assignedTo: this.props.assignedTo,
      createdBy: this.props.createdBy,
      uniqueId: this.props.uniqueId
    });
  }
  //how come this works and set state makes you click the button twice?
  changeStatusUp() {
    if(this.state.status === 'todo'){
      //this.setState({status: 'doing'});
      this.state.status = 'doing';
    }else if(this.state.status === 'doing'){
      //this.setState({status: 'done'});
      this.state.status = 'done';
    }
    this.props.updateHandler(
      this.props.uniqueId,
      this.props,
      this.state.status
    );
  }

  changeStatusDown() {
    if(this.state.status === 'done'){
      //this.setState({status: 'doing'});
      this.state.status = 'doing';
    }else if(this.state.status === 'doing'){
      //this.setState({status: 'todo'});
      this.state.status = 'todo';
    }
    this.props.updateHandler(
      this.props.uniqueId,
      this.props,
      this.state.status
    );
  }

  handleDelete() {
    this.props.updateHandler(this.props.uniqueId);
  }

  handleEdit() {

  }

  render(){
    return(
      <div className={this.state.status}>
        <h3>{this.state.title}</h3>
        <p>Priority: {this.state.priority}</p>
        <p>Assigned To: {this.state.assignedTo}</p>
        <p>Created By: {this.state.createdBy}</p>
        <button onClick={this.handleEdit}> Edit </button>
        <span>
          <button onClick={this.changeStatusDown}> &lt; </button>
          <button onClick={this.changeStatusUp}> &gt; </button>
        </span>
        <button onClick={this.handleDelete}> Delete </button>
      </div>
    );
  };
};

export default KanbanItems;
