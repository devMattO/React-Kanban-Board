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
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    // this.loadData();
  }

  onDelete(){
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', (data) => {
      this.props.deleteItems(data);
    });
    oReq.open('DELETE', `/test/${this.props.uniqueId}`);
    oReq.send();
  }
  //   const arr = this.props.todo.filter((element, index) => {
  //     return index !== this.props.index;
  //   })
  //   this.props.setItems(arr);
  // }

  changeStatusUp() {
    if(this.props.status === 'todo'){
      //this.setState({status: 'doing'});
      this.props.status = 'doing';
    }else if(this.props.status === 'doing'){
      //this.setState({status: 'done'});
      this.props.status = 'done';
    }
    this.props.updateHandler(
      this.props.uniqueId,
      this.props,
      this.props.status
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
    }
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(KanbanItems);
