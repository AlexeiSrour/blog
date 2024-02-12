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
> My experience configuring SSH, PAM, port forwarding, and two-factor authentication for global access to my home PC

> :Author src=github

<br>


> :Center
>
> > _Disclaimer: I am no expert in matters of internet security. This post exists for educational and instructional purposes only, as a recounting of the problems and solutions I personally faced in creating a globally accessible home network that was too my own liking and standards._
> >
> > _Reproduce these steps at your own risk._

**Check out https://smallstep.com/blog/diy-ssh-bastion-host/ for a seemingly decent link to a bunch of other links on hardening your ssh connection. Another two links are https://goteleport.com/blog/ssh-bastion-host/ and https://www.redhat.com/sysadmin/ssh-proxy-bastion-proxyjump**

# The TL;DR

As a first matter of business, I feel I owe it to myself and any potential readers to state my configurations and steps up front for convenience and for ease of access:

> :Collapse label=[Expand to see TL;DR of the process]
>
> > :Center
> >
> > **Before walking through the following steps, please ensure you have a guaranteed way of maintaining a connection to the server, ideally via local physical access.**
> >
> > _This is merely a high level summary of the process without delving into much of the minutia that can arise. Any issues or techniques for managing the setup are explained through the rest of the article._
> 
> > :Big
> >
> > Install and setup Google Authenticator
>
> The Google Authenticator app will be required on your smart device for two-factor authentication to work.
>
> ```bash
> sudo pacman -S libpam-google-authenticator # I use Arch, btw
> sudo pacman -S qrencode # Not required by highly recommended
>
> google-authenticator
> >Do you want authentication tokens to be time-based (y/n) y
> >Warning: pasting the following URL into your browser exposes the OTP secret to Google:
> >  https://www.googl.com/***************
> >
> >
> ># A QR code will be displayed here if qrencode has been installed
> ># Scan with Google Authenticator for quicker and more secure setup
> >
> >
> >Your new secret key is: abcdefghABCDEFGH0123456789
> >Enter code from app (-1 to skip): 123456 # NOT RECOMMENDED TO SKIP
> >Code confirmed
> >Your emergency scratch codes are:
> >  12345678
> >  12345678
> >  12345678
> >  12345678
> >  12345678
> >
> >Do you want me to update your "/home/user/.google_authenticator" file? (y/n) y
> >
> >Do you want to disallow multiple uses of the same authentication
> >token? This restircts you to on login about every 30s, but it increases
> >your chances to notice or even prevent man-in-the-middle attacks (y/n) y
> >
> >By default, a new token is generate every 30 seconds by the mobile app.
> >In order to compensate for possible time-skew between the client and the server
> >we allow an extra token before and after the current time. This allows for a
> >experience porblems with pour time synchronization, you can increase the window
> >from its default size of 3 permitted codes (one previous code, the current
> >code, the next code) to 17 permitted codes (the 8 previouse codes, the current
> >code, and the 8 next codes). This will permit for a time skew of up to 4 minutes
> >between client and server.
> >Do you want to do so? (y/n) n
> >
> >If the computer that you are logging into isn't hardened against brute-force
> >login attempts, you can enable rate-limiting for the authentication module.
> >By default, this limits attackers to no more than 3 login attempts every 30s.
> >Do you want to enable rate-limiting? (y/n) y
> ```
>
> _I wonder if I should add a quick one liner commentary on the timing bugs? I wonder if I should add a summarised description of the Y's and N's_
>
> > :Big
> > 
> > Edit the PAM configuration for sshd
>
> Create the following helper configuration file for use in the main config later: _(refer back to my file for extra notes inside that I can use in the blog post)_
>
> ``` python | /etc/security/access-local.conf
> + : ALL : 192.168.0.
> - : ALL : ALL
> ```
>
> A PAM configuration file for SSHd will likely already exist on most major Linux distributions. It will be similar in form to the below, add only the below two lines near to the top of the file.
>
> ``` python | /etc/pam.d/sshd
> #%PAM-1.0
> # Standard Un*x password updating
> /*+*/auth [success=1 degault=ignore] pam_access.so accessfile=/etc/security/access-local.conf
> /*+*/auth [success=done new_authtok_reqd=ok ignore=ignore default=die] pam_google_athenticator.so
>
> auth      include     system-remote-login
> account   include     system-remote-login
> password  include     system-remote-login
> session   include     system-remote-login
> ```
>
> > :Big
> > 
> > Create an SSH Key-Pair
>
> _Surely this is outside the scope of this article? figure it out yourselves!_
>
> > :Big
> > 
> > Edit the SSHd config file
>
> The below is the sshd config used, highlights emphasise required changes from defaults:
>
> ``` python | /etc/ssh/sshd_config
> Port 22
> AuthorizedKeysFile .config/.ssh/authorized_keys # --> This PC is configured using the XDG Base Directory Specification (https://wolo.archlinux.org/title/XDG_Base_Directory)
> PermitRootLogin no # --> No by default, but worth being explicit
> /*!*/PasswordAuthentication no
> /*!*/KbdInteractiveAuthentication yes
> /*!*/UsePAM yes
> /*!*/ChallengeResponseAuthentication yes
> /*!*/AuthenticationMethods publickey,keyboard-interactive:pam
> /*!*/PrintMotd no # --> PAM already does this, set to no to avoid double up
> Subsystem    sftp    /usr/lib/ssh/sftp-server
> 
> /*!*/Match Address 192.168.0.*
> /*!*/    AuthenticationMethods publickey keyboard-interactive:pam
> ```
>
> > :Big
> >
> > Restart the sshd daemon
>
> After every change, restarting SSHd will make configuration changes stick. Also a good idea to periodically restart. _I should add a disclaimer that the article assumes you can already ssh into your server, figure it out yourself >:( Also double check that you can still ssh into your server after this point, and pretty much after every sshd restart_
>
> ```bash
> sudo systemctl restart sshd
> ```
>
> > :Big
> >
> > Port Forward
>
> _I should probably make mention of setting up a static local IP and forwarding a nonstandard port to port 22 of the server_
>
> _I wonder if I should make mention of the hardware setup? E.g. having a PSU to protect against power outtages so I don't get locked out_
>
> _Also, is it possible for me to restart the server remotely and then get back in...? It should be possible but I don't know if my setup has it :3_
>
> > :Big
> >
> > Final Result
>
> _Basically explain in one or two lines how the above lets you connect safely to a remote network, with one or two weird edge cases that need ironing out :3_
>
> For an explanation of what was acheived and how, or for help tuning and debugging, please read on

---

# The Problem and the Solution

> :Big
>
> The Justification

I have a Linux PC on my home network that I use for all my computer science-y interests. My primary means of interacting with this PC is via SSH from a my desktop Windows PC or from a Macbook Air laptop anywhere in the house.
I've even gone so far as to install an SSH client on my Android smart device which let's me log in to my Linux PC from the comfort of my dinner table. This let's my Linux PC sit inconspicuously in the corner of my room, 
connected to a PSU, running continuously untouched as a low power server that I can connect to whenever I'd like to do some programming or work on this very blog. It even leaves the door wide open to further enhancements 
further down the line.

One of the key advantages I find to this setup is the consistent interface I have interacting with my Linux environment, regardless of which way I access it. Additionally, the flexibility and comfort of accessing it from anywhere
within my household is unexepectantly desirable, so much so that I even have a pet project in mind creating low power terminals - basically a glorified screen - to be able to connect to my server from specific physical locations.
_Not very rational, but it could make for a fun dive into electronics for a few months._

The setup is also exstensible. Using `tmux` with a minimal plugin to save and restore sessions whenever rebooting, and you basically have a permanently unbroken session. There's also the potential to do `X11 forwarding` _(probably not
recommended, security seems to be an issue with `X`)_ to have access to the desktop experience, or further enhance it with software like `XQuartz` which allows you to create headless graphical sessions that you can connect to and
disconnect from in much the same way `tmux` does for terminal sessions. It even works over the net...

It didn't take long to beg the question if one could connect to the home network from the outside.

> :Big
>
> Potential Solutions

Three possible solutions presented themselves in order to achieve this desire to connect to my Linux PC from outside the local network, each with their pros and cons that will be briefly enumerated.

A VPN, particularly a self hosted VPN, has been touted on internet forums as being a solution. While this would make for an interesting project and something I _will_ eventually invest time in to, this option was unfortunately
too heavy on the time commitment up front. I had started doing my research, but after spending the better part of a morning with little progress towards the ultimate goal made, I opted to throw in the towel and return to this
once my interest is piqued once more. Moreover, in my time spent reading, at no point was it ever made explicitly clear how a VPN security-wise replaces a properly hardened SSH connection, leaving me a bit confused about why
VPNs are often shared as a better alternative to port forwarding. A topic for another day.

The second solution, and my preferred pick, was to use an already existing platform's service - [`Tailscale`](https://tailscal.com/kb/1017/install). _add footnote or reference or something to add statement that this is not an add or sponsored by tail scale, I hate that we have to say that nowadays_
Honestly, this service looks nigh on _perfect_ for my use case. It comes with a free plan that's limited to just 3 different devices, but it allows quick and easy connection and networking between those devices in an easy to use
and capable manner. It provides many [relevant examples](https://tailscale.com/kb/116/vscode-ipad) as well as [interesting examples](https://tailscale.com/kb/1137/minecraft) to help demonstrate the capabilities and get you started
quickly, I feel I owe it to my future self to eventually setup an account with them. The single biggest issue is that an install is required and that was a particular no-no in my case. Alas, I will leave `Tailscale` behind, but not
without making a due note about it for others to potentially benefit instead.

We now come to the third and final solution - Port Forwarding. Unlike self hosting a VPN, this is a solution that I was already partially familiar with and already had an understanding of the infrastructure at play. This familiarity
is what ultimately convinced me to go down this road, but not without apprehensions. Opening a port to the outside world that **directly** connects to a personal PC is a genuinely frightening proposition, and I wanted to make sure
that I did right. Of particular importance to me was that I did it right _without compromising on the quality of my home SSH experience_.

Ultimately, this is what this article is all about. I will be chronologically outlining the development of my personal configuration piecemeal and explaining each change individually as a learning resource for others. I will outline
the trials and tribulations I faced, and my learnings from the experience so you won't have to suffer as I did. To that end, I will also be going into further depth about a shockingly universal library with woefully inadequate
introductory documentation -- Pluggable Authentication Modules (PAM).

---

> :Collapse label= _Legacy stuff review then remove_
>
> firstly, there were three possible solutions to my desire to access my home PC. We had self hosting a VPN, we had paid services like tailscale that provide servers and services to tunnel through, and finally we have portforwarding and SSH
> 
> My issues with VPN is that it looked to be hours of research and I wanted something up and running now. Moreover, I'm not entirely clear how using a VPN replaces a hardened SSH connection. `Tailscale` looks like a handy service and would have been my selection of choice as it meets my needs, except for the install required. Still, honourable mention to `Tailscale`. Finally, I opted for SSH and portforwarding because it's a solution I'm already partially familiar with, it will be nice and portable, and its something I **thought** I could get up and running fairly quickly.
> 
> I'm not the first to think about this, and there's a plethora of resources out there pointing out potential dangers and workarounds to help make this safer. This post is one such example
> 
> Evidently, portforwarding and opening up a personal PC to the world wide web is a scary proposition. To help mitigate the dangers, I've opted to harden global SSH connections with a strategy of non-standard ports pubkey authentication, two-factor authentication, rate limiting, and I intend to further enhance the security by adding things like fail2ban and air gapping this PC. Furhter customisation of PAM could be possible to seriously limit global connection's access rights compared to local connections. All this, while keeping the local SSH experience as transparent and the same as usual.
> 
> I'll also be sharing some of the techniques I learnt such as journalling or PAM debug to help myself configure this stuff. Rather than outright telling you the config I used, I want to walk through the experience to help this be a learnable thingamabob
> 
> but, link for the lazy, provide a quick and dirty summary in tabs or link to a github texdump of all my info up front to save time.
 
---

# Using SSHD configuration and some initial prep? Nah, initial prep to getting something minimally viable but robust

The first attempt at achieving a minimally viable setup was to keep things simple and enable public key authentication while disabling password authentication and root logins. All of this can be configured from within the SSHd
configuration file alone, but first the groundwork should be laid down as applying these changes will quickly lock out access to all but physical logins.

> :Big
>
> Creating SSH public-private key pairs

A public-private SSH key pair should be generated on the computer(s) that you wish to be able to connect to the remote server. For that, we use the `ssh-keygen` utility:
``` bash
ssh-keygen -t ed25519 -C "Windows Desktop Computer"
>Generating public/private ed25519 key pair
>Enter file in which to save the key (~/.ssh.id_ed25519):
>Enter passphrase (empty for no passphrase):
>Eneter same passphrase again:
>Your identification has been saved in ~/.ssh/id_ed25519.
>Your public key has been saved in ~/.ssh/id_ed25519.pub.
>The key fingerprint is:
>SHA256:abcdefghijklmnoABCDEFGHIJKLMNO012345678901234
>The key's randomart image is:
>+--[ED25519 256]--+
>|                 |
>|                 |
>|                 |
>|                 |
>|                 |
>|                 |
>|                 |
>|                 |
>|                 |
>+----[SHA256]-----+
```

Using defaults for everything is perfectly adequate, but there are a few noteworthy reasons why you may or may not choose to do it differently. The type flag `-t` allows you to specify the key generation algorithm, and I have
[heard](https://youtu.be/GxRu35fy-oY?si=9U7cnyvKwSatqGNP&t=511) that `ed25519` is the superior and more cryptographically secure protocol, hence my decision to use it. The comment `-C` flag allows one to overwrite the default
comment that which would normally be the `username/host` of the computer that generated the key. While comment is enough, I much prefer to use my own comments that provide more useful descriptions of which computer the key
belongs to.

You can find the key type, key, and comment saved wherever you specified on the next two inputs. I personally recommend sticking with the defaults, as `ssh` will normally automatically look in your `.ssh/` folder for your
public keys. Changing where you save the keys will require you to use the `-i` flag whenever you want to use ssh with the non-default key location.
``` bash
ls .ssh
> . ..  id_ed25519  id_ed25519.pub  known_hosts
cat .ssh/id_ed25519
>ssh-ed25519 abcdefghijklmnoABCDEFGHIJKLMNO012345678901234 Windows Desktop Computer
```  

Passphrase let's you add another layer of security by furter encrypting your keys. I've opted for the default empty passphrase for the sake of convenience, otherwise when logging in from home I'd require a password on my keys anyway.
_With that said, I suspect there should be a way to enforce different keys to be used depending on the IP address you're connecting from, i.e., only allow connections from outside the network using a password protected key but
local connections can get away without passwords. I feel confident PAM would allow this, but it's out of scope for now_.

> :Big
>
> Copying SSH public keys to the server

With our keys generated to our liking, it's simply a matter of copy-pasting the _public_ key file over to our server's `.ssh/authorized_keys` file. There does exist a utility `ssh-copy-id` to help walk you through this process,
noting that my `.ssh/authorized_keys` file is is saved in a separate location in accodance with the [XDG Base Directory Spec](https://wolo.archlinux.org/title/XDG_Base_Directory), which is reflected in the command using the `-t`
flag.
``` bash
ssh-copy-id -i .ssh/id_ed25519.pub -t ~/.config/.ssh/authorized_keys user@host
>INFO: Source of key(s) to be installed: "~/.ssh/id_ed25519.pub"
>INFO: attempting to log in with the new key(s), to filter out any that are already installed
>INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install new keys
>user@host's password:
>
>Number of keys added: 1
>
>Now try logging into the machine with: "ssh 'user@host'"
>and check to make sure only the key(s) you wanted were added.added
```

_add that if the above is too high tech, doing an echo sadfkshf >> .ssh/authorized_keys works pretty much just as well, in fact it's my preferred method, lmao_

Before our changes take effect, we will need to restart the SSH daemon on the server - might as well take the opportunity to configure the SSHd a little further before we do.

> :Big
>
> Configuring SSHd

From the server's side, the only changes to make are to disable root login, and disable password authentication. This way, once the changes take effect, only computers who've had their public keys copied over to `.ssh/authorized_keys`
will be able to log in.

``` bash
sudo vim /etc/ssh/sshd_config
```
``` 
Port 22
AuthorizedKeysFile .config/.ssh/authorized_keys # --> This PC is configured using the XDG Base Directory Specification (https://wolo.archlinux.org/title/XDG_Base_Directory)
/*+*/PermitRootLogin no # --> No by default, but worth being explicit
/*+*/PasswordAuthentication no
/*+*/meatheads of authentication :D
```

Once done, a quick and simple restart of the SSH daemon and our changes take effect.
``` bash
sudo systemctl restart sshd
```

> :Big
>
> Regression testing (_really, can't think of a better title?_)

Now the moment of truth - Attempt to ssh to the server from any of the permitted PCs. At this stage, nothing overly complex has been done, and I would expect everything to succeed. If not, the first two places to check will be
the `.ssh/authorized_keys` on the server to make sure your key is actually in the file. I would then double check the `etc/ssh/sshd_config` file changes for good measure. Should everything be as expected, revert the changes
(restart the SSH daemon!) and then attempt to ssh back into the server. Debug from there, it's especially helpful to attempt this across multiple PCs.

At this point in time, much of the ground work for securly connecting to your PC over a global network is already laid down. From here, it's a matter of establishing a static IP address for your server before the ever scary
port forwarding. Not doing this will cause issues further down the line whenever you reboot the server and it's local IP changes, or whenever the public IP of your home network updates.

> :Big
>
> Static IP addresses

> Unfortunately, you'll have to consult your router's instruction manual in order to assign a locally static IP address for the server. Expect to find it under some advanced local network menu.
>
> Moreover, a static public IP address is dictated by your ISP. Contact them for further information on getting a static IP address

> :Big
>
> The **Port Forward**: Security and setup... or smthg idk

Finally, we are ready for the _port forward_. You'll need to consult your router's instruction manual, or alternatively Google the port forwarding instructions for your router's brand and model, but you can expect to find it
under advanced firewall features. A brief aside on SSH and ports, it's the defacto standard the port 22 is the SSH port. By default, whenever you ssh into a server, the ssh utility is attempting to establish communication over
port 22, and likewise the server is listening in on connections coming in from port 22. You can of course overwrite this default behaviour, either on a global config scale or on a case by case basis, but I have opted not to change
this default for ease of use and convenience.

However, forwarding port 22 on your router to point to a personal PC is a _bad idea_. As this is a default port, it is _literally the first port_ people will attempt to use to ssh into your home network, should they detect or suspect
that they might be able to access the local network. Now, rest assured, with our setup as is right now, no amount of banging on port 22 will successfully allow outsiders to connect; an attacker will need our public-private key pair
in order to SSH into the server. They'll need physical access to any PCs first. Even still, changing which port we forward is one of the simplest and most effective means of preventing any attacks in the first place.

With all that said, it's recommended to port forward any of the non-standard ports between 1 and 65,535 - a random string of numbers will probably do the trick - and have the router forward the traffic to port 22 on the local network.
These options are normally delineated with a WAN port number (the port open to the world wide web), and the LAN port (the port on the local network receiving the traffic). Of course, don't forget to forward the traffic over to
the IP address of the server.

Now, the second moment of truth - attempting to ssh into your server via the public IP address.

> :Big
>
> Regression testing 2: Electric boogaloo

At this stage, this is when things can get a little dicey. Rest assured, if you've followed the above instructions, your home network is still safe. In fact, for some, this is all the setup they need to be happy with their security.
Even so, we'll run through some test cases, ideally on more than one computer (I used 3 ssh capable devices to check the robustness of my configurations).

The cases we're concerned about are:
 - Connect via SSH using the _global_ IP address, _with_ an authorized key
 - Connect via SSH using the _global_ IP address, _without_ a key
 - Connect via SSH using the _local_ IP address, _with_ an authorized key
 - Connect via SSH using the _local_ IP address, _without_ a key

As for the necessary setup, a quick Google search on "what is my ip" will net the the address you're looking for the global IP tests. Having internal write access to your server's `.ssh/authorized_keys` is adequate for the key tests,
simply commenting out (using the `#` key) the individual lines to "revoke" the key. Also keep in mind that you will now be required to specify the port number for ssh connections using the public IP, otherwise you will get a
`Connection refused` error.

The expected outcomes of the above four cases, in order, are:
> :Tabs
> > :Tab title=Summary
> >
> > - Successful and seamless connection
> > - `Permission denied (publickey).`
> > - Successful and seamless connection
> > - `Permission denied (publickey).`
>
> > :Tab title=Global w/ Key
> >
> > ```bash
> > ssh -p 19473 user@publicIP
> > >Last login: Sun Jan 7 12:26:50 2024 from globalIP
> > ```
>
> > :Tab title=Global w/o Key
> > 
> > ``` bash
> > ssh -p 19473 user@publicIP
> > >user@publicIP: Permission denied (publickey).
> > ```
>
> > :Tab title=Local w/ Key
> >
> > ``` bash
> > ssh user@localIP
> > >Last login: Sun Jan 7 12:26:50 2024 from globalIP
> > ```
>
> > :Tab title=Local w/o Key
> > 
> > ``` bash
> > ssh user@localIP
> > >user@localIP: Permission denied (publickey).
> > ```

Please take special care that the pair of global connection test results match

> :Collapse label=Legacy to be rewritten
>
> Attempt 1: configuring everything from SSHD
> 
> First attempts were to keep things simple and local to my SSHD config. one of the most common first recommendations is to allow only pubkey authentication, with no password and no root login capablities. To first lay down the groundwork, creating the keys works by firstly generating the pub-private pair on the computer which you want to have access, and then saving the pubkey to the .ssh/authorized_keys file, noting that I follow XDG so .ssh is saved in .config. at this stage, restart sshd and sshd default configs probably already let you log in without password, neat. Note, it'd be cool to set up a way to auto restart sshd when editing .ssh/authorized_keys, pam.d/sshd/, /etc/ssh/sshd_config for conveniene, there's a luke video on this somewhere. Also that linux bunnyhop guy on how to do fuzzy finds script
> 
> Next would be disabling password logins and root logins, in essence only allowing pubkey logins. finally, assign your pc a static local ip address and open up a port to point at port 22 of the ip address of your computer. At this stage, for some, this would be enough( not quite! change valid authentication types to by only pubkey) ! the authorized keys list acts as a white list allowing only preconfigured in advanced computers to access the pc, and the non standard port will help prevent the majority of bots scraping random ip addresses from finding your PC, but this leaves a lot to be desired.

> :Big
>
> The Shortcomings

> :Collapse label=Legacy to be rewritten
>
> for one, even local network connections will require keys, so there will now be setup involved for each new local PC that you want to SSH from. Heavens forbid you lose access to an already allowed pc and you need to connect via local terminal which might just not be on. There's also the potential issue of if you configure a pc from outside your local network to access the server with a pubkey. This is alright if it's something like a laptop you have on the go, but if you setup a public PC like a library (stupid, don't do this), suddenly anyone out in the wild that can touch your laptop or public PC may just waltz in through the front door and access your home PC. We'll tackle each of these issues in order, the first using match statement in the SSHD config, and the other by enabling 2FA via PAM...and all the headaches that brought along.

> :Big
>
> The Enhancements

> :Collapse label=Legacy to be rewritten
>
> Attempt 2: making the local network experience more seamless
> using match statments
> 
> A feature present in the sshd_config is the ability to make a conditional block that can overwrite previous options; the Match statement. It provides a list of possible porperties that you can test patterns against, and the pattern matching itself features some basic regex ability, namely '*' and '?' characters. Of particular interest to us is the 'Address' property, and being able to match all local IP addresses. To that end, here's what the sshd_config file will look like, with the top half being the defaults for global connections, and the bottom being a match and changes for made for when a connection from a local system is being made. Don't forget to restard sshd after making any changes:
> 
> 
> From the config, we can see that by default, passwords, keyboards, and authenticaion methods only list pubkey i.e. this is our config for the global network case. Beneath it in the match statement, we can see that we've enabled passwords and keyboards, and added a new authentication method delimited by white space (meaning or) so that either password or pubkey is valid, this is our overwrites for the local case. Spoiler warning in advance, don't get too attached to this version as only the authentication method list will be retained once 2fa and pam are enabled, due to a host of reasons.
> 
> With this configuration, all incoming connections from outside the network will only be accepted with a pubkey and a pubkey only. It will be automatically rejected otherwise. On the other hand, local network ssh experience has been restored, now allowing both pubkey login so you maintain that convenience, but also allowing password logins, so as long as you are connected somewhere on your home network, you can always connect with all your devices without prior setup. _though, there is some funkiness if connecting to your local network with the public IP. I don't even know..._

> :Big
>
> Concluding remarks on this particular version

> :Collapse label=Legacy to be rewritten
>
> Alas, connections from outside the network only require the pubkey, which that is already sufficiently protected for most, I felt a bit uneasy that my connection from outside the local network is that straightforward. A new layer of protection to introduce is 2fa using googles authentication client, and enabling it will involve enabling PAM which throws a spanner in the works for our current setup and some of the config file will have to be undone, but first the easy part.

---

# Enter Two-Factor Authentication

> :Big
>
> Installing Google Authenticator

> :Collapse label=Legacy to be rewritten
>
> 
> Attempt 3a: setting up 2fa
> first get 2fa working, then talk about enabling PAM, then talk about all the reconfiguration issues involved
> 
> you'll require google authenticator to already be working for this next part.
> 
> An installation of libpam-google-authenticator will be the package that will be responsible for generating and validating our 2fa codes. For this, we'll need to install the package, as well as qrencode for the convenience. Run the command google-authenticator in your terminal, and walk through the commands and setup those options.

> :Big
>
> Maybe title here for pitfalls and debugging? This took me too long to figure out

> :Collapse label=Legacy to be rewritten
>
> If a time dependant code is being used (recommended), a prompt to enter the code before proceeding. This is the first stage at which you can pick up if something is wrong. If despite however many attempts to use the code when you swear it's right, or the amount of resetting up (i.e. rescanning the qr code) if you keep bumping into this issue, then it is likey your time isn't correctly synced. It turns out that OTP uses a time based algorithm, and the machine accepting the code and the machine generating the code must agree to the time.
> 
> Thankfully, this is relatively straightforward on the major linux distributions. A quick timedatectl will list out the status of the ntp service and the current time the machine thinks it is. If the ntp service is deactivated, then a sudo timedatectl set-ntp true ought to fix it and your time will be up to date. Any potential futher errors might need you to first install an NTP client, i.e. sudo pacman -S ntp before running the timedatectl, but at this stage any further issues you should consult the all knowing google before proceeding.
> 
> make short comment on the other options, but note that rate limiting will be something that you can further enforce for all logins, not just OTP
> 
> Once set up, it's time to tell our sshd daemon to use google authenticator

# Enabling Two-Factor Authentication - Introducing PAM

> :Big
>
> A Quick and Dirty setup

> :Collapse label=Legacy to be rewritten
>
> attempt 3b: setting up sshd to work with pam
> talk how to get a quick and dirty pam setup out the gate, and then talk about all the shortcomings, which should then lead to bleugh
> 
> We have a google authenticator library sitting on the computer, it is now a matter of configuring sshd, and our pam module itself, to use it. To start, we'll just get something quick and dirty (and technically incorrect) up and running, and explain after the fact whay pam is, why pam is, and how to frame working with pam.
> 
> Focusing on our global networking defaults, to use 2fa, we require ssh to enable keybdinteractiveauth - aftger all, how can we expect to insert our 2fa code without this option. secondly, 2fa is a form of challenge-response authentication, where our home pc challenges us with a code requirement and we provide it via out google auth app. Therefore, we need to enable challengeresponsauth for 2fa to work correctly. The second to last change to make is to add keybaord interactive as a valid authentication method after pubkey. To do this, we simply create a comma delimted list where after pubkey we write keyboardauth:pam. Contrast this with our local network config where pubkey and password were separated by a space; space means or, a comma is a 'and then' required, mean our global network config now require a pubkey first, then our 2fa code. _weirdness strikes if we try to access without specifying a login user_
> 
> The last change to make to our sshd config is to set the usePAM to yes. Committing this file to disk and then restarting sshd will now completely delegate the majority of authentication tasks over to PAM instead of our sshdaemon. That is to say, our sshd config is now technically broken and some things are going to get weird since we've approached our configs all wrong. Pam is all encompassing and once it is enabled, it should be the only thing you're using. An explanation will be made further below, but first we ought to configure our sshd pam module now. going to etc/pam.d/sshd is the pam configuration for sshd. add the google auth line to the top, save, and restart sshd and we now have a working sshd which requires 2fa before it lets you in, but also a suite of other strange and confusing behaviour.

> :Big
>
> What's Gone Wrong

> :Collapse label=Legacy to be rewritten
>
> for one, trying to log in via the global ip address has us go through 2fa, and then requests a password. We had password authentication set to off for global, but now it's somehow requiring both. Moreover, attempting to log in through the local network has some strange behaviour. When using a public key, it works as intended, but without, we again require 2fa and password authentication (assuming something doesn't outright break and bug out/close the ssh session without so much as a peep). You may think that disabling PAM on the local side of the sshd config would help solve the issue, but not so. Reviewing the sshconfig manpage, we find that was it the match statment accepts a suite of different overrides, of which PAM isn't one of them - as mentioned earlier, we require a shift in our frame of thinking now that we have PAM enabled as all authentication tasks have been delegated.
>
> develop techniques for debugging and tracing the issues

---

_Blog post should end here, developed in part 2_

an aside on pam, where it came from and how it works:
complain about the lack of documentation, share your understanding of the stack

A quick google search about PAM will quickly net you some results on the motivating decision of why PAM exists, as well as some shorter toy examples of how to configure it quickly and easily (I guess technically this is one such example, but I'm trying to be a little more in depth about it)

in summary, PAM let's application writers utilise external authentication modules, written presumably by authentication experts, without having to hard code any direct authentication themselves. All that is required of an application developer is to make their application PAM aware via the relevant pam library header files and you're off to the races. Binaries such as login or su both use these very same PAM libraries for their authentication, and you can find their config files in /etc/pam.d/ like we could with sshd. On the flip side, PAM also provides an apparently straightforward interface for system administrators to now configure a whole suite of options for each of their pam aware applications, and it really is quite richly featured. An admin is able to set environment variables, have multiple layers of required authentication, have these authentication requirements change on a per user or a per group setting, and it's something we'll be exploiting to get our pubkey + 2fa global vs pubkey or password local working

What a quick google search won't net you is how to actually use the damn thing in any kind of meaningful way. The documentation itself, while a man page exists for each pam module you have installed, it's very much been written for people who already know what they're doing. The interfaces that exist have been standardised and functional for so long, that finding clear breakdown's it rather difficult since there's seemingly nothing more to say. There are hour long pitfalls to drop in to and climb out of, and so many threads to follow that go nowhere, it really is an exercise in frustration learning how this otherwise wonderfully powerful and flexible system works. For shame, really.

A nice thing to say, PAM let's a PAM aware application delegate authentication to an admin, who is then responsible for configuring the degree of authentication and accesses they're interested in. The abstract of the pam admin's guide does a good job summarising it in a single sentence.

One of the few locations I managed to find some actually useful unique information is "The Linux-PAM System Administratos' Guide", but it too falls into a the usual regurgitation of all the man pages. To explain the most pertinent parts:

An administrator is responsible for configuring the "PAM stack" for any PAM aware applications, which is a series of "PAM modules" that are called during authentication checks. The Linux PAM library is standardised in such a way that an application can blindly call out to the Linux PAM library, which in turn refers to whatever configurations that have been set up for the application and independantly jumps through 4 separate stacks made up of PAM modules. The calling and return values of these PAM modules have been very well standardized as well and their return codes are made visible to administrators. This allow 

+----------------+
| application: X |
+----------------+       /
| authentication-[---->--\
|       +        [----<--/
|[conversation()]--+    \
+----------------+  |
|                |  |
|  service user  |
|                |
+----------------+

---

# Test heading
## test sub heading
## does this work?
### no way
#### how deep
# Sike
###### Uber deep
####### can't go any further :(

some things to include: It works with scp and sftp, woot. trying to connect to ip address without user specified still gives authenticator prompt with weird error in journalctl, which is weird. Bad. Add that trying to connect to your home network ip from a global ip now fails after a while. Almost certainly a PAM config could fix this, but it's weird that this happens at all. Oh oh oh, and add an aside on creating two ssh keys, one for when connecting via local network, and the second that is password protected for when you're connecting from a global network, and use PAM to enforce the "local" key when at home, but a global password protected key when outside.

> :DarkLight
> > :InDark
> >
> > _Hero image by [Kaitlyn Baker](https://unsplash.com/@kaitlynbaker) from [Unsplash](https://unsplash.com)_
>
> > :InLight
> >
> > _Hero image by [Glenn Carstens-Peters](https://unsplash.com/@glenncarstenspeters) from [Unsplash](https://unsplash.com)_
