import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";

const Mint = () => {
  const { contract, account } = useContext(AppContext);

  const [metadata, setMetadata] = useState();

  const onClickMint = async () => {
    try {
      if (!account || !contract) return;

      await contract.methods.mintNFT().send({
        from: account,
      });

      const balance = await contract.methods.balanceOf(account).call();

      const newTokenId = await contract.methods
        .tokenOfOwnerByIndex(account, Number(balance) - 1)
        .call();

      const metadataURI = await contract.methods
        .tokenURI(Number(newTokenId))
        .call();

      const response = await axios.get(metadataURI);
      setMetadata(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-red-100 min-h-screen max-w-screen-md mx-auto flex flex-col justify-center items-center">
      <button
        onClick={onClickMint}
        className="bg-cyan-100 font-bold text-xl rounded-full px-4 py-1 hover:bg-cyan-300 focus:bg-cyan-100"
      >
        🌱 Mint
      </button>
      {metadata && (
        <div>
          <img src={metadata.image} alt={metadata.name} />{" "}
          <div>{metadata.name}</div>
          <div>{metadata.description}</div>
          {metadata.attributes.map((v, i) => (
            <div key={i}>
              {v.trait_type}: {v.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mint;
