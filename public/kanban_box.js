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
    this.setState({data: parsedData[8]});
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
        <h3>{this.state.data.title}</h3>
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
        <KanbanItem title={kanbanDataItem.data.title} priority={kanbanDataItem.data.priority} status={kanbanDataItem.data.status} createdBy={kanbanDataItem.data.createdBy} assignedTo={kanbanDataItem.data.assignedTo} key={kanbanDataItem.data.id} />
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

ReactDOM.render(
  <KanbanBox />,
  document.getElementById('kanban-container')
);