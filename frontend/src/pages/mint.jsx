import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";

const Mint = () => {
  const { sdk } = useSDK();
  const [account, setAccount] = useState();

  const onClickMetaMask = async () => {
    try {
      const accounts = await sdk?.connect();

      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickLogout = async () => {
    try {
      setAccount("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-red-100 min-h-screen flex flex-col justify-center items-center">
      {account ? (
        <>
          <div>
            {account.substring(0, 7)}...{account.substring(account.length - 5)}
          </div>
          <button className="bg-cyan-100 font-bold text-xl rounded-full px-4 py-1">
            Mint
          </button>
          <button
            onClick={onClickLogout}
            className="border border-black text-xl font-semibold rounded-full px-2 py-1"
          >
            🔒
          </button>
        </>
      ) : (
        <button
          onClick={onClickMetaMask}
          className="rounded-full px-4 py-1 text-xl font-semibold bg-amber-300 hover:bg-amber-500 focus:bg-amber-300 hover:animate-bounce"
        >
          🦊 Login
        </button>
      )}
    </div>
  );
};

export default Mint;
