/* eslint camelcase:0 */
'use strict'

// Require
const helpers = require('outpatient')

// Prepare
const websiteVersion = require('./package.json').version
const siteUrl = process.env.NODE_ENV === 'production' ? 'https://playbook.mangrove.io' : 'http://localhost:9778'


// =================================
// Configuration


// The DocPad Configuration File
// It is simply a CoffeeScript Object which is parsed by CSON
const docpadConfig = {

	// =================================
	// Template Data
	// These are variables that will be accessible via our templates
	// To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

	templateData: {

		text: {
			edit: 'Improve'
		},


		// -----------------------------
		// Site Properties

		site: {
			// The production URL of our website
			url: siteUrl,

			// The default title of our website
			title: 'Mangrove Playbook',

			// The website description (for SEO)
			// description: 'the mangrove playbook description',

			// The website keywords (for SEO) separated by commas
			keywords: 'mangrove, playbook',

			// Styles
			styles: [
				'/vendor/normalize.css',
				'/styles/style.css'
			].map(function (url) {
				return `${url}?websiteVersion=${websiteVersion}`
			}),

			// Script
			scripts: []
		},

		services: {
			googleSearch: '000711355494423975011:zgfeo4oync4'
		}

	},


	// =================================
	// Plugins

	// Alias stylus highlighting to css and there is no inbuilt stylus support
	plugins: {
		downloader: {
			downloads: [{
				name: 'Normalize CSS',
				path: 'src/raw/vendor/normalize.css',
				url: 'https://rawgit.com/h5bp/html5-boilerplate/5.3.0/dist/css/normalize.css'
			}]
		},

		repocloner: {
			repos: [{
				name: 'Mangrove Playbook',
				path: 'src/documents/learn/mangrove-playbook/playbook',
				url: 'https://github.com/meetmangrove/playbook.git'
			}]
		},

		cleanurls: {
			// enable this for surge.sh deployment
			trailingSlashes: true,

			// Common Redirects
			simpleRedirects: {
				'/twitter': 'https://twitter.com/meetmangrove',
				'/github': 'https://github.com/meetmangrove'
			}
		}
	}
}


// Apply our helpers to the docpad configuration
helpers({
	config: {
		getUrl ({ categoryId, name }) {
			return `/${categoryId}/${name}`.replace(/_/g, '-')
		},
		docs: {
			url: '/'
		},
		projects: {
			playbook: {
				editUrl: 'https://github.com/meetmangrove/playbook/edit/master/',
				title: 'Mangrove Playbook',
				categories: {
					welcome: {
						title: 'Welcome to Playbook'
					},
					rules: {
						title: 'The Rules'
					},
					how: {
						title: "How To's"
					}
				}
			}
		}
	},
	docpadConfig
})

// Export our DocPad Configuration
module.exports = docpadConfig
