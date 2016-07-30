'use strict';

class KanbanBox extends React.Component {
  constructor(){
    super();
    this.state = {
      data: []
    };
    this.onPostData = this.onPostData.bind(this);
  }

  onPostData(data) {
    const parsedData = JSON.parse(data.currentTarget.response);
    console.log(parsedData,'<----parsedData');
    this.setState({data: parsedData});
  }

  loadData(){
    const req = new XMLHttpRequest();
    req.addEventListener("load", this.onPostData);
    req.open("GET", "/test");
    req.send();
  }

  componentDidMount() {
      this.loadData();
  };

  render(){
    return(
      <div>
        <h1>Kanban Box</h1>
        <KanbanPosts data={this.state.data} />
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

class KanbanPosts extends React.Component {
  render(){
    console.log(this.props.data,'<----this.props.data');
    var kanbanListNode = this.props.data.map(function(kanbanDataItem){
      return(
        <KanbanItems title={kanbanDataItem.title} priority={kanbanDataItem.priority} status={kanbanDataItem.status} createdBy={kanbanDataItem.createdBy} assignedTo={kanbanDataItem.assignedTo} key={kanbanDataItem._id} />
      )
    });
    return(
      <div>
        <h2>Kanban Posts</h2>
        { kanbanListNode }
      </div>
    );
  };
};

class KanbanItems extends React.Component {
  render(){
  console.log(this.props,'<----this.props');
    return(
      <div>
        <h3>{this.props.title}</h3>
        <p>Priority: {this.props.priority}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <p>Created By: {this.props.createdBy}</p>
      </div>
    );
  };
};

ReactDOM.render(
  <KanbanBox />,
  document.getElementById('kanban-container')
);