import React, { useEffect, useState, KeyboardEvent } from "react";
import "./dataEntry.scss";
import classNames from "classnames";
import { createAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const cleanAll = createAction("CLEAN_ALL");
export const processDataSet = createAction<Array<number>>("PROCESS_DATA_SET");

const convertToArray = (data: string): Array<number> => {
  if (data === "") return [];
  let arr = data
    .replace(/,+|-|\s+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  console.log(arr);
  return arr.split(" ").map((it) => parseFloat(it));
};

export const DataEntry = () => {
  const [data, setData] = useState<string>("");
  const [arrayNums, setArrayNums] = useState<Array<number>>([]);
  const [isInputValid, setValidInput] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const dataset = convertToArray(data.trim());
    const isValid = !dataset.some((it) => isNaN(it));
    setArrayNums(dataset);
    setValidInput(isValid);
  }, [data]);

  const handleClean = () => {
    setData("");
    dispatch(cleanAll());
  };

  const handleCalc = () => {
    history.push("/?dataset=" + arrayNums.join("-"));
    //dispatch(processDataSet(arrayNums))
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = event.key || event.keyCode;
    if (isInputValid && (key === "Enter" || key === 13)) {
      if (arrayNums.length === 0) handleClean();
      else handleCalc();
    }
  };

  return (
    <div className={"data-entry"}>
      <input
        className={classNames("input", { error: !isInputValid })}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className={classNames("btn", {
          active: isInputValid && data.trim() !== "",
        })}
        onClick={() => isInputValid && handleCalc()}
      >
        Procesar
      </button>
      <button className={"active btn"} onClick={handleClean}>
        Limpiar
      </button>
    </div>
  );
};
