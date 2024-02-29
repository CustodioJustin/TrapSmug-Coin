import { BrowserProvider } from "ethers";
import { getContract } from "@/config";

export async function initializeContract() {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    return { provider, signer, contract };
}