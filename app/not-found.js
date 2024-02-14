import Link from "next/link";

export default function NotFound() {
const containerStyle = {
    margin: "auto",
    backgroundImage: "url('https://media.giphy.com/media/FlodpfQUBSp20/giphy.gif')",
    minHeight: "100vh", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const divStyle = {
    backgroundColor: "#FFFFFF", 
    textAlign: "center",
    padding: "2rem", 
    borderRadius:"2rem"
};

const headingStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "blue", 
    marginBottom: "1rem", 
};

const buttonStyle = {
    backgroundColor: "blue",
    padding: "0.5rem 1rem",
    fontWeight: 600,
    borderRadius: "0.375rem",
    cursor: "pointer", 
    display: "inline-block",
    color:"white" 
};

const linkStyle ={
    //color: "rgb(255, 248, 187)",
    textDecoration: "none", 
}

return (
    <main style={containerStyle}>
        <div style={divStyle}>
            <h1 style={headingStyle}>
                THE REQUESTED PAGE <br></br>HAS NOT BEEN FOUND
            </h1>
            <h3 style={headingStyle}>
                You will soon be redirected to the home page of this website
            </h3>
            <button style ={buttonStyle}>
                <Link style = {linkStyle} href={"/products/all"}>Back to Catalogue</Link>
            </button>
        </div>
    </main>
);
}
