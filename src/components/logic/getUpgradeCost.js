import { baseCosts } from './constants'

export default function getUpgradeCost(type, count) {
    const costs = []
        for (const resource in baseCosts[type]) {
            costs.push(Math.floor(baseCosts[type][resource] * 1.2 ** count))
        }    
    switch(type) {
        case 'houses':
            return { wood: costs[0] }
        case 'farms':
            return { food: costs[0], wood: costs[1], freePop: costs[2] }
        case 'sawmills':
            return { wood: costs[0], freePop: costs[1] }
        case 'quarries':
            return { wood: costs[0], freePop: costs[1] }
        case 'mines':
            return { wood: costs[0], stone: costs[1], freePop: costs[2] }
        case 'shrines':
            return { wood: costs[0], stone: costs[1], gold: costs[2] }
        default:
            throw new Error('Incorrect building type')
    }
}