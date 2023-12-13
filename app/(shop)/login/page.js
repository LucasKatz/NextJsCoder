import LoginForm from "@/components/forms/loginForm";

export async function generateMetadata({params, searchParams}, parent) {
    console.log(params)

    return {
        title: `Night Owl - Login`,
    }
}


const LoginPage = () => {
    return (

        <main className="m-auto">
            <LoginForm />
        </main>

    );
};

export default LoginPage;