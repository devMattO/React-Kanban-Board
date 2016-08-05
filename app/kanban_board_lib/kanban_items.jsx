'use strict';
import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import style from './kanban_items.scss';

class KanbanItems extends React.Component {
  constructor(){
    super();
    this.changeStatusUp = this.changeStatusUp.bind(this);
    // this.changeStatusDown = this.changeStatusDown.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {

  }

  // changeStatusDown(){
  //   var downReq = new XMLHttpRequest;
  // }

  changeStatusUp(){
    let newStatus;

    if(this.props.status === 'todo'){
      newStatus = 'doing';
    } else if(this.props.status === 'doing'){
      newStatus = 'done';
    }

    var upReq = new XMLHttpRequest;
    upReq.addEventListener('load', (data) => {
      const parsedResponse = JSON.parse(data.target.response);
      if(parsedResponse) {
        this.props.moveRight(newStatus, this.props)
      }
    });
    upReq.open('PUT', `/test/${this.props.uniqueId}`)
    upReq.setRequestHeader("Content-Type", "application/json");
    upReq.send(JSON.stringify({
      "title": `${this.props.title}`,
      "priority": `${this.props.priority}`,
      "status": `${newStatus}`,
      "createdBy": `${this.props.createdBy}`,
      "assignedTo": `${this.props.assignedTo}`
    }));
  }

  onDelete(){
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', (data) => {
      const parsedResponse = JSON.parse(data.target.response);
      if(parsedResponse) {
        this.props.deleteItems(this.props);
      }
    });
    oReq.open('DELETE', `/test/${this.props.uniqueId}`);
    oReq.send();
  }

  render(){
    return(
      <div className={this.props.status}>
        <h3>{this.props.title}</h3>
        <p>Priority: {this.props.priority}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <p>Created By: {this.props.createdBy}</p>
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
  const todo = state.kanbanReducer.toJS().todo;
  const doing = state.kanbanReducer.toJS().doing;
  const done = state.kanbanReducer.toJS().done;

  return {
    todo,
    doing,
    done
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItems: (data) => {
      dispatch({
        type: 'DELETE_ITEMS',
        data
      });
    },
    moveRight: (newStatus, data) => {
      dispatch({
        type: 'MOVE_RIGHT',
        newStatus,
        data
      });
    }
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(KanbanItems);
