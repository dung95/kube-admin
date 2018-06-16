function get(req, res) {
    res.render('index', {
        page: 'pages/home'
    });
}

module.exports = get;