import Button from "@/components/userint/button";
import Link from "next/link";

export default function NotFound() {
const containerStyle = {
    margin: "auto",
    backgroundImage: "url('https://media.giphy.com/media/FlodpfQUBSp20/giphy.gif')",
    backgroundSize: "cover", 
    minHeight: "100vh", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const divStyle = {
    backgroundColor: "#FFA07A", 
    textAlign: "center",
    padding: "2rem", 
};

const headingStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#800080", 
    marginBottom: "1rem", 
};

const buttonStyle = {
    backgroundColor: "#6B46C1",
    padding: "0.5rem 1rem",
    fontWeight: 600,
    borderRadius: "0.375rem",
    cursor: "pointer", 
    display: "inline-block", 
};

const linkStyle ={
    color: "rgb(255, 248, 187)",
    textDecoration: "none", 
}

return (
    <main style={containerStyle}>
        <div style={divStyle}>
            <h1 style={headingStyle}>
                THE REQUESTED PAGE HAS NOT BEEN FOUND
            </h1>
            <h2 style={headingStyle}>
                You will soon be redirected to the home page of this website
            </h2>
            <button style ={buttonStyle}>
                <Link style = {linkStyle} href={"/products/all"}>Back to Catalogue</Link>
            </button>
        </div>
    </main>
);
}
