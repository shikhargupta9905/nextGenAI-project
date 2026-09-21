import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa"
import Auth from '../pages/Auth'

function AuthModel({ onClose }) {

    const { userData } = useSelector((state) => state.user)

    useEffect(() => {

        if (userData) {
            onClose()
        }

    }, [userData, onClose])

    return (
        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/10 backdrop-blur-sm px-4'>

            <div className='relative w-full max-w-md'>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className='absolute right-4 top-4 z-50 text-gray-600 hover:text-black transition'
                >
                    <FaTimes size={20} />
                </button>

                <Auth isModel={true} />

            </div>

        </div>
    )
}

export default AuthModel