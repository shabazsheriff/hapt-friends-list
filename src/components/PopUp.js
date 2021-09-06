function PopUp({ popUp, deleteConfirm, deleteCancel }) {
  return (
    <>
      {popUp.show && (
        <div className="pop-up-container">
          <div className="pop-up-inner">
            <p>Are sure you want to delete?</p>
            <div className="button-container">
              <button
                className="confirm-button delete-yes"
                onClick={deleteConfirm}
                >
                Yes
              </button>
              <button className="confirm-button delete-no" onClick={deleteCancel}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopUp;
