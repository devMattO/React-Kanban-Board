'use strict';
import React from 'react';
import KanbanColumns from './kanban_columns.jsx';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import style from './kanban_box.scss';
import NewCard from './kanban_new_card.jsx';

class KanbanBox extends React.Component {
  constructor(){
    super();
    this.onPostData = this.onPostData.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }
  onPostData(data) {
    const parsedData = JSON.parse(data.currentTarget.response);

    const todo = parsedData.filter(function(element) {
      return element.status === 'todo';
    })
    const doing = parsedData.filter(function(element) {
      return element.status === 'doing';
    })
    const done = parsedData.filter(function(element) {
      return element.status === 'done';
    })
    this.props.setItems(
      {
        todo,
        doing,
        done
      }
    );
  }

  loadData(){
    const req = new XMLHttpRequest();
    req.addEventListener("load", this.onPostData);
    req.open("GET", "/test");
    req.send();
  }

  updateHandler(uniqueId,props,status){
    var that = this;
    const req = new XMLHttpRequest();
    req.addEventListener("load", function(){
      if(this.responseText){
        that.loadData();
      }

    });
    if(!status) {
      req.open("DELETE", `/test/${uniqueId}`);
      req.send();
    } else {
      req.open("PUT", `/test/${uniqueId}`);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify({
        "title": `${props.title}`,
        "priority": `${props.priority}`,
        "status": `${status}`,
        "createdBy": `${props.createdBy}`,
        "assignedTo": `${props.assignedTo}`
      }));
    }
  }

  handlePost(newCard) {
      var componentContext = this;
      const req = new XMLHttpRequest();
      req.addEventListener("load", function() {
        componentContext.loadData();
      });
      req.open("POST", "/test");
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify(newCard));
  }

  componentDidMount() {
      this.loadData();
  };

  render(){
    return(
      <div className="kanban">
        <h1>Kanban Board</h1>
        <div className="kantainer">
          <KanbanColumns title={'To-Do'} data={this.props.todo} updateHandler={this.updateHandler} />
          <KanbanColumns title={'Doing'} data={this.props.doing} updateHandler={this.updateHandler} />
          <KanbanColumns title={'Done'} data={this.props.done} updateHandler={this.updateHandler} />
          <NewCard handlePost={this.handlePost} />
        </div>
      </div>
    );
  };
};

const mapStateToProps = ( state, ownProps ) => {
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
    setItems: (data) => {
      dispatch({
        type: 'SET_ITEMS',
        data
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanBox);
