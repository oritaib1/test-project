import "./Button.css";

function Button({innerText, onClick}){
return(
    <div className="button-control">
       <button className="button-global" onClick={onClick}>{innerText}</button>
    </div>
)
}

export default Button;