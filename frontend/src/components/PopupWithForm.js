import React from 'react';

function PopupWithForm({name, title, isOpen, children, onClose, textButton, onSubmit}) {
    
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container`}> 
                <h2 className="popup__header">{title}</h2>
                <form className={`popup__form`} name={`_type_${name}-form`} onSubmit={onSubmit}>
                    {children}
                    <button className="popup__close" type="button" name="close-button" onClick={onClose} />
                    <button className="popup__submit" type="submit" name="button">{textButton}</button>
                </form>
            </div>
        </div>
    );
  }
  
  export default PopupWithForm;