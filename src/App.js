import React, { Component } from 'react';
import './App.css';

import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskEditing: null,
      filters: {
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: '',
      sortValue: ''

    }
  }

  findIndex = (id) => {
    var result = -1;
    var { tasks } = this.state;
    tasks.forEach((task, index) => {
      if (task.id === id)
        result = index;
    })
    return result;
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filters: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    })
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })
  }

  render() {
    var { taskEditing, filters, keyword, sortBy, sortValue } = this.state;
    var { isDisplayForm } = this.props;
    // if (filters) {
    //   if (filters.name) {
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filters.name) !== -1;
    //     });
    //   }
    //   tasks = tasks.filter((task) => {
    //     if (filters.status === -1) {
    //       return task;
    //     } else {
    //       return task.status === (filters.status === 1 ? true : false)
    //     }
    //   })
    // }
    // if (keyword) {
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   });

    // }


    // if (sortBy === "name") {
    //   tasks.sort((a, b) => {
    //     if (a.name > b.name) return sortValue;
    //     else if (a.name < b.name) return -sortValue;
    //     return 0;
    //   });
    // }
    // else {
    //   tasks.sort((a, b) => {
    //     if (a.status > b.status) return -sortValue;
    //     else if (a.status < b.status) return sortValue;
    //     return 0;
    //   });
    // }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản lý công việc</h1><br />
        </div>
        <div className="row">
          {/* Form */}
          <TaskForm task={taskEditing} />

          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.props.onToggleForm}>
              <span className="fa fa-plus mr-5"></span>Thêm công việc
                        </button>
            {/* Search & sort */}
            <TaskControl
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />

            {/* List */}
            <TaskList
              // tasks={tasks}
              onFilter={this.onFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm())
    },
    onCloseForm: () => {
      dispatch(actions.closeForm())
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);