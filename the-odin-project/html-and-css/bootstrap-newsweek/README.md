# Project: Newsweek Homepage Using Bootstrap

This is a clone of the [Newsweek Homepage](http://www.newsweek.com), built mostly using the Bootstrap CSS Framework as part of the [HTML and CSS](https://www.theodinproject.com/courses/html-and-css) course at [The Odin Project](https://www.theodinproject.com/). The purpose of this project was to learn and get confortable with a CSS Framework, in this case, Bootstrap.

## Live Demo

You can check the [live demo](https://maxibide.github.io/my-web-development-journey/the-odin-project/html-and-css/bootstrap-newsweek/index.html).

## Reflection

The project was done aiming to have as little custom CSS as possible. Two areas were particularly tricky. First, the width of the layout columns. In order to imitate the look the original webpage as close as possible I required fractional grid numbers, and of course, this is not possible. I tried to get over it by using nested columns, but in the end, it was easier to just override the default grid column width by using custom CSS.

The page has three responsive layouts, for small, medium and large screens. The medium and large layouts were easy to achieve with Bootstrap grids; but the small layout had a different section ordering (top story on top of featured stories and so on). Using the `order`classes would have been nice, but the sections were in different parent containers, and the required order mixed sections from differents containers. So, I had to appeal to JQuery. I haven't reached the appriopriate courses on JavaScript, but I found enough info on Google to write a crude script that shifts the sections in the required order.