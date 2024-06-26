import React, { useState, useEffect } from 'react';
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
      task.id === id ? { ...task, completed: false, ongoing: false, dueTime: null } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const markAsOngoing = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        let bangladeshTime = new Date();
        bangladeshTime.setHours(bangladeshTime.getHours() + 6);
        const isoBangladeshTime = bangladeshTime.toISOString().slice(0, 16);
        return { ...task, completed: false, ongoing: true, dueTime: task.dueTime || isoBangladeshTime };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const markAsDone = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    const taskToUpdate = tasks.find((task) => task.id === id);
  
    if (taskToUpdate) {
      taskToUpdate.completed = true;
      taskToUpdate.ongoing = false;
      taskToUpdate.dueTime = null;
  
      setTasks([taskToUpdate, ...updatedTasks]);
      localStorage.setItem("tasks", JSON.stringify([taskToUpdate, ...updatedTasks]));
    }
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

  const handleDueTimeChange = (id, e) => {
    const dueTime = e.target.value;
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, dueTime: dueTime } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const getBangladeshTimeString = (dateString) => {
    const date = new Date(dateString);
    const bdOffset = 6 * 60 * 60 * 1000; // Offset for Bangladesh timezone in milliseconds
    const bdDate = new Date(date.getTime() + bdOffset);
    return bdDate.toISOString().slice(0, 16);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const newTasks = filteredTasks.filter(task => !task.ongoing && !task.completed);
  const ongoingTasks = filteredTasks.filter(task => task.ongoing && !task.completed);
  const doneTasks = filteredTasks.filter(task => task.completed);

  useEffect(() => {
    const checkOverdueTasks = () => {
      const now = new Date();
      ongoingTasks.forEach(task => {
        if (task.dueTime && new Date(task.dueTime) < now) {
          alert(`Task "${task.title}" is overdue!`);
        }
      });
    };

    const intervalId = setInterval(checkOverdueTasks, 60000); // Check every minute
    return () => clearInterval(intervalId);
  }, [ongoingTasks]);

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
          {ongoingTasks.length === 0 && (
            <div className="no-tasks-message">
              <h2>No Ongoing Tasks</h2>
            </div>
          )}
          {ongoingTasks.map((task, index) => (
            <div className="ongoingTasks" key={index} onContextMenu={(e) => handleContextMenu(e, task.id, 'ongoing')}>
              <div className="ongoingTask">
                <h5>{task.title}</h5>
                <article>{task.description}</article>
              </div>
              <div className="taskIntegator">
                <div className="integator"></div>
                <article>{task.ongoing ? "Ongoing" : ""}</article>
              </div>
              <div className="overDueTime">
                    <article>OverDue Time</article>
                    <input
                    className='overdueTimeInput'
                  type="datetime-local"
                  value={task.dueTime ? getBangladeshTimeString(task.dueTime) : ''}
                  onChange={(e) => handleDueTimeChange(task.id, e)}
                />
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
              <div className="taskIntegator">
                <div className="doneIntegator"></div>
                <article>{task.completed ? 'Done' : task.ongoing ? 'Ongoing' : ''}</article>
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
