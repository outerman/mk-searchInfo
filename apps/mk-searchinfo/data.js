export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: '{{!data.hits.length ? "mk-app-product-list mk-app-product-list-noData" : "mk-app-product-list"}}',
		children: [{
            name: 'search',
            component: '::div',
            className: 'mk-app-product-list-search',
            children: [{
                name: 'searchKey',
                component: 'Input.Search',
                value: '{{data.searchKey}}',
                placeholder: '显示内容为预制数据',
                onChange: '{{$handleChange("searchKey")}}',
                onSearch: '{{$handleSearch("searchKey")}}' 
            }]
        }, {
			name: 'products',
			component: 'GridLayout.WidthProviderGridLayout',
			className: 'mk-app-product-list-products',
			cols: 12,
			rowHeight: 50,
			margin: [20, 20],
			isResizable: false,
			isDraggable: false,
			_visible: '{{data.hits && data.hits.length > 0}}',
			layout: '{{$getLayout()}}',
			children: [{
				name: 'container',
				component: '::div',
				key: "{{data.hits[_rowIndex].id + ''}}",
                className: 'mk-app-product-list-content',
				_power: 'for in data.hits',
				children: {
					name: 'hits',
					component: 'Card',
					children: [{
                        name: 'title',
                        component: '::a',
                        href: '{{data.hits[_rowIndex]._source.url}}',
                        target: '_blank',
						className: 'mk-app-product-list-title',
                        children: '{{data.hits[_rowIndex]._source.title}}'
                    }, {
                        name: 'productContent',
                        component: '::div',
                        className: 'mk-app-product-list-productContent',
                        children: [{
                            name: 'img',
                            component: '::img',
                            className: 'mk-app-product-list-img',
                            src: '{{data.hits[_rowIndex]._source.img ? data.hits[_rowIndex]._source.img : ""}}'
                        }, {
                            name: 'description',
                            component: '::div',
                            className: 'mk-app-product-list-item',
                            children: [ {
                                name: 'subtitle',
                                component: '::div',
                                className: 'mk-app-product-list-item-subtitle',
                                children: "{{data.hits[_rowIndex]._source.subtitle}}"
                            },{
                                name: 'publisherDate',
                                component: '::div',
                                className: 'mk-app-product-list-item-publisherDate',
                                children: "{{'来源:' + (data.hits[_rowIndex]._source.source ? data.hits[_rowIndex]._source.source + '-' : '' ) + data.hits[_rowIndex]._source.policyType + (data.hits[_rowIndex]._source.publisher ? '-' +  data.hits[_rowIndex]._source.publisher : '' ) + '  ' + '发布日期:' +  data.hits[_rowIndex]._source.date}}"
                            }, {
                                name: 'details',
                                component: '::div',
                                className: 'mk-app-product-list-details',
                                dangerouslySetInnerHTML: '{{data.allInfo[_rowIndex]}}'
                            }, {
                                name: 'url',
                                component: '::a',
                                href: '{{data.hits[_rowIndex]._source.url}}',
                                target: '_blank',
                                className: 'mk-app-product-list-item-url',
                                children: "{{data.hits[_rowIndex]._source.url}}"
                            }]
                        }]
                    }]
				}
			}]
		}, {
			name: 'footer',
			className: 'mk-app-product-list-footer',
			component: 'Layout',
            _visible: '{{!data.hits.length ? false : true}}',
			children: [{
				name: 'pagination',
				component: 'Pagination',
				pageSize: 10086, //'{{data.pagination.pageSize}}',
				current: 1, //'{{data.pagination.current}}',
				total: '{{data.hits.length}}',
				onChange: '{{$pageChanged}}',
				onShowSizeChange: '{{$pageChanged}}'
			}]
		}]

	}
}

export function getInitState() {
	return {
		data: {
			layout: [],
			hits: [],
			pagination: { current: 1, total: 0, pageSize: 8 },
		}
	}
}