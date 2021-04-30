/*

  ------ GETTING STARTED ------

  In order to begin this challenge, you must first:
   - Signup for a Codepen account and log in.
   - Fork this pen to create a personal copy of the challenge by clicking the "Fork" button at the bottom of the browser window.
   
  
  ----- SUBMISSION INSTRUCTIONS -----
  
  To submit your work:
   - Make sure to save your work by clicking the "Save" button at the top of the browser window.
   - Email the URL of your forked pen to talent@ender.com


   --------- THE CHALLENGE ---------
  
  Build a todo list application.
  
  1. Display completed and unfinished todos in separate lists.
  
  2. Clicking on a todo item should toggle its completed status.
  
  3. Clicking on the "X" button of a todo item should remove that todo entirely.
  
  4. The todo form should be able to create a new todo and add it to the list of todos.
  
  5. Use the SCSS panel to match the styles from this example:
     https://ender-public-dev.s3.us-east-2.amazonaws.com/files/ad94e4e0e1fb41c4b517b2971902bf35

*/

import React from "react";
//import ReactDOM from "https://cdn.skypack.dev/react-dom@v17.0.1";
import {v4 as uuidv4} from 'uuid';
import './App.css';
// use "generateId()" function to create a unique id
//const generateId = uuidv4();

function TodoForm(props) {
  return (
    <form className="create-todo-form" onSubmit = {props.createTodo}>
      <h2>Create a New Todo</h2>
      <input
        name="todo-name"
        id="todoName"
        type="text"
        placeholder="Enter todo description"
        value = {props.val}
        autoComplete="off"
        onChange = {props.handleInput}
      />
      <div className = "create-todo-submit"><button className="submit-btn" type="submit">
        Create Todo
      </button></div>
    </form>
  );
}

function TodoListItem(props) {  //button font
  const items = props.todos;
  const { name, id } = items;
  // toggle item's completed status on name click.
  // delete item on "X" click.

  return (
    <div className="todo-list__item">
      <span onClick = {() => props.toggleTodo(id)}>{name}</span>
      <button className = "todo-remove" onClick = {()=> props.deleteTodo(id)}>X</button>
    </div>
  );
}

function TodoList(props) {
  const items = props.todos;

  return (
    <div className= {`todo-list-${props.title}`}>
      <h2>{props.title}:</h2>
      {
        // show todo list items here
        items.map( item => {
          return(<TodoListItem key = {item.id} todos={item} 
          deleteTodo = {props.deleteTodo} toggleTodo = {props.toggleTodo}/>)          
        })
      }
    </div>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          id: "asdfv",
          name: "Practice Guitar",
          isCompleted: false
        },
        {
          id: "gsdfw",
          name: "Take out Recycling",
          isCompleted: false
        },
        {
          id: "23gsd",
          name: "Exercise",
          isCompleted: false
        },
        {
          id: "6ghsd",
          name: "Buy Groceries",
          isCompleted: false
        },
        {
          id: "dfg83",
          name: "Send Birthday Cards",
          isCompleted: true
        },
        {
          id: "y84cd",
          name: "Sweep Porch",
          isCompleted: true
        }
      ],
      currentItem: {
        id: '',
        name: '',
        isCompleted: false
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  createTodo(e) {
    console.log("create");
    // create todo here
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.name!=="") {
      const newItems = [...this.state.todos, newItem]
      this.setState({
        todos: newItems,
        currentItem: {
          id: '',
          name: '',
          isCompleted: false
        }
      })
    }
  }

  deleteTodo(id) {
    // delete todo here
    const filteredItems = this.state.todos.filter( item => item.id !== id);
    this.setState({
      todos: filteredItems
    })
  }

  toggleTodo(id) {
    // toggle todo's completed status here
    console.log("toggle")
    const items = this.state.todos;
    items.forEach(item => {
      if(item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
    })
    this.setState ({
      todos: items
    })
  }

  handleInput(e) {
    console.log("handle");
    // handle the input from textbox
    this.setState({
      currentItem: {
        id: uuidv4(),
        name: e.target.value,
        isCompleted: false
      }
    })
  }
  render() {
    return (
      <div className="content">
        <h1 className="title">Todo App</h1>
        <TodoForm createTodo = {this.createTodo} 
        val = {this.state.currentItem.name} handleInput = {this.handleInput}></TodoForm>
        <div className="lists-wrapper">
          <TodoList todos={this.state.todos.filter( item => item.isCompleted === false)} title="Todo" 
          deleteTodo = {this.deleteTodo} toggleTodo = {this.toggleTodo} />
          <TodoList todos={this.state.todos.filter( item => item.isCompleted === true)} title="Completed" 
          deleteTodo = {this.deleteTodo} toggleTodo = {this.toggleTodo}/>
        </div>
      </div>
    );
  }
}

export default App;
