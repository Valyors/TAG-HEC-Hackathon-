"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

const ProfileCard = ({ people }: { people: any }) => {
  return (
    <div className="pokedex_profil">
      <img className="photo_profil_pokedex" src="Evann.png" alt="profil" />
      <div>
        <h1>{people.address.slice(0, 5)}...</h1>
        <h2>{people.balance} USD</h2>
        <h2>{people.tx_out} TX OUT</h2>
      </div>
    </div>
  );
};
export default ProfileCard;
