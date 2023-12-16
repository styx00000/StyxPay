
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
    const { lucid, wAddr, newStakingRewardAddress, newStakingValidator, frankensteinAddress,
            adaToStake } = appState;

    

    const sendStake = async () => {


        const getUtxo = async (address: string): Promise<UTxO> => {
            const utxos = await lucid!.utxosAt(address);
            return utxos;
        };
        
        const utxos = await getUtxo(wAddr);


       


        const getPayLoad = async () => {

            const payload = []
                
            for (const utxo of utxos) {

                    payload.push(utxo.assets.lovelace)
                    
                }
            
           return payload
        };

        const listAssets= await getPayLoad()

        console.log(listAssets)

        const sum = (x) => {
            const r = x.reduce((a, b) => a + b, BigInt(0));
            return r
          };
            

      

        const lovelace = await sum(listAssets)

        const payload = Number(lovelace)-Number(adaToStake)




        console.log(payload)


        


                
            


        

        const pkh: string = getAddressDetails(wAddr).paymentCredential?.hash || "";

        console.log(utxos)


        console.log(frankensteinAddress)






        const tx = await lucid
                  .newTx()
                  .collectFrom(utxos)
                  .addSignerKey(pkh)
                  .payToAddress(wAddr,{lovelace: Number(payload)})
                  .payToAddress(frankensteinAddress,{lovelace: Number(adaToStake)})
                  .complete();

        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();

        console.log(txHash)
        
        

            
     }


    


     



    return (

            <div>
                <button
                    onClick={sendStake}
                    style={{backgroundColor: "green"}}
                    className=" bg-zinc-800 text-white font-quicksand text-lg font-bold py-3 px-8 rounded-lg  active:translate-y-[2px] active:shadow-[0_4px_0px_0px_rgba(0,0,0,0.6)] disabled:active:translate-y-0 disabled:active:shadow-[0_5px_0px_0px_rgba(0,0,0,0.2)] disabled:bg-zinc-200 disabled:shadow-[0_5px_0px_0px_rgba(0,0,0,0.2)] disabled:text-zinc-600"
                >
                    {" "}
                    Stake
                </button>

             
                
            </div>

    
        
    );
}
