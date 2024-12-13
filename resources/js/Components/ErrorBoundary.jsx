// resources/js/Components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to render fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error or send it to an error reporting service
        console.error("Error Boundary Caught an Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
