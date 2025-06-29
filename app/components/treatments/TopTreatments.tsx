import Image from 'next/image';
import React from 'react';

const treatments = [
  {
    id: 1,
    name: 'Hair Loss',
    image: '/treatments/hair-loss.PNG',
  },
  {
    id: 2,
    name: 'Weight Loss',
    image: '/treatments/weight-loss.PNG',
  },
  {
    id: 3,
    name: 'Migraines',
    image: '/treatments/migraines.PNG',
  },
  {
    id: 4,
    name: 'Gastric',
    image: '/gastric.PNG',
  },
];

const TopTreatments = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        Top Treatments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {treatments.map((treatment) => (
          <div
          key={treatment.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-200 hover:border-2 hover:border-blue-500 cursor-pointer"
        >
          {/* Top 3/4 Image */}
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={treatment.image}
              alt={treatment.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        
          {/* Bottom 1/4 Text */}
          <div className="py-4 px-3 flex items-center justify-center h-[25%] min-h-[64px] bg-gray-50">
            <h3 className="text-gray-800 text-lg font-semibold text-center">
              {treatment.name}
            </h3>
          </div>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default TopTreatments;
