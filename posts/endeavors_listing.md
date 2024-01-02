> :Title
>
> Endeavors

# Purpose

This page is another WIP. This will be the central hub that will point to all interesting projects that I've worked on and made posts about (hopefully with github links to each project). This will also act as a queued projects listing for things that I am both concurrently working on and things that I will work on. I think this would be a good place to track status of each of my individual projects with light notes on resources used and where I am at with each project, just to help me pick up wherever I drop off.

Additionally, this page will have a To-Do lists of both minor tasks to do on this blog (small actionable items that shouldn't take more than a weekend to implement, I should be able to do multiple in a batch normally), but also major actionable items like adding full blown features to this blog, like better build pipelines or databases.

At last, probably quite importantly, a distinction will be made for planned posts to come, again with smaller notes to help keep track. I wonder if links should be included?

In order of how I think the page should be organised:
- planned posts
- projects, with completed, current, and queued. Add note so that completed points to a blog post or github with a high level overview of what was learnt, current being with notes on why, what's being learnt, and the current progress. The queued will have the same notes as the current, i.e. current and queued can just swap between the two
- Blog todo listing, tabbed between major and minor. Blog related projects should go here in the major category. It should be a name of what is being done with small notes on what will need to be done.

---

# Posts

Add some words here

> :Tabs
> > :Tab title=Currently Planned Posts
> >
> > The below is a list of posts that I have planned for the near term future:
> > - **Setting up SSH and PAM for safe public access to private network PCs (part 1)**
> >     - _This first post will outline much of the setup before relying on PAM_
> > - **Setting up SSH and PAM for safe public access to private network PCs (part 2)**
> >     - _This second post will be focused almost exclusively on PAM, how it works, and how to configure it. It will conclude with the final config used_
> > - **A quick dive into compilers, languages, and programming**
> >     - _This post will be an analysis of the code from the article [Tell the Compiler What you Know](https://sbazoptos.com/compilers/tell-the-compiler-what-you-know.html). It's conclusion will be threefold with a bonus point: compilers are amazing; humans suck at programming; our languages aren't helping; heavily structured langauges are beneficial_
> > - **Sequential Consistency and Total Store Order**
> >     - _Based off the bound research of the same name. I'm positive a whole series of posts can be borne just from this one research_
> > - **Vectorized programming**
> >     - _Based off the bound research of a similar name, I'm paricularly a big fan of ispc. Potential source of a series, in particular the data dependancy research would pair well with [Mike Acton's 16bit float branchless implementation](https://cellperformance.beyond3d.com/articles/2006/07/branchfree_implementation_of_h_1.html)_
> > - **Higher order logic as a formalism for hardware verification**
> >     - _Current topic of research as of writing. It would be nice to include some math to keep the blog well rounded, as well as get some experience writing on something that's still pending research, e.g. there are a few extra papers that I may want to download and read into further, what will the implications be on the blogging process?_
>
> > :Tab title=Retired Posts
> >
> > The below is a list of formerly planned posts that have been retired after a partial attempt has been made:
> > - _not sure how good an idea this is, I guess it'd be nice to know what I used to want to do and maybe add a subpoint explaining why I changed my mind?_
>
> > :Tab title=Abandoned Posts
> >
> > The below is a list of formerly planned posts taht have since been forgotten and abandoned:
> > - **Using rdtsc(p) as an accurate and fine-grained general purpose timer**
> >     - _This blog idea had far larger scope than I imagined, and has since gone stale from its inception. I dug too deep and too greedily. Notable wells of information are "Using the RDTSC Instruction for Performance Monitoring" and "How to Benchmark Code Executions Time..." intel white paper. These are slightly out of date, in particular on topics of serializing the rdtsc(p) calls, for which one should consult the Intel **and** AMD hardware manuals for those instructions. Of note are printed loose leaf with highlights from AMD's 245593-Rev 3.41-June 2023 pages 422, 433, 435 (section 13.2.4). Intel's hardware manual is also included but only one page about Fence instructions section 9.4.5, which is unusual since the intels instruction reference for rdtsc(p) is actually slightly at odds with AMD's, specifically using it as a wall clock timer_
> > - create blog post based off OS Three Easy Pieces homework on timing syscalls and context switches (include /usr/bin/time)
> > - create blog post based off context switches and speculation on why they're expensive
>
> > :Tab title=Completed Posts
> >
> > The below is a list fo posts that have been completed:
> > - _This seems redundant, since I'll have an `"all posts"` page anyway, right? It might be handy as a tracker to move planned posts to this tab here, and add a link? idk, only time will tell. maybe include a button to the all posts on this tab as well_

---

# Projects

Add some words here, but to make a distinction, current=working on it, queued=in the pipeline but paused for a bit, abandoned=started but never finished, retired=started but not fully completed but at a satisfactory finish, completed=projects that are for all intents and purposes done.

I wonder if completed should be it's own section rather then a tab? I'd like to be able to show off, maybe make it it's own page all together.

Note, I reckon projects should specifically be about hardware and software development, not simply studying and researching

> :Tabs
> > :Tab title=Current Projects
> >
> > Should I add words here?
> > - programming from the ground up
> > - OS Three Easy Pieces
> > - CodeCrafters.io
>
> > :Tab title=Queued Projects
> >
> > - Game Hacking
> > - Numerical Computing with IEEE
> > - Mike Acton's 16bit float implementation
> > - Crafting Interpreters
> > - Linear Algebra
> > - NAND to tetris
> > - Something hardware related, like rs232 intgegration between matrix switch, home assistant, streamdeck, or a ben eater build or that vga guy build or esp32 stuff
> > - Dynamic binary analysis, shadow memory from Valgrind and PhD thesis
> > - creating a loader and tas for vvvvvv or something similar, based off Olafur Waage - playing video games one frame at a time
> > - Learning Lambda calculus, logical foundations of functional programming
> > - learning ML and/or HOL, HOL manual is a good reference and a gentle introduction to ML too
> > - Michael Abrash has a piece on writing a software renderer for the intel Larabee architecture, I definitely want to try implementing it: https://www.cd.cmu.edu/afs/cs/academic/class/15869-f11/www/readings/abrash09_lrbrast.pdf
>
> > :Tab title=Retired Projects
>
> > :Tab title=Abandoned Projects
>
> > :Tab title=Completed Projects
>>
> > Consider maybe changing up the order of these tabs? Also consider completed being its own header or page

---

# Studies

Things I'm researching and studying, for textbooks and the like that normally take months to finish :D These will likely spawn projects, blog posts, and further research

> :Tabs
> > :Tab title=Current Studies
> 
> > :Tab title=Queued Studies
> 
> > :Tab title=Retired Studies
> 
> > :Tab title=Abandoned Studies
> 
> > :Tab title=Completed Studies
> 

---

# Blog

> :Tabs
> > :Tab title=Minor Tasks
> >
> > The below is anew list of ideas and tasks I have in mind which entail no more than a weekend's worth of time to implement
> >
> > - huzzah!
>
> > :Tab title=Major Tasks
> >
> > The below is a list of ideas and tasks that will entail a considerable amount of effort to implement, with a scope measured in weeks and possibly months
> >
> > - hooray!
>
> > :Tab title=End Goals?
> >
> > _Is this worth having here? A list of end goals that I have in mind? This sort of reminds me of the ["Goals"](/#Goals) section on the landing page_

_here's a useful todo, move most of these up to the planned posts section, hah_
- configure data for references page (might require custom component?)
- might need to create a new component in place of ToCPrevNext so that next/prev buttons go to separate places
- Creae a blog timeline, maybe??

---

