function getHumanReadableDateTime() {
    const now = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // 12-hour clock
    };

    return new Intl.DateTimeFormat('en-US', options).format(now);
}

module.exports = { getHumanReadableDateTime }