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
> After every change, restarting SSHd will make configuration changes stick. Also a good idea to periodically restart. _I should add a disclaimer that the article assumes you can already ssh into your server, figure it out yourself >:(_
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

``` c | wing ding
inka minka // bingus dingus
unga bunga // wumpus rumpus
```
> :Buttons
> > :CopyButton

firstly, there were three possible solutions to my desire to access my home PC. We had self hosting a VPN, we had paid services like tailscale that provide servers and services to tunnel through, and finally we have portforwarding and SSH

My issues with VPN is that it looked to be hours of research and I wanted something up and running now. Moreover, I'm not entirely clear how using a VPN replaces a hardened SSH connection. Tailscale looks like a handy service and would have been my selection of choice as it meets my needs, except for the install required. Still, honourable mention to Tailscale. Finally, I opted for SSH and portforwarding because it's a solution I'm already partially familiar with, it will be nice and portable, and its something I **thought** I could get up and running fairly quickly.

I'm not the first to think about this, and there's a plethora of resources out there pointing out potential dangers and workarounds to help make this safer. This post is one such example

Evidently, portforwarding and opening up a personal PC to the world wide web is a scary proposition. To help mitigate the dangers, I've opted to harden global SSH connections with a strategy of non-standard ports pubkey authentication, two-factor authentication, rate limiting, and I intend to further enhance the security by adding things like fail2ban and air gapping this PC. Furhter customisation of PAM could be possible to seriously limit global connection's access rights compared to local connections. All this, while keeping the local SSH experience as transparent and the same as usual.

I'll also be sharing some of the techniques I learnt such as journalling or PAM debug to help myself configure this stuff. Rather than outright telling you the config I used, I want to walk through the experience to help this be a learnable thingamabob

but, link for the lazy, provide a quick and dirty summary in tabs or link to a github texdump of all my info up front to save time.

Attempt 1: configuring everything from SSHD

first attempts were to keep things simple and local to my SSHD config. one of the most common first recommendations is to allow only pubkey authentication, with no password and no root login capablities. To first lay down the groundwork, creating the keys works by firstly generating the pub-private pair on the computer which you want to have access, and then saving the pubkey to the .ssh/authorized_keys file, noting that I follow XDG so .ssh is saved in .config. at this stage, restart sshd and sshd default configs probably already let you log in without password, neat. Note, it'd be cool to set up a way to auto restart sshd when editing .ssh/authorized_keys, pam.d/sshd/, /etc/ssh/sshd_config for conveniene, there's a luke video on this somewhere. Also that linux bunnyhop guy on how to do fuzzy finds script

Next would be disabling password logins and root logins, in essence only allowing pubkey logins. finally, assign your pc a static local ip address and open up a port to point at port 22 of the ip address of your computer. At this stage, for some, this would be enough( not quite! change valid authentication types to by only pubkey) ! the authorized keys list acts as a white list allowing only preconfigured in advanced computers to access the pc, and the non standard port will help prevent the majority of bots scraping random ip addresses from finding your PC, but this leaves a lot to be desired.

for one, even local network connections will require keys, so there will now be setup involved for each new local PC that you want to SSH from. Heavens forbid you lose access to an already allowed pc and you need to connect via local terminal which might just not be on. There's also the potential issue of if you configure a pc from outside your local network to access the server with a pubkey. This is alright if it's something like a laptop you have on the go, but if you setup a public PC like a library (stupid, don't do this), suddenly anyone out in the wild that can touch your laptop or public PC may just waltz in through the front door and access your home PC. We'll tackle each of these issues in order, the first using match statement in the SSHD config, and the other by enabling 2FA via PAM...and all the headaches that brought along.

Attempt 2: making the local network experience more seamless
using match statments

A feature present in the sshd_config is the ability to make a conditional block that can overwrite previous options; the Match statement. It provides a list of possible porperties that you can test patterns against, and the pattern matching itself features some basic regex ability, namely '*' and '?' characters. Of particular interest to us is the 'Address' property, and being able to match all local IP addresses. To that end, here's what the sshd_config file will look like, with the top half being the defaults for global connections, and the bottom being a match and changes for made for when a connection from a local system is being made. Don't forget to restard sshd after making any changes:


From the config, we can see that by default, passwords, keyboards, and authenticaion methods only list pubkey i.e. this is our config for the global network case. Beneath it in the match statement, we can see that we've enabled passwords and keyboards, and added a new authentication method delimited by white space (meaning or) so that either password or pubkey is valid, this is our overwrites for the local case. Spoiler warning in advance, don't get too attached to this version as only the authentication method list will be retained once 2fa and pam are enabled, due to a host of reasons.

With this configuration, all incoming connections from outside the network will only be accepted with a pubkey and a pubkey only. It will be automatically rejected otherwise. On the other hand, local network ssh experience has been restored, now allowing both pubkey login so you maintain that convenience, but also allowing password logins, so as long as you are connected somewhere on your home network, you can always connect with all your devices without prior setup.

Alas, connections from outside the network only require the pubkey, which that is already sufficiently protected for most, I felt a bit uneasy that my connection from outside the local network is that straightforward. A new layer of protection to introduce is 2fa using googles authentication client, and enabling it will involve enabling PAM which throws a spanner in the works for our current setup and some of the config file will have to be undone, but first the easy part.


Attempt 3a: setting up 2fa
first get 2fa working, then talk about enabling PAM, then talk about all the reconfiguration issues involved

you'll require google authenticator to already be working for this next part.

An installation of libpam-google-authenticator will be the package that will be responsible for generating and validating our 2fa codes. For this, we'll need to install the package, as well as qrencode for the convenience. Run the command google-authenticator in your terminal, and walk through the commands and setup those options.

If a time dependant code is being used (recommended), a prompt to enter the code before proceeding. This is the first stage at which you can pick up if something is wrong. If despite however many attempts to use the code when you swear it's right, or the amount of resetting up (i.e. rescanning the qr code) if you keep bumping into this issue, then it is likey your time isn't correctly synced. It turns out that OTP uses a time based algorithm, and the machine accepting the code and the machine generating the code must agree to the time.

Thankfully, this is relatively straightforward on the major linux distributions. A quick timedatectl will list out the status of the ntp service and the current time the machine thinks it is. If the ntp service is deactivated, then a sudo timedatectl set-ntp true ought to fix it and your time will be up to date. Any potential futher errors might need you to first install an NTP client, i.e. sudo pacman -S ntp before running the timedatectl, but at this stage any further issues you should consult the all knowing google before proceeding.

make short comment on the other options, but note that rate limiting will be something that you can further enforce for all logins, not just OTP

Once set up, it's time to tell our sshd daemon to use google authenticator

attempt 3b: setting up sshd to work with pam
talk how to get a quick and dirty pam setup out the gate, and then talk about all the shortcomings, which should then lead to bleugh

We have a google authenticator library sitting on the computer, it is now a matter of configuring sshd, and our pam module itself, to use it. To start, we'll just get something quick and dirty (and technically incorrect) up and running, and explain after the fact whay pam is, why pam is, and how to frame working with pam.

Focusing on our global networking defaults, to use 2fa, we require ssh to enable keybdinteractiveauth - aftger all, how can we expect to insert our 2fa code without this option. secondly, 2fa is a form of challenge-response authentication, where our home pc challenges us with a code requirement and we provide it via out google auth app. Therefore, we need to enable challengeresponsauth for 2fa to work correctly. The second to last change to make is to add keybaord interactive as a valid authentication method after pubkey. To do this, we simply create a comma delimted list where after pubkey we write keyboardauth:pam. Contrast this with our local network config where pubkey and password were separated by a space; space means or, a comma is a 'and then' required, mean our global network config now require a pubkey first, then our 2fa code.

The last change to make to our sshd config is to set the usePAM to yes. Committing this file to disk and then restarting sshd will now completely delegate the majority of authentication tasks over to PAM instead of our sshdaemon. That is to say, our sshd config is now technically broken and some things are going to get weird since we've approached our configs all wrong. Pam is all encompassing and once it is enabled, it should be the only thing you're using. An explanation will be made further below, but first we ought to configure our sshd pam module now. going to etc/pam.d/sshd is the pam configuration for sshd. add the google auth line to the top, save, and restart sshd and we now have a working sshd which requires 2fa before it lets you in, but also a suite of other strange and confusing behaviour.

for one, trying to log in via the global ip address has us go through 2fa, and then requests a password. We had password authentication set to off for global, but now it's somehow requiring both. Moreover, attempting to log in through the local network has some strange behaviour. When using a public key, it works as intended, but without, we again require 2fa and password authentication (assuming something doesn't outright break and bug out/close the ssh session without so much as a peep). You may think that disabling PAM on the local side of the sshd config would help solve the issue, but not so. Reviewing the sshconfig manpage, we find that was it the match statment accepts a suite of different overrides, of which PAM isn't one of them - as mentioned earlier, we require a shift in our frame of thinking now that we have PAM enabled as all authentication tasks have been delegated.

develop techniques for debugging and tracing the issues

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

some things to include: It works with scp and sftp, woot. trying to connect to ip address without user specified still gives authenticator prompt with weird error in journalctl, which is weird. Bad. Add that trying to connect to your home network ip from a global ip now fails after a while. Almost certainly a PAM config could fix this, but it's weird that this happens at all

> :DarkLight
> > :InDark
> >
> > _Hero image by [Kaitlyn Baker](https://unsplash.com/@kaitlynbaker) from [Unsplash](https://unsplash.com)_
>
> > :InLight
> >
> > _Hero image by [Glenn Carstens-Peters](https://unsplash.com/@glenncarstenspeters) from [Unsplash](https://unsplash.com)_
