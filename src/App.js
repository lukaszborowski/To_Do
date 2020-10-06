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
    render() {
        return (
            <section className="form__section">
                <form className="form" id="todoForm">
                    <div className="form__row">
                        <label className="form__label" htmlFor="todoMessage">To Do</label>
                        <textarea className="form__message" name="todoMessage" id="todoMessage" placeholder="Write Your task" />
                    </div>
                    <div className="form__row">
                        <button type="submit" className="button form__button">Add to List</button>
                    </div>
                </form>
            </section>
        )
    }
}

// Lista zadań

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

