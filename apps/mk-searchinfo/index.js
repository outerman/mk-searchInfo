import config from './config'
import * as data from './data'

export default {
	name: "search",
	version: "1.0.2",
	description: "search",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "search")
	}
}