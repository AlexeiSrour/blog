some things to discuss:
- What a git repo is 
- how to create a bare git repo
    - init --bare
    - clone --bare
    - convert an existing repo to a bare one, i don't remember how
        - a little contentious, this blog post lists two competing ways: stackoverflow.com/questions/2199897/how-to-convert-a-normal-git-repository-to-a-bare-one, and the official docs(?) seem to list both, lol: https://archive.kernel.org/oldwiki/git.wiki.kernel.org/index.php/GitFaq.html#How_do_I_make_existing_non-bare_repository_bare.3F
- how to use worktrees (in or outside a bare repo, worth noting the idosyncracies of non-bare repo and git ignore)
    - how to use worktrees in place of branching
    - how to create custom named folders for individual branches
    - how to remove worktrees when done with them
    - how to move worktrees
    - how to list worktrees