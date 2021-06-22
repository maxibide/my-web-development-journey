# Project: Design Your Own Grid-Based Framework

This is a clone of the [The Odin Project lesson page](https://www.theodinproject.com/paths/full-stack-javascript/courses/html-and-css/lessons/design-your-own-grid-based-framework), built using Sass and a very simple grid framework. The layout is a 12-column grid inspired in the Bootstrap grid system and is based in Flexbox. The grid is responsive and has four size breakpoints. 

## How it works

The grid is initialized using a container with a class `.row`. Predefined classes, `col-[xs,sm,md,lg]-[1-12]` can be used to create a simple responsive column layout.

For example, to create a responsive two column grid:

```html
<div class="row">
    <div class="col-sm-6 col-lg-3">Column 1</div>
    <div class="col-sm-6 col-lg-9">Column 2</div>
</div>
```

## Live Demo

You can check the [live demo](https://maxibide.github.io/my-web-development-journey/the-odin-project/html-and-css/grid-framework/index.html).