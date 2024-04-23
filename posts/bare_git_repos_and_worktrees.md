> :Hero src=https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1900&h=600&fit=crop,
>       mode=light,
>       target=desktop,
>       leak=156px

> :Hero src=https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop,
>       mode=light,
>       target=mobile,
>       leak=96px

> :Hero src=https://images.unsplash.com/photo-1508780709619-79562169bc64?w=1900&h=600&fit=crop,
>       mode=dark,
>       target=desktop,
>       leak=156px

> :Hero src=https://images.unsplash.com/photo-1508780709619-79562169bc64?w=1200&h=600&fit=crop,
>       mode=dark,
>       target=mobile,
>       leak=96px

> :Title shadow=0 0 8px black, color=white
>
> Sample Blog Post

> :Author src=github

<br>


> :Collapse label=[First Draft: Ideas and scope]
> some things to discuss:
> - What a git repo is 
> - how to create a bare git repo
>     - init --bare
>     - clone --bare
>     - convert an existing repo to a bare one, i don't remember how
>         - a little contentious, this blog post lists two competing ways: stackoverflow.com/questions/2199897/how-to-convert-a-normal-git-repository-to-a-bare-one, and the official docs(?) seem to list both, lol: https://archive.kernel.org/oldwiki/git.wiki.kernel.org/index.php/GitFaq.html#How_do_I_make_existing_non-bare_repository_bare.3F
> - how to use worktrees (in or outside a bare repo, worth noting the idosyncracies of non-bare repo and git ignore)
>     - how to use worktrees in place of branching
>     - how to create custom named folders for individual branches
>     - how to remove worktrees when done with them
>     - how to move worktrees
>     - how to list worktrees

> :Collapse label=[Second Draft: Narrative thread and structure]
> - Derive some intuition for what a .git file is and what a work tree is
>     - experiment with the git init command. At each stage, invoke the git status command with --git-dir= and --work-tree= flags
>         - vanilla
>         - using the --separate-git-dir= flag
>         - then using the --git-dir= flag
>         - then add --setworktree= flag
>     - expand with the git init --bare and git clone --bare
>         - Introduce the typical use function of a bare repo (i.e. it's the saved copy that gets pushed/pulled from)
>         - point out the two pieces of literature for converting repos to bare (check draft one)
> - With better intuition on .git and worktrees, provide the pathalogical(?) example of checking out a new branch without doing a git stash via worktrees
>     - provide a level of explanation of why we put it in the foler outside our git folder
> - We can now extend our knowledge by initiating/cloning a bare repo and using that as out base from which all is derived
>     - how to use worktrees in place of branching
>     - how to create custom named folders for individual branches
>     - how to remove worktrees when done with them
>     - how to move worktrees
>     - how to list worktrees
> 
> Try to find some way to incorporate the HAcker news article for managing dotfiles.
> Try to include the .gitignore shenanigans and the recursive git folders issues
> Recall, one difference between different git location vs bare git repo and the branches is the .git text file. First points to the git-dir, second points to a branches folder in the bare git folder. slightly different, how to replicate
>
> Provide a collaspable QoL summary up the top listing out a cheat sheet of relevant commands for working with worktrees directly
>
> Some additional sources: https://news.ycombinator.com/item?id=11070797 for the dot file
>
> Pro git for ideas on porcelain vs plumbing: https://git-scm.com/book/en/v2
>
> What about dan gitschool?


Sample content to go into here

---

> :DarkLight
> > :InDark
> >
> > _Hero image by [Kaitlyn Baker](https://unsplash.com/@kaitlynbaker) from [Unsplash](https://unsplash.com)_
>
> > :InLight
> >
> > _Hero image by [Glenn Carstens-Peters](https://unsplash.com/@glenncarstenspeters) from [Unsplash](https://unsplash.com)_

