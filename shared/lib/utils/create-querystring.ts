export const createQueryString = (params: Record<string, any>) => {
    const cleanedParams = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

    return new URLSearchParams(cleanedParams).toString()
}
