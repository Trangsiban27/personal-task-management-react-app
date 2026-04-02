
export const formatUppercaseFirstLetter = (text) => {
    if (!text) return

    const formattedText = text.charAt(0).toUpperCase() + text.slice(1)

    return formattedText
}