import fs from 'fs'
import {resolve} from 'path'

export const getSvgSprite = () => {
    try {
      return fs
        .readFileSync(resolve(process.cwd(), 'public/ico/sprite.svg'))
        .toString()
    } catch (error) {
      console.error(error)
    }
}
