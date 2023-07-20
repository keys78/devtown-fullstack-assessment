import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import TextInput from "./TextInput";
import { menuVariations } from "../../utils/animations";

interface IProps {
    item: any,
    setItem: any,
    label: string,
    placeholder: string

}

const Dropdown = ({ label, item, setItem, placeholder }: IProps) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <h3 className="mt-6 body-md sm:text-[16px] text-[14px] capitalize">{label}</h3>
            <div className="relative">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    type="button"
                    className="inline-flex justify-between items-center w-full bg-white text-sm text-black focus:outline-orangeSkin placeholder:opacity-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    <TextInput name={label} type="text" placeholder={placeholder}
                    />
                    <svg className="-mr-1 ml-2 h-5 w-5 fill-mainPurple" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <AnimatePresence>
                    {showMenu &&
                        <motion.div
                            className="origin-top-right absolute right-0 w-full rounded-md shadow-lg bg-white  focus:outline-none"
                            variants={menuVariations as any}
                            initial="closed"
                            animate={showMenu ? "open" : "closed"}
                            exit="closed"
                        >
                            <ul className="py-1 zedder bg-white dark:bg-veryDarkGrey border border-gray-200 rounded-[5px]">
                                {item.slice().sort().map((column: any, i: number) => (
                                    <li
                                        onClick={() => {
                                            setItem(label, column);
                                            setShowMenu(false);
                                        }}
                                        key={i}
                                        className="text-mediumGrey block px-4 py-2 text-sm hover:text-mainPurple hover:bg-[#C7CEDB] capitalize"
                                    >
                                       {column}
                                    </li>
                                ))}
                            </ul>

                        </motion.div>
                    }
                </AnimatePresence>
            </div >
        </>
    )
}
export default Dropdown;