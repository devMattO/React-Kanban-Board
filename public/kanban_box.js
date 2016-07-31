'use strict';

class KanbanBox extends React.Component {
  constructor(){
    super();
    this.state = {
      data: [],
      todo: [],
      doing: [],
      done: []
    };
    this.onPostData = this.onPostData.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  onPostData(data) {
    const parsedData = JSON.parse(data.currentTarget.response);
    this.setState({
      data: parsedData,
      todo: parsedData.filter((datuh)=>{
        return datuh.status === 'todo';
      }),
      doing: parsedData.filter((datuh)=>{
        return datuh.status === 'doing';
      }),
      done: parsedData.filter((datuh)=>{
        return datuh.status === 'done';
      })
    });
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

  componentDidMount() {
      this.loadData();
  };

  render(){
    return(
      <div>
        <h1>Kanban Board</h1>
        <div className="kantainer">
          <KanbanColumns title='To-Do' data={this.state.todo} updateHandler={this.updateHandler} />
          <KanbanColumns title='Doing' data={this.state.doing} updateHandler={this.updateHandler} />
          <KanbanColumns title='Done' data={this.state.done} updateHandler={this.updateHandler} />
        </div>
      </div>
    );
  };
};

KanbanBox.propTypes = {
  data: React.PropTypes.array
};

KanbanBox.defaultProps = {
  data: []
}

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

  changeStatusUp() {
    if(this.state.status === 'todo'){
      this.state.status = 'doing';
    }else if(this.state.status === 'doing'){
      this.state.status = 'done';
    }
    this.props.updateHandler(this.props.uniqueId,this.props,this.state.status);
  }

  changeStatusDown() {
    if(this.state.status === 'done'){
      this.state.status = 'doing';
    }else if(this.state.status === 'doing'){
      this.state.status = 'todo';
    }
    this.props.updateHandler(this.props.uniqueId,this.props,this.state.status);
  }

  render(){
    return(
      <div className={this.state.status}>
        <h3>{this.state.title}</h3>
        <p>Priority: {this.state.priority}</p>
        <p>Assigned To: {this.state.assignedTo}</p>
        <p>Created By: {this.state.createdBy}</p>
        <span>
          <button onClick={this.changeStatusDown}> &lt; </button>
          <button onClick={this.changeStatusUp}> &gt; </button>
        </span>
      </div>
    );
  };
};

ReactDOM.render(
  <KanbanBox />,
  document.getElementById('kanban-container')
);