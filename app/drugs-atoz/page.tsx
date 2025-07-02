// app/drugs-atoz/page.tsx

import { Product } from '@/data/drugInternationalProducts';
import Link from 'next/link';
import Image from 'next/image';
import ClientSizeImage from './ClientSizeImage';

const ITEMS_PER_PAGE = 10;

async function getDrugs(): Promise<Product[]> {
  const { products } = await import('@/data/drugInternationalProducts');
  return products;
}


export default async function DrugsAToZ({ searchParams }: any) {
  const pageParam = (await searchParams)?.page;
  const currentPage = pageParam && !Array.isArray(pageParam) ? parseInt(pageParam) : 1;

  const allDrugs = await getDrugs();
  const sortedDrugs = [...allDrugs].sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(sortedDrugs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDrugs = sortedDrugs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Medicines A-Z</h1>

      {/* Grid of drugs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {paginatedDrugs.map((drug) => (
          <Link
            key={drug.id}
            href={`/drugs-atoz/${drug.id}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 bg-gray-100 relative">
              {drug.images?.[0] ? (
                <ClientSizeImage drug={drug} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{drug.name}</h2>
              {drug.strength && (
                <p className="text-sm text-gray-600 mt-1">{drug.strength}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-8 gap-2 text-sm sm:text-base">
          {currentPage > 1 && (
            <Link
              href={`/drugs-atoz?page=${currentPage - 1}`}
              className="px-3 py-2 border rounded hover:bg-gray-100"
            >
              Previous
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`/drugs-atoz?page=${pageNum}`}
              className={`px-3 py-2 rounded border ${
                currentPage === pageNum
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </Link>
          ))}

          {currentPage < totalPages && (
            <Link
              href={`/drugs-atoz?page=${currentPage + 1}`}
              className="px-3 py-2 border rounded hover:bg-gray-100"
            >
              Next
            </Link>
          )}
        </div>
      )}

      <p className="text-center text-gray-500 mt-4 text-sm">
        Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedDrugs.length)} of {sortedDrugs.length} medicines
      </p>
    </div>
  );
}
