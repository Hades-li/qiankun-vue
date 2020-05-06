import { registerMicroApps, RegistrableApp, start, FrameworkConfiguration, LoadableApp, addGlobalUncaughtErrorHandler } from 'qiankun'
import { ComponentOptions } from 'vue'
import { Vue as _Vue } from 'vue/types/vue'
import QiankunView from './components/framework/index.vue'

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
  }
}

declare interface Props extends Object {
  mainInstance: Vue;
  isFramework: boolean;
  callback: (appInstance: any, otherData?: any) => void;
}

interface RegisterAppOpt {
  name: string;
  entry: string;
  activeRule: string;
  props?: any;
}

function genActiveRule (url: string) {
  return (localhost: Location) => localhost.pathname.startsWith(url)
}

class QiankunVue {
  public appHtml = ''
  public mainApp?: Vue
  public appMap: { [key: string]: any } = {}
  public mountedApp: any = {}
  private registerAppOpts: Array<RegisterAppOpt> = []
  private isStart = false
  private renderCallback?: (appHtml: string) => void
  private afterMountedCallback?: (app: LoadableApp) => void
  private afterUnmountCallback?: (app: LoadableApp) => void
  public errorHandle?: (event: Event | string) => void

  constructor (options: Array<RegisterAppOpt>) {
    this.registerAppOpts = options
  }

  private render ({ appContent, loading }: { appContent: string; loading: boolean }) {
    if (appContent !== this.appHtml) {
      this.appHtml = appContent
      if (this.renderCallback) {
        this.renderCallback(appContent)
      }
    }
  }

  public renderSuccess = (callback: (appHtml: string) => void) => {
    this.renderCallback = callback
  }

  public afterMounted = (callback: (app: LoadableApp) => void) => {
    this.afterMountedCallback = callback
  }

  public afterUnMounted = (callback: (app: LoadableApp) => void) => {
    this.afterUnmountCallback = callback
  }

  public start = (opts?: FrameworkConfiguration) => {
    // const self = this
    if (!this.isStart) {
      const apps = this.registerAppOpts.map<RegistrableApp>((item: RegisterAppOpt, index) => {
        return {
          name: item.name, // app name registered
          entry: item.entry,
          container: '#subApp',
          activeRule: item.activeRule,
          props: {
            mainInstance: this.mainApp,
            isFramework: true,
            callback: (appInstance: Vue) => {
              this.appMap[item.name] = appInstance
              this.mountedApp = appInstance
            }
          }
        }
      })
      // 注册
      registerMicroApps(apps,
        {
          afterMount: (app) => {
            // debugger
            if (this.afterMountedCallback) {
              this.afterMountedCallback(app)
            }
            return Promise.resolve()
          },
          afterUnmount: (app) => {
            if (this.afterUnmountCallback) {
              this.afterUnmountCallback(app)
            }
            return Promise.resolve()
          }
        })
      start(opts)

      addGlobalUncaughtErrorHandler((event) => {
        if (this.errorHandle) {
          this.errorHandle(event)
        }
      })
      this.isStart = true
    }
  }

  static install = (Vue: typeof _Vue) => {
    let _qiankunVue: QiankunVue | undefined
    Vue.mixin({
      beforeCreate (): void {
        if (this.$options.qiankunVue) {
          _qiankunVue = this.$options.qiankunVue
          if (_qiankunVue) {
            _qiankunVue.mainApp = this
          }
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$qiankunVue', {
      get () {
        return _qiankunVue
      }
    })
    Object.defineProperty(Vue.prototype, '$renderSuccess', {
      get () {
        if (_qiankunVue) {
          return _qiankunVue.renderSuccess
        }
        return undefined
      }
    })
    Object.defineProperty(Vue.prototype, '$afterMounted', {
      get () {
        if (_qiankunVue) {
          return _qiankunVue.afterMounted
        }
        return undefined
      }
    })
    Object.defineProperty(Vue.prototype, '$afterUnMounted', {
      get () {
        if (_qiankunVue) {
          return _qiankunVue.afterUnMounted
        }
        return undefined
      }
    })

    // framework install
    Vue.component('Qiankun', QiankunView)
  }
}

export default QiankunVue
