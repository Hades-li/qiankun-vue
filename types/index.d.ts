import { RegistrableApp, StartOpts } from 'qiankun';
import { Vue as _Vue } from 'vue/types/vue';
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        qiankunVue?: QiankunVue;
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        $qiankunVue: QiankunVue;
        $renderSuccess: (callback: (appHtml: string) => void) => void;
        $afterMounted: (callback: (app: RegistrableApp) => void) => void;
    }
}
interface RegisterAppOpt {
    name: string;
    entry: string;
    activeUrl: string;
    other?: any;
}
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
    constructor(registerAppOpts: Array<RegisterAppOpt>);
    private render;
    renderSuccess: (callback: (appHtml: string) => void) => void;
    afterMounted: (callback: (app: RegistrableApp<{}>) => void) => void;
    start: (opts?: StartOpts | undefined) => void;
    static install: (Vue: import("vue").VueConstructor<_Vue>) => void;
}
export default QiankunVue;
