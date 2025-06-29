import Image from "next/image";
import SearchBar from "./components/search/SearchBar";
import TopTreatments from "./components/treatments/TopTreatments";
import PopularMedicines from "./components/home/PopularMedicines";
import HealthTips from "./components/home/HealthTips";
import DiseaseInfo from "./components/home/DiseaseInfo";
import EmergencyContacts from "./components/home/EmergencyContacts";

export default function Home() {
  return (
    <div className="">
      <SearchBar />
      <TopTreatments />
      <PopularMedicines />
      <HealthTips />
      <DiseaseInfo />
      <EmergencyContacts />
    </div>
  );
}
