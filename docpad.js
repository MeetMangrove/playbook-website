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

		// -----------------------------
		// Misc

		text: {
			heading: 'Mangrove Playbook',
			copyright: 'Copyright CC-BY 4.0',

			linkNames: {
				main: 'Website',
				learn: 'Learn',
				email: 'Email',
				twitter: 'Twitter',

				support: 'Support',
				showcase: 'Showcase'
			}
		},

		navigation: {
			top: {
				Mangrove: '/',
				GitHub: 'https://github.com/meetmangrove'
			},

			bottom: {
				Playbook: '/',
				Mangrove: 'https://mangrove.io',
				GitHub: 'https://github.com/meetmangrove'
			}
		},


		// -----------------------------
		// Site Properties

		site: {
			// The production URL of our website
			url: siteUrl,

			// The default title of our website
			title: 'Mangrove Playbook',

			// The website description (for SEO)
			description: 'the mangrove playbook description',

			// The website keywords (for SEO) separated by commas
			keywords: 'mangrove, playbook',

			// Styles
			styles: [
				'/vendor/normalize.css',
				'/vendor/h5bp.css',
				'/vendor/highlight.css',
				'/styles/style.css'
			].map(function (url) {
				return `${url}?websiteVersion=${websiteVersion}`
			}),

			// Script
			scripts: [
				'//cdnjs.cloudflare.com/ajax/libs/anchor-js/3.2.2/anchor.min.js'
			]
		},

		services: {
			// googleSearch: '000711355494423975011:mvl83obfzvq'
		}

	},


	// =================================
	// Plugins

	// Alias stylus highlighting to css and there is no inbuilt stylus support
	plugins: {
		downloader: {
			downloads: [{
				name: 'HTML5 Boilerplate',
				path: 'src/raw/vendor/h5bp.css',
				url: 'https://rawgit.com/h5bp/html5-boilerplate/5.3.0/dist/css/main.css'
			}, {
				name: 'Normalize CSS',
				path: 'src/raw/vendor/normalize.css',
				url: 'https://rawgit.com/h5bp/html5-boilerplate/5.3.0/dist/css/normalize.css'
			}, {
				name: 'Highlight.js XCode Theme',
				path: 'src/raw/vendor/highlight.css',
				url: 'https://rawgit.com/isagalaev/highlight.js/8.0/src/styles/xcode.css'
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
			return `/${categoryId}/${name}`
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
