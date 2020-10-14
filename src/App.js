import React, {Component} from "react";
import './App.css';
import "./styles.scss";

// Header

class Header extends Component {
    render() {
        return (
            <section className="header__section">
                <div className="header__container">
                    <h1>Make a list of Your tasks</h1>
                </div>
            </section>

        )
    }
}


// Formularz

class Form extends Component {


        state = {
            value: "Sample Task text",
            day: "Day",
            month: "Month",
            year: "Year",
            time: "Hour:Minutes:Seconds",

        };


    handleOnChange = (e) => {
        const date = new Date();
        const datefull = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            time: date.toLocaleTimeString(),
            value: e.target.value

    };

        this.setState({
            day: datefull.day,
            month: datefull.month,
            year: datefull.year,
            time: datefull.time,
            value: datefull.value

        })
    };


    storageAdd = () => {


        if (localStorage.getItem("Tasks") === null || localStorage.getItem("Tasks") === "" || localStorage.getItem("Tasks") === undefined) {
            localStorage.setItem("Tasks", JSON.stringify([{
                day: this.state.day,
                month: this.state.month,
                year: this.state.year,
                time: this.state.time,
                value: this.state.value
            }]))
        } else {

            let localStrObject = JSON.parse(localStorage.getItem("Tasks"));
            localStrObject.push({
                day: this.state.day,
                month: this.state.month,
                year: this.state.year,
                time: this.state.time,
                value: this.state.value
            });

            localStorage.setItem("Tasks", JSON.stringify(localStrObject));
        }};


    render() {
        return (
            <section className="form__section">
                <form  className="form" id="todoForm">
                    <div className="form__row">
                        <label className="form__label" htmlFor="todoMessage">To Do
                        <textarea className="form__message" name="todoMessage" id="todoMessage" placeholder="Write Your Task" onChange={this.handleOnChange}/>
                    </label>
                    </div>
                    <div className="form__row">
                        <button type="submit" className="button form__button" onClick={this.storageAdd}>Add to List</button>
                    </div>
                </form>
            </section>
        )
    }
}

// Szukanie zadań - lista zadań

class TaskList extends Component {
    render() {
        return (
            <section className="list__section">
                <header className="list__header">
                    <h2 className="list__title">
                        Task List:
                    </h2>
                    <form className="list__search__form">
                        <input type="search" id="todoSearch" className="list__search" placeholder="Search Task"/>
                    </form>
                </header>

                <div className="list" id="todoList">

                </div>
            </section>
        )
    }
}


// Zadania

class Task extends Component {


    storageRemove = () => {
        let removeObj = JSON.parse(localStorage.getItem('Tasks'));
        removeObj.splice(this.index, 1);
        localStorage.setItem('Tasks', JSON.stringify(removeObj))
    };


    render() {
        return (
            <>
                <section className="task__list">
                    {JSON.parse(localStorage.getItem("Tasks")).map((el, i) => {
                        return <div key={i}><strong>Added at:</strong> {el.day}.{el.month}.{el.year} &#32;
                            &nbsp; - {el.time}
                            <p><strong> Task description: </strong></p>
                            {el.value}
                            <button className="task__list__remove" onClick={this.storageRemove}>Remove</button>
                        </div>

                    })}

                </section>
            </>
        )
    }

}

// Wyświetlanie


class Flex extends Component {
    render() {
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
}

class App extends Component {

    render() {
        return (
           <Flex />
        )
    }

}

export default App;

