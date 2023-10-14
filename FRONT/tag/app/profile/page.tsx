import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
  return (
    <div>
      <div className="pokedex_profil">
        <img className="photo_profil_pokedex" src="Laury.webp" alt="profil" />
        <div>
          <h1>Laury Jacot</h1>
          <h2>Web3 Marketing</h2>
          <h3>tz1abCD567....</h3>
        </div>
      </div>

      <div className="nav-web">
        <span className="web2">Web2</span>
        <span className="web3">Web3</span>
      </div>
    </div>
  );
}
