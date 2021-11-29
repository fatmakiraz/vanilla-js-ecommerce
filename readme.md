# Vanilla JavaScript Ecommerce

Vanilla JavaScript Ecommerce is a project I developed with Vanilla JavaScript to improve my JavaScript skills. It is created by taking mobile-first design into consideration. BEM methodology is used as the CSS naming method. SCSS/SASS is used as the CSS-preprocessor. 

## [Live website](https://vanilla-js-ecommerce.vercel.app/)

# Project Structure

Data of products and categories are under the 'data' folder as JSON format. LiquidJS is used as the template engine. 

**js/**
- _dom_products.js -> Includes JS actions about products like adding/removing the product to/from cart, updating product quantities, etc. This file is not used anymore. It was used before updating the project with JavaScript Classes. 
- contact.js -> It is used to show active class/tab when clicked one of the contact tabs.
- countdown.js -> It has countdown codes to set a future date for a marketing campaign. 
- faqs.js -> It is used to show active class/question's answer when clicked the question they want to see its answer.
- featured.js -> It is used to show the related products and smooth scrolling when clicked one of the buttons under the featured.
- global.js -> There are codes of scroll top button. Also, getFullYear() method is used here to get the current year according to local time on the footer.
- header.js -> There are codes for the header: Showing navigation menu when clicked the menu button on mobile, showing cart content when clicked the cart button, adding/showing navigation links and their dropdown items dynamically by manipulating DOM, smooth scrolling, and showing the related products when clicked the related link.
- products.js -> It includes codes about fetching products and product categories from the JSON files and all events about categories, products, and cart.
- slider.js -> There are codes to start slider and change the slider items when clicked the next/previous buttons.

**views/**
- components/ -> All HTML codes (.liquid format) are in this folder.
- pages/ -> The HTML components/sections and the custom script codes are included in the pages in this folder.
- main -> This is the main file including the common components and script codes for all sub-pages.

**scss/**
- components/ -> CSS codes are included in this folder.
- config/ -> Responsive design codes are in the scss/config/mixin.scss file. CSS variables are in the scss/config/variables.scss. 
- helper/ -> It is the folder includes formalize&normalize codes. Also, the common CSS codes are in the scss/helper/global file.
- main -> It is used to import the CSS components.

## Installation

```bash
git clone https://github.com/hey-fk/vanilla-js-ecommerce
cd vanilla-js-ecommerce
npm install or yarn install
```

## Start the server

```bash
gulp
```

Now enter [`localhost:3000`](http://localhost:3000) in the address bar of your browser.

## Dist Folder

```bash
gulp dist
```

Production files will be prepared in /dist folder.

## Deploy Vercel

Build Command
```bash
gulp dist
```

Output Directory
```bash
dist
```

## Contributing

Did you found a bug or got an idea for a new feature? Feel free to use the [issue tracker](https://github.com/hey-fk/vanilla-js-ecommerce/issues) to let me know. Or make directly a [pull request](https://github.com/hey-fk/vanilla-js-ecommerce/pulls).

## License

This template is released under the MIT License.