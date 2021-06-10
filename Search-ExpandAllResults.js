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

console.log('🔍', 'Done');
