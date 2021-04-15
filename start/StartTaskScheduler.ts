import Scheduler from '@ioc:Adonis/Addons/Scheduler'
;(() => {
  try {
    // @ts-ignore
    Scheduler.run()
  } catch (error) {
    console.log(error)
  }
})()
