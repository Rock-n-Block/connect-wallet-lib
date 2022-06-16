import { MetaMask } from "../src/metamask";
import { ConnectWallet } from "../src/index";
import { chainsEnum, connectWallet } from "./config";
import { WalletsConnect } from "../src/wallet-connect";
import { IError } from "interface";

const wallet = new ConnectWallet().use([MetaMask, WalletsConnect]);
const { network, provider, settings, keys } = connectWallet(
  chainsEnum.Ethereum
);

const userState = {
  address: "",
};

const connectButton = document.getElementById("connect");
const disconnectButton = document.getElementById("disconnect");

connectButton.addEventListener("click", async function () {
  const connected = await wallet.connect(
    provider["WalletConnect"],
    network,
    settings,
    keys,
  );
  if (connected) {
    const subscription = wallet.eventSubscriber().subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
    wallet
      .getAccounts()
      .then((accountsData) => {
        console.log(accountsData);
      })
      .catch((err: IError) => {
        alert(err.message.text);
      });
  }
});

disconnectButton.addEventListener('click', function(){
  wallet.resetConnect();
})
