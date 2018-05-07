import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDelete = () => {
        this.props.onDelete(this.props.task.id);
        // dispatch(actions.deleteTask
        this.props.onCloseForm();
    }
    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }
    showStatusElement() {
        return (
            <span className={this.props.task.status ? "label label-danger" : "label label-success"}
                onClick={this.onUpdateStatus}
            >
                {this.props.task.status ? 'Kích hoạt' : 'Ẩn'}
            </span>
        )
    }
    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    {this.showStatusElement()}

                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                        <span className="fa fa-pencil mr-5"></span> Sửa
                    </button>&nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-5"></span> Xóa
                    </button>
                </td>
            </tr>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id))
        },
        onDelete: (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
