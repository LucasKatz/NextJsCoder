"use client"

const Button = ({children, className = '', ...args}) => {

    return (
        <button
            className={`btn-nav ${className}`}
            {...args}
        >
            {children}
        </button>
    )
}

export default Button

