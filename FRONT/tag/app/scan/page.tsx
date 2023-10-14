"use client";
import { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Html5QrcodeScanner } from "html5-qrcode";
import { ProviderContext } from "@/components/provider";
import { newScan } from "@/lib/addData";

const page = () => {
  const { userProfile } = useContext(ProviderContext);
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  //QR Code scanner
  // useEffect(() => {
  //   let scanner = null; // Declare the scanner variable outside the if statement

  //   if (scanning) {
  //     scanner = new Html5QrcodeScanner("reader", {
  //       qrbox: {
  //         width: 1000,
  //         height: 1000,
  //       },
  //       fps: 60,
  //     });
  //     scanner.render(success, error);
  //     function success(result) {
  //       setScanResult(result);
  //     }
  //     function error(err) {
  //       console.warn(err);
  //     }
  //   }
  //   return () => {
  //     if (scanner) {
  //       scanner.clear(); // Stop the scanner
  //     }
  //   };
  // }, [scanning]);

  //Fetch data
  useEffect(() => {
    if (scanResult) {
      fetchData(scanResult);
      setIsOpen(true);
    }
  }, [scanResult]);

  //Api call + creation of new people
  const fetchData = async (url: string) => {
    console.log(url);
    const address = url.split("/").pop();
    await newScan(userProfile!.address, address!);
  };

  //Pop Up to add note
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="h-[95vh] w-full border-solid flex justify-center items-center flex-col relative">
      {!scanning && (
        <>
          <div className="h-[30vh] aspect-square mb-6">
            {userProfile && (
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={
                  process.env.NEXT_PUBLIC_URL +
                  "profile/" +
                  userProfile?.address
                }
                viewBox={`0 0 256 256`}
                className="h-[40vh] flex justify-center items-center"
              />
            )}
          </div>
        </>
      )}
      {scanning && (
        <div id="reader" className="w-screen text-white reader"></div>
      )}
      <div className="flex justify-center">
        <button
          className="scan-btn mx-auto"
          onClick={() => (scanning ? setScanning(false) : setScanning(true))}
        >
          {scanning ? <>QRCode</> : <>TAG</>}
        </button>
      </div>
    </div>
  );
};

export default page;
