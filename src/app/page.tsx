
import BirthdayMonth from "@/components/home/birthdayMonth";
import CoverTop from "@/components/home/coverTop";
import Header from "@/components/home/header";
import ListRanking from "@/components/home/listRanking";

export default function Home() {
  return (
    <>
      <Header />
      <div className="mb-16">
      <CoverTop />
      <BirthdayMonth />
      <ListRanking />
    </div>
    </>
  );
}
