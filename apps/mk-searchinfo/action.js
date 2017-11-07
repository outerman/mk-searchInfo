import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import { pageSize } from './data'

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

    load = async (key, currentPage, pageSize) =>{
        let ret = {
                "q": key,
                "size": pageSize,
                "from": (currentPage - 1) * pageSize
            }
        const response = await this.webapi.search.query(ret)
        if(!response.value.hits.length) {
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
            this.load(e, 1, pageSize)
        }
    }

    pageChanged = (current) => {
        this.injections.reduce('changeSearch', 'page', current)
        
        let key = this.metaAction.gf('data.searchKey')
        this.load(key, current, pageSize)
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