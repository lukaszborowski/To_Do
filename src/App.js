import React, {Component, useState } from "react";
import './App.css';
import "./styles.scss";


class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {


    return (
         <div className="date">
             <h1>
                 <span>Today is:</span> { new Date().toDateString() } - {this.state.date.toLocaleTimeString()}
             </h1>
         </div>
     );

 }};



// Header

const Header = () => {
    return (
        <section className="header__section">
            <div className="header__container">
                <h2>Make a list of Your tasks</h2>
            </div>
        </section>
    )
};

// Formularz

const Form = () => {

    const [state, setState] = useState({
        value: "Sample Task text",
        day: "Day",
        time: "Hour:Minutes:Seconds",
    });



    const handleOnChange = (e) => {
        const date = new Date();
        const datefull = {
            day: date.toDateString(),
            time: date.toLocaleTimeString(),
            value: e.target.value
        };

        setState({
            day: datefull.day,
            time: datefull.time,
            value: datefull.value
        })
    };

        const storageAdd = (e) => {
            if (!Boolean(localStorage.getItem("Tasks"))) {
                localStorage.setItem("Tasks", JSON.stringify([{...state}]))
            } else {
                let localStrObject = JSON.parse(localStorage.getItem("Tasks"));
                localStrObject.push({...state});

                localStorage.setItem("Tasks", JSON.stringify(localStrObject));
            }
        };

        return (
            <section className="form__section">
                <form className="form" id="todoForm" onSubmit={(e) => storageAdd(e)}>
                    <div className="form__row">
                        <label className="form__label" htmlFor="todoMessage">To Do
                            <textarea
                                className="form__message"
                                name="todoMessage"
                                id="todoMessage"
                                placeholder="Write Your Task"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </label>
                    </div>
                    <div className="form__row">
                        <button type="submit" className="button form__button">Add to List</button>
                    </div>
                </form>
            </section>
        )
    };


// Zadania

const Task = () => {
    const [state, setState] = useState(JSON.parse(localStorage.getItem('Tasks')));
    const storageRemove = (index) => {
        let removeObj = JSON.parse(localStorage.getItem('Tasks'));
        removeObj.splice(index, 1);
        localStorage.setItem('Tasks', JSON.stringify(removeObj));
        setState(JSON.parse(localStorage.getItem("Tasks")))
    };

    const removeAll = () => {

        const remove = prompt('Do You Really want remove all Tasks?', "No");
        if (remove === 'Yes' || remove === 'yes' || remove === 'YES' || remove === 'YEs' || remove === 'yES' || remove === 'yeS') {
            localStorage.clear();
            setState(JSON.parse(localStorage.getItem("Tasks")));

        }
    };


    return (
        <>
            <div className="remove__tasks">
                <button onClick={() => removeAll()}>Clear All Tasks</button>
            </div>
            <section className="list__section">
                <header className="list__header">
                    <h2 className="list__title">
                        Task List:
                    </h2>

                </header>

            </section>
            <section className="task__list">
                {Boolean(state) && state.map((el, i) => (
                    <div key={i}>
                        <strong> Task Description: </strong>
                        <p> <strong className="task__list__description"> {el.value} </strong></p>
                        <strong>Added at:</strong> <span> {el.day}  &#32;
                            &nbsp; - {el.time}  </span>

                        <button className="task__list__remove" onClick={() => storageRemove()}>Remove</button>
                    </div>
                ))}
            </section>
        </>
    )
};


// Wyświetlanie

const Flex = () => {
    return (
        <>
            <Clock />
            <div className="flex__container">
                <div className="flex__container__left">
                    <Header />
                    <Form />
                </div>
                <div className="flex__container__right">
                    <Task />
                </div>
            </div>
        </>
    )
};


class App extends Component {

    render() {
        return (
            <Flex />
        )
    }

}

export default App;