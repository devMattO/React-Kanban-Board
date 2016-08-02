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
    this.handlePost = this.handlePost.bind(this);
    this.handlePut = this.handlePut.bind(this);
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

  handlePost(newCard) {
    var componentContext = this;
    const req = new XMLHttpRequest();
    req.addEventListener("load", function() {
      console.log(this.responseText);
      componentContext.loadData();
    });
    req.open("POST", "/test");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(newCard));
  }


  handlePut(editCard) {
    var componentContext = this;
    const req = new XMLHttpRequest();
    req.addEventListener("load", function() {
      console.log(this.responseText);
      componentContext.loadData();
    });
    req.open("PUT", `/test/${editCard._id}`);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(editCard));
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

  componentDidMount() {
    this.loadData();
  }

  render(){
    return(
      <div>
        <h1>Kanban Board</h1>
        <div className="kantainer">
          <KanbanColumns title='To-Do' data={this.state.todo} updateHandler={this.updateHandler} />
          <KanbanColumns title='Doing' data={this.state.doing} updateHandler={this.updateHandler} />
          <KanbanColumns title='Done' data={this.state.done} updateHandler={this.updateHandler} />
          <NewForm handlePost={this.handlePost} />
          <EditForm handlePut={this.handlePut} />
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

  handleDelete() {
    this.props.updateHandler(this.props.uniqueId);
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
        <button onClick={this.handleDelete}> Delete </button>
      </div>
    );
  };
};

class NewForm extends React.Component {

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
  }

  render() {
    return(
      <div className='newForm'>
        <form action='/test' onSubmit={this.handlePost} method='post'>
          <input className='textInput' onChange={this.handleInput} placeholder='Title' type='text' name='title' value={this.state.title} />

          <select className='selectInput' onChange={this.handleInput} placeholder='Status' value={this.state.status} name='status'>
            <option value='todo'>To-do</option>
            <option value='doing'>Doing</option>
            <option value='done'>Done</option>
          </select>

          <select className='selectInput' onChange={this.handleInput} placeholder='Priority' value={this.state.priority} name='priority'>
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

class EditForm extends React.Component {

  constructor(){
    super();
    this.state = {
      title: '',
      priority: '',
      assignedTo: '',
      createdBy: '',
      _id: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handlePut = this.handlePut.bind(this);
  }

  handlePut(event) {
    event.preventDefault()
    this.props.handlePut(this.state)
  }

  handleInput(event) {
    let newState = {}
    newState[event.target.name] = event.target.value;

    this.setState(newState);
  }

  render() {
    return(
      <div className='editForm'>
        <form action='/test' onSubmit={this.handlePut} method='get'>
          <input className='textInput' onChange={this.handleInput} placeholder='Title' type='text' name='title' value={this.state.title} />

          <input className='textInput' type='text' onChange={this.handleInput} placeholder='Created By' name='createdBy' value={this.state.createdBy}/>

          <input className='textInput' type='text' onChange={this.handleInput} placeholder='Assigned To' name='assignedTo' value={this.state.assignedTo} />

          <input className='textInput' type='text' onChange={this.handleInput} placeholder='ID' name='_id' value={this.state._id} />

          <select className='selectInput' onChange={this.handleInput} placeholder='Priority' value={this.state.priority} name='priority'>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>

          <input className='submitButton' type='submit' value='Click me' />
        </form>
      </div>
    )
  }
}


ReactDOM.render(
  <KanbanBox test='value'/>,
  document.getElementById('kanban-container')
);