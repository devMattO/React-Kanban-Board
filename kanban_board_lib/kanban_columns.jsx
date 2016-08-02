'use strict';
import React from 'react';
import KanbanItems from './kanban_items.jsx';
import style from './kanban_columns.scss';

class KanbanColumns extends React.Component {
  render(){
    var that = this;
    var kanbanListNode = this.props.data.map(function(kanbanDataItem){
      return(
        <KanbanItems
          title={kanbanDataItem.title}
          priority={kanbanDataItem.priority}
          status={kanbanDataItem.status}
          createdBy={kanbanDataItem.createdBy}
          assignedTo={kanbanDataItem.assignedTo}
          key={kanbanDataItem._id}
          uniqueId={kanbanDataItem._id}
          updateHandler={that.props.updateHandler}
        />
      )
    });
    return(
      <div className={this.props.status}>
        <h2>{this.props.title}</h2>
        { kanbanListNode }
      </div>
    );
  };
};

export default KanbanColumns;