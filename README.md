# Portfolio Website

This is my personal portfolio website created to showcase the achievements and contact information of a Master of IT graduate from UNSW.

## Project Structure

The project consists of the following files and directories:

- `index.html`: The main entry point of the website, containing the hero section, navigation, and links to other pages.
- `css/`: Contains stylesheets for the website.
  - `main.css`: Main styles for layout, typography, and color schemes.
  - `normalize.css`: Normalizes default styles across different browsers.
  - `responsive.css`: Styles for responsive design.
- `js/`: Contains JavaScript files for interactivity.
  - `theme.js`: Picks the site theme and loads its fonts (runs in `<head>`).
  - `core.js`: Scrolling, header and animation behaviour.
- `pages/achievements/`: One detail page per project.
- `pages/courses/`: Detail pages for courses and certificates.
- `images/`: Directory for storing images such as profile pictures and project screenshots.
- `favicon.ico`: The favicon for the website.

## Setup Instructions

1. Clone the repository to your local machine.
2. Open `index.html` in your web browser to view the website.
3. Customize the content in `achievements.html` and `contact.html` to reflect your personal information and achievements.
4. Modify the CSS files in the `css` directory to change the styling as desired.
5. Add any additional images to the `images` directory and update the HTML files accordingly.

## Themes

The site ships with three themes, all driven by CSS variables at the top of `css/main.css`:

- `cosmic`: midnight blue and cyan with stars (the original design)
- `blueprint`: Prussian-blue drafting grid with yellow pencil accents
- `signal`: light instrument-panel grey with a teal signal trace

To change the theme for everyone, edit `DEFAULT_THEME` in `js/theme.js`.
To preview a theme without changing anything, add `?theme=blueprint` (or `cosmic`, `signal`) to any page URL. Use `?theme=reset` to go back to the default.

## Purpose

The purpose of this portfolio website is to provide a platform for showcasing my skills, projects, and achievements as a Master of IT graduate. It serves as a digital resume and a way for potential employers or collaborators to contact me.