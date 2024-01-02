> :DarkLight
> > :InLight
> >
> > ![banner](/img/cb-banner.svg)
>
> > :InDark
> >
> > ![banner](/img/cb-banner-dark.svg)

> :Title lead=perhaps the title below should be the lead?
>
> A clever title on coding, computer science, mathematics, and anything else that tickles my fancy

# Goals

There are three primary purposes for this blog's existence:
- As a record of account of my learnings in all topics that I've taken an interest in - past, present, and future.
- As an archive and reference of my own knowledge and, in particular, links to other sources for that knowledge.
- As an environment to share and explore knowledge between individuals.

To that end, in order to achieve said purpose,  I'd like for this blog to host not only posts which should be self contained
and completed write ups on a particular topic, but to also maintain a "todo" list of sorts, for ideas and/or projects that are
currently queued, as well as a "current" list to keep tabs on what I'm working on concurrently.

Each post should maintain a solid references list, and an additional recommended readings/texts page ought to be maintained that
list a majority of the most useful texts used. Breakdowns and a description of the text with reason for recommendation will be
provided and information/links/metadata provided for convenient retrieval of said texts.

A means to comment under posts ought to be facilitated. Perhaps further contact details ought to be provided to social media
to further allow individuals to share posts or comment directly to the author with further information. Finally, a key requirement
of hosting the blog will be organised, most likely via GitHub pages.

Ultimately, this will be a long multi year project. Rather than implementing all these features fully realised, I will
sooner be implementing basic functionalities incrementally to realise these individualy goals gradually.

---

# Latest Posts

So here are the latest posts:
_I'm thinking this should list out the most recent posts, as well as provide a nice big link to the list of **all** posts, maybe? What's the point of the side bar then..._

> :ArticleCard src=/sample-blog-post, style=box

> :ArticleCard src=/sample-blog-post, style=box

> :ArticleCard src=/sample-blog-post

> :ArticleCard src=/sample-blog-post

---

# Documentation and Maintenance

It is worth mentioning the documentation on how this blog is to be developed and maintained. The base technology powering
this blog is [**CODEDOC**](https://codedoc.cc), a coding documentation suite for use with GitHub pages. To further enhance the "blog-ability"
of **CODEDOC**, a plugin called [`coding.blog` plugin for **CODEDOC**](https://connect-platform.github.io/coding-blog-plugin) has been utilised
which comes with a suite of extra "blog-like" capabilities, and first class support for publishing to _(the currently abandoned)_ [`coding.blog`](https://coding.blog)

This blog's inception is from a fork of _(the now abandoned)_ [coding-blog-boiler-plate](https://github.com/CONNECT-platform/coding-blog-boilerplate), which
features instructions on how to prepare the blog for hosting. Unfortunately, it contains a broken github action workflow for hosting the github
page, it has been corrected and updated as part of this fork.

The above should list all the documentation required for building and maintaining this blog in the future, as well as some additional
ancillary resources for future extensions. [CONNECTIVE SDH](https://github.com/CONNECT-platform/connective-sdh) appears to power much
of the extensibility of **CODEDOC**, a further deepdive into creating custom components for this blog will be warranted. A final resource
that will warrant investigation is the [`jamstack.org`](https://jamstack.org/generators) static html generators. It would appear that
options for blogs that can host comments already exist, and that some of the generators support more "blog-like" formats.

Ultimately, if this blog is to go anywhere, it will eventually migrate to a homebrewed self hosted website. But for now, this is the
current state of affairs, and the first point of contact for maintaining this blog.

<br><br>

> :Author src=github

> :ToCPrevNext
