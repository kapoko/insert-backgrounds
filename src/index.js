'use strict';

import 'nodelist-foreach-polyfill';
import 'classlist-polyfill';
import isFunction from 'lodash/isfunction';

const selector = 'data-insert-background';

/**
 * Main function. Indexes all the elements in the page based
 * on the selector
 * 
 * @param  {Function} callback  Gets called everytime another image gets loaded
 * @return {void}               
 */
const insertBackgrounds = (options = [], callback) => {
    let elements = document.querySelectorAll('[' + selector + ']');

    if (typeof elements[0] === 'undefined') {
        return;
    }

    insertImages(elements, 0, callback);
}

/**
 * Recursive function, start inserting the background images one 
 * by one in the elements array
 * 
 * @param  {NodeList} elements     NodeList containing all the elements
 * @param  {number}   currentIndex Current index in the nodelist
 * @param  {Function} callback     Callback function gets called once an image is inserted
 * @return {void}              
 */
const insertImages = (elements, currentIndex, callback) => {
    let imageUrl = elements[currentIndex].getAttribute(selector);

    preloadImages([imageUrl], () => {
        elements[currentIndex].style.backgroundImage = 'url("' + imageUrl + '")';
        elements[currentIndex].classList.add('background-loaded');

        // Callback
        if (typeof callback !== 'undefined' && isFunction(callback)) {
            let id = elements[currentIndex].id;

            if (id === "") {
                callback(imageUrl);
            } else {
                callback(id);
            }
        }

        // Check if there are images left in the array
        currentIndex++;
        if (currentIndex < elements.length) {
            insertImages(elements, currentIndex, callback);
        }
    });

}

/**
 * Preloads images and gives a callback
 * Based on https://gist.github.com/eikes/3925183
 * 
 * @param  {array}   imgs      Array containing img urls
 * @param  {Function} callback Callback function to call when image is loaded
 * @return {void}            [description]
 */
const preloadImages = (imgs, callback) => {
    let loaded = 0;
    let images = [];

    imgs = Object.prototype.toString.apply(imgs) === '[object Array]' ? imgs : [imgs];

    const inc = () => {
        loaded += 1;
        if (loaded === imgs.length && callback) {
            callback(images);
        }
    };

    for ( var i = 0; i < imgs.length; i++ ) {
        images[i] = new Image();
        images[i].onabort = inc;
        images[i].onerror = inc;
        images[i].onload = inc;
        images[i].src = imgs[i];
    }
}

export default (options, callback) => {
    return insertBackgrounds(options, callback);
}