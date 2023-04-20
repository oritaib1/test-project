import React, { useState } from "react";
import Home from "../Home/Home";
import InputWithValidation from "../../components/UI/Input/Input";
import { useForm } from "react-hook-form";
import Button from "../../components/UI/Button/Button";
import axios from "axios";
import "./NewProject.css";
import { useNavigate } from "react-router-dom";

export const NewProject = () => {
  let navigate = useNavigate();
  const [madeDadeline, setMadeDadeline] = useState("yes");
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm({ mode: "onChange" });

  const changeYes = ()=> {
    setMadeDadeline("yes")
  }

  const changeNo = ()=> {
    setMadeDadeline("no")
  }

  const onSubmit = async (data) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if(userData == null){
      navigate("/");
    }
    const RequestDtat = {
      name: data.name,
      score: data.score,
      durationInDays: data.durationInDays,
      bugsCount: data.bugsCount,
      madeDadeline: madeDadeline,
      userId: userData.id,
      token: userData.token,
    };

     await axios.post(
      "https://tabletest-production.up.railway.app/project/createProject",
      RequestDtat
    ).then((response)=>{
      if(response.statusText){
        navigate("/Info/AllProject");
      }
      console.log(response.statusText);
    })

    
  };


  return (
    <Home>
      <div className="register-container">
        <div className="register-card">
          <InputWithValidation
            title={"שם פרוייקט"}
            type="text"
            name="name"
            rules={{
              required: "זהו שדה חובה",
              minLength: { value: 2, message: "בין 2 ל10 ספרות" },
              maxLength: { value: 14, message: "בין 2 ל14 ספרות" },
            }}
            control={control}
          />
          <InputWithValidation
            title={"ציון"}
            type="text"
            name="score"
            rules={{
              required: "זהו שדה חובה",
              pattern: {
                value: /^(0|[0-9]\d*)(\.\d+)?$/,
                message: "שדה זה מכיל מספרים בלבד",
              },
              validate: {
                greaterThan100: (value) =>
                  parseFloat(value) < 101 || "המספר חייב להיות עד 100",
              },
            }}
            control={control}
          />
          <InputWithValidation
            title={"ימי עבודה"}
            type="text"
            name="durationInDays"
            rules={{
              required: "זהו שדה חובה",
              pattern: {
                value: /^(0|[0-9]\d*)(\.\d+)?$/,
                message: "שדה זה מכיל מספרים בלבד",
              },
              minLength: {
                value: 1,
                message: "שדה זה צריך להכיל לפחות מספר 1",
              },
              validate: {
                greaterThan100: (value) =>
                  parseFloat(value) < 31 || "המספר חייב להיות עד 30",
                greaterThan0: (value) =>
                  parseFloat(value) > 0 || "חייב להיות גדול מ0",
              },
            }}
            control={control}
          />
          <InputWithValidation
            title={"מספר באגים"}
            type="text"
            name="bugsCount"
            rules={{
              required: "זהו שדה חובה",
              pattern: {
                value: /^(0|[0-9]\d*)(\.\d+)?$/,
                message: "שדה זה מכיל מספרים בלבד",
              },
              validate: {
                greaterThan100: (value) =>
                  parseFloat(value) < 31 || "המספר חייב להיות עד 30",
              },
            }}
            control={control}
          />
          <div className="radio-title">
            ?האם בוצע בזמן
          </div>
          <div className={"radio-container"}>
            <div onClick={changeYes} className={madeDadeline == 'yes' ? 'radio-select' : "radio"}>כן</div>
            <div onClick={changeNo} className={madeDadeline == 'no' ? 'radio-select' : "radio"}>לא</div>
          </div>
          <Button onClick={handleSubmit(onSubmit)} innerText={"הרשם"} />
        </div>
      </div>
    </Home>
  );
};
