import React from "react";

const Home = () => {
  return (
    <div className="h-fit bg-summer-200 py-28 md:pt-3">
      <div className="container flex h-full w-full flex-wrap justify-center md:mx-auto">
        <div className="flex items-center px-5 text-center md:w-1/2 md:px-0 md:text-left">
          <div>
            <h1 className="text-5xl font-extrabold">Hi, I am Fatur</h1>
            <h2 className="italic">Junior Front End Web Developer</h2>
            <p className="my-3 text-lg leading-snug md:w-2/3 md:text-justify">
              Welcome to my little internet corner. I'm freshly graduated and
              looking for gigs as a front-end web developer in Yogyakarta,
              Indonesia. I'm excited about programming, digital art, technology,
              activities such as sports, and everything in between.
            </p>
          </div>
        </div>
        <div className="hidden items-center justify-center md:flex md:w-auto">
          <div className="flex h-full w-96 items-center justify-center bg-summer-200">
            <img src="assets/me.gif" className="h-full object-cover"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
