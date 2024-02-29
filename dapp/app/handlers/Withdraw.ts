import { initializeContract } from "./Global";

function Withdraw() {

    const withdrawCoin = async () => {
        const {signer, contract } = await initializeContract();
        try {
          const tx = await contract.withdraw();
          await tx.wait();
          return tx.hash;
        } catch (e: any) {
          const decodedError = contract.interface.parseError(e.data);
          alert(`Withdraw failed: ${decodedError?.args}`);
        }
      };

      const getWithdrawAmount = async () => {
        const {signer, contract } = await initializeContract();
        try {
          const withdrawAmount = await contract.getWithdraw(signer);
          return withdrawAmount;
        } catch (e: any) {
          console.log("Error data:", e.data);
          if (e.data) {
            const decodedError = contract.interface.parseError(e.data);
            console.log(`Fetching Withdraw failed: ${decodedError?.args}`);
          } else {
            console.log("An unknown error occurred.");
          }
        }
      };
    
      const getElapsedStakeTime = async () => {
        const {signer, contract } = await initializeContract();
        try {
          const elapsedStakeTime = await contract.getElapsedStakeTime(signer);
          return elapsedStakeTime;
        } catch (e: any) {
          console.log("Error data:", e.data);
          if (e.data) {
            const decodedError = contract.interface.parseError(e.data);
            console.log(`Fetching stake time failed: ${decodedError?.args}`);
          } else {
            console.log("An unknown error occurred.");
          }
        }
      };
}