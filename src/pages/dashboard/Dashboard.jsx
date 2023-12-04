import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../URL";

import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const Dashboard = () => {
  const [value, setValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${url[2]}/project`)
      .then((response) => response.json())
      .then((data) => setValue(data.data))
      .then(setIsLoading(false));
  }, []);

  const deleteRequestHandler = async (deletedId) => {
    try {
      const res = await fetch(`${url[2]}/project/${deletedId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        alert("Your Data Already Deleted");
        navigate(0);
      } else {
        alert("Some error occured");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <NavBar>
        <Link to="/" className="hover:underline">
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
      <main className="min-h-screen bg-summer-200">
        <div className="container mx-auto">
          <div className="flex w-full justify-end py-3">
            <Link
              to={"add"}
              className="my-3 rounded-xl bg-summer-300 px-3 py-2 text-white"
            >
              <div className="flex flex-wrap space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <p>Add New Project</p>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {isLoading ? (
              <div>loading</div>
            ) : (
              value.map((project) => {
                return (
                  <div
                    key={project.id}
                    className="rounded-lg bg-summer-100 p-4"
                  >
                    <div className="flex flex-wrap justify-between">
                      <div className="flex w-1/2 flex-col">
                        <p className="truncate">{project.title}</p>
                        <p className="italic">{project.category}</p>
                      </div>
                      <div className="flex w-auto flex-wrap justify-between space-x-1">
                        <Link
                          to={`${project.id}`}
                          className="flex w-auto items-center rounded-md bg-green-500 px-3"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="h-6 w-6"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                          </svg>
                        </Link>
                        <button
                          className="w-auto rounded-md bg-red-500 px-3"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this?",
                              )
                            )
                              deleteRequestHandler(project.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="h-6 w-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
