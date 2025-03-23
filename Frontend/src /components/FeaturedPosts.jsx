
/*
  This is a big task split into 4 weeks(because you need to import/use fiels others are working on):
  • week1: Mention after 'react-router-dom' was setuped and all the routes of the diffrent pages were made,
           you started working on this component for the 'Home-page' route. Based on the UI design you made
           place holders(the containeres where the img and texts will be).  (you have 2 more tasks this week so keep things lite)
  
  • week2: Mention you imported "@tanstack/react-query' and laid the foundation for backend to be connected
           later(use Gpt to understand what laing the foundation of this code means with out connecting backend)
           refference: https://tanstack.com/query/latest/docs/framework/react/overview
           say you followed the official documentation, and add a youtube vedio guid link if you want.
           add some of the line where 'useQuery' is used in the report.
           
  • week3: This week is all about styling. Mention you used 'tailwindCss' to style the componet to match
           with the rest of the home page. Also, you used 'timeago.js' to track when the posts are actualy made.
           you can add the lines where  'format' is used in the report.

  • week4: Mention you Imported 'Image' from Image.jsx filled up the place holders you creted on week1,(copy paste 
            both the image.jsx and this code in gpt and understand what, and how you field up the space holders).

  
  
    It is nesesury that you keep mentioning the scrum-masters name of each week(say i was asigned this task by 
    'Name' of that weeks scrum master)          
*/

import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;

  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return;
  }

  return (
    <div className="mt-4 flex flex-col lg:flex-row gap-8">
      {/* First */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* image */}
        {posts[0].img && <Image
          src={posts[0].img}
          className="rounded-3xl object-cover"
          w="895"
        />}
        {/* details */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-blue-800 lg:text-lg">{posts[0].category}</Link>
          <span className="text-gray-500">{format(posts[0].createdAt)}</span>
        </div>
        {/* title */}
        <Link
          to={posts[0].slug}
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          {posts[0].title}
        </Link>
      </div>
      {/* Others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* second */}
        {posts[1] && <div className="lg:h-1/3 flex justify-between gap-4">
          {posts[1].img && <div className="w-1/3 aspect-video">
            <Image
              src={posts[1].img}
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>}
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link className="text-blue-800">{posts[1].category}</Link>
              <span className="text-gray-500 text-sm">{format(posts[1].createdAt)}</span>
            </div>
            {/* title */}
            <Link
              to={posts[1].slug}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              {posts[1].title}
            </Link>
          </div>
        </div>}
        {/* third */}
        {posts[2] && <div className="lg:h-1/3 flex justify-between gap-4">
          {posts[2].img && <div className="w-1/3 aspect-video">
            <Image
              src={posts[2].img}
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>}
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">03.</h1>
              <Link className="text-blue-800">{posts[2].category}</Link>
              <span className="text-gray-500 text-sm">{format(posts[2].createdAt)}</span>
            </div>
            {/* title */}
            <Link
              to={posts[2].slug}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              {posts[2].title}
            </Link>
          </div>
        </div>}
        {/* fourth */}
        {posts[3] && <div className="lg:h-1/3 flex justify-between gap-4">
          {posts[3].img && <div className="w-1/3 aspect-video">
            <Image
              src={posts[3].img}
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>}
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">04.</h1>
              <Link className="text-blue-800">{posts[3].category}</Link>
              <span className="text-gray-500 text-sm">{format(posts[3].createdAt)}</span>
            </div>
            {/* title */}
            <Link
              to={posts[3].slug}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              {posts[3].title}
            </Link>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default FeaturedPosts;
