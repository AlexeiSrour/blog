import { getRenderer } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/transport/renderer.js';
import { initJssCs } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/transport/setup-jss.js';initJssCs();
import { installTheme } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/content/theme.ts';installTheme();
import { countCards } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/coding-blog-plugin/dist/es5/components/article-card/count-cards.js';countCards();
import { codeSelection } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/selection.js';codeSelection();
import { sameLineLengthInCodes } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/same-line-length.js';sameLineLengthInCodes();
import { initHintBox } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/line-hint/index.js';initHintBox();
import { initCodeLineRef } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/line-ref/index.js';initCodeLineRef();
import { initSmartCopy } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/smart-copy.js';initSmartCopy();
import { copyHeadings } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/heading/copy-headings.js';copyHeadings();
import { contentNavHighlight } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/contentnav/highlight.js';contentNavHighlight();
import { loadDeferredIFrames } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/transport/deferred-iframe.js';loadDeferredIFrames();
import { smoothLoading } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/transport/smooth-loading.js';smoothLoading();
import { tocHighlight } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/toc/toc-highlight.js';tocHighlight();
import { postNavSearch } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/toc/search/post-nav/index.js';postNavSearch();
import { copyLineLinks } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/line-links/copy-line-link.js';copyLineLinks();
import { gatherFootnotes } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/footnote/gather-footnotes.js';gatherFootnotes();
import { Author } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/coding-blog-plugin/dist/es5/components/author/index.js';
import { ToCToggle } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/toc/toggle/index.js';
import { DarkModeSwitch } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/darkmode/index.js';
import { ConfigTransport } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/transport/config.js';
import { ArticleCard } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/coding-blog-plugin/dist/es5/components/article-card/index.js';
import { ToCPrevNext } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/toc/prevnext/index.js';
import { TabSelector } from '/home/alexei/programming/codedocs/coding-blog-boilerplate/.codedoc/node_modules/@codedoc/core/dist/es6/components/tabs/selector.js';

const components = {
  'PeOePO93pQpZodksZU/8LQ==': Author,
  'xpFmirN1lJ6t2JYIwXK1rg==': ToCToggle,
  'mBHzZyqL8ByctDnDdFVG1w==': DarkModeSwitch,
  'YjvF2Z3ugyS2l/pY1v8ydA==': ConfigTransport,
  'A5pLx/2DuIczL+865vMLbA==': ArticleCard,
  'JWm8XSiLCSDhW9XvnLzECw==': ToCPrevNext,
  'lNMkpvR9EMqyzY3TMLfjgw==': TabSelector
};

const renderer = getRenderer();
const ogtransport = window.__sdh_transport;
window.__sdh_transport = function(id, hash, props) {
  if (hash in components) {
    const target = document.getElementById(id);
    renderer.render(renderer.create(components[hash], props)).after(target);
    target.remove();
  }
  else if (ogtransport) ogtransport(id, hash, props);
}
