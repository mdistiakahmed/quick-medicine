// app/components/home/PopularMedicines.tsx
import Link from 'next/link';
import { FaTablets, FaSyringe, FaHeartbeat } from 'react-icons/fa';

const medicines = [
  { id: 1, name: 'Napa', category: 'Pain Relief', price: '৳2.00' },
  { id: 2, name: 'Ace', category: 'Pain Relief', price: '৳4.00' },
  { id: 3, name: 'Seclo', category: 'Antacid', price: '৳8.00' },
  { id: 4, name: 'Zimax', category: 'Antibiotic', price: '৳25.00' },
];

const PopularMedicines = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          জনপ্রিয় ওষুধ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicines.map((medicine) => (
            <div
              key={medicine.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{medicine.name}</h3>
                <FaTablets className="text-blue-500 text-xl" />
              </div>
              <p className="text-gray-600 mb-2">{medicine.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-medium">{medicine.price}</span>
                <Link
                  href={`/medicines/${medicine.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  বিস্তারিত
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/drugs-atoz"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            See All Medicine
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularMedicines;