import MainContent from "./MainContent";
import MainSidebar from "./MainSidebar";

export default function Main() {
  return (
    <div className="w-full h-full flex gap-4">
      <MainSidebar />
      <MainContent />
    </div>
  );
}
