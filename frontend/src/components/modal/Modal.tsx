import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react'
import useOnClickOutside from '../hooks/useOnClickOutside';
import { backdropVariant, modalVariant } from '../../utils/animations';
import { X } from 'phosphor-react';

interface props {
    showModal: boolean,
    general?: string
    children: any
    setShowModal: (val: boolean) => void;
}

const Modal = ({ showModal, setShowModal, general, children }: props) => {
    const modalRef = useRef(null)

    const handleClickOutside = () => { setShowModal(false) }
    useOnClickOutside(modalRef, handleClickOutside)

    return (
        <AnimatePresence>
            {
                showModal ? (
                    <motion.div
                        variants={backdropVariant}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className='fixed w-full h-full left-0 top-0 fix-marg flex px-4 items-center justify-center z-50 bg-modalBackgroundLayer'>
                        <motion.div
                            ref={modalRef}
                            variants={modalVariant}
                            className={`${general} max-w-[480px] w-full bg-[#0d0240] border border-gray-500 rounded-md text-white sm:p-8 p-5 overflow-auto relative`} >
                                <button className='absolute top-3 right-4' onClick={() => setShowModal(false)}><X size={32} color='#fff' weight='fill'/></button>
                            {children}
                        </motion.div>
                    </motion.div>
                ) : null}
        </AnimatePresence>
    )
}

export default Modal;

