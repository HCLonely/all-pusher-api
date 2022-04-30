"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.versionMapping = void 0;
exports.versionMapping = Object.create(null);
function register(version, api) {
    exports.versionMapping[version] = api;
}
exports.register = register;
