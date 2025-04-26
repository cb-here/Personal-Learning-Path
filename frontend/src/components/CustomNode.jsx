import React from 'react';
import { Handle } from '@xyflow/react';

const CustomNode = ({ data, selected }) => {
  return (
    <div className={`
      px-4 py-3 rounded-xl 
      bg-white dark:bg-gray-800
      border-2 border-blue-500
      shadow-md hover:shadow-lg 
      min-w-[120px] text-center
      relative
      transition-all duration-300 ease-in-out
      transform hover:-translate-y-1
      hover:ring-2 hover:ring-blue-200 dark:hover:ring-blue-800
      group
    `}>
      <Handle 
        type="source" 
        position="right" 
        className="
          w-3 h-3 bg-blue-500 border-2 border-white dark:border-gray-800
          transition-all duration-300 ease-in-out
          group-hover:scale-110 group-hover:bg-blue-600
        "
      />
      <div className="
        font-medium text-gray-800 dark:text-gray-100
        transition-all duration-200 ease-in-out
        group-hover:text-blue-600 dark:group-hover:text-blue-400
      ">
        {data.label}
      </div>
      <Handle 
        type="target" 
        position="left" 
        className="
          w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800
          transition-all duration-300 ease-in-out
          group-hover:scale-110 group-hover:bg-green-600
        "
      />
    </div>
  );
};

export default CustomNode;