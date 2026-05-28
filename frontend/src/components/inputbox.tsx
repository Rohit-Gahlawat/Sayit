import type { ChangeEvent } from "react"

type InputBoxProps = {
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
}

export const Inputbox = ({ placeholder, onChange, value }: InputBoxProps) => {
    return <div>
        <input onChange={onChange} value={value} placeholder={placeholder} className="border p-2 rounded w-full" type="text" >
        </input>
    </div>
}