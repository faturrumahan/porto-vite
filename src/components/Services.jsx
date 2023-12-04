import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReactModal from "react-modal";
import { url } from "../URL";

console.log(Swiper);

const Services = () => {
  const [value, setValue] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("web dev");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState([]);
  const [projectImg, setProjectImg] = useState([]);
  const [projectTag, setProjectTag] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(url[2] + "/project")
      .then((response) => response.json())
      .then((data) => setValue(data.data))
      .then(setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(url[2] + "/category")
      .then((response) => response.json())
      .then((data) => setCategory(data.data))
      .then(setIsLoading(false));
  }, []);

  const filterProjectHandler = (e) => {
    setSelectedCategory(e);
  };

  const filteredProject = value.filter((project) => {
    return project.category === selectedCategory;
  });

  const modalOpenHandler = (project, image, tag) => {
    setSelectedProject(project);
    setProjectImg(image);
    setProjectTag(tag);
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const modalCloseHandler = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const capitilizedFunctionHandler = (inputString) => {
    const words = inputString.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
  };

  return (
    <>
      <div className="h-fit bg-summer-200 py-10">
        <div className="container mx-auto h-full">
          <div className="flex justify-center text-xs sm:text-base">
            <div className="mx-5 flex w-full flex-wrap justify-between md:mx-0 md:w-1/2 lg:w-1/3">
              {category.map((category) => {
                return (
                  <button
                    key={category.id}
                    className={`underline-offset-8 ${
                      selectedCategory === category.name
                        ? "underline"
                        : "hover:underline"
                    }`}
                    onClick={() => filterProjectHandler(category.name)}
                  >
                    {capitilizedFunctionHandler(category.name)}
                  </button>
                );
              })}
            </div>
          </div>
          {isLoading ? (
            <p className="p-10 text-center">loading...</p>
          ) : filteredProject.length > 0 ? (
            // <div className="mx-5 grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:mx-0 lg:grid-cols-4">
            <Swiper
              slidesPerView={4}
              spaceBetween={5}
              className="z-0 mx-5 py-10 lg:mx-0"
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
            >
              {filteredProject.map((project) => {
                const image = project.image.split(",");
                const tag = project.tag.split(",");
                return (
                  <>
                    <SwiperSlide
                      className="h-96 w-auto transform justify-center rounded-md bg-summer-100 p-5 transition duration-500 lg:hover:-translate-y-4"
                      key={project.id}
                      // onClick={() => modalOpenHandler(project, image, tag)}
                    >
                      <div className="h-full w-full">
                        <div className="h-2/3 w-full">
                          <img
                            // src={`${url[3]}/image/${project.image}`} //local storage images
                            src={
                              project.image
                                ? image[0]
                                : `https://placehold.co/1000x600?text=project+not+available+yet`
                            } //imgur
                            className="h-full w-full rounded-md object-cover"
                          ></img>
                        </div>
                        <div id="caption" className="mt-3">
                          <p className="truncate text-2xl font-bold">
                            {project.title}
                          </p>
                          <p className="truncate italic">
                            {project.description}
                          </p>
                          <div className="flex w-full justify-end">
                            <button
                              className="mt-2 h-10 w-full rounded-md bg-green-600 text-summer-100 lg:w-1/3"
                              onClick={() =>
                                modalOpenHandler(project, image, tag)
                              }
                            >
                              View More
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </>
                );
              })}
            </Swiper>
          ) : (
            <p className="p-10 text-center">nothing to see here</p>
          )}
        </div>
      </div>
      <ReactModal
        isOpen={showModal}
        contentLabel="example"
        onRequestClose={modalCloseHandler}
        shouldCloseOnOverlayClick={true}
        className="absolute inset-x-5 inset-y-20 overflow-auto rounded-lg bg-summer-100 p-3 no-scrollbar lg:inset-x-96 lg:inset-y-12 lg:p-10"
        overlayClassName="fixed inset-0 bg-opacity-50 bg-slate-500"
      >
        <div className="flex flex-wrap justify-between">
          <h1 className="text-3xl font-extrabold">{selectedProject.title}</h1>
          <button className="hidden lg:flex" onClick={modalCloseHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <hr className="my-5 h-1 w-full bg-summer-300"></hr>

        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop={true}
        >
          {selectedProject.image ? (
            projectImg.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={item}
                className="h-full w-full rounded-md object-cover"
              ></img>
            ))
          ) : (
            <img
              src="https://placehold.co/1000x550?text=project+not+available+yet"
              alt="project not available yet"
              className="h-full w-full rounded-md object-cover"
            ></img>
          )}
        </Carousel>

        <div className="mt-5">
          <div>
            <h3 className="text-lg font-bold">Description</h3>
            <p>{selectedProject.description}</p>
          </div>
          <div>
            <h3 className="mt-3 text-lg font-bold">Stack</h3>
            <div className="flex space-x-1">
              {projectTag.map((item, index) => (
                <div
                  className="flex w-fit rounded-lg bg-summer-200 p-2"
                  key={index}
                >
                  <div>
                    <p className="text-xs font-bold">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr className="my-5 h-1 w-full bg-summer-300"></hr>
          <div className="flex w-full justify-center">
            <a
              className="w-full rounded-md bg-green-500 p-3 text-center text-summer-100"
              href={selectedProject.url}
              target="_blank"
              rel="noreferrer"
            >
              {selectedProject.url ? "Visit Me" : "Project Not Available Yet"}
            </a>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default Services;
