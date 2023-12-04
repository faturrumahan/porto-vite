import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../URL";
import Select from "react-select";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const AddProject = () => {
  const navigate = useNavigate();
  const [newProject, setNewProject] = useState({});
  const [category, setCategory] = useState([]);
  const [tagList, setTagList] = useState([]);
  let opt = [];

  useEffect(() => {
    fetch(`${url[2]}/category`)
      .then((response) => response.json())
      .then((data) => setCategory(data.data));
  }, []);

  useEffect(() => {
    fetch(`${url[2]}/tag`)
      .then((response) => response.json())
      .then((data) => setTagList(data.data));
  }, []);

  tagList.map((tag) => {
    opt.push({ value: tag.name, label: tag.name });
    return 0;
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      let tagList;
      for (const [key, value] of Object.entries(newProject)) {
        if (key === "images") {
          for (let i = 0; i < newProject.images.length; i++) {
            formData.append("images", newProject.images[i]);
          }
        } else if (key === "tag") {
          for (let i = 0; i < newProject.tag.length; i++) {
            if (!tagList) {
              tagList = newProject.tag[i].value;
            } else {
              tagList += "," + newProject.tag[i].value;
            }
          }
          formData.append("tag", tagList);
        } else {
          formData.append(key, value);
        }
      }
      const response = await fetch(`${url[2]}/project`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Your Submit Already Saved");
        navigate("..");
      } else {
        alert("Your Submit Failed");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <NavBar>
        <Link to=".." className="hover:underline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </NavBar>
      <main className="min-h-fit bg-summer-200 py-5">
        <div className="text-center font-bold">Add New Project</div>
        <div className="container mx-auto flex justify-center py-3">
          <form className="w-1/2" onSubmit={submitHandler}>
            <div className="mb-6">
              <label htmlFor="title" className="mb-2 block text-sm font-medium">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newProject.title}
                className="block w-full rounded-lg border border-gray-600 bg-summer-100 p-2.5 text-sm placeholder-gray-400"
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                required
              ></input>
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium"
              >
                Project Description
              </label>
              <textArea
                id="description"
                name="description"
                value={newProject.description}
                className="block w-full rounded-lg border border-gray-600 bg-summer-100 p-2.5 text-sm placeholder-gray-400"
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                required
              ></textArea>
            </div>
            <div className="mb-6">
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium"
              >
                Project Category
              </label>
              <select
                type="text"
                id="category"
                name="category"
                value={newProject.category}
                className="block w-full rounded-lg border border-gray-600 bg-summer-100 p-2.5 text-sm"
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    category: e.target.value,
                  })
                }
                required
              >
                <option disabled={true} value="" selected>
                  Please select the category
                </option>
                {category.map((category) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name.charAt(0).toUpperCase() +
                        category.name.slice(1)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="tag" className="mb-2 block text-sm font-medium">
                Project Tag(s)
              </label>
              <Select
                className="block w-full rounded-md border border-gray-600 bg-summer-100 text-sm focus:ring-blue-500"
                id="tag"
                name="tag"
                options={opt}
                value={newProject["tag"]}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    ["tag"]: e,
                  })
                }
                isMulti
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="image" className="mb-2 block text-sm font-medium">
                Project Image
              </label>
              <input
                className="block w-full cursor-pointer rounded-lg border border-gray-600 bg-summer-100 text-sm"
                accept="image/*"
                id="image"
                type="file"
                multiple
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    images: e.target.files,
                  })
                }
              ></input>
              <p className="mt-1 text-xs text-gray-500" id="file_input_help">
                Only Accept SVG, PNG, JPG or GIF.
              </p>
            </div>
            <div className="mb-6">
              <label htmlFor="url" className="mb-2 block text-sm font-medium">
                Project URL
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={newProject.url}
                className="block w-full rounded-lg border border-gray-600 bg-summer-100 p-2.5 text-sm placeholder-gray-400"
                onChange={(e) =>
                  setNewProject({ ...newProject, url: e.target.value })
                }
              ></input>
            </div>
            <button
              type="submit"
              className="mb-5 w-full rounded-lg bg-summer-300 py-3 text-summer-100"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AddProject;
