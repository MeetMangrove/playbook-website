/* eslint camelcase:0 */
'use strict'

// Import
const strUtil = require('underscore.string')
const websiteVersion = require('./package.json').version

// Prepare
const siteUrl = process.env.NODE_ENV === 'production' ? 'https://playbook.mangrove.io' : 'http://localhost:9778'

const textData = {
	heading: 'Mangrove Playbook',
	copyright: 'Copyright CC-BY 4.0',

	linkNames: {
		main: 'Website',
		learn: 'Learn',
		email: 'Email',
		twitter: 'Twitter',

		support: 'Support',
		showcase: 'Showcase'
	},

	projectNames: {
		playbook: 'Mangrove Playbook'
	},

	categoryNames: {
		welcome: 'Welcome to Playbook',
		rules: 'The Rules',
		how: 'How To\'s',
		faq: 'FAQs'
	}
}

const navigationData = {
	top: {
		Mangrove: '/',
		GitHub: 'https://github.com/meetmangrove'
	},

	bottom: {
		Playbook: '/',
		Mangrove: 'https://mangrove.io',
		GitHub: 'https://github.com/meetmangrove'
	}
}


// =================================
// Helpers

// Humanize
function humanize (text = '') {
	return strUtil.humanize(
		text.replace(/^[-0-9]+/, '').replace(/\..+/, '')
	)
}

// Titles
function getName (a, b) {
	if ( b == null ) {
		return textData[b] || humanize(b)
	}
	else {
		return textData[a][b] || humanize(b)
	}
}
function getProjectName (project) {
	return getName('projectNames', project)
}
function getCategoryName (category) {
	return getName('categoryNames', category)
}
function getLinkName (link) {
	return getName('linkNames', link)
}
function getLabelName (label) {
	return getName('labelNames', label)
}


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

		text: textData,
		navigation: navigationData,

		// -----------------------------
		// Site Properties

		site: {
			// The production URL of our website
			url: siteUrl,

			// The default title of our website
			title: textData.heading,

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

		// -----------------------------
		// Helper Functions

		// Names
		getName,
		getProjectName,
		getCategoryName,
		getLinkName,
		getLabelName,

		// Get the prepared site/document title
		// Often we would like to specify particular formatting to our page's title
		// we can apply that formatting here
		getPreparedTitle () {
			// if we have a title, we should use it suffixed by the site's title
			if ( this.document.pageTitle !== false && this.document.title ) {
				return `${this.document.pageTitle || this.document.title} | ${this.site.title}`
			}
			// if we don't have a title, then we should just use the site's title
			else if ( this.document.pageTitle === false || this.document.title == null ) {
				return this.site.title
			}
		},

		// Get the prepared site/document description
		getPreparedDescription () {
			// if we have a document description, then we should use that, otherwise use the site's description
			return this.document.description || this.site.description
		},

		// Get the prepared site/document keywords
		getPreparedKeywords () {
			// Merge the document keywords with the site keywords
			this.site.keywords.concat(this.document.keywords || []).join(', ')
		}
	},


	// =================================
	// Collections

	collections: {

		// Fetch all documents that exist within the docs directory
		// And give them the following meta data based on their file structure
		// [\-0-9]+#{category}/[\-0-9]+#{name}.extension
		docs (database) {
			const query = {
				write: true,
				relativeOutDirPath: {
					$startsWith: 'learn/'
				},
				body: {
					$ne: ''
				}
			}
			const sorting = [
				{projectDirectory: 1},
				{categoryDirectory: 1},
				{filename: 1}
			]

			return database.findAllLive(query, sorting).on('add', function (document) {
				// Prepare
				const a = document.attributes

				// learn/#{organisation}/#{project}/#{category}/#{filename}
				const pathDetailsRegexString = `
					^
					.*?learn/
					(.+?)/        // organisation
					(.+?)/        // project
					(.+?)/        // category
					(.+?)\\.      // basename
					(.+?)         // extension
					$
				`.replace(/\/\/.+/g, '').replace(/\s/g, '')
				const pathDetailsRegex = new RegExp(pathDetailsRegexString)
				const pathDetails = pathDetailsRegex.exec(a.relativePath)

				// Properties
				const layout = 'doc'
				const standalone = true

				// Check if we are correctly structured
				if ( pathDetails != null ) {
					const organisationDirectory = pathDetails[1]
					const projectDirectory = pathDetails[2]
					const categoryDirectory = pathDetails[3]
					const basename = pathDetails[4]

					const organisation = organisationDirectory.replace(/[-0-9]+/, '')
					const organisationName = humanize(organisation)

					const project = projectDirectory.replace(/[-0-9]+/, '')
					const projectName = getProjectName(project)

					const category = categoryDirectory.replace(/^[-0-9]+/, '')
					const categoryName = getCategoryName(category)

					const name = basename.replace(/^[-0-9]+/, '')

					const title = `${a.title || humanize(name)}`
					const pageTitle = `${title} | DocPad`  // changed from bevry website

					const urls = [`/docs/${name}`, `/docs/${category}-${name}`, `/docpad/${name}`]

					const githubEditUrl = `https://github.com/${organisationDirectory}/${projectDirectory}/edit/master/`
					// const proseEditUrl = `http://prose.io/#${organisationDirectory}/${projectDirectory}/edit/master/`
					const editUrl = githubEditUrl + a.relativePath.replace(`learn/${organisationDirectory}/${projectDirectory}/`, '')

					// Apply
					document.setMetaDefaults({
						layout,
						standalone,

						name,
						title,
						pageTitle,

						url: urls[0],

						editUrl,

						organisationDirectory,
						organisation,
						organisationName,

						projectDirectory,
						project,
						projectName,

						categoryDirectory,
						category,
						categoryName
					}).addUrl(urls)
				}

				// Otherwise ignore this document
				else {
					/* eslint no-console:0 */
					console.log(`The document ${a.relativePath} was at an invalid path, so has been ignored`)
					document.setMetaDefaults({
						ignore: true,
						render: false,
						write: false
					})
				}
			})
		},

		partners (database) {
			const query = {relativeOutDirPath: 'learn/docpad/documentation/partners'}
			const sort = [{filename: 1}]
			return database.findAllLive(query, sort).on('add', function (document) {
				document.setMetaDefaults({write: false})
			})
		}
	},


	// =================================
	// Plugins

	// Alias stylus highlighting to css and there is no inbuilt stylus support
	plugins: {
		highlightjs: {
			aliases: {
				stylus: 'css'
			}
		},

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
				path: 'src/documents/learn/mangrove/playbook',
				url: 'https://github.com/meetmangrove/playbook.git'
			}]
		},

		cleanurls: {
			// enable this for surge.sh deployment
			trailingSlashes: true,

			// Common Redirects
			simpleRedirects: {
				'/twitter': 'https://twitter.com/meetmangrove',
				'/tweet': '/twitter',
				'/t': '/twitter'
			}
		}
	}

}

// Don't use debug log level on travis as it outputs too much and travis complains
// https://travis-ci.org/docpad/website/builds/104133494
if ( process.env.TRAVIS ) {
	docpadConfig.logLevel = 6
}

// Export our DocPad Configuration
module.exports = docpadConfig
