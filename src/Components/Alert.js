const Alert = ({ showAlert, alert: { type, messege } }) => {
  return (
    <div className='alert-container'>
      {showAlert && (
        <div className={`alert-box ${type}`}>
          <p>{messege}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
