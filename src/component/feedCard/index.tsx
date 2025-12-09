import React from "react";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { GoUpload } from "react-icons/go";

const FeedCard: React.FC = () => {
  return (
    <div className="border-b border-gray-700 pt-4 pr-4 pb-2 pl-4  hover:bg-slate-800 cursor-pointer transition-all">
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          <Image
            src="https://avatars.githubusercontent.com/u/187512332?v=4"
            alt="user-image"
            height={50}
            width={50}
            className="rounded-full pr-2"
          />
        </div>
        <div className="col-span-11">
          <h5 className="">Rajnish Raj</h5>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam,
            asperiores. Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Ducimus, nam.
          </p>
          <div className="flex justify-between mt-2  items-center w-[85%] ">
            <div>
              <FaRegComment />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <CiHeart />
            </div>
            <div>
              <GoUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
