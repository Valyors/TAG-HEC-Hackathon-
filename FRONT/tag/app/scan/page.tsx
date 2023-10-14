"use client"
import React,{useContext,useEffect,useState} from 'react';
import {PeopleContext} from '@/components/people-provider';
import {AiOutlineScan} from 'react-icons/ai'
import QRCode from "react-qr-code";
import {Html5QrcodeScanner} from 'html5-qrcode'

const page = () => {
    const [scanResult, setScanResult] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [loading, setLoading] = useState(true);

    //QR Code scanner
    useEffect(() => {
      let scanner = null; // Declare the scanner variable outside the if statement

      if (scanning) {
        scanner = new Html5QrcodeScanner('reader', {
          qrbox: {
            width: 500,
            height: 500
          },
          fps: 10,
        });
        scanner.render(success, error);
        function success(result){
            setScanResult(result);
        }
        function error(err){
            console.warn(err);
        }
      }
      return () => {
        if (scanner) {
          scanner.clear(); // Stop the scanner
        }
      };
    }, [scanning]);

    //Fetch data
    useEffect(() => {
        if(scanResult){
          fetchData(scanResult);
          setIsOpen(true);
        }
    }, [scanResult]);

    //Api call + creation of new people
    const fetchData = async (add:string) => {
        try {
          const response = await fetch("https://api.tzstats.com/explorer/account/"+add);
          const jsonData = await response.json();
          const sent_tx = await fetch("https://api.tzkt.io/v1/operations/transactions?limit=1000&sender="+add);
          const jsonDataSent = await sent_tx.json();
          const received_tx = await fetch("https://api.tzkt.io/v1/operations/transactions?limit=1000&target="+add);
          const jsonDataReceived = await received_tx.json();
          const all_tx = await fetch("https://api.tzkt.io/v1/operations/transactions?limit=1000&anyof.sender.target="+add);
          const jsonDataAll = await all_tx.json();          
          setPeopleArray([...peopleArray,
            {
              id: peopleArray.length + 1,
              address: jsonData.address,
              balance: Math.round(jsonData.spendable_balance*0.62), 
              tx_out: jsonData.n_tx_out,
              tx_in: jsonData.n_tx_in,
              tx_vol: Math.round((jsonData.total_received + jsonData.total_sent)*0.62),
              fees: (jsonData.total_fees_paid)*0.62,
              burned: (jsonData.total_burned)*0.62,
              creation: jsonData.first_seen_time,
              last_seen: jsonData.last_seen_time,
              tx_out_list: jsonDataSent.map(item => ({
                address: item.target.address,
                amount: item.amount,
                timestamp: item.timestamp
              })),
              tx_in_list: jsonDataReceived.map(item => ({
                address: item.sender.address,
                amount: item.amount,
                timestamp: item.timestamp
              })),
              tx_all_list: jsonDataAll.map(item => ({
                address: item.sender.address,
                amount: item.amount,
                timestamp: item.timestamp
              })),
            }
          ]);
          setLoading(true)
        } catch (error) {
          alert('Error fetching data:', error);
          setLoading(true)
        }
    };

    //Pop Up to add note
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
    const handleSubmit = () => {
      const newPeople = peopleArray[peopleArray.length - 1];
      const newUpdtaedPeople = {...newPeople, note: inputValue};
      peopleArray[peopleArray.length - 1] = newUpdtaedPeople;
      setIsOpen(false);
    };

    //QR Code input
    const [info, setInfo] = useState("");
    async function changeInfo(e) {
        setInfo(e.target.value);
    }
  return (
    <div className="h-[95vh] w-full border-solid flex justify-center items-center flex-col relative">
      {!scanning && (
        <>
        <div className="h-[30vh] aspect-square mb-6">
          <QRCode
            size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={info}
                viewBox={`0 0 256 256`}
                className="h-[40vh] flex justify-center items-center"
            />
        </div></>
      )}
      {scanning && (
        <div id="reader" className="w-screen text-white"></div>
      )}
      <div className="flex justify-center">
        <button className="scan-btn mx-auto"  onClick={() => scanning ? setScanning(false): setScanning(true)}>
          {scanning ? <>QRCode</>:<>TAG</>}
        </button>
      </div>
    </div>
      
  )
}

export default page;