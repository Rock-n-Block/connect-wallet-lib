"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.isConfigSufficient = exports.normalizeNetworkConfig = void 0;
var helpers_1 = require("../helpers");
var normalizeNetworkConfig = function (network, keys) {
    var networkConfig = __assign({}, network);
    if (!networkConfig.blockExplorerUrl) {
        networkConfig.blockExplorerUrl = helpers_1.chainIDExplorer[networkConfig.chainID];
    }
    if (!networkConfig.nativeCurrency) {
        networkConfig.nativeCurrency = helpers_1.chainIDNativeCurrency[networkConfig.chainID];
    }
    if (!networkConfig.rpc) {
        var requiredRPC_1 = helpers_1.chainIDRPC[networkConfig.chainID];
        if (requiredRPC_1 && requiredRPC_1.includes("{{") && keys) {
            Object.entries(keys).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                requiredRPC_1 = requiredRPC_1.replace("{{".concat(key, "}}"), value);
            });
            if (requiredRPC_1.includes('{{')) {
                var missingKeys = Array.from(requiredRPC_1.matchAll(new RegExp(/{{\w+}}/gm)));
                console.error("Please add next keys into a config: ".concat(missingKeys.map(function (missing) { return missing[0]; }).join(' ,')));
            }
        }
        networkConfig.rpc = requiredRPC_1;
    }
    return networkConfig;
};
exports.normalizeNetworkConfig = normalizeNetworkConfig;
var isConfigSufficient = function (networkConfig) {
    var emptyFields = [];
    if (!networkConfig.blockExplorerUrl) {
        emptyFields.push("blockExplorerUrl");
    }
    if (!networkConfig.nativeCurrency) {
        emptyFields.push("nativeCurrency");
    }
    if (!networkConfig.rpc) {
        emptyFields.push("rpc");
    }
    return {
        ok: emptyFields.length === 0,
        errors: emptyFields
    };
};
exports.isConfigSufficient = isConfigSufficient;
