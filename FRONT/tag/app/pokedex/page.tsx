"use client";
import { useState } from "react";
export default function Pokedex() {
  return (
    <div className="w-full">
      <div id="rechercher">
        <input
          className="barre_recherche"
          type="text"
          id="searchInput"
          placeholder="Rechercher"
        />
      </div>

      <div className="list-pokedex h-screen overflow-y-auto pb-20">
        <div className="pokedex_profil">
          <img className="photo_profil_pokedex" src="Evann.png" alt="profil" />
          <div>
            <h1>Evann Chatraix</h1>
            <h2>3min</h2>
          </div>
        </div>
        <div className="pokedex_profil">
          <img className="photo_profil_pokedex" src="Bryan.webp" alt="profil" />
          <div>
            <h1>Bryan Loukili</h1>
            <h2>4min</h2>
          </div>
        </div>
        <div className="pokedex_profil">
          <img
            className="photo_profil_pokedex"
            src="photo_profil_pro.jpg"
            alt="profil"
          />
          <div>
            <h1>Théo Prémartin</h1>
            <h2>10min</h2>
          </div>
        </div>
        <div className="pokedex_profil">
          <img className="photo_profil_pokedex" src="gael.webp" alt="profil" />
          <div>
            <h1>Gael Abongi</h1>
            <h2>1jour</h2>
          </div>
        </div>
        <div className="pokedex_profil">
          <img
            className="photo_profil_pokedex"
            src="jeremie.webp"
            alt="profil"
          />
          <div>
            <h1>Jeremie Zarka</h1>
            <h2>3jours</h2>
          </div>
        </div>
        <div className="pokedex_profil">
          <img className="photo_profil_pokedex" src="lucas.webp" alt="profil" />
          <div>
            <h1>Lucas Felli</h1>
            <h2>1sem</h2>
          </div>
        </div>
        <div className="pokedex_profil">
          <img
            className="photo_profil_pokedex"
            src="valentin.jpg"
            alt="profil"
          />
          <div>
            <h1>Valentin Bonnet</h1>
            <h2>2sem</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
