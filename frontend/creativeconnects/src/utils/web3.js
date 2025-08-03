import Web3 from "web3";

const getWeb3 = async () => {
    return new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
};

export default getWeb3;
