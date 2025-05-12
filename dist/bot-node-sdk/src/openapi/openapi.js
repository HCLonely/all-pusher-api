export const versionMapping = Object.create(null);
export function register(version, api) {
    versionMapping[version] = api;
}
