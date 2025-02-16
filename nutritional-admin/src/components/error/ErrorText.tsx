import React from "react";

interface ErrorTextProps {
    children: React.ReactNode;
    styleClass?: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ children, styleClass = "" }) => {
    return <div className={`text-error ${styleClass}`}>{children}</div>;
};

export default ErrorText;