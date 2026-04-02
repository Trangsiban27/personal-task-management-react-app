
export const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString)

    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')

    return `${hour}:${minute} ${day}/${month}`
}