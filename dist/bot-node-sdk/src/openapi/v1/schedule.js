"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class Schedule {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取日程列表
    schedules(channelID, since) {
        if (since && since.length !== 13) {
            return Promise.reject(new Error("Param 'since' is invalid, millisecond timestamp expected！"));
        }
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('schedulesURI'),
            rest: {
                channelID,
            },
            params: {
                since,
            },
        };
        return this.request(options);
    }
    // 获取日程
    schedule(channelID, scheduleID) {
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('scheduleURI'),
            rest: {
                channelID,
                scheduleID,
            },
        };
        return this.request(options);
    }
    // 创建日程
    postSchedule(channelID, schedule) {
        const options = {
            method: 'POST',
            url: (0, resource_1.getURL)('schedulesURI'),
            rest: {
                channelID,
            },
            data: {
                schedule,
            },
        };
        return this.request(options);
    }
    // 修改日程
    patchSchedule(channelID, scheduleID, schedule) {
        const options = {
            method: 'PATCH',
            url: (0, resource_1.getURL)('scheduleURI'),
            rest: {
                channelID,
                scheduleID,
            },
            data: {
                schedule,
            },
        };
        return this.request(options);
    }
    // 删除日程
    deleteSchedule(channelID, scheduleID) {
        const options = {
            method: 'DELETE',
            url: (0, resource_1.getURL)('scheduleURI'),
            rest: {
                channelID,
                scheduleID,
            },
        };
        return this.request(options);
    }
}
exports.default = Schedule;
