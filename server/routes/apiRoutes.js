
let apiRoutes = (app, passport) => {
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('api/dashboard', function(req, res) {
        res.status(200).json({
            message: "You're authorized to see this secret message.",
            user: req.user  // get the user out of session and pass to template
        });
    });
};
export default apiRoutes;
