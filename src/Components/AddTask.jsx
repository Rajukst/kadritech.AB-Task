import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
const navigate= useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      ongoing: false,
    };

    // Save the new task to local storage
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([...existingTasks, newTask]));

    // Clear form fields
    setTitle("");
    setDescription("");
    alert("data saved successfully")
    navigate("/");
  };
  return (
    <main className="addTasks">
      <h3>Add Task</h3>
      <form onSubmit={handleSubmit}>
      <div className="addTask">
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
        <button>Add Task</button>
      </div>     
      </form>
    </main>
  );
};

export default AddTask;
