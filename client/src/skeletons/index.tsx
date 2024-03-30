export const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const RentalByBrandSkeleton = () => {
  return (
    <div className={`${shimmer} grid gap-4 grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 max-w-[1024px] mx-auto mt-10`}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={"relative rounded-md shadow-md h-[200px] w-full bg-gray-200"}
        >
          <div
            className={`${shimmer} absolute left-2 right-2 h-[40px] bottom-2 bg-gray-300 rounded-md shadow-md`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export const CarsToggleButtonSkeleton = () => {
  return (
    <div className="flex justify-center items-center gap-3 flex-wrap">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="w-[150px] h-[40px] shadow-md rounded-md bg-gray-300"
        />
      ))}
    </div>
  );
};

export const BlogArticleSkeleton = () => {
  return (
    <div
      className={`${shimmer} grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounde-md overflow-hidden mt-10`}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className={"flex flex-col gap-5 shadow-md rounded-md"}>
          <div className="h-[200px] w-full bg-gray-200"></div>
          <div className="h-[30px] w-[50%] bg-gray-200"></div>
          <div className="h-[50px] w-full bg-gray-200"></div>
          <div className="h-[50px] w-full bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
};

export const SmallArticleSkeleton = () => {
  return (
    <div className={`${shimmer} flex flex-col gap-3 rounded-md overflow-hidden`}>
      <div className="h-[200px] w-full bg-gray-200"></div>
      <div className="w-2/3 h-[20px] bg-gray-200"></div>
      <div className="w-full h-[40px] bg-gray-200"></div>
    </div>
  );
};

export const UserCommentSkeleton = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <div key={index} className={`${shimmer} w-full flex flex-col gap-3`}>
      <div className="h-[20px] w-2/3 bg-gray-200"></div>
      <div className="h-[40px] w-full bg-gray-200"></div>
    </div>
  ));
};


export const BlogPageSkeleton = () => {
  return (
    <div className={`${shimmer} flex flex-col gap-4`}>
      <div className="h-[500px] w-full rounded-md bg-gray-200">

      </div>
    </div>
  )
}

export const RecentPostsSkeleton = () => {
  return (
    <div className={`${shimmer} flex flex-col gap-3 py-2 px-2`}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex gap-3 justify-between items-center">
          <div className="h-[100px] w-[100px] rounded-full bg-gray-200 shadow-md"></div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="w-full h-[70px] bg-gray-200 shadow-md rounded-sm"></div>
            <div className="w-full h-[20px] bg-gray-200 shadow-md rounded-sm"></div>
          </div>
        </div>
      ))}
    </div>
  )
}


export const CarBrandsSkeleton = () => {
  return (
    <div className={`${shimmer} w-full px-4`}>
      <div className={`${shimmer} sm:h-[400px] h-[250px] w-full bg-gray-200 flex flex-col items-center justify-end gap-4 px-2 py-2`}>
        <div className="sm:w-1/2 w-full h-[50px] bg-gray-300 rounded-md shadow-md"></div>
        <div className="sm:w-1/3 w-full h-[30px] bg-gray-300 rounded-md shadow-md"></div>
      </div>
      <div className={`${shimmer} grid gap-4 grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-[1200px] mx-auto my-10`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="w-full h-[200px] rounded-md shadow-md bg-gray-200" key={index}></div>
        ))}
      </div>
    </div>
  )
}

export const AllCarsPageSkeleton = () => {
  return Array.from({ length: 9 }).map((_, index) => (
    <div key={index} className={`${shimmer} relative p-2 bg-gray-200 h-[250px] rounded-md`}>
      <div className="h-[40px] shadow-md rounded-md absolute bottom-6 left-2 right-2 bg-gray-300"></div>
    </div>
  ))
}