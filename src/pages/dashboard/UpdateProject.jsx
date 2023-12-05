import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { url } from "../../URL";

import Select from "react-select";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const options = [
  { label: "react-js", value: "react-js" },
  { label: "javascript", value: "javascript" },
  { label: "web-dev", value: "web-dev" },
  { label: "camera", value: "camera" },
  { label: "editing", value: "editing" },
  { label: "photo", value: "photo" },
  { label: "video", value: "video" },
  { label: "mechanical-keyboard", value: "mechanical-keyboard" },
  { label: "pc-master-race", value: "pc-master-race" },
];

const UpdateProject = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [updateProject, setUpdateProject] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [tagList, setTagList] = useState([]);
  let opt = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url[2]}/project/${params.idProject}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setValue(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.idProject]);

  useEffect(() => {
    fetch(`${url[2]}/category`)
      .then((response) => response.json())
      .then((data) => setCategoryList(data.data));
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

  const submitLoadingHandler = () => {
    setSubmitIsLoading((prevLoading) => !prevLoading);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      let tagList;
      for (const [key, value] of Object.entries(updateProject)) {
        if (key === "images") {
          for (let i = 0; i < updateProject.images.length; i++) {
            formData.append("images", updateProject.images[i]);
          }
        }
        if (key === "tag") {
          for (let i = 0; i < updateProject.tag.length; i++) {
            if (!tagList) {
              tagList = updateProject.tag[i].value;
            } else {
              tagList += "," + updateProject.tag[i].value;
            }
          }
          formData.append("tag", tagList);
        } else {
          formData.append(key, value.replace(/['"]/g, "\\$&"));
        }
      }
      console.log(formData.toString());
      const response = await fetch(`${url[2]}/project/${params.idProject}`, {
        method: "PATCH",
        body: formData,
      });
      if (response.ok) {
        alert("Your Update Already Saved");
        navigate("..");
      } else {
        alert("Your Update Failed");
      }
    } catch (error) {
      alert(error);
    }
    submitLoadingHandler();
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
      <main className="min-h-screen bg-summer-200 py-5">
        <div className="text-center font-bold">Update Project</div>
        <div className="container mx-auto flex justify-center py-3">
          {isLoading ? (
            <div>loading</div>
          ) : (
            value.map((project) => {
              let oldTags = project["tag"]
                .split(",")
                .map((item) => ({ value: item, label: item }));
              return (
                <form
                  key={project.id}
                  className="w-1/2"
                  onSubmit={submitHandler}
                >
                  <div className="mb-6">
                    <input
                      type="hidden"
                      name="projectId"
                      value={project.id}
                    ></input>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-medium"
                    >
                      Project Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={updateProject.title || project.title}
                      className="block w-full rounded-lg border border-gray-600 bg-summer-100 p-2.5 text-sm placeholder-gray-400"
                      onChange={(e) =>
                        setUpdateProject({
                          ...updateProject,
                          title: e.target.value,
                        })
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
                    <textarea
                      id="description"
                      name="description"
                      value={updateProject.description || project.description}
                      className="block w-full rounded-lg border border-gray-600 bg-summer-100 p-2.5 text-sm placeholder-gray-400"
                      onChange={(e) =>
                        setUpdateProject({
                          ...updateProject,
                          description: e.target.value,
                        })
                      }
                      required
                    />
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
                      value={updateProject.category || project.category}
                      className="block w-full rounded-lg border border-gray-600 bg-summer-100 p-2.5 text-sm"
                      onChange={(e) =>
                        setUpdateProject({
                          ...updateProject,
                          category: e.target.value,
                        })
                      }
                      required
                    >
                      <option disabled={true} value="">
                        Please select the category
                      </option>
                      {categoryList.map((category) => {
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
                    <label
                      htmlFor="tag"
                      className="mb-2 block text-sm font-medium"
                    >
                      Project Tag(s)
                    </label>
                    <Select
                      className="block w-full rounded-md border border-gray-600 bg-summer-100 text-sm focus:ring-blue-500"
                      id="tag"
                      name="tag"
                      options={opt}
                      value={updateProject["tag"] || oldTags}
                      onChange={(e) =>
                        setUpdateProject({
                          ...updateProject,
                          ["tag"]: e,
                        })
                      }
                      isMulti
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="url"
                      className="mb-2 block text-sm font-medium"
                    >
                      Project URL
                    </label>
                    <input
                      type="text"
                      id="url"
                      name="url"
                      value={updateProject.url || project.url}
                      className="block w-full rounded-lg border border-gray-600 bg-summer-100 p-2.5 text-sm placeholder-gray-400"
                      onChange={(e) =>
                        setUpdateProject({
                          ...updateProject,
                          url: e.target.value,
                        })
                      }
                    ></input>
                  </div>
                  {project.image.length <= 0 && (
                    <div className="mb-6">
                      <label
                        htmlFor="image"
                        className="mb-2 block text-sm font-medium"
                      >
                        Project Image
                      </label>
                      <input
                        className="block w-full cursor-pointer rounded-lg border border-gray-600 bg-summer-100 text-sm"
                        accept="image/*"
                        id="image"
                        type="file"
                        multiple
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            images: e.target.files,
                          })
                        }
                      ></input>
                      <p
                        className="mt-1 text-xs text-gray-500"
                        id="file_input_help"
                      >
                        Only Accept SVG, PNG, JPG or GIF.
                      </p>
                    </div>
                  )}
                  {/* <div className="mb-6">
                    <label
                      htmlFor="image"
                      className="mb-2 block text-sm font-medium"
                    >
                      Project Image
                    </label>
                    <input
                      className="block w-full cursor-pointer rounded-lg border border-gray-600 bg-summer-100 text-sm"
                      accept="image/*"
                      id="image"
                      type="file"
                      // value={updateProject.image || project.image}
                      multiple
                      onChange={(e) =>
                        setUpdateProject({
                          ...updateProject,
                          images: e.target.files,
                        })
                      }
                    ></input>
                    <p
                      className="mt-1 text-xs text-gray-500"
                      id="file_input_help"
                    >
                      Only Accept SVG, PNG, JPG or GIF.
                    </p>
                  </div> */}
                  <button
                    type="submit"
                    className={`mb-5 w-full rounded-lg bg-summer-300 py-3 text-summer-100 ${
                      submitIsLoading && "disable"
                    }`}
                    onClick={submitLoadingHandler}
                  >
                    {!submitIsLoading ? "Submit" : "Loading"}
                    {/* Submit */}
                  </button>
                </form>
              );
            })
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UpdateProject;
