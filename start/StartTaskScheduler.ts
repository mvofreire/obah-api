//@ts-nocheck
import Scheduler from '@ioc:Adonis/Addons/Scheduler'
;(() => {
  try {
    Scheduler.run()
  } catch (error) {
    console.log(error)
  }
})()
