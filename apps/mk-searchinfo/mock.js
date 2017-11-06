/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'
import img from './img/product.jpg'
const mockData = fetch.mockData


function initMockData() {
    if (!mockData.hits) {
        mockData.hits = []
        for (let i = 0; i < 10; i++) {
            mockData.hits.push({
                id: i,
                _source: {
                    img: img,
                    title: 'monkey-king' + (i + 1),
                    subtitle: 'mk' + (i + 1),
                    date: '2017-06-01',
                    source: 'mk框架',
                    publicyType: '基于react,redux,immutable探索',
                    publisher: 'ziaochina',
                    url: 'https://github.com/ziaochina/reactMonkey'
                },
                highlight: {
                    content: 'mk-js简介 mk = Monkey King = 齐天大圣  mk系列是一套完整的前、后台解决方案 欢迎satr 特点: 将网站分成多个独立app，每个app开发模式完全一致，并且可以克隆npmjs发布模板app将后台服务分成多个独立service, 每个servie开发模式完全一致， 并且可以克隆npmjs发布的模板service开发者自己做的app，service可以发布到npmjs开源给其他开发者使用，成为一个生态化的框架。 代表作: 易嘉财税'
                }
            })
        }
    }
}


fetch.mock('/_search', (option) => {
    initMockData()

//    const { pagination } = option

    var data = mockData.hits
/*
    var current = 1 // pagination.current
    var pageSize = 8 // pagination.pageSize
    var start = (current - 1) * pageSize
    var end = current * pageSize

    start = start > data.length - 1 ? 0 : start
    end = start > data.length - 1 ? pageSize : end
    current = start > data.length - 1 ? 1 : current
*/
    var ret = {
       /* result: true,
        value: {
            pagination: { current, pageSize, total: data.length },
            products: []
        }*/
        hits: {
            hits: []
        }
    }

    for (let j = 0 /*start*/; j < data.length; j++) {
        if (data[j])
            ret.hits.hits.push(data[j])
    }

    return ret
})