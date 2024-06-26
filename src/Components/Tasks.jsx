import React from 'react';
import { Link } from 'react-router-dom';

const Tasks = () => {
    return (
        <>
        <main>
             <section className='top-section'>
            <div className="topHeading">
            <h3>Todo App Kadritech.AB</h3>
            </div>
            <div className="taskbar">
              <Link to="/add"><button>Add Task</button></Link>
                <input type="text" name="" id="" placeholder='Search Task' />
            </div>
            </section>
        </main>
        <main className='main-container'>
        <section className='container-new'>
        <div className="taskInfo">
        <h4>New Task</h4>
            <article>Total Task: 7</article>
        </div>
        <div className="newTasks">
            <div className="taskNameAndTitle">
                <h5>First Task</h5>
                <article>This is my First task according to order</article>
            </div>
            <div className="taskEditAndDelete">
            <i className="fa-solid fa-trash"></i>
            <i className="fa-solid fa-pencil ms-1"></i>
            </div>
        </div>
        </section>
        <section className='container-ongoing'>
        <div className="taskInfo">
        <h4>Ongoing Task</h4>
        <article>Total Task: 9</article>
        </div>
        <div className="ongoingTasks">
            <div className="ongoingTask">
                <h5>First Task</h5>
                <article>This is my First task according to order</article>
            </div>
            <div className="taskIntegator">
                <div className="integator"></div>
                <article>Ongoing</article>
            </div>
        </div>
        <div className="ongoingTasks">
            <div className="ongoingTask">
                <h5>First Task</h5>
                <article>This is my First task according to order</article>
            </div>
            <div className="taskIntegator">
                <div className="integator"></div>
                <article>Ongoing</article>
            </div>
        </div>
        </section>
        <section className='container-done'>
        <div className="taskInfo">
        <h4>Done Task</h4>
            <article>Total Task: 7</article>
        </div>
        <div className="doneTasks">
            <div className="doneTask">
                <h5>First Task</h5>
                <article>This is my First task according to order</article>
            </div>
            <div className="doneTaskIntegator">
                <div className="doneIntegator"></div>
                <article>Done</article>
            </div>
        </div>
        </section>
      </main>
      </>
    );
};

export default Tasks;