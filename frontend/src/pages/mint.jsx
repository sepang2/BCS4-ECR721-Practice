import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import mintNFTABI from "../mintNFT.json";

const Mint = () => {
  const { sdk, provider } = useSDK();
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();

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

  useEffect(() => {
    if (!provider) return;

    setWeb3(new Web3(provider));
  }, [provider]);

  useEffect(() => {
    if (!web3) return;

    setContract(
      new web3.eth.Contract(
        mintNFTABI,
        "0xab52133914cafedef17344fd784586f792a8bde2"
      )
    );
  }, [web3]);

  useEffect(() => console.log(contract), [contract]);

  return (
    <div className="bg-red-100 min-h-screen max-w-screen-md mx-auto flex flex-col justify-center items-center">
      <div className="bg-blue-100 w-full fixed top-0 max-w-screen-md">
        {account ? (
          <>
            <div>
              {account.substring(0, 7)}...
              {account.substring(account.length - 5)}
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
    </div>
  );
};

export default Mint;
