# README #

### What is this? ###

This is my code examples repository. Currently it's a beta.

### What is this repository for? ###

* To support my career improving process. It is proving my skills, and helps to develop the new apps.
* To help someone learn JS/HTML/CSS/GIT by observing working standalone apps

### How do I see the working example of that code? ###

* I'm publish development branch commits at test.portfolio.stepanovv.ru/*.html
* I'm publish master branch commits at portfolio.stepanovv.ru/*.html
* You can set up my apps

### How do I get set up? ###

* Place files to any web app server( like Node.js/Nginx/Apache) document root
* make public/* files and directories readable by web app server.
* Set the index to any of public/*.html file

### Contribution guidelines ###

* Currently I'm not ready to maintain contributing processes

### Development workflow ###

1. New features placed in wish lists.
2. Choose new issue from wish list, register it as task in Redmine server.
3. Checkout master->development->feature-0.0.+1.0 branch.
4. Develop new feature, commit changes after testing on local PC.
5. Repeat steps 2-4, corresponding to issue list.
6. Merge feature-0.0.1.0 to development branch. Push it to remote repository.
7. Pull development branch from remote VPS server(dev env).
8. Test it. After bug fixing repeat 3-7 steps, corresponding to issue list.
9. Merge tested development to master branch. Push it to remote repository.
10. Pull master branch from remote VPS server(master env). Testing it.
11. Bugs in master fixed as new master->hotfix-0.0.1.+1 branch. Test, commit, merge to master&dev, push to remote repository.
12. Create tag 0.+1.1.1, push to remote repository.

Version currently not published, but can be viewed in git repository commits and my Redmine server:
{apps count}.{production(master) release}.{feature list number}.{hotfix list number}. Example: v3.8.3.0, v4.0.0.1

Committed features registered in Redmine task and time tracker, linked to the commit number in git repo.

### Common to all apps feature list ###

* Readme.markdown for every app
* Bootstrap, Font-Awesome icons, Responsive design
* noScript warning
* Git-flow
* Prod & Test physically separated from Development environment
* Identical Prod & Test environment configuration
* GPLv2 license for all apps
* Open repository on bitbucket
* Locally stored libraries/frameworks for loading speed up
* ALM in Redmine server

### Common to all apps wish list ###

* browserify, webpack, ember, Jenkins
* unit test automation
* git-flow/deploy automation
* Separated backend. Java/NodeJS
* PostgreSQL/MongoDB data store

### Who do I talk to? ###

* Valeriy Stepanov
* Developer, DevOps, Solution architect
* stepanovv.ru@yandex.ru
* [myBlog](stepanovv.ru)