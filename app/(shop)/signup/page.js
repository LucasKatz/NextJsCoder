import SignUp from "../../../components/forms/signupForm"

export async function generateMetadata({params, searchParams}, parent) {

    return {
        title: `Night Owl - SignUp`,
    }
}

const  signUpPage = () => {

    return (

        <main className="m-auto p-5">
            <SignUp />
        </main>
    );
    }

export default signUpPage