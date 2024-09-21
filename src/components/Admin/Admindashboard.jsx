import { useState } from "react";
import CreateBlog from "./CreateBlog";
import ListBlogs from "./ListBlogs";
import Logout from "./Logout";

const Admindashboard = () => {
  const [activeTab, setActiveTab] = useState("listBlog");

  const renderContent = () => {
    switch (activeTab) {
      case "createBlog":
        return <CreateBlog />;
      case "listBlog":
        return <ListBlogs />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg ">
        <div className="p-6 fixed h-screen">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <nav className="mt-8">
            <ul className="space-y-4 flex flex-col h-full">
              <li className=" w-full absolute">
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === "listBlog"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("listBlog")}
                >
                  Show Blog
                </button>
              </li>
              <li className=" w-full absolute top-32">
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === "createBlog"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("createBlog")}
                >
                  Create Blog
                </button>
              </li>
              <li className="bottom-10 w-full absolute">
                <Logout />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default Admindashboard;