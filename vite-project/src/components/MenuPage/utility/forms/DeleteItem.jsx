import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { useNavigate } from "react-router-dom";
import { deleteMenuItemThunk, getAllMenuItemThunk } from "../../../../store/menus";
import './AddItem.css'

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
            <div class="p-6 text-center">
                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this item?</h3>
                <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={deleteButton}>
                    Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => closeModal()}>No, cancel</button>
            </div>
            {/* <h1>Are you sure you want to delete this item?</h1>
            <button id='delete-item-yes' onClick={deleteButton}>Yes (delete this item)</button>
            <button id='delete-item-no' onClick={() => closeModal()}>No (don't this item)</button> */}
        </div>
    )

}

export default DeleteItem
