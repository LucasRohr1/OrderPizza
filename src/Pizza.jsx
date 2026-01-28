const Pizza = (props) => {
  return (
    <div className="pizza">
      <img src={props.image} alt={props.name} />
      <h1>{props.name}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default Pizza;
