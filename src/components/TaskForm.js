import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    componentWillMount() {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.task !== null) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        } else if (!nextProps.task) {
            this.setState({
                id: '',
                name: '',
                status: false
            })
            // console.log("them");
        }
        // console.log(nextProps);
    }
   
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAddTask(this.state); // len store de them vao
        // cancel and close form
        this.onClear();
        this.props.onCloseForm();
    }
    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }
    render() {
        var { id } = this.state;
        return (
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            {id ? "Cập nhật" : "Thêm"} công việc
                                    <span
                                className="fa fa-times-circle text-right" onClick={this.props.onCloseForm}>
                            </span>
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Tên:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <label>Trạng thái:</label>
                            <select
                                name="status"
                                className="form-control"
                                value={this.state.status}
                                onChange={this.onChange}
                            >
                                <option value={true}>Kích hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select><br /><br />

                            <div className="text-center">
                                <button type="submit" className="btn btn-warning" >
                                    <span className="fa fa-close mr-5"></span>Lưu lại
                                </button>&nbsp;
                                <button type="button"
                                    className="btn btn-danger"
                                    onClick={this.onClear}
                                >
                                    <span className="fa fa-close mr-5"></span>Hủy bỏ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask: (task) => {
            dispatch(actions.addTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
