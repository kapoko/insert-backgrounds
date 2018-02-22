# insert-backgrounds 🖼

Asynchronously loads and inserts images as css background from the `data-insert-background` attribute, and gives an optional callback after each image has completed loading.

<sup>Note: written in ES6, so only supports ES6 projects for now</sup>

## How does it work?

The plugin looks for the `data-insert-background` attribute on elements in the page and starts loading them one by one. After every image is loaded a callback function gets called returning the id of the element or the image url if there's no id. 

## Usage

#### HTML 

Anywhere on your page use the `data-insert-background` attribute on any element with an image url. You can also insert the url dynamically with php for example. To use the callback function effectively on this plugin, give the element an id.

```html
<div id="example-id" data-insert-background="http://example.com/your-image-url.jpg"></div>
```

#### Javascript 

Anywhere in your code (but at least after the DOM has loaded), call `insertBackgrounds`. First argument is the options array, which does nothing for now. Second function is the callback. In the example below we pass in an anonymous function. The `id` argument is the id of the element on which the `data-insert-background` attribute is found. If there's no id attribute, the image url itself gets passed. 

```javascript
import insertBackgrounds from 'insert-backgrounds';
document.addEventListener("DOMContentLoaded", () => {
    insertBackgrounds(options, (id) => {
        switch(id) {
            case 'example-id': 
                // http://example.com/your-image-url.jpg is loaded and inserted!
                // Do stuff
                break;
            default:
                break;
        }        
    });
});
```

## Why is this useful?

On the top of my head I can think of two things very useful about this. 

1. Dynamically loading a css background can be a hassle (albeit a small one). Usually I insert the image url in an attribute on the element (within php for example) and let some javascript insert the image as a css background. I use this for almost every project. This plugin automates that.

2. If you're making a website I'm *pretty* sure you're hooking into `window.onload` or `$(window).on('load', ...)` somewhere, maybe to start an animation for example. Normally, when a page is loaded the browser waits till all images (and everything else) are loaded. Even the images at the bottom of the page that you do not yet care about, needlessly delaying the actions you want to perform. With the callback that gets called after every image is loaded, you can perform actions right when a certain image is loaded. This allows you to better control the loading flow and perform the actions that matter faster. 

## Copyright and license

Aw yiss, code released under [MIT License](https://github.com/kapoko/insert-backgrounds/blob/master/LICENSE). Have at it 🤘.
