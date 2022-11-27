module.exports = {
    parseTimestamp(timestamp) {
        let date = 0
        try {
            date = parseInt(timestamp) / 1000;
            date = Math.floor(date);
        } catch (e) {
            console.error(e)
        }
        return date
    }
}