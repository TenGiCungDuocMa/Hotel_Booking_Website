import { jwtDecode } from 'jwt-decode'

export const getCurrentUser = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return {
            email: decoded.sub,
            role: decoded.role,
            userId: decoded.userId
        };
    } catch (err) {
        return null;
    }
};

export const isAdmin = () => {
    const user = getCurrentUser();
    return user?.role === "admin";
};
