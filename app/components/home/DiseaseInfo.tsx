// app/components/home/DiseaseInfo.tsx
import Link from 'next/link';

const diseases = [
  {
    id: 1,
    name: 'ডেঙ্গু জ্বর',
    symptoms: ['জ্বর', 'মাথাব্যথা', 'চোখে ব্যথা', 'পেশীতে ব্যথা'],
    treatments: ['প্যারাসিটামল', 'পর্যাপ্ত পানি পান', 'বিশ্রাম']
  },
  {
    id: 2,
    name: 'সর্দি-কাশি',
    symptoms: ['নাক দিয়ে পানি পড়া', 'গলা ব্যথা', 'কাশি', 'হাঁচি'],
    treatments: ['ভাপ নেওয়া', 'গরম পানি পান', 'মধু ও আদা']
  }
];

const DiseaseInfo = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          সাধারণ রোগ ও চিকিৎসা
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diseases.map((disease) => (
            <div
              key={disease.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-800">
                {disease.name}
              </h3>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-gray-700">লক্ষণসমূহ:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {disease.symptoms.map((symptom, idx) => (
                    <li key={idx} className="text-gray-600">
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-gray-700">চিকিৎসা:</h4>
                <div className="flex flex-wrap gap-2">
                  {disease.treatments.map((treatment, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {treatment}
                    </span>
                  ))}
                </div>
              </div>
              
              <Link
                href={`/diseases/${disease.id}`}
                className="text-blue-600 hover:underline inline-flex items-center text-sm"
              >
                বিস্তারিত জানুন
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
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/diseases"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            সকল রোগের তালিকা
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiseaseInfo;