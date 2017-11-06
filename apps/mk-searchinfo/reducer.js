import { Map, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const initState = getInitState()
        return this.metaReducer.init(state, initState)
    }

    load = (state, {hits, _shards}) => {
        let allInfo = [],
            pagination = {
                current: 1,
                total: hits.hits.length,
                pagiSize: 8
            }
        hits.hits.map(o => {
            allInfo.push({
                __html: o.highlight.content
            })
        })
        
        state = this.metaReducer.sf(state, 'data.hits', fromJS(hits.hits))
        state = this.metaReducer.sf(state, 'data.allInfo', fromJS(allInfo))
        state = this.metaReducer.sf(state, 'data.pagination', fromJS(pagination))
        return state
    }
    
    changeSearch = (state, key, value) => {
        state = this.metaReducer.sf(state, 'data.' + key, value)
        return state
    }

}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}