var CustomURLEncoder = /** @class */ (function () {
    function CustomURLEncoder() {
    }
    CustomURLEncoder.prototype.encodeKey = function (key) {
        return encodeURIComponent(key);
    };
    CustomURLEncoder.prototype.encodeValue = function (key) {
        return encodeURIComponent(key);
    };
    CustomURLEncoder.prototype.decodeKey = function (key) {
        return decodeURIComponent(key);
    };
    CustomURLEncoder.prototype.decodeValue = function (key) {
        return decodeURIComponent(key);
    };
    return CustomURLEncoder;
}());
export { CustomURLEncoder };
//# sourceMappingURL=customUrlEncoder.js.map