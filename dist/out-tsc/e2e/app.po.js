import { browser, element, by } from 'protractor';
var MdProAngularCliPage = /** @class */ (function () {
    function MdProAngularCliPage() {
    }
    MdProAngularCliPage.prototype.navigateTo = function () {
        return browser.get('/');
    };
    MdProAngularCliPage.prototype.getParagraphText = function () {
        return element(by.css('app-root h1')).getText();
    };
    return MdProAngularCliPage;
}());
export { MdProAngularCliPage };
//# sourceMappingURL=app.po.js.map