import { useState } from "react";
import '../css/FormBase.css'
import { Textarea } from "@mantine/core";
function FormBase({ title = [], onSubmit, buttonName, onCancel }) {
    const [formData, setFormData] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleCancel = () => {
        if (onCancel) {
            onCancel()
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (onSubmit) {
            onSubmit(formData)
        }
    };

    return (
        <div className="bg-fog">
            <form className="hide-scroll w-[95%] md:w-[70%] lg:w-[50%] h-[90%] md:h-[80%] lg:h-[60%] overflow-y-scroll" onSubmit={handleSubmit}>
                {title.map((inputTitle) => (
                    <div className="flex w-[80%] flex-col md:flex-row mx-auto my-4 md:my-2 justify-between" key={inputTitle.name}>
                        <label>{inputTitle.name}</label>
                        {inputTitle.type === 'input' ? (
                            <input
                                className="input-custom w-full md:w-[50%]"
                                type="text"
                                name={inputTitle.binding}
                                value={formData[inputTitle.binding] || ''}
                                onChange={handleChange}
                            />
                        ) : inputTitle.type === 'area' ? (
                            <Textarea
                                className="text-custom w-full md:w-[50%]"
                                rows={10}
                                cols={20}
                                name={inputTitle.binding}
                                value={formData[inputTitle.binding] || ''}
                                onChange={handleChange}
                            ></Textarea>
                        ) : inputTitle.type === 'select' ? (
                            <select
                                className="select-custom w-full md:w-[50%]"
                                name={inputTitle.binding}
                                value={formData[inputTitle.binding] || inputTitle.defaultValue || ''}
                                onChange={handleChange}
                            >
                                {inputTitle.options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : null}
                    </div>
                ))}
                <div className="w-[80%] mx-auto flex items-center justify-between">
                    <div className="btn-cancel px-3 py-1" onClick={handleCancel}>Huỷ</div>
                    <button className="btn-primary px-3 py-1" type="submit">{buttonName}</button>
                </div>
            </form>
        </div>
    )
}

export default FormBase