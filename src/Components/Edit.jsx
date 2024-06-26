import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { taskId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetch task data based on taskId
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEdit = existingTasks.find((task) => task.id === Number(taskId));

    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update task data
    const updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTaskIndex = updatedTasks.findIndex(
      (task) => task.id === Number(taskId)
    );
    if (updatedTaskIndex !== -1) {
      updatedTasks[updatedTaskIndex] = {
        id: Number(taskId),
        title,
        description,
        completed: false,
      };

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    // Navigate back to the home page
    navigate("/");
  };
    return (
        <main className="editTasks">
      <h3>Edit Task</h3>
      <form onSubmit={handleSubmit}>
      <div className="editTask">
        <input
          type="text"
          name=""
          id=""
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="4"
          placeholder="Task Description"
          value={description}
              onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button>Update</button>
      </div>     
      </form>
    </main>
    );
};

export default Edit;