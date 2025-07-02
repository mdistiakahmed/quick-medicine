import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/drugInternationalProducts';

async function getDrug(id: string): Promise<Product | undefined> {
  // In a real app, you might fetch this from an API
  const { products } = await import('@/data/drugInternationalProducts');
  return products.find(drug => drug.id === id);
}

export default async function DrugDetailPage({ params }: any) {
  const drug = await getDrug((await params).id);

  if (!drug) {
    notFound();
  }

  // Function to safely render HTML content
  const renderDescription = (html: string) => {
    return { __html: html };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/drugs-atoz" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Medicines A-Z
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Drug Image */}
          <div className="md:w-1/3 bg-gray-100 p-6 flex items-center justify-center">
            {drug.images && drug.images[0] ? (
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={drug.images[0]}
                  alt={drug.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-64 md:h-80 flex items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>
          
          {/* Drug Details */}
          <div className="p-6 md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{drug.name}</h1>
            
            {drug.strength && (
              <p className="text-xl text-gray-700 mb-4">
                <span className="font-semibold">Strength:</span> {drug.strength}
              </p>
            )}
            
            {drug.uom && (
              <p className="text-lg text-gray-600 mb-6">
                <span className="font-semibold">Unit of Measure:</span> {drug.uom}
              </p>
            )}
            
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <div 
                className="text-gray-700"
                dangerouslySetInnerHTML={renderDescription(drug.description)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

