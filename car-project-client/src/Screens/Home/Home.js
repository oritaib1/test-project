import "./Home.css";
import Button from "../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home({ children }) {
  let navigate = useNavigate();

  const isLogin = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData == null) {
      navigate("/");
    }
  };
  const moveToNewProject = (where) => {
    navigate(`/Info/${where}`);
  };

  const logOut = ()=>{
    localStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    isLogin();
  });
  return (
    <div className="home-container">
      <div className="logout-control">
        <Button
          onClick={logOut}
          innerText={"התנתק"}
        />
      </div>
      <div className="home-nav-container">
        <div className="home-nav-control">
          <div className="home-nav-btn">
            <Button
              onClick={() => {
                moveToNewProject("NewProject");
              }}
              innerText={"הוספת פרוייקט חדש"}
            />
          </div>
          <div className="home-nav-btn">
            <Button
              onClick={() => {
                moveToNewProject("AllProject");
              }}
              innerText={"צפייה בכל הפרוייקטים"}
            />
          </div>
        </div>
      </div>
      <div className="cildren-control">{children}</div>
    </div>
  );
}

export default Home;
