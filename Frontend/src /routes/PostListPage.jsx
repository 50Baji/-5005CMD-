/*
  2 week task, because you and cian have to finish 'PostlistItems' in week1 for you to import PostList
  , and you need to import 'SideMenu' after 'Abre' makes it in week2
  
  week1: say as we are using the react-router-dom to make diffrent routes(pages) you made this page for 
         users to easyly see all the diffrent posts in a single page and use search or sort functions.
         (explain the page structuer).
  week2: You imported  'SideMenu'(Mention 'Abre's name(you get more marks when you mention names of teammates))
         you used Tailwind to fit all the diffrent imports in your page this week
*/

import { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

const PostListPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <h1 className="mb-8 text-2xl">All posts...</h1>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden"
      >
        {open ? "Close" : "Filter or Search"}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row justify-between">
        <div className="">
          <PostList />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
