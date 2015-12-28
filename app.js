var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var Article = (function () {
    function Article(title, link) {
        this.title = title;
        this.link = link;
        this.votes = 0;
    }
    Article.prototype.voteUp = function () {
        this.votes += 1;
    };
    Article.prototype.voteDown = function () {
        this.votes -= 1;
    };
    return Article;
})();
var RedditArticle = (function () {
    function RedditArticle() {
    }
    RedditArticle.prototype.voteUp = function () {
        this.article.voteUp();
        return false;
    };
    RedditArticle.prototype.voteDown = function () {
        this.article.voteDown();
        return false;
    };
    RedditArticle = __decorate([
        angular2_1.Component({
            selector: 'reddit-article',
            properties: ['article']
        }),
        angular2_1.View({
            template: "\n\t<article> \n\t\t<div class=\"votes\">{{article.votes}} </div>\n\t\t<div class=\"main\">\n\t\t\t<h2>\n\t\t\t\t<a href=\"{{link}}\"> {{article.title}} </a>\n\t\t\t</h2>\n\t\t\t<ul>\n\t\t\t\t<li><a href (click)=\"voteUp()\">upvote</a></li>\n\t\t\t\t<li><a href (click)=\"voteDown()\">downvote</a></li>\n\t\t\t</ul>\n\t\t</div>\n\t</article>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], RedditArticle);
    return RedditArticle;
})();
var RedditApp = (function () {
    function RedditApp() {
        this.articles = [
            new Article('Angular 2', 'http://angular.io'),
            new Article('Fullstack', 'http://fullstack.io'),
        ];
    }
    RedditApp.prototype.addArticle = function (title, link) {
        this.articles.push(new Article(title.value, link.value));
        title.value = "";
        link.value = "";
    };
    RedditApp = __decorate([
        angular2_1.Component({
            selector: 'reddit'
        }),
        angular2_1.View({
            directives: [RedditArticle, angular2_1.NgFor],
            template: "\n\t<section class = \"new-link\">\n\t\t<div class = \"control-group\">\n\t\t\t<div> <label for=\"title\">Title: </label></div>\n\t\t\t<div><input name=\"title\" #newtitle></div>\n\t\t</div>\n\t\t<div class=\"control-group\">\n\t\t\t<div><label for=\"link\">Link:</label></div>\n\t\t\t<div><input name=\"link\" #newlink></div>\n\t\t</div>\n\n\t\t<button (click)=\"addArticle(newtitle,newlink)\"> Submit Link </button>\n\t</section> \n\n\t<reddit-article \n\t\t*ng-for=\"#article of articles\"\n\t\t[article]=\"article\">\n\n\t</reddit-article>\n\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], RedditApp);
    return RedditApp;
})();
angular2_1.bootstrap(RedditApp);
