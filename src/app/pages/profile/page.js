'use client';

const Profile = () => {

    const logout = async () => {
        const res = await fetch('/api/users/logout', { method: 'DELETE' });
        const data = await res.json();
        console.log(data);

        data.success && (window.location.href = '/');
    };

    return (
        <>
            <button onClick={logout}>Logout</button>
        </>
    );
};

export default Profile;