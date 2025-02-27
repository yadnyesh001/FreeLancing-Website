import React, { useEffect, useState } from "react";
import axios from "axios";

const formatDate = (dateString) => {
  if (!dateString) return "Unknown Date";
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options).replace(",", ""); // Formats as "10 Jan 2025"
};

const FindWork = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/projects");

        if (response.data && Array.isArray(response.data.projects)) {
          setProjects(response.data.projects); 
        } else {
          console.error("Unexpected API response format:", response.data);
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Find Work</h2>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md p-5 border border-gray-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {project.title || "Untitled Project"}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {project.description || "No description provided."}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-semibold">Budget:</span>{" "}
                  <span className="text-green-600 font-bold">
                    {project.budget ? `$${project.budget}` : "Negotiable"}
                  </span>
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <span className="font-semibold">Posted On:</span>{" "}
                  {formatDate(project.createdAt)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.skills && project.skills.length > 0 ? (
                    project.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-xs">Skills not specified</span>
                  )}
                </div>
              </div>
              <button
                className="mt-4 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition"
                onClick={() => window.location.href = `/project/${project.id}`}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No projects available.</p>
      )}
    </div>
  );
};

export default FindWork;
