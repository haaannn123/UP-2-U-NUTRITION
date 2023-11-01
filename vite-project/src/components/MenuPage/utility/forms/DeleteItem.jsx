import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { useNavigate } from "react-router-dom";
import { deleteMenuItemThunk, getAllMenuItemThunk } from "../../../../store/menus";

const DeleteItem = ({ menu_id }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const navigate = useNavigate()



    const deleteButton = async (e) => {
        e.preventDefault()
        await dispatch(deleteMenuItemThunk(menu_id))
        await dispatch(getAllMenuItemThunk())
        navigate('/menu')
        closeModal()
    }


    return (
        <div className="delete-modal-menu-item">
            <h1>Are you sure you want to delete this item?</h1>
            <button id='delete-item-yes' onClick={deleteButton}>Yes (delete this item)</button>
            <button id='delete-item-no' onClick={() => closeModal()}>No (don't this item)</button>
        </div>
    )

}

export default DeleteItem
