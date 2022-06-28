"use strict";
exports.__esModule = true;
exports.invalidConfig = exports.gettingAddressError = exports.providerError = exports.chainError = void 0;
var chainError = function (text) { return ({
    code: 4,
    message: {
        title: "Error",
        subtitle: "Chain error",
        text: text
    }
}); };
exports.chainError = chainError;
var providerError = function (provider) { return ({
    code: 2,
    type: "error",
    connected: false,
    provider: provider,
    message: {
        title: "Error",
        subtitle: "Provider Error",
        text: "Your provider doesn't exists. Please add ".concat(provider.name)
    }
}); };
exports.providerError = providerError;
var gettingAddressError = function (text) { return ({
    code: 7,
    message: {
        title: "Error",
        subtitle: "Cant getting user address",
        text: text
    }
}); };
exports.gettingAddressError = gettingAddressError;
var invalidConfig = function (provider) { return ({
    code: 8,
    type: "error",
    connected: false,
    provider: provider,
    message: {
        title: "Error",
        subtitle: "Config error",
        text: "Your config is not valid"
    }
}); };
exports.invalidConfig = invalidConfig;
