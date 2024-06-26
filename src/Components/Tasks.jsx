import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Tasks = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, taskId: null, taskStatus: null });
  const [searchQuery, setSearchQuery] = useState('');

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    alert("Task deleted");
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const markAsNew = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: false, ongoing: false } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const markAsOngoing = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: false, ongoing: true } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const markAsDone = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: true, ongoing: false } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleContextMenu = (e, id, status) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, taskId: id, taskStatus: status });
  };

  const handleClick = () => {
    setContextMenu({ visible: false, x: 0, y: 0, taskId: null, taskStatus: null });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const newTasks = filteredTasks.filter(task => !task.ongoing && !task.completed);
  const ongoingTasks = filteredTasks.filter(task => task.ongoing && !task.completed);
  const doneTasks = filteredTasks.filter(task => task.completed);

  return (
    <div onClick={handleClick}>
      <main>
        <section className='top-section'>
          <div className="topHeading">
            <h3>Todo App Kadritech.AB</h3>
          </div>
          <div className="taskbar">
            <Link to="/add"><button>Add Task</button></Link>
            <input
              type="text"
              placeholder='Search Task'
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </section>
      </main>
      <main className='main-container'>
        <section className='container-new'>
          <div className="taskInfo">
            <h4>New Task</h4>
            <article>Total Task: {newTasks.length}</article>
          </div>
          {newTasks.map((task, index) => (
            <div className="newTasks" key={index} onContextMenu={(e) => handleContextMenu(e, task.id, 'new')}>
              <div className="taskNameAndTitle">
                <h5>{task.title}</h5>
                <article>{task.description}</article>
              </div>
              <div className="taskEditAndDelete">
                <i onClick={() => deleteTask(task.id)} className="fa-solid fa-trash"></i>
                <Link to={`edit/${task.id}`}>
                  <i className="fa-solid fa-pencil ms-1"></i>
                </Link>
              </div>
            </div>
          ))}
        </section>
        <section className='container-ongoing'>
          <div className="taskInfo">
            <h4>Ongoing Task</h4>
            <article>Total Task: {ongoingTasks.length}</article>
          </div>
          {ongoingTasks.map((task, index) => (
            <div className="ongoingTasks" key={index} onContextMenu={(e) => handleContextMenu(e, task.id, 'ongoing')}>
              <div className="ongoingTask">
                <h5>{task.title}</h5>
                <article>{task.description}</article>
              </div>
              <div className="taskIntegator">
                <div className="integator"></div>
                <article>{task?.ongoing && "Ongoing"}</article>
              </div>
            </div>
          ))}
        </section>
        <section className='container-done'>
          <div className="taskInfo">
            <h4>Done Task</h4>
            <article>Total Task: {doneTasks.length}</article>
          </div>
          {doneTasks.map((task, index) => (
            <div className="doneTasks" key={index} onContextMenu={(e) => handleContextMenu(e, task.id, 'done')}>
              <div className="doneTask">
                <h5>{task.title}</h5>
                <article>{task.description}</article>
              </div>
              <div className="doneTaskIntegator">
                <div className="doneIntegator"></div>
                <article>{task?.completed && "Done"}</article>
              </div>
            </div>
          ))}
        </section>
      </main>
      {contextMenu.visible && (
        <div className='contextMenu' style={{ top: contextMenu.y, left: contextMenu.x }}>
          {contextMenu.taskStatus !== 'new' && <div onClick={() => markAsNew(contextMenu.taskId)}>Move to New</div>}
          {contextMenu.taskStatus !== 'ongoing' && <div onClick={() => markAsOngoing(contextMenu.taskId)}>Move to Ongoing</div>}
          {contextMenu.taskStatus !== 'done' && <div onClick={() => markAsDone(contextMenu.taskId)}>Move to Done</div>}
        </div>
      )}
    </div>
  );
};

export default Tasks;
