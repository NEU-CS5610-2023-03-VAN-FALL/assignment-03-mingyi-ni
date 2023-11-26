import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
    const { user } = useAuth0();

    return (
        <div className="container mt-5">
            <div className="card bg-dark text-white">
                <div className="card-body">
                    <h5 className="card-title">Profile</h5>
                    <div className="mb-3">
                        <p className="card-text">Name: {user.name}</p>
                    </div>
                    <div className="mb-3">
                        <img src={user.picture} width="70" alt="profile avatar" />
                    </div>
                    <div className="mb-3">
                        <p className="card-text">📧 Email: {user.email}</p>
                    </div>
                    <div className="mb-3">
                        <p className="card-text">🔑 Auth0Id: {user.sub}</p>
                    </div>
                    <div>
                        <p className="card-text">✅ Email verified: {user.email_verified?.toString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
