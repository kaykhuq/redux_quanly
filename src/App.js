import React, { Component } from 'react';
import './App.css';

import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import randomstring from 'randomstring';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
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

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"))
      this.setState({
        tasks: tasks
      })
    }
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        taskEditing: null
      });
    } else {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditing: null
    })
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === '') {
      data.id = randomstring.generate();
      tasks.push(data);
    }
    else {
      var index=this.findIndex(data.id);
      // var index = _.findIndex(tasks, (task) => {
      //   return task.id === data.id
      // });
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    // var index = _.findIndex(tasks, (task) => {
    //   return task.id === id;
    // })
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(tasks));
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
  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    // var index = _.findIndex(tasks, (task) => {
    //   return task.id === id;
    // });
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      })
      // localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
    console.log(index);
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    // var index = _.findIndex(tasks, (task) => {
    //   return task.id === id;
    // });

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
    var { tasks, isDisplayForm, taskEditing, filters, keyword, sortBy, sortValue } = this.state;
    if (filters) {
      if (filters.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filters.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filters.status === -1) {
          return task;
        } else {
          return task.status === (filters.status === 1 ? true : false)
        }
      })
    }
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });

    }

    // tasks = _.filter(tasks, (task) => {
    //   return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    // });

    if (sortBy === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        return 0;
      });
    }
    else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sortValue;
        else if (a.status < b.status) return sortValue;
        return 0;
      });
    }
    var elemTaskForm = isDisplayForm ?
      <TaskForm
        onCloseForm={this.onCloseForm}
        onSubmit={this.onSubmit}
        task={taskEditing}
      />
      : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản lý công việc</h1><br />
        </div>
        <div className="row">
          {/* Form */}
          {elemTaskForm}

          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
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
              tasks={tasks}
              onUpdateStatus={this.onUpdateStatus}
              onDelete={this.onDelete}
              onUpdate={this.onUpdate}
              onFilter={this.onFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;