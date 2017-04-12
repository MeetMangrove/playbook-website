# [Mangrove Playbook's Website](https://playbook.mangrove.io), built with [DocPad](https://docpad.org)

<!-- BADGES/ -->

<span class="badge-travisci"><a href="http://travis-ci.org/meetmangrove/playbook-website" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/meetmangrove/playbook-website/master.svg" alt="Travis CI Build Status" /></a></span>

<!-- /BADGES -->


## Getting Started

1. Clone the playbook website

	``` bash
	git clone https://github.com/meetmangrove/playbook-website.git playbook-website
	cd playbook-website
  ```

1. Install the website's dependencies

	``` bash
	npm install
	```

1. Start the development server:

	``` bash
	npm start
	```

1. [Open http://localhost:9778/](http://localhost:9778/)

1. Start hacking away by modifying the `docpad.js` file and the `src` directory


### Deployment

To deploy to [surge.sh](https://surge.sh):

```
npm test  # to generate the site
npm run deploy  # to deploy the site
```


## Update the Content

The content is stored in a [separate repository](https://github.com/meetmangrove/playbook) which is pulled into this website at run-time. You'll want to edit the documentation repo instead if you want to make changes to the documentation.


<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; <a href="https://mangrove.io">Mangrove</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li>
<li>or</li>
<li><a href="http://spdx.org/licenses/CC-BY-4.0.html">Creative Commons Attribution 4.0</a></li></ul>

<!-- /LICENSE -->
