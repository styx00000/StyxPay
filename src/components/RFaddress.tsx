
import React, { useContext } from "react";
import {
    applyParamsToScript,
    Data,
    MintingPolicy,
    fromText,
    Datum,
    PaymentKeyHash,
    SpendingValidator,
    UTxO,
    TxHash,
    Address,
    AddressDetails,
    getAddressDetails,
    PublicKey,
    sha256,
    toHex,
    C,
    Constr,
    fromHex

} from "lucid-cardano";
import { AppStateContext } from "@/pages/_app";
import { signAndSubmitTx } from "@/utilities/utilities";



export default function MintNFT() {
    const { appState, setAppState } = useContext(AppStateContext);
    const { lucid, wAddr, newStakingRewardAddress, newStakingValidator } = appState;

    

    const registerRewardAddress = async () => {
        
        const tx = await lucid.newTx()
        .registerStake(newStakingRewardAddress)
        .complete();

        const signedTx = await tx.sign().complete();

        const txHash = await signedTx.submit();

        console.log("Register")

            
     }


    async function delegate(): Promise<TxHash> {


        const pkh: string = getAddressDetails(wAddr).paymentCredential?.hash || "";


                
        const tx = await lucid.newTx()
                .delegateTo(newStakingRewardAddress, "pool1397kpa7ylzg4lqrmj3xr28xzq2548c8lafw90qyxvucsslap03v",Data.to(new Constr(0, [])))
                .attachWithdrawalValidator(newStakingValidator)
                .addSignerKey(pkh)
                .complete();

     

        const signedTx = await tx.sign().complete();


        const txHash = await signedTx.submit();

        console.log("deligated")


                    

    }


     



    return (

            <div>
                <button
                    onClick={registerRewardAddress}
                    style={{backgroundColor: "green"}}
                    className=" bg-zinc-800 text-white font-quicksand text-lg font-bold py-3 px-8 rounded-lg  active:translate-y-[2px] active:shadow-[0_4px_0px_0px_rgba(0,0,0,0.6)] disabled:active:translate-y-0 disabled:active:shadow-[0_5px_0px_0px_rgba(0,0,0,0.2)] disabled:bg-zinc-200 disabled:shadow-[0_5px_0px_0px_rgba(0,0,0,0.2)] disabled:text-zinc-600"
                >
                    {" "}
                    RegisterFrankensteinAdress
                </button>

                <button
                    onClick={delegate}
                    style={{backgroundColor: "green"}}
                    className=" bg-zinc-800 text-white font-quicksand text-lg font-bold py-3 px-8 rounded-lg  active:translate-y-[2px] active:shadow-[0_4px_0px_0px_rgba(0,0,0,0.6)] disabled:active:translate-y-0 disabled:active:shadow-[0_5px_0px_0px_rgba(0,0,0,0.2)] disabled:bg-zinc-200 disabled:shadow-[0_5px_0px_0px_rgba(0,0,0,0.2)] disabled:text-zinc-600"      
                >
                {" "} Delegate ADA
                </button>
                
            </div>

    
        
    );
}
