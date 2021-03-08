import {hashString} from '../helpers'

class AppCache {
    constructor(cache = []) {
        this.cache = cache
        this.cacheHits = 0
    }

    getCache() {
        return this.cache
    }

    getCacheHits() {
        return this.cacheHits
    }

    getFromCache(key) {
        return Promise.resolve().then(() => {
            const hash = hashString(key)
            const index = this.cache.map((bucket) => bucket['key']).indexOf(hash)
            if (index >= 0) {
                this.cacheHits++
                console.info(`Cache[hit]: ${key} returned from cache`)
                return this.cache[index]
            } else {
                console.info(`Cache[miss]: ${key} not found in cache`)
            }
        })
    }

    addItemToCache(key, cached) {
        return Promise.resolve().then(() => {
            const hash = hashString(key)
            const bucket = {
                key: hash,
                cached
            }
            this.cache.push(bucket)
            console.info(`Cache: ${key} was added to cache`)
        })
    }

    removeItemFromCache(key) {
        return Promise.resolve().then(() => {
            const hash = hashString(key)
            const index = this.cache.map((bucket) => bucket['key']).indexOf(hash)
    
            if (index >= 0) {
                delete this.cache[index]
                console.info((`Cache: ${key} removed from cache`))
            } else {
                console.info(`Cache: ${key} not found in cache`)
            }
        })
    }

    clearCache() {
        this.cache = []
    }
}

export default new AppCache()
