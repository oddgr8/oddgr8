import { type NextPage } from "next";
import Image from "next/image";
import me from "../../public/me.png";
import { titleFont } from "~/shared/fonts";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Intro() {
  return (
    <div className="flex flex-col items-center justify-center md:max-w-md md:items-start lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <p className={"text-3xl lg:text-4xl" + titleFont}>Hi, I&apos;m</p>
      <h1 className={"text-7xl text-main lg:text-8xl" + titleFont}>
        Onkar Deshpande
      </h1>
      <p className="mt-10 text-xl">
        I&apos;m an incoming MS in CS student at Stanford University.
      </p>
      <p className="mt-5 text-xl">
        I have a bachelor&apos;s degree in CS from IIT Bombay, research
        experience in theoretical CS from my internship at TU Braunschweig and
        two years of industry experience from working in the cloudnative
        workload protection team at Rubrik India.
      </p>
      <p className="mt-5 text-xl">
        I&apos;m into distributed systems and blockchain. I like reading Math,
        Physics and a bit of Philosophy too. Right now I&apos;m trying to learn
        Rust. I play Age of Empires 2 in my free time.
      </p>
    </div>
  );
}

function Contacts() {
  return (
    <div className="flex flex-row">
      {[
        {
          path: "https://linkedin.com/in/onkardeshpande07",
          icon: faLinkedinIn,
        },
        {
          path: "https://twitter.com/oddgr8",
          icon: faTwitter,
        },
        {
          path: "https://github.com/oddgr8",
          icon: faGithub,
        },
        {
          path: "mailto:onkardeshpande07@gmail.com",
          icon: faEnvelope,
        },
      ].map((ele, idx) => (
        <Link
          className="m-2 mx-5 hover:text-main"
          href={ele.path}
          key={idx}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={ele.icon} size="xl" />
        </Link>
      ))}
    </div>
  );
}

function HeroImage() {
  return (
    <div className="z-20  m-5 h-fit w-fit overflow-hidden rounded-full p-0">
      <Image
        src={me}
        alt="A picture of me"
        width={400}
        height={400}
        className="z-10 block bg-gradient-to-br from-blue-500 via-pink-500 to-yellow-500 bg-left-top brightness-150 transition-all duration-500 ease-in-out [background-size:150%150%] hover:scale-110 hover:bg-right-bottom dark:brightness-100"
        placeholder="blur"
      />
    </div>
  );
}

const Home: NextPage = () => {
  return (
    <div className="flex w-full flex-col place-items-center justify-around p-10 md:flex-row">
      <Intro />
      <div className="flex flex-col place-items-center">
        <HeroImage />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
