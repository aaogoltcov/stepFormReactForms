import React, {Component} from "react";
import shortid from "shortid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class StepList extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    trashClickHandle = (e) => {
        e.preventDefault();
        this.props.funcTrash(e.target.closest('tr').querySelector('td.date').textContent);
    }

    editClickHandle = (e) => {
        e.preventDefault();
        this.props.funcEdit({
            date: e.target.closest('tr').querySelector('td.date').textContent,
            distance: e.target.closest('tr').querySelector('td.distance').textContent,
        })
    }

    focusOnHandle = (e) => {
        e.target.style.cursor = "pointer";
    }

    focusOffHandle = (e) => {
        e.target.style.cursor = "auto";
    }

    renderTable() {
        return this.props.steps.map(item =>
            <tr key={shortid.generate()}>
                <td className={"date"}>{item.date.toLocaleDateString()}</td>
                <td className={"distance"}>{item.distance.toString()}</td>
                <td>
                    <FontAwesomeIcon
                        className={"font"}
                        icon={faPenToSquare}
                        onClick={this.editClickHandle}
                        onMouseMove={this.focusOnHandle}
                        onMouseLeave={this.focusOffHandle}
                    />
                    <FontAwesomeIcon
                        className={"font"}
                        icon={faTrash}
                        onClick={this.trashClickHandle}
                        onMouseMove={this.focusOnHandle}
                        onMouseLeave={this.focusOffHandle}
                    />
                </td>
            </tr>
        )
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Дата</th>
                            <th scope="col">Дистанция</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        );
    }

}