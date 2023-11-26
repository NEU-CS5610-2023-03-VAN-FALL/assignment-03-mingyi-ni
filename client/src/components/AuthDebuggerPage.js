import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";

export default function AuthDebugger() {
    const { user } = useAuth0();
    const { accessToken } = useAuthToken();

    return (
        <div className="container mt-5">
            <div className="card mb-3">
                <div className="card-header">
                    <h5 className="card-title">Access Token</h5>
                </div>
                <div className="card-body">
                    <pre className="overflow-auto" style={{ maxHeight: "300px" }}>
                        {JSON.stringify(accessToken, null, 2)}
                    </pre>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">User Info</h5>
                </div>
                <div className="card-body">
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
}
