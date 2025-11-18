import { AiOutlinePlus } from "react-icons/ai";
import NewCategoryButton from "../atoms/NewCategoryButton";
import TabsOrganism from "./TabsOrganism";

export default function CategoriesOrganisms() {
  return (
    <>
      <div className="flex justify-end my-4 mx-10">
        <NewCategoryButton />
      </div>
      <div className="flex justify-center my-4 mx-10">
        <TabsOrganism />
      </div>
    </>
  );
}
