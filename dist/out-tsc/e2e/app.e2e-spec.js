import { MdProAngularCliPage } from './app.po';
describe('md-pro-angular-cli App', function () {
    var page;
    beforeEach(function () {
        page = new MdProAngularCliPage();
    });
    it('should display message saying app works', function () {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map