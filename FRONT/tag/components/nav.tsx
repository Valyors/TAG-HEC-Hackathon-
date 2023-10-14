"use client";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();

  return (
    <nav className="profile-nav">
      <a onClick={() => router.push("/pokedex")} className="cursor-pointer">
        <img className="nav-icon" src="pokedex-navbar.png" alt="" />
      </a>
      <a onClick={() => router.push("/scan")} className="cursor-pointer">
        <img className="nav-icon" src="navbar_qr-code.png" alt="" />
      </a>
      <a onClick={() => router.push("/profile")} className="cursor-pointer">
        <img className="nav-icon" src="navbar_profil.png" alt="" />
      </a>
    </nav>
  );
}
