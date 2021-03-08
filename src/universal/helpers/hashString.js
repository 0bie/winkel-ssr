// Generate hash from string https://stackoverflow.com/a/7616484
export default function hashString(string) {
    let hash = 0, index, character
    if (string.length === 0) return hash
    for (index = 0; index < string.length; index++) {
        character = string.charCodeAt(index)
        hash  = ((hash << 5) - hash) + character
        hash |= 0 // Convert to 32bit integer
    }
    return hash
}
