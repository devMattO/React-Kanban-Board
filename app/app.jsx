import React from 'react';
import { Link } from 'react-router';
import KanbanBox from './kanban_board_lib/kanban_box.jsx';
import KanbanColumns from './kanban_board_lib/kanban_columns.jsx';
import KanbanItems from './kanban_board_lib/kanban_items.jsx';
import NewCard from './kanban_board_lib/kanban_new_card';

class App extends React.Component{
  render(){
    return(
      <div>
        <ul role='nav'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
        </ul>
        <KanbanBox />
      </div>

    )
  }
}

export default App;