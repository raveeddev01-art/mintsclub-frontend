import MyAlgoConnect from "@randlabs/myalgo-connect";
const algosdk = require("algosdk");
const enc = new TextEncoder();
const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });
const settings = {
  shouldSelectOneAccount: false,
  openManager: false,
};
const algodToken = { "X-API-Key": "7zCiHvmx5B9FPCY7zuj5S5h4VBdBcAwn5A0BDwhd" };
const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
const algodPort = "";

let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

const connectWallet = async () => {
  try {
    const accounts = await myAlgoConnect.connect(settings);
    const address = accounts.map((account) => account.address);
    const name = accounts.map((account) => account.name);
    console.log(address + " " + name);
    //   setaccountaddress(address);
    // let account_mnemonic = algosdk.secretKeyToMnemonic(nemonic.sk);
    // setnemonic(account_mnemonic);
  } catch (err) {
    console.error(err);
  }
};
const CheckBalance = async (accountaddress) => {
  // console.log(algodClient);
  let accountInfo = await algodClient.accountInformation(accountaddress).do();
  console.log(accountInfo);
  console.log("Account balance: %d microAlgos", accountInfo.amount);
};
const sendAmount = async (accountaddress) => {
  const params = await algodClient.getTransactionParams().do();
  const note = enc.encode("Amount is being sent");

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    suggestedParams: {
      ...params,
    },
    from: accountaddress.toString(),
    to: "7R7ZZMRVDMO26FJC566Q46M6S7PR6227RGIOWR2QZXTTX4LLUBTLYR3KYQ",
    amount: 2000000,
    note: note,
  });

  const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

  const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

  console.log(response);
};

export { connectWallet, CheckBalance };
