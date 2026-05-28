import type { ChangeEvent } from "react"

type type = {
    label: string
    placeholder: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string

}
export const InputForm = ({ label, placeholder, value, onChange, type }: type) => {
    return <div>
        <label className="text-l font-color-gray-700 mb-1">
            {label}
            <input onChange={onChange} type={type || "text"} value={value} placeholder={placeholder} className="border p-2 rounded w-full"  >
            </input>
        </label>


    </div>
}