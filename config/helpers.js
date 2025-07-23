import MySqli from 'mysqli';

let conn = new MySqli({
    host: 'localhost',
    post: '3306',
    user: 'root',
    passwd: '',
    db: 'eco_savers'
});

export const   database = conn.emit(false, '');

module.exports = {
    database: db
}
