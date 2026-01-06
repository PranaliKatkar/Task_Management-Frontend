import Sidebar from "./Sidebar";

function MainPage() {
  return (
    <div className="main-layout">
      <Sidebar />

      <div className="main-content">
        <h1 className="main-title">Task Management</h1>
        <p className="main-subtitle">
          Organize your folders and manage daily tasks efficiently
        </p>
      </div>
    </div>
  );
}

export default MainPage;
