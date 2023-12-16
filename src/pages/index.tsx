import MintNFTButton from "../components/MintNFTButton";
import Refund from "../components/Refund";
import Bot from "../components/Bot";
import UTXOlookup from "../components/UTXOlookup";
import Chiron from "../components/Chiron";
import UTXOWallet from "../components/UTXOWallet";
import Register from "../components/Register";
import Delegate from "../components/Delegate";
import StakingMaker from "../components/StakingMaker";
import RFaddress from "../components/RFaddress";
import Stake from "../components/Stake"




import { useContext } from "react";
import { AppStateContext } from "./_app";
import Oracle from "@/components/Oracle";
import { ExplorerLink, ExplorerLinkPrime } from "@/components/ExplorerLinks";
import DeployScripts from "@/components/DeployScripts";
import { HiUserCircle } from "react-icons/hi";
import { IoCompassSharp, IoReloadCircleSharp } from "react-icons/io5";
import Stablecoin from "@/components/Stablecoin";
import { useState } from "react";
import { Data, fromHex, getAddressDetails} from "lucid-cardano";
import { Console } from "console";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function Home() {
    type Person = "oracle" | "user" | "owner";
    const [isPerson, setIsPerson] = useState<Person>("oracle");
    const { appState, setAppState } = useContext(AppStateContext);
    const {
        wAddr,
        utxoList,
        greeting,

        sendTransation = {lovelace: 0n},
        validator,
        valAddress,
      

        payee,
        txhash,
        amount,
        benificiaryAddress,
    
        tokens,
        deadline,
        sendAmount,
        deadlinedate,
        utxoWalletinfo,
        utxoWalletinfoObj,

        frankensteinAddress,
        newStakingRewardAddress, 
        newStakingValidator,
        stakingList,
        adaToStake,

        utxo1,
        utxo2,
        scPolicyIdHex,
        scAssetClassHex,
        oracleWithNftUTxO,
        oracleAddress,
        minPercent,
        txScriptsDeployment,
    } = appState;

    const refreshWallet = async () => {
        if (!appState.lucid || !window.cardano.nami) return;
        const nami = await window.cardano.nami.enable();
        appState.lucid.selectWallet(nami);
        setAppState({
            ...appState,
            wAddr: await appState.lucid.wallet.address(),
           
        });
    };

    const handleClick = (v: Person) => {
        if (v === "oracle") {
            setIsPerson("oracle");
        } else if (v === "user") {
            setIsPerson("user");
        } else {
            setIsPerson("owner");
        }
        console.log(isPerson);
    };

    const length = utxo2? utxo2.length : 0

    const availableutxos = utxo2? utxo2: []

    const walletutxos = utxoWalletinfo? utxoWalletinfo : []

    console.log(getAddressDetails("addr_test1qpjqnwy2hkmgmlfl5df4l5aynh6drx96a3y8zn7mjm228ly3ukexu0xd58jk5p8qwwnrzwdjas5g6s4akmufcr7x0cfs99qm69"))




    const listutxos = availableutxos.map((item,toggle) =>

                                        <div>
                                            
                                        <ExplorerLink
                                        message=  {item[1].txHash}
                                        type="address"
                                        value={"  Recipient: " + item[0]+".........." + item[4] + "xAssets...."   + (Number(item[2]))/1000000 +"₳   "}
                                        />

                                        


                                        <button
                                        style={{backgroundColor: "green"}}
                                        className=" bg-zinc-800 text-white font-quicksand text-lg font-bold py-3 px-8 rounded-lg  active:translate-y-[2px] active:shadow-[0_4px_0px_0px_rgba(0,0,0,0.6)] disabled:active:translate-y-0 disabled:active:shadow-[0_5px_0px_0px_rgba(0,0,0,0.2)] disabled:bg-zinc-200 disabled:shadow-[0_5px_0px_0px_rgba(0,0,0,0.2)] disabled:text-zinc-600"
                                        onClick={() =>{loadState(item); }}>
                                         Build Transaction
                                        </button>

                                        

                                        
                                        
                                        
                                        
                                        </div> );



    const walletUTXOs2 = []


    if (utxoWalletinfoObj) {

        for (const key in utxoWalletinfoObj) { 

            walletUTXOs2.push([[key],[utxoWalletinfoObj[key]]])



        }
           

    }

    else {
        console.log("")



    }


    const addTokenTosendTransaction = (e,token) => {


        console.log(e.target.value)

        console.log(token[0])

        sendTransation[token[0]] = BigInt(e.target.value)

        console.log(sendTransation)

        setAppState({
            ...appState,
            sendTransation: sendTransation
        })


    }


    const addLovelaceTosendTransaction = (e) => {


        console.log(e.target.value)

        const ada= (e.target.value*1000000)

        

        sendTransation["lovelace"] = BigInt(ada)

        console.log(sendTransation)

        setAppState({
            ...appState,
            sendTransation: sendTransation
        })


    }

  

    const listWalletutxos = walletUTXOs2.map((item) =>

                                        <div>
                                            
                                        <ExplorerLink
                                        message="Token:"
                                        type="address"
                                        value={item[0] + ".....Quantity:  " + item[1]}
                                        />

                                          <input
                                            style={{backgroundColor: "white"}}
                                            className="text-black w-[45px]"
                                            type="number"
                                            onChange={(e) =>


                                                   
                                                
                                                addTokenTosendTransaction(e,item)
                                                


                                                  
                                                   
                                               
                                            }
                                             />

                                        
                                   
                                        
                                        </div> );

    const stakingAddressList = stakingList?stakingList.map((item) =>

                                        <div>
                                            
                                        <ExplorerLink
                                        message="Staking:"
                                        type="address"
                                        value={item.frankensteinAddress}
                                        />

                                        <input
                                            style={{backgroundColor: "white"}}
                                            className="text-black w-[45px]"
                                            type="number"
                                            onChange={(e) =>
                                                
                                                setAppState({
                                                    ...appState,
                                                    adaToStake: e.target.value,
                                                    newStakingRewardAddress: item.stakingvalidatorRewardAddress,
                                                    newStakingValidator: item.stakeValidator,
                                                    frankensteinAddress: item.frankensteinAddress,
                                                    
                                                })   
                                               
                                            }
                                             />

                                        
                                        
    
                                        
                                        </div> ):""









  


   

   





    

    const loadState = async (utxo) => { 

        setAppState({
            ...appState,

            payee: utxo[0],

            txhash: utxo[1],

            amount: utxo[2],

            tokens: (utxo[3]? utxo[3]: "")
           

        });

        
        
     

       


    } 
    
    const processTime = (date) => {

         const year= date.getUTCFullYear()
         const month = date.getUTCMonth()
         const day= date.getUTCDate()
         const unix = Date.UTC(year,month,day)

         return unix       
             
    };
    
    


    const [date, setDate] = useState(new Date());






    console.log(deadline)






    
  




    







    return (
        <main 

        style={{backgroundColor: "black"}}
        
        
        className="flex min-h-screen w-screen h-screen gap-6 flex-row-reverse items-center justify-between px-5 pb-5  pt-20 bg-zinc-800">
          
         
           
           
           
           
            <div className="flex flex-col items-center justify-start  w-[40000px] mt-2">
                {/* USER LOGGED */}
                <div className="absolute justify-center items-center right-0 top-5 bg-zinc-50  h-12  w-48 rounded-l-2xl flex flex-row">
                    <HiUserCircle
                        className="text-4xl text-zinc-600"
                        onClick={refreshWallet}
                    />
                    <p className="text-lg mx-2 text-zinc-800">
                        {wAddr ? `...${wAddr.substring(102)}` : ""}
                    </p>

                    
                    <IoReloadCircleSharp
                        className="text-3xl mx-2 text-zinc-600 active:text-zinc-800"
                        onClick={refreshWallet}
                    />
                </div>

                

                <div className=" text-yellow-500 shadow-[0_4px_0px_0px_rgba(0,0,0,0.25)] w-[1000 px] ">
                    
                    <div >
                        <h1>Payment date</h1>
                    
                    </div>
                    <div>
                    </div>
                
                    </div>

                

              

                <div>
                

                <DatePicker selected={date}

               
                
                dateFormat="MMMM d, yyyy"
             
                minTime={new Date(0, 0, 0, 0, 0)}
                maxTime={new Date(0, 0, 0, 0, 0)}
                shouldDisableSecond
                shouldDisableMinute
                shouldDisableHour
          
            
                                
                
                
                
                onChange={(date) => 

                                      {
                                        setDate(date)

                                        const unixTime = date? (processTime(date)) : ""

                                        

                                        setAppState({
                                            ...appState,
                                            deadline: unixTime
                                        })

                                        

                                    
                                    } }
                                        
                                        
                                        
                                        />
                                        
          
                </div>


                

                


               <div>{deadline ? <UTXOlookup /> : ""}</div>
               {/*<div>{deadline ? <Register /> : ""}</div>
               <div>{deadline ? <Delegate /> : ""}</div> */}

                

                {/* INFORMATION TABLE */}
                <p className=" text-yellow-500 h-100 w-[90000 px] ">
                {valAddress ? `Validator: ${valAddress}` : ""}
                </p>
                
                

                <div 
                style={{backgroundColor: "black"}}
                
                className=" overflow-hidden bg-zinc-50 rounded-lg w-full my-4 h-auto border border-spacing-10 border-zinc-50">

                    {listutxos}
    
                </div>

                {tokens ? <Chiron/> : ""}
            </div>

            {/* PERSON BUTTONS */}
            <div className="absolute top-4 left-5 flex flex-row gap-4">
    
         





            </div>

            

            



            

            

            {/* ACTIONS SECTION */}
            <div className="flex flex-col items-center justify-start  w-[2000px] mt-2">
                {/* ORACLE ACTIONS */}
                { (
                    <div className="shadow-[0_9px_0px_0px_rgba(0,0,0,0.25)] w-[1000px] bg-zinc-70 border border-zinc-700 rounded-xl p-9">


                        
                       
         
                        

                        
                        
                        


                        <div className=" text-orange-500 shadow-[0_4px_0px_0px_rgba(0,0,0,0.25)] w-[600 px] bg-zinc-10 border border-zinc-50 rounded-xl p-6">

                        
                        
                        
                       {/*<StakingMaker/>*/}
                       {/*<RFaddress/>*/}
                        
                        <>Build transaction:</>
                          <div className=" overflow-hidden bg-zinc-1000 rounded-lg my-4 h-auto border border-spacing-40 border-zinc-200">
                            
                          <p>   <input 
                                    style={{backgroundColor: "white", fontsize: "1px"}}
                                    className=" text-black  bg-zinc-1000  w-[11000px] my-4 h-auto border border-spacing-40 border-zinc-200"
                                    type="address"
                                    onChange={(e) =>

                                        
                                        setAppState({
                                            ...appState,
                                            benificiaryAddress: e.target.value
                                        })
                                    }
                                /></p>
                                

                         


                     

                                


                                
                                
                        

                                
                         </div >


                         <div> ₳: <input 
                                    style={{backgroundColor: "white"}}
                                    className=" text-black overflow-hidden bg-zinc-1000  w-[100px] my-4 h-auto border border-spacing-40 border-zinc-200"
                                    type="number"
                                    onChange={(e) =>

                                        
                                        addLovelaceTosendTransaction(e)
                                    }
                                /></div>
                                

                         <div>{listWalletutxos.length===0? <UTXOWallet /> : ""}</div>

                         <div className=" overflow-hidden bg-zinc-2 rounded-lg w-[200 px] my-4 h-auto border border-spacing-10 border-zinc-200" >
                        
                        
                         
                        
                        {listWalletutxos}
                        </div>

                        <div>

                        {/*{stakingAddressList}*/}

                        

                        {/*<RFaddress/>*/}


                        </div>

                        {/*<div><Stake/></div>*/}

                        



                        
                         <div >

                         <div>{deadline && (sendTransation.lovelace>=5000000n && benificiaryAddress)? <MintNFTButton /> : ""}</div>
                        
                        </div>

                         
                            
                            </div>



                    </div>
                )}


               
            </div>

          
        </main>
    );
}
