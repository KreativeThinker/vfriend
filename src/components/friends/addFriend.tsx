import { Share, QrCode, Wifi, ArrowLeft, Sparkles } from "lucide-react";
import { handleShare } from "./ShareLink";
import useAddFriendStore from "../../store/useAddFriendStore";
import QRGiver from "./QRGiver";
import CodeTab from "./FriendAddTypes/Access";
import QRScanner from "./QRScanner";

const ShareLinkTab = () => (
  <div className="p-4">
    <h3 className="text-xl font-bold text-black mb-4">Share Link</h3>
    <div className="text-black">
      <p>Share your profile link with friends:</p>
      <button
        className="bg-black text-white p-2 rounded mt-2"
        onClick={async () => await handleShare()}
      >
        Generate & Share Link
      </button>
    </div>
  </div>
);

const QRCodeTab = () => (
  <div className="p-4">
    <h3 className="text-xl font-bold text-black mb-4">QR Code</h3>
    <div className="text-black text-center w-full flex flex-col items-center">
      <p>Scan or show QR code to add friends</p>
      <QRScanner />
      <QRGiver />
    </div>
  </div>
);

const P2PTab = () => (
  <div className="p-4">
    <h3 className="text-xl font-bold text-black mb-4">Wi-Fi P2P</h3>
    <div className="text-black">
      <p>Direct Wi-Fi connection coming soon!</p>
    </div>
  </div>
);

const MainTab = () => {
  const { setActiveTab } = useAddFriendStore();

  return (
    <>
      <div className="text-4xl text-black">ADD FRIEND</div>
      <div className="grid grid-cols-2 gap-4 mt-4 text-black">
        <button
          className="bg-black text-white p-4 rounded-lg text-center flex flex-col items-center gap-2 cursor-pointer justify-center"
          onClick={() => setActiveTab("share")}
        >
          <Share size={24} />
          <div>SHARE LINK</div>
        </button>
        <button
          className="bg-black text-white p-4 rounded-lg text-center flex flex-col items-center gap-2 cursor-pointer justify-center"
          onClick={() => setActiveTab("qr")}
        >
          <QrCode size={24} />
          <div>QR CODE</div>
        </button>
        <button
          className="bg-black text-white p-4 rounded-lg text-center flex flex-col items-center gap-2 cursor-pointer justify-center"
          onClick={() => setActiveTab("code")}
        >
          <Sparkles size={24} />
          <div>ACCESS CODE</div>
        </button>
        <button
          className="bg-black text-white p-4 rounded-lg text-center flex flex-col items-center gap-2 cursor-pointer justify-center"
          onClick={() => setActiveTab("p2p")}
        >
          <Wifi size={24} />
          <div>Wi-Fi p2p (soon)</div>
        </button>
      </div>
    </>
  );
};

const AddFriend = () => {
  const { activeTab, goBack } = useAddFriendStore();

  const renderContent = () => {
    switch (activeTab) {
      case "share":
        return <ShareLinkTab />;
      case "qr":
        return <QRCodeTab />;
      case "code":
        return <CodeTab />;
      case "p2p":
        return <P2PTab />;
      default:
        return <MainTab />;
    }
  };

  return (
    <div
      className={`
      bg-primary rounded-xl
      ${
        activeTab !== "main"
          ? "fixed top-0 left-0 w-screen h-screen p-8"
          : "w-full h-fit p-8"
      }
    `}
    >
      {activeTab !== "main" && (
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-black mb-4 hover:opacity-70 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      )}
      {renderContent()}
    </div>
  );
};

export default AddFriend;
