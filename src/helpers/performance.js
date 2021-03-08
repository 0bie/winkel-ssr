import {SUPPORTS_PERFORMANCE_USER_TIMING} from './constants'

export const observeLongTasks = () => {
    // Observe long tasks in Chrome w/ PerformanceObserver
    try {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('Long Task', {
                    start: entry.startTime,
                    end: entry.startTime + entry.duration,
                    attribution: entry.attribution
                })
            }
        })
        observer.observe({entryTypes: ['longtask'], buffered: true})
    } catch(err) {}
}

export const markRouteChange = () => {
    if (SUPPORTS_PERFORMANCE_USER_TIMING) {
        performance.mark('routeChange')
    }
}

export const markHydrateStart = () => {
    if (SUPPORTS_PERFORMANCE_USER_TIMING) {
        performance.mark('beforeHydrate')
    }
}

export const markHydrateEnd = () => {
    if (!SUPPORTS_PERFORMANCE_USER_TIMING) return
    performance.mark('afterHydrate')
    performance.measure('before hydration', undefined, 'beforeHydrate')
    performance.measure('hydration', 'beforeHydrate', 'afterHydrate')
    console.log(performance.getEntriesByType('measure'))
    clear()
}

export const markGetPropsStart = () => {
    if (SUPPORTS_PERFORMANCE_USER_TIMING) {
        performance.mark('beforeGetProps')
    }
}

export const markGetPropsEnd = () => {
    if (!SUPPORTS_PERFORMANCE_USER_TIMING) return
    performance.mark('afterGetProps')
    performance.measure('before getProps', undefined, 'beforeGetProps')
    performance.measure('getProps', 'beforeGetProps', 'afterGetProps')
    console.log(performance.getEntriesByType('measure'))
    clear()
}

export const clear = () => {
    if (!SUPPORTS_PERFORMANCE_USER_TIMING) return
    performance.clearMarks()
    performance.clearMeasures()
}
