import { getURL } from './resource';
export default class Schedule {
    request;
    config;
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
            url: getURL('schedulesURI'),
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
            url: getURL('scheduleURI'),
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
            url: getURL('schedulesURI'),
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
            url: getURL('scheduleURI'),
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
            url: getURL('scheduleURI'),
            rest: {
                channelID,
                scheduleID,
            },
        };
        return this.request(options);
    }
}
