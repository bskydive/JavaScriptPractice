# README #

### What is this? ###

This is my code examples repository

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

* Issues registered as tasks in my own Redmine server
* feature-x.x.XX.x branch tested locally, merged to development
* development branch(x.XX.x.x) tested on dedicated(VPS) [server](http://test.portfolio.stepanovv.ru), merged to master
* master branch(XX.x.x.x) tested on dedicated(VPS) [server](http://portfolio.stepanovv.ru)
* hotfix-x.x.x.XX branch tested on dedicated(VPS) [server](http://portfolio.stepanovv.ru), committed to master
* version currently not published, but can be viewed in git repository commits and my Redmine server:
{production(master) release}.{development release}.{feature list number}.{hotfix list number}. Example: v3.8.3.0, v4.0.0.1
* after successfully testing of master commit, I've create corresponding git tag with features and fixes description.
* committed feature lists registers in Redmine task and time tracker, links to the commit number in git repo.

### Who do I talk to? ###

* Valeriy Stepanov
* Developer, DevOps, Solution architect
* stepanovv.ru@yandex.ru
* [myBlog](stepanovv.ru)