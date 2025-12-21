"use client";
import React, { useCallback, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { RiHome5Line } from "react-icons/ri";
import { CiHashtag, CiBookmark } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { SlEnvolopeLetter, SlOptions } from "react-icons/sl";
import { RxAvatar } from "react-icons/rx";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { GiHummingbird } from "react-icons/gi";
import { PiImageSquare } from "react-icons/pi";

import FeedCard from "@/component/feedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "../../graphql/query/user";
import { useCurrentUser } from "../../hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCreateTweet, useGetAllTweets } from "../../hooks/tweet";
import { Tweet } from "../../gql/graphql";

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
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();
  const { mutate } = useCreateTweet();

  const queryClint = useQueryClient();

  const [content, setContent] = useState("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
  }, [content, mutate]);

  const handleLoginWithGoolge = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found `);
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );

      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("__X_token", verifyGoogleToken);

      // await queryClint.invalidateQueries(["current-user"]);

      await queryClint.invalidateQueries({ queryKey: ["current-user"] });
    },
    [queryClint]
  );

  return (
    <div className="    ">
      {/* can add px-50 on full screen */}
      <div className="grid grid-cols-12 w-screen h-screen px-60 overflow-x-hidden ">
        <div className="col-span-1 h-screen fixed ">
          <div className="text-4xl h-fit w-fit hover:bg-slate-600 p-2 cursor-pointer transition-all relative">
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
            <button className="bg-blue-700   w-full rounded-full flex justify-start items-center gap-4 mr-5 text-2xl hover:bg-blue-600 px-2 py-1 cursor-pointer transition-all">
              <GiHummingbird />
              Tweet
            </button>
          </div>
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 p-2 rounded-full hover:bg-slate-600 cursor-pointer">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="User-Image"
                  height={50}
                  width={50}
                />
              )}
              <div>
                <h3 className="text-xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-9 border-r-[0.2px] border-l-[0.2px] ml-55  border-gray-500">
          <div className="border-b border-gray-700 pt-4 pr-4 pb-2 pl-4  hover:bg-slate-800 cursor-pointer transition-all">
            <div className="grid grid-cols-12">
              <div className="col-span-1">
                {user?.profileImageURL && (
                  <Image
                    src={user?.profileImageURL}
                    alt="user-image"
                    height={50}
                    width={50}
                    className="rounded-full pr-2"
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent text-xl px-3 border-b border-slate-600 outline-none"
                  placeholder="Whats happening?"
                  rows={3}
                ></textarea>
                <div className=" flex justify-between items-center">
                  <PiImageSquare
                    onClick={handleSelectImage}
                    className="text-xl"
                  />
                  <button
                    onClick={handleCreateTweet}
                    className="bg-blue-700    rounded-full flex justify-start items-center gap-1 mr-5 text-sm  hover:bg-blue-600 px-2 py-1 cursor-pointer transition-all"
                  >
                    <GiHummingbird />
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
          {tweets?.map((tweet) =>
            tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
        </div>
        <div className="w-80 col-span-2">
          {!user && (
            <div className="bg-gray-500 p-5 rounded-lg">
              <h1 className="text-3xl ">New to X</h1>
              <GoogleLogin onSuccess={handleLoginWithGoolge} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
