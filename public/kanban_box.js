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
    // console.log(parsedData,'<----parsedData');
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

  updateHandler(uniqueId,props,status){ //put req //if successful call load//else nada
    console.log(uniqueId);
console.log(props,'<----just props');
    var that = this;
    const req = new XMLHttpRequest();
    req.addEventListener("load", function(){
      console.log(this,'<----this');
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
  console.log(this.state.done,'<----this.state.done');
    return(
      <div>
        <h1>Kanban Box</h1>
        <KanbanColumns title='To-Do' data={this.state.todo} updateHandler={this.updateHandler} />
        <KanbanColumns title='Doing' data={this.state.doing} updateHandler={this.updateHandler} />
        <KanbanColumns title='Done' data={this.state.done} updateHandler={this.updateHandler} />
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
      <div>
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
    this.changeStatus = this.changeStatus.bind(this);
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
  changeStatus() {
    console.log(this.state.status, 'before if statement'); //figure out who this is && update status
    console.log(this.state.title);
    console.log(this.props.updateHandler)
    //if
    if(this.state.status === 'todo'){
      this.state.status = 'doing';
    }else if(this.state.status === 'doing'){
      this.state.status = 'done';
    }
    console.log(this.state.status, 'after if statement');
    this.props.updateHandler(this.props.uniqueId,this.props,this.state.status);

  }
  render(){
    return(
      <div>
        <h3>{this.state.title}</h3>
        <p>Priority: {this.state.priority}</p>
        <p>Assigned To: {this.state.assignedTo}</p>
        <p>Created By: {this.state.createdBy}</p>
        <button onClick={this.changeStatus}> &gt; </button>
      </div>
    );
  };
};

ReactDOM.render(
  <KanbanBox />,
  document.getElementById('kanban-container')
);