import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";

const Main = () => {
  const { contract } = useContext(AppContext);
  const [metadataArray, setMetadataArray] = useState();

  const getNFTs = async () => {
    try {
      const totalNFTs = await contract.methods.totalSupply().call();

      let temp = [];
      for (let i = 0; i < Number(totalNFTs); i++) {
        const tokenURI = await contract.methods.tokenURI(i + 1).call();

        const response = await axios.get(tokenURI);

        temp.push(response.data);
      }

      setMetadataArray(temp);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!contract) return;

    getNFTs();
  }, [contract]);

  return (
    <div className="bg-green-100 min-h-screen max-w-screen-md mx-auto flex flex-col justify-center items-center">
      <ul className="grid grid-cols-2 gap-8">
        {metadataArray?.map((v, i) => (
          <li key={i}>
            <img src={v.image} alt={v.name} />
            <div>{v.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
