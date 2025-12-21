import React from "react";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { Tweet } from "../../../gql/graphql";

interface FeedCardProps {
  data: Tweet

}

const FeedCard: React.FC <FeedCardProps> = (props) => {
  const {data} = props
  return (
    <div className="border-b border-gray-700 pt-4 pr-4 pb-2 pl-4  hover:bg-slate-800 cursor-pointer transition-all">
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          {data.author?.profileImageURL && <Image
            src={data.author.profileImageURL}
            alt="user-image"
            height={50}
            width={50}
            className="rounded-full pr-2"
          />}
        </div>
        <div className="col-span-11">
          <h5 >{data.author?.firstName} {data.author?.lastName}</h5>
          <p>
           {data.content}
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
