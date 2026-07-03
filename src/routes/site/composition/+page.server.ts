import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    return {
        // OS側の /etc/environment 等に設定した変数名
        serverLocation: env.SERVER_LOCATION || 'Unknown Server'
    };
};