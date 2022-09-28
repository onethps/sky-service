function Form(props) {
  const { children, ...other } = props;
  return (
    <form autoComplete="off" {...other}>
      {children}
    </form>
  );
}

export default Form;
