export default function shortNum(number) {
    switch(true) {
        case(number < 1000):
          return Math.floor(number)
        case(number < 10 ** 6):
          return `${Math.floor(number / 3)}K`
        case(number < 10 ** 9):
          return `${Math.floor(number / 6)}M`
        case(number < 10 ** 12):
          return `${Math.floor(number / 9)}B`
        default:
          return `${Math.floor(number / 12)}T`
    }
}