// app/components/home/HealthTips.tsx
import Link from 'next/link';
import { FaLeaf, FaBookMedical, FaCalendarAlt } from 'react-icons/fa';

const tips = [
  {
    id: 1,
    title: 'ডেঙ্গু প্রতিরোধে করণীয়',
    excerpt: 'ডেঙ্গু জ্বর প্রতিরোধে ঘরবাড়ি পরিষ্কার রাখুন এবং মশারি ব্যবহার করুন।',
    icon: <FaLeaf className="text-green-500 text-2xl" />,
    category: 'ঋতুভিত্তিক'
  },
  {
    id: 2,
    title: 'ওষুধ সেবনের সঠিক নিয়ম',
    excerpt: 'কোন ওষুধ খালি পেটে খাবেন, কোনটা খাবারের পর - জেনে নিন সঠিক নিয়ম।',
    icon: <FaBookMedical className="text-blue-500 text-2xl" />,
    category: 'পরামর্শ'
  }
];

const HealthTips = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Health Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">{tip.icon}</div>
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {tip.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                  <p className="text-gray-600 mb-4">{tip.excerpt}</p>
                  <Link
                    href={`/health-tips/${tip.id}`}
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthTips;