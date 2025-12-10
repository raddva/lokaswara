import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="backdrop-blur-xl h-screen px-32 py-10">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <img src="/assets/logo_white_wtext.svg" alt="logo" width={70} />
          {/* <h1 className="text-2xl font-bold">LokaSwara</h1> */}
        </div>
        <div className="flex gap-5 items-center">
          <Instagram height={30} width={30} />
          <Mail height={30} width={30} />
        </div>
      </div>
      <div>

      </div>
      <div>

      </div>
      <hr className="h-2" />
      <h5>&copy; 2025 LokaSwara. All rights reserved</h5>
    </footer>
  )
}