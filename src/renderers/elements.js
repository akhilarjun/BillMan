/**
 * Genreates a Element with given class name
 * @param {string} elname 
 * @param {string} classList 
 * 
 * @returns {HTMLElement}
 */
export function $el(elname, classList) {
    let el = document.createElement(elname);
    classList? (el.classList = classList) : true;
    return el;
}

/**
 * 
 * @param {string} id 
 * 
 * @returns {HTMLElement}
 */
export function $(id) {
    return document.getElementById(id);
}