'use strict';
import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import style from './kanban_items.scss';

class KanbanItems extends React.Component {
  constructor(){
    super();
    this.changeStatusUp = this.changeStatusUp.bind(this);
    this.changeStatusDown = this.changeStatusDown.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
    this.onDelete = this.onDelete.bind();
  }

  componentDidMount() {
    this.props.setItems({
      title: this.props.title,
      priority: this.props.priority,
      status: this.props.status,
      assignedTo: this.props.assignedTo,
      createdBy: this.props.createdBy,
      uniqueId: this.props.uniqueId
    });
  }

  onDelete(){
    this.props.deleteItems(this.props.index);
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

  // handleDelete() {
  //   this.props.updateHandler(this.props.uniqueId);
  // }

  handleEdit() {
    flag = true;
  }

  render(){
    return(
      <div className={this.props.status}>
        <h3>{this.props.title}</h3>
        <p>Priority: {this.props.priority}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <p>Created By: {this.props.createdBy}</p>
        <button onClick={this.handleEdit}> Edit </button>
        <span>
          <button onClick={this.changeStatusDown}> &lt; </button>
          <button onClick={this.changeStatusUp}> &gt; </button>
        </span>
        <button onClick={this.onDelete}> Delete </button>
      </div>
    );
  };
};

const mapStateToProps = (state,ownProps) => {
  return{
    data: state.kanbanReducer.toJS()
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItems: (index) => {
      dispatch({
        type: 'DELETE_ITEMS',
        index
      });
    }
  };
};




export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(KanbanItems);
