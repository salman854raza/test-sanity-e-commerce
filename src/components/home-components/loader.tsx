import React from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';

function Loader() {
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-200'>
      <div className='relative'>
        {/* Outer spinning border (represents a clothing tag or hanger) */}
        <div className='animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-pink-500 border-opacity-70'></div>
        
        {/* Inner slower spinning border (adds depth and elegance) */}
        <div className='absolute top-0 left-0 h-28 w-28 rounded-full border-t-4 border-b-4 border-transparent animate-spin-slow border-pink-300 border-opacity-50'></div>
        
        {/* Center icon (shopping bag with a subtle pulse animation) */}
        <div className='absolute inset-0 flex items-center justify-center text-pink-600'>
          <div className="relative">
            <ShoppingBag size={48} className="opacity-90 animate-pulse" />
            <Loader2 size={20} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-700 animate-spin" />
          </div>
        </div>
        
        {/* Text below the loader */}
        <div className='absolute top-32 left-1/2 transform -translate-x-1/2 text-center text-pink-700 font-medium text-lg mt-4'>
          Loading your fashion journey...
        </div>
      </div>
    </div>
  );
}

export default Loader;






// import React from 'react';
// import { Cloud } from 'lucide-react';

// function Loader() {
//   return (
//     <div className='flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300'>
//       <div className='relative'>
//         {/* Outer spinning border */}
//         <div className='animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-yellow-500 border-opacity-70'></div>
        
//         {/* Inner slower spinning border */}
//         <div className='absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-transparent animate-spin-slow border-yellow-300 border-opacity-50'></div>
        
//         {/* Center icon */}
//         <div className='absolute inset-0 flex items-center justify-center text-black'>
//           <Cloud size={40} className="opacity-90 animate-pulse" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Loader;

