exports.db = function(){
    var conn = {
            connectionLimit: 10,
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            database: 'job_tracker'
    }
    return conn;
}