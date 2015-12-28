// <reference path="typings/angular2/angular2.d.ts" /> 

import {
	Component, 
	View, 
	NgFor,
	bootstrap,
}from "angular2/angular2"; 

class Article{
	title: string; 
	link: string; 
	votes: number; 

	constructor(title,link){
		this.title = title; 
		this.link = link; 
		this.votes = 0; 
	}

	voteUp(){
		this.votes +=1; 
	}

	voteDown(){
		this.votes -=1; 
	}
}

@Component({
	selector: 'reddit-article',
	properties: ['article']
})
@View({
	template: `
	<article> 
		<div class="votes">{{article.votes}} </div>
		<div class="main">
			<h2>
				<a href="{{link}}"> {{article.title}} </a>
			</h2>
			<ul>
				<li><a href (click)="voteUp()">upvote</a></li>
				<li><a href (click)="voteDown()">downvote</a></li>
			</ul>
		</div>
	</article>
	`
})

class RedditArticle{
	voteUp(){
		this.article.voteUp(); 
		return false;
	}
	voteDown(){
		this.article.voteDown() 
		return false;
	}
}

@Component({
	selector: 'reddit'
})
@View({
	directives: [RedditArticle, NgFor],
	template: `
	<section class = "new-link">
		<div class = "control-group">
			<div> <label for="title">Title: </label></div>
			<div><input name="title" #newtitle></div>
		</div>
		<div class="control-group">
			<div><label for="link">Link:</label></div>
			<div><input name="link" #newlink></div>
		</div>

		<button (click)="addArticle(newtitle,newlink)"> Submit Link </button>
	</section> 

	<reddit-article 
		*ng-for="#article of articles"
		[article]="article">

	</reddit-article>

	`
})
class RedditApp{
	articles: Array<Article>;

	constructor(){
		this.articles = [
		new Article('Angular 2', 'http://angular.io'),
		new Article('Fullstack', 'http://fullstack.io'),
		]
	}
	addArticle(title, link){
		this.articles.push(new Article(title.value, link.value));
		title.value = "";
		link.value = "";
	}	
	
}

bootstrap(RedditApp);