import { initializeContract } from "./Global";

const getStake = async () => {
    const {signer, contract} = await initializeContract();
    try {
      const stakedInEth = await contract.getStake(signer);
      const amount = Number(stakedInEth)
      return amount;
    } catch (e: any) {
      console.log("Error data:", e.data);
      if (e.data) {
        const decodedError = contract.interface.parseError(e.data);
        console.log(`Fetching stake failed: ${decodedError?.args}`);
      } else {
        console.log("An unknown error occurred.");
      }
    }
};

const stakeCoin = async (amount: number) => {
    const {signer, contract} = await initializeContract();
    try {
      const tx = await contract.stake(amount);
      await tx.wait();
      return tx.hash;
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Stake failed: ${decodedError?.args}`);
    }
};

const Stake = {
  getStake,
  stakeCoin
}

export default Stake;