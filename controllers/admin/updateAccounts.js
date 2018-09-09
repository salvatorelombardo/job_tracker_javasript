module.exports = {

    updateRouteAccount: function (req, res) {
        res.render('updateaccount/updateccount', {
            title: 'Update Account Page',
            heading: 'Add Account',
            nav: true
        });
    }
}