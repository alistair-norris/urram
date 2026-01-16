"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fmtDateTime = exports.TWELVE_HR_FMT = void 0;
var tz_1 = require("@date-fns/tz");
var date_fns_1 = require("date-fns");
exports.TWELVE_HR_FMT = 'dd MMM yyyy h:mm a';
var fmtDateTime = function (date, fmt) {
    if (fmt === void 0) { fmt = exports.TWELVE_HR_FMT; }
    return (0, date_fns_1.format)(new tz_1.TZDate(date, 'Asia/Singapore'), fmt);
};
exports.fmtDateTime = fmtDateTime;
