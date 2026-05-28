import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-4">

                <div className="text-center max-w-md">

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        You need to sign in
                    </h1>

                    <p className="text-gray-500 mb-6 text-sm sm:text-base">
                        Please sign in to access blogs and continue reading.
                    </p>

                    <button
                        onClick={() => {
                            navigate("/signin")
                        }}
                        className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
                    >
                        Sign in
                    </button>

                </div>

            </div>
        );
    }

    return children;
}