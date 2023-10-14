"use client";
import React, { useEffect, useState, useContext } from "react";
import { Chart, registerables } from "chart.js";
import { Bar, Pie, PolarArea, Line, Doughnut } from "react-chartjs-2";

const Stat = ({ address }: { address: string }) => {
  const [data, setData] = useState<any>({});
  useEffect(() => {
    fetchData(address);
  }, []);
  const fetchData = async (add: string) => {
    try {
      const response = await fetch(
        "https://api.tzstats.com/explorer/account/" + add
      );
      const accountData = await response.json();
      const num_contracts = await fetch(
        "https://api.tzkt.io/v1/accounts/" + add
      );
      const nContractsData = await num_contracts.json();
      const sent_tx = await fetch(
        "https://api.tzkt.io/v1/operations/transactions?limit=1000&sender=" +
          add
      );
      const sentTxData = await sent_tx.json();
      const received_tx = await fetch(
        "https://api.tzkt.io/v1/operations/transactions?limit=1000&target=" +
          add
      );
      const receivedtTxData = await received_tx.json();
      const all_tx = await fetch(
        "https://api.tzkt.io/v1/operations/transactions?limit=10&anyof.sender.target=" +
          add
      );
      const allTxData = await all_tx.json();
      setData({
        balance: Math.round(accountData.spendable_balance * 0.62),
        contracts: nContractsData.numContracts,
        tx_sent: accountData.n_tx_out,
        tx_received: accountData.n_tx_in,
        tx_vol: Math.round(
          (accountData.total_received + accountData.total_sent) * 0.62
        ),
        fees: accountData.total_fees_paid * 0.62,
        burned: accountData.total_burned * 0.62,
        creation: accountData.first_seen_time,
        last_seen: accountData.last_seen_time,
        tx_sent_list: sentTxData.map((item: any) => ({
          address: item.target.address,
          amount: item.amount,
          timestamp: item.timestamp,
        })),
        tx_received_list: receivedtTxData.map((item: any) => ({
          address: item.sender.address,
          amount: item.amount,
          timestamp: item.timestamp,
        })),
        tx_all_list: allTxData.map((item: any) => ({
          address_sender: item.sender.address,
          address_target: item.target.address,
          amount: item.amount,
          timestamp: item.timestamp,
        })),
      });
    } catch (error) {
      alert(error);
    }
  };

  Chart.register(...registerables);
  //Data pour les ratios de tx
  const transactions = {
    labels: ["N° Sent Tx", "N° Received Tx"],
    datasets: [
      {
        label: "Tx Data",
        data: [data.tx_sent, data.tx_received],
        backgroundColor: ["rgb(234, 49, 198,0.8)", "rgb(73, 66, 228,0.8)"],
        hoverOffset: 4,
      },
    ],
  };

  const [dates, setDates] = useState<any>([]);
  const [sentCounts, setSentCounts] = useState<any>([]);
  const [receivedCounts, setReceivedCounts] = useState<any>([]);
  useEffect(() => {
    const datesArray: any[] = [];
    const sentArrayCounts: any[] = [];
    const receivedArrayCounts: any[] = [];
    if (data && data.tx_all_list) {
      data.tx_all_list.map((item: any) => {
        const year = new Date(item.timestamp).getFullYear();
        const month = new Date(item.timestamp).getMonth();
        const key = `${year}-${month + 1}`;
        if (key !== dates[dates.length - 1]) {
          datesArray.push(key);
          sentArrayCounts.push(0);
          receivedArrayCounts.push(0);
          if (item.address_sender === address) {
            sentArrayCounts[sentArrayCounts.length - 1] += 1;
          } else {
            receivedArrayCounts[receivedArrayCounts.length - 1] += 1;
          }
        } else {
          if (item.address_sender === address) {
            sentArrayCounts[sentArrayCounts.length - 1] += 1;
          } else {
            receivedArrayCounts[receivedArrayCounts.length - 1] += 1;
          }
        }
      });
    }
    setDates(datesArray);
    setSentCounts(sentArrayCounts);
    setReceivedCounts(receivedArrayCounts);
  }, [data]);
  const txHistory = {
    labels: dates,
    datasets: [
      {
        label: "Send Activity",
        data: sentCounts,
        backgroundColor: "rgb(234, 49, 198,0.2)", // Set your preferred color
        borderColor: "rgb(234, 49, 198,0.8)", // Set your preferred border color
        borderWidth: 1,
        fill: {
          target: "origin",
          above: "rgb(234, 49, 198,0.2)", // Area will be red above the origin
          below: "rgb(234, 49, 198,0.8)", // And blue below the origin
        },
      },
      {
        label: "Received Activity",
        data: receivedCounts,
        backgroundColor: "rgb(73, 66, 228,0.2)", // Set your preferred color
        borderColor: "rgb(73, 66, 228,1)", // Set your preferred border color
        borderWidth: 1,
        fill: {
          target: "origin",
          above: "rgb(73, 66, 228,0.2)", // Area will be red above the origin
          below: "rgb(73, 66, 228,1)", // And blue below the origin
        },
      },
    ],
  };

  const contracts = {
    labels: [
      "tz2K...Js",
      "tz1T...Rz",
      "tz1R...vj",
      "tz1T...Rz",
      "tz1R...vj",
      "tz8S...Yt",
    ],
    datasets: [
      {
        label: "Tx Data",
        data: [5, 2, 1, 3, 2, 4],
        hoverOffset: 4,
        backgroundColor: [
          "rgb(234, 49, 198,0.8)",
          "rgb(73, 66, 228,0.8)",
          "#62CDFF",
          "#3C79F5",
          "#B1AFFF",
          "#C8FFD4",
        ],
      },
    ],
  };

  return (
    <>
      <div className=" mt-4">
        <div className="flex justify-around items-center text-white">
          <div className="h-[8vh] w-[30vw] border-solid border-white border-2 rounded-xl bg-[#4942e4] opacity-75 m-1 relative">
            <div className="text-xs absolute top-[10%] left-[5%]">
              Contracts Deployed
            </div>
            <div className="text-xl absolute bottom-[10%] right-[10%]">
              {data.contracts}
            </div>
          </div>
          <div className="h-[8vh] w-[30vw] border-solid border-white border-2 rounded-xl bg-[#4942e4] opacity-75 m-1 relative">
            <div className="text-xs absolute top-[10%] left-[5%]">
              Fees Used
            </div>
            <div className="text-xl absolute bottom-[10%] right-[10%]">
              45.32 <span className="text-xs">XTZ</span>
            </div>
          </div>
          <div className="h-[8vh] w-[30vw] border-solid border-white border-2 rounded-xl bg-[#4942e4] opacity-75 m-1 relative">
            <div className="text-xs absolute top-[10%] left-[5%]">
              Tx Volume
            </div>
            <div className="text-xl absolute bottom-[10%] right-[10%]">
              {data.tx_vol} <span className="text-xs">XTZ</span>
            </div>
          </div>
        </div>
        <div className="h-[20vh] flex justify-center items-center">
          <Pie data={transactions} />
        </div>
        <Line data={txHistory} />
        <PolarArea data={contracts} />
      </div>
    </>
  );
};

export default Stat;
