import {Component} from "react";

String.prototype.toDashFromSlash = function() {
    const parseDate = this.split("/").map(e => parseInt(e));
    let yyyy = parseDate[2];
    let mm = parseDate[1];
    let dd = parseDate[0];
    return [yyyy,
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join('-');
};

export default class StepModal extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            modal: this.props.edit ? "modal fade show" : "modal fade",
            date: false,
            distance: false,
        }
    }

    getPropsDate = () => {
        return this.state.date ?
            this.state.date :
            this.props.edit ?
                this.props.edit.date.toDashFromSlash() :
                "today";
    }

    getPropsDistance = () => {
        return this.state.date ?
            this.state.date :
            this.props.edit ?
                this.props.edit.distance.toString() :
                "09";
    }

    changeHandle = (e) => {
        let value = e.target.value;
        this.setState(value.length > 3 ?
            {
                date: value,
                distance: this.props.edit.distance,
            } :
            {
                date: this.props.edit.date.toDashFromSlash(),
                distance: parseInt(value),
            });
    }

    handleCloseModal = () => {
        this.props.funcEdit(false);
    }

    submitHandle = (e) => {
        e.preventDefault();
        this.props.funcChange({
            date: this.state.date,
            distance: this.state.distance,
        });
        this.setState({
            date: false,
            distance: false,
        });
        this.props.funcEdit(false);
    }

    render() {
        return (
            <div className={this.props.edit ? "modal fade show" : "modal fade"}
                 id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true"
                 style={this.props.edit ? {display: "block"} : {display: "none"}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Редактирование</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.handleCloseModal}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="date" className="col-form-label">Дата:</label>
                                    <input  type="date"
                                            className="form-control"
                                            id="date"
                                            value={this.getPropsDate()}
                                            min="2021-01-01"
                                            max="2022-12-31"
                                            required={true}
                                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                            onChange={this.changeHandle}
                                    />
                                    <label htmlFor="distance" className="col-form-label">Дистанция:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="distance"
                                        placeholder={this.getPropsDistance()}
                                        min="0"
                                        max="100"
                                        step={1}
                                        required={true}
                                        onChange={this.changeHandle}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={this.handleCloseModal}
                            >Закрыть</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.submitHandle}
                            >Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}