function formatTimeZero(t) {
    return `${t > 9 ? t : '0' + t}`;
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

export { formatTimeZero, formatDate };