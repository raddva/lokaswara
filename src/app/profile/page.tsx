import Navbar from "@/components/common/app-navbar";
import ProfileSection from "./_components/profile";

export const metadata = {
  title: 'LokaSwara | Profil Kelompok',
};

export default function ProfilePage() {
  return (
    <main>
      <Navbar />
      <ProfileSection />
    </main>
  )
}