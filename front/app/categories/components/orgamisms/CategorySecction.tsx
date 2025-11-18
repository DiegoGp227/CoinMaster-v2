import ActionDiv from "../molecules/ActionsDiv";

interface ICategorySecction {
  title: string;
  subCategoryTitle: string;
}

export default function CategorySecction({
  title,
  subCategoryTitle,
}: ICategorySecction) {
  return (
    <>
    {}
      <div className="w-[400px] bg-black p-5 border-2 border-black hover:border-white transition-all duration-500 group hover:shadow-[0_0_10px_2px_rgba(156,163,175,0.3)] shadow-lg">
        <div className="flex justify-between mb-5">
          <h2 className="text-4xl font-bold text-soft-gray group-hover:text-white transition-all duration-500">
            {title}
          </h2>
          <ActionDiv />
        </div>
        <div className="flex justify-between my-5">
          <div>
            <p className="text-soft-gray group-hover:text-white transition-all duration-500">
              {subCategoryTitle}
            </p>
          </div>
          <ActionDiv />
        </div>
      </div>
    </>
  );
}
