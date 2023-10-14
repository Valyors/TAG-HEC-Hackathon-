"use client";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export default function Scan() {
  const [data, setData] = useState("No resul t");

  return (
    <>
      <QrScanner
        onDecode={(result) => console.log(result)}
        onError={(error) => console.log(error?.message)}
      />
    </>
  );
}
