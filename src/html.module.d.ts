/* In html loader we use exportAsEs6Default option so that "html string" will become
 * export default "html string".
 * 
 * This is why we declare the following module: to be able to import non-javascript
 * content - in this case - HTML. Without it Typescript compiler will complain 
 * (see https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations)
 * 
 * Thanks to this, we'll be able to import the html string like so:
 * 
 * import ourNameForHtmlTemplate from "path-to-file/filename.html"
 * 
 * */

declare module '*.html' {
    const template: string;
    export default template;
}