const MarkdownIt = require('markdown-it');
const markdownItMark = require('markdown-it-mark');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: false
}).use(markdownItMark);

console.log(md.render('`inline code`\n\n```javascript\nconsole.log("hello")\n```'));
