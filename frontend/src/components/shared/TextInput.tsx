import { useField, FieldAttributes, Field, ErrorMessage } from 'formik';
import React from 'react'

type myInputProps = { label?: string, free_style?:string } & FieldAttributes<object>;

const TextInput: React.FC<myInputProps> = ({ label, free_style, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className={`flex-grow ${free_style}`}>
            {label && (
                <label
                    className=" sm:text-[16px] text-[14px] block"
                    htmlFor={field.name}
                >
                    {label}
                </label>)
            }
            <div className="relative">

                <Field
                    className={`flex-1 bg-white w-full px-2 py-2 block rounded sm:text-[16px] text-[14px] border text-black border-mediumGrey border-opacity-25 placeholder:opacity-50 focus:outline-none focus:border-orangeSkin  ${meta.touched &&
                        meta.error &&
                        'border-opacity-100 border-mainRed'
                        }`}
                    {...field}
                    {...props}
                    autoComplete="off"
                />
                <ErrorMessage component="div" name={field.name} className="text-mainRed text-[12px] absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
        </div>
    );
};

export default TextInput;

