export const fetchUsers = async () => {
    const response = await fetch(
        `${process.env.REACT_APP_DEMO}`
    );
    return response.json();
};