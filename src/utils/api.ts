import { fetchData } from './db'

export const fetchHarvestData = async () => {
    const config = await fetchData('apiConfig', 1)
    const { accountId, token } = config

    if (!token || !accountId) {
        throw new Error('Missing Harvest credentials in IndexedDB')
    }

    const res = await fetch('https://api.harvestapp.com/v2/time_entries', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Harvest-Account-Id': accountId
        }
    })
    const data = await res.json()
    return data.time_entries || []
}
