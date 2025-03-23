/*
  Mention breifly to be used in the PostListPage.jsx in week2 you worked with 'Ashvin' to design this component.

  Mention this section is used to filter all the posts in diffrent catagory to make searching for specific content easy.

  Mention breifly you used your own code 'Search.jsx' in this component.

  At last explain the whole code breifly, and add some of the code(only this part: /------ ------/)
*/


//------------------------------------------
import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };
  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat:category,
      });
    }
  };
//------------------------------------------

  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
          />
          Newest
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="popular"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
          />
          Most Popular
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
          />
          Trending
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("general")}>All</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("story")}>Story</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("discussion")}>Discussion</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("conservation")}>Conservation</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("endangered-species")}>Endangered Species</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("wildlife-protection")}>Wildlife Protection</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("casestudy")}>Case Study</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("resources")}>Resources</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("research")}>Research</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("successstory")}>Success Story</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("events")}>Events</span>
      </div>

    </div>
  );
};

export default SideMenu;
