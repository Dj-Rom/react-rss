import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './Modal'
import UncontrolledForm from './forms/UncontrolledForm'
import ControlledForm from './forms/ControlledForm'
import { addFormData } from '../store/formSlice'
import type { RootState } from '../store/store'
import type { FormData } from '../types'
import './MainPage.css'

const MainPage: React.FC = () => {
    const dispatch = useDispatch()
    const formData = useSelector((state: RootState) => state.form.data)
    const [activeModal, setActiveModal] = useState<string | null>(null)
    const [newItemId, setNewItemId] = useState<number | null>(null)

    const openModal = (modalType: string) => setActiveModal(modalType)
    const closeModal = () => setActiveModal(null)

    const handleFormSubmit = (data: FormData) => {
        const newId = Date.now()
        dispatch(addFormData({ ...data, id: newId }))
        setNewItemId(newId)
        closeModal()

        // Reset highlight after 3 seconds
        setTimeout(() => setNewItemId(null), 3000)
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal()
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    return (
        <div className="main-page">
            <h1>Forms in Modal Windows</h1>
            <div className="button-group">
                <button
                    className="btn btn-primary"
                    onClick={() => openModal('uncontrolled')}
                >
                    Open Uncontrolled Form
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => openModal('controlled')}
                >
                    Open Controlled Form (React Hook Form)
                </button>
            </div>

            <div className="form-data-container">
                <h2>Form Data</h2>
                <div className="data-grid">
                    {formData.map((data) => (
                        <div
                            key={data.id}
                            className={`data-card ${newItemId === data.id ? 'highlight' : ''}`}
                        >
                            <h3>{data.name}</h3>
                            <p>Age: {data.age}</p>
                            <p>Email: {data.email}</p>
                            <p>Gender: {data.gender === 'male' ? 'Male' : 'Female'}</p>
                            <p>Country: {data.country}</p>
                            {data.photo && (
                                <div className="photo-preview">
                                    <img src={data.photo} alt="Preview" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {activeModal === 'uncontrolled' && (
                <Modal onClose={closeModal} title="Uncontrolled Form">
                    <UncontrolledForm onSubmit={handleFormSubmit} />
                </Modal>
            )}

            {activeModal === 'controlled' && (
                <Modal onClose={closeModal} title="Controlled Form (React Hook Form)">
                    <ControlledForm onSubmit={handleFormSubmit} />
                </Modal>
            )}
        </div>
    )
}

export default MainPage
