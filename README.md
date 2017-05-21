# [Mangrove Playbook's Website](http://playbook.mangrove.io), built with [DocPad](https://docpad.org)

<!-- BADGES/ -->

<span class="badge-travisci"><a href="http://travis-ci.org/MeetMangrove/playbook-website" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/MeetMangrove/playbook-website/master.svg" alt="Travis CI Build Status" /></a></span>

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


### Editing Structure

A lot of the structure (like the menu listings and documentation page layouts) is provided by [bevry/outpatient](https://github.com/bevry/outpatient). To make changes to this:

1. Clone outpatient (or your fork), install its dependencies, and link it for development

    ``` bash
    cd where/you/put/your/projects
    git clone https://github.com/bevry/outpatient.git
    cd outpatient
    npm install  # install its deps
    npm link  # link it for development
    ```

1. Then inside our website repo, tell it to use our local outpatient copy:

    ``` bash
    cd where/you/put/playbook-website
    npm link outpatient  # pull in our local outpatient to use with the website
    npm start
    ```

Modifications to outpatient will require running `npm start` again. When you are ready to push your changes up, contact [@balupton](https://github.com/balupton).

The files that probably interest you are:

- [`outpatient/source/documentation-layout.js`](https://github.com/bevry/outpatient/blob/master/source/documentation-layout.js)
- [`outpatient/source/block.js`](https://github.com/bevry/outpatient/blob/master/source/block.js)
- [`outpatient/source/menu.js`](https://github.com/bevry/outpatient/blob/master/source/menu.js)

Outpatient uses [hyperscript](https://github.com/hyperhype/hyperscript) as its rendering engine.


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
