import logo from './logo.svg';
import './App.css';
import StepForm from './components/StepForm/StepForm';
import StepList from "./components/StepList/StepList";

function App() {
    const stepList = [
        {
            date: new Date(2021, 12, 30),
            distance: 8,
        },
        {
            date: new Date(2021, 12, 29),
            distance: 9,
        },
        {
            date: new Date(2021, 12, 28),
            distance: 7,
        },
    ];
    return (
        <>
            <StepForm steps={stepList}/>
        </>
    );
}

export default App;
