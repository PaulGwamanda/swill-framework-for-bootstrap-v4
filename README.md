# swill
A light bootstrap development boilerplate toolbox for frontend builds.

It's modular and preloads common libraries, allowing for rapid frontend development and splits the dev and production directories for rapid deployment and testing.

It uses scss for stylesheets and allows for overriding bootstraps' scss import modules while running browessync for cross browser platform checks.

```
How to install
---

$ npm install
$ gulp
```

```
Using
---
  "dependencies": {
    "bootstrap": "^4.2.1",
    "browser-sync": "^2.26.3",
    "del": "^2.2.2",
    "font-awesome": "^4.7.0",
    "gulp-clean-css": "^2.3.2",
    "gulp-concat": "^2.6.1",
    "gulp-file-include": "^0.13.7",
    "gulp-rename": "^1.4.0",
    "gulp-uglify": "^1.5.4",
    "gulp-watch": "^4.3.11",
    "jquery": "^3.1.1",
    "popper.js": "^1.14.6",
    "run-sequence": "^1.2.2",
    "wowjs": "^1.1.3"
  },
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-sass": "^4.0.2",
    "node-sa
```

Example usage: go to line 439 in /src/sass/_variables.scss and change the $border-radius value to 0 !default; then check your button in your homepage.

You could do the same with the brands' primary blue color (btn-primary) and change the blue color variable value (line 37) from #007bff to cyan and then have a look at your button

Building like this gives way more modularity and control over the project and it's brand specific styles