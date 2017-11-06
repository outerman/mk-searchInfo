import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
        const pagination = this.metaAction.gf('data.pagination').toJS()
//        this.load(pagination)
    }

    load = async (ret) =>{
        const response = await this.webapi.search.query(ret)
        if(!response.hits.hits.length) {
            this.metaAction.toast('error', '暂无结果')
            return
        }
        this.injections.reduce('load', response)
    }
    
    handleChange = (key) => (e) => {
        if(key == 'searchKey') {
            this.injections.reduce('changeSearch', key, e.target.value)
        }
    }
    
    handleSearch = (key) => (e) => {
        if(!e) {
            this.metaAction.toast('error', '请输入内容进行操作')
            return 
        } 
        
        if(key == 'searchKey') {
            let pagination = this.metaAction.gf('data.pagination').toJS(),
            ret = {
                query: {match: {
                    content: e
                }},
                highlight: {
                    pre_tags: ['<b>'],
                    post_tags: ['</b>'],
                    fields: {
                        content: {}
                    }
                }
            }
            this.load(ret)
        }
    }

    pageChanged = (current, pageSize) => {
//        this.load({ current, pageSize })
    }

    getLayout = () => {
        const hits = this.metaAction.gf('data.hits')
        if(!hits || hits.size == 0) return
                
        return hits.map((o, index)=>this.getSingleLayout(index, o.get('id'))).toJS()
    }

    getSingleLayout = (index, id) =>{
        return {
            i: id + '',
            x: (index % 4) * 3,
            y: Math.floor(index / 4) * 4,
            w: 3,
            h: 4
        }
    }


}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}