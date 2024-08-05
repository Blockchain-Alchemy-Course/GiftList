const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  const merkleTree = new MerkleTree(niceList);

  const root = merkleTree.getRoot();
  const name = "Sidney Kertzmann";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);
  // console.log(Math.ceil(root.length / 2)); // how many bytes
  // console.log(root);
  try {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name,
      proof,
    });

    console.log(gift);
  } catch (error) {
    console.log("an error has occured while sending to server", error);
  }

  // console.log({ gift });
}

main();
