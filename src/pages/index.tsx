import { type NextPage } from "next";
import Image from "next/image";
import me from "../../public/me.png";
import { titleFont } from "~/shared/fonts";

const Musings: NextPage = () => {
  return (
    <div className="flex w-full flex-col place-items-center justify-around p-10 md:flex-row">
      <div className="flex flex-col items-center justify-center md:max-w-md md:items-start lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <p className={"text-3xl lg:text-4xl" + titleFont}>Hi, I&apos;m</p>
        <h1 className={"text-7xl text-main lg:text-8xl" + titleFont}>
          Onkar Deshpande
        </h1>
        <p className="mt-10 text-xl">
          I&apos;m an incoming MS in CS student at Stanford University.
        </p>
        <p className="mt-5 text-xl">
          I have a bachelors degree in CS from IIT Bombay and I have interned in
          theoretical CS at TU Braunschweig. I worked at Rubrik India for a
          couple years in the cloud native workload protection team.
        </p>
        <p className="mt-5 text-xl">
          I&apos;m into distributed systems and blockchain. I like reading Math,
          Physics and a bit of Philosophy too.
        </p>
      </div>
      <div className="flex flex-col place-items-center">
        <div className="z-20 m-2 mb-5 h-fit w-fit overflow-hidden rounded-full p-0">
          <Image
            src={me}
            alt="A picture of me"
            width={400}
            height={400}
            className="z-10 block bg-gradient-to-br from-blue-500 via-pink-500 to-yellow-500 bg-left-top brightness-150 transition-all duration-500 ease-in-out [background-size:150%150%] hover:scale-110 hover:bg-right-bottom dark:brightness-100"
            placeholder="blur"
          />
        </div>
        <div className="text-4xl">Something Huge</div>
      </div>
    </div>
  );
};

export default Musings;
