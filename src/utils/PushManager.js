/**
 * Created by vivalaakam on 17.01.2019.
 *
 * @flow
 */
import Subscription from '../api/subscription'

const subscriptionApi = new Subscription()

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default class PushManager {
  static single = new PushManager()

  constructor() {
    if (typeof navigator !== 'undefined' && typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
      this.run()
    }
  }

  async run() {
    try {
      this.serviceWorker = await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/push-worker.js`)
      const subscription = await this.serviceWorker.pushManager.getSubscription()

      this.hasSubscription = !(subscription === null)
    } catch (e) {
      console.error('Service Worker Error', e)
    }
  }

  async subscribeUser() {
    if (!this.serviceWorker) {
      return
    }
    try {
      const subscription = await this.serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(process.env.VAPID_PUBLIC_KEY)
      })

      try {
        const resp = await subscriptionApi.create({
          subscription: {
            subscription: JSON.stringify(subscription),
            source: 'web'
          }
        })
        this.hasSubscription = true
        return resp
      } catch (e) {
        this.hasSubscription = false
      }
    } catch (err) {
      console.log('Failed to subscribe the user: ', err)
    }
  }

  async unsubscribeUser() {
    if (!this.serviceWorker) {
      return
    }

    const subscription = await this.serviceWorker.pushManager.getSubscription()
    if (subscription) {
      this.hasSubscription = false
      return subscription.unsubscribe()
    }

    return false

  }
}

