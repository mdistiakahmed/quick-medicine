// app/components/home/EmergencyContacts.tsx
import { FaAmbulance, FaHospital, FaPhoneAlt } from 'react-icons/fa';

const emergencyContacts = [
  {
    id: 1,
    name: 'ন্যাশনাল ইমার্জেন্সি সার্ভিস',
    number: '999',
    type: 'emergency',
    description: 'সকল ধরনের জরুরী সেবার জন্য'
  },
  {
    id: 2,
    name: 'স্বাস্থ্য বাতায়ন',
    number: '16263',
    type: 'health',
    description: 'স্বাস্থ্য সংক্রান্ত পরামর্শের জন্য'
  },
  {
    id: 3,
    name: 'ডেঙ্গু হটলাইন',
    number: '16263',
    type: 'dengue',
    description: 'ডেঙ্গু সম্পর্কিত জরুরী তথ্য'
  }
];

const EmergencyContacts = () => {
  return (
    <section className="py-12 bg-red-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-red-800">
          জরুরী যোগাযোগ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {contact.type === 'emergency' && (
                  <FaAmbulance className="text-red-600 text-2xl" />
                )}
                {contact.type === 'health' && (
                  <FaHospital className="text-blue-600 text-2xl" />
                )}
                {contact.type === 'dengue' && (
                  <FaPhoneAlt className="text-green-600 text-2xl" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{contact.name}</h3>
              <p className="text-gray-600 mb-4">{contact.description}</p>
              <a
                href={`tel:${contact.number}`}
                className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors w-full"
              >
                <FaPhoneAlt className="mr-2" />
                {contact.number}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmergencyContacts;