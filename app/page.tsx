import Image from "next/image";
import SearchBar from "./components/search/SearchBar";
import TopTreatments from "./components/treatments/TopTreatments";

export default function Home() {
  return (
    <div className="h-[1000px]">
      <SearchBar />
      <TopTreatments />
    </div>
  );
}
