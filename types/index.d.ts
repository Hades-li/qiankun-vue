import { RegistrableApp, StartOpts } from 'qiankun';
import { Vue as _Vue } from 'vue/types/vue';
import './vue'
declare class QiankunVue {
    appHtml: string;
    mainApp?: Vue;
    appMap: {
        [key: string]: any;
    };
    mountedApp: any;
    private registerAppOpts;
    private isStart;
    private renderCallback?;
    private afterMountedCallback?;
    constructor(registerAppOpts: Array<any>);
    private render;
    renderSuccess: (callback: (appHtml: string) => void) => void;
    afterMounted: (callback: (app: RegistrableApp<{}>) => void) => void;
    start(opts?: StartOpts): void;
    static install: (Vue: import("vue/types/vue").VueConstructor<_Vue>) => void;
}
export default QiankunVue;
