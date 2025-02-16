import React, { useState } from "react";
import InputText from "../components/input-text/InputText";
import ErrorText from "../components/error/ErrorText";
import config from "../constants/config";
import { Link, useNavigate } from "react-router";

interface LoginForm {
    emailId: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const INITIAL_LOGIN_OBJ: LoginForm = {
        password: "",
        emailId: "",
    };

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loginObj, setLoginObj] = useState<LoginForm>(INITIAL_LOGIN_OBJ);

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch(`${config.backendUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: loginObj.emailId,
                    password: loginObj.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed. Please check your credentials.");
            }

            const data: {
                payload: {
                    id: string;
                    email: string;
                    role: string;
                    token: string;
                };
            } = await response.json();

            // Save user data to localStorage
            localStorage.setItem("token", data.payload.token);
            localStorage.setItem("role", data.payload.role);
            localStorage.setItem("userId", data.payload.id);

            // Navigate to the dashboard
            navigate("/admin/dashboard");
        } catch (err: any) {
            setErrorMessage(err.message || "An error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    const updateFormValue = ({ updateType, value }: { updateType: keyof LoginForm; value: string }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="py-24 px-10">
                    <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
                    <form onSubmit={submitForm}>
                        <div className="mb-4">
                            <InputText
                                type="email"
                                defaultValue={loginObj.emailId}
                                updateType="emailId"
                                containerStyle="mt-4"
                                labelTitle="Email Id"
                                updateFormValue={updateFormValue}
                            />

                            <InputText
                                defaultValue={loginObj.password}
                                type="password"
                                updateType="password"
                                containerStyle="mt-4"
                                labelTitle="Password"
                                updateFormValue={updateFormValue}
                            />
                        </div>

                        {/* <div className="text-right text-primary">
                            <Link to="/forgot-password">
                                <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                    Forgot Password?
                                </span>
                            </Link>
                        </div> */}

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>
                            Login
                        </button>

                        {/* <div className="text-center mt-4">
                            Don't have an account yet?{" "}
                            <Link to="/register">
                                <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                    Register
                                </span>
                            </Link>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;