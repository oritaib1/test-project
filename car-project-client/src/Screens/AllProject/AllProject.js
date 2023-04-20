import React, { useEffect, useState } from "react";
import Home from "../Home/Home";
import { useSelector } from "react-redux";
import { InfoCard } from "../InfoCard/InfoCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/UI/Button/Button";
import "./AllProject.css";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineArrowLeft,
} from "react-icons/ai";

function AllProject() {
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();
  const [isGet, setIsGet] = useState(false);
  const [allData, setAllData] = useState(null);
  const [data, setData] = useState(null);
  const [datafilter, setDataFilter] = useState(null);
  const [row, setRow] = useState([]);
  const [numBugs, setNumBugs] = useState("straight");
  const [workDays, setWorkDays] = useState("straight");
  const [score, setScore] = useState("straight");

  const [madeDadeline, setMadeDadeline] = useState(null);
  const [scoreRangeTop, setScoreRangeTop] = useState(100);
  const [scoreRangeBottom, setScoreRangeBottom] = useState(0);
  const [workTimeTop, setWorkTimeTop] = useState(30);
  const [workTimeBottom, setWorkTimeBottom] = useState(1);

  const [bugsNumTop, setBugsNumTop] = useState(30);
  const [bugsNumBottom, setBugsNumBottom] = useState(0);

  const changeYes = () => {
    if(madeDadeline == 'yes'){
      setMadeDadeline(null)
    }else{
      setMadeDadeline("yes");
    }
   
  };

  const changeNo = () => {
    if(madeDadeline == 'no'){
      setMadeDadeline(null)
    }else{
      setMadeDadeline("no");
    }
  };

  const allRequestsFilter = () => {
    debugger;
    const newData = [];
    allData.forEach((item, index)=>{
      newData.push(item)
    })

    if (madeDadeline != null) {
      for (let i = 0; i < newData.length; i++) {
        const item = newData[i];
        if (item.madeDadeline != madeDadeline) {
          newData.splice(i, 1);
          i--;
        }
      }
    }
    debugger;
    for (let i = 0; i < newData.length; i++) {
      const item = newData[i];
      if (item.score < scoreRangeBottom || item.score > scoreRangeTop) {
        newData.splice(i, 1);
        i--;
      }
    }
    debugger;
    for (let i = 0; i < newData.length; i++) {
      const item = newData[i];
      if (
        item.durationInDays < workTimeBottom ||
        item.durationInDays > workTimeTop
      ) {
        newData.splice(i, 1);
        i--;
      }
    }
    debugger;
    for (let i = 0; i < newData.length; i++) {
      const item = newData[i];
      if (item.bugsCount < bugsNumBottom || item.bugsCount > bugsNumTop) {
        newData.splice(i, 1);
        i--;
      }
    }
    setData(newData);
    setDataFilter(newData);
    setTable(newData);
  };

  const getAllRequests = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    await axios
      .get(`https://tabletest-production.up.railway.app/project/getProject/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
        setDataFilter(response.data);
        setAllData(response.data)
        if (data != null) {
          setIsGet(true);
        }
        setTable(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterByName = async (event) => {
    const arr = [];
    const dataToFilter = [];
    if (event.target.value == "") {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        dataToFilter.push(item);
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.name.includes(event.target.value)) {
          dataToFilter.push(item);
        }
      }
    }
    setDataFilter(dataToFilter);
  };

  useEffect(() => {
    if (datafilter !== null) {
      fixUpDow();
    }
  }, [datafilter]);

  const fixUpDow = async () => {
    if (numBugs == "down") {
      await datafilter.sort((a, b) => a.bugsCount - b.bugsCount);
    } else if (numBugs == "up") {
      await datafilter.sort((a, b) => b.bugsCount - a.bugsCount);
    } else if (workDays == "down") {
      await datafilter.sort((a, b) => a.durationInDays - b.durationInDays);
    } else if (workDays == "up") {
      await datafilter.sort((a, b) => b.durationInDays - a.durationInDays);
    } else if (score == "down") {
      await datafilter.sort((a, b) => a.score - b.score);
    } else if (score == "up") {
      await datafilter.sort((a, b) => b.score - a.score);
    }
    setTable(datafilter);
  };
  const BugsUpAndDown = async () => {
    if (numBugs == "straight" || numBugs == "down") {
      await datafilter.sort((a, b) => b.bugsCount - a.bugsCount);
      console.log(datafilter);
      setNumBugs("up");
    } else {
      await datafilter.sort((a, b) => a.bugsCount - b.bugsCount);
      console.log(datafilter);
      setNumBugs("down");
    }
    setWorkDays("straight");
    setScore("straight");
    setTable(datafilter);
  };

  const workDaysUpAndDown = async () => {
    if (workDays == "straight" || workDays == "down") {
      await datafilter.sort((a, b) => b.durationInDays - a.durationInDays);
      setWorkDays("up");
    } else {
      await datafilter.sort((a, b) => a.durationInDays - b.durationInDays);
      setWorkDays("down");
    }
    setNumBugs("straight");
    setScore("straight");
    setTable(datafilter);
  };

  const ScoreUpAndDown = async () => {
    if (score == "straight" || score == "down") {
      await datafilter.sort((a, b) => b.score - a.score);
      setScore("up");
    } else {
      await datafilter.sort((a, b) => a.score - b.score);
      setScore("down");
    }
    setNumBugs("straight");
    setWorkDays("straight");
    setTable(datafilter);
  };

  const setTable = (dataToFilter) => {
    const arr = [];
    for (let i = 0; i < dataToFilter.length; i++) {
      const item = dataToFilter[i];
      arr.push(
        <tr key={item.id}>
          <td>{item.madeDadeline}</td>
          <td>{item.bugsCount}</td>
          <td>{item.durationInDays}</td>
          <td
            style={
              item.score < 70
                ? { color: "red" }
                : item.score > 90
                ? { color: "green" }
                : { color: "black" }
            }
          >
            {item.score}
          </td>
          <td>{item.name}</td>
        </tr>
      );
    }
    setRow(arr);
  };

  useEffect(() => {
    if (!isGet) {
      getAllRequests();
    }
  });
  return (
    <Home>
      <div>
        <InfoCard />
      </div>
      <div className="filter-container">
        <div className="filter-control">
          <div className="range-container">
            <label>:ציון</label>
            <div className="range-control">
              <div className="range">
                <span className="text-span">-בין</span>
                <input
                  onChange={(event) => {
                    setScoreRangeBottom(event.target.value);
                  }}
                  value={scoreRangeBottom}
                  type={"number"}
                  className="input-range"
                />
              </div>
              <div className="range">
                <span className="text-span">-ל</span>
                <input
                  onChange={(event) => {
                    setScoreRangeTop(event.target.value);
                    console.log(event.target.value);
                  }}
                  value={scoreRangeTop}
                  type={"number"}
                  className="input-range"
                />
              </div>
            </div>
          </div>

          <div className="range-container">
            <label>:משך העבודה על הפרוייקט</label>
            <div className="range-control">
              <div className="range">
                <span className="text-span">-בין</span>
                <input
                  onChange={(event) => {
                    setWorkTimeBottom(event.target.value);
                  }}
                  value={workTimeBottom}
                  type={"number"}
                  className="input-range"
                />
              </div>
              <div className="range">
                <span className="text-span">-ל</span>
                <input
                  onChange={(event) => {
                    setWorkTimeTop(event.target.value);
                    console.log(event.target.value);
                  }}
                  value={workTimeTop}
                  type={"number"}
                  className="input-range"
                />
              </div>
            </div>
          </div>

          <div className="range-container">
            <label>:מספר באגים</label>
            <div className="range-control">
              <div className="range">
                <span className="text-span">-בין</span>
                <input
                  onChange={(event) => {
                    setBugsNumBottom(event.target.value);
                  }}
                  value={bugsNumBottom}
                  type={"number"}
                  className="input-range"
                />
              </div>
              <div className="range">
                <span className="text-span">-ל</span>
                <input
                  onChange={(event) => {
                    setBugsNumTop(event.target.value);
                    console.log(event.target.value);
                  }}
                  value={bugsNumTop}
                  type={"number"}
                  className="input-range"
                />
              </div>
            </div>
          </div>
          <div className={"radio-container-filter"}>
            <div className="radio-title-filter">?האם בוצע בזמן</div>
            <div className={"radio-control-filter"}>
              <div
                onClick={changeYes}
                className={madeDadeline == "yes" ? "radio-select" : "radio"}
              >
                כן
              </div>
              <div
                onClick={changeNo}
                className={madeDadeline == "no" ? "radio-select" : "radio"}
              >
                לא
              </div>
            </div>
            <Button innerText={"סינון"} onClick={allRequestsFilter} />
          </div>
        </div>
      </div>
      <div className="table-container">
        <div className="table-control">
          <div className="table-input-control">
            <div className="table-input">
              <input
                type="text"
                placeholder="חיפוש על פי שם"
                onChange={filterByName}
              />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>האם בוצע בדד ליין</th>
                <th onClick={BugsUpAndDown}>
                  {numBugs == "straight" ? (
                    <AiOutlineArrowLeft />
                  ) : numBugs == "up" ? (
                    <AiOutlineArrowUp />
                  ) : (
                    <AiOutlineArrowDown />
                  )}
                  מספר באגים
                </th>
                <th onClick={workDaysUpAndDown}>
                  {workDays == "straight" ? (
                    <AiOutlineArrowLeft />
                  ) : workDays == "up" ? (
                    <AiOutlineArrowUp />
                  ) : (
                    <AiOutlineArrowDown />
                  )}{" "}
                  ימי עבודה
                </th>
                <th onClick={ScoreUpAndDown}>
                  {score == "straight" ? (
                    <AiOutlineArrowLeft />
                  ) : score == "up" ? (
                    <AiOutlineArrowUp />
                  ) : (
                    <AiOutlineArrowDown />
                  )}{" "}
                  ציון
                </th>
                <th>שם הפרוייקט</th>
              </tr>
            </thead>
            <tbody>{row}</tbody>
          </table>
        </div>
      </div>
     
    </Home>
  );
}

export default AllProject;
