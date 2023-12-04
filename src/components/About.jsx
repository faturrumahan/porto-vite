import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SKILLS = [
  {
    name: "Javascript",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    level: "Intermediate",
  },
  {
    name: "React JS",
    img: "https://cdn1.iconfinder.com/data/icons/soleicons-fill-vol-1/64/reactjs_javascript_library_atom_atomic_react-512.png",
    level: "Intermediate",
  },
  {
    name: "Video Editing",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/2101px-Adobe_Premiere_Pro_CC_icon.svg.png",
    level: "Intermediate",
  },
  {
    name: "Photography",
    img: "https://static.vecteezy.com/system/resources/previews/019/016/821/original/adobe-lightroom-icon-free-png.png",
    level: "Intermediate",
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const About = () => {
  return (
    <div className="h-fit px-5 py-10 lg:px-0 lg:py-16">
      <div className="container mx-auto flex h-full w-full flex-wrap justify-center">
        <div className="flex items-center justify-center lg:w-1/2">
          <div className="bg-gradient-running flex h-full w-full items-center justify-center lg:h-[500px] lg:w-[500px]">
            <img
              src="assets\me-2.jpg"
              className="h-full w-full object-cover p-7 md:p-20 lg:p-10"
            ></img>
          </div>
        </div>
        <div className="w-full items-center lg:w-1/2">
          <div className="flex h-full flex-col justify-between">
            <div className="mt-3 lg:mt-0">
              <h2 className="mb-2 text-center text-3xl font-extrabold lg:text-left">
                About{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
            </div>
            <div>
              <p className="mb-2 text-center lg:text-justify">
                Hello, I am Fathurrohman but some people also known me as
                faturrumahan. For now, I am an informatics freshly graduated
                from UPN "Veteran" Yogyakarta. I have an interest in the
                web-development field as a front-end developer. Recently I study
                about Javascript, especially React JS library. Other than that,
                I also love <span className="line-through md:hidden">You</span>{" "}
                visual art such as photography and videography, listening to
                some kind of music, doing workouts like running and cycling, and
                following trends about technology.
              </p>
              <table className="my-3 hidden table-auto border-spacing-5 md:flex md:justify-center lg:justify-start">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td className="px-5">:</td>
                    <td>Fathurrohman</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td className="px-5">:</td>
                    <td>23</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td className="px-5">:</td>
                    <td>Yogyakarta, Indonesia</td>
                  </tr>
                  <tr>
                    <td>E-mail</td>
                    <td className="px-5">:</td>
                    <td>Fathurrohman.works@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Interest</td>
                    <td className="px-5">:</td>
                    <td>
                      <span className="line-through">You</span> Anything about
                      tech
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <Carousel
                  responsive={responsive}
                  className="w-full md:my-0 lg:my-5"
                >
                  {SKILLS.map((skill, index) => {
                    return (
                      <div
                        className={`${
                          index === 0
                            ? `me-1`
                            : index === SKILLS.length - 1
                              ? `ms-1`
                              : `mx-1`
                        } flex w-[.8] items-center justify-center space-x-3 rounded-lg bg-summer-200 p-2 lg:w-fit`}
                        key={skill.name}
                      >
                        <div className="flex h-10 lg:h-full lg:w-1/4">
                          <img
                            src={skill.img}
                            alt={skill.name}
                            className="object-contain"
                          ></img>
                        </div>
                        <div className="w-auto text-sm lg:text-base">
                          <p className="font-bold">{skill.name}</p>
                          <p className="italic">{skill.level}</p>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>

              {/* <div className="flex flex-wrap justify-center space-y-1 md:my-5 md:flex-nowrap md:justify-start md:space-x-3 md:space-y-0 lg:my-0">
                {SKILLS.map((skill) => {
                  return (
                    <div
                      className="flex w-full justify-center space-x-3 rounded-lg bg-summer-200 p-2 lg:w-fit"
                      key={skill.name}
                    >
                      <div className="flex h-10 md:h-full md:w-1/4">
                        <img
                          src={skill.img}
                          alt={skill.name}
                          className="object-contain"
                        ></img>
                      </div>
                      <div className="w-auto text-sm md:text-base">
                        <p className="font-bold">{skill.name}</p>
                        <p className="italic">{skill.level}</p>
                      </div>
                    </div>
                  );
                })}
              </div> */}
            </div>
            <a
              href="https://www.linkedin.com/in/fathurrohman07/"
              target={`_blank`}
              className="w-full lg:w-fit"
            >
              <button className="mt-3 w-full rounded-lg bg-summer-200 px-5 py-2 font-bold transition-colors duration-300 hover:bg-summer-300 hover:text-white">
                hire me
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
