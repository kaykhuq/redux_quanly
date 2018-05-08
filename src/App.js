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
      sortBy: '',
      sortValue: ''
    }
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })
  }

  onToggleForm = () => {
    var { itemEditing } = this.props;
    if (itemEditing && itemEditing.id !== '') {
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: '',
      name: '',
      status: false
    });
  }

  render() {
    var { sortBy, sortValue } = this.state;
    var { isDisplayForm } = this.props;



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
          <TaskForm />

          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5"></span>Thêm công việc
                        </button>
            {/* Search & sort */}
            <TaskControl
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />

            {/* List */}
            <TaskList />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing
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
    onClearTask: (task) => {
      dispatch(actions.editTask(task))
    },
    onOpenForm: () => {
      dispatch(actions.openForm())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);