"use client"

const Button = ({children, className = '', ...args}) => {

    return (
        <button
            className={`buttonUI ${className}`}
            {...args}
        >
            {children}
        </button>
    )
}

export default Button

