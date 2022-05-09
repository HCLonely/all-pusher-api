import { IMember } from './guild';
import { RestyResponse } from 'resty-client';
/**
 * =============  Schedule 日程接口  =============
 */
export interface ScheduleAPI {
    schedule: (channelID: string, scheduleID: string) => Promise<RestyResponse<ISchedule>>;
    schedules: (channelID: string, since?: string) => Promise<RestyResponse<ISchedule[]>>;
    postSchedule: (channelID: string, schedule: ScheduleToCreate) => Promise<RestyResponse<ISchedule>>;
    patchSchedule: (channelID: string, scheduleID: string, schedule: ScheduleToPatch) => Promise<RestyResponse<ISchedule>>;
    deleteSchedule: (channelID: string, scheduleID: string) => Promise<RestyResponse<any>>;
}
export declare type ScheduleRemindType = '0' | '1' | '2' | '3' | '4' | '5';
export interface ScheduleToCreate {
    name: string;
    description?: string;
    creator?: IMember;
    start_timestamp: string;
    end_timestamp: string;
    jump_channel_id?: string;
    remind_type: ScheduleRemindType;
}
export interface ISchedule extends ScheduleToCreate {
    id: string;
}
export declare type ScheduleToPatch = Partial<Omit<ISchedule, 'id'>>;
