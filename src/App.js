import React, {Component} from "react";
import './App.css';
import "./styles.scss";


// Dodawanie taska

document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.querySelector('#todoList');
    const todoForm = document.querySelector('#todoForm');
    const todoSearch = document.querySelector('#todoSearch');
    const todoTextarea = todoForm.querySelector('textarea');

    function addTask(text) {
      const element = React.cloneElement(Task);



        //tworzę datę
        const date = new Date();
        const dateText = date.getFullYear();
        document.querySelector(".task__date").innerText = dateText;

        //wstawiam tekst
        document.querySelector(".task__text").innerText = text;

        //i wrzucam element do listy
        todoList.append(element);
    }

    todoForm.addEventListener('submit', e => {
        e.preventDefault();

        if (todoTextarea.value !== '') {
            addTask(todoTextarea.value);
            todoTextarea.value = '';
        }
    });

    todoList.addEventListener("click", e => {
        if (e.target.classList.contains("task__delete")) {
            e.target.closest(".task").remove();
        }
    });

    todoSearch.addEventListener("input", () => {
        const val = todoSearch.value;
        const elems = todoList.querySelectorAll(".task");

        for (const el of elems) {
            const text = el.querySelector(".task__text").innerText;

            if (text.includes(val)) {
                el.style.setProperty("display", "");
            } else {
                el.style.setProperty("display", "none");
            }
        }
    });
});


// task element

class TaskElement extends Component {
    render() {
        return (
            <>
                <div className="element-bar">
                    <h3 className="element-date"/>
                    <button className="element-delete" title="Delete Task">
                        Usuń
                    </button>
                </div>
                <div className="element-text">
                </div>
            </>

        )
    }
}


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


// Zadanie

class Task extends Component {
    render() {
        return (
            <div className="task">
                <div className="task__bar">
                    <h3 className="task__date">20-10-2016 godz. 16:32</h3>
                    <button className="task__delete" title="Delete task">
                        Usuń
                    </button>
                </div>
                <div className="task__text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio laudantium quasi blanditiis
                    enim molestias explicabo id totam veniam corporis maiores.
                </div>
            </div>
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

