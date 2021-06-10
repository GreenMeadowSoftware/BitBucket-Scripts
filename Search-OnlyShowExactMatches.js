console.log('🔍', 'Loading all results');
var primaryResultsContainer = _.first(document.getElementsByClassName('primary-results-container'));
var xpath = `//div[contains(@class, 'paged-table-message')]/span[contains(@class, 'aui-iconfont-check')]`;
var waiter = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
while (!waiter.iterateNext())
{
	primaryResultsContainer.scrollTo(0, 999999999);
	await (new Promise(r => setTimeout(r, 100)));
	waiter = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
}
primaryResultsContainer.scrollTo(0, 0);

console.log('🔍', 'Expanding all matches');
_.each(document.getElementsByClassName('context-toggler'), (e) => e.click());

xpath = `//a[contains(@class, 'context-toggler')]/span[contains(text(), 'View all')]`;
waiter = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
while (waiter.iterateNext())
{
	waiter = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
}

console.log('🔍', 'Looking for real matches');
var ems = document.getElementsByTagName('em');
while (ems.length > 0)
{
	_.each(document.getElementsByTagName('em'), (em) => { if (em) em.parentNode.innerHTML = em.parentNode.innerHTML.replace(/<em\/?>/ig, ''); });
	ems = document.getElementsByTagName('em');
}

var matches = [];
var nonMatches = [];
var q = _.first(document.getElementsByClassName('search-query')).value;
var rq = new RegExp(q, 'ig');
_.each(document.getElementsByTagName('code'), (c) =>
{
	if (rq.test(c.innerHTML))
		matches.push(c);
	else
		nonMatches.push(c);
});

console.log('🔍', 'Highlighting real matches');
_.each(matches, (c) => { c.innerHTML = c.innerHTML.replace(rq, '<em>$&</em>'); });

console.log('🔍', 'Removing non-matches');
_.each(nonMatches, (c) => { c.remove(); });

nonMatches = [];
xpath = `//ul[contains(@class, 'hit-contexts')]/li[not(.//code)]`;
var emptyResults = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
var r = emptyResults.iterateNext();
while (r)
{
	nonMatches.push(r);
	r = emptyResults.iterateNext();
}
_.each(nonMatches, (li) => { li.remove(); });

nonMatches = [];
xpath = `//li[contains(@class, 'search-result')][not(.//code)]`;
var emptyResults = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
var r = emptyResults.iterateNext();
while (r)
{
	nonMatches.push(r);
	r = emptyResults.iterateNext();
}
_.each(nonMatches, (li) => { li.remove(); });

console.log('🔍', 'Tidying up');
_.each(document.getElementsByClassName('context-toggler'), (e) => { if (e) e.remove(); });
_.first(_.first(document.getElementsByClassName('paged-table-message')).getElementsByTagName('p')).innerHTML = `${matches.length} real results`;
_.first(_.first(document.getElementsByClassName('result-summary')).getElementsByTagName('strong')).innerHTML = _.first(document.getElementsByClassName('primary-results')).children.length;

console.log('🔍', 'Done');
