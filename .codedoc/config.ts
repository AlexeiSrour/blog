
import { configuration } from '@codedoc/core';
import { codingBlog } from '@codedoc/coding-blog-plugin';

import { theme } from './theme';



export const config = /*#__PURE__*/configuration({
  theme,
  src: {
    base: 'posts'
  },
  dest: {
    namespace: '/blog',    // --> change this if you want to also deploy to GitHub Pages
    html: 'dist',
    assets: process.env.GITHUB_BUILD === 'true' ? 'dist' : '.',
    bundle: process.env.GITHUB_BUILD === 'true' ? 'bundle' : 'dist/bundle',
    styles: process.env.GITHUB_BUILD === 'true' ? 'styles' : 'dist/styles',
  },
  page: {
    title: {
      base: 'Alexei Srour\'s Blog'         // --> change this to change your blog's title
    },
    favicon: '/favicon.ico'
  },
  plugins: [
    codingBlog({
      assets: [
        'img',
        'favicon.ico',
      ],
	  feed: {
		url: 'https://alexeisrour.github.io'
	  }
    })
  ],
  misc: {
    github: {
      repo: 'blog',         // --> change this to your github repo
      user: 'AlexeiSrour'         // --> change this to your github username
    }
  }
});
