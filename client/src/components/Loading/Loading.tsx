import style from "./Style.module.css";
const Loading = () => {

  return (
    <div className={`spinner-border text-warning ${style.lg}`} role="status">
    </div>
  );
};

export default Loading;


