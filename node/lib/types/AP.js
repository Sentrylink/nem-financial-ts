"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChannelState;
(function (ChannelState) {
    ChannelState[ChannelState["Initializable"] = 0] = "Initializable";
    ChannelState[ChannelState["Idle"] = 1] = "Idle";
    ChannelState[ChannelState["Updatable"] = 2] = "Updatable";
    ChannelState[ChannelState["Confirmable"] = 3] = "Confirmable";
    ChannelState[ChannelState["Receivable"] = 4] = "Receivable";
})(ChannelState = exports.ChannelState || (exports.ChannelState = {}));
function isOrderData(obj) {
    if (obj.makerAddress === null) {
        return false;
    }
    if (obj.terms === null) {
        return false;
    }
    if (obj.makerCreditEnhancementAddress === null) {
        return false;
    }
    if (obj.takerAddress === undefined) {
        return false;
    }
    if (obj.takerCreditEnhancementAddress === undefined) {
        return false;
    }
    if (obj.engineAddress === null) {
        return false;
    }
    if (obj.actorAddress === null) {
        return false;
    }
    if (obj.salt === null) {
        return false;
    }
    if (obj.signatures === null ||
        obj.signatures.makerSignature === undefined ||
        obj.signatures.takerSignature === undefined) {
        return false;
    }
    return true;
}
exports.isOrderData = isOrderData;
