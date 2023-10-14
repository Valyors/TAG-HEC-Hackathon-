export default function Scan() {
  return (
    <div>
      <img className="qrcode" src="qr_code.webp" alt="QR code" />
      <div className="flex justify-center">
        <button className="scan-btn mx-auto">SCAN</button>
      </div>
    </div>
  );
}
