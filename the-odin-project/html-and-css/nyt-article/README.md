# Project: New York Times Article Page

This is a replica of New York Times article "[Space Ripples Reveal Big Bang's Smoking Gun](https://www.nytimes.com/2014/03/18/science/space/detection-of-waves-in-space-buttresses-landmark-theory-of-big-bang.html?_r=0)" built using only HTML5 and CSS3 as part of the [HTML and CSS](https://www.theodinproject.com/courses/html-and-css) course at [The Odin Project](https://www.theodinproject.com/). The purpose of this project was to practice the use of CSS positioning and layout technologies (i.e. Flexbox and CSS Grid) and get the general look of the original page.

## Live Demo

You can check the [live demo](https://maxibide.github.io/my-web-development-journey/the-odin-project/html-and-css/nyt-article/index.html).

## Reflection

- The header of the page was built using Flexbox. Within the header there is a Flexbox container with three flexbox items that group the menu items to the left, the newspaper logo in the center and the subscribe and login buttons to the left.

- The main body of the article (paragraph and pictures) are of fixed width and centered with 'margin: auto'.

- The "Theory of Inflation" graph was tricky. The original consists of a single picture with white spaces where the text boxes go. The boxes and the image are placed in a 
4 x 4 grid. While the image occupies all the cells, the boxes are placed
in their respective blank spaces, using the grid layout.

- The "More articles section" was laid out using a combination of Flexbox and Grid. he three general sections are placed in a 2 x 2 grid, while each section is a flexbox container that contains the individual articles, wich are of fixed width.

- Finally the bottom navigation menu and the footer are made using Flexbox.