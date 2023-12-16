import React, { useState, useContext } from "react";
import { AppStateContext } from "@/pages/_app";



import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function TableDatePicker() {
 const [date setDate] = useState(new Date());
 const { appState, setAppState } = useContext(AppStateContext);





 return (
   <DatePicker selected={date} onChange={date => setDate(date)} />
 );
}