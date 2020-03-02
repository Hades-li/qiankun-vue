import { registerMicroApps, RegistrableApp, start, StartOpts } from 'qiankun'
import { ComponentOptions } from 'vue'
import { Vue as _Vue } from 'vue/types/vue'

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

declare interface Props extends Object {
  mainInstance: Vue;
  isFramework: boolean;
  callback: (appInstance: any, otherData?: any) => void;
}

interface RegisterAppOpt {
  name: string;
  entry: string;
  activeUrl: string;
  other?: any;
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
  private afterMountedCallback?: (app: RegistrableApp) => void

  constructor (registerAppOpts: Array<RegisterAppOpt>) {
    this.registerAppOpts = registerAppOpts
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

  public afterMounted = (callback: (app: RegistrableApp) => void) => {
    this.afterMountedCallback = callback
  }

  public start = (opts?: StartOpts) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    if (!this.isStart) {
      // debugger
      const apps = this.registerAppOpts.map((item: RegisterAppOpt, index) => {
        return {
          name: item.name, // app name registered
          entry: item.entry,
          render: this.render.bind(this),
          activeRule: genActiveRule(item.activeUrl),
          props: {
            mainInstance: this.mainApp,
            isFramework: true,
            callback: (appInstance: Vue | any) => {
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
            if (self.afterMountedCallback) {
              self.afterMountedCallback(app)
            }
            return Promise.resolve()
          }
        })
      start(opts)
      this.isStart = true
    }
  }

  static install = (Vue: typeof _Vue) => {
    let _qiankunVue: QiankunVue | undefined
    Vue.mixin({
      beforeCreate (): void {
        if (this.$options.qiankunVue) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
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
  }
}

export default QiankunVue
