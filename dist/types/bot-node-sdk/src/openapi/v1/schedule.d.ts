import { Config, ISchedule, OpenAPIRequest, ScheduleAPI, ScheduleToCreate, ScheduleToPatch } from '../../types';
import { RestyResponse } from 'resty-client';
export default class Schedule implements ScheduleAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    schedules(channelID: string, since?: string): Promise<RestyResponse<ISchedule[]>>;
    schedule(channelID: string, scheduleID: string): Promise<RestyResponse<ISchedule>>;
    postSchedule(channelID: string, schedule: ScheduleToCreate): Promise<RestyResponse<ISchedule>>;
    patchSchedule(channelID: string, scheduleID: string, schedule: ScheduleToPatch): Promise<RestyResponse<ISchedule>>;
    deleteSchedule(channelID: string, scheduleID: string): Promise<RestyResponse<any>>;
}
