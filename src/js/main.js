import 'svgxuse';
import regularPage from './pages/regular';
import homePage from "./pages/home";

import {$dom} from './helpers/dom';

import {isElement} from './helpers/_utilities';
import chapterPage from './pages/chapter';
import pricesPage from './pages/prices';
import qandaPage from './pages/Q&A';

const pages = [
	regularPage,
	homePage,
	chapterPage,
	pricesPage,
	qandaPage
];

$dom.ready(function() {
	this.currentPage = pages.find(page => isElement(page.rootEl));

	if (Boolean(this.currentPage)) this.currentPage.init()
});
