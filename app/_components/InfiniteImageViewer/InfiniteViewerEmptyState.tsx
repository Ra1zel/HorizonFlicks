import React from "react";

const InfiniteViewerEmptyState = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center mt-10 text-xl font-bold'>
      <span>No movies found</span>
      <span>Did you make a typo ?</span>
    </div>
  );
};

export default InfiniteViewerEmptyState;
