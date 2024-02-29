import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x336341222d362E5Fb94F54E7993b28ca5F3504fE",
        abi as any,
        signer
    );
}