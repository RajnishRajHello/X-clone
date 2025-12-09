import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { RiHome5Line } from "react-icons/ri";
import { CiHashtag } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { SlEnvolopeLetter } from "react-icons/sl";
import { CiBookmark } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import FeedCard from "@/component/feedCard";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

interface TwitterSideBarButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenueItems: TwitterSideBarButton[] = [
  {
    title: "Home",
    icon: <RiHome5Line />,
  },
  {
    title: "Explore",
    icon: <CiHashtag />,
  },
  {
    title: "Notifications",
    icon: <IoNotificationsOutline />,
  },
  {
    title: "Messages",
    icon: <SlEnvolopeLetter />,
  },

  {
    title: "Bookmark",
    icon: <CiBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <FaRegMoneyBillAlt />,
  },
  {
    title: "Profile",
    icon: <RxAvatar />,
  },
  {
    title: "Options",
    icon: <SlOptions />,
  },
];

export default function Home() {
  return (
    <div className="    ">
      {/* can add px-50 on full screen */}
      <div className="grid grid-cols-12 w-screen h-screen px-60 overflow-x-hidden ">
        <div className="col-span-1 h-screen fixed ">
          <div className="text-4xl h-fit w-fit hover:bg-slate-600 p-2 cursor-pointer transition-all">
            <FaXTwitter />
          </div>
          <div className="pr-4">
            <ul>
              {sideBarMenueItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 m-3 text-2xl hover:bg-slate-600 w-fit px-2 py-1 cursor-pointer transition-all rounded-full"
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <button className="bg-blue-700 px-4 py-1 w-full rounded-full">
              Tweet
            </button>
          </div>
        </div>
        <div className="col-span-9 border-r-[0.2px] border-l-[0.2px] ml-55  border-gray-500  ">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
}
