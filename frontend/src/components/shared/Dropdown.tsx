import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import TextInput from "./TextInput";
import { menuVariations } from "../../utils/animations";
import { CaretDown } from "phosphor-react";

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
                    className="inline-flex justify-between items-center w-full bg-white text-sm text-black focus:outline-orangeSkin placeholder:opacity-50 rounded-[5px]"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    <TextInput name={label} type="text" placeholder={placeholder}
                    />
                   <CaretDown className="w-[36px]"  weight="bold" size={16}/>
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