import { useSDK } from "@metamask/sdk-react";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../App";

const Header = () => {
  const { sdk } = useSDK();

  const { account, setAccountHandler } = useContext(AppContext);

  const onClickMetaMask = async () => {
    try {
      const accounts = await sdk?.connect();

      setAccountHandler(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickLogout = async () => {
    try {
      setAccountHandler("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-blue-100 w-full fixed left-1/2 -translate-x-1/2 top-0 max-w-screen-md">
      <div className="flex justify-between">
        <Link to="/">Home</Link>
        <Link to="/mint">Mint</Link>
      </div>
      <div>
        {account ? (
          <>
            <div>
              {account.substring(0, 7)}...
              {account.substring(account.length - 5)}
            </div>
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
      <Outlet />
    </div>
  );
};

export default Header;
