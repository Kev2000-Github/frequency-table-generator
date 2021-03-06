import React, {useState} from "react";
import {useSelector} from "react-redux";
import "./dataSet.scss"
import {AppState} from "../../mainReducer";
import classNames from "classnames";

export const DataSet = () => {
    const dataSet: Array<number> = useSelector((state: AppState) => state.dataSet)
    const [visible, setVisible] = useState(true)
    if (dataSet.length === 0) return null
    return (
        <div className={'dataset'}>
            <div className={'section-title'} onClick={() => setVisible(!visible)}>
                <i className={classNames("fas fa-angle-down", {"fa-angle-up": visible})}/>
                <span>Set de datos</span>
            </div>
            <div className={classNames('content', {"hide": !visible})}>{dataSet.join(", ")}</div>
        </div>
    )
};