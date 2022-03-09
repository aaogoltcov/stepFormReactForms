import {Component} from "react";
import StepList from "../StepList/StepList";
import StepModal from "../StepModal/StepModal";

Date.prototype.toLocaleDateStringTransverse = function() {
    let mm = this.getMonth() + 1;
    let dd = this.getDate();

    return [this.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join('-');
};

String.prototype.toLocaleDateFromString = function() {
    const parseDate = this.split("-").map(e => parseInt(e));
    return new Date(parseDate[0], parseDate[1]-1, parseDate[2]);
};

String.prototype.toLocaleDateWithSlash = function() {
    const parseDate = this.split("/").map(e => parseInt(e));
    return new Date(parseDate[2], parseDate[1]-1, parseDate[0]);
};

export default class StepForm extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            date: new Date(2021, 12, 28).toLocaleDateStringTransverse(),
            distance: 0,
            steps: this.props.steps,
            edit: false,
        }
    }

    changeHandle = (e) => {
        let value = e.target.value;
        this.setState(value.length > 3 ? {date: value} : {distance: parseInt(value)});
    }

    updateStepsState(steps) {
        this.setState({steps: steps.sort(function(a,b){ return new Date(b.date) - new Date(a.date)})});
    }

    submitHandle = (e) => {
        e.preventDefault();
        let steps = this.state.steps;
        for (let step of steps) {
            if (step.date.toLocaleDateStringTransverse() === this.state.date) {
                step.distance += this.state.distance;
                this.updateStepsState(steps);
                return;
            }
        }
        steps.push({
            date: this.state.date.toLocaleDateFromString(),
            distance: this.state.distance,
        });
        this.updateStepsState(steps);
    }

    changeItemHandle = (newStep) => {
        let steps = this.state.steps;
        for (let step of steps) {
            if (step.date.toLocaleDateStringTransverse() ===
                this.state.edit.date.toLocaleDateWithSlash().toLocaleDateStringTransverse()) {
                step.date = newStep.date.toLocaleDateFromString();
                step.distance = newStep.distance;
            }
        }
        this.updateStepsState(steps);
    }

    deleteStep = date => {
        let steps = [];
        for (let step of this.state.steps) {
            if (step.date.toLocaleDateString() !== date.toLocaleDateWithSlash().toLocaleDateString()) {
                steps.push(step);
            }
        }
        this.updateStepsState(steps);
    }

    editStep = step => {
        this.setState({edit: step});
    }

    render() {
        return (
            <>
                <form className="form-inline" onSubmit={this.submitHandle}>
                    <label className="sr-only" htmlFor="inlineFormInputName1">Дата</label>
                    <input type="date"
                           className="form-control mb-2 mr-sm-2"
                           id="inlineFormInputName1"
                           value={this.state.date}
                           min="2021-01-01"
                           max="2022-12-31"
                           onChange={this.changeHandle}
                           required={true}
                           pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                    />

                    <label className="sr-only" htmlFor="inlineFormInputName2">Дата</label>
                    <input type="number"
                           className="form-control mb-2 mr-sm-2"
                           id="inlineFormInputName2"
                           placeholder={this.state.distance}
                           min="0"
                           max="100"
                           step={1}
                           onChange={this.changeHandle}
                           required={true}
                    />

                    <button type="submit" className="btn btn-primary mb-2">Сохранить</button>
                </form>
                <StepList
                    steps={this.state.steps}
                    funcTrash={this.deleteStep}
                    funcEdit={this.editStep}
                />
                <StepModal
                    edit={this.state.edit}
                    funcEdit={this.editStep}
                    funcChange={this.changeItemHandle}
                />
            </>

        );
    }

}