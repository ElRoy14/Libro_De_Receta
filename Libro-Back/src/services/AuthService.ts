

export function login(req: any, res: any) {
    // Assuming user is authenticated and user info is available in req.user
    if (req.user) {
        res.status(200).json({ message: 'Login successful', user: req.user });
    } else {
        res.status(401).json({ message: 'User not authenticated' });
    }
}

export function logout(req: any, res: any) {
    req.logout((err: any) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Error during logout');
        }
        req.session.destroy((err: any) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Error destroying session');
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logout successful' });
        });
    });
}

export function signup(req: any, res: any) {
    // Assuming user registration logic is implemented here
    const { email, password } = req.body;
    // Perform user registration logic (e.g., save to database)
    // For demonstration, we'll just return a success message
    res.status(201).json({ message: 'Signup successful', email });
}