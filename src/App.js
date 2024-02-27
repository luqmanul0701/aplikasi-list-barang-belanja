import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [activities, setActivities] = useState([]);

  const addActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const markActivityComplete = (id) => {
    const updatedActivities = activities.map((activity) => (activity.id === id ? { ...activity, completed: true } : activity));
    setActivities(updatedActivities);
  };

  return (
    <div className="App">
      <h1>List Barang Belanja</h1>
      <ActivityForm onAddActivity={addActivity} />
      <ActivityList activities={activities} onActivityComplete={markActivityComplete} />
    </div>
  );
}

function ActivityForm({ onAddActivity }) {
  const [activity, setActivity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activity) return;
    onAddActivity({ id: Date.now(), description: activity, completed: false });
    setActivity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Masukan Barang Anda" value={activity} onChange={(e) => setActivity(e.target.value)} />
      <button className="button1" type="submit">
        Tambahkan List
      </button>
    </form>
  );
}

function ActivityList({ activities, onActivityComplete }) {
  return (
    <ul>
      {activities.map((activity) => (
        <Activity key={activity.id} activity={activity} onActivityComplete={onActivityComplete} />
      ))}
    </ul>
  );
}

function Activity({ activity, onActivityComplete }) {
  const { id, description, completed } = activity;

  return (
    <li style={{ textDecoration: completed ? "line-through" : "none" }}>
      {description}
      {!completed && <button onClick={() => onActivityComplete(id)}>Done mas😬</button>}
    </li>
  );
}
