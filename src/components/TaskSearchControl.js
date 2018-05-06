import React, { Component } from 'react';

class TaskSearchControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    onChange = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }
    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }
    render() {
        var { keyword } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input
                        name="keyword"
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa..."
                        value={keyword}
                        onChange={this.onChange}
                    />
                    <span className="input-group-btn">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onSearch}
                            >
                            <span className="fa fa-search mr-5"
                               
                            >
                            </span>Tìm
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

export default TaskSearchControl;
