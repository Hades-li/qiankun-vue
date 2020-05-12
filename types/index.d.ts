import { FrameworkConfiguration, LoadableApp } from 'qiankun';
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
        $afterMounted: (callback: (app: LoadableApp) => void) => void;
        $afterUnMounted: (callback: (app: LoadableApp) => void) => void;
        $loadMicroApp: (container: string | HTMLElement, app: string | LoadableApp, configuration?: FrameworkConfiguration) => void;
    }
}
interface RegisterAppOpt {
    name: string;
    entry: string;
    activeRule: string;
    props?: any;
}
declare class QiankunVue {
    appHtml: string;
    mainApp?: Vue;
    appMap: {
        [key: string]: any;
    };
    mountedApp: any;
    private microApp?;
    private microAppRule?;
    private registerAppOpts;
    private isStart;
    private renderCallback?;
    private afterMountedCallback?;
    private afterUnmountCallback?;
    private errorCallback?;
    errorHandle?: (event: Event | string) => void;
    constructor(options: Array<RegisterAppOpt>);
    private render;
    renderSuccess: (callback: (appHtml: string) => void) => void;
    afterMounted: (callback: (app: LoadableApp<{}>) => void) => void;
    afterUnmounted: (callback: (app: LoadableApp<{}>) => void) => void;
    uncaughtError: (callback: (err: {
        app: LoadableApp<{}>;
        msg: string;
    }) => void) => void;
    start: (opts?: FrameworkConfiguration | undefined) => void;
    loadMicroApp: (container: string | HTMLElement, app: string | (import("qiankun").AppMetadata & {
        props?: {} | undefined;
    } & {
        render: import("qiankun").HTMLContentRender;
    }) | (import("qiankun").AppMetadata & {
        props?: {} | undefined;
    } & {
        container: string | HTMLElement;
    }), configuration?: FrameworkConfiguration | undefined) => void;
    unmountApp: () => Promise<string>;
    static install: (Vue: import("vue").VueConstructor<_Vue>) => void;
}
export default QiankunVue;
