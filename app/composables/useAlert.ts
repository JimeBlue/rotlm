import { LazyModalsGlobal } from '#components'

interface AlertOptions {
  title?: string
  text?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'loading'
  showConfirmButton?: boolean
  showCancelButton?: boolean
  showDenyButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  denyButtonText?: string
  confirmButtonColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  cancelButtonColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  denyButtonColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  reverseButtons?: boolean
  allowOutsideClick?: boolean
}

interface AlertResult {
  isConfirmed: boolean
  isDenied: boolean
  isDismissed: boolean
  value?: any
}

export function useAlert() {
  const { t, te } = useI18n()
  const overlay = useOverlay()
  const modal = overlay.create(LazyModalsGlobal)

  const Alert = async (options: AlertOptions): Promise<AlertResult> => {
    const config = {
      title: options.title || '',
      description: options.text || '',
      type: options.icon || 'info',
      showConfirmButton: options.showConfirmButton ?? true,
      showCancelButton: options.showCancelButton ?? false,
      showDenyButton: options.showDenyButton ?? false,
      confirmButtonText: options.confirmButtonText || 'OK',
      cancelButtonText: options.cancelButtonText || 'Cancel',
      denyButtonText: options.denyButtonText || 'No',
      confirmButtonColor: options.confirmButtonColor || 'primary',
      cancelButtonColor: options.cancelButtonColor || 'neutral',
      denyButtonColor: options.denyButtonColor || 'error',
      reverseButtons: options.reverseButtons ?? true, // Default to true like original SweetAlert config
    }

    const instance = modal.open(config)
    return await instance.result
  }

  const namedAlert = async (error: string, icon: AlertOptions['icon'] = 'error'): Promise<AlertResult> => {
    let title, text

    // if we have keys, use them
    if (te(`alerts.${error}.title`) && te(`alerts.${error}.text`)) {
      title = t(`alerts.${error}.title`)
      text = t(`alerts.${error}.text`)
    }
    // else use generic error title, and the server response as the message
    else {
      title = t(`alerts.general_error.title`)
      text = error
    }

    return await Alert({
      icon,
      title,
      text,
    })
  }

  let loadingInstance: any = null

  const showLoadingAlert = () => {
    loadingInstance = modal.open({
      title: 'Loading...',
      type: 'loading',
      showConfirmButton: false,
      showCancelButton: false,
    })
    return loadingInstance
  }

  const closeLoadingAlert = () => {
    if (loadingInstance) {
      modal.close()
      loadingInstance = null
    }
  }

  // SweetAlert2-compatible fire method
  const fire = Alert

  return {
    Alert,
    namedAlert,
    showLoadingAlert,
    closeLoadingAlert,
    fire, // For full SweetAlert2 compatibility
  }
}
