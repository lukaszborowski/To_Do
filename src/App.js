import React, { Component, useState } from "react";
import './App.css';
import "./styles.scss";

// Header

const Header = () => {
    return (
        <section className="header__section">
            <div className="header__container">
                <h1>Make a list of Your tasks</h1>
            </div>
        </section>
    )
}


// Formularz

const Form = () => {
    const [state, setState] = useState({
        value: "Sample Task text",
        day: "Day",
        month: "Month",
        year: "Year",
        time: "Hour:Minutes:Seconds",
    })

    const handleOnChange = (e) => {
        const date = new Date();
        const datefull = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            time: date.toLocaleTimeString(),
            value: e.target.value
        };

        setState({
            day: datefull.day,
            month: datefull.month,
            year: datefull.year,
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
}

// Szukanie zadań - lista zadań

const TaskList = () => {
    return (
        <>
            <section className="list__section">
                <header className="list__header">
                    <h2 className="list__title">
                        Task List:
                    </h2>
                    <form className="list__search__form">
                        <input type="search" id="todoSearch" className="list__search" placeholder="Search Task" />
                    </form>
                </header>
                <div className="list" id="todoList">
                </div>
            </section>

        </>
    )
}


// Zadania

const Task = () => {
    const [state, setState] = useState(JSON.parse(localStorage.getItem('Tasks')))

    const storageRemove = (index) => {
        let removeObj = JSON.parse(localStorage.getItem('Tasks'));
        removeObj.splice(index, 1);
        localStorage.setItem('Tasks', JSON.stringify(removeObj))
        setState(JSON.parse(localStorage.getItem("Tasks")))
    };

    return (
        <>
            <section className="task__list">
                {Boolean(state) && state.map((el, i) => (
                    <div key={i}><strong>Added at:</strong> {el.day}.{el.month}.{el.year} &#32; &nbsp; - {el.time}
                        <p><strong> Task description: </strong></p>
                        {el.value}
                        <button className="task__list__remove" onClick={() => storageRemove(i)}>Remove</button>
                    </div>
                ))}
            </section>
        </>
    )
}

// Wyświetlanie

const Flex = () => {
    return (
        <div className="flex__container">
            <div className="flex__container__left">
                <Header />
                <Form />
            </div>
            <div className="flex__container__right">
                <TaskList />
                <Task />
            </div>
        </div>
    )
}

class App extends Component {
    render() {
        return (
            <Flex />
        )
    }
}

export default App;
