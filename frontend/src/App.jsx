import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Mint from "./pages/mint";
import Header from "./components/Header";
import { createContext, useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import Web3 from "web3";
import mintNFTABI from "./mintNFT.json";

export const AppContext = createContext({
  account: "",
  setAccountHandler: () => {},
  web3: undefined,
  contract: undefined,
});

const App = () => {
  const [account, setAccount] = useState("");
  const setAccountHandler = (state) => setAccount(state);

  const [web3, setWeb3] = useState();
  const [contract, setContract] = useState();

  const { provider } = useSDK();

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

  return (
    <AppContext.Provider value={{ account, setAccountHandler, web3, contract }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={<Main />} />
            <Route path="/mint" element={<Mint />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
