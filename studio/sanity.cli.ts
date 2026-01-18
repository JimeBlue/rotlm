import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'wr3ekkel',
    dataset: 'production'
  },
  studioHost: 'rotlm',
  autoUpdates: true,
})
