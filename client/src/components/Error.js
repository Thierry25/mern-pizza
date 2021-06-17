const Error = (props) => {
  return (
    <>
      <div className="alert alert-danger" role="alert">
        {props.error}
      </div>
    </>
  );
};

export default Error;
